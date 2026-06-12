'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { projects, type Project } from '@/data/projects';
import { categoryLabel, statusColor, projectLink } from '@/lib/project-display';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SPRING } from '@/lib/animation-configs/spring';

/* ------------------------------------------------------------------ */
/*  Layout                                                             */
/*                                                                     */
/*  Card content is sourced from src/data/projects.ts — only the       */
/*  curated selection and arrangement live here.                       */
/* ------------------------------------------------------------------ */

const ROWS: { showcase: string; compact: string[] }[] = [
  { showcase: 'greenlit', compact: ['prompt-library', 'ai-business-plan-generator'] },
  {
    showcase: 'sproutflow-flagship',
    compact: ['solutions-playbook', 'implementation-studio', 'nealy-event-decor'],
  },
];

const IMAGE_FALLBACK_GRADIENT = 'linear-gradient(135deg, #060f06, #0a1a08, #081208)';

function byId(id: string): Project {
  const project = projects.find((p) => p.id === id);
  if (!project) throw new Error(`MatrixProjects: unknown project id "${id}"`);
  return project;
}

/* ------------------------------------------------------------------ */
/*  Showcase Card                                                      */
/* ------------------------------------------------------------------ */

function ShowcaseCard({ project }: { project: Project }) {
  const prefersReducedMotion = useReducedMotion();
  const link = projectLink(project);
  const badgeColor = statusColor(project.status);

  return (
    <motion.div
      className="relative overflow-hidden rounded-[14px] border border-mborder-subtle backdrop-blur-[12px] transition-all duration-[400ms] gradient-border-card h-full flex flex-col"
      style={{ background: 'rgba(10,10,10,0.75)' }}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              y: -4,
              borderColor: 'rgba(0,255,65,0.10)',
              boxShadow:
                '0 8px 32px rgba(0,255,65,0.08), 0 2px 8px rgba(0,255,65,0.04)',
            }
      }
      transition={SPRING.gentle}
    >
      {/* Image area */}
      <div
        className="w-full h-[220px] relative transition-[filter] duration-[400ms] overflow-hidden"
        style={{ background: IMAGE_FALLBACK_GRADIENT }}
      >
        {project.image_url && (
          <Image
            src={project.image_url}
            alt={`${project.name} screenshot`}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-top"
            unoptimized={project.image_url.endsWith('.svg')}
          />
        )}
        {/* Subtle dark fade so badges stay readable */}
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/40 to-transparent z-[1]" />

        {/* Category badge */}
        <div className="absolute top-3 left-3 font-mono text-[0.55rem] tracking-[0.08em] uppercase bg-matrix text-mbg-primary py-[0.2rem] px-2.5 rounded-[3px] font-medium z-[2]">
          {categoryLabel[project.category] ?? project.category}
        </div>

        {/* Status badge */}
        <div
          className="absolute top-3 right-3 font-mono text-[0.55rem] tracking-[0.08em] uppercase py-[0.2rem] px-2.5 rounded-[3px] font-medium z-[2] border"
          style={{
            color: badgeColor,
            borderColor: badgeColor,
            background: 'rgba(0,0,0,0.5)',
          }}
        >
          {project.status}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 px-6 flex flex-col flex-1">
        <h3 className="font-heading text-[1.15rem] font-semibold mb-2 text-mtext-primary">
          {project.name}
        </h3>
        <p className="font-body text-[0.85rem] text-mtext-light leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto mb-4">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[0.55rem] text-mtext-muted py-[0.2rem] px-2 border border-mborder-subtle rounded-[3px]"
            >
              {tech}
            </span>
          ))}
        </div>
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading text-[0.8rem] text-matrix no-underline flex items-center gap-1.5 transition-[gap] duration-300 hover:gap-3"
        >
          {link.label}
        </a>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Compact Card                                                       */
/* ------------------------------------------------------------------ */

function CompactCard({ project }: { project: Project }) {
  const prefersReducedMotion = useReducedMotion();
  const link = projectLink(project);
  const isExternal = link.href.startsWith('http');
  const badgeColor = statusColor(project.status);

  return (
    <motion.div
      className="relative overflow-hidden rounded-[14px] border border-mborder-subtle backdrop-blur-[12px] transition-all duration-[400ms] gradient-border-card p-5"
      style={{ background: 'rgba(10,10,10,0.75)' }}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              y: -2,
              borderColor: 'rgba(0,255,65,0.10)',
              boxShadow:
                '0 4px 16px rgba(0,255,65,0.06), 0 1px 4px rgba(0,255,65,0.03)',
            }
      }
      transition={SPRING.gentle}
    >
      {/* Header row */}
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-heading text-[0.95rem] font-semibold text-mtext-primary">
          {project.name}
        </h3>
        {project.live_url && (
          <span
            className="font-mono text-[0.5rem] tracking-[0.08em] uppercase py-[0.15rem] px-2 rounded-[3px] border"
            style={{ color: badgeColor, borderColor: badgeColor }}
          >
            {project.status}
          </span>
        )}
      </div>

      {/* Tagline */}
      <p className="font-body text-[0.8rem] text-mtext-light leading-relaxed mb-3 line-clamp-2">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.technologies.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="font-mono text-[0.5rem] text-mtext-muted py-[0.15rem] px-1.5 border border-mborder-subtle rounded-[3px]"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Link */}
      <a
        href={link.href}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        className="font-heading text-[0.75rem] no-underline flex items-center gap-1.5 transition-[gap] duration-300 hover:gap-3 text-matrix"
      >
        {link.label}
      </a>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function MatrixProjects() {
  return (
    <section id="work" className="py-24 px-6 md:px-12">
      {/* Section header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <div className="font-mono text-[0.65rem] text-matrix tracking-[0.2em] uppercase mb-2">
            02 — Featured Work
          </div>
          <h2 className="font-heading text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight text-mtext-primary">
            Selected Projects
          </h2>
        </div>
        <a
          href="/projects"
          className="font-heading text-[0.8rem] text-matrix no-underline flex items-center gap-1.5 transition-[gap] duration-300 hover:gap-3 shrink-0"
        >
          All Projects <span>→</span>
        </a>
      </div>

      {/* Asymmetric grid */}
      <div className="flex flex-col gap-[10px]">
        {ROWS.map((row) => (
          <div
            key={row.showcase}
            className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-[10px]"
          >
            <ShowcaseCard project={byId(row.showcase)} />
            <div className="flex flex-col gap-[10px]">
              {row.compact.map((id) => (
                <CompactCard key={id} project={byId(id)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
