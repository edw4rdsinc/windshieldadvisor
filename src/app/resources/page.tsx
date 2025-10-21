import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Resources | Windshield Advisor',
  description: 'Additional resources for windshield safety and ADAS information',
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-safety-blue-900 to-safety-blue-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources</h1>
          <p className="text-xl text-blue-100">Additional tools and information coming soon</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon: Glossary</h3>
              <p className="text-gray-700 mb-4">
                A comprehensive glossary of windshield and ADAS terminology to help you understand
                industry jargon.
              </p>
              <p className="text-sm text-gray-500">Expected: November 2025</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon: FAQ Database</h3>
              <p className="text-gray-700 mb-4">
                Searchable database of frequently asked questions about windshield safety, repair,
                and replacement.
              </p>
              <p className="text-sm text-gray-500">Expected: November 2025</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon: State Insurance Laws</h3>
              <p className="text-gray-700 mb-4">
                State-by-state guide to windshield replacement insurance coverage, including
                zero-deductible states.
              </p>
              <p className="text-sm text-gray-500">Expected: December 2025</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon: Certification Directory</h3>
              <p className="text-gray-700 mb-4">
                Complete guide to auto glass industry certifications (AGSC, NGA, IGA) and what
                they mean for quality.
              </p>
              <p className="text-sm text-gray-500">Expected: December 2025</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-8">
              In the meantime, explore our comprehensive safety guides and interactive quizzes:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/safety-guides"
                className="inline-flex items-center justify-center px-8 py-4 bg-safety-blue-600 hover:bg-safety-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Read Safety Guides
              </Link>
              <Link
                href="/quizzes"
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-safety-blue-600 border-2 border-safety-blue-600 font-semibold rounded-lg transition-colors"
              >
                Take a Quiz
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
