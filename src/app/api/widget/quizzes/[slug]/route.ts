import { NextResponse } from 'next/server';
import { getQuizBySlug } from '@/data/quizzes';

/**
 * GET /api/widget/quizzes/[slug]
 *
 * Returns metadata for a specific quiz
 */
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const quiz = getQuizBySlug(params.slug);

  if (!quiz) {
    return NextResponse.json(
      { success: false, error: 'Quiz not found' },
      { status: 404 }
    );
  }

  // Return metadata without full question data for API
  return NextResponse.json({
    success: true,
    quiz: {
      id: quiz.id,
      slug: quiz.slug,
      title: quiz.title,
      description: quiz.description,
      duration: quiz.duration,
      questionCount: quiz.questions.length,
      featured: quiz.featured || false,
      embedUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://windshieldadvisor.info'}/widget/quiz/${quiz.slug}`,
      embedCode: generateEmbedCode(quiz.slug),
    },
  });
}

function generateEmbedCode(slug: string): string {
  return `<!-- Windshield Advisor Quiz Widget -->
<div class="windshield-advisor-quiz"
     data-quiz="${slug}"
     data-primary-color="1a73e8"
     data-partner-id="YOUR_PARTNER_ID"></div>
<script src="${process.env.NEXT_PUBLIC_BASE_URL || 'https://windshieldadvisor.info'}/quiz-embed.js"></script>`;
}
