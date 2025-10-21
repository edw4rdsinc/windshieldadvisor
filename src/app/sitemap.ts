import { MetadataRoute } from 'next';
import { sanityClient } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://windshieldadvisor.info';
  const now = new Date().toISOString();

  // Fetch all published white papers (only those with publishedAt <= now)
  const whitepapers = await sanityClient.fetch(`
    *[_type == "whitepaper" && publishedAt <= $now] {
      "slug": slug.current,
      "updatedAt": _updatedAt,
      publishedAt
    }
  `, { now });

  // Fetch all published blog posts (only those with publishedAt <= now)
  const blogs = await sanityClient.fetch(`
    *[_type == "blog" && publishedAt <= $now] {
      "slug": slug.current,
      "updatedAt": _updatedAt,
      publishedAt
    }
  `, { now });

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/safety-guides`,
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
      url: `${baseUrl}/quizzes`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/quizzes/windshield-safety`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quizzes/adas-calibration`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quizzes/repair-replace`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quizzes/installer-qualified`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quizzes/oem-vs-aftermarket`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // White paper pages (use /safety-guides/ route)
  const whitepaperPages = whitepapers.map((wp: any) => ({
    url: `${baseUrl}/safety-guides/${wp.slug}`,
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
