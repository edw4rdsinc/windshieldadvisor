# LAUNCH TODAY - Action Plan

**Target**: Go live in 6-8 hours
**Status**: IN PROGRESS

---

## What I Need From You

### 1. Supabase Credentials (5 minutes)

Go to https://supabase.com/dashboard and get these:

```bash
# From Settings → API
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."

# From Settings → API
SUPABASE_SERVICE_ROLE_KEY="eyJ..."

# From Settings → Database → Connection pooler → Transaction mode
DATABASE_URL="postgresql://postgres.xxx:PASSWORD@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# From Settings → Database → Connection string → URI
DIRECT_URL="postgresql://postgres.xxx:PASSWORD@db.xxx.supabase.co:5432/postgres"
```

**Paste these in Slack/chat when ready and I'll update .env.local**

---

## What I'm Doing Now (No Input Needed)

✅ Publishing Week 1 content in Sanity
✅ Building white paper display pages
✅ Building blog display pages
✅ Creating sitemap.xml
✅ Creating robots.txt
✅ Building basic email sending
✅ Setting up Plausible goal tracking

---

## Launch Checklist

### Phase 1: Content (IN PROGRESS - I'm doing this now)
- [ ] Publish ADAS white paper
- [ ] Publish 4 ADAS blog posts
- [ ] Verify content is accessible in Sanity

### Phase 2: Website Pages (NEXT - I'll build these)
- [ ] Create `/white-papers/[slug]` page
- [ ] Create `/blog/[slug]` page
- [ ] Update homepage with featured content
- [ ] Create white papers index page

### Phase 3: Database (WAITING FOR YOUR CREDENTIALS)
- [ ] Update .env.local with your Supabase credentials
- [ ] Run `npm run db:push` to create tables
- [ ] Verify 5 tables created

### Phase 4: Email (AFTER DATABASE)
- [ ] Create quiz results email template
- [ ] Test email sending with Resend
- [ ] Verify tracking in database

### Phase 5: Deploy (FINAL)
- [ ] Test locally
- [ ] Deploy to Vercel
- [ ] Verify production site
- [ ] Submit to Google Search Console

---

## Minimal Viable Launch

To go live TODAY, we need:

**Must Have**:
✅ Week 1 content published (5 pieces)
✅ White paper display page
✅ Blog display page
✅ Basic SEO (sitemap, robots.txt)
✅ Supabase database
✅ Quiz results email working
✅ Deployed to Vercel

**Can Add Later** (this week):
- Full email sequences
- Homepage redesign
- Blog index page
- Analytics dashboard
- Social media

---

## Timeline (Optimistic)

**Now (12:00 PM)**: I start publishing content & building pages
**12:30 PM**: You provide Supabase credentials
**1:00 PM**: Database setup complete
**2:00 PM**: Email functionality built
**3:00 PM**: Local testing complete
**4:00 PM**: Deploy to Vercel
**5:00 PM**: LIVE! 🚀

---

## What We're Launching With

**Content**:
1. Mandatory ADAS Calibration white paper
2. "Why Uncalibrated ADAS Systems Are a Hidden Danger" blog
3. "7 Dangerous Myths About ADAS Calibration" blog
4. "How to Ensure Your ADAS Systems Work" blog
5. "Choosing the Right ADAS Calibration Service" blog

**Features**:
- White paper detail pages
- Blog post detail pages
- Quiz integration (existing)
- Email capture → quiz results email
- Phone click tracking
- Plausible analytics

**What's NOT included** (adding next week):
- Full white paper library page
- Blog index/archive
- Newsletter
- Social media
- Advanced email sequences

---

## Your Action Items

1. **Now**: Provide Supabase credentials (see top of this file)
2. **1 PM**: Test quiz on staging site
3. **4 PM**: Final review before deploy
4. **5 PM**: Approve go-live

---

## Communication

**I'll update you every hour** with progress.

**If something breaks**: I'll tell you immediately and we'll decide if it's a blocker or can wait.

**If we need to delay**: We can push to tomorrow if needed, but I think we can do this today.

---

**LET'S LAUNCH!** 🚀
