# Sanity CMS Integration

## Overview

Windshield Advisor uses **Sanity CMS** for managing content (white papers, blog posts, videos). This allows for:
- Easy content editing through Sanity Studio
- Structured content with proper schemas
- GraphQL/GROQ queries for flexible data fetching
- Real-time preview and publishing

## Architecture

**Separation of Concerns**:
- **Supabase**: Transactional data (quiz sessions, phone clicks, analytics)
- **Sanity**: Content data (white papers, blog posts, educational content)

## Sanity Project

**Project ID**: `23d5d36h`
**Dataset**: `production`
**Studio**: `/home/sam/studio-windshield-advisor/`

## Content Types

### White Papers
Full-length educational content on windshield safety topics.

**Schema** (`schemaTypes/whitepaper.ts`):
- Basic metadata (title, slug, subtitle, excerpt)
- Author information
- Publishing details (publishedAt, readTime)
- Sections with nested content and callouts
- Conclusion
- Key takeaways
- FAQs
- References
- SEO metadata

### Blog Posts
Shorter, more frequent content derived from white papers.

**Schema** (`schemaTypes/blog.ts`):
- Similar structure to white papers but lighter
- Can reference parent white paper
- Optimized for social sharing

### Categories
Content categorization for both white papers and blog posts.

### Videos
Video content references and metadata.

## Using Sanity in the App

### 1. Installation

```bash
npm install @sanity/client
```

### 2. Client Configuration

**File**: `src/lib/sanity.ts`

```typescript
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: '23d5d36h',
  dataset: 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-10-21',
});
```

### 3. Fetching White Papers

```typescript
import { getWhitePapers, getWhitePaper } from '@/lib/sanity';

// Get all white papers
const whitePapers = await getWhitePapers();

// Get single white paper by slug
const whitePaper = await getWhitePaper('adas-calibration-mandatory');
```

### 4. Example GROQ Queries

```groq
// Get all published white papers
*[_type == "whitepaper"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt
}

// Get white paper with all sections
*[_type == "whitepaper" && slug.current == $slug][0] {
  title,
  sections[] {
    id,
    title,
    content,
    callouts
  },
  faqs,
  references
}
```

## Environment Variables

### Required

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="23d5d36h"
NEXT_PUBLIC_SANITY_DATASET="production"
```

### Vercel Deployment

```bash
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
vercel env add NEXT_PUBLIC_SANITY_DATASET
```

## Content Migration

### Migrating from JSON to Sanity

**Existing JSON**: `src/data/content/white-papers/*.json`

**Migration Process**:
1. Read JSON file
2. Transform to Sanity schema format
3. Use Sanity MCP server to create document
4. Verify in Sanity Studio

**Example** (ADAS Calibration white paper):
```bash
# Already migrated
Document ID: Aw9MlzIyUdmV3ABBZTUlQB
```

## Sanity Studio

### Accessing Studio

```bash
cd /home/sam/studio-windshield-advisor
npm run dev
```

Open: `http://localhost:3333`

### Publishing Workflow

1. **Create Draft**: Write content in Sanity Studio
2. **Preview**: View how it looks in the app
3. **Publish**: Make content live
4. **App Updates**: Next.js ISR automatically updates

## Content Types Reference

### White Paper Structure

```typescript
{
  title: string
  slug: { current: string }
  subtitle: string
  excerpt: string
  summary: string
  author: {
    name: string
    role: string
  }
  readTime: number
  publishedAt: datetime
  category: string
  keywords: string[]
  sections: Array<{
    id: string
    title: string
    content: PortableText[]
    callouts: Array<{
      type: 'info' | 'warning' | 'danger' | 'case-study' | 'legal'
      title: string
      content: string
    }>
  }>
  conclusion: text
  keyTakeaways: string[]
  faqs: Array<{
    question: string
    answer: text
  }>
  references: Array<{
    number: number
    text: text
    url?: url
  }>
  seo: {
    metaTitle: string
    metaDescription: text
  }
}
```

## Best Practices

### 1. Use CDN in Production
The Sanity client automatically uses CDN when `NODE_ENV === 'production'` for faster reads.

### 2. ISR (Incremental Static Regeneration)
Use Next.js ISR to cache content but update when changed:

```typescript
export const revalidate = 3600; // Revalidate every hour
```

### 3. Portable Text Rendering
For rich text content, use `@portabletext/react`:

```bash
npm install @portabletext/react
```

### 4. Image Optimization
Sanity images can be optimized on-the-fly:

```typescript
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source).width(800).format('webp');
}
```

## Content Strategy

### White Paper → Blog Post → Video Flow

1. **White Paper**: Comprehensive research (12-15 min read)
2. **Blog Posts**: 3-5 derivative posts (3-5 min read each)
3. **Videos**: Short explainer videos (1-2 min)
4. **Social**: Snippets and quotes

### Categories

- ADAS Safety
- Glass Quality
- Installation Standards
- Insurance & Coverage
- OEM vs Aftermarket
- Maintenance & Care

## MCP Server Integration

Windshield Advisor uses the **Sanity MCP Server** for programmatic content management.

**Server**: `/home/sam/sanity-mcp-server/`

**Available Tools**:
- `sanity_query`: Execute GROQ queries
- `sanity_create`: Create documents
- `sanity_update`: Update documents
- `sanity_delete`: Delete documents
- `sanity_import_markdown`: Import markdown as white paper

## Troubleshooting

### Can't fetch data
- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
- Verify dataset name is correct
- Check Sanity Studio for published content

### Content not updating
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`
- Check ISR revalidation time

### CORS errors
- Ensure domain is added to Sanity CORS settings
- Check API version matches

## Next Steps

1. ✅ Sanity schema created
2. ✅ ADAS white paper migrated
3. 🔲 Update app pages to fetch from Sanity
4. 🔲 Set up ISR for automatic updates
5. 🔲 Create blog post derivatives
6. 🔲 Set up preview mode for drafts

---

**Created**: October 21, 2025
**Project**: Windshield Advisor
**CMS**: Sanity.io
