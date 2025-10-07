# Database Schema Documentation

**Database**: PostgreSQL via Supabase
**ORM**: Prisma
**Last Updated**: 2025-10-06

---

## Schema Overview

The database is designed to support:
- Interactive quizzes with conditional logic and session persistence
- Lead generation and tracking
- Content management (white papers, blog posts)
- Analytics event tracking
- Resource data (glossary, FAQ, state laws)

---

## Core Tables

### `quizzes`

Stores quiz definitions, questions, conditional logic, and scoring rules.

```prisma
model Quiz {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String
  icon        String?
  duration    Int      // estimated minutes
  questions   Json     // array of question objects
  scoring     Json     // scoring rules and severity thresholds
  active      Boolean  @default(true)
  priority    Int      @default(0) // for ordering on hub page
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  sessions    QuizSession[]

  @@index([slug])
  @@index([active, priority])
}
```

**Questions JSON Structure:**
```typescript
{
  questions: [
    {
      id: "q1",
      text: "Where is the damage located?",
      type: "radio" | "checkbox" | "visual",
      required: true,
      options: [
        {
          id: "opt1",
          text: "Driver's side",
          value: "driver_side",
          image?: "/images/damage-types/driver-side.jpg",
          score: 10
        }
      ],
      conditionalLogic?: {
        showIf: {
          questionId: "q0",
          answerEquals: "yes"
        }
      },
      helpText?: "Why this matters: ..."
    }
  ]
}
```

**Scoring JSON Structure:**
```typescript
{
  severityThresholds: {
    safe: { min: 0, max: 20 },
    caution: { min: 21, max: 50 },
    critical: { min: 51, max: 100 }
  },
  resultMessages: {
    safe: "Your windshield appears to be safe...",
    caution: "Schedule service soon...",
    critical: "Immediate action required..."
  }
}
```

---

### `quiz_sessions`

Tracks individual user quiz sessions, answers, and results.

```prisma
model QuizSession {
  id            String   @id @default(cuid())
  quizId        String
  sessionToken  String   @unique // stored in cookie/localStorage
  answers       Json     // array of answered questions
  score         Int?
  severity      String?  // "safe" | "caution" | "critical"
  completed     Boolean  @default(false)
  completedAt   DateTime?
  email         String?  // if user requests results via email
  emailSentAt   DateTime?
  startedAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  quiz          Quiz     @relation(fields: [quizId], references: [id])

  @@index([sessionToken])
  @@index([quizId, completed])
  @@index([createdAt])
}
```

**Answers JSON Structure:**
```typescript
{
  answers: [
    {
      questionId: "q1",
      answer: "driver_side", // or ["option1", "option2"] for checkboxes
      score: 10,
      timestamp: "2025-10-06T10:30:00Z"
    }
  ]
}
```

---

### `leads`

Stores lead form submissions from the Find Installers page.

```prisma
model Lead {
  id            String   @id @default(cuid())

  // Contact Info
  firstName     String
  lastName      String
  phone         String
  email         String
  zipCode       String
  bestTimeToCall String?

  // Vehicle Info
  vehicleYear   Int
  vehicleMake   String
  vehicleModel  String
  hasAdas       Boolean  @default(false)

  // Service Info
  serviceType   String   // "replacement" | "repair" | "calibration" | "assessment"
  urgency       String   // "asap" | "week" | "month" | "researching"
  damageDetails Json?    // conditional on serviceType

  // Tracking
  source        String   // "quiz" | "white_paper" | "homepage" | "direct"
  sourcePage    String?  // URL of page where form was started
  quizSessionId String?  // if came from quiz results
  utmParams     Json?    // UTM tracking parameters

  // Lead Quality
  qualityScore  Int      @default(0) // calculated based on completeness, urgency, ADAS

  // Status
  status        String   @default("new") // "new" | "contacted" | "scheduled" | "closed"
  notes         String?

  // Notifications
  confirmationEmailSent Boolean @default(false)
  installerNotificationSent Boolean @default(false)

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([email])
  @@index([zipCode])
  @@index([status, createdAt])
  @@index([source, createdAt])
  @@index([quizSessionId])
}
```

**Damage Details JSON Structure:**
```typescript
{
  location: ["driver_side", "center"],
  type: ["chip", "crack"],
  size: "quarter", // "quarter" | "dollar" | "larger"
  dateOccurred: "2025-10-01",
  additionalNotes: "Crack is spreading"
}
```

**UTM Params JSON Structure:**
```typescript
{
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "adas_quiz",
  utm_content: "variant_a"
}
```

---

### `content`

Stores white papers and blog posts with metadata.

```prisma
model Content {
  id            String   @id @default(cuid())
  type          String   // "white_paper" | "blog_post"
  slug          String   @unique

  // Content
  title         String
  subtitle      String?
  body          String   @db.Text // MDX format
  excerpt       String?

  // Metadata
  category      String?
  tags          String[]
  author        String   @default("Windshield Advisor Research Team")
  readTime      Int?     // estimated minutes

  // SEO
  metaTitle     String?
  metaDescription String?
  ogImage       String?

  // Relationships
  parentId      String?  // for blog posts (references white paper)
  parent        Content? @relation("ContentHierarchy", fields: [parentId], references: [id])
  children      Content[] @relation("ContentHierarchy")

  // Related Content
  relatedQuizzes String[] // array of quiz slugs
  relatedContent String[] // array of content slugs

  // Table of Contents
  tableOfContents Json?   // generated from headings

  // FAQ (structured data)
  faqs          Json?

  // Publishing
  status        String   @default("draft") // "draft" | "published" | "archived"
  publishedAt   DateTime?
  featured      Boolean  @default(false)
  priority      Int      @default(0)

  // Analytics
  viewCount     Int      @default(0)
  avgTimeOnPage Int?     // seconds

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([slug])
  @@index([type, status, publishedAt])
  @@index([parentId])
  @@index([category, status])
}
```

**Table of Contents JSON Structure:**
```typescript
{
  sections: [
    {
      id: "section-1",
      title: "What is ADAS Calibration?",
      level: 2, // h2
      children: [
        {
          id: "subsection-1-1",
          title: "Types of ADAS Systems",
          level: 3 // h3
        }
      ]
    }
  ]
}
```

**FAQs JSON Structure:**
```typescript
{
  faqs: [
    {
      question: "How much does ADAS calibration cost?",
      answer: "ADAS calibration typically costs between $150-$400..."
    }
  ]
}
```

---

### `analytics_events`

Tracks custom analytics events for conversion funnel analysis.

```prisma
model AnalyticsEvent {
  id            String   @id @default(cuid())

  // Event Info
  eventType     String   // "quiz_started", "lead_form_submitted", etc.
  eventData     Json     // event-specific data

  // User/Session Info
  sessionId     String?  // anonymous session ID
  userId        String?  // if user is logged in (future)

  // Page Context
  page          String   // URL path
  referrer      String?

  // Device Info
  userAgent     String?
  device        String?  // "mobile" | "tablet" | "desktop"
  browser       String?

  // Timestamps
  timestamp     DateTime @default(now())

  @@index([eventType, timestamp])
  @@index([sessionId, timestamp])
  @@index([timestamp])
}
```

**Event Data Examples:**

**quiz_started:**
```typescript
{
  quizId: "clx123...",
  quizSlug: "windshield-safety"
}
```

**quiz_completed:**
```typescript
{
  quizId: "clx123...",
  quizSessionId: "clx456...",
  severity: "caution",
  score: 35,
  duration: 142 // seconds
}
```

**lead_form_submitted:**
```typescript
{
  leadId: "clx789...",
  source: "quiz",
  urgency: "asap",
  hasAdas: true,
  zipCode: "90210"
}
```

**cta_clicked:**
```typescript
{
  ctaType: "find_installers",
  ctaLocation: "quiz_results",
  destination: "/find-installers"
}
```

---

## Resource Tables

### `glossary_terms`

```prisma
model GlossaryTerm {
  id          String   @id @default(cuid())
  term        String   @unique
  definition  String   @db.Text
  category    String?
  relatedTerms String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([term])
  @@index([category])
}
```

---

### `faqs`

```prisma
model FAQ {
  id          String   @id @default(cuid())
  question    String
  answer      String   @db.Text
  category    String   // "insurance", "adas", "installation", etc.
  priority    Int      @default(0) // for ordering
  tags        String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([category, priority])
}
```

---

### `state_laws`

```prisma
model StateLaw {
  id              String   @id @default(cuid())
  state           String   @unique // "CA", "NY", etc.
  stateName       String   // "California"

  // Insurance Coverage
  hasZeroDeductible Boolean
  requiresGlassCoverage Boolean
  notes           String?  @db.Text

  // Regulations
  inspectionRequired Boolean @default(false)
  crackLimits       Json?

  // Resources
  dmvLink         String?
  insuranceGuide  String?

  updatedAt       DateTime @updatedAt

  @@index([state])
}
```

---

### `certifications`

```prisma
model Certification {
  id          String   @id @default(cuid())
  name        String
  acronym     String   @unique // "AGSC", "NGA", etc.
  description String   @db.Text
  authority   String   // certifying organization
  logo        String?
  website     String?
  requirements String? @db.Text
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([acronym])
}
```

---

### `vehicle_data`

```prisma
model VehicleMake {
  id        String   @id @default(cuid())
  name      String   @unique
  logo      String?
  country   String?
  models    VehicleModel[]

  @@index([name])
}

model VehicleModel {
  id          String   @id @default(cuid())
  makeId      String
  name        String
  year        Int
  hasAdas     Boolean  @default(false)
  adasType    String?  // "standard" | "optional" | "none"

  make        VehicleMake @relation(fields: [makeId], references: [id])

  @@unique([makeId, name, year])
  @@index([makeId, year])
  @@index([hasAdas])
}
```

---

## Relationships Diagram

```
Quiz (1) ──── (many) QuizSession
                        │
                        │ (optional)
                        ▼
                      Lead (many)

Content (1) ──── (many) Content (children)

AnalyticsEvent (standalone - no relations)

VehicleMake (1) ──── (many) VehicleModel
```

---

## Indexes Strategy

### Performance Optimizations

1. **Quiz lookups** - Indexed by `slug` for fast page loads
2. **Session retrieval** - Indexed by `sessionToken` for quiz persistence
3. **Lead tracking** - Indexed by `source`, `status`, `createdAt` for analytics
4. **Content queries** - Indexed by `slug`, `type`, `status`, `publishedAt`
5. **Analytics** - Indexed by `eventType` and `timestamp` for reporting

---

## Data Migration Strategy

### Initial Seed Data

```typescript
// prisma/seed.ts
async function main() {
  // Seed quizzes (from JSON files)
  await seedQuizzes();

  // Seed glossary terms
  await seedGlossary();

  // Seed FAQs
  await seedFAQs();

  // Seed state laws
  await seedStateLaws();

  // Seed certifications
  await seedCertifications();

  // Seed vehicle data
  await seedVehicleData();
}
```

### Future Migrations

- Content imports from existing white papers
- Quiz question updates (versioning strategy needed)
- Analytics data retention (archive old events)

---

## Database Queries (Common Patterns)

### Get Active Quizzes (ordered by priority)
```typescript
const quizzes = await prisma.quiz.findMany({
  where: { active: true },
  orderBy: { priority: 'desc' }
});
```

### Create Quiz Session
```typescript
const session = await prisma.quizSession.create({
  data: {
    quizId: quiz.id,
    sessionToken: generateToken(),
    answers: { answers: [] },
    startedAt: new Date()
  }
});
```

### Get Quiz Session with Answers
```typescript
const session = await prisma.quizSession.findUnique({
  where: { sessionToken },
  include: { quiz: true }
});
```

### Submit Lead with Analytics
```typescript
// Create lead
const lead = await prisma.lead.create({
  data: { ...leadData }
});

// Track event
await prisma.analyticsEvent.create({
  data: {
    eventType: 'lead_form_submitted',
    eventData: {
      leadId: lead.id,
      source: lead.source,
      urgency: lead.urgency
    },
    page: '/find-installers',
    timestamp: new Date()
  }
});
```

### Get Published White Papers with Children
```typescript
const whitePapers = await prisma.content.findMany({
  where: {
    type: 'white_paper',
    status: 'published'
  },
  include: {
    children: {
      where: { status: 'published' },
      orderBy: { createdAt: 'asc' }
    }
  },
  orderBy: { priority: 'desc' }
});
```

### Get Lead Analytics (by source)
```typescript
const leadsBySource = await prisma.lead.groupBy({
  by: ['source'],
  _count: true,
  where: {
    createdAt: {
      gte: new Date('2025-10-01'),
      lte: new Date('2025-10-31')
    }
  }
});
```

---

## Backup & Maintenance

### Backup Strategy
- **Automated daily backups** via Supabase
- **Point-in-time recovery** enabled
- **Manual backups** before major migrations

### Maintenance Tasks
- Monthly analytics event archival (> 90 days old)
- Quarterly lead data cleanup (closed leads > 1 year)
- Weekly database performance review

---

## Security Considerations

1. **Row Level Security (RLS)** - Enable in Supabase for user-facing tables
2. **Sensitive Data** - PII (phone, email) encrypted at rest
3. **API Access** - Service role key only used server-side
4. **Input Validation** - All inputs validated with Zod before database insert
5. **Rate Limiting** - Prevent spam submissions (leads, quiz sessions)

---

## Environment Variables

```env
# Supabase Connection
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Supabase Keys
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbG..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbG..." # Server-side only
```

---

**Next Steps:**
1. Create Prisma schema file at `prisma/schema.prisma`
2. Generate Prisma client: `npx prisma generate`
3. Push schema to Supabase: `npx prisma db push`
4. Create seed file: `prisma/seed.ts`
5. Seed database: `npx prisma db seed`
