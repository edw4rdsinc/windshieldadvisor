# Quiz Data Schema

This directory contains JSON definitions for all interactive quizzes on windshieldadvisor.info.

## Files

- `windshield-safety.json` - "Is My Windshield Safe?" quiz
- `adas-calibration.json` - "Does My Car Need ADAS Calibration?" quiz
- `repair-replace.json` - "Should I Repair or Replace?" quiz
- `installer-qualified.json` - "Is My Installer Qualified?" quiz
- `insurance-coverage.json` - "Will Insurance Cover My Replacement?" quiz
- `index.ts` - TypeScript exports and utility functions
- `README.md` - This documentation file

## Quiz JSON Schema

### Top-Level Structure

```typescript
{
  id: string;                    // Unique identifier (e.g., "windshield-safety")
  slug: string;                  // URL-friendly slug (e.g., "windshield-safety")
  title: string;                 // Display title
  description: string;           // Short description for cards/previews
  icon: string;                  // Icon identifier (shield-alert, camera, wrench, etc.)
  duration: number;              // Estimated minutes to complete
  priority: number;              // Sort order (1 = highest priority)
  featured: boolean;             // Show on homepage?
  questions: Question[];         // Array of question objects
  scoring: ScoringConfig;        // Scoring rules and results
  metadata: Metadata;            // Related content and CTAs
}
```

---

## Question Object

```typescript
{
  id: string;                    // Question ID (e.g., "q1")
  text: string;                  // Question text
  type: "radio" | "checkbox" | "select" | "visual";
  required: boolean;             // Is this question required?
  helpText?: string;             // Optional tooltip/help text
  conditionalLogic?: {           // Optional: show/hide logic
    showIf: {
      questionId: string;
      answerEquals: string | string[];
    }
  };
  options: Option[];             // Answer options
}
```

### Option Object

```typescript
{
  id: string;                    // Option ID (e.g., "q1a1")
  text: string;                  // Option text
  value: string;                 // Value stored when selected
  score?: number;                // Points for this answer (scoring-based quizzes)
  recommendation?: "repair" | "replace"; // For recommendation-based quizzes
  flag?: "green" | "red";        // For green/red flag quizzes
  nextQuestion?: string;         // Conditional: next question to show
  endQuiz?: boolean;             // End quiz after this answer?
  result?: string;               // Jump to specific result
  image?: string;                // For visual quiz types
  zeroDeductible?: boolean;      // For insurance quiz
  note?: string;                 // Additional context
}
```

---

## Scoring Configurations

### Type 1: Threshold-Based Scoring (Windshield Safety)

Used when total score determines severity level.

```typescript
{
  type?: "threshold", // Optional, default behavior
  severityThresholds: {
    safe: {
      min: number;
      max: number;
      color: "green" | "yellow" | "red";
    },
    caution: { /* same */ },
    critical: { /* same */ }
  },
  resultMessages: {
    safe: ResultMessage,
    caution: ResultMessage,
    critical: ResultMessage
  }
}
```

### Type 2: Conditional/Branching Logic (ADAS Calibration)

Used when specific answer paths lead to specific results.

```typescript
{
  type: "conditional",
  results: {
    mandatory_calibration: ResultMessage,
    recommended_calibration: ResultMessage,
    required_calibration: ResultMessage,
    not_needed: ResultMessage,
    no_adas: ResultMessage
  }
}
```

### Type 3: Recommendation-Based (Repair vs Replace)

Used when any "replace" answer overrides "repair" answers.

```typescript
{
  type: "recommendation_based",
  method: "any_replace_wins",
  results: {
    repair: ResultMessage,
    replace: ResultMessage
  }
}
```

### Type 4: Percentage-Based (Installer Qualified)

Used when percentage of "good" answers determines result.

```typescript
{
  type: "percentage_based",
  totalQuestions: number,
  thresholds: {
    excellent: {
      min: 0.75,  // 75%+
      max: 1.0,
      severity: "safe",
      color: "green",
      result: "trustworthy"
    },
    caution: { /* 50-74% */ },
    poor: { /* 0-49% */ }
  },
  results: {
    trustworthy: ResultMessage,
    proceed_caution: ResultMessage,
    red_flags: ResultMessage
  }
}
```

### Type 5: Mixed Logic (Insurance Coverage)

Used when complex business logic determines result.

```typescript
{
  type: "mixed",
  results: {
    no_coverage: ResultMessage,
    zero_deductible_state: ResultMessage,
    repair_likely_covered: ResultMessage,
    replacement_check_deductible: ResultMessage,
    check_policy: ResultMessage
  },
  logic: {
    rules: [
      {
        if: {
          q1: "liability_only"
        },
        then: "no_coverage"
      },
      {
        if: {
          q2: ["FL", "KY", "SC"],
          q1: "has_comprehensive"
        },
        then: "zero_deductible_state"
      },
      // ... more rules
      {
        default: "check_policy"
      }
    ]
  }
}
```

---

## Result Message Object

```typescript
{
  severity: "safe" | "caution" | "critical" | "info";
  color: "green" | "yellow" | "red" | "blue";
  title: string;                 // Result headline
  summary: string;               // 1-2 sentence summary
  explanation: string;           // Detailed explanation (supports HTML)
  nextSteps: string[];           // Array of action items
}
```

---

## Metadata Object

```typescript
{
  relatedQuizzes: string[];      // Array of quiz slugs
  relatedWhitePapers: string[];  // Array of white paper slugs
  ctaText: string;               // CTA button text
  ctaUrl: string;                // CTA button destination
}
```

---

## Quiz Types & Scoring Logic

### 1. Windshield Safety Quiz
- **Type**: Threshold-based scoring
- **Logic**: Add up scores from all answers, map to severity threshold
- **Thresholds**: 0-5 (safe), 6-15 (caution), 16+ (critical)

### 2. ADAS Calibration Quiz
- **Type**: Conditional/branching
- **Logic**: Each answer can jump to a specific result or next question
- **Special**: Uses `endQuiz: true` and `result: "result_name"` in options

### 3. Repair vs Replace Quiz
- **Type**: Recommendation-based
- **Logic**: If ANY answer has `recommendation: "replace"`, result is "replace"
- **Otherwise**: Result is "repair"

### 4. Installer Qualified Quiz
- **Type**: Percentage-based
- **Logic**: Calculate percentage of `flag: "green"` answers
- **Thresholds**: 75%+ excellent, 50-74% caution, 0-49% poor

### 5. Insurance Coverage Quiz
- **Type**: Mixed logic
- **Logic**: Evaluate custom rules in order, first match wins
- **Special**: Can check multiple question answers in one rule

---

## Implementation Examples

### Example 1: Display Quiz Card

```tsx
import { allQuizzes } from '@/data/quizzes';

export function QuizHub() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {allQuizzes.map(quiz => (
        <QuizCard
          key={quiz.id}
          title={quiz.title}
          description={quiz.description}
          duration={quiz.duration}
          slug={quiz.slug}
          icon={quiz.icon}
          featured={quiz.featured}
        />
      ))}
    </div>
  );
}
```

### Example 2: Load Quiz Data

```tsx
import { getQuizBySlug } from '@/data/quizzes';

export default async function QuizPage({ params }: { params: { slug: string } }) {
  const quiz = getQuizBySlug(params.slug);

  if (!quiz) {
    notFound();
  }

  return <QuizEngine quiz={quiz} />;
}
```

### Example 3: Calculate Score (Threshold-Based)

```typescript
function calculateThresholdScore(answers: Answer[], quiz: Quiz) {
  const totalScore = answers.reduce((sum, answer) => {
    const question = quiz.questions.find(q => q.id === answer.questionId);
    const option = question?.options.find(o => o.value === answer.value);
    return sum + (option?.score || 0);
  }, 0);

  const { severityThresholds } = quiz.scoring;

  for (const [severity, threshold] of Object.entries(severityThresholds)) {
    if (totalScore >= threshold.min && totalScore <= threshold.max) {
      return {
        score: totalScore,
        severity,
        result: quiz.scoring.resultMessages[severity]
      };
    }
  }
}
```

### Example 4: Evaluate Conditional Logic

```typescript
function evaluateConditionalQuiz(answers: Answer[], quiz: Quiz) {
  const lastAnswer = answers[answers.length - 1];
  const lastQuestion = quiz.questions.find(q => q.id === lastAnswer.questionId);
  const selectedOption = lastQuestion?.options.find(o => o.value === lastAnswer.value);

  if (selectedOption?.endQuiz && selectedOption?.result) {
    return {
      result: quiz.scoring.results[selectedOption.result]
    };
  }

  // Continue to next question
  if (selectedOption?.nextQuestion) {
    return { nextQuestion: selectedOption.nextQuestion };
  }
}
```

### Example 5: Check Percentage-Based

```typescript
function calculatePercentageScore(answers: Answer[], quiz: Quiz) {
  const goodAnswers = answers.filter(answer => {
    const question = quiz.questions.find(q => q.id === answer.questionId);
    const option = question?.options.find(o => o.value === answer.value);
    return option?.flag === 'green';
  });

  const percentage = goodAnswers.length / quiz.scoring.totalQuestions;

  for (const [level, threshold] of Object.entries(quiz.scoring.thresholds)) {
    if (percentage >= threshold.min && percentage <= threshold.max) {
      return {
        percentage,
        severity: threshold.severity,
        result: quiz.scoring.results[threshold.result]
      };
    }
  }
}
```

---

## Adding a New Quiz

1. **Create JSON file** in this directory (e.g., `my-quiz.json`)
2. **Follow schema** documented above
3. **Choose scoring type** that matches your logic
4. **Test thoroughly** with various answer combinations
5. **Add to index.ts** exports
6. **Update TOTAL_QUIZZES** count

### Template

```json
{
  "id": "my-quiz",
  "slug": "my-quiz",
  "title": "My Quiz Title",
  "description": "Short description",
  "icon": "icon-name",
  "duration": 3,
  "priority": 6,
  "featured": false,
  "questions": [
    {
      "id": "q1",
      "text": "Your question?",
      "type": "radio",
      "required": true,
      "options": [
        {
          "id": "q1a1",
          "text": "Answer 1",
          "value": "answer_1",
          "score": 0
        }
      ]
    }
  ],
  "scoring": {
    "severityThresholds": {
      "safe": { "min": 0, "max": 10, "color": "green" }
    },
    "resultMessages": {
      "safe": {
        "severity": "safe",
        "color": "green",
        "title": "Result Title",
        "summary": "Brief summary",
        "explanation": "Detailed explanation",
        "nextSteps": ["Step 1", "Step 2"]
      }
    }
  },
  "metadata": {
    "relatedQuizzes": [],
    "relatedWhitePapers": [],
    "ctaText": "Find Installers",
    "ctaUrl": "/find-installers"
  }
}
```

---

## TypeScript Types

See `/src/types/quiz.ts` for complete type definitions.

```typescript
export interface Quiz {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  duration: number;
  priority: number;
  featured: boolean;
  questions: Question[];
  scoring: ScoringConfig;
  metadata: QuizMetadata;
}

export interface Question {
  id: string;
  text: string;
  type: 'radio' | 'checkbox' | 'select' | 'visual';
  required: boolean;
  helpText?: string;
  conditionalLogic?: ConditionalLogic;
  options: Option[];
}

// ... more types
```

---

## Best Practices

1. **Question IDs**: Use sequential IDs (q1, q2, q3...)
2. **Option IDs**: Use format `q{N}a{M}` (e.g., q1a1, q1a2)
3. **Values**: Use snake_case for answer values
4. **HTML in Results**: Use `<strong>` for emphasis, `<ul>/<li>` for lists
5. **Next Steps**: Keep to 4-6 actionable items
6. **Help Text**: Brief, 1 sentence max
7. **Testing**: Test all possible answer paths before deployment

---

## Testing Checklist

- [ ] All questions display correctly
- [ ] All answer options are selectable
- [ ] Conditional logic works (if applicable)
- [ ] All possible result combinations tested
- [ ] Scoring calculates correctly
- [ ] Next steps are actionable
- [ ] Related content links are valid
- [ ] CTA button goes to correct page
- [ ] Mobile display works properly
- [ ] Accessibility (keyboard navigation, screen readers)

---

## Version History

- **v1.0.0** (2025-10-06) - Initial quiz data structure with 5 quizzes
