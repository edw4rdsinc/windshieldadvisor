'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SeverityBanner, SeverityBadge } from '@/components/shared/SeverityBadge';
import type { Quiz, QuizResult, Severity } from '@/types/quiz';

interface QuizResultsProps {
  quiz: Quiz;
  result: QuizResult;
  onEmailSubmit?: (email: string) => void;
}

export function QuizResults({ quiz, result, onEmailSubmit }: QuizResultsProps) {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine severity for banner
  const getSeverity = (): Severity => {
    if (result.result.severity) {
      return result.result.severity as Severity;
    }

    // Map common result types to severity
    if (result.result.recommendation === 'replace' || result.result.outcome === 'mandatory') {
      return 'critical';
    }
    if (result.result.recommendation === 'repair' || result.result.outcome === 'recommended') {
      return 'caution';
    }
    return 'info';
  };

  const severity = getSeverity();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      // Call API to send results
      const response = await fetch('/api/quiz/email-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          quizId: quiz.id,
          resultId: result.completedAt, // Use timestamp as ID
        }),
      });

      if (response.ok) {
        setEmailSubmitted(true);
        if (onEmailSubmit) {
          onEmailSubmit(email);
        }
      }
    } catch (error) {
      console.error('Failed to send results:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Results Banner */}
        <SeverityBanner
          severity={severity}
          title={result.result.title || quiz.metadata?.title || 'Quiz Complete!'}
        />

        {/* Result Content */}
        <div className="mt-8 bg-white rounded-lg shadow-card p-6 md:p-8 animate-fade-in-up animation-delay-100">
          {/* Result Message */}
          {result.result.message && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-deep-navy-900 mb-4">
                Your Results
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {result.result.message}
              </p>
            </div>
          )}

          {/* Recommendations */}
          {result.result.recommendations && result.result.recommendations.length > 0 && (
            <div className="mb-8 bg-safety-blue-50 border-2 border-safety-blue-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-deep-navy-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-safety-blue-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recommended Actions
              </h3>
              <ul className="space-y-3">
                {result.result.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <span className="text-safety-blue-800 font-bold mt-1">•</span>
                    <span className="flex-1">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Score Display (for scored quizzes) */}
          {typeof result.result.totalScore === 'number' && (
            <div className="mb-8 text-center">
              <div className="inline-block bg-gray-100 rounded-lg p-6">
                <div className="text-4xl font-bold text-deep-navy-900 mb-2">
                  {result.result.totalScore}
                  <span className="text-lg text-gray-600 ml-2">points</span>
                </div>
                <SeverityBadge severity={severity} size="lg" />
              </div>
            </div>
          )}

          {/* Percentage Display (for percentage-based quizzes) */}
          {typeof result.result.percentage === 'number' && (
            <div className="mb-8 text-center">
              <div className="inline-block bg-gray-100 rounded-lg p-6">
                <div className="text-4xl font-bold text-deep-navy-900 mb-2">
                  {Math.round(result.result.percentage * 100)}%
                </div>
                <div className="text-gray-600">
                  {result.result.correctCount} out of {result.result.totalQuestions} correct
                </div>
                <div className="mt-3">
                  <SeverityBadge severity={severity} size="lg" />
                </div>
              </div>
            </div>
          )}

          {/* Warning Messages */}
          {result.result.warnings && result.result.warnings.length > 0 && (
            <div className="mb-8 bg-warning-yellow-50 border-l-4 border-warning-yellow-500 p-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-warning-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z" />
                </svg>
                <div className="flex-1">
                  <h4 className="font-bold text-warning-yellow-900 mb-2">Important Considerations</h4>
                  <ul className="space-y-2">
                    {result.result.warnings.map((warning: string, index: number) => (
                      <li key={index} className="text-warning-yellow-900">{warning}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Email Capture */}
          {!emailSubmitted ? (
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-safety-blue-200">
              <h3 className="text-xl font-bold text-deep-navy-900 mb-3">
                Get Your Detailed Results
              </h3>
              <p className="text-gray-700 mb-4">
                Enter your email to receive a comprehensive breakdown of your results and personalized recommendations.
              </p>
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="form-input flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-safety-blue-800 focus:ring-2 focus:ring-safety-blue-200 transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    btn-primary px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                  `}
                >
                  {isSubmitting ? 'Sending...' : 'Email Results'}
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-3">
                We respect your privacy. Your email will only be used to send your results and occasional safety tips.
              </p>
            </div>
          ) : (
            <div className="mb-8 bg-success-green-50 border-2 border-success-green-600 rounded-lg p-6 animate-fade-in-up">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-success-green-600 animate-success-bounce" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-bold text-success-green-900">Results Sent!</h4>
                  <p className="text-success-green-800">Check your inbox at {email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Primary CTA */}
          <div className="mb-8 bg-gradient-to-r from-accent-orange-500 to-accent-orange-600 rounded-lg p-8 text-center text-white shadow-lg">
            <h3 className="text-2xl font-bold mb-3">Ready to Take Action?</h3>
            <p className="text-lg mb-6 text-orange-100">
              Connect with qualified installers in your area who can address your windshield needs
            </p>
            <Link
              href="/find-installers"
              className="btn-primary inline-block bg-white text-accent-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105"
            >
              Find Qualified Installers →
            </Link>
          </div>

          {/* Related Content */}
          {quiz.metadata?.relatedWhitePapers && quiz.metadata?.relatedWhitePapers.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-deep-navy-900 mb-4">
                Learn More
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {quiz.metadata?.relatedWhitePapers.map((content, index) => (
                  <Link
                    key={index}
                    href={content.url}
                    className="block p-5 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-safety-blue-800 hover:bg-white transition-all group"
                  >
                    <h4 className="font-semibold text-deep-navy-900 mb-2 group-hover:text-safety-blue-800">
                      {content.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {content.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="btn-secondary px-6 py-3 rounded-lg font-semibold text-center hover:scale-105 transition-transform"
            >
              Retake Quiz
            </button>
            <Link
              href="/quizzes"
              className="btn-secondary px-6 py-3 rounded-lg font-semibold text-center hover:scale-105 transition-transform"
            >
              Browse Other Quizzes
            </Link>
          </div>
        </div>

        {/* Social Sharing (Future Enhancement) */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Share your results with friends to spread windshield safety awareness</p>
        </div>
      </div>
    </div>
  );
}
