import Link from 'next/link';
import { getQuizzesByPriority } from '@/data/quizzes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Windshield Safety Quizzes | Test Your Knowledge',
  description: 'Take our interactive quizzes to assess your windshield safety knowledge and get personalized recommendations from certified experts.',
  keywords: ['windshield quiz', 'ADAS calibration quiz', 'windshield safety assessment', 'repair vs replace quiz'],
  openGraph: {
    title: 'Windshield Safety Quizzes | Test Your Knowledge',
    description: 'Interactive quizzes to help you make informed decisions about windshield repair and replacement.',
    type: 'website',
  },
};

export default function QuizzesPage() {
  const quizzes = getQuizzesByPriority();
  const featuredQuizzes = quizzes.filter(q => q.featured);
  const otherQuizzes = quizzes.filter(q => !q.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-safety-blue-900 to-safety-blue-800 text-white py-12 md:py-16 animate-fade-in-down">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            Windshield Safety Quizzes
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto animate-fade-in-up animation-delay-100">
            Test your knowledge and get personalized recommendations from certified windshield safety experts
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-12">
        {/* Featured Quizzes */}
        {featuredQuizzes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-deep-navy-900 mb-6 animate-fade-in-up">
              Featured Quizzes
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredQuizzes.map((quiz, index) => (
                <Link
                  key={quiz.id}
                  href={`/quizzes/${quiz.slug}`}
                  className="block bg-white rounded-lg shadow-card hover:shadow-card-hover p-6 md:p-8 border-2 border-transparent hover:border-safety-blue-800 transition-all group animate-fade-in-up hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-block bg-safety-blue-100 text-safety-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {quiz.category}
                    </span>
                  </div>

                  {/* Quiz Title */}
                  <h3 className="text-2xl font-bold text-deep-navy-900 mb-3 group-hover:text-safety-blue-800 transition-colors">
                    {quiz.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {quiz.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>~{quiz.estimatedTime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{quiz.questions.length} questions</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-safety-blue-800 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                      Start Quiz
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

        {/* All Quizzes */}
        <section>
          <h2 className="text-3xl font-bold text-deep-navy-900 mb-6 animate-fade-in-up">
            All Quizzes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {otherQuizzes.map((quiz, index) => (
              <Link
                key={quiz.id}
                href={`/quizzes/${quiz.slug}`}
                className="block bg-white rounded-lg shadow-card hover:shadow-card-hover p-6 border-2 border-transparent hover:border-safety-blue-800 transition-all group animate-fade-in-up hover:scale-[1.02]"
                style={{ animationDelay: `${(featuredQuizzes.length + index) * 0.05}s` }}
              >
                {/* Category Badge */}
                <div className="mb-3">
                  <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">
                    {quiz.category}
                  </span>
                </div>

                {/* Quiz Title */}
                <h3 className="text-xl font-bold text-deep-navy-900 mb-2 group-hover:text-safety-blue-800 transition-colors">
                  {quiz.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {quiz.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {quiz.estimatedTime} min
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {quiz.questions.length} questions
                  </span>
                </div>

                {/* CTA */}
                <span className="text-safety-blue-800 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Start Quiz →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mt-16 bg-white rounded-lg shadow-card p-8 md:p-12 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-deep-navy-900 mb-6 text-center">
            Why Take Our Quizzes?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-safety-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-safety-blue-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-deep-navy-900 mb-2">
                Expert Guidance
              </h3>
              <p className="text-gray-600">
                Get personalized recommendations based on your specific situation
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-orange-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-deep-navy-900 mb-2">
                Learn Critical Facts
              </h3>
              <p className="text-gray-600">
                Understand ADAS systems, calibration requirements, and safety standards
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-deep-navy-900 mb-2">
                Find Qualified Installers
              </h3>
              <p className="text-gray-600">
                Connect with ADAS-certified professionals in your area
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 bg-gradient-to-r from-accent-orange-500 to-accent-orange-600 rounded-lg p-8 text-center text-white shadow-lg animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-3">Need Help Right Away?</h2>
          <p className="text-lg mb-6 text-orange-100">
            Skip the quiz and connect directly with qualified installers
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
