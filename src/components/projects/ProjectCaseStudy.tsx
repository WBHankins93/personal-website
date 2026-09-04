"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, CircleDot, Lightbulb, Route } from "lucide-react";
import type { Project } from "@/data/projects";
import { MOTION, revealVariants, staggerVariants } from "@/lib/animation-configs/motion";
import { PROJECT_SIGNAL_CLASS } from "@/lib/project-signals";
import { ProjectMicroWorld } from "./ProjectMicroWorlds";

// No scroll-reveal below the fold (docs/DESIGN.md Migration Note #1): these
// sections render visible by default instead of sitting at opacity:0 behind
// a `whileInView` gate.
function ListSection({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
  return (
    <section className="border-t border-line py-10 md:grid md:grid-cols-12 md:gap-8 md:py-14">
      <div className="md:col-span-4">
        <div className="flex items-center gap-2 text-[var(--signal)]">
          {icon}
          <h2 className="font-body text-[1.2rem] font-semibold text-ink">{title}</h2>
        </div>
      </div>
      <ul className="mt-6 grid gap-4 list-none md:col-span-8 md:mt-0">
        {items.map((item) => (
          <li key={item} className="flex gap-3 font-body leading-relaxed text-ink-soft">
            <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--signal)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default function ProjectCaseStudy({ project }: { project: Project }) {
  const visualRef = useRef<HTMLDivElement>(null);
  const inView = useInView(visualRef, { amount: 0.2 });
  const reduce = Boolean(useReducedMotion());
  const [active, setActive] = useState(false);

  return (
    <article className={`${PROJECT_SIGNAL_CLASS[project.microWorld]} px-6 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32`}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "visible"}
          variants={staggerVariants}
          className="grid gap-9 md:grid-cols-12 md:items-end"
        >
          <motion.div variants={revealVariants} className="md:col-span-8">
            <Link
              href="/projects"
              className="project-signal-link inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-muted no-underline transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All projects
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="project-signal-badge rounded-full border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em]">
                {project.stage}
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-ink-muted">{project.role}</span>
            </div>
            <h1 className="mt-5 max-w-[12ch] font-body text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.035em] text-ink">
              {project.name}<span className="text-[var(--signal)]">.</span>
            </h1>
          </motion.div>
          <motion.div variants={revealVariants} className="md:col-span-4">
            <p className="font-body text-[1.2rem] font-medium leading-snug text-ink">{project.value}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-signal-link inline-flex items-center gap-1.5 font-body text-[0.9rem] font-semibold no-underline transition-colors"
                >
                  {link.label} <ArrowUpRight className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          ref={visualRef}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: MOTION.duration.slow, delay: 0.18, ease: MOTION.ease.easeOut }}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          className="project-signal-stage relative mt-12 h-[22rem] overflow-hidden rounded-xs border border-line-strong shadow-[0_24px_70px_-52px_rgba(34,27,18,0.75)] md:h-[32rem]"
        >
          <ProjectMicroWorld id={project.microWorld} play={inView} active={active} reduced={reduce} />
        </motion.div>

        <div className="mx-auto mt-16 max-w-5xl md:mt-24">
          {/* No scroll-reveal below the fold — see the note on ListSection above. */}
          <section className="grid gap-6 pb-12 md:grid-cols-12 md:gap-8 md:pb-16">
            <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--signal)] md:col-span-4">The challenge</h2>
            <p className="font-body text-[clamp(1.15rem,2.3vw,1.55rem)] leading-relaxed text-ink md:col-span-8">
              {project.caseStudy.challenge}
            </p>
          </section>

          <ListSection title="The system" items={project.caseStudy.system} icon={<Route className="h-4 w-4" />} />
          <ListSection title="Important decisions" items={project.caseStudy.decisions} icon={<Lightbulb className="h-4 w-4" />} />

          <section className="border-t border-line py-10 md:py-14">
            <div className="flex items-center gap-2">
              <CircleDot className="h-4 w-4 text-[var(--signal)]" />
              <h2 className="font-body text-[1.2rem] font-semibold text-ink">How the work moves</h2>
            </div>
            <ol className="mt-8 grid gap-px overflow-hidden rounded-xs border border-line bg-line list-none sm:grid-cols-2 lg:grid-cols-5">
              {project.caseStudy.walkthrough.map((step, index) => (
                <li key={step} className="bg-paper p-5">
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[var(--signal)]">Step {index + 1}</span>
                  <p className="mt-3 font-body text-[0.95rem] font-semibold leading-snug text-ink">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <ListSection title="Current evidence" items={project.caseStudy.evidence} icon={<Check className="h-4 w-4" />} />
          <ListSection title="What it taught me" items={project.caseStudy.lessons} icon={<Lightbulb className="h-4 w-4" />} />

          <div className="border-t border-ink pt-10 text-center">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">Continue exploring</p>
            <Link
              href="/projects"
              className="project-signal-link mt-4 inline-flex items-center gap-2 font-body text-[1.15rem] font-semibold no-underline"
            >
              Return to selected work <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
