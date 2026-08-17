"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { experiences } from "@/data/experiences";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/animation-configs/ease";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 70%"],
  });
  const timelineProgress = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 28,
    mass: 0.35,
  });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="border-b border-line bg-paper-alt px-6 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.header
          className="self-start lg:sticky lg:top-28 lg:col-span-4"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? { opacity: 1, y: 0 } : undefined}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE.easeOut }}
        >
          <div className="rule-label font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
            <span className="text-clay">No. 03</span>
            <span>Experience</span>
            <span className="rule-line scroll-rule" />
          </div>
          <h2 className="mt-5 max-w-[11ch] font-heading text-[clamp(2.2rem,4vw,3.6rem)] font-bold leading-[0.98] tracking-tight text-ink">
            From customer room to production.
          </h2>
          <p className="mt-5 max-w-[38ch] font-body text-[1rem] leading-relaxed text-ink-soft">
            A career connecting technical discovery, solution design, cloud infrastructure, and the work of actually shipping.
          </p>

          <div className="ledger-grid mt-8 border-y border-line-strong py-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-muted">
                Throughline
              </span>
              <span className="h-px flex-1 bg-line-strong" />
              <ArrowDownRight className="h-4 w-4 text-clay" aria-hidden />
            </div>
            <p className="mt-3 font-heading text-[0.95rem] font-semibold leading-relaxed text-ink">
              Discover the problem. Design the system. Own the outcome.
            </p>
          </div>

          <a
            href="/Ben_Hankins_SE_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 border-b border-ink pb-0.5 font-heading text-[0.92rem] font-semibold text-ink no-underline transition-colors hover:border-accent hover:text-accent"
          >
            <Download className="h-4 w-4" aria-hidden /> Download resume
          </a>
        </motion.header>

        <ol className="relative list-none lg:col-span-8">
          <span className="absolute bottom-0 left-0 top-0 w-px bg-line-strong" aria-hidden />
          <motion.span
            className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent"
            style={{ scaleY: reduce ? 1 : timelineProgress }}
            aria-hidden
          />

          {experiences.map((exp, i) => (
            <motion.li
              key={exp.company}
              className="relative pb-5 pl-6 last:pb-0 md:pl-9"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={reduce ? { opacity: 1, y: 0 } : undefined}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.48, delay: i * 0.05, ease: EASE.easeOut }}
            >
              <span className="absolute -left-[5.5px] top-7 h-[11px] w-[11px] rounded-full border-2 border-accent bg-paper-alt ring-4 ring-paper-alt" />
              <article className="group relative overflow-hidden rounded-xl border border-line bg-paper-card p-5 shadow-[0_18px_45px_-40px_rgba(34,27,18,0.55)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_24px_55px_-42px_rgba(34,27,18,0.72)] md:p-7">
                <span
                  className="pointer-events-none absolute -right-1 -top-5 font-heading text-[5.5rem] font-bold leading-none text-paper-deep/65"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative flex flex-wrap items-start justify-between gap-x-6 gap-y-2 pr-12">
                  <div>
                    {exp.href ? (
                      <a
                        href={exp.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-heading text-[1.25rem] font-bold text-ink no-underline transition-colors hover:text-accent"
                      >
                        {exp.company}
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </a>
                    ) : (
                      <h3 className="font-heading text-[1.25rem] font-bold text-ink">{exp.company}</h3>
                    )}
                    <p className="mt-1 font-heading text-[0.95rem] font-medium text-accent">{exp.role}</p>
                  </div>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.06em] text-ink-muted whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                {exp.roleProgression && (
                  <ol className="relative mt-5 grid list-none gap-2 border-l border-line pl-4 sm:grid-cols-3 sm:border-l-0 sm:border-t sm:pl-0 sm:pt-4">
                    {exp.roleProgression.map((role, roleIndex) => (
                      <li key={role} className="relative font-mono text-[0.6rem] leading-relaxed text-ink-muted">
                        <span className="absolute -left-[19px] top-1.5 h-2 w-2 rounded-full bg-clay sm:-top-[20.5px] sm:left-0" aria-hidden />
                        <span className="text-clay">{roleIndex + 1}.</span> {role}
                      </li>
                    ))}
                  </ol>
                )}

                <p className="relative mt-5 max-w-[64ch] font-body leading-relaxed text-ink-soft">
                  {exp.summary}
                </p>

                {exp.href && (
                  <a
                    href={exp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative mt-5 inline-flex items-center gap-1.5 border-b border-accent font-mono text-[0.62rem] uppercase tracking-[0.08em] text-accent no-underline transition-colors hover:text-accent-hover"
                  >
                    Visit Sproutflow <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                )}
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
