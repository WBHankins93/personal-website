"use client";

import { motion } from "framer-motion";
import { buildCategories } from "@/data/whatibuild";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/animation-configs/ease";

export default function WhatIBuild() {
  const reduce = useReducedMotion();

  return (
    <section id="build" className="px-6 md:px-8 py-16 md:py-20 bg-paper-alt border-b border-line">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE.easeOut }}
        >
          <div className="rule-label font-mono text-[0.7rem] tracking-[0.16em] uppercase text-ink-muted">
            <span className="text-clay">No. 02</span>
            <span>What I Build</span>
            <span className="rule-line" />
          </div>
          <h2 className="mt-4 font-heading font-bold text-ink tracking-tight text-[clamp(1.75rem,3.5vw,2.5rem)] max-w-[20ch]">
            Four kinds of work, one throughline.
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-line rounded-xl overflow-hidden border border-line">
          {buildCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                className="bg-paper p-7 md:p-8"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: EASE.easeOut }}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-heading font-semibold text-ink text-[1.2rem]">
                  {cat.name}
                </h3>
                <p className="mt-2 font-body text-ink-soft leading-relaxed text-[1rem]">
                  {cat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
