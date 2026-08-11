"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, MousePointer2, Play } from "lucide-react";
import { featuredProjects, supportingWork, type Project } from "@/data/projects";
import { MOTION, revealVariants, staggerVariants } from "@/lib/animation-configs/motion";
import { PROJECT_SIGNAL_CLASS } from "@/lib/project-signals";
import { ProjectMicroWorld } from "./ProjectMicroWorlds";

const gridPlacement = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-8",
] as const;

function MotionToggle({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={`${active ? "Pause" : "Play"} ${label} animation`}
      className="project-signal-control absolute right-2.5 top-2.5 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border bg-paper-card/90 shadow-sm transition-colors hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)] md:right-3 md:top-3 md:h-8 md:w-8"
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
        <ProjectMicroWorld
          id={project.microWorld}
          play={inView}
          active={active}
          reduced={reduce}
        />
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

function BreadthCard() {
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
      className="signal-breadth project-signal-card group relative flex min-h-[31rem] flex-col overflow-hidden rounded-2xl border border-line shadow-[0_18px_45px_-38px_rgba(34,27,18,0.55)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong md:col-span-4"
    >
      <div className="project-signal-stage relative h-60 shrink-0 overflow-hidden border-b border-line md:h-64">
        <ProjectMicroWorld id="breadth" play={inView} active={active} reduced={reduce} />
        {!reduce && <MotionToggle active={engaged} onClick={() => setEngaged((value) => !value)} label="supporting work" />}
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.13em] text-ink-muted">Supporting range</span>
        <h3 className="mt-4 font-heading text-[clamp(1.55rem,3vw,2rem)] font-bold tracking-tight text-ink">
          Depth, without the dump.
        </h3>
        <p className="mt-3 font-body text-[0.98rem] leading-relaxed text-ink-soft">
          The supporting work stays visible, with its real stage intact, without competing with the three stories that best represent the craft.
        </p>
        <ul className="mt-5 grid gap-2 list-none">
          {supportingWork.map((work) => (
            <li key={work.name} className="flex items-baseline justify-between gap-3 border-b border-line pb-2 last:border-0">
              <span className="font-heading text-[0.82rem] font-semibold text-ink">{work.name}</span>
              <span className="text-right font-mono text-[0.52rem] uppercase tracking-wide text-ink-muted">{work.stage}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
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
              <motion.span
                className="rule-line origin-left"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={reduce ? undefined : { scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: MOTION.duration.slow, ease: MOTION.ease.easeOut }}
              />
            </div>
            <Heading className="mt-4 max-w-[18ch] font-heading text-[clamp(2rem,4.5vw,3.35rem)] font-bold leading-[1.02] tracking-tight text-ink">
              Three systems. Three different kinds of depth.
            </Heading>
          </div>
          {!compactHeader && (
            <p className="max-w-[42ch] font-body text-[1.02rem] leading-relaxed text-ink-soft md:col-span-4 md:justify-self-end">
              Each project is presented as a small working model: what moves, where judgment lives, and how the pieces hold together.
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
          <BreadthCard />
        </motion.div>
      </div>
    </section>
  );
}
