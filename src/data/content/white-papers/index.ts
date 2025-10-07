/**
 * White Paper Content Index
 *
 * Centralized exports for all white paper content
 */

import adasCalibrationMandatory from './adas-calibration-mandatory.json';

// Export individual white papers
export { adasCalibrationMandatory };

// Export all white papers as array
export const allWhitePapers = [
  adasCalibrationMandatory,
  // Add more white papers here as they're created
] as const;

// Export published white papers only
export const publishedWhitePapers = allWhitePapers.filter(
  (wp) => wp.status === 'published'
);

// Export featured white papers
export const featuredWhitePapers = publishedWhitePapers.filter(
  (wp) => wp.featured
);

// Export function for featured white papers (for consistency)
export function getFeaturedWhitePapers() {
  return featuredWhitePapers;
}

// Utility functions
export function getWhitePaperBySlug(slug: string) {
  return allWhitePapers.find((wp) => wp.slug === slug);
}

export function getWhitePaperById(id: string) {
  return allWhitePapers.find((wp) => wp.id === id);
}

export function getWhitePapersByCategory(category: string) {
  return publishedWhitePapers.filter((wp) => wp.category === category);
}

export function getWhitePapersByTag(tag: string) {
  return publishedWhitePapers.filter((wp) => wp.tags.includes(tag));
}

export function getWhitePapersByPriority() {
  return [...publishedWhitePapers].sort((a, b) => a.priority - b.priority);
}

// Get related white papers based on tags
export function getRelatedWhitePapers(whitePaperId: string, limit: number = 3) {
  const whitePaper = getWhitePaperById(whitePaperId);
  if (!whitePaper) return [];

  return publishedWhitePapers
    .filter((wp) => wp.id !== whitePaperId)
    .map((wp) => {
      // Calculate relevance score based on shared tags
      const sharedTags = wp.tags.filter((tag) =>
        whitePaper.tags.includes(tag)
      ).length;
      return { whitePaper: wp, score: sharedTags };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.whitePaper);
}

// Export metadata
export const WHITE_PAPER_COUNT = allWhitePapers.length;
export const PUBLISHED_COUNT = publishedWhitePapers.length;

// Categories (will grow as more white papers added)
export const CATEGORIES = [
  'ADAS Safety',
  'Glass Quality',
  'Installation Standards',
  'Insurance & Coverage',
  // Add more as needed
] as const;
