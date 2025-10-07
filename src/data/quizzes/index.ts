/**
 * Quiz Data Index
 *
 * This file exports all quiz definitions and provides utility functions
 * for working with quiz data.
 */

import windshieldSafety from './windshield-safety.json';
import adasCalibration from './adas-calibration.json';
import repairReplace from './repair-replace.json';
import installerQualified from './installer-qualified.json';
import insuranceCoverage from './insurance-coverage.json';

// Export individual quizzes
export { windshieldSafety, adasCalibration, repairReplace, installerQualified, insuranceCoverage };

// Export all quizzes as an array
export const allQuizzes = [
  windshieldSafety,
  adasCalibration,
  repairReplace,
  installerQualified,
  insuranceCoverage
] as const;

// Export featured quizzes (priority 1-3)
export const featuredQuizzes = allQuizzes.filter(quiz => quiz.featured);

// Utility function to get quiz by slug
export function getQuizBySlug(slug: string) {
  return allQuizzes.find(quiz => quiz.slug === slug);
}

// Utility function to get quiz by ID
export function getQuizById(id: string) {
  return allQuizzes.find(quiz => quiz.id === id);
}

// Utility function to get quizzes sorted by priority
export function getQuizzesByPriority() {
  return [...allQuizzes].sort((a, b) => a.priority - b.priority);
}

// Export quiz count
export const TOTAL_QUIZZES = allQuizzes.length;
