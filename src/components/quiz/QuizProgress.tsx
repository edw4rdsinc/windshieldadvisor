'use client';

import React from 'react';

interface QuizProgressProps {
  current: number;
  total: number;
  progress: number;
  className?: string;
}

export function QuizProgress({ current, total, progress, className = '' }: QuizProgressProps) {
  return (
    <div className={`mb-8 ${className}`}>
      {/* Progress Text */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-600">
          Question {current} of {total}
        </span>
        <span className="text-sm font-semibold text-safety-blue-800">
          {Math.round(progress)}% Complete
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-safety-blue-600 to-safety-blue-800 rounded-full transition-all duration-500 ease-out shadow-glow-blue animate-progress-fill"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Quiz progress: ${Math.round(progress)}% complete`}
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>

        {/* Step Indicators */}
        <div className="absolute inset-0 flex items-center justify-between px-1">
          {Array.from({ length: total }).map((_, index) => (
            <div
              key={index}
              className={`
                w-2 h-2 rounded-full transition-all duration-300 z-10
                ${index < current
                  ? 'bg-white shadow-md scale-110'
                  : index === current - 1
                  ? 'bg-white/80 scale-125 animate-pulse-slow'
                  : 'bg-gray-400'
                }
              `}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
