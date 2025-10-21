import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sanityClient } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

interface WhitePaper {
  _id: string;
  title: string;
  slug: { current: string };
  subtitle?: string;
  excerpt?: string;
  summary: string;
  author: {
    name: string;
    credentials?: string;
  };
  readTime: number;
  publishedAt: string;
  category: string;
  keywords: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    focusKeyword: string;
  };
  sections: Array<{
    _key: string;
    heading: string;
    content: any[];
    callouts?: Array<{
      type: 'warning' | 'tip' | 'important';
      text: string;
    }>;
  }>;
  conclusion: any[];
  keyTakeaways: string[];
  faqs?: Array<{
    question: string;
    answer: any[];
  }>;
  references?: Array<{
    text: string;
    url?: string;
  }>;
  aiSearchQuestions?: string[];
  quickFacts?: Array<{
    fact: string;
    citation?: string;
  }>;
}

async function getWhitePaper(slug: string): Promise<WhitePaper | null> {
  const query = `*[_type == "whitepaper" && slug.current == $slug][0] {
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
    sections[]{
      _key,
      heading,
      content,
      callouts[]
    },
    conclusion,
    keyTakeaways,
    faqs[],
    references[],
    aiSearchQuestions,
    quickFacts[]
  }`;

  return sanityClient.fetch(query, { slug });
}

async function getRelatedBlogs(whitePaperId: string) {
  const query = `*[_type == "blog" && references($whitePaperId)] {
    _id,
    title,
    slug,
    excerpt,
    readTime
  } | order(publishedAt desc) [0...4]`;

  return sanityClient.fetch(query, { whitePaperId });
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const whitepaper = await getWhitePaper(params.slug);

  if (!whitepaper) {
    return {
      title: 'White Paper Not Found',
    };
  }

  return {
    title: whitepaper.seo.metaTitle || whitepaper.title,
    description: whitepaper.seo.metaDescription || whitepaper.summary,
    keywords: whitepaper.keywords,
    openGraph: {
      title: whitepaper.title,
      description: whitepaper.summary,
      type: 'article',
      publishedTime: whitepaper.publishedAt,
    },
  };
}

export default async function WhitePaperPage({ params }: { params: { slug: string } }) {
  const whitepaper = await getWhitePaper(params.slug);

  if (!whitepaper) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(whitepaper._id);

  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/50 border-b border-blue-500/20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-4">
            <Link href="/white-papers" className="text-blue-400 hover:text-blue-300 text-sm">
              ← Back to White Papers
            </Link>
          </div>

          <div className="mb-6">
            <span className="inline-block bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/20">
              {whitepaper.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {whitepaper.title}
          </h1>

          {whitepaper.subtitle && (
            <p className="text-xl text-blue-200 mb-6">
              {whitepaper.subtitle}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <div>By {whitepaper.author.name}</div>
            {whitepaper.author.credentials && (
              <div className="text-blue-400">{whitepaper.author.credentials}</div>
            )}
            <div>•</div>
            <div>{whitepaper.readTime} min read</div>
            <div>•</div>
            <div>{new Date(whitepaper.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</div>
          </div>
        </div>
      </header>

      {/* Summary/Excerpt */}
      <section className="bg-blue-500/5 border-y border-blue-500/10">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-slate-200 leading-relaxed">
              {whitepaper.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      {whitepaper.keyTakeaways && whitepaper.keyTakeaways.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">Key Takeaways</h2>
            <ul className="space-y-3">
              {whitepaper.keyTakeaways.map((takeaway, index) => (
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
        {whitepaper.sections.map((section) => (
          <section key={section._key} className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              {section.heading}
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <PortableText value={section.content} />
            </div>

            {section.callouts && section.callouts.length > 0 && (
              <div className="mt-6 space-y-4">
                {section.callouts.map((callout, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border ${
                      callout.type === 'warning'
                        ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-200'
                        : callout.type === 'important'
                        ? 'bg-red-500/10 border-red-500/20 text-red-200'
                        : 'bg-blue-500/10 border-blue-500/20 text-blue-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg">
                        {callout.type === 'warning' ? '⚠️' : callout.type === 'important' ? '🚨' : '💡'}
                      </span>
                      <p className="flex-1">{callout.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Conclusion */}
        {whitepaper.conclusion && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Conclusion</h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <PortableText value={whitepaper.conclusion} />
            </div>
          </section>
        )}
      </div>

      {/* CTA Section - Call Vero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 border-y border-blue-500/20">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Professional Windshield Service?
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
                    location: 'whitepaper-cta',
                    whitepaper: whitepaper.slug.current
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

      {/* FAQs */}
      {whitepaper.faqs && whitepaper.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {whitepaper.faqs.map((faq, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg p-6 border border-blue-500/10">
                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                <div className="prose prose-invert prose-lg max-w-none">
                  <PortableText value={faq.answer} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Blog Posts */}
      {relatedBlogs && relatedBlogs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedBlogs.map((blog: any) => (
              <Link
                key={blog._id}
                href={`/blog/${blog.slug.current}`}
                className="bg-slate-800/50 rounded-lg p-6 border border-blue-500/10 hover:border-blue-500/30 transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-2">{blog.title}</h3>
                {blog.excerpt && (
                  <p className="text-slate-300 mb-4 line-clamp-2">{blog.excerpt}</p>
                )}
                <div className="text-sm text-blue-400">{blog.readTime} min read →</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {whitepaper.references && whitepaper.references.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-12 border-t border-blue-500/10">
          <h2 className="text-2xl font-bold text-white mb-6">References & Citations</h2>
          <ol className="space-y-2 text-sm text-slate-400">
            {whitepaper.references.map((ref, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-blue-400">[{index + 1}]</span>
                {ref.url ? (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    {ref.text}
                  </a>
                ) : (
                  <span>{ref.text}</span>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: whitepaper.title,
            description: whitepaper.summary,
            author: {
              '@type': 'Person',
              name: whitepaper.author.name,
            },
            datePublished: whitepaper.publishedAt,
            keywords: whitepaper.keywords.join(', '),
          }),
        }}
      />
    </article>
  );
}
