import { notFound } from 'next/navigation';
import { getQuizBySlug } from '@/data/quizzes';
import { QuizWidget } from '@/components/widget/QuizWidget';
import type { Metadata } from 'next';

interface WidgetPageProps {
  params: { slug: string };
  searchParams: {
    // Theme configuration
    primaryColor?: string;
    accentColor?: string;
    textColor?: string;
    bgColor?: string;
    fontFamily?: string;
    borderRadius?: string;

    // Partner configuration
    partnerId?: string;
    partnerName?: string;
    callbackUrl?: string;

    // Display options
    showBranding?: string;
    compact?: string;
  };
}

export async function generateMetadata({ params }: WidgetPageProps): Promise<Metadata> {
  const quiz = getQuizBySlug(params.slug);

  if (!quiz) {
    return { title: 'Quiz Not Found' };
  }

  return {
    title: quiz.title,
    description: quiz.description,
    robots: 'noindex,nofollow', // Don't index widget pages
  };
}

export default function WidgetQuizPage({ params, searchParams }: WidgetPageProps) {
  const quiz = getQuizBySlug(params.slug);

  if (!quiz) {
    notFound();
  }

  // Parse theme configuration from URL params
  const theme = {
    primaryColor: searchParams.primaryColor ? `#${searchParams.primaryColor}` : undefined,
    accentColor: searchParams.accentColor ? `#${searchParams.accentColor}` : undefined,
    textColor: searchParams.textColor ? `#${searchParams.textColor}` : undefined,
    bgColor: searchParams.bgColor ? `#${searchParams.bgColor}` : undefined,
    fontFamily: searchParams.fontFamily?.replace(/\+/g, ' '),
    borderRadius: searchParams.borderRadius ? `${searchParams.borderRadius}px` : undefined,
  };

  const config = {
    partnerId: searchParams.partnerId,
    partnerName: searchParams.partnerName,
    callbackUrl: searchParams.callbackUrl,
    showBranding: searchParams.showBranding !== 'false',
    compact: searchParams.compact === 'true',
  };

  return <QuizWidget quiz={quiz} theme={theme} config={config} />;
}
