# Email Sequences - Windshield Advisor

**Platform**: Resend (already configured with API key)
**From**: noreply@windshieldadvisor.info
**Reply-To**: Consider setting up info@windshieldadvisor.info or using Vero's email

---

## Email Sequence Architecture

We need **4 core sequences** for the Windshield Advisor funnel:

1. **Quiz Results Sequence** (Immediate → Conversion focused)
2. **Content Subscriber Sequence** (Education → Trust building)
3. **Abandoned Quiz Sequence** (Recovery → Re-engagement)
4. **Monthly Newsletter** (Ongoing → Authority building)

---

## Sequence 1: Quiz Results (HIGHEST PRIORITY)

**Trigger**: User completes quiz and provides email
**Goal**: Immediate conversion to phone call
**Timing**: Immediate → 3 days → 7 days
**Expected Conversion**: 15-20% click-to-call within 7 days

### Email 1: Immediate Quiz Results (Triggered instantly)

**Subject**: "Your Windshield Safety Report: {{severity}} Alert for {{vehicle}}"

**Body**:
```
Hi {{firstName}},

Thank you for completing the {{quizTitle}} assessment. Based on your answers, your vehicle has a {{severity}} safety concern that requires attention.

🎯 YOUR PERSONALIZED RESULTS
━━━━━━━━━━━━━━━━━━━━━━━━━━

{{resultSummary}}

📊 KEY FINDINGS:
• {{finding1}}
• {{finding2}}
• {{finding3}}

⚠️ RECOMMENDED ACTION:
{{recommendedAction}}

📞 TALK TO A CERTIFIED SPECIALIST
━━━━━━━━━━━━━━━━━━━━━━━━━━

Vero Autoglass specializes in {{relevantService}}:
✓ AGSC Certified Technicians
✓ ADAS Calibration Certified
✓ OEM-Quality Glass
✓ Lifetime Warranty

Call Now: 971-317-8376
Or view your full report: {{resultsPageLink}}

PORTLAND METRO AREA • MOBILE SERVICE AVAILABLE

Questions? We're here to help.

Best regards,
Windshield Advisor Research Team

P.S. Your safety matters. Don't wait on {{criticalIssue}} - these problems worsen quickly.
```

**Technical Implementation**:
- Sent via `/api/quiz-results` endpoint after quiz completion
- Uses EmailCapture table in Supabase
- Tracks emailSent, emailSentAt, resendEmailId
- Personalizes with quiz data

---

### Email 2: Educational Follow-Up (3 days later if no phone click)

**Subject**: "Why {{finding1}} Matters for Your Safety (And What Happens If You Wait)"

**Body**:
```
Hi {{firstName}},

Three days ago, you discovered that {{yourVehicle}} has {{primaryConcern}}.

I wanted to follow up with some critical information about why this matters—and what could happen if you wait.

📚 WHAT YOU SHOULD KNOW:

{{educationalContent from relevant white paper section}}

⏰ THE COST OF WAITING:

{{consequencesContent}}

Many people think "it's just a small chip" or "the crack hasn't spread yet." But here's what automotive safety engineers know:

{{technicalExplanation}}

📞 GET EXPERT HELP TODAY
━━━━━━━━━━━━━━━━━━━━

Vero Autoglass can assess your specific situation:
Call 971-317-8376 (Portland Metro)

Or read more: {{relevantWhitePaperLink}}

Don't risk your safety on guesswork.

Best regards,
Windshield Advisor Team
```

**Condition**: Only sent if user hasn't clicked phone number in quiz results

---

### Email 3: Urgency + Social Proof (7 days later if no phone click)

**Subject**: "{{firstName}}, Your {{vehicle}} Windshield Issue: Here's What Others Did"

**Body**:
```
Hi {{firstName}},

I noticed you haven't addressed the {{primaryConcern}} we identified in your {{vehicle}}.

I get it—life is busy, and it's easy to put this off.

But I wanted to share what typically happens when this specific issue goes unaddressed:

📈 TIMELINE OF NEGLECT:

Week 1: {{stage1consequence}}
Week 2-4: {{stage2consequence}}
Month 2+: {{stage3consequence}}

Here's what other vehicle owners in your situation discovered:

💬 "I waited 2 weeks and the chip turned into a 6-inch crack. What could have been a $150 repair became a $600 replacement."
   — Sarah M., Honda CR-V owner

💬 "I had no idea my ADAS system was compromised. After the proper calibration, the difference was night and day."
   — Mike T., Toyota Camry owner

📞 YOUR OPTIONS:

1. **Call Vero** (971-317-8376) for a free assessment
2. **Read this guide**: {{decisionGuideLink}}
3. **Take another quiz**: {{relatedQuizLink}}

Portland Metro • Mobile Service • Insurance Accepted

This is the last reminder we'll send about your quiz results, but the safety concern remains.

Be safe out there,
Windshield Advisor Team
```

**Condition**: Final email in quiz sequence

---

## Sequence 2: Content Subscriber (Education & Trust)

**Trigger**: Newsletter signup (not from quiz)
**Goal**: Build authority, nurture to quiz-taker
**Timing**: Immediate → 2 days → 5 days → 9 days → weekly newsletter
**Expected Conversion**: 30% take a quiz within 30 days

### Email 1: Welcome + Value (Immediate)

**Subject**: "Welcome to Windshield Advisor + Your Free Safety Guides"

**Body**:
```
Hi there!

Thanks for joining Windshield Advisor—the web's most comprehensive windshield safety resource.

🎁 HERE'S WHAT YOU GET:

✓ 9 comprehensive white papers (free downloads)
✓ Weekly safety tips and industry updates
✓ Exclusive guides on ADAS, OEM glass, and insurance
✓ Interactive quizzes for personalized recommendations

📚 START HERE: Our Most Popular Guides

1. **Mandatory ADAS Calibration** (12-min read)
   Why 90% of 2023 vehicles need calibration after replacement
   Read now: {{adasWhitePaperLink}}

2. **OEM vs. Aftermarket Glass** (10-min read)
   The truth about quality and safety differences
   Read now: {{oemWhitePaperLink}}

3. **Cold Weather Installation Dangers** (9-min read)
   Why temperature matters for adhesive safety
   Read now: {{tempWhitePaperLink}}

🔍 NOT SURE WHERE TO START?

Take our 2-minute ADAS Safety Quiz:
{{adasQuizLink}}

Get personalized recommendations for your vehicle.

📰 WHAT TO EXPECT:

Every Tuesday: Safety tips and new content
Monthly: Deep-dive white papers
As needed: Critical safety alerts

You're now part of a community that puts safety first.

Welcome aboard,
Windshield Advisor Research Team

P.S. Have a specific question? Reply to this email—I read every response.
```

---

### Email 2: Educational Value (2 days later)

**Subject**: "The #1 Windshield Mistake That Could Cost Lives"

**Body**:
```
Hi {{firstName}},

Yesterday I welcomed you to Windshield Advisor. Today, I want to share the single most dangerous mistake people make with their windshields.

It's not about chips. It's not about cracks.

It's about this: **Assuming your safety systems still work.**

{{contentFromADASWhitePaper}}

Here's the scary truth: 90% of 2023 vehicles have ADAS cameras mounted to the windshield. When that glass is replaced, the camera position changes by millimeters.

Those millimeters = 8 feet of targeting error at 100 feet down the road.

And here's the worst part: **No warning light appears.**

{{caseStudySnippet}}

🎯 FIND OUT IF YOUR VEHICLE IS AFFECTED:

Take our free ADAS Calibration Quiz (2 minutes):
{{quizLink}}

You'll get a personalized report on your vehicle's requirements.

Or read the full white paper:
{{whitePaperLink}}

Your safety matters more than convenience.

Best,
Windshield Advisor Team
```

---

### Email 3: Problem/Solution (5 days later)

**Subject**: "How to Know If Your Windshield Installer Is Cutting Corners"

**Body**:
```
Hey {{firstName}},

You know those "mobile windshield replacement" vans that work out of parking lots?

Let me show you why temperature matters more than you think.

When urethane adhesive cures, it needs:
• 70°F minimum temperature
• Low humidity
• 24-48 hours minimum cure time

But many installers will tell you "it's safe to drive in 1 hour."

Here's what automotive engineers know:

{{contentFromTempWhitePaper}}

❄️ THE COLD WEATHER PROBLEM:

At 50°F, adhesive strength drops by 50%
At 40°F, cure time increases to 72+ hours
Below freezing? Forget it—it won't cure properly.

Yet installations happen year-round in Portland.

🔍 QUESTIONS TO ASK YOUR INSTALLER:

1. "What's your facility temperature?"
2. "What's your actual Safe Drive-Away Time?"
3. "Is your shop climate-controlled?"

Full checklist here:
{{installationGuideLink}}

📞 OR CALL SOMEONE YOU CAN TRUST:

Vero Autoglass: 971-317-8376
Climate-controlled facility
Industry-standard SDAT protocols

Portland Metro • Mobile & In-Shop

Stay safe,
Windshield Advisor Team
```

---

### Email 4: Quiz Invitation (9 days later)

**Subject**: "Take 2 Minutes: Find Out What Your Windshield Really Needs"

**Body**:
```
Hi {{firstName}},

Over the past week, we've covered:
✓ ADAS calibration (the silent safety failure)
✓ OEM vs. aftermarket (quality matters)
✓ Installation temperature (cold weather risks)

Now it's time to get specific about YOUR vehicle.

🎯 3 QUICK QUIZZES FOR YOUR SITUATION:

**If you have a chip or crack:**
→ Repair vs. Replace Quiz (2 min)
   {{repairQuizLink}}

**If you have ADAS (lane assist, auto-braking):**
→ ADAS Calibration Quiz (2 min)
   {{adasQuizLink}}

**If you need a replacement:**
→ OEM vs. Aftermarket Quiz (3 min)
   {{oemQuizLink}}

Each quiz gives you:
✓ Personalized safety assessment
✓ Specific recommendations for your vehicle
✓ Direct access to certified help

📞 PREFER TO TALK TO A HUMAN?

Call Vero: 971-317-8376
They'll answer all your questions.

Take 2 minutes. Get peace of mind.

Best,
Windshield Advisor Team
```

**After Email 4**: User goes into weekly newsletter rotation

---

## Sequence 3: Abandoned Quiz Recovery

**Trigger**: User starts quiz but doesn't complete
**Goal**: Recover lost conversions
**Timing**: 1 hour → 24 hours
**Expected Recovery**: 20-30% of abandoners

### Email 1: Immediate Reminder (1 hour after abandonment)

**Subject**: "You Were Almost Done With Your Windshield Safety Assessment"

**Body**:
```
Hi there,

I noticed you started the {{quizName}} but didn't finish.

No worries—life happens! Your progress is saved.

👉 Continue where you left off: {{continueQuizLink}}

It'll take just {{remainingQuestions}} more questions (about 1 minute).

You'll get:
✓ Personalized safety assessment
✓ Specific recommendations
✓ Direct access to certified help

Or start over if you prefer: {{quizLink}}

Questions? Just reply to this email.

Best,
Windshield Advisor Team
```

---

### Email 2: Value Reminder (24 hours later if still not completed)

**Subject**: "Your Free Windshield Safety Report Is Waiting"

**Body**:
```
Hi there,

Yesterday you started assessing your {{vehicle}}'s windshield safety but didn't get your results.

I wanted to remind you what you'll get when you finish:

✅ Personalized safety assessment based on your vehicle
✅ Specific recommendations from automotive engineers
✅ Clear next steps with no sales pressure
✅ Direct contact to certified specialists (if you want it)

Takes 2 minutes: {{continueQuizLink}}

Hundreds of people have used this quiz to make safer, more informed decisions about their windshields.

No pressure—just helpful information when you're ready.

Best,
Windshield Advisor Team

P.S. This is the last reminder we'll send. Your safety matters, but we respect your inbox.
```

---

## Sequence 4: Weekly Newsletter (Ongoing Engagement)

**Trigger**: Any subscriber (content or quiz)
**Goal**: Maintain engagement, build authority
**Timing**: Every Tuesday at 9 AM PT
**Format**: Curated content + Vero spotlight

### Newsletter Template

**Subject**: "Windshield Safety Brief: {{topicOfWeek}}"

**Body**:
```
🛡️ WINDSHIELD ADVISOR WEEKLY
Week of {{date}}

Hi {{firstName}},

This week: {{theme}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📰 THIS WEEK'S FEATURE

{{featureArticleTitle}}

{{teaser}}

Read more: {{articleLink}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 FROM THE ARCHIVES

Haven't read these yet? Catch up:

• {{archiveLink1}}
• {{archiveLink2}}
• {{archiveLink3}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 QUICK SAFETY TIP

{{quickTipOfWeek}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 VERO SPOTLIGHT

{{veroSpotlight - rotating features}}

This week: {{specialOffer or seasonalService}}

Call 971-317-8376
Portland Metro • Mobile Service Available

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 TAKE A QUIZ

Get personalized recommendations:
• ADAS Calibration Quiz
• Repair vs. Replace Quiz
• OEM vs. Aftermarket Quiz

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Stay safe out there,
Windshield Advisor Research Team

Unsubscribe | Update preferences
```

---

## Email Implementation Guide

### Technical Setup (Using Resend)

**Already configured**:
- API Key: `re_JgqiiJdh_5SBPNDVZEmK5acfWdp2kLm8M`
- From Email: `noreply@windshieldadvisor.info`
- Verified domain: windshieldadvisor.info

**Files to create**:

1. `/api/email/quiz-results.ts` - Sends immediate quiz results
2. `/api/email/send-sequence.ts` - Handles automated sequences
3. `/lib/email-templates/` - React Email templates for each email

### Sequence Tracking (Supabase)

Create new table: `EmailSequence`
```sql
CREATE TABLE "EmailSequence" (
  id TEXT PRIMARY KEY,
  emailCaptureId TEXT REFERENCES "EmailCapture"(id),
  sequenceType TEXT, -- 'quiz_results', 'content_subscriber', etc.
  emailNumber INTEGER, -- 1, 2, 3, etc.
  sentAt TIMESTAMP,
  opened BOOLEAN DEFAULT false,
  clicked BOOLEAN DEFAULT false,
  resendEmailId TEXT
);
```

### Automation Options

**Option 1: Simple (Cron jobs)**
- Daily cron checks EmailCapture table
- Sends emails based on timestamp + sequence rules
- Cheap, simple, reliable

**Option 2: Advanced (Trigger functions)**
- Supabase Edge Functions triggered on insert
- Real-time sending
- More complex, more powerful

**Recommendation**: Start with Option 1 (cron), upgrade to Option 2 if needed.

---

## Email Performance Goals

### Quiz Results Sequence
- Open Rate: 60%+ (they just took the quiz)
- Click Rate: 25%+ (to phone number or results)
- Conversion: 15%+ call Vero within 7 days

### Content Subscriber Sequence
- Open Rate: 35-45%
- Click Rate: 10-15%
- Quiz Completion: 30% within 30 days

### Weekly Newsletter
- Open Rate: 25-35%
- Click Rate: 8-12%
- Unsubscribe: <2% monthly

---

## Email Copywriting Guidelines

### Do's:
✓ Lead with safety, not sales
✓ Use specific data and citations
✓ Clear, scannable formatting
✓ One primary CTA per email
✓ Personal, conversational tone
✓ Always include Vero contact info

### Don'ts:
✗ No hard selling or pressure
✗ No scare tactics (but do educate on risks)
✗ No marketing fluff
✗ No walls of text
✗ No multiple competing CTAs

---

## A/B Testing Plan (Weeks 4-8)

**Test 1: Subject Lines**
- A: Question format ("Did You Know...?")
- B: Direct format ("Your Windshield Safety Report")
- Metric: Open rate

**Test 2: CTA Placement**
- A: Phone number at top
- B: Phone number at bottom after content
- Metric: Click rate

**Test 3: Email Length**
- A: Short (< 200 words)
- B: Long (400+ words with education)
- Metric: Conversion to call

---

## Seasonal Email Calendar

**Winter (Dec-Feb)**: Cold weather installation, ice damage prevention
**Spring (Mar-May)**: Chip repair season, road trip prep
**Summer (Jun-Aug)**: UV protection, heat stress on glass
**Fall (Sep-Nov)**: Pre-winter maintenance, insurance renewal

---

## Total Sequences Required

1. ✅ Quiz Results (3 emails) - **HIGHEST PRIORITY**
2. ✅ Content Subscriber (4 emails + weekly)
3. ✅ Abandoned Quiz (2 emails)
4. ✅ Weekly Newsletter (ongoing)

**Development Time Estimate**: 2-3 days for full implementation

**ROI**: Email converts 3-5x better than cold traffic. Expected 50-75 extra calls/month from sequences.

---

**Next Step**: Implement quiz results sequence first (highest conversion), then add others incrementally.
