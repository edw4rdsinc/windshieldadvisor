# Supabase Setup for Windshield Advisor

## 1. Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. **Project Name**: `windshield-advisor`
4. **Database Password**: (generate strong password - save it!)
5. **Region**: `West US (North California)` (closest to Portland)
6. Click "Create new project"

Wait 2-3 minutes for project to be created.

## 2. Get Connection Strings

Once project is created:

1. Click on your project
2. Go to **Settings** (gear icon) → **Database**
3. Scroll down to **Connection string**

### Connection Pooler (for Prisma)

Select **Connection pooler** tab → **Transaction mode**

Copy the connection string. It looks like:
```
postgresql://postgres.xxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

This is your `DATABASE_URL`

### Direct Connection (for migrations)

Select **Connection string** tab → **URI**

Copy the connection string. It looks like:
```
postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

This is your `DIRECT_URL`

## 3. Get API Keys

1. Go to **Settings** → **API**
2. Copy these values:

- **Project URL**: `https://[YOUR-PROJECT-REF].supabase.co`
- **anon public** key (starts with `eyJ...`)
- **service_role** key (starts with `eyJ...`) - Keep this secret!

## 4. Configure Environment Variables

Create `.env.local` file in your project root:

```bash
# Database (from step 2)
DATABASE_URL="postgresql://postgres.xxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Supabase (from step 3)
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."

# Email
RESEND_API_KEY="re_JgqiiJdh_5SBPNDVZEmK5acfWdp2kLm8M"
FROM_EMAIL="noreply@windshieldadvisor.info"

# App
NEXT_PUBLIC_APP_URL="https://windshieldadvisor.info"
```

## 5. Run Database Migrations

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push
```

You should see:
```
✔ Generated Prisma Client
Your database is now in sync with your Prisma schema.
```

## 6. Verify Tables Created

1. Go to Supabase Dashboard → **Table Editor**
2. You should see these tables:
   - `QuizSession`
   - `PhoneClick`
   - `EmailCapture`
   - `LeadTrackingEvent`
   - `AnalyticsSummary`

## 7. Enable Row Level Security (RLS)

For each table:
1. Go to **Authentication** → **Policies**
2. Click on table name
3. Click "Enable RLS"
4. Add policies:

**For QuizSession, PhoneClick, EmailCapture, LeadTrackingEvent**:
- Policy: "Allow anonymous inserts"
- Operation: INSERT
- Using expression: `true`
- With check: `true`

**For AnalyticsSummary**:
- Policy: "Allow service role full access"
- Operation: ALL
- Using expression: `auth.role() = 'service_role'`

## 8. Test Database Connection

```bash
# Open Prisma Studio to view data
npm run db:studio
```

Browser should open at `http://localhost:5555` showing your database tables.

## 9. Deploy Environment Variables to Vercel

```bash
# Using Vercel CLI
vercel env add DATABASE_URL
# Paste your DATABASE_URL when prompted

vercel env add DIRECT_URL
# Paste your DIRECT_URL when prompted

vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste your SUPABASE_URL when prompted

# Repeat for all environment variables
```

Or via Vercel Dashboard:
1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add each variable

## 10. Redeploy to Vercel

```bash
vercel --prod
```

## Database Schema Overview

### QuizSession
Stores user quiz progress and results.

**Key fields**:
- `quizId`, `quizSlug` - Which quiz
- `answers` - Array of user answers (JSON)
- `result` - Final quiz result (JSON)
- `severity` - critical/caution/info
- `startedAt`, `completedAt` - Timing

### PhoneClick
Tracks every phone number click.

**Key fields**:
- `location` - Where clicked (quiz-results, white-paper, etc.)
- `quizId`, `quizSlug` - Context from quiz
- `severity` - Result severity that led to click
- `phoneNumber` - Number clicked (971-317-8376)

### EmailCapture
Email signups for quiz results.

**Key fields**:
- `email` - User email
- `quizId`, `resultSeverity` - Context
- `emailSent`, `emailSentAt` - Delivery status
- `resendEmailId` - Resend API ID

### LeadTrackingEvent
Custom analytics events.

**Key fields**:
- `event` - Event name (phone_click, quiz_started, etc.)
- `properties` - Custom properties (JSON)
- `quizId`, `page` - Context

### AnalyticsSummary
Daily aggregated metrics for dashboards.

**Auto-calculated**:
- Completion rates
- Conversion rates
- Quiz performance breakdown

## Troubleshooting

### "Can't reach database server"
- Check DATABASE_URL is correct
- Verify database password has special characters escaped
- Try DIRECT_URL for migrations

### "Schema drift detected"
```bash
npm run db:push
```

### "Table already exists"
Tables were created but Prisma client not generated:
```bash
npm run db:generate
```

### Need to reset database?
⚠️ **This deletes all data!**
```bash
npx prisma db push --force-reset
```

## Next Steps

After Supabase is set up:
1. ✅ Database ready for quiz sessions
2. ✅ Phone click tracking ready
3. ✅ Email capture ready
4. 🔲 Set up Sanity for white papers
5. 🔲 Deploy to production

---

**Created**: October 21, 2025
**Project**: Windshield Advisor
