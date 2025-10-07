# Design System - Windshield Advisor

**Mobile-First Design System with Modern Animations**

Last Updated: 2025-10-06

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Animation System](#animation-system)
5. [Component Library](#component-library)
6. [Mobile Optimizations](#mobile-optimizations)
7. [Loading States](#loading-states)
8. [Interactive Flourishes](#interactive-flourishes)
9. [Accessibility](#accessibility)
10. [Usage Examples](#usage-examples)

---

## Design Philosophy

### Core Principle
**"Authoritative Safety Institution Meets Modern Digital Experience"**

### Goals
- ✅ **Trust**: Feel like NHTSA/IIHS (authoritative safety resource)
- ✅ **Modern**: Contemporary UX, not outdated government aesthetic
- ✅ **Performance**: Fast loading, 60fps animations
- ✅ **Accessible**: WCAG 2.1 AA compliant
- ✅ **Mobile-First**: Touch-friendly, thumb-optimized

---

## Color System

### Primary Colors

#### Safety Blue (Primary Brand Color)
```css
safety-blue-800: #1E3A8A
```
**Use for**: Headers, primary navigation, trust elements
**Psychology**: Stability, trust, safety, professionalism

#### Accent Orange (Action Color)
```css
accent-orange-500: #F97316
```
**Use for**: Primary CTAs, urgency indicators, critical quiz results
**Psychology**: Action, urgency without alarm

#### Deep Navy (Text Color)
```css
deep-navy-900: #0F172A
```
**Use for**: Body text, dark backgrounds, footer
**Psychology**: Sophistication, depth, readability

### Secondary Colors

#### Success Green
```css
success-green-600: #059669
```
**Use for**: Safe quiz results, checkmarks, positive states

#### Warning Yellow
```css
warning-yellow-500: #F59E0B
```
**Use for**: Caution quiz results, important notices

#### Danger Red
```css
danger-red-600: #DC2626
```
**Use for**: Critical warnings, urgent actions

### Neutral Colors

```css
gray-50: #F8FAFC   // Light backgrounds
gray-100: #F1F5F9  // Cards, subtle backgrounds
gray-300: #CBD5E1  // Borders
gray-600: #475569  // Secondary text
```

### Usage Examples

```tsx
// Buttons
<button className="bg-accent-orange-500 hover:bg-accent-orange-600">
  Primary Action
</button>

// Headers
<h1 className="text-safety-blue-800">
  Trusted Resource
</h1>

// Alerts
<div className="bg-danger-red-50 border-l-4 border-danger-red-600">
  Critical Warning
</div>
```

---

## Typography

### Font Stack

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
             Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Responsive Font Sizes

**Mobile First Approach:**

```tsx
// Body text
<p className="text-base md:text-body">
  // 16px mobile, 18px desktop
</p>

// Headings
<h1 className="text-4xl md:text-5xl lg:text-6xl">
  // 36px → 48px → 60px
</h1>

<h2 className="text-3xl md:text-4xl">
  // 30px → 36px
</h2>

<h3 className="text-2xl md:text-3xl">
  // 24px → 30px
</h3>
```

### Line Heights

- **Headings**: 1.2 (tight for impact)
- **Body**: 1.7 (comfortable reading)
- **Small text**: 1.5

### Font Weights

```tsx
<h1 className="font-bold">700</h1>
<h2 className="font-semibold">600</h2>
<p className="font-medium">500</p>
<p className="font-normal">400</p>
```

---

## Animation System

### Animation Principles

1. **Purpose**: Every animation has a reason
2. **Performance**: 60fps, GPU-accelerated
3. **Duration**: Quick (200-500ms)
4. **Easing**: Natural motion curves
5. **Respectful**: Honor `prefers-reduced-motion`

### Loading Animations

#### Fade In
```tsx
<div className="animate-fade-in">
  Content appears smoothly
</div>
```

#### Fade In Up (Scroll Reveal)
```tsx
<section className="animate-fade-in-up">
  Slides up while fading in
</section>
```

#### Shimmer (Skeleton Loader)
```tsx
<div className="skeleton-shimmer h-8 w-full">
  // Loading placeholder
</div>
```

#### Pulse
```tsx
<div className="animate-pulse-slow">
  Gentle pulsing attention
</div>
```

### Interactive Animations

#### Button Hover
```tsx
<button className="btn-primary">
  // Lifts up, shadow increases, scale
  Click Me
</button>
```

#### Card Hover
```tsx
<div className="card-hover">
  // Lifts, shadow grows, slight scale
</div>
```

#### Scale In
```tsx
<div className="animate-scale-in">
  Pops in from 90% to 100%
</div>
```

### Success Animations

#### Check Draw (SVG)
```tsx
<svg className="animate-check-draw">
  <path d="M5 13l4 4L19 7" />
</svg>
```

#### Success Bounce
```tsx
<div className="animate-success-bounce">
  ✓ Saved!
</div>
```

### Progress Animations

#### Progress Bar
```tsx
<div className="quiz-progress">
  <div
    className="quiz-progress-bar"
    style={{ width: '60%' }}
  />
</div>
```

#### Slide Progress (Indeterminate)
```tsx
<div className="relative h-1 bg-gray-200 overflow-hidden">
  <div className="absolute inset-0 animate-slide-progress bg-safety-blue-800" />
</div>
```

### Flourishes

#### Float (Subtle)
```tsx
<div className="animate-float">
  Gently moves up and down
</div>
```

#### Heartbeat
```tsx
<span className="animate-heartbeat">
  ❤️
</span>
```

#### Glow
```tsx
<button className="animate-glow bg-accent-orange-500">
  Pulsing glow effect
</button>
```

### Stagger Animations (Lists)

```tsx
<div className="stagger-animation">
  <div>Item 1</div> {/* Delay: 0.1s */}
  <div>Item 2</div> {/* Delay: 0.2s */}
  <div>Item 3</div> {/* Delay: 0.3s */}
</div>
```

### Scroll-Triggered Animations

```tsx
import { useInView } from 'react-intersection-observer';

function AnimatedSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${inView ? 'visible' : ''}`}
    >
      Content animates on scroll into view
    </div>
  );
}
```

---

## Component Library

### Buttons

#### Primary Button (Orange CTA)
```tsx
<button className="btn-primary">
  Get Free Quotes →
</button>

// Large variant
<button className="btn-primary btn-lg">
  Start Quiz →
</button>

// With loading state
<button className="btn-primary" disabled>
  <span className="spinner" />
  Processing...
</button>
```

#### Secondary Button (Outlined)
```tsx
<button className="btn-secondary">
  Learn More
</button>
```

#### Tertiary Button (Text Link)
```tsx
<button className="btn-tertiary">
  Skip for now
</button>
```

### Cards

#### Basic Card
```tsx
<div className="card p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

#### Interactive Card (Hover Effects)
```tsx
<div className="card-hover p-6">
  <h3>Hover to lift</h3>
</div>
```

#### Quiz Card
```tsx
<div className="card-hover p-8 text-center">
  <div className="text-5xl mb-4">🛡️</div>
  <h3 className="text-2xl font-bold mb-2">
    Is My Windshield Safe?
  </h3>
  <p className="text-gray-600 mb-4">
    2-3 minutes • 7 questions
  </p>
  <button className="btn-primary w-full">
    Start Quiz →
  </button>
</div>
```

### Alerts

```tsx
// Critical
<div className="alert-critical">
  <AlertTriangleIcon />
  <div>
    <strong>Immediate Action Required</strong>
    <p>Your windshield needs replacement.</p>
  </div>
</div>

// Warning
<div className="alert-warning">
  <ExclamationIcon />
  <div>Schedule service soon</div>
</div>

// Success
<div className="alert-success">
  <CheckIcon />
  <div>Your windshield appears safe</div>
</div>

// Info
<div className="alert-info">
  <InfoIcon />
  <div>Pro tip: Use ammonia-free cleaner</div>
</div>
```

### Badges

```tsx
// Category badge
<span className="badge-primary">
  WHITE PAPER
</span>

// Status badge
<span className="badge-success">
  Most Popular
</span>

// Vero Verified
<span className="border-2 border-success-green-600 px-3 py-1.5 rounded-lg flex items-center gap-2">
  <ShieldCheckIcon />
  <span className="font-bold">VERO VERIFIED</span>
</span>
```

### Form Elements

#### Text Input
```tsx
<div>
  <label className="form-label">
    Email Address
  </label>
  <input
    type="email"
    className="form-input"
    placeholder="you@example.com"
  />
  <p className="form-help">
    We'll never share your email
  </p>
</div>
```

#### Input with Error
```tsx
<div>
  <label className="form-label">
    Phone Number
  </label>
  <input
    type="tel"
    className="form-input-error"
  />
  <p className="form-error">
    <AlertCircleIcon className="w-4 h-4" />
    Invalid phone number
  </p>
</div>
```

#### Quiz Option (Radio as Card)
```tsx
<label className="quiz-option cursor-pointer">
  <input
    type="radio"
    name="q1"
    value="option1"
    className="sr-only peer"
  />
  <div className="peer-checked:quiz-option-selected">
    A small chip smaller than a quarter
  </div>
</label>
```

### Loading States

#### Skeleton Loader
```tsx
<div className="space-y-4">
  <div className="skeleton h-8 w-3/4" />
  <div className="skeleton h-4 w-full" />
  <div className="skeleton h-4 w-5/6" />
</div>
```

#### Shimmer Effect
```tsx
<div className="skeleton-shimmer h-48 rounded-lg" />
```

#### Spinner
```tsx
<div className="flex items-center justify-center">
  <div className="spinner" />
</div>
```

#### Button Loading
```tsx
<button className="btn-primary" disabled>
  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
  Loading...
</button>
```

---

## Mobile Optimizations

### Touch Targets

**Minimum Size**: 44x44px (Apple's HIG standard)

```tsx
// All interactive elements
<button className="min-h-[44px] px-4">
  Tap-friendly
</button>
```

### Mobile Navigation

```tsx
// Hamburger menu
<button className="btn-icon md:hidden">
  <MenuIcon />
</button>

// Mobile drawer
<div className="mobile-drawer mobile-drawer-open md:hidden">
  <nav className="bg-white h-full p-6">
    {/* Navigation items */}
  </nav>
</div>

// Overlay
<div className="mobile-overlay" onClick={closeMenu} />
```

### Prevent iOS Zoom

```tsx
// Font size must be 16px minimum
<input
  type="text"
  className="text-base" // 16px
/>
```

### Safe Area Insets (iPhone notch)

```tsx
<div className="safe-area-inset-top">
  Content respects notch
</div>

<div className="safe-area-inset-bottom">
  Content respects home indicator
</div>
```

### Mobile-Specific Gestures

```tsx
// Swipe to dismiss
<div className="touch-pan-y">
  Swipeable content
</div>

// Pull to refresh (future)
<div className="overscroll-behavior-contain">
  Prevents pull-to-refresh
</div>
```

### Mobile Performance

```tsx
// Use will-change for animations
<div className="will-change-transform hover:-translate-y-1">
  Optimized animation
</div>

// Lazy load images
<img
  src="image.jpg"
  loading="lazy"
  className="w-full h-auto"
/>
```

---

## Loading States

### Page Load

```tsx
export default function Page() {
  return (
    <div className="animate-fade-in">
      <h1>Page Title</h1>
      <p>Content</p>
    </div>
  );
}
```

### Data Fetching

```tsx
function Component() {
  const { data, loading } = useFetch();

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="skeleton-shimmer h-8 w-1/2" />
        <div className="skeleton-shimmer h-64 w-full" />
      </div>
    );
  }

  return <div className="animate-fade-in">{data}</div>;
}
```

### Form Submission

```tsx
function Form() {
  const [submitting, setSubmitting] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="btn-primary"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <span className="spinner" />
            Submitting...
          </>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
}
```

---

## Interactive Flourishes

### Micro-interactions

#### Button Click
```tsx
<button className="active:scale-95 transition-transform">
  Click me
</button>
```

#### Card Entrance
```tsx
<div className="animate-scale-in">
  Card content
</div>
```

#### Success State
```tsx
function SuccessMessage() {
  return (
    <div className="animate-success-bounce flex items-center gap-2">
      <CheckCircleIcon className="text-success-green-600" />
      <span>Saved successfully!</span>
    </div>
  );
}
```

### Attention Grabbers (Use Sparingly)

```tsx
// Heartbeat for important items
<div className="animate-heartbeat">
  New Feature!
</div>

// Glow for CTAs in hero
<button className="btn-primary animate-glow">
  Limited Time Offer
</button>
```

### Hover States

```tsx
// Image zoom on hover
<div className="overflow-hidden rounded-lg">
  <img
    src="image.jpg"
    className="transition-transform duration-300 hover:scale-105"
  />
</div>

// Text color change
<a className="text-safety-blue-800 hover:text-accent-orange-500 transition-colors">
  Learn more
</a>
```

---

## Accessibility

### Focus Indicators

```tsx
// Visible focus ring (keyboard only)
<button className="focus-visible-only">
  Keyboard accessible
</button>

// Custom focus ring
<a className="focus:ring-4 focus:ring-accent-orange-500/50 focus:outline-none">
  Link
</a>
```

### Reduced Motion

All animations respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Reader Support

```tsx
// Hide decorative elements
<div aria-hidden="true">
  <DecorativeIcon />
</div>

// Provide labels for icon buttons
<button aria-label="Close menu">
  <XIcon />
</button>

// Skip to content link
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to content
</a>
```

### Semantic HTML

```tsx
<nav>
  <ul>
    <li><a href="/quizzes">Quizzes</a></li>
  </ul>
</nav>

<main id="main-content">
  <article>
    <h1>Article Title</h1>
  </article>
</main>
```

---

## Usage Examples

### Homepage Hero

```tsx
<section className="bg-gradient-to-b from-blue-50 to-white py-20">
  <div className="max-w-wide mx-auto px-6 text-center">
    <h1 className="animate-fade-in-up mb-6">
      Protect Your Vehicle's Safety Systems
    </h1>
    <p className="text-xl text-gray-600 mb-8 animate-fade-in-up [animation-delay:0.1s]">
      Research-backed guidance on windshield safety
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up [animation-delay:0.2s]">
      <button className="btn-primary btn-lg">
        Take Safety Quiz →
      </button>
      <button className="btn-tertiary">
        Find Installers
      </button>
    </div>
  </div>
</section>
```

### Quiz Results Page

```tsx
<div className="max-w-narrow mx-auto p-6">
  {/* Severity banner */}
  <div className={`
    p-6 rounded-lg mb-6 text-white text-center
    animate-fade-in-down
    ${severity === 'critical' ? 'bg-danger-red-600' : ''}
    ${severity === 'caution' ? 'bg-warning-yellow-500' : ''}
    ${severity === 'safe' ? 'bg-success-green-600' : ''}
  `}>
    <div className="text-5xl mb-2 animate-scale-in">
      {severity === 'critical' && '🔴'}
      {severity === 'caution' && '🟡'}
      {severity === 'safe' && '🟢'}
    </div>
    <h1 className="text-3xl font-bold">{result.title}</h1>
  </div>

  {/* Results content */}
  <div className="card p-8 animate-fade-in-up [animation-delay:0.2s]">
    <p className="text-lg mb-6">{result.explanation}</p>

    <h3 className="font-bold mb-4">Next Steps:</h3>
    <ul className="space-y-2 stagger-animation">
      {result.nextSteps.map(step => (
        <li key={step} className="flex items-start gap-2">
          <CheckIcon className="w-5 h-5 text-success-green-600 flex-shrink-0 mt-0.5" />
          <span>{step}</span>
        </li>
      ))}
    </ul>
  </div>

  {/* CTA */}
  <div className="mt-8 animate-fade-in-up [animation-delay:0.4s]">
    <button className="btn-primary btn-lg w-full">
      Find Certified Installers →
    </button>
  </div>
</div>
```

### Loading State

```tsx
function QuizPage() {
  const { quiz, loading } = useQuiz();

  if (loading) {
    return (
      <div className="max-w-narrow mx-auto p-6">
        <div className="skeleton-shimmer h-12 w-3/4 mb-8" />
        <div className="space-y-4">
          <div className="skeleton-shimmer h-32 rounded-lg" />
          <div className="skeleton-shimmer h-32 rounded-lg" />
          <div className="skeleton-shimmer h-32 rounded-lg" />
        </div>
      </div>
    );
  }

  return <Quiz data={quiz} />;
}
```

---

## Performance Checklist

- [ ] All animations use `transform` and `opacity` (GPU-accelerated)
- [ ] No layout shifts during animations
- [ ] `will-change` used sparingly
- [ ] Images lazy loaded
- [ ] Fonts preloaded
- [ ] Critical CSS inlined
- [ ] Reduced motion respected
- [ ] Touch targets 44x44px minimum
- [ ] Keyboard navigation works
- [ ] Focus indicators visible

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

---

**Design system maintained by the Windshield Advisor team**
