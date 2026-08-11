import type { Variants } from "framer-motion";
import { EASE } from "./ease";

export const MOTION = {
  duration: {
    quick: 0.18,
    base: 0.32,
    reveal: 0.58,
    slow: 0.9,
  },
  spring: {
    smooth: { stiffness: 150, damping: 28, mass: 0.55 },
    progress: { stiffness: 110, damping: 28, mass: 0.25 },
  },
  ease: EASE,
} as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION.duration.reveal, ease: EASE.easeOut },
  },
};
export const staggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};
