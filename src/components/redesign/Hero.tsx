"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/animation-configs/ease";

const stats = [
  { num: "$10.1M", label: "Deal Contributed" },
  { num: "99.9%", label: "Uptime Maintained" },
  { num: "80%", label: "Faster Deploys" },
  { num: "7+", label: "Years Experience" },
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
      className="relative scroll-mt-0 px-6 md:px-8 pt-28 md:pt-32 pb-16 md:pb-24"
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-10 md:gap-14 items-center">
        {/* Text column */}
        <div className="order-2 md:order-1">
          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-alt px-3.5 py-1.5 mb-6"
            {...reveal(0.05)}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-status-prod)]" />
            <span className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-ink-muted">
              Open to Opportunities
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-heading font-bold text-ink leading-[1.02] tracking-tight"
            style={{ fontSize: "clamp(2.75rem, 6vw, 4.75rem)" }}
            {...reveal(0.12)}
          >
            Ben Hankins
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="mt-5 font-heading text-ink leading-snug max-w-[36ch]"
            style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)", fontWeight: 500 }}
            {...reveal(0.2)}
          >
            Solutions Architect by career. Builder by default. The products are
            how I stay sharp.
          </motion.p>

          {/* Subline */}
          <motion.p
            className="mt-5 font-body text-ink-soft leading-relaxed max-w-[52ch] text-[1.05rem]"
            {...reveal(0.28)}
          >
            7+ years across enterprise architecture, cloud infrastructure, and
            customer-facing engineering with production software to show for it.
          </motion.p>

          {/* CTAs */}
          <motion.div className="mt-8 flex flex-wrap items-center gap-3" {...reveal(0.36)}>
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-md bg-accent hover:bg-accent-hover transition-colors text-white font-heading font-medium text-[0.95rem] px-5 py-3 no-underline"
            >
              View Products <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/Ben_Hankins_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-line-strong hover:border-ink text-ink font-heading font-medium text-[0.95rem] px-5 py-3 no-underline transition-colors"
            >
              Resume
            </a>
            <a
              href="https://www.linkedin.com/in/ben-hankins/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center gap-2 rounded-md text-ink-soft hover:text-accent font-heading font-medium text-[0.95rem] px-3 py-3 no-underline transition-colors"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </motion.div>

          {/* Stat row — above the fold */}
          <motion.div
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 border-t border-line pt-6 max-w-[40rem]"
            {...reveal(0.44)}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-heading text-[1.5rem] font-semibold text-ink tracking-tight leading-none">
                  {s.num}
                </div>
                <div className="mt-1.5 font-mono text-[0.62rem] tracking-[0.08em] uppercase text-ink-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Photo column */}
        <motion.div
          className="order-1 md:order-2 flex justify-center md:justify-end"
          {...reveal(0.1)}
        >
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-full md:max-w-[22rem] md:aspect-[4/5] md:h-auto overflow-hidden rounded-2xl border border-line bg-paper-alt">
            <Image
              src="/BH-headshot.png"
              alt="Ben Hankins"
              fill
              priority
              sizes="(max-width: 768px) 288px, 352px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
