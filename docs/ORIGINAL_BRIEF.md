# Original Project Brief

This document contains the original project requirements for windshieldadvisor.info. Use this as a reference when building features to ensure alignment with the original vision.

---

## Site Structure

**Navigation**: Home | Safety Quizzes | Safety Guides | Find Installers | Resources

### Quiz Hub (/quizzes/)
5 interactive quizzes with conditional logic, results pages (red/yellow/green severity), email gates, auto-populate lead forms.

**Priority Quizzes**:
1. "Is My Windshield Safe?"
2. "Does My Car Need ADAS Calibration?"
3. "Should I Repair or Replace?"
4. "Is My Installer Qualified?"
5. "Will Insurance Cover My Replacement?"

### White Paper Hub (/safety-guides/)
10 pillar pages, each with 4 supporting blog posts (40 blog posts total).

**Priority Order**:
1. ADAS Calibration
2. OEM vs Aftermarket
3. Repair vs Replace
4. Choosing Installer
5-10. (To be determined)

### Lead Gen Page (/find-installers/)
Multi-step form collecting:
- ZIP
- Phone, email
- Vehicle details
- Service type
- Urgency

Pre-fill from quiz data. Emphasize "Vero Verified Network" trust signals.

### Resources
- Glossary
- FAQ
- Interactive 50-state insurance law table
- ADAS vehicle database
- Certification directory

---

## CTA Strategy

- **Homepage hero** = Primary quiz
- **Quiz results** = Find Installers (pre-filled)
- **White papers** = Sidebar lead widget + relevant quiz
- **All pages** = Persistent "Find Installers" in header

---

## Conversion Flows

### Primary Flow
Quiz → Results → Find Installers → Thank You

### Secondary Flow
White Paper → Quiz → Find Installers

### Tertiary Flow
Blog Post → White Paper → Quiz → Find Installers

---

## Technical Requirements

- Mobile-first responsive design
- Quiz engine with conditional logic & scoring
- Form pre-population from quiz data
- Schema markup (Quiz, FAQPage, Article, LocalBusiness)
- Analytics tracking: quiz completion, form abandonment, CTA clicks
- Lead routing to Vero network based on ZIP

---

## Design Priorities

1. Trust signals everywhere (certifications, verified network badges)
2. Clean, professional, safety-focused aesthetic
3. Clear visual hierarchy (education → urgency → action)
4. Sticky header with "Find Installers" CTA
5. Exit-intent popups on high-value pages

---

## Content Tone

Authoritative but accessible. Research-backed. Safety-focused without being alarmist. Technical depth that builds trust. Clear CTAs without being pushy.

---

## Optimization Goals

- Fast load times
- Core Web Vitals compliance
- Structured data for AI/search
- Semantic HTML
- AI-friendly formatting (clear H2 questions, tables, lists, citations)

---

## Performance Budget

- Page load time: < 2 seconds (3G)
- First Contentful Paint: < 1 second
- Largest Contentful Paint: < 2.5 seconds
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3.5 seconds
- Mobile Performance Score: 90+

---

## Page Templates

Detailed page templates are documented in the original README. Key page types:

1. **Homepage** - Hero, trust bar, featured quizzes, white papers, lead gen section
2. **Quiz Page** - Progress bar, question flow, sidebar context, results page
3. **White Paper** - TOC, article content, sidebar CTAs, FAQ accordion
4. **Blog Post** - Parent white paper link, streamlined sidebar, navigation
5. **Find Installers** - Multi-step form, trust signals, testimonials
6. **Thank You** - Confirmation, timeline, request summary, engagement section
7. **Quiz Hub** - Featured quizzes, how it works, testimonials

---

## Content Publishing Calendar

**Goal**: 2-3 posts per week for 15 weeks

### Week 1
- Monday: White Paper #1 (ADAS Calibration)
- Wednesday: Blog Post 1.1 (What is ADAS?)
- Friday: Quiz #1 Launch (Is My Windshield Safe?)

### Week 2
- Monday: Blog Post 1.2 (ADAS Cost)
- Wednesday: Blog Post 1.3 (Do I Need It?)
- Friday: Blog Post 1.4 (ADAS Failure Signs)

### Weeks 3-15
Continue pattern with remaining white papers, blog posts, and quizzes.

---

## Mobile-Specific Considerations

### Homepage Mobile
- Single-column layout
- Hero CTA takes full width
- Quizzes stack vertically
- Tap-friendly buttons (44x44px minimum)
- Sticky header compressed to icon

### Quiz Mobile
- Full-screen experience
- One question per screen
- Large answer buttons
- Progress bar at top
- "Next" button fixed to bottom

### White Paper Mobile
- Floating action button
- Collapsible TOC
- No sidebar (CTAs embedded)
- Tables convert to accordion/card format

### Lead Form Mobile
- Full-screen form
- One field per screen for complex inputs
- Numeric keypad for ZIP/phone
- Large submit button (fixed to bottom)

---

## Analytics & Tracking

### Key Events

**Quiz Interactions**:
- quiz_started
- quiz_question_answered
- quiz_completed
- quiz_result_email_captured
- quiz_result_cta_clicked

**Lead Generation**:
- lead_form_started
- lead_form_step_completed
- lead_form_abandoned
- lead_form_submitted

**Content Engagement**:
- white_paper_viewed
- scroll_depth
- cta_clicked

### Conversion Funnel
1. Landing page
2. Quiz/white paper engagement
3. Result/conclusion reached
4. CTA clicked
5. Form started
6. Form completed

---

## SEO Implementation

### Technical SEO
- XML sitemap
- Robots.txt
- HTTPS
- Canonical tags
- Structured data
- OpenGraph tags
- Twitter Card tags
- Mobile-friendly
- Core Web Vitals

### On-Page SEO (Every Page)
- Unique H1 with target keyword
- Meta title (50-60 characters)
- Meta description (150-160 characters)
- Header hierarchy (H1 > H2 > H3)
- Alt text on images
- Internal links (3-5 per page)
- Descriptive URLs

### Schema Markup by Page Type

**Homepage**: WebSite schema
**Quiz Pages**: Quiz schema
**White Papers**: Article schema
**FAQ Sections**: FAQPage schema
**Find Installers**: Service schema

---

## Stack Decisions (Final)

Based on clarifying questions:

1. **Framework**: Next.js 14
2. **Database**: Supabase (PostgreSQL)
3. **Hosting**: Vercel
4. **Email**: Resend
5. **Analytics**: Google Analytics 4 + Vercel Analytics
6. **Form Pre-population**: localStorage (quiz data → lead form)
7. **Quiz Sessions**: Database (persist across devices)
8. **Content Storage**: Database (white papers), JSON (quizzes)

---

This brief serves as the north star for all development decisions. Refer back to it frequently to ensure the build stays aligned with the original vision.
