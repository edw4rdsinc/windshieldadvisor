# 📞 Windshield Advisor - Phone Click Tracking

## Overview

Windshield Advisor is an educational content marketing platform that drives phone calls to Vero Autoglass. Every quiz result prominently displays Vero's phone number with full conversion tracking.

## Conversion Flow

```
Homepage → Quiz → Results Page → Call Vero → Customer
```

**Not a lead marketplace** - All quiz takers are directed to call Vero Autoglass directly.

## Phone Tracking Implementation

### What Gets Tracked

**Event Name**: `Phone Click`

**Tracked Properties**:
- `location`: "quiz-results" (always)
- `quiz_id`: Internal quiz ID
- `quiz_slug`: URL-friendly quiz identifier
- `severity`: Result severity (critical/caution/info)

**Example**:
```javascript
{
  event: 'Phone Click',
  props: {
    location: 'quiz-results',
    quiz_id: 'adas-calibration',
    quiz_slug: 'adas-calibration',
    severity: 'critical'
  }
}
```

### Dual Tracking System

**1. Plausible Analytics** (Client-side)
- Fast, privacy-friendly tracking
- Real-time dashboard at https://plausible.io/windshieldadvisor.info
- No cookies, GDPR compliant

**2. API Tracking** (Server-side)
- Detailed event logging to `/api/lead-tracking`
- Stored in database for analysis
- Backup in case Plausible is blocked

## Phone Number CTA Location

**File**: `src/components/quiz/QuizResults.tsx` (lines 315-355)

**Design**:
- Gradient blue background (safety-blue-700 to safety-blue-800)
- 5xl text on mobile, 6xl on desktop
- Click tracking via `onClick={handlePhoneClick}`
- Data attributes: `data-phone` and `data-quiz`

**Phone Number**: **971-317-8376** (Vero Autoglass)

**Service Area**: Portland Metro Area

**Trust Badges**:
- ✓ AGSC Certified
- ✓ ADAS Calibration
- ✓ OEM Glass
- ✓ Lifetime Warranty

## Analytics Queries

### Most Valuable Quizzes (Drive Most Calls)

```sql
SELECT
  quiz_slug,
  COUNT(*) as total_clicks,
  COUNT(DISTINCT session_id) as unique_sessions
FROM phone_clicks
WHERE location = 'quiz-results'
GROUP BY quiz_slug
ORDER BY total_clicks DESC;
```

**Expected Leaders**:
1. `adas-calibration` - Highest perceived urgency
2. `repair-replace` - Clear decision needed
3. `insurance-coverage` - Financial motivation

### Conversion Rate by Quiz

```sql
SELECT
  quiz_completions.quiz_slug,
  COUNT(DISTINCT quiz_completions.session_id) as completions,
  COUNT(DISTINCT phone_clicks.session_id) as calls,
  ROUND(
    COUNT(DISTINCT phone_clicks.session_id)::FLOAT /
    COUNT(DISTINCT quiz_completions.session_id) * 100,
    2
  ) as conversion_rate
FROM quiz_completions
LEFT JOIN phone_clicks ON quiz_completions.session_id = phone_clicks.session_id
GROUP BY quiz_completions.quiz_slug
ORDER BY conversion_rate DESC;
```

**Target**: 10-15% quiz-to-call conversion rate

### Conversion by Result Severity

```sql
SELECT
  severity,
  COUNT(*) as phone_clicks
FROM phone_clicks
WHERE location = 'quiz-results'
GROUP BY severity
ORDER BY phone_clicks DESC;
```

**Hypothesis**: "critical" results → highest call rate

## Key Metrics to Monitor

### Primary KPIs

1. **Quiz Completion Rate**
   - Target: 60%+ (people who start → finish)

2. **Quiz-to-Call Conversion**
   - Target: 10-15% (quiz completions → phone clicks)

3. **Overall Visitor-to-Call**
   - Target: 5-8% (site visitors → phone clicks)

### Secondary Metrics

4. **Best Performing Quiz**
   - Which quiz drives most calls?

5. **Severity Impact**
   - Do "critical" results call more than "caution"?

6. **Time to Call**
   - How long between quiz completion and call?

## Plausible Dashboard Setup

**Domain**: windshieldadvisor.info

**Goals to Create**:
1. `Phone Click` - Custom event (already tracking)
2. `Quiz Started` - Track quiz engagement
3. `Quiz Completed` - Track completion rate
4. `Email Captured` - Secondary lead capture

**Funnel**:
```
Visit Homepage
  ↓
Start Quiz (60% target)
  ↓
Complete Quiz (90% target)
  ↓
Click Phone Number (15% target)
  ↓
CALL VERO
```

## Call Attribution

**Question**: How do we know if someone actually called after clicking?

**Answer**: We can't know for certain without call tracking software, but we can measure:

1. **Click Intent**: Phone clicks = strong intent to call
2. **Industry Benchmarks**: 60-80% of mobile phone clicks = actual calls
3. **Correlation**: Track if call volume at Vero increases after quiz campaigns

**Recommendation**: If you want definitive call attribution:
- Use CallRail or similar call tracking
- Get unique phone number for Windshield Advisor traffic
- Track which calls came from quiz clicks

## Integration with Vero Analytics

**Vero's Daily Email Reports** (from plausible-monitor):
- Currently tracks veroautoglass.com phone clicks
- Shows breakdown by button location

**Windshield Advisor Tracking**:
- Separate Plausible property
- Track referrals to veroautoglass.com
- Can track if quiz → veroautoglass.com → call

**Cross-Site Tracking** (Optional):
- Add UTM parameters to any links to veroautoglass.com
- Example: `veroautoglass.com/?utm_source=windshieldadvisor&utm_campaign=quiz-adas`

## Expected Results

**Month 1** (After Launch):
- 1,000 quiz completions
- 100-150 phone clicks (10-15% conversion)
- 60-120 actual calls (60-80% of clicks)

**Month 3** (With SEO Momentum):
- 5,000 quiz completions
- 500-750 phone clicks
- 300-600 actual calls

**Call Value**:
- Average windshield job: $300-$600
- Close rate on calls: 30-40%
- Revenue per call: $90-$240
- Monthly revenue (Month 3): $27,000-$144,000

## Testing Phone Tracking

**Manual Test**:
1. Go to windshieldadvisor.info/quizzes
2. Complete any quiz
3. Click phone number on results page
4. Check Plausible dashboard for "Phone Click" event
5. Verify quiz_slug and severity are captured

**API Test**:
```bash
# Check if tracking endpoint works
curl -X POST https://windshieldadvisor.info/api/lead-tracking \
  -H "Content-Type: application/json" \
  -d '{
    "event": "phone_click",
    "quizId": "test",
    "quizSlug": "test-quiz",
    "severity": "critical",
    "timestamp": "2025-10-21T12:00:00Z"
  }'
```

## Privacy & Compliance

✅ **No PII Collected**: Only quiz context, not user identity
✅ **No Cookies**: Plausible doesn't use cookies
✅ **GDPR Compliant**: Privacy-first analytics
✅ **Transparent**: User knows they're clicking to call

## Next Steps

1. **Set up Plausible property** for windshieldadvisor.info
2. **Configure goals** in Plausible dashboard
3. **Deploy site** to staging for testing
4. **Test phone tracking** on all quiz results
5. **Launch** and monitor conversion funnel
6. **Optimize** based on which quizzes perform best

---

**Created**: October 21, 2025
**Project**: Windshield Advisor → Vero Autoglass conversion platform
**Contact**: Vero Autoglass - 971-317-8376
