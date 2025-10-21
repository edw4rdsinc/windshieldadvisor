'use client';

import React, { useState, useEffect } from 'react';
import { QuizQuestion } from './QuizQuestion';
import { QuizProgress } from './QuizProgress';
import { QuizResults } from './QuizResults';
import type { Quiz, QuizQuestion as QuizQuestionType, QuizAnswer, QuizResult } from '@/types/quiz';

interface QuizEngineProps {
  quiz: Quiz;
  onComplete?: (result: QuizResult) => void;
  sessionId?: string;
}

export function QuizEngine({ quiz, onComplete, sessionId }: QuizEngineProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [startTime] = useState(Date.now());

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex) / totalQuestions) * 100;

  // Load saved progress from localStorage
  useEffect(() => {
    const savedSession = localStorage.getItem(`quiz_session_${quiz.id}`);
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        setAnswers(session.answers || []);
        setCurrentQuestionIndex(session.currentQuestionIndex || 0);
      } catch (error) {
        console.error('Failed to load quiz session:', error);
      }
    }
  }, [quiz.id]);

  // Save progress to localStorage
  useEffect(() => {
    if (answers.length > 0 && !isComplete) {
      const session = {
        quizId: quiz.id,
        answers,
        currentQuestionIndex,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(`quiz_session_${quiz.id}`, JSON.stringify(session));
    }
  }, [answers, currentQuestionIndex, quiz.id, isComplete]);

  const handleAnswer = (answer: string | string[]) => {
    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      answer,
      timestamp: new Date().toISOString(),
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    // Check if this answer ends the quiz (conditional logic)
    if (quiz.scoring.type === 'conditional') {
      const selectedOption = currentQuestion.options.find(opt => opt.id === answer);
      if (selectedOption?.endQuiz) {
        completeQuiz(updatedAnswers, selectedOption.result);
        return;
      }
    }

    // Move to next question or complete quiz
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeQuiz(updatedAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      // Remove last answer
      setAnswers(answers.slice(0, -1));
      setCurrentQuestionIndex(currentQuestionIndex - 1);
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

    // Clear session from localStorage
    localStorage.removeItem(`quiz_session_${quiz.id}`);

    // Store result for pre-population
    localStorage.setItem(`quiz_result_${quiz.id}`, JSON.stringify(quizResult));

    // Call onComplete callback
    if (onComplete) {
      onComplete(quizResult);
    }
  };

  const calculateResult = (finalAnswers: QuizAnswer[], forcedResult?: string): any => {
    // If result is forced (conditional logic), use it
    if (forcedResult) {
      return quiz.scoring.results?.[forcedResult] || { severity: 'info', outcome: forcedResult };
    }

    switch (quiz.scoring.type) {
      case 'threshold_based':
        return calculateThresholdResult(finalAnswers);

      case 'conditional':
        return calculateConditionalResult(finalAnswers);

      case 'recommendation_based':
        return calculateRecommendationResult(finalAnswers);

      case 'percentage_based':
        return calculatePercentageResult(finalAnswers);

      case 'mixed':
        return calculateMixedResult(finalAnswers);

      default:
        return { severity: 'info', outcome: 'completed' };
    }
  };

  const calculateThresholdResult = (finalAnswers: QuizAnswer[]) => {
    let totalScore = 0;
    let hasCriticalFailure = false;
    let hadWork = false;
    let wasCalibrated = false;
    let hasCamera = false;

    // Check for critical failures and ADAS-specific flags
    finalAnswers.forEach(answer => {
      const question = quiz.questions.find(q => q.id === answer.questionId);
      if (!question) return;

      const option = question.options.find(opt =>
        opt.id === answer.answer || opt.value === answer.answer
      );

      if (option && (option as any).criticalFailure) {
        hasCriticalFailure = true;
      }

      // Check for ADAS mandatory calibration case
      if (option && (option as any).hadWork) {
        hadWork = true;
      }
      if (option && (option as any).wasCalibrated === true) {
        wasCalibrated = true;
      }
      if (option && (option as any).hasCamera) {
        hasCamera = true;
      }

      if (option && typeof option.score === 'number') {
        totalScore += option.score;
      }
    });

    // Special case for ADAS: had work but no calibration
    if (quiz.id === 'adas-calibration' && hadWork && !wasCalibrated && hasCamera && quiz.scoring.results?.['mandatory']) {
      return {
        severity: 'critical',
        totalScore,
        ...quiz.scoring.results['mandatory'],
      };
    }

    // If critical failure detected, return critical failure result
    if (hasCriticalFailure && quiz.scoring.results?.['critical_failure']) {
      return {
        severity: 'critical',
        totalScore,
        ...quiz.scoring.results['critical_failure'],
      };
    }

    const thresholds = quiz.scoring.severityThresholds;
    if (!thresholds) return { severity: 'info', totalScore };

    for (const [severity, range] of Object.entries(thresholds)) {
      if (totalScore >= range.min && totalScore <= range.max) {
        return {
          severity,
          totalScore,
          color: range.color,
          ...quiz.scoring.results?.[severity],
        };
      }
    }

    return { severity: 'info', totalScore };
  };

  const calculateConditionalResult = (finalAnswers: QuizAnswer[]) => {
    // Result is determined by conditional logic (already handled in handleAnswer)
    const lastAnswer = finalAnswers[finalAnswers.length - 1];
    const lastQuestion = quiz.questions.find(q => q.id === lastAnswer.questionId);
    const selectedOption = lastQuestion?.options.find(opt => opt.id === lastAnswer.answer);

    return quiz.scoring.results?.[selectedOption?.result || 'completed'] || {
      severity: 'info',
      outcome: selectedOption?.result
    };
  };

  const calculateRecommendationResult = (finalAnswers: QuizAnswer[]) => {
    const recommendations: string[] = [];

    finalAnswers.forEach(answer => {
      const question = quiz.questions.find(q => q.id === answer.questionId);
      if (!question) return;

      const option = question.options.find(opt =>
        opt.id === answer.answer || opt.value === answer.answer
      );

      if (option?.recommendation) {
        recommendations.push(option.recommendation);
      }
    });

    // Priority: replace > repair
    const finalRecommendation = recommendations.includes('replace') ? 'replace' : 'repair';

    return {
      recommendation: finalRecommendation,
      severity: finalRecommendation === 'replace' ? 'critical' : 'safe',
      ...quiz.scoring.results?.[finalRecommendation],
    };
  };

  const calculatePercentageResult = (finalAnswers: QuizAnswer[]) => {
    let correctCount = 0;
    const totalQuestions = finalAnswers.length;

    finalAnswers.forEach(answer => {
      const question = quiz.questions.find(q => q.id === answer.questionId);
      if (!question) return;

      const option = question.options.find(opt =>
        opt.id === answer.answer || opt.value === answer.answer
      );

      if (option?.flag === 'green') {
        correctCount++;
      }
    });

    const percentage = correctCount / totalQuestions;
    const thresholds = quiz.scoring.thresholds;

    if (!thresholds) return { percentage, correctCount, totalQuestions };

    for (const [level, range] of Object.entries(thresholds)) {
      if (percentage >= range.min && percentage <= range.max) {
        return {
          level,
          percentage,
          correctCount,
          totalQuestions,
          ...quiz.scoring.results?.[level],
        };
      }
    }

    return { percentage, correctCount, totalQuestions };
  };

  const calculateMixedResult = (finalAnswers: QuizAnswer[]) => {
    // Custom business logic based on quiz rules
    const answerMap = new Map(
      finalAnswers.map(a => [a.questionId, a.answer])
    );

    // For insurance-coverage quiz, calculate costs
    if (quiz.id === 'insurance-coverage') {
      return calculateInsuranceCoverage(finalAnswers, answerMap);
    }

    const rules = quiz.scoring.logic?.rules || [];

    for (const rule of rules) {
      if (!rule.if || !rule.then) continue;

      let conditionMet = true;

      // Check if conditions match
      for (const [questionId, expectedAnswers] of Object.entries(rule.if)) {
        const userAnswer = answerMap.get(questionId);
        if (Array.isArray(expectedAnswers)) {
          if (!expectedAnswers.includes(userAnswer as string)) {
            conditionMet = false;
            break;
          }
        } else if (userAnswer !== expectedAnswers) {
          conditionMet = false;
          break;
        }
      }

      if (conditionMet) {
        return quiz.scoring.results?.[rule.then] || { outcome: rule.then };
      }
    }

    return quiz.scoring.results?.['default'] || { severity: 'info' };
  };

  const calculateInsuranceCoverage = (finalAnswers: QuizAnswer[], answerMap: Map<string, string | string[]>) => {
    // Get answer values
    const getAnswerValue = (questionId: string) => answerMap.get(questionId) as string;
    const getAnswerOption = (questionId: string) => {
      const answer = getAnswerValue(questionId);
      const question = quiz.questions.find(q => q.id === questionId);
      return question?.options.find(opt => opt.value === answer || opt.id === answer);
    };

    const stateAnswer = getAnswerOption('q1');
    const coverageAnswer = getAnswerOption('q2');
    const causeAnswer = getAnswerOption('q3');
    const deductibleAnswer = getAnswerOption('q4');
    const serviceAnswer = getAnswerOption('q5');
    const fullGlassAnswer = getAnswerOption('q6');
    const priorClaimsAnswer = getAnswerOption('q7');

    let isCovered = false;
    let deductibleAmount = 0;
    let estimatedTotal = (serviceAnswer as any)?.estimatedCost || 500;
    let outOfPocket = 0;
    let notes: string[] = [];

    // Determine if covered
    if ((coverageAnswer as any)?.covered === true) {
      if ((causeAnswer as any)?.covered === 'comprehensive' || (causeAnswer as any)?.covered === 'unknown') {
        isCovered = true;
      } else if ((causeAnswer as any)?.covered === 'collision' && getAnswerValue('q2') === 'comp_collision') {
        isCovered = true;
        notes.push('Collision coverage applies, but you may want to use comprehensive if deductible is lower');
      }
    } else if ((coverageAnswer as any)?.covered === false) {
      isCovered = false;
      notes.push('Liability-only or collision-only policies do not cover windshield damage');
    }

    // Calculate deductible
    if (isCovered) {
      // Zero-deductible states
      if ((stateAnswer as any)?.zeroDeductible && (coverageAnswer as any)?.covered) {
        deductibleAmount = 0;
        const stateName = stateAnswer?.text || 'Your state';
        notes.push(`${stateName} law requires insurers to waive comprehensive deductible for glass`);
      }
      // Repair often has $0 deductible
      else if ((serviceAnswer as any)?.waivedDeductible) {
        deductibleAmount = 0;
        notes.push('Most insurers waive deductible for repairs to encourage fixing chips before they spread');
      }
      // Full glass coverage
      else if ((fullGlassAnswer as any)?.hasFullGlass === true) {
        deductibleAmount = 0;
        notes.push('Your full glass coverage eliminates the deductible');
      }
      // Standard deductible applies
      else if ((deductibleAnswer as any)?.amount !== null && (deductibleAnswer as any)?.amount !== undefined) {
        deductibleAmount = (deductibleAnswer as any).amount;
      }
      // Unknown deductible
      else {
        deductibleAmount = 250; // Estimate
        notes.push('Check your policy documents for your actual comprehensive deductible');
      }
    }

    // Calculate out of pocket
    if (!isCovered) {
      outOfPocket = estimatedTotal;
    } else {
      outOfPocket = Math.min(deductibleAmount, estimatedTotal);
    }

    // Add additional context notes
    if ((stateAnswer as any)?.optionalFullGlass && deductibleAmount > 0) {
      notes.push(`💡 In ${stateAnswer?.text}, insurers offer optional full glass coverage. Ask about adding $0 glass deductible to your policy.`);
    }

    if ((priorClaimsAnswer as any)?.riskIncrease) {
      notes.push('⚠️ Multiple glass claims may trigger a policy review. Consult your insurer about potential rate impacts.');
    }

    // Determine result type
    let resultKey = 'check_policy';
    if (!isCovered) {
      resultKey = 'not_covered';
    } else if (outOfPocket === 0) {
      resultKey = 'fully_covered';
    } else if (outOfPocket < estimatedTotal) {
      resultKey = 'partially_covered';
    }

    const baseResult = quiz.scoring.results?.[resultKey] || { severity: 'info' };

    return {
      ...baseResult,
      coverage: isCovered,
      deductibleAmount,
      estimatedTotal,
      outOfPocket,
      notes,
      // Add cost breakdown for display
      costBreakdown: {
        covered: isCovered,
        deductible: deductibleAmount,
        estimatedCost: estimatedTotal,
        yourCost: outOfPocket,
        insurancePays: isCovered ? estimatedTotal - outOfPocket : 0
      }
    };
  };

  if (isComplete && result) {
    return <QuizResults quiz={quiz} result={result} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-3xl">
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
      </div>
    </div>
  );
}
