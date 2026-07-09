"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/animation-configs/ease";

const stats = [
  { num: "$13M", label: "Pipeline Supported" },
  { num: "9+", label: "Enterprise Accounts" },
  { num: "80%", label: "Faster Deploys" },
];

// Named enterprise accounts engaged across IBM Client Engineering + Prove AI.
const accounts = [
  "AT&T",
  "Boeing",
  "Cencora",
  "Kroger",
  "Norfolk Southern",
  "CenterPoint Energy",
  "Hertz",
];

export default function Hero() {
  const reduce = useReducedMotion();
  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE.easeOut },
        };

  return (
    <section
      id="hero"
      className="relative scroll-mt-0 overflow-hidden border-b border-line ledger-grid"
    >
      {/* Atmospheric botanical light */}
      <div className="botanical-wash pointer-events-none absolute inset-0" aria-hidden />

      {/* Vertical edge label: editorial margin mark */}
      <div
        className="pointer-events-none absolute right-3 top-32 hidden lg:block font-mono text-[0.6rem] tracking-[0.35em] uppercase text-ink-muted/70 [writing-mode:vertical-rl]"
        aria-hidden
      >
        Solutions Engineer · Builder by default
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-8 pt-28 md:pt-32 pb-12 md:pb-16">
        {/* Masthead meta row */}
        <motion.div
          className="rule-label font-mono text-[0.7rem] tracking-[0.18em] uppercase text-ink-muted"
          {...reveal(0.04)}
        >
          <span className="text-clay">No. 01</span>
          <span>Portfolio</span>
          <span className="rule-line" />
          <span className="hidden sm:inline">New Orleans, LA</span>
        </motion.div>

        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-10 items-end">
          {/* Text column */}
          <div className="md:col-span-7">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/70 backdrop-blur-sm px-3.5 py-1.5 mb-6"
              {...reveal(0.08)}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-status-prod)] animate-pulse-glow" />
              <span className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-ink-muted">
                Open to Opportunities
              </span>
            </motion.div>

            {/* Oversized editorial headline */}
            <motion.h1
              className="font-heading font-bold text-ink leading-[0.92] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3.25rem, 8.5vw, 6.25rem)" }}
              {...reveal(0.14)}
            >
              <span className="block">Ben</span>
              <span className="block">
                Hankins<span className="text-clay">.</span>
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="mt-6 font-heading text-ink leading-snug max-w-[34ch]"
              style={{ fontSize: "clamp(1.2rem, 2.1vw, 1.55rem)", fontWeight: 500 }}
              {...reveal(0.22)}
            >
              <span className="text-accent">Solutions Engineer</span> by career.
              Builder by default. The products are how I stay sharp.
            </motion.p>

            {/* Subline */}
            <motion.p
              className="mt-4 font-body text-ink-soft leading-relaxed max-w-[48ch] text-[1.02rem]"
              {...reveal(0.3)}
            >
              7+ years across enterprise architecture, cloud infrastructure, and
              customer-facing engineering, with production software to show for
              it.
            </motion.p>

            {/* CTAs: one solid primary, the rest quiet */}
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
              {...reveal(0.38)}
            >
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-md bg-accent hover:bg-accent-hover transition-colors text-paper font-heading font-medium text-[0.95rem] px-5 py-3 no-underline"
              >
                Explore the Work <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/Ben_Hankins_SE_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-heading font-medium text-[0.95rem] text-ink no-underline border-b border-line-strong hover:border-ink pb-0.5 transition-colors"
              >
                Resume
                <ArrowRight className="h-3.5 w-3.5 -rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ben-hankins/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center gap-1.5 font-heading font-medium text-[0.95rem] text-ink-muted hover:text-accent no-underline transition-colors"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Photo plate: matted field-journal print, bled to the right */}
          <motion.figure
            className="md:col-span-5 relative mx-auto md:mx-0 md:ml-auto w-full max-w-[19rem] md:max-w-[20rem]"
            {...reveal(0.18)}
          >
            <div className="relative rotate-[-1.5deg] rounded-xl border-[6px] border-paper bg-paper shadow-[0_18px_45px_-22px_rgba(34,27,18,0.55)] ring-1 ring-line">
              <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-paper-alt">
                <Image
                  src="/BH-headshot.png"
                  alt="Ben Hankins"
                  fill
                  priority
                  sizes="(max-width: 768px) 304px, 320px"
                  className="object-cover"
                />
              </div>
              {/* Clay index tab */}
              <span className="absolute -top-3 -left-3 inline-flex items-center justify-center rounded-md bg-clay px-2 py-1 font-mono text-[0.62rem] tracking-[0.1em] uppercase text-paper shadow-sm">
                Fig. 01
              </span>
            </div>
            <figcaption className="mt-4 rotate-[-1.5deg] font-mono text-[0.66rem] tracking-[0.06em] uppercase text-ink-muted">
              Ben Hankins, building from New Orleans
            </figcaption>
          </motion.figure>
        </div>

        {/* Ledger stat strip: full width, ruled dividers */}
        <motion.div
          className="mt-14 grid grid-cols-3 border-t border-b border-line"
          {...reveal(0.46)}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="border-l border-line px-2 py-5 first:border-l-0 sm:px-6"
            >
              <div className="font-heading text-[1.7rem] sm:text-[1.9rem] font-bold text-ink tracking-tight leading-none">
                {s.num}
              </div>
              <div className="mt-2 font-mono text-[0.6rem] tracking-[0.1em] uppercase text-ink-muted">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Trusted-by — named enterprise accounts (the names out-punch a count) */}
        <motion.div
          className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-baseline sm:gap-5"
          {...reveal(0.52)}
        >
          <span className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-ink-muted whitespace-nowrap">
            Trusted on engagements with
          </span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {accounts.map((name, i) => (
              <span
                key={name}
                className="flex items-center gap-3 font-heading text-[0.92rem] font-medium text-ink-soft"
              >
                {name}
                {i < accounts.length - 1 && (
                  <span className="text-line-strong" aria-hidden>
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
