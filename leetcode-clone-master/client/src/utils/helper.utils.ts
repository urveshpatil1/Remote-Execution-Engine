import { Difficulty } from '../interfaces/problems.interface';

const difficultyColors: { [key: string]: string } = {
  EASY: 'text-green-500',
  MEDIUM: 'text-yellow-500',
  HARD: 'text-red-500',
};

/* This function is used to generate classname for the difficuty column in problemsList page */
export const getColorClass = (difficulty: Difficulty): string => {
  return difficultyColors[difficulty.toUpperCase()] || '';
};
