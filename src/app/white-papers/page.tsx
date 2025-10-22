import Link from 'next/link';
import { getWhitePapers } from '@/lib/sanity';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Windshield Safety Research & White Papers',
  description: 'Comprehensive research papers on windshield safety, ADAS calibration, and installer qualifications from industry experts.',
  keywords: ['windshield research', 'ADAS calibration', 'windshield safety', 'auto glass white papers'],
  openGraph: {
    title: 'Windshield Safety Research & White Papers',
    description: 'Evidence-based research to help you make informed decisions about windshield safety.',
    type: 'website',
  },
};

export const revalidate = 3600; // Revalidate every hour

export default async function WhitePapersPage() {
  const whitePapers = await getWhitePapers();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-safety-blue-900 to-safety-blue-800 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Windshield Safety Research
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Evidence-based research from industry experts to help you make informed decisions about windshield safety
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-12">
        {whitePapers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No published research papers yet. Check back soon!</p>
          </div>
        ) : (
          <section>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whitePapers.map((paper: any) => (
                <Link
                  key={paper._id}
                  href={`/white-papers/${paper.slug.current}`}
                  className="block bg-white rounded-lg shadow-lg hover:shadow-xl p-6 md:p-8 border-2 border-transparent hover:border-safety-blue-800 transition-all group"
                >
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-block bg-safety-blue-100 text-safety-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {paper.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-safety-blue-800 transition-colors">
                    {paper.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {paper.excerpt || paper.summary}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{paper.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{paper.readTime} min read</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-safety-blue-800 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                      Read Research Paper
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Quiz CTA */}
        <section className="mt-12 bg-gradient-to-r from-safety-blue-100 to-blue-50 border-2 border-safety-blue-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Test Your Knowledge
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Take our interactive quizzes to assess your understanding and get personalized recommendations
          </p>
          <Link
            href="/quizzes"
            className="inline-block bg-safety-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-safety-blue-900 transition-all hover:scale-105"
          >
            Browse Quizzes →
          </Link>
        </section>
      </div>
    </div>
  );
}
