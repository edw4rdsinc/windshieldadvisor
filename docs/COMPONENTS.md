# Component Architecture

**Framework**: Next.js 14 + React 18 + TypeScript
**UI Library**: Shadcn/ui + Tailwind CSS
**Last Updated**: 2025-10-06

---

## Component Philosophy

### Design Principles

1. **Composition over Configuration** - Build complex UIs from small, reusable components
2. **Server-First** - Use React Server Components by default, client components only when needed
3. **Accessibility** - WCAG 2.1 AA compliance via Shadcn/ui primitives
4. **Performance** - Lazy load, code split, optimize images
5. **Type Safety** - Strict TypeScript, no `any` types

### File Naming Conventions

- **Components**: PascalCase (e.g., `QuizEngine.tsx`)
- **Utilities**: camelCase (e.g., `formatPhone.ts`)
- **Types**: PascalCase (e.g., `QuizTypes.ts`)
- **Client Components**: Add `"use client"` directive at top

---

## Component Hierarchy

```
App
├── Layout Components (server)
│   ├── Header (client - has interactivity)
│   ├── Navigation (client)
│   ├── Footer (server)
│   └── Breadcrumb (server)
│
├── Page Components (server)
│   ├── Homepage
│   ├── QuizHub
│   ├── QuizPage (client - quiz logic)
│   ├── QuizResults (server)
│   ├── WhitePaperPage (server)
│   ├── BlogPostPage (server)
│   └── FindInstallers (client - form state)
│
├── Feature Components
│   ├── Quiz (client)
│   ├── Forms (client)
│   ├── Content (server/client mix)
│   └── CTA (client)
│
├── UI Components (from Shadcn/ui)
│   ├── Button
│   ├── Input
│   ├── Form
│   ├── Card
│   └── etc.
│
└── Shared Components
    ├── TrustBar (server)
    ├── Testimonial (server)
    └── SeverityBadge (server)
```

---

## Layout Components

### `Header.tsx` (Client Component)

**Purpose**: Site-wide header with sticky navigation and CTAs

**Props**:
```typescript
interface HeaderProps {
  transparent?: boolean; // for homepage hero overlay
}
```

**Features**:
- Sticky positioning on scroll
- Mobile hamburger menu
- "Find Installers" CTA button (persistent)
- Logo + main navigation
- Scroll-triggered style changes

**Usage**:
```tsx
<Header />
<Header transparent /> {/* for homepage */}
```

---

### `Navigation.tsx` (Client Component)

**Purpose**: Main site navigation (desktop + mobile)

**Props**:
```typescript
interface NavigationProps {
  mobile?: boolean;
}
```

**Features**:
- Desktop: horizontal menu with dropdowns
- Mobile: slide-out drawer
- Active page highlighting
- Nested menu support (for Safety Guides)

**Navigation Structure**:
```typescript
const navItems = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Safety Quizzes",
    href: "/quizzes"
  },
  {
    label: "Safety Guides",
    href: "/safety-guides",
    submenu: [
      { label: "White Papers", href: "/safety-guides" },
      { label: "Blog", href: "/safety-guides/blog" }
    ]
  },
  {
    label: "Find Installers",
    href: "/find-installers",
    highlight: true // visual emphasis
  },
  {
    label: "Resources",
    href: "/resources",
    submenu: [
      { label: "Glossary", href: "/resources/glossary" },
      { label: "FAQ", href: "/resources/faq" },
      { label: "State Laws", href: "/resources/state-laws" },
      { label: "Certifications", href: "/resources/certifications" }
    ]
  }
];
```

---

### `Footer.tsx` (Server Component)

**Purpose**: Site-wide footer with links and legal info

**Features**:
- 4-column layout (desktop), stacked (mobile)
- Quick links to main sections
- Resource links
- Legal links (Privacy, Terms)
- Social links (optional)
- Copyright notice

---

### `Breadcrumb.tsx` (Server Component)

**Purpose**: Show current page hierarchy

**Props**:
```typescript
interface BreadcrumbProps {
  items: {
    label: string;
    href?: string; // last item has no href
  }[];
}
```

**Usage**:
```tsx
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Safety Guides", href: "/safety-guides" },
    { label: "ADAS Calibration" }
  ]}
/>
```

---

## Quiz Components

### `QuizEngine.tsx` (Client Component)

**Purpose**: Core quiz logic, state management, question flow

**Props**:
```typescript
interface QuizEngineProps {
  quiz: Quiz; // from database
  sessionToken?: string; // to resume progress
}
```

**State**:
```typescript
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [answers, setAnswers] = useState<Answer[]>([]);
const [score, setScore] = useState(0);
const [sessionId, setSessionId] = useState<string>();
```

**Features**:
- Question navigation (next, back)
- Answer validation
- Conditional logic evaluation
- Progress auto-save (debounced)
- Score calculation
- Session persistence

**Key Methods**:
```typescript
const handleAnswer = (questionId: string, answer: any) => {
  // Save answer, calculate score, advance question
};

const shouldShowQuestion = (question: Question) => {
  // Evaluate conditional logic
};

const saveProgress = async () => {
  // Persist to database
};
```

---

### `QuizQuestion.tsx` (Client Component)

**Purpose**: Render individual question with appropriate input type

**Props**:
```typescript
interface QuizQuestionProps {
  question: Question;
  onAnswer: (answer: any) => void;
  currentAnswer?: any;
}
```

**Features**:
- Multiple input types: radio, checkbox, visual (image options)
- "Not sure" option (where applicable)
- Help text tooltip
- Visual feedback on selection

---

### `QuizProgress.tsx` (Client Component)

**Purpose**: Show progress bar and question count

**Props**:
```typescript
interface QuizProgressProps {
  current: number;
  total: number;
  percentage: number;
}
```

---

### `QuizResults.tsx` (Server Component)

**Purpose**: Display personalized quiz results

**Props**:
```typescript
interface QuizResultsProps {
  session: QuizSession;
  quiz: Quiz;
}
```

**Features**:
- Severity indicator (red/yellow/green banner)
- Personalized headline based on results
- Key findings from answers
- Next steps checklist
- CTAs (Find Installers, Email Results, Read Guide)
- Social sharing buttons

---

### `QuizCard.tsx` (Server Component)

**Purpose**: Quiz preview card for hub page

**Props**:
```typescript
interface QuizCardProps {
  quiz: {
    slug: string;
    title: string;
    description: string;
    icon: string;
    duration: number;
    questions: number;
    priority?: boolean; // featured quiz
  };
}
```

---

## Form Components

### `MultiStepForm.tsx` (Client Component)

**Purpose**: Wrapper for multi-step form with progress tracking

**Props**:
```typescript
interface MultiStepFormProps {
  steps: Step[];
  onSubmit: (data: any) => Promise<void>;
  initialData?: Partial<LeadFormData>; // for pre-population
}

interface Step {
  id: string;
  title: string;
  component: React.ComponentType<StepProps>;
  validate?: (data: any) => boolean;
}
```

**State**:
```typescript
const [currentStep, setCurrentStep] = useState(0);
const [formData, setFormData] = useState<Partial<LeadFormData>>({});
const [errors, setErrors] = useState<Record<string, string>>({});
```

**Features**:
- Step navigation (next, back)
- Progress indicator
- Form data persistence (localStorage)
- Validation per step
- Analytics tracking (form_step_completed)

---

### Lead Form Steps

All step components follow this interface:
```typescript
interface StepProps {
  data: Partial<LeadFormData>;
  onChange: (updates: Partial<LeadFormData>) => void;
  errors?: Record<string, string>;
}
```

#### `LocationStep.tsx` (Client)
- ZIP code input
- "Detect My Location" button (geolocation API)
- ZIP validation

#### `VehicleStep.tsx` (Client)
- Year dropdown (2010-2025)
- Make dropdown (from vehicle_data)
- Model dropdown (filtered by make + year)
- ADAS checkbox (auto-checked for 2018+)

#### `ServiceStep.tsx` (Client)
- Radio buttons for service type
- Visual icons for each option

#### `DamageStep.tsx` (Client)
- Conditional (only if serviceType = repair/replacement)
- Damage location checkboxes
- Damage type checkboxes
- Size selection
- Date occurred

#### `UrgencyStep.tsx` (Client)
- Radio buttons with visual indicators
- Color-coded urgency levels

#### `ContactStep.tsx` (Client)
- First name, last name
- Phone (tel input, formatted)
- Email (validated)
- Best time to call dropdown
- Additional notes textarea
- Consent checkbox (required)

---

### `QuickLeadWidget.tsx` (Client Component)

**Purpose**: Simplified lead capture for sidebars

**Props**:
```typescript
interface QuickLeadWidgetProps {
  source: string; // for tracking
  compact?: boolean;
}
```

**Features**:
- ZIP code input
- "Get Quotes" button
- Redirects to /find-installers with pre-filled ZIP

---

## Content Components

### `WhitePaperLayout.tsx` (Server Component)

**Purpose**: Layout wrapper for white paper pages

**Props**:
```typescript
interface WhitePaperLayoutProps {
  content: Content;
  relatedQuizzes: Quiz[];
  relatedContent: Content[];
  children: React.ReactNode; // MDX content
}
```

**Structure**:
```tsx
<div className="grid lg:grid-cols-[1fr_300px]">
  {/* Main Content */}
  <article>
    <ArticleHeader {...content} />
    <TableOfContents toc={content.tableOfContents} />
    {children}
    <FAQAccordion faqs={content.faqs} />
  </article>

  {/* Sidebar */}
  <aside>
    <QuickLeadWidget />
    <RelatedQuizzes quizzes={relatedQuizzes} />
    <RelatedContent content={relatedContent} />
  </aside>
</div>
```

---

### `BlogPostLayout.tsx` (Server Component)

Similar to WhitePaperLayout but with:
- Parent white paper banner
- Previous/Next post navigation
- Simpler sidebar

---

### `TableOfContents.tsx` (Client Component)

**Purpose**: Jump-link navigation for long articles

**Props**:
```typescript
interface TableOfContentsProps {
  toc: TOCSection[];
  sticky?: boolean;
}

interface TOCSection {
  id: string;
  title: string;
  level: number;
  children?: TOCSection[];
}
```

**Features**:
- Smooth scroll to sections
- Active section highlighting
- Collapsible on mobile

---

### `ArticleHeader.tsx` (Server Component)

**Purpose**: Article metadata display

**Props**:
```typescript
interface ArticleHeaderProps {
  type: "white_paper" | "blog_post";
  title: string;
  subtitle?: string;
  author: string;
  publishedAt: Date;
  readTime: number;
}
```

---

### `CalloutBox.tsx` (Server Component)

**Purpose**: Highlighted content boxes

**Props**:
```typescript
interface CalloutBoxProps {
  type: "info" | "warning" | "tip" | "danger";
  title?: string;
  children: React.ReactNode;
}
```

**Variants**:
- **Info** (blue): General information
- **Warning** (yellow): Caution/warning
- **Tip** (green): Pro tips
- **Danger** (red): Critical warnings

---

### `FAQAccordion.tsx` (Client Component)

**Purpose**: Collapsible FAQ list with schema markup

**Props**:
```typescript
interface FAQAccordionProps {
  faqs: {
    question: string;
    answer: string;
  }[];
}
```

**Features**:
- Accordion expand/collapse
- Schema.org markup for rich results
- Search-friendly markup

---

## CTA Components

### `HeroCTA.tsx` (Client Component)

**Purpose**: Primary homepage CTA

**Props**:
```typescript
interface HeroCTAProps {
  title: string;
  subtitle: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}
```

---

### `InlineCTA.tsx` (Server Component)

**Purpose**: Mid-content CTAs

**Props**:
```typescript
interface InlineCTAProps {
  title: string;
  description?: string;
  buttonText: string;
  href: string;
  variant?: "default" | "primary" | "secondary";
}
```

---

### `FloatingCTA.tsx` (Client Component)

**Purpose**: Sticky mobile CTA button

**Props**:
```typescript
interface FloatingCTAProps {
  text: string;
  href: string;
  show?: boolean; // conditional visibility
}
```

**Features**:
- Fixed to bottom on mobile
- Slide up animation on scroll
- Hidden on desktop (uses header CTA)

---

### `ExitIntentPopup.tsx` (Client Component)

**Purpose**: Capture leads before user exits

**Props**:
```typescript
interface ExitIntentPopupProps {
  enabled: boolean;
  content: {
    title: string;
    description: string;
    cta: string;
  };
}
```

**Features**:
- Mouse-out detection
- Cookie to prevent re-showing
- Dismissible
- A/B testable

---

## Shared Components

### `TrustBar.tsx` (Server Component)

**Purpose**: Display trust signals

**Props**:
```typescript
interface TrustBarProps {
  items: {
    icon: React.ReactNode;
    text: string;
  }[];
}
```

---

### `TrustSignals.tsx` (Server Component)

**Purpose**: List of installer qualifications

**Props**:
```typescript
interface TrustSignalsProps {
  signals: string[];
}
```

---

### `Testimonial.tsx` (Server Component)

**Purpose**: Customer testimonial card

**Props**:
```typescript
interface TestimonialProps {
  quote: string;
  author: {
    name: string;
    location?: string;
    avatar?: string;
  };
  rating?: number; // 1-5 stars
}
```

---

### `SeverityBadge.tsx` (Server Component)

**Purpose**: Color-coded severity indicator

**Props**:
```typescript
interface SeverityBadgeProps {
  severity: "safe" | "caution" | "critical";
  size?: "sm" | "md" | "lg";
}
```

**Colors**:
- Safe: Green (`bg-green-100 text-green-800`)
- Caution: Yellow (`bg-yellow-100 text-yellow-800`)
- Critical: Red (`bg-red-100 text-red-800`)

---

### `StepIndicator.tsx` (Client Component)

**Purpose**: Visual progress indicator for multi-step flows

**Props**:
```typescript
interface StepIndicatorProps {
  steps: {
    id: string;
    title: string;
  }[];
  currentStep: number;
}
```

---

## Utility Components

### `SEO.tsx` (Server Component)

**Purpose**: Inject meta tags and structured data

**Props**:
```typescript
interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  structuredData?: object; // JSON-LD
  noindex?: boolean;
}
```

---

### `ScrollTracker.tsx` (Client Component)

**Purpose**: Track scroll depth for analytics

**Usage**:
```tsx
<ScrollTracker
  thresholds={[25, 50, 75, 100]}
  onThreshold={(depth) => trackEvent('scroll_depth', { depth })}
/>
```

---

## Component Patterns

### Data Fetching (Server Components)

```tsx
// app/safety-guides/[slug]/page.tsx
export default async function WhitePaperPage({ params }: { params: { slug: string } }) {
  const content = await prisma.content.findUnique({
    where: { slug: params.slug }
  });

  return <WhitePaperLayout content={content}>...</WhitePaperLayout>;
}
```

### Form State Management (Client Components)

```tsx
'use client';

export function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await submitLead(formData);
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Conditional Rendering

```tsx
{severity === 'critical' && (
  <CalloutBox type="danger" title="Immediate Action Required">
    Your windshield may be unsafe to drive.
  </CalloutBox>
)}
```

---

## Component Testing Strategy

### Unit Tests
- Test quiz scoring logic
- Test form validation
- Test conditional logic

### Integration Tests
- Test quiz flow (start → answer → complete)
- Test form submission
- Test pre-population

### Accessibility Tests
- Keyboard navigation
- Screen reader compatibility
- Color contrast

---

## Performance Optimization

### Code Splitting
```tsx
// Lazy load heavy components
const ExitIntentPopup = dynamic(() => import('@/components/cta/ExitIntentPopup'), {
  ssr: false
});
```

### Image Optimization
```tsx
import Image from 'next/image';

<Image
  src="/images/damage-types/chip.jpg"
  alt="Windshield chip"
  width={300}
  height={200}
  loading="lazy"
/>
```

### Memoization
```tsx
const expensiveCalculation = useMemo(() => {
  return calculateQuizScore(answers);
}, [answers]);
```

---

## Next Steps

1. Set up Shadcn/ui: `npx shadcn-ui@latest init`
2. Install needed components: `npx shadcn-ui@latest add button form input card accordion`
3. Create component files in `/src/components/`
4. Build storybook for component documentation (optional)
5. Write component tests

