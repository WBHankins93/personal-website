"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { labs, sproutflowCallout } from "@/data/labs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/animation-configs/ease";

export default function Labs() {
  const reduce = useReducedMotion();
  const [featured, ...rest] = labs;

  return (
    <section id="labs" className="px-6 md:px-8 py-16 md:py-20 border-b border-line">
      <div className="mx-auto max-w-6xl">
        <div className="rule-label font-mono text-[0.7rem] tracking-[0.16em] uppercase text-ink-muted">
          <span className="text-clay">No. 05</span>
          <span>Open Source &amp; Labs</span>
          <span className="rule-line" />
        </div>
        <h2 className="mt-4 font-heading font-bold text-ink tracking-tight text-[clamp(1.75rem,3.5vw,2.5rem)] max-w-[24ch]">
          Where I keep the curiosity sharp.
        </h2>

        {/* Featured: Solutions Playbook spans the full width above the grid */}
        <motion.a
          href={featured.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-12 flex flex-col rounded-xl border border-line-strong bg-paper p-7 md:p-8 no-underline transition-colors hover:border-accent"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: EASE.easeOut }}
        >
          <span className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-clay">
            Flagship
          </span>
          <div className="mt-2 flex items-start justify-between gap-3">
            <h3 className="font-heading font-semibold text-ink text-[1.35rem]">
              {featured.name}
            </h3>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-ink-muted transition-colors group-hover:text-accent" />
          </div>
          <p className="mt-2 font-body text-ink-soft leading-relaxed text-[1rem] max-w-[60ch]">
            {featured.description}
          </p>
        </motion.a>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rest.map((lab, i) => (
            <motion.a
              key={lab.name}
              href={lab.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border border-line bg-paper p-6 no-underline transition-colors hover:border-line-strong"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: EASE.easeOut }}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-heading font-semibold text-ink text-[1.05rem]">
                  {lab.name}
                </h3>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-muted transition-colors group-hover:text-accent" />
              </div>
              <p className="mt-2 font-body text-ink-soft leading-relaxed text-[0.95rem]">
                {lab.description}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Single Sproutflow Studio callout */}
        <p className="mt-8 font-body text-ink-soft text-[0.95rem]">
          <a
            href={sproutflowCallout.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-heading font-medium text-accent hover:text-accent-hover no-underline"
          >
            {sproutflowCallout.label} <ArrowUpRight className="h-4 w-4" />
          </a>
        </p>
      </div>
    </section>
  );
}
