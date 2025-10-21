# Windshield Advisor

Lead generation platform providing research-backed windshield safety guidance and connecting vehicle owners with ADAS-certified installers.

## 🎯 Project Overview

Windshield Advisor is a conversion-optimized educational platform that:
- Provides interactive safety quizzes with personalized results
- Offers comprehensive white papers and guides on windshield safety
- Connects users with Vero Verified Network installers
- Focuses on ADAS calibration, OEM vs aftermarket glass, and installer qualification

## 🏗️ Technical Stack

### Core Framework
- **Next.js 14** - App Router, React Server Components, TypeScript
- **Tailwind CSS** - Utility-first styling with custom design system
- **Shadcn/ui** - Accessible component library

### Database & Backend
- **Supabase** - PostgreSQL database, authentication, real-time subscriptions
- **Prisma** - Type-safe database ORM
- **Server Actions** - Next.js native data mutations

### Integrations
- **Resend** - Transactional emails (quiz results, lead notifications)
- **Vercel Analytics** - Performance monitoring
- **Google Analytics 4** - Conversion tracking and funnels
- **React Email** - Email template components

### Performance & SEO
- **Next.js Image Optimization** - Automatic WebP conversion, lazy loading
- **next-seo** - Structured data and meta tags
- **next-sitemap** - Automatic sitemap generation
- **Geist Font** - Optimized font loading

## 📁 Project Structure

```
windshieldadvisor/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (marketing)/             # Marketing pages layout group
│   │   │   ├── page.tsx             # Homepage
│   │   │   ├── about/               # About pages
│   │   │   └── contact/             # Contact page
│   │   ├── quizzes/                 # Quiz routes
│   │   │   ├── page.tsx             # Quiz hub
│   │   │   ├── [slug]/              # Individual quiz pages
│   │   │   │   ├── page.tsx         # Quiz interface
│   │   │   │   └── results/         # Results pages
│   │   │   │       └── [id]/page.tsx
│   │   ├── safety-guides/           # White papers & blog posts
│   │   │   ├── page.tsx             # White paper hub
│   │   │   ├── [slug]/              # White paper pages
│   │   │   │   ├── page.tsx
│   │   │   │   └── [post-slug]/     # Supporting blog posts
│   │   │   │       └── page.tsx
│   │   ├── find-installers/         # Lead generation
│   │   │   ├── page.tsx             # Multi-step form
│   │   │   └── thank-you/           # Confirmation page
│   │   │       └── [id]/page.tsx
│   │   ├── resources/               # Resource pages
│   │   │   ├── glossary/
│   │   │   ├── faq/
│   │   │   ├── state-laws/
│   │   │   └── certifications/
│   │   ├── api/                     # API routes
│   │   │   ├── quiz/                # Quiz submissions
│   │   │   ├── leads/               # Lead form submissions
│   │   │   ├── email/               # Email sending
│   │   │   └── analytics/           # Event tracking
│   │   ├── layout.tsx               # Root layout
│   │   └── not-found.tsx            # 404 page
│   │
│   ├── components/                   # React components
│   │   ├── ui/                      # Shadcn/ui primitives
│   │   ├── layout/                  # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Breadcrumb.tsx
│   │   ├── quiz/                    # Quiz components
│   │   │   ├── QuizEngine.tsx
│   │   │   ├── QuizQuestion.tsx
│   │   │   ├── QuizProgress.tsx
│   │   │   ├── QuizResults.tsx
│   │   │   └── QuizCard.tsx
│   │   ├── forms/                   # Form components
│   │   │   ├── MultiStepForm.tsx
│   │   │   ├── LeadForm/
│   │   │   │   ├── LocationStep.tsx
│   │   │   │   ├── VehicleStep.tsx
│   │   │   │   ├── ServiceStep.tsx
│   │   │   │   ├── DamageStep.tsx
│   │   │   │   ├── UrgencyStep.tsx
│   │   │   │   └── ContactStep.tsx
│   │   │   └── QuickLeadWidget.tsx
│   │   ├── content/                 # Content components
│   │   │   ├── WhitePaperLayout.tsx
│   │   │   ├── BlogPostLayout.tsx
│   │   │   ├── TableOfContents.tsx
│   │   │   ├── ArticleHeader.tsx
│   │   │   ├── CalloutBox.tsx
│   │   │   └── FAQAccordion.tsx
│   │   ├── cta/                     # Call-to-action components
│   │   │   ├── HeroCTA.tsx
│   │   │   ├── InlineCTA.tsx
│   │   │   ├── FloatingCTA.tsx
│   │   │   └── ExitIntentPopup.tsx
│   │   └── shared/                  # Shared components
│   │       ├── TrustBar.tsx
│   │       ├── TrustSignals.tsx
│   │       ├── Testimonial.tsx
│   │       ├── SeverityBadge.tsx
│   │       └── StepIndicator.tsx
│   │
│   ├── lib/                         # Utility libraries
│   │   ├── supabase/
│   │   │   ├── client.ts            # Client-side Supabase
│   │   │   ├── server.ts            # Server-side Supabase
│   │   │   └── middleware.ts        # Auth middleware
│   │   ├── prisma.ts                # Prisma client
│   │   ├── resend.ts                # Email client
│   │   ├── analytics.ts             # Analytics helpers
│   │   ├── utils.ts                 # Utility functions
│   │   └── validation.ts            # Zod schemas
│   │
│   ├── types/                       # TypeScript types
│   │   ├── quiz.ts
│   │   ├── content.ts
│   │   ├── lead.ts
│   │   └── database.ts
│   │
│   ├── data/                        # Static data
│   │   ├── quizzes/                 # Quiz definitions
│   │   │   ├── windshield-safety.json
│   │   │   ├── adas-calibration.json
│   │   │   ├── repair-replace.json
│   │   │   ├── installer-qualified.json
│   │   │   └── insurance-coverage.json
│   │   ├── content/                 # White papers & blog posts
│   │   │   └── [stored in database, managed via CMS]
│   │   ├── vehicles/                # Vehicle data
│   │   │   ├── makes.json
│   │   │   ├── models.json
│   │   │   └── adas-database.json
│   │   └── resources/               # Resource data
│   │       ├── glossary.json
│   │       ├── faq.json
│   │       └── state-laws.json
│   │
│   └── emails/                      # Email templates
│       ├── quiz-results.tsx
│       ├── lead-confirmation.tsx
│       ├── installer-notification.tsx
│       └── components/
│           ├── EmailHeader.tsx
│           └── EmailFooter.tsx
│
├── prisma/
│   ├── schema.prisma                # Database schema
│   ├── migrations/                  # Database migrations
│   └── seed.ts                      # Seed data
│
├── public/
│   ├── images/
│   │   ├── logos/
│   │   ├── certifications/
│   │   ├── damage-types/
│   │   └── diagrams/
│   ├── fonts/
│   └── favicon.ico
│
├── docs/                            # Documentation
│   ├── ARCHITECTURE.md              # Detailed architecture
│   ├── DATABASE.md                  # Database schema docs
│   ├── API.md                       # API documentation
│   ├── COMPONENTS.md                # Component library
│   └── DEPLOYMENT.md                # Deployment guide
│
├── .env.local                       # Environment variables
├── .env.example                     # Example environment file
├── next.config.js                   # Next.js configuration
├── tailwind.config.ts               # Tailwind configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json
└── PROJECT_MANAGEMENT.md            # Build tracker
```

## 🗄️ Database Schema

### Core Tables

**quizzes**
- Quiz definitions, questions, conditional logic, scoring rules

**quiz_sessions**
- User quiz progress, answers, results (persists across sessions)

**leads**
- Lead submissions from Find Installers form, includes source tracking

**content**
- White papers, blog posts, metadata, SEO data

**analytics_events**
- Custom event tracking (quiz completions, CTA clicks, form abandonment)

See [docs/DATABASE.md](./docs/DATABASE.md) for detailed schema.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Supabase account
- Resend account
- Vercel account (for deployment)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/windshieldadvisor.git
cd windshieldadvisor

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Set up database
npx prisma generate
npx prisma db push
npx prisma db seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# Email
RESEND_API_KEY="re_..."
FROM_EMAIL="noreply@windshieldadvisor.info"

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Sanity CMS
SANITY_TOKEN_WINDSHIELD="skBPlnCjfKQQosYmGqW29LAxAwUQjAc317uIVA3g6NtEG7dU4ffTqy9FXp7sEO1vRDzN7PXaHTcUGzF8tIEzPW2HW5G0GuIB0PSO0UYxEbn1kJscSKnDKvghgD3Z21WNubucaODzMDU4dAQvfSph8Xq5mnHRTM2MHBiawfcE4i4DhwePhBxu"
SANITY_TOKEN_XL_BENEFITS="sken9iRGChMymiv0STzJBf7LOywIBAO9Anc10OBUbkYRXqFirnYTBjBSvYBKnNBIfCqb2UEHp2R87osv0iB4TLDvWRuC8YwxgT2KYNlJ0lZBzQx1hQoUofvDXJwvJOwL49v0zkBo6fGejKSBdKuD2CrVetwU7VyvgGnNgFZZ5yofKf7DpOi5"
```

## 🎨 Design System

### Colors

```js
// Tailwind config
colors: {
  primary: {
    50: '#f0f9ff',   // Light blue tints
    500: '#0ea5e9',  // Primary brand color
    900: '#0c4a6e',  // Dark blue
  },
  warning: {
    500: '#eab308',  // Yellow caution
  },
  danger: {
    500: '#ef4444',  // Red critical
  },
  success: {
    500: '#22c55e',  // Green safe
  }
}
```

### Typography

- **Headings**: Geist Sans (bold, 700)
- **Body**: Geist Sans (regular, 400)
- **Code**: Geist Mono

### Spacing

- Mobile: 16px base padding
- Desktop: 24px base padding
- Section gaps: 64px (mobile) / 96px (desktop)

## 📊 Analytics Events

### Quiz Events
- `quiz_started` - { quiz_id, quiz_slug }
- `quiz_question_answered` - { quiz_id, question_id, answer }
- `quiz_completed` - { quiz_id, result_severity, duration }
- `quiz_result_email_captured` - { quiz_id, email }
- `quiz_result_cta_clicked` - { quiz_id, cta_type }

### Lead Events
- `lead_form_started` - { source_page, pre_filled }
- `lead_form_step_completed` - { step_number, step_name }
- `lead_form_abandoned` - { last_step }
- `lead_form_submitted` - { source, urgency, has_adas }

### Content Events
- `white_paper_viewed` - { slug, category }
- `blog_post_viewed` - { slug, parent_white_paper }
- `scroll_depth` - { page, depth_percent }
- `cta_clicked` - { cta_type, location, destination }

## 🔧 Development

### Key Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
npm run test         # Run tests
npm run db:studio    # Open Prisma Studio
npm run db:migrate   # Create new migration
```

### Adding a Quiz

1. Create JSON definition in `src/data/quizzes/`
2. Define questions, conditional logic, scoring
3. Import in quiz hub page
4. Create results page template
5. Add analytics tracking

### Adding a White Paper

1. Create MDX file or database entry
2. Add metadata (SEO, category, related quizzes)
3. Define supporting blog posts
4. Add to navigation and sitemap

## 📈 Conversion Flow

```
Entry Point → Educational Content → Engagement → Lead Capture → Thank You
     ↓              ↓                    ↓             ↓            ↓
  Homepage    Quiz/White Paper      Results Page   Form Submit   Follow-up
     ↓              ↓                    ↓             ↓            ↓
  Hero CTA      Learn + Assess      Personalized   Installer    Resources
                                    Recommendations  Match        + Tracking
```

### Primary Conversion Path
1. User takes safety quiz
2. Receives severity-coded results (red/yellow/green)
3. Clicks "Find Installers" CTA (form pre-filled with quiz data)
4. Submits lead form
5. Receives confirmation + educational resources

### Secondary Conversion Path
1. User reads white paper
2. Clicks embedded quiz or lead widget
3. Completes quiz or form
4. Enters primary conversion path

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Setup
1. Add environment variables in Vercel dashboard
2. Connect Supabase database
3. Configure domain (windshieldadvisor.info)
4. Enable Vercel Analytics

### Database Migrations
```bash
# Generate migration
npx prisma migrate dev --name description

# Deploy to production
npx prisma migrate deploy
```

## 📝 Content Management

### White Papers (Database)
- Stored in Supabase `content` table
- Managed via admin dashboard (future)
- MDX support for rich formatting

### Quizzes (JSON)
- Defined in `src/data/quizzes/`
- Version controlled
- Easy A/B testing

### Static Resources (JSON)
- Glossary, FAQ, state laws
- Fast, cacheable
- Easy updates

## 🔒 Security

- Environment variables for all secrets
- Server Actions for mutations
- Input validation with Zod
- Rate limiting on forms
- CSRF protection (Next.js built-in)

## 📄 License

Proprietary - All rights reserved

## 🤝 Contributing

Internal project - contact team lead for contribution guidelines

---

**Project Status**: Architecture phase - see [PROJECT_MANAGEMENT.md](./PROJECT_MANAGEMENT.md) for build progress
