export type Severity = 'safe' | 'caution' | 'critical' | 'info';

export type QuestionType = 'multiple_choice' | 'multiple_select' | 'text_input' | 'dropdown';

export type ScoringType = 'threshold_based' | 'conditional' | 'recommendation_based' | 'percentage_based' | 'mixed';

export interface QuizOption {
  id: string;
  text: string;
  value?: string;
  score?: number;
  recommendation?: string;
  flag?: 'green' | 'red';
  endQuiz?: boolean;
  result?: string;
  nextQuestion?: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  question?: string;
  description?: string;
  type: string;
  options: QuizOption[];
  required?: boolean;
  placeholder?: string;
}

export interface SeverityThreshold {
  min: number;
  max: number;
  color?: string;
}

export interface ScoringRule {
  if: Record<string, string | string[]>;
  then: string;
}

export interface QuizScoring {
  type?: string;
  severityThresholds?: Record<string, SeverityThreshold>;
  thresholds?: Record<string, SeverityThreshold>;
  results?: Record<string, QuizResultData>;
  resultMessages?: Record<string, QuizResultData>;
  logic?: {
    rules: ScoringRule[];
  };
}

export interface QuizResultData {
  title?: string;
  severity?: string;
  message?: string;
  summary?: string;
  explanation?: string;
  recommendations?: string[];
  warnings?: string[];
  nextSteps?: string[];
  outcome?: string;
  totalScore?: number;
  percentage?: number;
  correctCount?: number;
  totalQuestions?: number;
  level?: string;
  color?: string;
  recommendation?: string;
}

export interface RelatedContent {
  title: string;
  description: string;
  url: string;
}

export interface Quiz {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  duration: number;
  priority: number;
  featured?: boolean;
  questions: QuizQuestion[];
  scoring: QuizScoring;
  metadata?: {
    relatedQuizzes?: string[];
    relatedWhitePapers?: string[];
    ctaText?: string;
    ctaUrl?: string;
  };
}

export interface QuizAnswer {
  questionId: string;
  answer: string | string[];
  timestamp: string;
}

export interface QuizResult {
  quizId: string;
  quizSlug: string;
  answers: QuizAnswer[];
  result: QuizResultData;
  duration: number;
  completedAt: string;
}

export interface QuizSession {
  id?: string;
  quizId: string;
  answers: QuizAnswer[];
  currentQuestionIndex: number;
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
  result?: QuizResultData;
}
