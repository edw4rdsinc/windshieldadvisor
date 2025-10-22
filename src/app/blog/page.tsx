import { Metadata } from 'next';
import Link from 'next/link';
import { sanityClient } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Windshield Safety Blog | Expert Insights & Guides',
  description: 'Expert articles on windshield safety, ADAS calibration, maintenance, and auto glass technology. Stay informed with research-backed insights.',
  keywords: ['windshield blog', 'ADAS blog', 'auto glass tips', 'windshield safety articles'],
  openGraph: {
    title: 'Windshield Safety Blog | Expert Insights & Guides',
    description: 'Expert articles on windshield safety, ADAS calibration, and auto glass technology.',
    type: 'website',
  },
};

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt: string;
  category: string;
  tags?: string[];
  readTime: number;
  author: {
    name: string;
    credentials?: string;
  };
  parentWhitePaper?: {
    title: string;
    slug: { current: string };
  };
}

async function getAllBlogs(): Promise<BlogPost[]> {
  const now = new Date().toISOString();
  const query = `*[_type == "blog" && defined(publishedAt) && publishedAt <= $now] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category,
    tags,
    readTime,
    author,
    "parentWhitePaper": parentWhitePaper->{
      title,
      slug
    }
  }`;

  return sanityClient.fetch(query, { now });
}

async function getFeaturedBlogs(): Promise<BlogPost[]> {
  const now = new Date().toISOString();
  const query = `*[_type == "blog" && defined(publishedAt) && publishedAt <= $now] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category,
    tags,
    readTime,
    author,
    "parentWhitePaper": parentWhitePaper->{
      title,
      slug
    }
  }`;

  return sanityClient.fetch(query, { now });
}

async function getBlogsByCategory(): Promise<Record<string, BlogPost[]>> {
  const blogs = await getAllBlogs();

  const categorized: Record<string, BlogPost[]> = {};

  blogs.forEach(blog => {
    if (!categorized[blog.category]) {
      categorized[blog.category] = [];
    }
    categorized[blog.category].push(blog);
  });

  return categorized;
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'safety': 'bg-red-100 text-red-800',
    'technology': 'bg-blue-100 text-blue-800',
    'maintenance': 'bg-green-100 text-green-800',
    'insurance': 'bg-purple-100 text-purple-800',
    'adas': 'bg-orange-100 text-orange-800',
    'repair': 'bg-yellow-100 text-yellow-800',
  };

  return colors[category.toLowerCase()] || 'bg-gray-100 text-gray-800';
}

export default async function BlogIndexPage() {
  const featuredBlogs = await getFeaturedBlogs();
  const blogsByCategory = await getBlogsByCategory();
  const categories = Object.keys(blogsByCategory).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Windshield Safety Blog
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Expert insights on windshield safety, ADAS technology, maintenance, and auto glass care
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-12">
        {/* Featured Posts */}
        {featuredBlogs.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Latest Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredBlogs.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
                >
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {post.author?.name && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>{post.author.name}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="text-xs text-gray-400 mt-2">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>

                    {/* Parent White Paper Link */}
                    {post.parentWhitePaper && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="text-xs text-gray-500 mb-1">Based on:</div>
                        <div className="text-sm text-blue-600 font-medium line-clamp-1">
                          📄 {post.parentWhitePaper.title}
                        </div>
                      </div>
                    )}

                    {/* Read More */}
                    <div className="mt-4">
                      <span className="text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                        Read Article
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Browse by Category */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Browse by Category
          </h2>

          {categories.map((category) => (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-2xl font-bold text-gray-900 capitalize">
                  {category}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(category)}`}>
                  {blogsByCategory[category].length} {blogsByCategory[category].length === 1 ? 'article' : 'articles'}
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogsByCategory[category].slice(0, 6).map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug.current}`}
                    className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border-2 border-transparent hover:border-blue-500 group"
                  >
                    {/* Title */}
                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h4>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{post.readTime} min read</span>
                      <span>•</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>

              {blogsByCategory[category].length > 6 && (
                <div className="mt-4 text-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    + {blogsByCategory[category].length - 6} more {category} articles
                  </span>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-4">
            Need Expert Windshield Service?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Call Vero Autoglass - AGSC & ADAS Certified Technicians
          </p>
          <a
            href="tel:971-317-8376"
            className="inline-block text-5xl md:text-6xl font-bold text-white hover:text-blue-200 transition-colors"
          >
            971-317-8376
          </a>
          <p className="text-blue-100 mt-4">Portland Metro • Mobile Service Available</p>
        </section>
      </div>
    </div>
  );
}
