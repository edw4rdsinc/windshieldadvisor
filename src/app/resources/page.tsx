import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Resources & Assessment Tools | Windshield Advisor',
  description: 'Interactive quizzes and assessment tools for windshield safety, ADAS calibration, insurance coverage, and more. Expert guidance for vehicle owners.',
  keywords: ['windshield quiz', 'ADAS calibration check', 'insurance coverage calculator', 'windshield safety assessment', 'repair vs replace'],
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-safety-blue-900 to-safety-blue-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Interactive Assessment Tools</h1>
          <p className="text-xl text-blue-100">
            Expert-developed quizzes to help you make informed decisions about windshield safety, ADAS calibration, and insurance coverage
          </p>
        </div>
      </section>

      {/* Interactive Quizzes Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Take an Assessment</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our interactive quizzes provide personalized recommendations based on your specific situation.
              Each assessment takes 3-5 minutes and provides immediate expert guidance.
            </p>
          </div>

          {/* Quiz 1: ADAS Calibration */}
          <div className="mb-16">
            <div className="bg-white rounded-lg p-8 mb-6 shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-safety-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-safety-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Does Your Car Need ADAS Calibration?</h3>
                  <p className="text-gray-600 mb-4">
                    Modern vehicles rely on Advanced Driver Assistance Systems (ADAS) for critical safety features like automatic emergency braking, lane keeping, and adaptive cruise control. After windshield replacement, these systems often require recalibration to function properly. This assessment helps you determine if your vehicle's ADAS systems need attention.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      4 minutes
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      7 questions
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="windshield-advisor-quiz"
              data-quiz="adas-calibration"
              data-partner-id="windshield-advisor"
              data-seo-mode="true"
              data-primary-color="2563eb"
              data-accent-color="1e40af"
            ></div>
          </div>

          {/* Quiz 2: Repair vs Replace */}
          <div className="mb-16">
            <div className="bg-white rounded-lg p-8 mb-6 shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Should I Repair or Replace My Windshield?</h3>
                  <p className="text-gray-600 mb-4">
                    Not all windshield damage requires replacement. Professional standards like ROLAGS (Repair of Laminated Automotive Glass Standard) provide clear guidelines for when repair is safe and appropriate. This quiz evaluates your specific damage and provides expert recommendations based on industry best practices.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      3 minutes
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      5 questions
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="windshield-advisor-quiz"
              data-quiz="repair-replace"
              data-partner-id="windshield-advisor"
              data-seo-mode="true"
              data-primary-color="ea580c"
              data-accent-color="c2410c"
            ></div>
          </div>

          {/* Quiz 3: Insurance Coverage */}
          <div className="mb-16">
            <div className="bg-white rounded-lg p-8 mb-6 shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-success-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-success-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">What Will My Insurance Cover?</h3>
                  <p className="text-gray-600 mb-4">
                    Insurance coverage for windshield replacement varies significantly by state, policy type, and specific circumstances. Some states mandate zero-deductible glass coverage, while others don't. This calculator helps you understand your likely out-of-pocket costs based on your insurance coverage, deductible, and location.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      5 minutes
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      7 questions
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="windshield-advisor-quiz"
              data-quiz="insurance-coverage"
              data-partner-id="windshield-advisor"
              data-seo-mode="true"
              data-primary-color="059669"
              data-accent-color="047857"
            ></div>
          </div>

          {/* Quiz 4: Installer Qualifications */}
          <div className="mb-16">
            <div className="bg-white rounded-lg p-8 mb-6 shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Is Your Installer Qualified?</h3>
                  <p className="text-gray-600 mb-4">
                    Professional certifications like AGSC (Auto Glass Safety Council) certification are crucial for ensuring safe, proper windshield installation. This is especially important for vehicles with ADAS systems. This quiz helps you evaluate whether your installer meets industry standards for quality and safety.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      3 minutes
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      6 questions
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="windshield-advisor-quiz"
              data-quiz="installer-qualified"
              data-partner-id="windshield-advisor"
              data-seo-mode="true"
              data-primary-color="7c3aed"
              data-accent-color="6d28d9"
            ></div>
          </div>

          {/* Quiz 5: Windshield Safety */}
          <div className="mb-16">
            <div className="bg-white rounded-lg p-8 mb-6 shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Is Your Windshield Safe?</h3>
                  <p className="text-gray-600 mb-4">
                    Your windshield is a critical safety component, providing up to 60% of your vehicle's structural integrity in a rollover and serving as the backstop for passenger-side airbags. This comprehensive assessment evaluates your windshield's current condition, installation quality, and potential safety risks across multiple factors.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      5 minutes
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      8 questions
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="windshield-advisor-quiz"
              data-quiz="windshield-safety"
              data-partner-id="windshield-advisor"
              data-seo-mode="true"
              data-primary-color="dc2626"
              data-accent-color="b91c1c"
            ></div>
          </div>
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Additional Resources</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Research White Papers</h3>
              <p className="text-gray-700 mb-4">
                Read our comprehensive research on windshield safety, ADAS calibration requirements, and industry standards.
              </p>
              <Link
                href="/white-papers"
                className="text-safety-blue-600 hover:text-safety-blue-700 font-semibold inline-flex items-center gap-2"
              >
                View White Papers
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Blog Articles</h3>
              <p className="text-gray-700 mb-4">
                Explore practical guides, safety tips, and in-depth analysis of windshield and ADAS topics.
              </p>
              <Link
                href="/blog"
                className="text-safety-blue-600 hover:text-safety-blue-700 font-semibold inline-flex items-center gap-2"
              >
                Read Blog Posts
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-safety-blue-600 to-safety-blue-700 rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Need Professional Service?</h3>
            <p className="text-lg text-blue-100 mb-6">
              Call Vero Autoglass - AGSC & ADAS Certified Technicians
            </p>
            <a
              href="tel:971-317-8376"
              className="inline-block text-4xl md:text-5xl font-bold text-white hover:text-blue-200 transition-colors"
            >
              971-317-8376
            </a>
            <p className="text-blue-100 mt-4">Portland Metro • Mobile Service Available</p>
          </div>
        </div>
      </section>

      {/* Load the SEO-enhanced quiz embed script */}
      <Script src="/quiz-embed-seo.js" strategy="lazyOnload" />
    </div>
  );
}
