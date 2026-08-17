"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MousePointer2, Play, Sprout } from "lucide-react";
import {
  featuredProjects,
  playbookBranches,
  sproutflow,
  supportingWork,
  type Project,
} from "@/data/projects";
import { revealVariants, staggerVariants } from "@/lib/animation-configs/motion";
import { PROJECT_SIGNAL_CLASS } from "@/lib/project-signals";
import { ProjectMicroWorld } from "./ProjectMicroWorlds";

const gridPlacement = [
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
] as const;

function MotionToggle({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={`${active ? "Pause" : "Play"} ${label} animation`}
      className="project-signal-control stage-pin absolute right-2.5 top-2.5 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border bg-paper-card/90 shadow-sm transition-colors hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)] md:right-3 md:top-3 md:h-8 md:w-8"
    >
      {active ? <MousePointer2 className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
    </button>
  );
}

function ProjectCard({ project, className }: { project: Project; className: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.25, margin: "-8% 0px" });
  const reduce = Boolean(useReducedMotion());
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const active = hovered || focused || engaged;

  return (
    <motion.article
      ref={ref}
      variants={revealVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      className={`${PROJECT_SIGNAL_CLASS[project.microWorld]} project-signal-card group relative flex min-h-[31rem] flex-col overflow-hidden rounded-2xl border border-line shadow-[0_18px_45px_-38px_rgba(34,27,18,0.55)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_24px_60px_-42px_rgba(34,27,18,0.68)] focus-within:border-line-strong ${className}`}
    >
      <div className="project-signal-stage relative h-60 shrink-0 overflow-hidden border-b border-line md:h-64">
        <div className="scroll-drift h-full w-full">
          <ProjectMicroWorld
            id={project.microWorld}
            play={inView}
            active={active}
            reduced={reduce}
          />
        </div>
        {!reduce && <MotionToggle active={engaged} onClick={() => setEngaged((value) => !value)} label={project.name} />}
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.13em] text-ink-muted">{project.role}</span>
          <span className="project-signal-badge inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.08em]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal)]" />
            {project.stage}
          </span>
        </div>

        <h3 className="mt-4 font-heading text-[clamp(1.55rem,3vw,2.1rem)] font-bold tracking-tight text-ink">
          {project.name}
        </h3>
        <p className="mt-3 max-w-[58ch] font-body text-[0.98rem] leading-relaxed text-ink-soft">
          {project.value}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.proofPoints.map((point) => (
            <span key={point} className="project-signal-chip rounded-md border px-2.5 py-1.5 font-mono text-[0.62rem]">
              {point}
            </span>
          ))}
        </div>

        {project.slug === "living-playbooks" && (
          <div className="mt-5 border-l-2 border-[var(--signal)] pl-3">
            <p className="font-mono text-[0.56rem] uppercase tracking-[0.12em] text-ink-muted">
              The connected playbooks
            </p>
            <p className="mt-2 font-heading text-[0.78rem] font-medium leading-relaxed text-ink-soft">
              {playbookBranches.join(" · ")}
            </p>
          </div>
        )}

        <div className="mt-auto pt-6">
          <Link
            href={`/projects/${project.slug}`}
            className="project-signal-link inline-flex items-center gap-2 font-heading text-[0.95rem] font-semibold no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
          >
            View case study
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function SproutflowCallout() {
  return (
    <motion.aside
      variants={revealVariants}
      className="mt-6 border-y border-line-strong py-8 md:grid md:grid-cols-12 md:items-center md:gap-8"
    >
      <div className="flex items-start gap-4 md:col-span-7">
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-paper">
          <Sprout className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">
            {sproutflow.stage}
          </p>
          <h3 className="mt-2 font-heading text-[clamp(1.65rem,3vw,2.3rem)] font-bold tracking-tight text-ink">
            {sproutflow.name}
          </h3>
        </div>
      </div>
      <div className="mt-5 md:col-span-5 md:mt-0">
        <p className="font-body text-[1rem] leading-relaxed text-ink-soft">
          {sproutflow.summary}
        </p>
        <a
          href={sproutflow.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 border-b border-accent font-heading text-[0.92rem] font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
        >
          Visit Sproutflow <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </motion.aside>
  );
}

function WorkshopList() {
  return (
    <motion.div variants={revealVariants} className="mt-10 grid gap-5 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-4">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-muted">
          Also in the workshop
        </p>
        <p className="mt-2 max-w-[30ch] font-body text-[0.92rem] leading-relaxed text-ink-soft">
          Smaller builds, shown at their actual stage.
        </p>
      </div>
      <ul className="list-none border-t border-line-strong md:col-span-8">
        {supportingWork.map((work) => (
          <li
            key={work.name}
            className="grid gap-1 border-b border-line py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
          >
            <div>
              <span className="font-heading text-[1rem] font-semibold text-ink">{work.name}</span>
              <span className="ml-3 font-mono text-[0.58rem] uppercase tracking-wide text-ink-muted">
                {work.capability}
              </span>
            </div>
            <span className="font-mono text-[0.6rem] uppercase tracking-wide text-ink-muted">
              {work.stage}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function ProjectBento({ compactHeader = false }: { compactHeader?: boolean }) {
  const reduce = Boolean(useReducedMotion());
  const Heading = compactHeader ? motion.h1 : motion.h2;

  return (
    <section id="work" className="border-b border-line px-6 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={{ once: true, amount: 0.45 }}
          variants={revealVariants}
          className={compactHeader ? "max-w-3xl" : "grid gap-8 md:grid-cols-12 md:items-end"}
        >
          <div className={compactHeader ? "" : "md:col-span-8"}>
            <div className="rule-label font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
              <span className="text-clay">No. 02</span>
              <span>Selected work</span>
              <span className="rule-line scroll-rule" />
            </div>
            <Heading className="mt-4 max-w-[18ch] font-heading text-[clamp(2rem,4.5vw,3.35rem)] font-bold leading-[1.02] tracking-tight text-ink">
              Selected systems, built end to end.
            </Heading>
          </div>
          {!compactHeader && (
            <p className="max-w-[42ch] font-body text-[1.02rem] leading-relaxed text-ink-soft md:col-span-4 md:justify-self-end">
              Detailed case studies up front. Client work and active builds follow at the level of detail they need.
            </p>
          )}
        </motion.div>

        <motion.div
          variants={staggerVariants}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={{ once: true, amount: 0.08 }}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5"
        >
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} className={gridPlacement[index]} />
          ))}
        </motion.div>

        <motion.div
          variants={staggerVariants}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={{ once: true, amount: 0.12 }}
        >
          <SproutflowCallout />
          <WorkshopList />
        </motion.div>
      </div>
    </section>
  );
}
