'use client';

import React, { useState } from 'react';
import type { QuizQuestion as QuizQuestionType } from '@/types/quiz';

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string | string[]) => void;
  onPrevious?: () => void;
  canGoBack?: boolean;
}

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onPrevious,
  canGoBack = false,
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null);
  const [showValidation, setShowValidation] = useState(false);

  const handleSubmit = () => {
    if (!selectedAnswer) {
      setShowValidation(true);
      return;
    }

    onAnswer(selectedAnswer);
    setSelectedAnswer(null);
    setShowValidation(false);
  };

  const handleOptionSelect = (optionId: string) => {
    if (question.type === 'multiple_choice') {
      setSelectedAnswer(optionId);
      setShowValidation(false);
    }
  };

  const handleMultipleSelect = (optionId: string) => {
    if (question.type === 'multiple_select') {
      const current = (selectedAnswer as string[]) || [];
      if (current.includes(optionId)) {
        setSelectedAnswer(current.filter(id => id !== optionId));
      } else {
        setSelectedAnswer([...current, optionId]);
      }
      setShowValidation(false);
    }
  };

  const handleTextInput = (value: string) => {
    setSelectedAnswer(value);
    setShowValidation(false);
  };

  const isSelected = (optionId: string) => {
    if (question.type === 'multiple_select') {
      return (selectedAnswer as string[] || []).includes(optionId);
    }
    return selectedAnswer === optionId;
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-6 md:p-8 animate-fade-in-up">
      {/* Question Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-safety-blue-800 bg-safety-blue-50 px-3 py-1 rounded-full">
            Question {questionNumber} of {totalQuestions}
          </span>
          {question.required && (
            <span className="text-xs text-gray-500">* Required</span>
          )}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-deep-navy-900 mb-3">
          {question.question}
        </h2>

        {question.description && (
          <p className="text-gray-600 text-lg">
            {question.description}
          </p>
        )}

        {question.type === 'multiple_select' && (
          <p className="text-sm text-gray-500 mt-2 italic">
            Select all that apply
          </p>
        )}
      </div>

      {/* Answer Options */}
      <div className="space-y-3 mb-8">
        {question.type === 'multiple_choice' && (
          <>
            {question.options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`
                  quiz-option w-full text-left p-4 md:p-5 rounded-lg border-2 transition-all
                  animate-fade-in-up
                  ${isSelected(option.id)
                    ? 'border-safety-blue-800 bg-safety-blue-50 shadow-md scale-[1.02]'
                    : 'border-gray-300 bg-white hover:border-safety-blue-400 hover:bg-gray-50'
                  }
                `}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-4">
                  {/* Radio Circle */}
                  <div
                    className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                      ${isSelected(option.id)
                        ? 'border-safety-blue-800 bg-safety-blue-800'
                        : 'border-gray-400'
                      }
                    `}
                  >
                    {isSelected(option.id) && (
                      <div className="w-3 h-3 bg-white rounded-full animate-scale-in" />
                    )}
                  </div>

                  {/* Option Text */}
                  <span
                    className={`
                      text-base md:text-lg font-medium flex-1
                      ${isSelected(option.id) ? 'text-safety-blue-900' : 'text-gray-700'}
                    `}
                  >
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </>
        )}

        {question.type === 'multiple_select' && (
          <>
            {question.options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleMultipleSelect(option.id)}
                className={`
                  quiz-option w-full text-left p-4 md:p-5 rounded-lg border-2 transition-all
                  animate-fade-in-up
                  ${isSelected(option.id)
                    ? 'border-safety-blue-800 bg-safety-blue-50 shadow-md scale-[1.02]'
                    : 'border-gray-300 bg-white hover:border-safety-blue-400 hover:bg-gray-50'
                  }
                `}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <div
                    className={`
                      w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all
                      ${isSelected(option.id)
                        ? 'border-safety-blue-800 bg-safety-blue-800'
                        : 'border-gray-400'
                      }
                    `}
                  >
                    {isSelected(option.id) && (
                      <svg
                        className="w-4 h-4 text-white animate-scale-in"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  {/* Option Text */}
                  <span
                    className={`
                      text-base md:text-lg font-medium flex-1
                      ${isSelected(option.id) ? 'text-safety-blue-900' : 'text-gray-700'}
                    `}
                  >
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </>
        )}

        {question.type === 'text_input' && (
          <input
            type="text"
            value={(selectedAnswer as string) || ''}
            onChange={(e) => handleTextInput(e.target.value)}
            placeholder={question.placeholder || 'Enter your answer...'}
            className="form-input w-full p-4 text-lg rounded-lg border-2 border-gray-300 focus:border-safety-blue-800 focus:ring-2 focus:ring-safety-blue-200 transition-all"
          />
        )}

        {question.type === 'dropdown' && (
          <select
            value={(selectedAnswer as string) || ''}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            className="form-input w-full p-4 text-lg rounded-lg border-2 border-gray-300 focus:border-safety-blue-800 focus:ring-2 focus:ring-safety-blue-200 transition-all"
          >
            <option value="">Select an option...</option>
            {question.options.map((option) => (
              <option key={option.id} value={option.value || option.id}>
                {option.text}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Validation Message */}
      {showValidation && (
        <div className="mb-6 p-4 bg-danger-red-50 border-2 border-danger-red-600 rounded-lg text-danger-red-800 animate-shake">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <span className="font-semibold">Please select an answer to continue</span>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        {canGoBack && onPrevious ? (
          <button
            onClick={onPrevious}
            className="btn-secondary px-6 py-3 rounded-lg font-semibold text-lg hover:-translate-x-1 transition-transform"
          >
            ← Previous
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className={`
            px-8 py-3 rounded-lg font-bold text-lg transition-all
            ${selectedAnswer
              ? 'btn-primary bg-accent-orange-500 text-white hover:bg-accent-orange-600 hover:scale-105 shadow-button'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {questionNumber === totalQuestions ? 'Complete Quiz' : 'Next Question'} →
        </button>
      </div>
    </div>
  );
}
