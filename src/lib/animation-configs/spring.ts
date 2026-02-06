/**
 * Spring physics presets for Framer Motion
 * These provide natural, physics-based animations
 */
export const SPRING = {
  gentle: {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
    mass: 1,
  },
  bouncy: {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
    mass: 0.5,
  },
  snappy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 25,
    mass: 0.3,
  },
  smooth: {
    type: "spring" as const,
    stiffness: 200,
    damping: 30,
    mass: 1,
  },
} as const;

export type SpringKey = keyof typeof SPRING;
