'use client';

import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { TIMING } from '@/lib/animation-configs/timing';
import { EASE } from '@/lib/animation-configs/ease';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const directionVariants: Record<string, Variants> = {
  left: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  up: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  threshold = 0.25,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: once,
  });

  const variants = directionVariants[direction] || directionVariants.up;

  // If reduced motion is preferred, show content immediately
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration: TIMING.normal / 1000,
        delay: delay / 1000,
        ease: EASE.easeOut,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
