/**
 * Custom easing curves for animations
 * These provide natural, polished motion
 */
export const EASE = {
  // Standard easing curves
  easeIn: [0.4, 0, 1, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  
  // Custom curves for specific effects
  smooth: [0.25, 0.1, 0.25, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  sharp: [0.4, 0, 0.6, 1] as const,
} as const;

export type EaseKey = keyof typeof EASE;
