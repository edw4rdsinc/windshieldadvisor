'use client';

import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../quiz/QuizQuestion';
import { QuizProgress } from '../quiz/QuizProgress';
import { QuizResults } from '../quiz/QuizResults';
import type { Quiz, QuizAnswer, QuizResult } from '@/types/quiz';

interface WidgetTheme {
  primaryColor?: string;
  accentColor?: string;
  textColor?: string;
  bgColor?: string;
  fontFamily?: string;
  borderRadius?: string;
}

interface WidgetConfig {
  partnerId?: string;
  partnerName?: string;
  callbackUrl?: string;
  showBranding: boolean;
  compact: boolean;
}

interface QuizWidgetProps {
  quiz: Quiz;
  theme: WidgetTheme;
  config: WidgetConfig;
}

export function QuizWidget({ quiz, theme, config }: QuizWidgetProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [startTime] = useState(Date.now());

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex) / totalQuestions) * 100;

  // Apply custom theme via CSS variables
  useEffect(() => {
    const root = document.documentElement;

    if (theme.primaryColor) root.style.setProperty('--widget-primary', theme.primaryColor);
    if (theme.accentColor) root.style.setProperty('--widget-accent', theme.accentColor);
    if (theme.textColor) root.style.setProperty('--widget-text', theme.textColor);
    if (theme.bgColor) root.style.setProperty('--widget-bg', theme.bgColor);
    if (theme.fontFamily) root.style.setProperty('--widget-font', theme.fontFamily);
    if (theme.borderRadius) root.style.setProperty('--widget-radius', theme.borderRadius);
  }, [theme]);

  // Send height updates to parent frame
  useEffect(() => {
    const sendHeight = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage(
        {
          type: 'quiz-widget-resize',
          height,
          quizId: quiz.id,
        },
        '*'
      );
    };

    sendHeight();
    window.addEventListener('resize', sendHeight);

    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true
    });

    return () => {
      window.removeEventListener('resize', sendHeight);
      observer.disconnect();
    };
  }, [quiz.id, currentQuestionIndex, isComplete]);

  // Send events to parent frame
  const sendEvent = (eventType: string, data: any = {}) => {
    window.parent.postMessage(
      {
        type: `quiz-widget-${eventType}`,
        quizId: quiz.id,
        quizSlug: quiz.slug,
        partnerId: config.partnerId,
        ...data,
      },
      '*'
    );
  };

  useEffect(() => {
    sendEvent('started', {
      title: quiz.title,
      totalQuestions,
    });

    // Track quiz start in Plausible
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('Quiz Started', {
        props: {
          quiz: quiz.slug,
          title: quiz.title,
          partnerId: config.partnerId,
        },
      });
    }
  }, []);

  const handleAnswer = (answer: string | string[]) => {
    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      answer,
      timestamp: new Date().toISOString(),
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    sendEvent('answer', {
      questionId: currentQuestion.id,
      questionNumber: currentQuestionIndex + 1,
      answer,
    });

    // Check for conditional quiz end
    if (quiz.scoring.type === 'conditional') {
      const selectedOption = currentQuestion.options.find(opt => opt.id === answer);
      if (selectedOption?.endQuiz) {
        completeQuiz(updatedAnswers, selectedOption.result);
        return;
      }
    }

    // Move to next question or complete
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeQuiz(updatedAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setAnswers(answers.slice(0, -1));
      setCurrentQuestionIndex(currentQuestionIndex - 1);

      sendEvent('back', {
        questionNumber: currentQuestionIndex,
      });
    }
  };

  const completeQuiz = (finalAnswers: QuizAnswer[], forcedResult?: string) => {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    const calculatedResult = calculateResult(finalAnswers, forcedResult);

    const quizResult: QuizResult = {
      quizId: quiz.id,
      quizSlug: quiz.slug,
      answers: finalAnswers,
      result: calculatedResult,
      duration,
      completedAt: new Date().toISOString(),
    };

    setResult(quizResult);
    setIsComplete(true);

    sendEvent('completed', {
      result: calculatedResult,
      duration,
      answersCount: finalAnswers.length,
    });

    // Track quiz completion in Plausible
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('Quiz Completed', {
        props: {
          quiz: quiz.slug,
          title: quiz.title,
          partnerId: config.partnerId,
          severity: calculatedResult.severity,
          duration: duration,
          questionsAnswered: finalAnswers.length,
        },
      });
    }

    // Call partner callback if provided
    if (config.callbackUrl) {
      fetch(config.callbackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerId: config.partnerId,
          quizResult,
        }),
      }).catch(console.error);
    }
  };

  const calculateResult = (finalAnswers: QuizAnswer[], forcedResult?: string): any => {
    // Simplified calculation - reuse logic from QuizEngine
    // For the widget, we'll use a basic scoring approach

    let totalScore = 0;

    finalAnswers.forEach(answer => {
      const question = quiz.questions.find(q => q.id === answer.questionId);
      if (!question) return;

      const option = question.options.find(opt =>
        opt.id === answer.answer || opt.value === answer.answer
      );

      if (option && typeof option.score === 'number') {
        totalScore += option.score;
      }
    });

    return {
      severity: totalScore > 5 ? 'warning' : 'safe',
      totalScore,
      outcome: forcedResult || 'completed',
    };
  };

  if (isComplete && result) {
    return (
      <div className="widget-container" style={{
        fontFamily: theme.fontFamily || 'system-ui, -apple-system, sans-serif',
        color: theme.textColor || '#1a202c',
        backgroundColor: theme.bgColor || '#ffffff',
      }}>
        <QuizResults quiz={quiz} result={result} />

        {config.showBranding && (
          <div className="widget-branding" style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid #e2e8f0',
            textAlign: 'center',
            fontSize: '0.875rem',
            color: '#718096',
          }}>
            Powered by{' '}
            <a
              href="https://windshieldadvisor.info"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: theme.primaryColor || '#2563eb', textDecoration: 'none' }}
            >
              Windshield Advisor
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="widget-container" style={{
      fontFamily: theme.fontFamily || 'system-ui, -apple-system, sans-serif',
      color: theme.textColor || '#1a202c',
      backgroundColor: theme.bgColor || '#ffffff',
      padding: config.compact ? '1rem' : '1.5rem',
    }}>
      <style jsx>{`
        .widget-container :global(*) {
          box-sizing: border-box;
        }

        .widget-container :global(.btn-primary) {
          background-color: var(--widget-primary, #2563eb);
          color: white;
          border-radius: var(--widget-radius, 0.5rem);
        }

        .widget-container :global(.btn-primary:hover) {
          background-color: var(--widget-accent, #1e40af);
        }

        .widget-container :global(.progress-bar) {
          background-color: var(--widget-primary, #2563eb);
        }

        .widget-container :global(input[type="radio"]:checked + label) {
          border-color: var(--widget-primary, #2563eb);
          background-color: var(--widget-primary, #2563eb);
        }
      `}</style>

      {/* Progress Bar */}
      <QuizProgress
        current={currentQuestionIndex + 1}
        total={totalQuestions}
        progress={progress}
      />

      {/* Question */}
      <QuizQuestion
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        canGoBack={currentQuestionIndex > 0}
      />

      {config.showBranding && (
        <div className="widget-branding" style={{
          marginTop: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid #e2e8f0',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: '#718096',
        }}>
          Powered by{' '}
          <a
            href="https://windshieldadvisor.info"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: theme.primaryColor || '#2563eb', textDecoration: 'none' }}
          >
            Windshield Advisor
          </a>
        </div>
      )}
    </div>
  );
}
