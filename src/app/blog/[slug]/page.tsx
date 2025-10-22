import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sanityClient } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  content: any[];
  author: {
    name: string;
    credentials?: string;
  };
  readTime: number;
  publishedAt: string;
  category: string;
  tags?: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    focusKeyword: string;
  };
  parentWhitepaper?: {
    _id: string;
    title: string;
    slug: { current: string };
  };
  keyTakeaways?: string[];
  relatedQuestions?: string[];
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "blog" && slug.current == $slug && defined(publishedAt)][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    author,
    readTime,
    publishedAt,
    category,
    tags,
    seo,
    parentWhitepaper->{
      _id,
      title,
      slug
    },
    keyTakeaways,
    relatedQuestions
  }`;

  return sanityClient.fetch(query, { slug });
}

async function getRelatedPosts(blogId: string, category: string) {
  const query = `*[_type == "blog" && defined(publishedAt) && category == $category && _id != $blogId] {
    _id,
    title,
    slug,
    excerpt,
    readTime
  } | order(publishedAt desc) [0...3]`;

  return sanityClient.fetch(query, { blogId, category });
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: post.seo.metaTitle || post.title,
    description: post.seo.metaDescription || post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post._id, post.category);

  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/50 border-b border-blue-500/20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-4 flex items-center gap-2 text-sm">
            <Link href="/blog" className="text-blue-400 hover:text-blue-300">
              ← Back to Blog
            </Link>
            {post.parentWhitepaper && (
              <>
                <span className="text-slate-600">|</span>
                <Link
                  href={`/white-papers/${post.parentWhitepaper.slug.current}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  📄 Read the full white paper
                </Link>
              </>
            )}
          </div>

          <div className="mb-6">
            <span className="inline-block bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/20">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-blue-200 mb-6">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <div>By {post.author.name}</div>
            {post.author.credentials && (
              <div className="text-blue-400">{post.author.credentials}</div>
            )}
            <div>•</div>
            <div>{post.readTime} min read</div>
            <div>•</div>
            <div>{new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-slate-800/50 text-slate-300 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Parent White Paper Link */}
      {post.parentWhitepaper && (
        <section className="bg-blue-500/5 border-b border-blue-500/10">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-start gap-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-3xl">📄</div>
              <div className="flex-1">
                <div className="text-sm text-blue-400 mb-1">Based on the white paper:</div>
                <Link
                  href={`/white-papers/${post.parentWhitepaper.slug.current}`}
                  className="text-lg font-semibold text-white hover:text-blue-300 transition-colors"
                >
                  {post.parentWhitepaper.title} →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Key Takeaways */}
      {post.keyTakeaways && post.keyTakeaways.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">Key Takeaways</h2>
            <ul className="space-y-3">
              {post.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-200">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-invert prose-lg max-w-none">
          <PortableText value={post.content} />
        </div>
      </div>

      {/* CTA Section - Call Vero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 border-y border-blue-500/20">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Professional Service?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Call Vero Autoglass - AGSC & ADAS Certified Technicians
          </p>
          <a
            href="tel:971-317-8376"
            className="inline-block text-5xl md:text-6xl font-bold text-white hover:text-blue-200 transition-colors"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).plausible) {
                (window as any).plausible('Phone Click', {
                  props: {
                    location: 'blog-cta',
                    blog: post.slug.current
                  }
                });
              }
            }}
          >
            971-317-8376
          </a>
          <p className="text-blue-100 mt-4">Portland Metro • Mobile Service Available</p>
        </div>
      </section>

      {/* Related Questions */}
      {post.relatedQuestions && post.relatedQuestions.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-12 bg-slate-800/30 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Related Questions</h2>
          <div className="space-y-3">
            {post.relatedQuestions.map((question, index) => (
              <div key={index} className="flex items-start gap-3 text-slate-200">
                <span className="text-blue-400">Q:</span>
                <span>{question}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Blog Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost: any) => (
              <Link
                key={relatedPost._id}
                href={`/blog/${relatedPost.slug.current}`}
                className="bg-slate-800/50 rounded-lg p-6 border border-blue-500/10 hover:border-blue-500/30 transition-colors"
              >
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                  {relatedPost.title}
                </h3>
                {relatedPost.excerpt && (
                  <p className="text-slate-300 mb-4 line-clamp-2 text-sm">
                    {relatedPost.excerpt}
                  </p>
                )}
                <div className="text-sm text-blue-400">{relatedPost.readTime} min read →</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            author: {
              '@type': 'Person',
              name: post.author.name,
            },
            datePublished: post.publishedAt,
            keywords: post.tags?.join(', '),
          }),
        }}
      />
    </article>
  );
}
