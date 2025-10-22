# Windshield Advisor Quiz Widget Integration Guide

Embed interactive windshield safety quizzes on your website with customizable styling.

## Table of Contents

- [Quick Start](#quick-start)
- [Available Quizzes](#available-quizzes)
- [Configuration Options](#configuration-options)
- [Styling & Theming](#styling--theming)
- [Event Listeners](#event-listeners)
- [API Reference](#api-reference)
- [Examples](#examples)

---

## Quick Start

### Basic Integration

Add this code where you want the quiz to appear:

```html
<!-- Windshield Advisor Quiz Widget -->
<div class="windshield-advisor-quiz"
     data-quiz="adas-calibration"
     data-partner-id="YOUR_PARTNER_ID"></div>
<script src="https://windshieldadvisor.info/quiz-embed.js"></script>
```

That's it! The quiz will automatically load and adapt to your page.

---

## Available Quizzes

| Quiz Slug | Title | Duration | Description |
|-----------|-------|----------|-------------|
| `adas-calibration` | Does My Car Need ADAS Calibration? | 4 min | Determine if safety systems need recalibration |
| `windshield-safety` | Is Your Windshield Safe? | 5 min | Comprehensive windshield safety assessment |
| `repair-replace` | Should I Repair or Replace? | 3 min | Get expert recommendation for your damage |
| `installer-qualified` | Is Your Installer Qualified? | 3 min | Evaluate installer certifications and practices |
| `insurance-coverage` | What Will My Insurance Cover? | 5 min | Calculate estimated insurance coverage |

### Get Quiz List Programmatically

```javascript
fetch('https://windshieldadvisor.info/api/widget/quizzes?partnerId=YOUR_ID')
  .then(res => res.json())
  .then(data => console.log(data.quizzes));
```

---

## Configuration Options

### Data Attributes

All configuration is done via HTML data attributes on the container div:

#### Required Attributes

```html
data-quiz="adas-calibration"        <!-- Quiz slug (required) -->
data-partner-id="your-partner-id"   <!-- Your partner ID (required) -->
```

#### Theme Customization

```html
data-primary-color="1a73e8"         <!-- Primary brand color (hex without #) -->
data-accent-color="0d47a1"          <!-- Accent color for hover states -->
data-text-color="333333"            <!-- Text color -->
data-bg-color="ffffff"              <!-- Background color -->
data-font-family="Inter,sans-serif" <!-- Custom font family -->
data-border-radius="8"              <!-- Border radius in pixels -->
```

#### Display Options

```html
data-show-branding="true"           <!-- Show "Powered by" footer (default: true) -->
data-compact="false"                <!-- Compact mode with reduced padding (default: false) -->
data-partner-name="Vero Autoglass"  <!-- Your business name for tracking -->
data-callback-url="/api/quiz-complete" <!-- POST quiz results to your endpoint -->
```

---

## Styling & Theming

### Brand Colors Example

Match your brand's color scheme:

```html
<div class="windshield-advisor-quiz"
     data-quiz="adas-calibration"
     data-partner-id="vero-autoglass"
     data-primary-color="2563eb"
     data-accent-color="1e40af"
     data-text-color="1a202c"
     data-bg-color="f7fafc"
     data-font-family="system-ui,-apple-system,sans-serif"
     data-border-radius="12"></div>
<script src="https://windshieldadvisor.info/quiz-embed.js"></script>
```

### Responsive Container

The widget automatically adjusts height based on content. You can style the container:

```css
.windshield-advisor-quiz {
  max-width: 800px;
  margin: 2rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}
```

---

## Event Listeners

Listen to quiz events in your JavaScript:

### Available Events

```javascript
// Quiz started
document.addEventListener('windshieldAdvisorQuiz:started', (e) => {
  console.log('Quiz started:', e.detail);
  // { quizId, quizSlug, title, totalQuestions, partnerId }
});

// User answered a question
document.addEventListener('windshieldAdvisorQuiz:answer', (e) => {
  console.log('Question answered:', e.detail);
  // { quizId, questionId, questionNumber, answer, partnerId }
});

// Quiz completed
document.addEventListener('windshieldAdvisorQuiz:completed', (e) => {
  console.log('Quiz completed:', e.detail);
  // { quizId, result, duration, answersCount, partnerId }

  // Example: Redirect to booking page
  if (e.detail.result.severity === 'critical') {
    window.location.href = '/book-appointment?quiz=' + e.detail.quizId;
  }
});

// User went back
document.addEventListener('windshieldAdvisorQuiz:back', (e) => {
  console.log('User went back:', e.detail);
});
```

### Callback Functions

Alternative: Use global callback functions:

```javascript
window.onWindshieldAdvisorQuizCompleted = function(data) {
  console.log('Quiz completed via callback:', data);

  // Send to your analytics
  gtag('event', 'quiz_completed', {
    quiz_id: data.quizId,
    result_severity: data.result.severity
  });
};
```

---

## API Reference

### Get Quiz Metadata

```http
GET https://windshieldadvisor.info/api/widget/quizzes/[slug]
```

**Response:**
```json
{
  "success": true,
  "quiz": {
    "id": "adas-calibration",
    "slug": "adas-calibration",
    "title": "Does My Car Need ADAS Calibration?",
    "description": "Find out if your safety systems are working properly",
    "duration": 4,
    "questionCount": 7,
    "featured": true,
    "embedUrl": "https://windshieldadvisor.info/widget/quiz/adas-calibration",
    "embedCode": "<!-- embed HTML -->"
  }
}
```

### Track Custom Events (Optional)

```http
POST https://windshieldadvisor.info/api/widget/track
Content-Type: application/json

{
  "partnerId": "your-partner-id",
  "quizId": "adas-calibration",
  "quizSlug": "adas-calibration",
  "eventType": "custom_event",
  "metadata": {
    "source": "homepage",
    "campaign": "spring-2025"
  }
}
```

---

## Examples

### Example 1: Basic Embed with Brand Colors

```html
<!DOCTYPE html>
<html>
<head>
  <title>ADAS Quiz - Vero Autoglass</title>
</head>
<body>
  <h1>Check If Your ADAS Systems Need Calibration</h1>

  <div class="windshield-advisor-quiz"
       data-quiz="adas-calibration"
       data-partner-id="vero-autoglass"
       data-primary-color="1a73e8"
       data-partner-name="Vero Autoglass"
       data-show-branding="true"></div>

  <script src="https://windshieldadvisor.info/quiz-embed.js"></script>
</body>
</html>
```

### Example 2: Multiple Quizzes on Same Page

```html
<div class="quiz-grid">
  <!-- Quiz 1 -->
  <div class="windshield-advisor-quiz"
       data-quiz="adas-calibration"
       data-partner-id="your-id"
       data-primary-color="2563eb"></div>

  <!-- Quiz 2 -->
  <div class="windshield-advisor-quiz"
       data-quiz="repair-replace"
       data-partner-id="your-id"
       data-primary-color="059669"></div>

  <!-- Quiz 3 -->
  <div class="windshield-advisor-quiz"
       data-quiz="insurance-coverage"
       data-partner-id="your-id"
       data-primary-color="dc2626"></div>
</div>

<script src="https://windshieldadvisor.info/quiz-embed.js"></script>
```

### Example 3: Programmatic Embed with JavaScript

```html
<div id="quiz-container"></div>

<script src="https://windshieldadvisor.info/quiz-embed.js"></script>
<script>
  // Embed quiz programmatically
  WindshieldAdvisorQuiz.embed('#quiz-container', {
    quiz: 'adas-calibration',
    partnerId: 'your-partner-id',
    primaryColor: '1a73e8',
    accentColor: '0d47a1',
    fontFamily: 'Inter, sans-serif',
    borderRadius: '12',
    showBranding: true,
    compact: false
  });
</script>
```

### Example 4: With Callback URL

Receive quiz results at your endpoint:

```html
<div class="windshield-advisor-quiz"
     data-quiz="adas-calibration"
     data-partner-id="vero-autoglass"
     data-callback-url="https://your-site.com/api/quiz-complete"
     data-primary-color="1a73e8"></div>
<script src="https://windshieldadvisor.info/quiz-embed.js"></script>
```

Your endpoint will receive:
```json
{
  "partnerId": "vero-autoglass",
  "quizResult": {
    "quizId": "adas-calibration",
    "quizSlug": "adas-calibration",
    "answers": [...],
    "result": {
      "severity": "critical",
      "totalScore": 8,
      "outcome": "mandatory"
    },
    "duration": 45,
    "completedAt": "2025-10-22T12:34:56.789Z"
  }
}
```

### Example 5: Conditional Redirect on Completion

```html
<div class="windshield-advisor-quiz"
     data-quiz="adas-calibration"
     data-partner-id="vero-autoglass"></div>

<script src="https://windshieldadvisor.info/quiz-embed.js"></script>
<script>
  document.addEventListener('windshieldAdvisorQuiz:completed', (e) => {
    const { result, quizSlug } = e.detail;

    // Redirect based on result severity
    if (result.severity === 'critical') {
      // Urgent - book immediately
      window.location.href = `/book-now?quiz=${quizSlug}&urgency=high`;
    } else if (result.severity === 'warning') {
      // Schedule soon
      window.location.href = `/schedule?quiz=${quizSlug}`;
    } else {
      // Show thank you message
      alert('Thanks for taking the quiz! Your systems look good.');
    }
  });
</script>
```

---

## Support

### Partner Registration

To get your partner ID and start using the widgets:

1. Email: support@windshieldadvisor.info
2. Include: Business name, website URL, expected monthly quiz volume
3. We'll send: Partner ID, API credentials (if needed), integration support

### Technical Support

- Documentation: https://windshieldadvisor.info/docs/widget-integration
- Email: integrations@windshieldadvisor.info
- Status Page: https://status.windshieldadvisor.info

---

## Changelog

### Version 1.0.0 (2025-10-22)
- Initial release
- 5 quiz types available
- Full theme customization
- Event tracking and callbacks
- Responsive design
- PostMessage API for height adjustment

---

## License & Terms

By embedding Windshield Advisor quizzes, you agree to:

1. Display the "Powered by Windshield Advisor" attribution (unless otherwise agreed)
2. Not modify quiz content or results
3. Use widgets for legitimate business purposes only
4. Comply with privacy regulations (GDPR, CCPA, etc.)

For commercial licensing and white-label options, contact: partnerships@windshieldadvisor.info
