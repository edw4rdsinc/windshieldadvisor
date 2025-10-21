# Sanity Studio Access Guide

**Status**: ✅ Studio embedded in Next.js app
**Access**: After deployment, visit `/studio`

---

## How to Access Your Content

### After Deploying to Vercel

1. **Visit your studio**:
   - Production: `https://windshieldadvisor.info/studio`
   - Or: `https://your-vercel-url.vercel.app/studio`

2. **Log in with Sanity**:
   - Use your Sanity account credentials
   - The same account that created the project

3. **View your content**:
   - **White Papers** (9 documents) - Click "White Paper" in left sidebar
   - **Blog Posts** (36 documents) - Click "Blog Post" in left sidebar

---

## Local Development

To test the studio locally before deploying:

```bash
cd /home/sam/Documents/github-repos/windshieldadvisor/windshieldadvisor
npm run dev

# Then visit:
# http://localhost:3000/studio
```

---

## What You'll See

When you open the Studio, you'll see:

### Left Sidebar
- **📄 White Paper** (9 items)
  - Mandatory ADAS Calibration
  - OEM vs Aftermarket Windshields
  - Temperature & Adhesive Curing
  - Windshield Warranties & Insurance
  - Repair vs Replacement
  - Windshield Care & Maintenance
  - Laminated Glass Science
  - Circular Economy & Recycling
  - Future of Windshield Technology

- **📝 Blog Post** (36 items)
  - Week 1: 4 ADAS posts
  - Week 2: 4 OEM/Aftermarket posts
  - Week 3: 4 Warranty/Insurance posts
  - ... (9 weeks total)

### Content Features
- ✅ Rich text editor for content
- ✅ Schedule publish dates
- ✅ Set categories and tags
- ✅ Link blog posts to parent white papers
- ✅ Add FAQs, sections, keywords

---

## Publishing Content

### To Publish Week 1 Content (Oct 21):

1. Open Studio: `/studio`
2. Click "White Paper" in sidebar
3. Find "Mandatory ADAS Calibration"
4. Verify `publishedAt` is set to Oct 21, 2025 (or earlier)
5. Click "Publish" (if not already published)
6. Repeat for the 4 ADAS blog posts

**Content is already scheduled** - it will automatically show on the website based on `publishedAt` date!

---

## Studio Files Created

```
windshieldadvisor/
├── sanity.config.ts              # Studio configuration
├── src/app/studio/
│   └── [[...tool]]/
│       ├── page.tsx              # Studio route
│       └── loading.tsx           # Loading state
└── package.json                  # Added: sanity, next-sanity, @sanity/vision
```

---

## Troubleshooting

### "Unable to load studio"
- Make sure you're accessing via the deployed URL (not Sanity's dashboard)
- Clear browser cache and refresh

### "Not authorized"
- Make sure you're logged into Sanity
- Check that your account has access to project ID: `23d5d36h`

### Content not showing on website
- Check that `publishedAt` date is in the past
- Verify you're viewing the correct dataset (`production`)
- Redeploy if you just published content

---

## Deployment Checklist

✅ Sanity Studio embedded at `/studio`
✅ Build passes with 0 errors
✅ Schema includes White Paper and Blog types
✅ All 45 pieces of content exist in Sanity

**Next step**: Deploy to Vercel, then visit `/studio` to manage content!

---

## Quick Commands

```bash
# Start dev server (local testing)
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

After deploying, immediately test: `https://your-domain.com/studio`
