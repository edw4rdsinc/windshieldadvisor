import Link from 'next/link';
import { getFeaturedWhitePapers, getWhitePapersByPriority } from '@/data/content/white-papers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Windshield Safety Guides | Expert Resources & White Papers',
  description: 'Comprehensive guides on windshield safety, ADAS calibration, repair vs replacement, and installer qualifications from industry experts.',
  keywords: ['windshield safety guide', 'ADAS calibration guide', 'windshield repair guide', 'auto glass safety'],
  openGraph: {
    title: 'Windshield Safety Guides | Expert Resources & White Papers',
    description: 'Evidence-based resources to help you make informed decisions about windshield safety.',
    type: 'website',
  },
};

export default function SafetyGuidesPage() {
  const featuredPapers = getFeaturedWhitePapers();
  const allPapers = getWhitePapersByPriority();
  const otherPapers = allPapers.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-safety-blue-900 to-safety-blue-800 text-white py-12 md:py-16 animate-fade-in-down">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            Windshield Safety Guides
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto animate-fade-in-up animation-delay-100">
            Evidence-based resources from industry experts to help you make informed decisions about windshield safety
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-12">
        {/* Featured White Papers */}
        {featuredPapers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-deep-navy-900 mb-6 animate-fade-in-up">
              Featured Guides
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPapers.map((paper, index) => (
                <Link
                  key={paper.id}
                  href={`/safety-guides/${paper.slug}`}
                  className="block bg-white rounded-lg shadow-card hover:shadow-card-hover p-6 md:p-8 border-2 border-transparent hover:border-safety-blue-800 transition-all group animate-fade-in-up hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-block bg-safety-blue-100 text-safety-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {paper.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-deep-navy-900 mb-3 group-hover:text-safety-blue-800 transition-colors">
                    {paper.title}
                  </h3>

                  {/* Abstract */}
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {paper.content.abstract}
                  </p>

                  {/* Key Findings Preview */}
                  {paper.content.keyFindings && paper.content.keyFindings.length > 0 && (
                    <div className="mb-4 bg-safety-blue-50 rounded-lg p-4">
                      <h4 className="text-sm font-bold text-safety-blue-900 mb-2">Key Findings:</h4>
                      <ul className="space-y-1">
                        {paper.content.keyFindings.slice(0, 2).map((finding, idx) => (
                          <li key={idx} className="text-sm text-safety-blue-800 flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span className="flex-1 line-clamp-1">{finding}</span>
                          </li>
                        ))}
                        {paper.content.keyFindings.length > 2 && (
                          <li className="text-sm text-safety-blue-700 font-semibold">
                            +{paper.content.keyFindings.length - 2} more findings
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

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
                      Read Full Guide
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

        {/* All Guides */}
        <section>
          <h2 className="text-3xl font-bold text-deep-navy-900 mb-6 animate-fade-in-up">
            All Safety Guides
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {otherPapers.map((paper, index) => (
              <Link
                key={paper.id}
                href={`/safety-guides/${paper.slug}`}
                className="block bg-white rounded-lg shadow-card hover:shadow-card-hover p-6 border-2 border-transparent hover:border-safety-blue-800 transition-all group animate-fade-in-up hover:scale-[1.02]"
                style={{ animationDelay: `${(featuredPapers.length + index) * 0.05}s` }}
              >
                {/* Category Badge */}
                <div className="mb-3">
                  <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">
                    {paper.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-deep-navy-900 mb-2 group-hover:text-safety-blue-800 transition-colors">
                  {paper.title}
                </h3>

                {/* Abstract */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {paper.content.abstract}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {paper.author.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {paper.readTime} min
                  </span>
                </div>

                {/* CTA */}
                <span className="text-safety-blue-800 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read Guide →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Topics Section */}
        <section className="mt-16 bg-white rounded-lg shadow-card p-8 md:p-12 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-deep-navy-900 mb-6 text-center">
            What You'll Learn
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-safety-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-safety-blue-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-deep-navy-900 mb-2">
                ADAS Systems
              </h3>
              <p className="text-sm text-gray-600">
                How advanced driver assistance systems work and why calibration is critical
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-orange-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-deep-navy-900 mb-2">
                Repair vs Replace
              </h3>
              <p className="text-sm text-gray-600">
                Evidence-based guidelines for when to repair vs replace your windshield
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-deep-navy-900 mb-2">
                Certifications
              </h3>
              <p className="text-sm text-gray-600">
                Understanding installer qualifications and industry certifications
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warning-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-warning-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-deep-navy-900 mb-2">
                Safety Standards
              </h3>
              <p className="text-sm text-gray-600">
                Federal regulations and industry standards for windshield installation
              </p>
            </div>
          </div>
        </section>

        {/* Quiz CTA */}
        <section className="mt-12 bg-gradient-to-r from-safety-blue-100 to-blue-50 border-2 border-safety-blue-800 rounded-lg p-8 text-center animate-fade-in-up">
          <h2 className="text-2xl font-bold text-deep-navy-900 mb-3">
            Test Your Knowledge
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Take our interactive quizzes to assess your understanding and get personalized recommendations
          </p>
          <Link
            href="/quizzes"
            className="btn-primary inline-block bg-safety-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-safety-blue-900 transition-all hover:scale-105"
          >
            Browse Quizzes →
          </Link>
        </section>

        {/* Installer CTA */}
        <section className="mt-8 bg-gradient-to-r from-accent-orange-500 to-accent-orange-600 rounded-lg p-8 text-center text-white shadow-lg animate-fade-in-up animation-delay-100">
          <h2 className="text-2xl font-bold mb-3">Ready to Take Action?</h2>
          <p className="text-lg mb-6 text-orange-100">
            Connect with ADAS-certified professionals in your area
          </p>
          <Link
            href="/find-installers"
            className="btn-primary inline-block bg-white text-accent-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105"
          >
            Find Installers Near You →
          </Link>
        </section>
      </div>
    </div>
  );
}
