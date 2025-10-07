# Content Structure

This directory contains all white papers, blog posts, and related educational content for windshieldadvisor.info.

## Directory Structure

```
content/
├── white-papers/           # Pillar content (10 planned)
│   ├── adas-calibration-mandatory.json
│   ├── oem-vs-aftermarket.json (planned)
│   ├── repair-vs-replace.json (planned)
│   └── ...
│
├── blog-posts/            # Supporting content (40 planned, 4 per white paper)
│   ├── what-is-adas.json (planned)
│   ├── adas-calibration-cost.json (planned)
│   └── ...
│
└── README.md              # This file
```

## White Paper Priority Order

As defined in the original brief:

1. **ADAS Calibration** ✅ (completed)
2. **OEM vs Aftermarket** (planned)
3. **Repair vs Replace** (planned)
4. **Choosing Installer** (planned)
5-10. (To be determined)

## Content JSON Schema

### White Paper Structure

```typescript
{
  // Identifiers
  id: string;
  slug: string;
  type: "white_paper";
  status: "draft" | "published" | "archived";
  priority: number;
  featured: boolean;

  // Content
  title: string;
  subtitle: string;
  excerpt: string;
  abstract: string;

  // Author & Publishing
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  updatedAt: string;
  readTime: number;

  // Categorization
  category: string;
  tags: string[];

  // SEO
  seo: {
    metaTitle: string;
    metaDescription: string;
    focusKeyword: string;
    canonicalUrl: string;
  };

  // Structure
  tableOfContents: TOCItem[];
  content: {
    sections: Section[];
    conclusion: string;
    keyTakeaways: string[];
  };

  // Related
  faqs: FAQ[];
  relatedQuizzes: string[];
  relatedContent: string[];
  supportingBlogPosts: string[];
  references: Reference[];

  // CTA
  cta: {
    text: string;
    url: string;
    secondary?: {
      text: string;
      url: string;
    };
  };
}
```

### Content Section Structure

```typescript
{
  id: string;              // For anchor links
  title: string;
  content: string;         // Markdown/HTML supported
  callouts?: [             // Optional callout boxes
    {
      type: "info" | "warning" | "danger" | "success" | "stat" | "case-study" | "legal" | "tip";
      title?: string;
      content: string;
    }
  ];
  image?: {
    url: string;
    alt: string;
    caption?: string;
  };
}
```

### Callout Types

Different callout types for visual variety:

- **info** (blue): Educational information, pro tips
- **warning** (yellow): Important notices, caution
- **danger** (red): Critical safety warnings
- **success** (green): Positive information, best practices
- **stat** (gradient): Data callouts, statistics
- **case-study** (neutral): Real-world examples
- **legal** (gray): Legal information, liability
- **tip** (green): Helpful hints

## Adding a New White Paper

1. **Create JSON file** in `white-papers/` directory
2. **Follow the schema** documented above
3. **Add to index.ts** exports
4. **Create 4 supporting blog posts** (see blog post schema)
5. **Update related quizzes** to reference the white paper

### Example: Adding "OEM vs Aftermarket"

```json
// white-papers/oem-vs-aftermarket.json
{
  "id": "oem-vs-aftermarket",
  "slug": "oem-vs-aftermarket",
  "priority": 2,
  "title": "OEM vs Aftermarket Windshield Glass...",
  // ... rest of content
}
```

```typescript
// white-papers/index.ts
import oemVsAftermarket from './oem-vs-aftermarket.json';

export const allWhitePapers = [
  adasCalibrationMandatory,
  oemVsAftermarket, // Add here
];
```

## Supporting Blog Posts

Each white paper should have 4 supporting blog posts that dive deeper into specific topics.

### Example: ADAS Calibration White Paper

Supporting posts:
1. `what-is-adas.json` - Introductory overview
2. `adas-calibration-cost.json` - Cost breakdown
3. `do-i-need-adas-calibration.json` - Decision guide
4. `adas-failure-signs.json` - Troubleshooting

## SEO Best Practices

### Meta Title Format
```
[Topic]: [Benefit] | Windshield Advisor
```
Max 60 characters

### Meta Description Format
```
[Problem statement]. [Solution/benefit]. [Authority/credibility].
```
Max 160 characters

### Focus Keywords
- Use exact match in title
- Include in first 100 words
- Use naturally throughout content
- Include in at least one H2 heading

## Content Writing Guidelines

### Tone
- **Authoritative** but accessible
- **Research-backed** with citations
- **Safety-focused** without being alarmist
- **Technical depth** that builds trust
- **Clear CTAs** without being pushy

### Structure
1. **Abstract** - TL;DR of entire paper
2. **Introduction** - Why this matters
3. **Body Sections** - Deep dive with evidence
4. **Conclusion** - Reinforce key points
5. **Key Takeaways** - Bullet summary
6. **FAQs** - Common questions
7. **CTAs** - Next actions

### Formatting
- **Bold** for emphasis
- Use **bullet lists** for scanability
- Include **callout boxes** for important info
- **Cite sources** with reference numbers
- Keep paragraphs **short** (3-4 sentences)

## References

All citations should be included in the `references` array:

```json
{
  "id": 92,
  "title": "Functionality of AEB Systems",
  "source": "IIHS and NHTSA documentation",
  "url": "https://example.com/study",
  "year": 2023
}
```

Reference in text using the ID: `(92)` or `[92]`

## FAQs

Include 5-8 FAQs per white paper:

```json
{
  "question": "Does my car need ADAS calibration?",
  "answer": "If your vehicle has advanced safety features..."
}
```

FAQs should:
- Answer real user questions
- Be 2-3 sentences max
- Use schema markup (implemented in component)
- Link to related content where helpful

## Related Content Linking

### relatedQuizzes
Link to quiz slugs that complement the white paper:
```json
"relatedQuizzes": ["adas-calibration", "windshield-safety"]
```

### relatedContent
Link to other white paper slugs:
```json
"relatedContent": ["choosing-installer", "oem-vs-aftermarket"]
```

### supportingBlogPosts
Link to blog post slugs (4 per white paper):
```json
"supportingBlogPosts": [
  "what-is-adas",
  "adas-calibration-cost",
  "do-i-need-calibration",
  "adas-failure-signs"
]
```

## Content Publishing Workflow

1. **Draft** - Create JSON with `"status": "draft"`
2. **Review** - Check content, SEO, links
3. **Publish** - Change to `"status": "published"`
4. **Promote** - Share on social, link from other content
5. **Update** - Revise as needed, update `updatedAt`

## Analytics Tracking

Optional fields for future analytics integration:

```json
{
  "viewCount": 0,
  "avgTimeOnPage": 0
}
```

These can be updated via API/admin dashboard.

## Image Guidelines

When adding images to sections:

```json
{
  "image": {
    "url": "/images/white-papers/adas-camera-diagram.jpg",
    "alt": "Diagram showing ADAS camera placement on windshield",
    "caption": "Figure 1: Forward-facing camera position"
  }
}
```

- Store images in `/public/images/white-papers/`
- Use WebP format for performance
- Include descriptive alt text
- Optional captions for context

## Testing Checklist

Before publishing a white paper:

- [ ] All links work (internal and external)
- [ ] References are accurate and numbered correctly
- [ ] Table of contents matches actual sections
- [ ] SEO meta fields are complete
- [ ] Related quizzes exist
- [ ] Supporting blog posts are planned/created
- [ ] FAQs use natural language
- [ ] Callouts are used effectively
- [ ] Key takeaways summarize main points
- [ ] CTA is relevant and actionable
- [ ] Read time is accurate (word count / 200)
- [ ] Mobile formatting tested
- [ ] Accessibility tested (headings, alt text)

---

## Current Status

**White Papers**: 1 of 10 completed
- ✅ ADAS Calibration Mandatory (Priority 1)
- ⏸️ OEM vs Aftermarket (Priority 2)
- ⏸️ Repair vs Replace (Priority 3)
- ⏸️ Choosing Installer (Priority 4)
- ⏸️ 6 more to be defined

**Blog Posts**: 0 of 40 completed
- ⏸️ 4 supporting posts for ADAS Calibration paper

---

**Maintained by Windshield Advisor Content Team**
