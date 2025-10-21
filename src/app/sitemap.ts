import { MetadataRoute } from 'next';
import { sanityClient } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://windshieldadvisor.info';

  // Fetch all published white papers
  const whitepapers = await sanityClient.fetch(`
    *[_type == "whitepaper"] {
      "slug": slug.current,
      "updatedAt": _updatedAt,
      publishedAt
    }
  `);

  // Fetch all published blog posts
  const blogs = await sanityClient.fetch(`
    *[_type == "blog"] {
      "slug": slug.current,
      "updatedAt": _updatedAt,
      publishedAt
    }
  `);

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/white-papers`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/quiz/adas-calibration`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quiz/repair-vs-replace`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quiz/oem-vs-aftermarket`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // White paper pages
  const whitepaperPages = whitepapers.map((wp: any) => ({
    url: `${baseUrl}/white-papers/${wp.slug}`,
    lastModified: new Date(wp.updatedAt || wp.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Blog pages
  const blogPages = blogs.map((blog: any) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...whitepaperPages, ...blogPages];
}
