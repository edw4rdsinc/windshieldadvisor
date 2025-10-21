import { createClient } from '@sanity/client';

// Sanity client configuration
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '23d5d36h',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-10-21',
});

// Helper to fetch all white papers
export async function getWhitePapers() {
  return sanityClient.fetch(`
    *[_type == "whitepaper"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      subtitle,
      excerpt,
      summary,
      author,
      readTime,
      publishedAt,
      category,
      keywords,
      seo,
      sections[] {
        id,
        title,
        content,
        callouts[] {
          type,
          title,
          content
        }
      },
      conclusion,
      keyTakeaways,
      faqs[] {
        question,
        answer
      },
      references[] {
        number,
        text,
        url
      }
    }
  `);
}

// Helper to fetch a single white paper by slug
export async function getWhitePaper(slug: string) {
  return sanityClient.fetch(
    `
    *[_type == "whitepaper" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      subtitle,
      excerpt,
      summary,
      author,
      readTime,
      publishedAt,
      category,
      keywords,
      seo,
      sections[] {
        id,
        title,
        content,
        callouts[] {
          type,
          title,
          content
        }
      },
      conclusion,
      keyTakeaways,
      faqs[] {
        question,
        answer
      },
      references[] {
        number,
        text,
        url
      }
    }
  `,
    { slug }
  );
}

// Helper to fetch blog posts
export async function getBlogPosts() {
  return sanityClient.fetch(`
    *[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      category,
      keywords
    }
  `);
}
