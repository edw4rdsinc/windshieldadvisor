# Windshield Advisor - Project Management

**Project Start Date**: 2025-10-06
**Current Phase**: Architecture & Setup
**Status**: In Progress

---

## 📊 Project Overview

This document tracks the complete build of windshieldadvisor.info, a Next.js-based lead generation platform for windshield safety education and certified installer connections.

### Success Criteria
- [ ] All 5 interactive quizzes functional with conditional logic
- [ ] 10 white paper pages with 4 supporting blog posts each (40 blog posts total)
- [ ] Multi-step lead form with pre-population from quiz data
- [ ] Email notifications via Resend
- [ ] Analytics tracking for all conversion events
- [ ] Mobile-first responsive design
- [ ] Core Web Vitals score 90+
- [ ] Deployed to Vercel with custom domain

---

## 🏗️ Build Phases

### Phase 1: Foundation & Setup ⏳
**Timeline**: Week 1
**Status**: In Progress (60%)

#### 1.1 Project Initialization
- [x] Create README with architecture overview
- [x] Create PROJECT_MANAGEMENT.md tracking document
- [ ] Initialize Next.js 14 project with TypeScript
- [ ] Install core dependencies (Tailwind, Shadcn/ui, Prisma)
- [ ] Set up Git repository and .gitignore
- [ ] Create .env.example with all required variables

#### 1.2 Database Setup
- [ ] Create Supabase project
- [ ] Design Prisma schema (quizzes, leads, content, analytics)
- [ ] Generate Prisma client
- [ ] Create initial migrations
- [ ] Set up database seed file
- [ ] Document database schema in docs/DATABASE.md

#### 1.3 Configuration Files
- [ ] Configure next.config.js (image optimization, redirects)
- [ ] Set up tailwind.config.ts with custom colors
- [ ] Configure TypeScript (tsconfig.json)
- [ ] Set up ESLint and Prettier
- [ ] Create components.json for Shadcn/ui

#### 1.4 Directory Structure
- [ ] Create /src/app folder structure (routes)
- [ ] Create /src/components folder structure
- [ ] Create /src/lib folder structure
- [ ] Create /src/types folder structure
- [ ] Create /src/data folder structure
- [ ] Create /prisma folder structure
- [ ] Create /public/images folder structure
- [ ] Create /docs folder structure

---

### Phase 2: Core Components & Layout ⏸️
**Timeline**: Week 2
**Status**: Not Started

#### 2.1 Layout Components
- [ ] Create Header component with sticky navigation
- [ ] Create Footer component with link sections
- [ ] Create Navigation component (mobile + desktop)
- [ ] Create Breadcrumb component
- [ ] Create root layout.tsx with analytics
- [ ] Create marketing layout group

#### 2.2 UI Components (Shadcn/ui)
- [ ] Install Button component
- [ ] Install Input component
- [ ] Install Form components
- [ ] Install Card component
- [ ] Install Badge component
- [ ] Install Accordion component
- [ ] Install Progress component
- [ ] Install Tabs component
- [ ] Install Dialog/Modal component

#### 2.3 Shared Components
- [ ] Create TrustBar component (certifications)
- [ ] Create TrustSignals component
- [ ] Create Testimonial component
- [ ] Create SeverityBadge component (red/yellow/green)
- [ ] Create StepIndicator component
- [ ] Create CalloutBox component (warning, tip, info)

#### 2.4 CTA Components
- [ ] Create HeroCTA component
- [ ] Create InlineCTA component
- [ ] Create FloatingCTA component (mobile)
- [ ] Create ExitIntentPopup component
- [ ] Create QuickLeadWidget component (sidebar)

---

### Phase 3: Quiz System 🎯
**Timeline**: Week 3-4
**Status**: Not Started
**Priority**: HIGH (core conversion feature)

#### 3.1 Quiz Engine
- [ ] Design quiz JSON schema
- [ ] Create Quiz type definitions
- [ ] Build QuizEngine component (state management)
- [ ] Implement conditional logic system
- [ ] Implement scoring system
- [ ] Create quiz session persistence (Supabase)

#### 3.2 Quiz UI Components
- [ ] Create QuizCard component (hub page)
- [ ] Create QuizQuestion component
- [ ] Create QuizProgress component
- [ ] Create QuizResults component
- [ ] Create quiz answer components (radio, checkbox, visual)
- [ ] Create "Why This Matters" sidebar

#### 3.3 Quiz Data Files
- [ ] Create windshield-safety.json (Priority 1)
- [ ] Create adas-calibration.json (Priority 2)
- [ ] Create repair-replace.json
- [ ] Create installer-qualified.json
- [ ] Create insurance-coverage.json

#### 3.4 Quiz Pages
- [ ] Create /quizzes hub page
- [ ] Create /quizzes/[slug] dynamic route
- [ ] Create /quizzes/[slug]/results/[id] page
- [ ] Implement quiz analytics tracking
- [ ] Add email capture for results
- [ ] Add social sharing for results

#### 3.5 Quiz API Routes
- [ ] POST /api/quiz/start - Initialize session
- [ ] POST /api/quiz/answer - Save answer
- [ ] POST /api/quiz/complete - Save results
- [ ] GET /api/quiz/session/[id] - Retrieve progress
- [ ] POST /api/quiz/email-results - Send email

---

### Phase 4: Lead Generation System 📋
**Timeline**: Week 5
**Status**: Not Started
**Priority**: HIGH (core conversion feature)

#### 4.1 Form Components
- [ ] Create MultiStepForm wrapper component
- [ ] Create LocationStep component (ZIP input)
- [ ] Create VehicleStep component (year/make/model)
- [ ] Create ServiceStep component (service type)
- [ ] Create DamageStep component (conditional)
- [ ] Create UrgencyStep component
- [ ] Create ContactStep component

#### 4.2 Form Logic
- [ ] Implement multi-step state management
- [ ] Create form validation schemas (Zod)
- [ ] Implement form pre-population from quiz data
- [ ] Create form progress persistence
- [ ] Implement form abandonment tracking
- [ ] Add vehicle data lookup (make/model)

#### 4.3 Lead Pages
- [ ] Create /find-installers page
- [ ] Create /find-installers/thank-you/[id] page
- [ ] Design lead submission success flow
- [ ] Create request summary component

#### 4.4 Lead API Routes
- [ ] POST /api/leads/submit - Save lead
- [ ] POST /api/leads/notify - Send installer notifications
- [ ] GET /api/leads/vehicles - Get vehicle data
- [ ] POST /api/leads/validate-zip - Validate ZIP code

#### 4.5 Email Integration (Resend)
- [ ] Set up Resend account
- [ ] Create lead-confirmation email template
- [ ] Create installer-notification email template
- [ ] Create email helper functions
- [ ] Test email delivery

---

### Phase 5: Content System (White Papers & Blog) 📝
**Timeline**: Week 6-7
**Status**: Not Started

#### 5.1 Content Components
- [ ] Create WhitePaperLayout component
- [ ] Create BlogPostLayout component
- [ ] Create TableOfContents component
- [ ] Create ArticleHeader component
- [ ] Create FAQAccordion component
- [ ] Create RelatedContent component

#### 5.2 Content Database
- [ ] Design content schema in Prisma
- [ ] Create content migration
- [ ] Create content type definitions
- [ ] Build content CRUD functions
- [ ] Create MDX support for rich formatting

#### 5.3 White Paper Pages
- [ ] Create /safety-guides hub page
- [ ] Create /safety-guides/[slug] dynamic route
- [ ] Create /safety-guides/[slug]/[post-slug] blog route
- [ ] Implement breadcrumb navigation
- [ ] Add related quiz/blog recommendations
- [ ] Implement scroll tracking

#### 5.4 Content API Routes
- [ ] GET /api/content/white-papers - List white papers
- [ ] GET /api/content/white-papers/[slug] - Get white paper
- [ ] GET /api/content/blog-posts - List blog posts
- [ ] GET /api/content/blog-posts/[slug] - Get blog post
- [ ] POST /api/content/view - Track view

#### 5.5 First Content (Priority Order)
- [ ] White Paper #1: ADAS Calibration Guide
- [ ] White Paper #2: OEM vs Aftermarket Glass
- [ ] White Paper #3: Repair vs Replace
- [ ] White Paper #4: Choosing an Installer
- [ ] Create placeholder pages for remaining 6 white papers

---

### Phase 6: Homepage & Marketing Pages 🏠
**Timeline**: Week 8
**Status**: Not Started

#### 6.1 Homepage Sections
- [ ] Create Hero section with primary CTA
- [ ] Create Trust Bar
- [ ] Create Featured Quizzes section
- [ ] Create How It Works section
- [ ] Create Featured White Papers section
- [ ] Create Lead Gen section (ZIP + CTA)
- [ ] Create Complete Library grid
- [ ] Create Recent Blog Posts section
- [ ] Create Final CTA section

#### 6.2 Marketing Pages
- [ ] Create About page
- [ ] Create Contact page
- [ ] Create Privacy Policy page
- [ ] Create Terms of Service page
- [ ] Create Disclaimer page

#### 6.3 Homepage Optimization
- [ ] Implement exit-intent popup
- [ ] Add scroll-triggered CTAs
- [ ] Optimize images for performance
- [ ] Add structured data (Schema.org)

---

### Phase 7: Resources Section 📚
**Timeline**: Week 9
**Status**: Not Started

#### 7.1 Resource Pages
- [ ] Create Glossary page
- [ ] Create FAQ page
- [ ] Create State Laws page (interactive table)
- [ ] Create Certifications directory
- [ ] Create ADAS vehicle database page

#### 7.2 Resource Data
- [ ] Create glossary.json
- [ ] Create faq.json
- [ ] Create state-laws.json
- [ ] Create certifications.json
- [ ] Create adas-database.json

#### 7.3 Resource Components
- [ ] Create GlossaryList component
- [ ] Create FAQList component (structured data)
- [ ] Create StateLawsTable component (sortable/filterable)
- [ ] Create CertificationCard component
- [ ] Create VehicleSearch component

---

### Phase 8: Analytics & Tracking 📊
**Timeline**: Week 10
**Status**: Not Started

#### 8.1 Analytics Setup
- [ ] Set up Google Analytics 4
- [ ] Configure Vercel Analytics
- [ ] Create custom event tracking helpers
- [ ] Implement conversion funnel tracking

#### 8.2 Event Tracking Implementation
- [ ] Track quiz_started events
- [ ] Track quiz_question_answered events
- [ ] Track quiz_completed events
- [ ] Track lead_form_started events
- [ ] Track lead_form_step_completed events
- [ ] Track lead_form_abandoned events
- [ ] Track lead_form_submitted events
- [ ] Track cta_clicked events
- [ ] Track scroll_depth events
- [ ] Track white_paper_viewed events

#### 8.3 Analytics Database
- [ ] Create analytics_events table
- [ ] Create analytics API routes
- [ ] Build analytics dashboard (admin)

---

### Phase 9: SEO & Performance Optimization 🚀
**Timeline**: Week 11
**Status**: Not Started

#### 9.1 SEO Implementation
- [ ] Install next-seo
- [ ] Create SEO component for metadata
- [ ] Add structured data to all page types
- [ ] Create sitemap.xml (next-sitemap)
- [ ] Create robots.txt
- [ ] Add OpenGraph tags
- [ ] Add Twitter Card tags
- [ ] Implement canonical URLs

#### 9.2 Schema Markup
- [ ] Add WebSite schema to homepage
- [ ] Add Quiz schema to quiz pages
- [ ] Add Article schema to white papers
- [ ] Add FAQPage schema to FAQ sections
- [ ] Add Service schema to Find Installers

#### 9.3 Performance Optimization
- [ ] Optimize images (WebP, lazy loading)
- [ ] Implement font optimization
- [ ] Code splitting for routes
- [ ] Minimize JavaScript bundles
- [ ] Implement server components where possible
- [ ] Add loading skeletons
- [ ] Optimize Core Web Vitals

#### 9.4 Testing
- [ ] Run Lighthouse audits
- [ ] Test mobile performance
- [ ] Test accessibility (a11y)
- [ ] Fix any issues found

---

### Phase 10: Testing & QA 🧪
**Timeline**: Week 12
**Status**: Not Started

#### 10.1 Functional Testing
- [ ] Test all quiz flows (5 quizzes)
- [ ] Test quiz conditional logic
- [ ] Test quiz results calculation
- [ ] Test lead form submission
- [ ] Test form pre-population from quiz
- [ ] Test email delivery
- [ ] Test all CTA links
- [ ] Test navigation
- [ ] Test breadcrumbs

#### 10.2 Cross-Browser Testing
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge
- [ ] Test in mobile browsers

#### 10.3 Responsive Testing
- [ ] Test mobile layout (375px, 414px)
- [ ] Test tablet layout (768px, 1024px)
- [ ] Test desktop layout (1280px, 1920px)
- [ ] Test touch interactions
- [ ] Test sticky header behavior

#### 10.4 Data Validation
- [ ] Test form validation errors
- [ ] Test required field handling
- [ ] Test email format validation
- [ ] Test ZIP code validation
- [ ] Test phone number validation

#### 10.5 Error Handling
- [ ] Test 404 page
- [ ] Test API error responses
- [ ] Test database connection errors
- [ ] Test email send failures
- [ ] Add error boundaries

---

### Phase 11: Deployment & Launch 🚀
**Timeline**: Week 13
**Status**: Not Started

#### 11.1 Pre-Deployment
- [ ] Set up Vercel account
- [ ] Connect GitHub repository
- [ ] Configure environment variables in Vercel
- [ ] Set up production database (Supabase)
- [ ] Run database migrations in production
- [ ] Test production build locally

#### 11.2 Domain & DNS
- [ ] Purchase windshieldadvisor.info domain
- [ ] Configure DNS settings
- [ ] Add domain to Vercel
- [ ] Set up SSL certificate
- [ ] Configure redirects (www → non-www)

#### 11.3 Deployment
- [ ] Deploy to Vercel production
- [ ] Verify all pages load correctly
- [ ] Test all forms in production
- [ ] Verify email delivery
- [ ] Test analytics tracking
- [ ] Submit sitemap to Google Search Console

#### 11.4 Post-Launch
- [ ] Monitor error logs (first 24 hours)
- [ ] Check Core Web Vitals in production
- [ ] Verify conversion tracking
- [ ] Test lead notifications
- [ ] Document any issues

---

### Phase 12: Content Population 📄
**Timeline**: Week 14-15
**Status**: Not Started

#### 12.1 White Papers (10 total)
- [ ] Upload White Paper #1: ADAS Calibration
- [ ] Upload White Paper #2: OEM vs Aftermarket
- [ ] Upload White Paper #3: Repair vs Replace
- [ ] Upload White Paper #4: Choosing Installer
- [ ] Upload White Paper #5: [TBD]
- [ ] Upload White Paper #6: [TBD]
- [ ] Upload White Paper #7: [TBD]
- [ ] Upload White Paper #8: [TBD]
- [ ] Upload White Paper #9: [TBD]
- [ ] Upload White Paper #10: [TBD]

#### 12.2 Supporting Blog Posts (40 total - 4 per white paper)
- [ ] Blog Posts 1.1-1.4 (ADAS Calibration)
- [ ] Blog Posts 2.1-2.4 (OEM vs Aftermarket)
- [ ] Blog Posts 3.1-3.4 (Repair vs Replace)
- [ ] Blog Posts 4.1-4.4 (Choosing Installer)
- [ ] Blog Posts 5.1-5.4
- [ ] Blog Posts 6.1-6.4
- [ ] Blog Posts 7.1-7.4
- [ ] Blog Posts 8.1-8.4
- [ ] Blog Posts 9.1-9.4
- [ ] Blog Posts 10.1-10.4

#### 12.3 Resources
- [ ] Populate glossary (50+ terms)
- [ ] Populate FAQ (25+ questions)
- [ ] Add 50-state law data
- [ ] Add certification directory
- [ ] Add ADAS vehicle database

---

## 📋 Technical Debt & Future Enhancements

### Technical Debt
- [ ] Implement rate limiting on API routes
- [ ] Add request caching for vehicle data
- [ ] Optimize database queries (indexing)
- [ ] Add unit tests for quiz logic
- [ ] Add integration tests for forms
- [ ] Implement error monitoring (Sentry)

### Future Enhancements
- [ ] Admin dashboard for content management
- [ ] A/B testing for quiz questions
- [ ] Advanced analytics dashboard
- [ ] User accounts (save quiz history)
- [ ] Installer portal (view leads)
- [ ] Review/rating system for installers
- [ ] Live chat support
- [ ] Spanish language version

---

## 🎯 Key Performance Indicators (KPIs)

### Traffic Metrics
- [ ] 10,000 monthly visitors (Month 3)
- [ ] 50% organic search traffic
- [ ] < 50% bounce rate
- [ ] 3+ minutes average session duration

### Conversion Metrics
- [ ] 10% quiz completion rate
- [ ] 15% quiz-to-lead conversion
- [ ] 5% overall visitor-to-lead conversion
- [ ] 100+ qualified leads per month

### Technical Metrics
- [ ] 90+ Lighthouse Performance score
- [ ] < 2s page load time
- [ ] < 0.1 Cumulative Layout Shift
- [ ] 99.9% uptime

### SEO Metrics
- [ ] 50+ pages indexed (Google)
- [ ] Featured snippets for 10+ queries
- [ ] Page 1 ranking for target keywords

---

## 🐛 Known Issues & Bugs

_Track bugs discovered during development here_

| ID | Description | Priority | Status | Assigned To |
|----|-------------|----------|--------|-------------|
| - | - | - | - | - |

---

## 📝 Decision Log

### 2025-10-06
- **Decision**: Use Supabase instead of standalone PostgreSQL
- **Rationale**: Provides auth, real-time, storage in addition to database
- **Impact**: Simplified architecture, faster development

### 2025-10-06
- **Decision**: Quiz data in JSON files, not database
- **Rationale**: Easier version control, no CMS needed for quiz updates
- **Impact**: Quiz changes require code deploy (acceptable trade-off)

### 2025-10-06
- **Decision**: Store quiz sessions in database
- **Rationale**: Enables persistence across devices, better analytics
- **Impact**: Requires session ID generation and retrieval

### 2025-10-06
- **Decision**: Use localStorage for form pre-population (quiz → lead form)
- **Rationale**: Simple, no backend required, works client-side
- **Impact**: Data only persists in same browser

---

## 📞 Stakeholder Communication

### Weekly Status Updates
_Post weekly progress updates here_

#### Week 1 (2025-10-06)
- ✅ Completed README with full architecture
- ✅ Created PROJECT_MANAGEMENT.md tracker
- 🔄 In Progress: Database schema design
- ⏭️ Next: Initialize Next.js project

---

## 🔗 Quick Links

- [GitHub Repository](#)
- [Vercel Dashboard](#)
- [Supabase Dashboard](#)
- [Analytics Dashboard](#)
- [Figma Designs](#) (if applicable)
- [Content Calendar](#)

---

## 📊 Progress Summary

**Overall Completion**: 5%

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 1: Foundation & Setup | 🟡 In Progress | 60% |
| Phase 2: Core Components | ⚪ Not Started | 0% |
| Phase 3: Quiz System | ⚪ Not Started | 0% |
| Phase 4: Lead Generation | ⚪ Not Started | 0% |
| Phase 5: Content System | ⚪ Not Started | 0% |
| Phase 6: Homepage | ⚪ Not Started | 0% |
| Phase 7: Resources | ⚪ Not Started | 0% |
| Phase 8: Analytics | ⚪ Not Started | 0% |
| Phase 9: SEO & Performance | ⚪ Not Started | 0% |
| Phase 10: Testing | ⚪ Not Started | 0% |
| Phase 11: Deployment | ⚪ Not Started | 0% |
| Phase 12: Content Population | ⚪ Not Started | 0% |

---

**Last Updated**: 2025-10-06
**Next Review**: 2025-10-13
