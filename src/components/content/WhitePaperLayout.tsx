import React from 'react';
import Link from 'next/link';
import { TableOfContents } from './TableOfContents';
import { Callout } from '@/components/shared/Callout';
import type { WhitePaper, ContentSection } from '@/types/content';

interface WhitePaperLayoutProps {
  whitePaper: WhitePaper;
  relatedWhitePapers?: WhitePaper[];
  relatedQuizzes?: any[];
}

export function WhitePaperLayout({
  whitePaper,
  relatedWhitePapers = [],
  relatedQuizzes = [],
}: WhitePaperLayoutProps) {
  const { content, author, publishedAt, updatedAt, readTime, faqs, abstract, excerpt, tableOfContents, references } = whitePaper;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-safety-blue-900 to-safety-blue-800 text-white py-12 md:py-16 animate-fade-in-down">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-blue-200">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li>/</li>
                <li><Link href="/safety-guides" className="hover:text-white transition-colors">Safety Guides</Link></li>
                <li>/</li>
                <li className="text-white font-medium">{whitePaper.title}</li>
              </ol>
            </nav>

            <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">
              {whitePaper.title}
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-6 animate-fade-in-up animation-delay-100">
              {abstract || excerpt}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200 animate-fade-in-up animation-delay-200">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Table of Contents (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3">
            <TableOfContents items={tableOfContents} />
          </aside>

          {/* Main Article */}
          <article className="lg:col-span-6">
            {/* Mobile Table of Contents */}
            <div className="lg:hidden mb-8">
              <TableOfContents items={tableOfContents} />
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {content.sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-deep-navy-900 mb-6">
                    {section.title}
                  </h2>

                  <div className="prose prose-lg max-w-none">
                    <div
                      className="text-gray-700 leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: section.content.replace(/\n\n/g, '</p><p class="mb-4">').replace(/^/, '<p class="mb-4">').replace(/$/, '</p>') }}
                    />
                  </div>

                  {/* Callouts */}
                  {section.callouts && section.callouts.length > 0 && (
                    <div className="mt-6 space-y-4">
                      {section.callouts.map((callout, calloutIndex) => (
                        <Callout
                          key={calloutIndex}
                          type={callout.type}
                          title={callout.title}
                        >
                          {callout.content}
                        </Callout>
                      ))}
                    </div>
                  )}

                  {/* Subsections */}
                  {section.subsections && section.subsections.length > 0 && (
                    <div className="mt-8 space-y-8">
                      {section.subsections.map((subsection) => (
                        <div key={subsection.id} id={subsection.id} className="scroll-mt-24">
                          <h3 className="text-xl md:text-2xl font-bold text-deep-navy-900 mb-4">
                            {subsection.title}
                          </h3>
                          <div className="prose prose-lg max-w-none">
                            <div
                              className="text-gray-700 leading-relaxed whitespace-pre-line"
                              dangerouslySetInnerHTML={{ __html: subsection.content.replace(/\n\n/g, '</p><p class="mb-4">').replace(/^/, '<p class="mb-4">').replace(/$/, '</p>') }}
                            />
                          </div>
                          {subsection.callouts && subsection.callouts.length > 0 && (
                            <div className="mt-6 space-y-4">
                              {subsection.callouts.map((callout, calloutIndex) => (
                                <Callout
                                  key={calloutIndex}
                                  type={callout.type}
                                  title={callout.title}
                                >
                                  {callout.content}
                                </Callout>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* FAQs */}
            {faqs && faqs.length > 0 && (
              <section id="faqs" className="mt-12 scroll-mt-24 bg-white rounded-lg p-6 md:p-8 shadow-card animate-fade-in-up">
                <h2 className="text-2xl md:text-3xl font-bold text-deep-navy-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <details
                      key={index}
                      className="group bg-gray-50 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-safety-blue-800 transition-colors"
                    >
                      <summary className="cursor-pointer px-6 py-4 font-semibold text-deep-navy-900 flex items-center justify-between hover:bg-gray-100 transition-colors">
                        <span className="flex-1">{faq.question}</span>
                        <svg
                          className="w-5 h-5 text-safety-blue-800 transition-transform group-open:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-6 py-4 text-gray-700 border-t border-gray-200">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* References */}
            {references && references.length > 0 && (
              <section id="references" className="mt-12 scroll-mt-24 bg-gray-100 rounded-lg p-6 md:p-8 animate-fade-in-up">
                <h2 className="text-2xl md:text-3xl font-bold text-deep-navy-900 mb-6">
                  References
                </h2>
                <ol className="space-y-3 text-sm text-gray-700">
                  {references.map((ref, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="font-semibold text-safety-blue-800 min-w-[2rem]">[{index + 1}]</span>
                      <span>
                        {ref.title}. <em>{ref.source}</em>
                        {ref.url && (
                          <>
                            {' '}
                            <a
                              href={ref.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-safety-blue-800 hover:underline"
                            >
                              View source →
                            </a>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Primary CTA */}
            <div className="mt-12 bg-gradient-to-r from-accent-orange-500 to-accent-orange-600 rounded-lg p-8 text-center text-white shadow-lg animate-fade-in-up">
              <h3 className="text-2xl font-bold mb-3">Need a Qualified Installer?</h3>
              <p className="text-lg mb-6 text-orange-100">
                Connect with ADAS-certified professionals in your area
              </p>
              <Link
                href="/find-installers"
                className="btn-primary inline-block bg-white text-accent-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105"
              >
                Find Installers Near You →
              </Link>
            </div>
          </article>

          {/* Right Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Related Quizzes */}
            {relatedQuizzes.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-card animate-fade-in-up">
                <h3 className="text-xl font-bold text-deep-navy-900 mb-4">
                  Test Your Knowledge
                </h3>
                <div className="space-y-3">
                  {relatedQuizzes.map((quiz) => (
                    <Link
                      key={quiz.id}
                      href={`/quizzes/${quiz.slug}`}
                      className="block p-4 bg-safety-blue-50 rounded-lg hover:bg-safety-blue-100 transition-colors border-2 border-safety-blue-200 hover:border-safety-blue-800 group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-5 h-5 text-safety-blue-800" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="font-semibold text-deep-navy-900 group-hover:text-safety-blue-800">
                          {quiz.title}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{quiz.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related White Papers */}
            {relatedWhitePapers.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-card animate-fade-in-up animation-delay-100">
                <h3 className="text-xl font-bold text-deep-navy-900 mb-4">
                  Related Guides
                </h3>
                <div className="space-y-3">
                  {relatedWhitePapers.map((paper) => (
                    <Link
                      key={paper.id}
                      href={`/safety-guides/${paper.slug}`}
                      className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border-2 border-gray-200 hover:border-safety-blue-800 group"
                    >
                      <h4 className="font-semibold text-deep-navy-900 mb-1 group-hover:text-safety-blue-800">
                        {paper.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {paper.excerpt || paper.subtitle}
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        {paper.readTime} min read
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quick CTA Widget */}
            <div className="bg-safety-blue-900 text-white rounded-lg p-6 shadow-lg animate-fade-in-up animation-delay-200">
              <h3 className="text-lg font-bold mb-2">Stay Informed</h3>
              <p className="text-sm text-blue-100 mb-4">
                Get expert windshield safety tips delivered to your inbox
              </p>
              <Link
                href="/contact"
                className="btn-secondary block text-center bg-white text-safety-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
