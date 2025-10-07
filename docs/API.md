# API Routes & Data Flow

**Framework**: Next.js App Router
**API Style**: REST-like with Server Actions
**Authentication**: None (public forms), Supabase Auth for admin (future)
**Last Updated**: 2025-10-06

---

## API Architecture

### Next.js App Router Approach

We use a hybrid approach:
- **Server Actions** for form submissions and mutations
- **Route Handlers** for external integrations and data fetching
- **Server Components** for initial data loading

### Why Server Actions?

1. **Type Safety** - Direct TypeScript function calls
2. **No API Endpoints** - Less boilerplate
3. **Progressive Enhancement** - Works without JavaScript
4. **Built-in CSRF Protection** - Secure by default

---

## Quiz API

### POST `/api/quiz/start`

**Purpose**: Initialize a new quiz session

**Request Body**:
```typescript
{
  quizId: string;
  utmParams?: Record<string, string>;
}
```

**Response**:
```typescript
{
  sessionToken: string;
  sessionId: string;
  quiz: Quiz;
}
```

**Implementation** (Route Handler):
```typescript
// app/api/quiz/start/route.ts
export async function POST(request: Request) {
  const { quizId, utmParams } = await request.json();

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId }
  });

  if (!quiz || !quiz.active) {
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
  }

  const sessionToken = generateSecureToken();

  const session = await prisma.quizSession.create({
    data: {
      quizId,
      sessionToken,
      answers: { answers: [] },
      startedAt: new Date()
    }
  });

  // Track analytics
  await trackEvent('quiz_started', {
    quizId,
    quizSlug: quiz.slug,
    sessionId: session.id
  });

  return NextResponse.json({
    sessionToken,
    sessionId: session.id,
    quiz
  });
}
```

---

### POST `/api/quiz/answer`

**Purpose**: Save answer and update session

**Request Body**:
```typescript
{
  sessionToken: string;
  questionId: string;
  answer: string | string[]; // single value or array for checkboxes
  score: number;
}
```

**Response**:
```typescript
{
  success: boolean;
  currentScore: number;
}
```

**Implementation** (Server Action):
```typescript
// app/actions/quiz.ts
'use server';

export async function saveQuizAnswer(data: SaveAnswerInput) {
  const session = await prisma.quizSession.findUnique({
    where: { sessionToken: data.sessionToken }
  });

  if (!session) {
    throw new Error('Session not found');
  }

  const answers = session.answers as { answers: Answer[] };
  const existingIndex = answers.answers.findIndex(
    a => a.questionId === data.questionId
  );

  const newAnswer = {
    questionId: data.questionId,
    answer: data.answer,
    score: data.score,
    timestamp: new Date()
  };

  if (existingIndex >= 0) {
    answers.answers[existingIndex] = newAnswer;
  } else {
    answers.answers.push(newAnswer);
  }

  const totalScore = answers.answers.reduce((sum, a) => sum + a.score, 0);

  await prisma.quizSession.update({
    where: { sessionToken: data.sessionToken },
    data: {
      answers,
      score: totalScore,
      updatedAt: new Date()
    }
  });

  return { success: true, currentScore: totalScore };
}
```

---

### POST `/api/quiz/complete`

**Purpose**: Finalize quiz and calculate results

**Request Body**:
```typescript
{
  sessionToken: string;
}
```

**Response**:
```typescript
{
  sessionId: string;
  score: number;
  severity: 'safe' | 'caution' | 'critical';
  resultUrl: string;
}
```

**Implementation** (Server Action):
```typescript
'use server';

export async function completeQuiz(sessionToken: string) {
  const session = await prisma.quizSession.findUnique({
    where: { sessionToken },
    include: { quiz: true }
  });

  if (!session || session.completed) {
    throw new Error('Invalid session');
  }

  const scoring = session.quiz.scoring as ScoringRules;
  const severity = calculateSeverity(session.score, scoring);

  await prisma.quizSession.update({
    where: { sessionToken },
    data: {
      completed: true,
      completedAt: new Date(),
      severity
    }
  });

  // Track analytics
  await trackEvent('quiz_completed', {
    quizId: session.quizId,
    sessionId: session.id,
    severity,
    score: session.score,
    duration: calculateDuration(session.startedAt)
  });

  return {
    sessionId: session.id,
    score: session.score,
    severity,
    resultUrl: `/quizzes/${session.quiz.slug}/results/${session.id}`
  };
}
```

---

### GET `/api/quiz/session/[token]`

**Purpose**: Retrieve session to resume progress

**Response**:
```typescript
{
  session: QuizSession;
  quiz: Quiz;
  nextQuestionIndex: number;
}
```

---

### POST `/api/quiz/email-results`

**Purpose**: Email quiz results to user

**Request Body**:
```typescript
{
  sessionId: string;
  email: string;
}
```

**Response**:
```typescript
{
  success: boolean;
  emailSent: boolean;
}
```

**Implementation** (Server Action):
```typescript
'use server';

import { Resend } from 'resend';
import QuizResultsEmail from '@/emails/quiz-results';

export async function emailQuizResults(sessionId: string, email: string) {
  // Validate email
  const emailSchema = z.string().email();
  const validatedEmail = emailSchema.parse(email);

  const session = await prisma.quizSession.findUnique({
    where: { id: sessionId },
    include: { quiz: true }
  });

  if (!session || !session.completed) {
    throw new Error('Invalid session');
  }

  // Send email via Resend
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: validatedEmail,
    subject: `Your ${session.quiz.title} Results`,
    react: QuizResultsEmail({ session, quiz: session.quiz })
  });

  // Update session
  await prisma.quizSession.update({
    where: { id: sessionId },
    data: {
      email: validatedEmail,
      emailSentAt: new Date()
    }
  });

  // Track analytics
  await trackEvent('quiz_result_email_captured', {
    quizId: session.quizId,
    sessionId: session.id,
    email: validatedEmail
  });

  return { success: true, emailSent: true };
}
```

---

## Lead Generation API

### POST `/api/leads/submit`

**Purpose**: Submit lead form and trigger notifications

**Request Body**:
```typescript
{
  // Contact
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  zipCode: string;
  bestTimeToCall?: string;

  // Vehicle
  vehicleYear: number;
  vehicleMake: string;
  vehicleModel: string;
  hasAdas: boolean;

  // Service
  serviceType: 'replacement' | 'repair' | 'calibration' | 'assessment';
  urgency: 'asap' | 'week' | 'month' | 'researching';
  damageDetails?: {
    location: string[];
    type: string[];
    size: string;
    dateOccurred: string;
    notes?: string;
  };

  // Tracking
  source: 'quiz' | 'white_paper' | 'homepage' | 'direct';
  sourcePage?: string;
  quizSessionId?: string;
  utmParams?: Record<string, string>;
}
```

**Response**:
```typescript
{
  leadId: string;
  referenceNumber: string;
  thankYouUrl: string;
}
```

**Implementation** (Server Action):
```typescript
'use server';

import { z } from 'zod';

const leadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().regex(/^\d{10}$/),
  email: z.string().email(),
  zipCode: z.string().regex(/^\d{5}$/),
  vehicleYear: z.number().min(2010).max(2025),
  vehicleMake: z.string(),
  vehicleModel: z.string(),
  hasAdas: z.boolean(),
  serviceType: z.enum(['replacement', 'repair', 'calibration', 'assessment']),
  urgency: z.enum(['asap', 'week', 'month', 'researching']),
  source: z.enum(['quiz', 'white_paper', 'homepage', 'direct'])
});

export async function submitLead(data: unknown) {
  // Validate input
  const validatedData = leadSchema.parse(data);

  // Calculate quality score
  const qualityScore = calculateLeadQuality(validatedData);

  // Create lead
  const lead = await prisma.lead.create({
    data: {
      ...validatedData,
      qualityScore,
      status: 'new',
      createdAt: new Date()
    }
  });

  // Generate reference number
  const referenceNumber = `REF-${lead.id.slice(0, 8).toUpperCase()}`;

  // Send confirmation email to user
  await sendLeadConfirmation(lead);

  // Send notification to installers
  await notifyInstallers(lead);

  // Track analytics
  await trackEvent('lead_form_submitted', {
    leadId: lead.id,
    source: lead.source,
    urgency: lead.urgency,
    hasAdas: lead.hasAdas,
    zipCode: lead.zipCode,
    qualityScore
  });

  return {
    leadId: lead.id,
    referenceNumber,
    thankYouUrl: `/find-installers/thank-you/${lead.id}`
  };
}
```

---

### Helper Functions

```typescript
function calculateLeadQuality(lead: LeadFormData): number {
  let score = 50; // base score

  // Urgency
  if (lead.urgency === 'asap') score += 30;
  else if (lead.urgency === 'week') score += 20;
  else if (lead.urgency === 'month') score += 10;

  // ADAS
  if (lead.hasAdas) score += 20;

  // Completeness
  if (lead.bestTimeToCall) score += 5;
  if (lead.damageDetails) score += 5;

  // Source quality
  if (lead.source === 'quiz') score += 10;

  return Math.min(score, 100);
}

async function sendLeadConfirmation(lead: Lead) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: lead.email,
    subject: 'Your Windshield Replacement Request Received',
    react: LeadConfirmationEmail({ lead })
  });

  await prisma.lead.update({
    where: { id: lead.id },
    data: { confirmationEmailSent: true }
  });
}

async function notifyInstallers(lead: Lead) {
  // TODO: Integrate with Vero network API
  // For now, send notification email to internal team

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: process.env.INSTALLER_NOTIFICATION_EMAIL!,
    subject: `New Lead: ${lead.firstName} ${lead.lastName} - ${lead.zipCode}`,
    react: InstallerNotificationEmail({ lead })
  });

  await prisma.lead.update({
    where: { id: lead.id },
    data: { installerNotificationSent: true }
  });
}
```

---

### GET `/api/leads/vehicles`

**Purpose**: Get vehicle makes/models for dropdowns

**Query Params**:
```typescript
?year=2024 // optional filter
?make=Toyota // optional filter (for models)
```

**Response**:
```typescript
{
  makes?: string[];
  models?: {
    name: string;
    hasAdas: boolean;
  }[];
}
```

---

### POST `/api/leads/validate-zip`

**Purpose**: Validate ZIP code and check service area

**Request Body**:
```typescript
{
  zipCode: string;
}
```

**Response**:
```typescript
{
  valid: boolean;
  city?: string;
  state?: string;
  inServiceArea: boolean;
}
```

---

## Content API

### GET `/api/content/white-papers`

**Purpose**: List published white papers

**Query Params**:
```typescript
?category=adas // optional filter
?featured=true // optional filter
?limit=10 // optional
```

**Response**:
```typescript
{
  whitePapers: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    publishedAt: string;
    readTime: number;
  }[];
  total: number;
}
```

---

### GET `/api/content/white-papers/[slug]`

**Purpose**: Get single white paper with related content

**Response**:
```typescript
{
  content: Content;
  relatedQuizzes: Quiz[];
  relatedContent: Content[];
  children: Content[]; // blog posts
}
```

**Implementation** (Server Component - no API needed):
```typescript
// app/safety-guides/[slug]/page.tsx
export default async function WhitePaperPage({ params }) {
  const content = await prisma.content.findUnique({
    where: { slug: params.slug, status: 'published' },
    include: {
      children: {
        where: { status: 'published' },
        orderBy: { createdAt: 'asc' }
      }
    }
  });

  // Fetch related quizzes
  const relatedQuizzes = await prisma.quiz.findMany({
    where: {
      slug: { in: content.relatedQuizzes }
    }
  });

  return <WhitePaperLayout content={content} relatedQuizzes={relatedQuizzes} />;
}
```

---

### POST `/api/content/view`

**Purpose**: Track content views

**Request Body**:
```typescript
{
  contentId: string;
  timeOnPage?: number; // seconds
}
```

**Implementation** (Server Action):
```typescript
'use server';

export async function trackContentView(contentId: string, timeOnPage?: number) {
  await prisma.content.update({
    where: { id: contentId },
    data: {
      viewCount: { increment: 1 },
      avgTimeOnPage: timeOnPage // update average
    }
  });

  await trackEvent('white_paper_viewed', {
    contentId,
    timeOnPage
  });
}
```

---

## Analytics API

### POST `/api/analytics/track`

**Purpose**: Track custom events

**Request Body**:
```typescript
{
  eventType: string;
  eventData: Record<string, any>;
  page: string;
  sessionId?: string;
}
```

**Response**:
```typescript
{
  success: boolean;
}
```

**Implementation** (Server Action):
```typescript
'use server';

export async function trackEvent(
  eventType: string,
  eventData: Record<string, any>,
  context?: {
    page?: string;
    sessionId?: string;
    userAgent?: string;
  }
) {
  await prisma.analyticsEvent.create({
    data: {
      eventType,
      eventData,
      page: context?.page || '',
      sessionId: context?.sessionId,
      userAgent: context?.userAgent,
      timestamp: new Date()
    }
  });

  // Also send to Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventType, eventData);
  }
}
```

---

## Email API (Resend Integration)

### Email Templates

All emails use React Email components for consistent styling.

#### Quiz Results Email
```tsx
// emails/quiz-results.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Section
} from '@react-email/components';

interface QuizResultsEmailProps {
  session: QuizSession;
  quiz: Quiz;
}

export default function QuizResultsEmail({ session, quiz }: QuizResultsEmailProps) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Heading>Your {quiz.title} Results</Heading>

          <Section>
            <SeverityBanner severity={session.severity} />
            <Text>Based on your answers, here are your results...</Text>
          </Section>

          <Button href={`${process.env.NEXT_PUBLIC_APP_URL}/find-installers`}>
            Find Certified Installers
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
```

#### Lead Confirmation Email
```tsx
// emails/lead-confirmation.tsx
export default function LeadConfirmationEmail({ lead }: { lead: Lead }) {
  return (
    <Html>
      <Body>
        <Container>
          <Heading>Request Received!</Heading>
          <Text>Thank you for your request. Here's what happens next:</Text>

          <Section>
            <Text>✓ Your request is being reviewed</Text>
            <Text>→ Within 2 hours: Matched with installers</Text>
            <Text>→ Within 24 hours: Expect calls with quotes</Text>
          </Section>

          <Section>
            <Text>Reference #: {lead.id.slice(0, 8).toUpperCase()}</Text>
            <Text>Vehicle: {lead.vehicleYear} {lead.vehicleMake} {lead.vehicleModel}</Text>
            <Text>Service: {lead.serviceType}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
```

---

## Error Handling

### Standardized Error Responses

```typescript
interface APIError {
  error: string;
  code: string;
  details?: any;
}

// Example usage
return NextResponse.json(
  {
    error: 'Quiz not found',
    code: 'QUIZ_NOT_FOUND'
  },
  { status: 404 }
);
```

### Error Codes

- `QUIZ_NOT_FOUND` - Quiz ID doesn't exist
- `SESSION_NOT_FOUND` - Invalid session token
- `VALIDATION_ERROR` - Input validation failed
- `DUPLICATE_SUBMISSION` - Lead already submitted
- `SERVICE_UNAVAILABLE` - External service error
- `RATE_LIMIT_EXCEEDED` - Too many requests

---

## Rate Limiting

### Implementation (Future)

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded', code: 'RATE_LIMIT_EXCEEDED' },
      { status: 429 }
    );
  }

  // Process request...
}
```

---

## Data Flow Diagrams

### Quiz Flow

```
User → Quiz Start
  ↓
Create Session (sessionToken stored in localStorage)
  ↓
Answer Questions (auto-save each answer)
  ↓
Complete Quiz (calculate score + severity)
  ↓
View Results
  ↓
Optional: Email Results (capture email)
  ↓
CTA: Find Installers (pre-fill form)
```

### Lead Flow

```
User → Start Form
  ↓
Pre-fill from quiz data (if available)
  ↓
Multi-step form (save progress in localStorage)
  ↓
Submit Lead
  ↓
Create database record
  ↓
Send confirmation email (Resend)
  ↓
Send installer notification (Resend)
  ↓
Track analytics event
  ↓
Redirect to Thank You page
```

---

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Supabase (for future admin auth)
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# Resend
RESEND_API_KEY="re_..."
FROM_EMAIL="noreply@windshieldadvisor.info"
INSTALLER_NOTIFICATION_EMAIL="leads@windshieldadvisor.info"

# App
NEXT_PUBLIC_APP_URL="https://windshieldadvisor.info"

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-..."

# Rate Limiting (optional)
UPSTASH_REDIS_REST_URL="..."
UPSTASH_REDIS_REST_TOKEN="..."
```

---

## Testing API Routes

### Local Testing

```bash
# Start dev server
npm run dev

# Test quiz start
curl -X POST http://localhost:3000/api/quiz/start \
  -H "Content-Type: application/json" \
  -d '{"quizId":"clx123..."}'

# Test lead submission
curl -X POST http://localhost:3000/api/leads/submit \
  -H "Content-Type: application/json" \
  -d @lead-test-data.json
```

### Integration Tests (Future)

```typescript
// __tests__/api/quiz.test.ts
describe('Quiz API', () => {
  it('should create quiz session', async () => {
    const response = await POST(
      new Request('http://localhost/api/quiz/start', {
        method: 'POST',
        body: JSON.stringify({ quizId: 'test-quiz' })
      })
    );

    const data = await response.json();
    expect(data.sessionToken).toBeDefined();
  });
});
```

---

## Next Steps

1. Implement Server Actions in `/app/actions/`
2. Create Route Handlers in `/app/api/`
3. Set up Resend email templates
4. Add input validation with Zod
5. Implement error handling middleware
6. Add rate limiting (production)
7. Write API integration tests

