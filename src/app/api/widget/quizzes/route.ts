import { NextResponse } from 'next/server';
import { allQuizzes } from '@/data/quizzes';

/**
 * GET /api/widget/quizzes
 *
 * Returns list of available quizzes for embedding
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const partnerId = searchParams.get('partnerId');

  // Return basic quiz metadata (no full question data)
  const quizList = allQuizzes.map(quiz => ({
    id: quiz.id,
    slug: quiz.slug,
    title: quiz.title,
    description: quiz.description,
    duration: quiz.duration,
    questionCount: quiz.questions.length,
    featured: quiz.featured || false,
    embedUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://windshieldadvisor.info'}/widget/quiz/${quiz.slug}`,
  }));

  return NextResponse.json({
    success: true,
    quizzes: quizList,
    partnerId: partnerId || null,
  });
}
