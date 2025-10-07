# Architecture Overview

**Project**: Windshield Advisor
**Type**: Lead Generation Platform
**Stack**: Next.js 14, Supabase, Vercel
**Last Updated**: 2025-10-06

---

## Executive Summary

Windshield Advisor is a conversion-optimized educational platform that connects vehicle owners with ADAS-certified windshield installers through interactive quizzes and research-backed content.

### Core Features
1. **Interactive Quizzes** - 5 quizzes with conditional logic, scoring, and session persistence
2. **Educational Content** - 10 white papers with 40 supporting blog posts
3. **Lead Generation** - Multi-step form with quiz data pre-population
4. **Resource Hub** - Glossary, FAQ, state laws, certifications

### Business Model
- **Free for users** - All quizzes, content, and resources
- **Lead generation** - Qualified leads routed to Vero Verified Network installers
- **Revenue** - Installer referral fees (not built into MVP)

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Homepage   │  │    Quizzes   │  │  White Papers│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │Lead Form     │  │  Resources   │  │  Thank You   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 14 (Vercel)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ App Router   │  │Server Actions│  │ API Routes   │      │
│  │ (RSC)        │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Components   │  │  Middleware  │  │  Analytics   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
           │                  │                   │
           ▼                  ▼                   ▼
    ┌──────────┐      ┌──────────┐       ┌──────────┐
    │ Supabase │      │  Resend  │       │Google GA4│
    │(Database)│      │  (Email) │       │(Analytics)│
    └──────────┘      └──────────┘       └──────────┘
```

---

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with Server Components
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Accessible component library
- **React Email** - Email templates

### Backend
- **Next.js Server Actions** - Type-safe mutations
- **Next.js API Routes** - REST endpoints for integrations
- **Prisma** - Database ORM
- **Zod** - Runtime validation

### Database
- **Supabase** - PostgreSQL hosting
- **Prisma** - Schema management and migrations

### Infrastructure
- **Vercel** - Hosting and deployment
- **Resend** - Transactional emails
- **Google Analytics 4** - User analytics
- **Vercel Analytics** - Performance monitoring

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Prisma Studio** - Database GUI
- **Git** - Version control

---

## Data Architecture

### Database Tables

```
quizzes
├── id (cuid)
├── slug (unique)
├── title, description, icon
├── questions (JSON)
├── scoring (JSON)
└── metadata (priority, active, timestamps)

quiz_sessions
├── id (cuid)
├── quizId (FK → quizzes)
├── sessionToken (unique, stored in localStorage)
├── answers (JSON)
├── score, severity
├── completed, completedAt
├── email (optional)
└── timestamps

leads
├── id (cuid)
├── contact (firstName, lastName, phone, email, zipCode)
├── vehicle (year, make, model, hasAdas)
├── service (type, urgency, damageDetails)
├── tracking (source, sourcePage, quizSessionId, utmParams)
├── qualityScore
├── status
└── timestamps

content
├── id (cuid)
├── type ("white_paper" | "blog_post")
├── slug (unique)
├── title, subtitle, body (MDX)
├── metadata (category, tags, author, readTime)
├── seo (metaTitle, metaDescription, ogImage)
├── relationships (parentId, relatedQuizzes, relatedContent)
├── tableOfContents (JSON)
├── faqs (JSON)
├── publishing (status, publishedAt, featured, priority)
├── analytics (viewCount, avgTimeOnPage)
└── timestamps

analytics_events
├── id (cuid)
├── eventType
├── eventData (JSON)
├── sessionId, userId
├── page, referrer
├── device info (userAgent, device, browser)
└── timestamp

Resource Tables:
├── glossary_terms
├── faqs
├── state_laws
├── certifications
├── vehicle_makes
└── vehicle_models
```

### Data Relationships

```
Quiz (1) ──── (many) QuizSession
                       │
                       │ (optional FK)
                       ▼
                     Lead

Content (parent) ──── (many) Content (children)

VehicleMake (1) ──── (many) VehicleModel
```

---

## Application Flow

### Quiz Flow

```
1. User lands on /quizzes
2. Clicks "Start Quiz"
   → POST /api/quiz/start
   → Creates QuizSession (sessionToken saved to localStorage)
3. User answers questions
   → Each answer: Server Action saveQuizAnswer()
   → Auto-saves progress to database (debounced)
4. User completes quiz
   → Server Action completeQuiz()
   → Calculates score and severity
   → Redirects to /quizzes/[slug]/results/[id]
5. User views results
   → Shows personalized recommendations
   → CTAs: Email Results | Find Installers
6. User clicks "Find Installers"
   → Redirects to /find-installers
   → Form pre-filled from localStorage (quizSessionId, answers)
```

### Lead Generation Flow

```
1. User lands on /find-installers
   → Check localStorage for quiz data (pre-populate)
2. User completes multi-step form
   → Progress saved to localStorage (resume on refresh)
   → Validation per step
   → Analytics: track form_step_completed events
3. User submits form
   → Server Action submitLead()
   → Validates input (Zod)
   → Creates Lead record
   → Calculates quality score
   → Sends confirmation email (Resend)
   → Sends installer notification (Resend)
   → Tracks analytics event
   → Redirects to /find-installers/thank-you/[id]
4. User sees thank you page
   → Shows request summary
   → Timeline of next steps
   → Engagement content (white papers, quizzes)
```

### Content Consumption Flow

```
1. User lands on /safety-guides/[slug]
   → Server Component fetches content from database
   → Renders white paper with sidebar
2. User reads content
   → ScrollTracker component tracks scroll depth
   → Analytics: white_paper_viewed event
3. User clicks embedded quiz CTA
   → Redirects to /quizzes/[slug]
   → Starts quiz flow (see above)
4. User clicks sidebar "Find Installers" widget
   → Redirects to /find-installers
   → Pre-fills ZIP from widget input
```

---

## Component Architecture

### Server Components (Default)
- All pages (layout, homepage, white papers, blog posts)
- Static content components (TrustBar, Testimonial, Footer)
- Data-fetching components (fetch from database)

### Client Components (Interactive)
- Quiz engine and quiz UI
- Multi-step forms
- Navigation (mobile menu)
- Header (scroll behavior)
- CTAs with animations
- Analytics trackers

### Shared UI (Shadcn/ui)
- Button, Input, Form, Card, Badge
- Accordion, Tabs, Dialog, Progress
- All have built-in accessibility

---

## Routing Structure

```
/
├── (marketing)/           # Layout group
│   ├── page.tsx          # Homepage
│   ├── about/
│   └── contact/
│
├── quizzes/
│   ├── page.tsx          # Quiz hub
│   └── [slug]/
│       ├── page.tsx      # Quiz interface
│       └── results/
│           └── [id]/page.tsx  # Results page
│
├── safety-guides/
│   ├── page.tsx          # White paper hub
│   └── [slug]/
│       ├── page.tsx      # White paper
│       └── [post-slug]/
│           └── page.tsx  # Blog post
│
├── find-installers/
│   ├── page.tsx          # Lead form
│   └── thank-you/
│       └── [id]/page.tsx # Confirmation
│
├── resources/
│   ├── glossary/page.tsx
│   ├── faq/page.tsx
│   ├── state-laws/page.tsx
│   └── certifications/page.tsx
│
└── api/
    ├── quiz/
    │   ├── start/route.ts
    │   ├── answer/route.ts
    │   └── complete/route.ts
    ├── leads/
    │   ├── submit/route.ts
    │   └── vehicles/route.ts
    ├── content/
    │   └── view/route.ts
    └── analytics/
        └── track/route.ts
```

---

## State Management

### Client-Side State
- **Quiz Progress**: React useState in QuizEngine
- **Form State**: React useState in MultiStepForm
- **UI State**: React useState for modals, dropdowns, etc.

### Persistence
- **Quiz Sessions**: Database (Supabase)
- **Form Progress**: localStorage (temporary)
- **Quiz Data for Pre-fill**: localStorage (quizSessionId)

### No Global State Management Needed
- Server Components fetch data directly
- Client Components use local state
- Props passed down component tree

---

## API Design

### Server Actions (Preferred)
```typescript
'use server';

export async function submitLead(data: LeadFormData) {
  // Direct database access
  // Type-safe
  // No API endpoint needed
}
```

### Route Handlers (When Needed)
```typescript
// app/api/quiz/start/route.ts
export async function POST(request: Request) {
  // For external integrations
  // When you need REST endpoint
}
```

---

## Performance Optimizations

### Code Splitting
- Automatic route-based code splitting (Next.js)
- Dynamic imports for heavy client components
- Lazy loading for below-fold content

### Image Optimization
- Next.js Image component (automatic WebP, lazy load)
- Responsive images with srcset
- Optimized image hosting (Vercel)

### Caching Strategy
```typescript
// Static pages: cached at CDN
export const revalidate = 3600; // 1 hour

// Dynamic data: on-demand revalidation
revalidatePath('/safety-guides');

// API responses: cache headers
return NextResponse.json(data, {
  headers: { 'Cache-Control': 'public, s-maxage=3600' }
});
```

### Database Query Optimization
- Indexed queries (see DATABASE.md)
- Prisma connection pooling
- SELECT only needed fields
- Avoid N+1 queries (use includes)

---

## Security Considerations

### Input Validation
```typescript
import { z } from 'zod';

const leadSchema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/),
  zipCode: z.string().regex(/^\d{5}$/),
  // ...
});

// Validate before database insert
const validatedData = leadSchema.parse(formData);
```

### CSRF Protection
- Built into Next.js Server Actions
- Origin validation for API routes

### Rate Limiting
```typescript
// Future: Upstash Redis rate limiting
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m')
});
```

### Environment Variables
- All secrets in .env.local (not committed)
- Server-only secrets (SUPABASE_SERVICE_ROLE_KEY)
- Client-safe variables (NEXT_PUBLIC_*)

---

## Analytics Architecture

### Event Tracking

**Client-Side** (Google Analytics 4):
```typescript
window.gtag('event', 'quiz_started', {
  quiz_id: 'clx123',
  quiz_slug: 'windshield-safety'
});
```

**Server-Side** (Custom Database):
```typescript
await prisma.analyticsEvent.create({
  data: {
    eventType: 'quiz_completed',
    eventData: { quizId, severity, score },
    timestamp: new Date()
  }
});
```

### Conversion Funnel Tracking
1. `page_view` - Landing page
2. `quiz_started` - User engagement
3. `quiz_completed` - Qualification
4. `lead_form_started` - Intent
5. `lead_form_submitted` - Conversion

### Metrics Dashboard (Future)
- Quiz completion rates
- Form abandonment by step
- Lead quality scores
- Source attribution
- Conversion rates by funnel

---

## Email Architecture

### Transactional Emails (Resend)

**Quiz Results Email**:
- Triggered: User requests email on results page
- Template: React Email component
- Data: Quiz results, severity, recommendations
- CTA: Link to Find Installers

**Lead Confirmation Email**:
- Triggered: Lead form submission
- Template: React Email component
- Data: Request summary, reference number, timeline
- CTA: N/A (informational)

**Installer Notification Email**:
- Triggered: Lead form submission
- Template: React Email component
- Data: Lead details, contact info, urgency
- CTA: N/A (internal notification)

### Email Templates

```typescript
// emails/quiz-results.tsx
import { Html, Container, Button } from '@react-email/components';

export default function QuizResultsEmail({ session, quiz }) {
  return (
    <Html>
      <Container>
        <h1>Your {quiz.title} Results</h1>
        <SeverityBanner severity={session.severity} />
        <Button href={`${baseUrl}/find-installers`}>
          Find Certified Installers
        </Button>
      </Container>
    </Html>
  );
}
```

---

## Deployment Architecture

### Vercel Deployment

```
Git Push → GitHub
    ↓
Automatic Build (Vercel)
    ↓
Next.js Build Process
├── Static page generation
├── API route bundling
├── Image optimization
└── Asset compression
    ↓
Deploy to Vercel Edge Network
├── CDN distribution
├── Serverless functions
└── Edge middleware
    ↓
Live on windshieldadvisor.info
```

### Environment Setup

**Development**:
```bash
npm run dev
# Runs on http://localhost:3000
# Hot reload enabled
# DATABASE_URL points to dev database
```

**Production**:
```bash
npm run build
npm run start
# Or deploy to Vercel
# DATABASE_URL points to production database
```

### CI/CD Pipeline
1. Push to main branch
2. Vercel detects change
3. Runs `npm run build`
4. Runs `npm run lint`
5. Deploys if successful
6. Rolls back if failed

---

## Monitoring & Observability

### Performance Monitoring
- **Vercel Analytics**: Core Web Vitals, page load times
- **Google Analytics 4**: User behavior, conversions
- **Custom Events**: Quiz completions, form submissions

### Error Tracking (Future)
```typescript
// Sentry integration
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});
```

### Database Monitoring
- Supabase dashboard (query performance)
- Prisma query logging (development)
- Slow query alerts (production)

---

## Scalability Considerations

### Current Architecture
- **Serverless** - Auto-scales with traffic
- **Database** - Supabase handles connection pooling
- **CDN** - Static assets cached globally
- **No server** - No manual scaling needed

### Future Optimizations
- **Redis caching** - For frequently accessed data
- **Read replicas** - For high-traffic content pages
- **Queue system** - For async email sending (BullMQ)
- **Image CDN** - For user-uploaded images (Cloudinary)

---

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Set up database
npx prisma generate
npx prisma db push
npx prisma db seed

# Start dev server
npm run dev

# Open Prisma Studio (database GUI)
npm run db:studio
```

### Code Organization
```
src/
├── app/          # Pages and routing
├── components/   # React components
├── lib/          # Utilities and clients
├── types/        # TypeScript types
├── data/         # Static data (quizzes)
└── emails/       # Email templates
```

### Testing Strategy
- **Unit tests** - Quiz logic, form validation
- **Integration tests** - API routes, Server Actions
- **E2E tests** - Critical flows (quiz → lead)
- **Manual QA** - Cross-browser, responsive design

---

## Future Enhancements

### Phase 2 Features
- Admin dashboard for content management
- User accounts (save quiz history)
- Installer portal (view leads)
- Advanced analytics dashboard
- A/B testing framework

### Phase 3 Features
- Spanish language version
- Mobile app (React Native)
- Review/rating system
- Live chat support
- Advanced lead routing (AI-based)

---

## Documentation Index

- [README.md](../README.md) - Project overview, getting started
- [PROJECT_MANAGEMENT.md](../PROJECT_MANAGEMENT.md) - Build phases, task tracking
- [DATABASE.md](./DATABASE.md) - Database schema, queries
- [COMPONENTS.md](./COMPONENTS.md) - Component library, props
- [API.md](./API.md) - API routes, Server Actions, data flow
- [ORIGINAL_BRIEF.md](./ORIGINAL_BRIEF.md) - Original requirements
- [ARCHITECTURE.md](./ARCHITECTURE.md) - This document

---

## Quick Reference

### Key Files
- `src/app/layout.tsx` - Root layout, global styles
- `src/lib/prisma.ts` - Database client
- `src/lib/resend.ts` - Email client
- `src/lib/analytics.ts` - Analytics helpers
- `prisma/schema.prisma` - Database schema

### Key Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run linter
npm run type-check   # TypeScript check
npx prisma studio    # Open database GUI
npx prisma migrate dev  # Create migration
```

### Environment Variables
```env
DATABASE_URL=postgresql://...
RESEND_API_KEY=re_...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
```

---

**For detailed information on each topic, refer to the respective documentation files.**
