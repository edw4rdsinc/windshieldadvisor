'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FloatingQuizButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show button after user scrolls down a bit
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay background when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {isExpanded ? (
          // Expanded Quiz Selector
          <div className="bg-white rounded-lg shadow-2xl p-6 w-80 animate-fade-in-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Take a Quick Quiz</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <Link
                href="/quizzes/windshield-safety"
                className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="font-semibold text-gray-900 mb-1">Is My Windshield Safe?</div>
                <div className="text-sm text-gray-600">2-3 min • Most popular</div>
              </Link>

              <Link
                href="/quizzes/adas-calibration"
                className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="font-semibold text-gray-900 mb-1">Does My Car Need ADAS?</div>
                <div className="text-sm text-gray-600">3-4 min</div>
              </Link>

              <Link
                href="/quizzes/repair-replace"
                className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="font-semibold text-gray-900 mb-1">Repair or Replace?</div>
                <div className="text-sm text-gray-600">2 min</div>
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/quizzes"
                className="text-sm text-safety-blue-600 hover:text-safety-blue-700 font-semibold"
              >
                View all quizzes →
              </Link>
            </div>
          </div>
        ) : (
          // Collapsed Floating Button
          <button
            onClick={() => setIsExpanded(true)}
            className="bg-accent-orange-500 hover:bg-accent-orange-600 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-3 group"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-semibold text-lg">Take Safety Quiz</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </>
  );
}
