import { notFound } from 'next/navigation';
import { getQuizBySlug } from '@/data/quizzes';
import { QuizEngine } from '@/components/quiz/QuizEngine';
import type { Metadata } from 'next';
import Link from 'next/link';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const quiz = getQuizBySlug(params.slug);

  if (!quiz) {
    return {
      title: 'Quiz Not Found',
    };
  }

  const title = `${quiz.title} | Windshield Safety Quiz`;
  const description = quiz.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function QuizPage({ params }: PageProps) {
  const quiz = getQuizBySlug(params.slug);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Quiz Header */}
      <div className="bg-gradient-to-r from-safety-blue-900 to-safety-blue-800 text-white py-8 md:py-12 animate-fade-in-down">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-4 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-blue-200">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/quizzes" className="hover:text-white transition-colors">Quizzes</Link></li>
              <li>/</li>
              <li className="text-white font-medium">{quiz.title}</li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in-up">
            {quiz.title}
          </h1>
          <p className="text-lg text-blue-100 mb-4 animate-fade-in-up animation-delay-100">
            {quiz.description}
          </p>

          {/* Quiz Meta */}
          <div className="flex items-center gap-4 text-sm text-blue-200 animate-fade-in-up animation-delay-200">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>~{quiz.duration} minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{quiz.questions.length} questions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Engine */}
      <QuizEngine quiz={quiz} />
    </div>
  );
}

// Generate static paths for all quizzes
export async function generateStaticParams() {
  const { default: allQuizzes } = await import('@/data/quizzes');

  return allQuizzes.map((quiz) => ({
    slug: quiz.slug,
  }));
}
