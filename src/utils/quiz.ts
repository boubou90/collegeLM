import type { Quiz } from '../data/quizzes';

/**
 * Get a quiz by ID from a quiz array
 */
export function getQuizById(quizzes: Quiz[], id: string): Quiz | undefined {
  return quizzes.find(quiz => quiz.id === id);
}

/**
 * Validate quiz ID format
 */
export function isValidQuizId(id: string): boolean {
  return /^[a-z0-9-]+$/.test(id);
}