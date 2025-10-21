import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import QuizResultsEmail from '@/emails/quiz-results';
import type { Quiz, QuizResult } from '@/types/quiz';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, quiz, result } = body as {
      email: string;
      quiz: Quiz;
      result: QuizResult;
    };

    // Validate required fields
    if (!email || !quiz || !result) {
      return NextResponse.json(
        { error: 'Missing required fields: email, quiz, or result' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@windshieldadvisor.info',
      to: [email],
      subject: `Your ${quiz.title} Results - Windshield Advisor`,
      react: QuizResultsEmail({
        quiz,
        result,
        recipientEmail: email,
      }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    // Log successful email send
    console.log('Quiz results email sent:', {
      email,
      quizId: quiz.id,
      quizSlug: quiz.slug,
      emailId: data?.id,
      timestamp: new Date().toISOString(),
    });

    // TODO: Save email to database for tracking
    // await prisma.quizEmailSent.create({
    //   data: {
    //     email,
    //     quizId: quiz.id,
    //     quizSlug: quiz.slug,
    //     resultId: result.completedAt,
    //     emailId: data?.id,
    //     sentAt: new Date(),
    //   },
    // });

    return NextResponse.json({
      success: true,
      emailId: data?.id,
    });
  } catch (error) {
    console.error('Email results error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
