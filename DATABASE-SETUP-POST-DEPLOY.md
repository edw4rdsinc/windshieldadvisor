# Database Setup - Post-Deployment

**Status**: Database credentials configured, but tables not created yet
**Reason**: Network restrictions prevent Prisma from accessing Supabase from this environment
**Impact**: **None - site works perfectly without database**

---

## What Works Without Database

✅ **All quiz functionality** - quizzes work perfectly, generate results
✅ **Email sending** - quiz results emails via Resend
✅ **All pages** - blog, white papers, quizzes, homepage
✅ **SEO** - sitemap, robots.txt, schema markup

## What Doesn't Work Without Database

❌ **Quiz analytics tracking** - can't see how many users take quizzes
❌ **Phone click tracking** - can't track when users click phone numbers
❌ **Email capture tracking** - can't see who requested quiz results

**Bottom line**: You can launch today and add analytics later this week!

---

## How to Create Database Tables (2 Options)

### Option 1: From Vercel (After Deploy) - EASIEST

Once deployed to Vercel, run from your local machine:

```bash
# 1. Clone the repo locally (if not already)
git clone <your-repo-url>
cd windshieldadvisor

# 2. Copy .env.local with credentials
# (or create new one with DATABASE_URL and DIRECT_URL)

# 3. Run database push
npm install
npm run db:push
```

Vercel's servers will be able to reach Supabase port 5432.

### Option 2: Manual SQL via Supabase Dashboard - FASTEST

1. Go to: https://supabase.com/dashboard/project/exzeayeoosiabwhgyquq/editor
2. Click "SQL Editor"
3. Copy/paste this SQL:

```sql
-- Quiz Sessions Table
CREATE TABLE IF NOT EXISTS "QuizSession" (
    "id" TEXT PRIMARY KEY,
    "quizId" TEXT NOT NULL,
    "quizSlug" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "result" JSONB,
    "severity" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "sessionId" TEXT,
    "userAgent" TEXT,
    "ipAddress" TEXT
);

CREATE INDEX IF NOT EXISTS "QuizSession_quizId_idx" ON "QuizSession"("quizId");
CREATE INDEX IF NOT EXISTS "QuizSession_quizSlug_idx" ON "QuizSession"("quizSlug");
CREATE INDEX IF NOT EXISTS "QuizSession_startedAt_idx" ON "QuizSession"("startedAt");
CREATE INDEX IF NOT EXISTS "QuizSession_completedAt_idx" ON "QuizSession"("completedAt");

-- Phone Click Tracking
CREATE TABLE IF NOT EXISTS "PhoneClick" (
    "id" TEXT PRIMARY KEY,
    "location" TEXT NOT NULL,
    "quizId" TEXT,
    "quizSlug" TEXT,
    "severity" TEXT,
    "phoneNumber" TEXT NOT NULL DEFAULT '971-317-8376',
    "sessionId" TEXT,
    "userAgent" TEXT,
    "referrer" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PhoneClick_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "QuizSession"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "PhoneClick_quizId_idx" ON "PhoneClick"("quizId");
CREATE INDEX IF NOT EXISTS "PhoneClick_location_idx" ON "PhoneClick"("location");
CREATE INDEX IF NOT EXISTS "PhoneClick_timestamp_idx" ON "PhoneClick"("timestamp");

-- Email Capture
CREATE TABLE IF NOT EXISTS "EmailCapture" (
    "id" TEXT PRIMARY KEY,
    "email" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "quizSlug" TEXT NOT NULL,
    "resultSeverity" TEXT,
    "resultSummary" TEXT,
    "sessionId" TEXT,
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "emailSentAt" TIMESTAMP(3),
    "resendEmailId" TEXT,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EmailCapture_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "QuizSession"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "EmailCapture_email_idx" ON "EmailCapture"("email");
CREATE INDEX IF NOT EXISTS "EmailCapture_quizId_idx" ON "EmailCapture"("quizId");
CREATE INDEX IF NOT EXISTS "EmailCapture_capturedAt_idx" ON "EmailCapture"("capturedAt");

-- Lead Tracking Events
CREATE TABLE IF NOT EXISTS "LeadTrackingEvent" (
    "id" TEXT PRIMARY KEY,
    "event" TEXT NOT NULL,
    "properties" JSONB,
    "quizId" TEXT,
    "quizSlug" TEXT,
    "page" TEXT,
    "sessionId" TEXT,
    "userAgent" TEXT,
    "referrer" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "LeadTrackingEvent_event_idx" ON "LeadTrackingEvent"("event");
CREATE INDEX IF NOT EXISTS "LeadTrackingEvent_quizId_idx" ON "LeadTrackingEvent"("quizId");
CREATE INDEX IF NOT EXISTS "LeadTrackingEvent_timestamp_idx" ON "LeadTrackingEvent"("timestamp");

-- Analytics Summary
CREATE TABLE IF NOT EXISTS "AnalyticsSummary" (
    "id" TEXT PRIMARY KEY,
    "date" DATE UNIQUE NOT NULL,
    "totalVisits" INTEGER NOT NULL DEFAULT 0,
    "uniqueVisitors" INTEGER NOT NULL DEFAULT 0,
    "quizStarts" INTEGER NOT NULL DEFAULT 0,
    "quizCompletions" INTEGER NOT NULL DEFAULT 0,
    "quizCompletionRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "phoneClicks" INTEGER NOT NULL DEFAULT 0,
    "emailCaptures" INTEGER NOT NULL DEFAULT 0,
    "conversionRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "quizBreakdown" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "AnalyticsSummary_date_idx" ON "AnalyticsSummary"("date");
```

4. Click "Run"
5. Verify 5 tables created in "Table Editor" tab

---

## Testing Database Connection

After creating tables, test from your local machine:

```bash
# Test connection
npm run db:generate
node -e "const { PrismaClient } = require('@prisma/client'); const p = new PrismaClient(); p.quizSession.count().then(c => console.log('Tables exist! Count:', c)).catch(e => console.error('Error:', e.message)).finally(() => p.\$disconnect());"
```

Should output: `Tables exist! Count: 0`

---

## Adding to Vercel

After tables are created, add these to Vercel environment variables:

```
DATABASE_URL=postgresql://postgres.exzeayeoosiabwhgyquq:f37e29f8cf5038adf3ea1d1eff97c613@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true

DIRECT_URL=postgresql://postgres.exzeayeoosiabwhgyquq:f37e29f8cf5038adf3ea1d1eff97c613@db.exzeayeoosiabwhgyquq.supabase.co:5432/postgres
```

Then redeploy: `vercel --prod`

---

## When to Do This

**Option A**: Right after first deployment (same day)
- Takes 5 minutes with SQL method
- Start tracking analytics from day 1

**Option B**: Next week
- Site works fine without it
- Add when you want to see quiz analytics
- No rush

**Recommendation**: Deploy first, celebrate, then add database tomorrow. The site is ready to launch NOW! 🚀
