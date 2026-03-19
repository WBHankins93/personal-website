'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import HeroFrame from './HeroFrame';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE } from '@/lib/animation-configs/ease';

const TypedRole = dynamic(() => import('./TypedRole'), { ssr: false });

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE.smooth },
  };
}

const stats = [
  { num: '$10.1M', label: 'Deal Contributed' },
  { num: '99.9%', label: 'Uptime Maintained' },
  { num: '80%', label: 'Faster Deploys' },
  { num: '6+', label: 'Years Experience' },
];

export default function MatrixHero() {
  const prefersReducedMotion = useReducedMotion();
  const anim = (delay: number) => (prefersReducedMotion ? {} : fadeUp(delay));

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-16 relative"
    >
      <HeroFrame />

      <div className="relative z-[2]">
        {/* Status pill */}
        <motion.div
          className="inline-flex items-center gap-2.5 font-mono text-[0.7rem] text-matrix tracking-[0.12em] uppercase mb-8 py-[0.45rem] px-4 border border-mglow-border rounded-full"
          style={{ background: 'rgba(0,255,65,0.02)' }}
          {...anim(0.2)}
        >
          <span className="w-1.5 h-1.5 bg-matrix rounded-full animate-pulse-glow" />
          Open to Opportunities
        </motion.div>

        {/* Name */}
        <motion.div className="relative" {...anim(0.4)}>
          {/* Glow layer */}
          <div
            className="absolute top-0 left-0 font-sixtyfour leading-none tracking-tight text-matrix pointer-events-none select-none -z-[1]"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              opacity: 0.06,
              filter: 'blur(40px)',
            }}
          >
            Ben Hankins
          </div>
          <h1
            className="font-sixtyfour leading-none tracking-tight mb-5 matrix-gradient-text"
            style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)' }}
          >
            Ben Hankins
          </h1>
        </motion.div>

        {/* Statement with typed role */}
        <motion.p
          className="font-heading text-mtext-dim leading-snug mb-4"
          style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', fontWeight: 400 }}
          {...anim(0.6)}
        >
          I build <TypedRole />
          <span className="text-matrix-light font-medium">.</span>
        </motion.p>

        {/* Sub-paragraph */}
        <motion.p
          className="font-body text-mtext-light leading-relaxed mb-10 max-w-[620px]"
          style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}
          {...anim(0.75)}
        >
          From enterprise architecture at IBM to production reliability at Prove AI to shipping
          client apps through Sproutflow — 6+ years of turning complex problems into working
          software.
        </motion.p>

        {/* CTAs */}
        <motion.div className="flex flex-wrap gap-4 items-center" {...anim(0.8)}>
          <a
            href="#contact"
            className="font-heading text-[0.8rem] font-medium tracking-[0.04em] text-mbg-primary bg-matrix py-[0.7rem] px-7 rounded-[4px] no-underline inline-flex items-center gap-2 relative transition-all duration-300 hover:bg-matrix-light"
          >
            {/* Radial glow behind button */}
            <span
              className="absolute -inset-1.5 rounded-[10px] -z-[1]"
              style={{
                background: 'radial-gradient(circle, rgba(0,255,65,0.15) 0%, transparent 70%)',
              }}
            />
            Work With Me <span>→</span>
          </a>
          <a
            href="#work"
            className="font-heading text-[0.8rem] text-mtext-dim py-[0.7rem] px-7 border border-mborder-hover rounded-[4px] no-underline transition-all duration-300 hover:text-mtext-primary hover:border-mglow-borderHover"
          >
            View My Work
          </a>
        </motion.div>

        {/* Micro-copy */}
        <motion.p
          className="font-body text-[0.8rem] text-mtext-muted mt-3 tracking-[0.01em]"
          {...anim(0.9)}
        >
          Currently open to full-stack, solutions engineering, and AI-focused roles.
        </motion.p>

        {/* Stats row */}
        <motion.div
          className="flex flex-wrap gap-8 md:gap-12 mt-16 pt-8 border-t border-mborder-rule"
          {...anim(1.0)}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-heading text-[1.6rem] font-semibold text-matrix-light tracking-tight">
                {s.num}
              </div>
              <div className="font-mono text-[0.6rem] text-mtext-muted tracking-[0.1em] uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
