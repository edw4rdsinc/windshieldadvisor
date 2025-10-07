import { notFound } from 'next/navigation';
import { getWhitePaperBySlug, getRelatedWhitePapers } from '@/data/content/white-papers';
import { getQuizBySlug } from '@/data/quizzes';
import { WhitePaperLayout } from '@/components/content/WhitePaperLayout';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const whitePaper = getWhitePaperBySlug(params.slug);

  if (!whitePaper) {
    return {
      title: 'White Paper Not Found',
    };
  }

  return {
    title: whitePaper.seo.metaTitle,
    description: whitePaper.seo.metaDescription,
    keywords: whitePaper.tags.join(', '),
    authors: [{ name: whitePaper.author.name }],
    openGraph: {
      title: whitePaper.seo.metaTitle,
      description: whitePaper.seo.metaDescription,
      type: 'article',
      publishedTime: whitePaper.publishedAt,
      modifiedTime: whitePaper.updatedAt,
      authors: [whitePaper.author.name],
      tags: whitePaper.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: whitePaper.seo.metaTitle,
      description: whitePaper.seo.metaDescription,
    },
    alternates: {
      canonical: whitePaper.seo.canonicalUrl,
    },
  };
}

export default function WhitePaperPage({ params }: PageProps) {
  const whitePaper = getWhitePaperBySlug(params.slug);

  if (!whitePaper || whitePaper.status !== 'published') {
    notFound();
  }

  // Get related content
  const relatedWhitePapers = getRelatedWhitePapers(whitePaper.id);
  const relatedQuizzes = whitePaper.relatedQuizzes
    .map((slug) => getQuizBySlug(slug))
    .filter(Boolean);

  return (
    <WhitePaperLayout
      whitePaper={whitePaper}
      relatedWhitePapers={relatedWhitePapers}
      relatedQuizzes={relatedQuizzes}
    />
  );
}

// Generate static paths for all published white papers
export async function generateStaticParams() {
  const { publishedWhitePapers } = await import('@/data/content/white-papers');

  return publishedWhitePapers.map((wp) => ({
    slug: wp.slug,
  }));
}
