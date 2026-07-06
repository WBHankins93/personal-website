"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { experiences } from "@/data/experiences";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/animation-configs/ease";

export default function Experience() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="px-6 md:px-8 py-16 md:py-20 bg-paper-alt border-b border-line">
      <div className="mx-auto max-w-3xl">
        <div className="rule-label font-mono text-[0.7rem] tracking-[0.16em] uppercase text-ink-muted">
          <span className="text-clay">No. 04</span>
          <span>Experience</span>
          <span className="rule-line" />
        </div>
        <h2 className="mt-4 font-heading font-bold text-ink tracking-tight text-[clamp(1.75rem,3.5vw,2.5rem)]">
          Where the track record comes from.
        </h2>

        <ol className="mt-12 relative border-l border-line list-none">
          {experiences.map((exp, i) => (
            <motion.li
              key={exp.company}
              className="relative pl-8 pb-12 last:pb-0"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: EASE.easeOut }}
            >
              <span className="absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-paper-alt" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-heading font-semibold text-ink text-[1.2rem]">
                  {exp.company}
                </h3>
                <span className="font-mono text-[0.72rem] text-ink-muted whitespace-nowrap">
                  {exp.period}
                </span>
              </div>
              {exp.roleProgression ? (
                <div className="mt-1">
                  <p className="font-heading text-accent text-[0.95rem]">
                    IBM progression
                  </p>
                  <ol className="mt-2 grid gap-1 list-decimal pl-5 font-heading text-accent text-[0.95rem]">
                    {exp.roleProgression.map((role) => (
                      <li key={role}>{role}</li>
                    ))}
                  </ol>
                </div>
              ) : (
                <p className="mt-0.5 font-heading text-accent text-[0.95rem]">
                  {exp.role}
                </p>
              )}
              <p className="mt-3 font-body text-ink-soft leading-relaxed">
                {exp.summary}
              </p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-4">
          <a
            href="/Ben_Hankins_SE_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-line-strong hover:border-ink text-ink font-heading font-medium text-[0.95rem] px-5 py-3 no-underline transition-colors"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
