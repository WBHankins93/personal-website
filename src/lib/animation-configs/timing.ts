/**
 * Standardized animation timing constants
 * Use these for consistent animation durations across the app
 */
export const TIMING = {
  fast: 200,
  normal: 400,
  slow: 800,
  verySlow: 1200,
} as const;

export type TimingKey = keyof typeof TIMING;
