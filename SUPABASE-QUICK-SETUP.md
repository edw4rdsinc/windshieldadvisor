# Supabase Quick Setup Guide - Windshield Advisor

**Your Supabase Project**: https://exzeayeoosiabwhgyquq.supabase.co

## Step 1: Get Your Connection Credentials (5 minutes)

1. Go to https://supabase.com/dashboard
2. Select your **windshield-advisor** project
3. Go to **Settings** (gear icon) → **API**

**Copy these values**:
```bash
# Project URL
NEXT_PUBLIC_SUPABASE_URL="https://exzeayeoosiabwhgyquq.supabase.co"

# anon (public) key - starts with "eyJ..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_anon_key_here"

# service_role key - starts with "eyJ..." (KEEP SECRET!)
SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"
```

4. Go to **Settings** → **Database**
5. Scroll to **Connection string** → **Connection pooler** → **Transaction mode**

**Copy this value**:
```bash
# Will look like:
DATABASE_URL="postgresql://postgres.xxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

6. Click **Connection string** tab → **URI**

**Copy this value**:
```bash
# Will look like:
DIRECT_URL="postgresql://postgres.xxx:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres"
```

## Step 2: Update Environment Variables (2 minutes)

**File**: `.env.local` (in your windshieldadvisor directory)

Replace the placeholder values with your actual credentials:

```bash
# Database (from Supabase setup)
DATABASE_URL="postgresql://postgres.xxx:YOUR_PASSWORD@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xxx:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://exzeayeoosiabwhgyquq.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."

# Sanity CMS (already configured)
NEXT_PUBLIC_SANITY_PROJECT_ID="23d5d36h"
NEXT_PUBLIC_SANITY_DATASET="production"

# Email (already configured)
RESEND_API_KEY="re_JgqiiJdh_5SBPNDVZEmK5acfWdp2kLm8M"
FROM_EMAIL="noreply@windshieldadvisor.info"

# App
NEXT_PUBLIC_APP_URL="https://windshieldadvisor.info"
```

## Step 3: Create Database Tables (3 minutes)

Run these commands in your windshieldadvisor directory:

```bash
cd /home/sam/Documents/github-repos/windshieldadvisor/windshieldadvisor

# Generate Prisma client
npm run db:generate

# Push schema to Supabase (creates all tables)
npm run db:push
```

You should see:
```
✔ Generated Prisma Client
Your database is now in sync with your Prisma schema.
✔ 5 tables created
```

## Step 4: Verify Tables Created (2 minutes)

1. Go to Supabase Dashboard → **Table Editor**
2. You should see these 5 tables:
   - ✅ `QuizSession`
   - ✅ `PhoneClick`
   - ✅ `EmailCapture`
   - ✅ `LeadTrackingEvent`
   - ✅ `AnalyticsSummary`

## Step 5: Enable Row Level Security (Optional but Recommended) (5 minutes)

For production security, enable RLS:

1. Go to **Authentication** → **Policies**
2. For each table, click **Enable RLS**

**For QuizSession, PhoneClick, EmailCapture, LeadTrackingEvent**:
- Click **New Policy** → **Create policy**
- Name: "Allow anonymous inserts"
- Policy command: `INSERT`
- Target roles: `public`
- Using expression: `true`
- With check: `true`
- Click **Review** → **Save policy**

**For AnalyticsSummary**:
- Click **New Policy** → **Create policy**
- Name: "Service role full access"
- Policy command: `ALL`
- Target roles: Leave empty
- Using expression: `auth.role() = 'service_role'`
- Click **Review** → **Save policy**

## Step 6: Test Database Connection (2 minutes)

```bash
# Open Prisma Studio to view database
npm run db:studio
```

Browser opens at `http://localhost:5555` showing your 5 tables. ✅

## Step 7: Deploy to Vercel (5 minutes)

```bash
# Add environment variables to Vercel
vercel env add DATABASE_URL
# Paste your DATABASE_URL when prompted

vercel env add DIRECT_URL
# Paste your DIRECT_URL when prompted

vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste your SUPABASE_URL when prompted

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste your ANON_KEY when prompted

vercel env add SUPABASE_SERVICE_ROLE_KEY
# Paste your SERVICE_ROLE_KEY when prompted

# Redeploy
vercel --prod
```

## Troubleshooting

### "Can't reach database server"
- Check DATABASE_URL password has special characters properly escaped
- Try using DIRECT_URL instead for migrations
- Verify region matches (us-west-1 vs us-west-2)

### "Schema drift detected"
```bash
npm run db:push
```

### "Table already exists"
```bash
# Just generate the client
npm run db:generate
```

## What This Gives You

✅ **Quiz Session Tracking** - Every quiz attempt stored with answers and results
✅ **Phone Click Tracking** - Every phone number click tracked with context
✅ **Email Capture** - Email signups for quiz results with delivery tracking
✅ **Lead Tracking Events** - Custom analytics for funnel analysis
✅ **Daily Analytics** - Aggregated metrics for dashboards

## Total Setup Time: ~25 minutes

---

**Ready to track conversions!** When users complete quizzes and click your phone number, everything flows to Supabase for analysis.

**Next**: Set up email sequences (see EMAIL-SEQUENCES.md)
