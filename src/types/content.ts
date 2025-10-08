/**
 * Content Type Definitions
 *
 * TypeScript types for white papers, blog posts, and related content
 */

export type ContentType = 'white_paper' | 'blog_post';
export type ContentStatus = 'draft' | 'published' | 'archived';

export interface Author {
  name: string;
  role?: string;
  bio?: string;
  avatar?: string;
}

export interface SEO {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
  ogImage?: string;
  twitterCard?: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  children?: TableOfContentsItem[];
}

export interface Callout {
  type: string;
  title?: string;
  content: string;
}

export interface ContentSection {
  id: string;
  title: string;
  content: string;
  callouts?: Callout[];
  image?: {
    url: string;
    alt: string;
    caption?: string;
  };
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Reference {
  id: number;
  title: string;
  source: string;
  url?: string;
  year?: number;
}

export interface CTA {
  text: string;
  url: string;
  secondary?: {
    text: string;
    url: string;
  };
}

export interface WhitePaperContent {
  sections: ContentSection[];
  conclusion: string;
  keyTakeaways: string[];
}

export interface WhitePaper {
  // Identifiers
  id: string;
  slug: string;
  type: string;
  status: string;
  priority: number;
  featured: boolean;

  // Content
  title: string;
  subtitle?: string;
  excerpt: string;
  abstract?: string;

  // Author & Publishing
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readTime: number;

  // Categorization
  category: string;
  tags: string[];

  // SEO
  seo: SEO;

  // Structure
  tableOfContents: TableOfContentsItem[];
  content: WhitePaperContent;

  // Related Content
  faqs: FAQ[];
  relatedQuizzes: string[];
  relatedContent: string[];
  supportingBlogPosts: string[];
  references: Reference[];

  // CTA
  cta: CTA;

  // Analytics (optional, for future use)
  viewCount?: number;
  avgTimeOnPage?: number;
}

export interface BlogPost {
  // Identifiers
  id: string;
  slug: string;
  type: string;
  status: string;
  priority: number;

  // Content
  title: string;
  subtitle?: string;
  excerpt: string;

  // Author & Publishing
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readTime: number;

  // Parent relationship
  parentWhitePaperId: string;

  // Categorization
  category: string;
  tags: string[];

  // SEO
  seo: SEO;

  // Structure
  tableOfContents?: TableOfContentsItem[];
  content: {
    introduction: string;
    quickAnswer?: string;
    sections: ContentSection[];
    conclusion: string;
    keyTakeaways: string[];
  };

  // Related
  faqs?: FAQ[];
  relatedQuizzes?: string[];
  relatedPosts?: string[];
  references?: Reference[];

  // CTA
  cta: CTA;

  // Navigation
  previousPost?: string;
  nextPost?: string;
}

export type Content = WhitePaper | BlogPost;

// Utility types
export type ContentWithType<T extends ContentType> = T extends 'white_paper'
  ? WhitePaper
  : BlogPost;

// Content filters
export interface ContentFilters {
  type?: ContentType;
  status?: ContentStatus;
  category?: string;
  tags?: string[];
  featured?: boolean;
  limit?: number;
  offset?: number;
}

// Content metadata for lists/cards
export interface ContentCard {
  id: string;
  slug: string;
  type: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  publishedAt: string;
  featured?: boolean;
  image?: string;
}
