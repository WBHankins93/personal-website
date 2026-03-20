'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SPRING } from '@/lib/animation-configs/spring';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ShowcaseProject {
  name: string;
  description: string;
  badge: string;
  statusBadge: string;
  statusColor: string;
  techs: string[];
  link: string;
  linkLabel: string;
  gradient: string;
}

interface CompactProject {
  name: string;
  tagline: string;
  statusBadge?: string;
  statusColor?: string;
  techs: string[];
  link: string;
  linkLabel: string;
  isPrivate?: boolean;
}

const showcaseRow1: ShowcaseProject = {
  name: 'Greenlit',
  description:
    'AI-powered resume coaching that knows your industry. Upload a resume, get ATS scoring, industry-specific feedback, and real bullet rewrites — not generic flags.',
  badge: 'AI Engineering',
  statusBadge: 'Beta · Invite Only',
  statusColor: 'rgba(255,180,0,0.85)',
  techs: ['Next.js', 'TypeScript', 'AI/LLM', 'Scoring Engine', 'Vercel'],
  link: 'https://greenlit-cv.vercel.app/',
  linkLabel: 'View App →',
  gradient: 'linear-gradient(135deg, #060f06, #0a1a08, #081208)',
};

const showcaseRow2: ShowcaseProject = {
  name: 'Sproutflow Studio',
  description:
    'Web design studio serving small businesses. 5 client applications shipped end-to-end, from discovery through production deployment.',
  badge: 'Full-Stack',
  statusBadge: 'Live',
  statusColor: '#00FF41',
  techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Supabase'],
  link: 'https://www.sproutflow-studio.com',
  linkLabel: 'Visit Site →',
  gradient: 'linear-gradient(135deg, #080f08, #0a1a0a, #0a150a)',
};

const compactRow1: CompactProject[] = [
  {
    name: 'Prompt Library',
    tagline:
      'Modular prompt engineering framework with personas, reasoning playbooks, and response standards',
    statusBadge: 'Private Repo',
    statusColor: 'rgba(255,255,255,0.4)',
    techs: ['TypeScript', 'LLM', 'Prompt Engineering'],
    link: '/contact',
    linkLabel: 'Get in touch to learn more →',
    isPrivate: true,
  },
  {
    name: 'AI Business Plan Generator',
    tagline:
      '5-agent system, provider-agnostic across Anthropic, Groq, and OpenAI',
    techs: ['Multi-Agent', 'Python', 'Groq'],
    link: 'https://github.com/WBHankins93/ai-business-plan-generator',
    linkLabel: 'GitHub →',
  },
];

const compactRow2: CompactProject[] = [
  {
    name: 'Solutions Playbook',
    tagline:
      'Operational SE framework — 41 files covering the full customer lifecycle',
    techs: ['Solutions Engineering', 'Framework'],
    link: 'https://github.com/WBHankins93/solutions-playbook',
    linkLabel: 'GitHub →',
  },
  {
    name: 'Implementation Studio',
    tagline:
      '9 hands-on labs for constrained environments and production Terraform',
    techs: ['Terraform', 'GCP', 'AWS'],
    link: 'https://github.com/WBHankins93/implementation-studio',
    linkLabel: 'GitHub →',
  },
  {
    name: 'Nealy Event Decor',
    tagline: 'E-commerce and booking platform for event decor business',
    statusBadge: 'Live',
    statusColor: '#00FF41',
    techs: ['Next.js', 'TypeScript', 'Sanity CMS'],
    link: 'https://www.nealyevents.com',
    linkLabel: 'Visit Site →',
  },
];

/* ------------------------------------------------------------------ */
/*  Showcase Card                                                      */
/* ------------------------------------------------------------------ */

function ShowcaseCard({ project }: { project: ShowcaseProject }) {
  const prefersReducedMotion = useReducedMotion();

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
        className="w-full h-[220px] flex items-center justify-center font-mono text-[0.7rem] text-mtext-muted tracking-[0.08em] uppercase relative transition-[filter] duration-[400ms]"
        style={{ background: project.gradient }}
      >
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <span className="relative z-[1]">Project Screenshot</span>

        {/* Category badge */}
        <div className="absolute top-3 left-3 font-mono text-[0.55rem] tracking-[0.08em] uppercase bg-matrix text-mbg-primary py-[0.2rem] px-2.5 rounded-[3px] font-medium z-[2]">
          {project.badge}
        </div>

        {/* Status badge */}
        <div
          className="absolute top-3 right-3 font-mono text-[0.55rem] tracking-[0.08em] uppercase py-[0.2rem] px-2.5 rounded-[3px] font-medium z-[2] border"
          style={{
            color: project.statusColor,
            borderColor: project.statusColor,
            background: 'rgba(0,0,0,0.5)',
          }}
        >
          {project.statusBadge}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 px-6 flex flex-col flex-1">
        <h3 className="font-heading text-[1.15rem] font-semibold mb-2 text-mtext-primary">
          {project.name}
        </h3>
        <p className="text-[0.85rem] text-mtext-dim leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto mb-4">
          {project.techs.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[0.55rem] text-mtext-muted py-[0.2rem] px-2 border border-mborder-subtle rounded-[3px]"
            >
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading text-[0.8rem] text-matrix no-underline flex items-center gap-1.5 transition-[gap] duration-300 hover:gap-3"
        >
          {project.linkLabel}
        </a>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Compact Card                                                       */
/* ------------------------------------------------------------------ */

function CompactCard({ project }: { project: CompactProject }) {
  const prefersReducedMotion = useReducedMotion();
  const isExternal = project.link.startsWith('http');

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
        {project.statusBadge && (
          <span
            className="font-mono text-[0.5rem] tracking-[0.08em] uppercase py-[0.15rem] px-2 rounded-[3px] border"
            style={{
              color: project.statusColor,
              borderColor: project.statusColor ?? 'rgba(255,255,255,0.1)',
            }}
          >
            {project.statusBadge}
          </span>
        )}
      </div>

      {/* Tagline */}
      <p className="text-[0.8rem] text-mtext-muted leading-normal mb-3">
        {project.tagline}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.techs.map((tech) => (
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
        href={project.link}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        className={`font-heading text-[0.75rem] no-underline flex items-center gap-1.5 transition-[gap] duration-300 hover:gap-3 ${
          project.isPrivate ? 'text-mtext-dim hover:text-mtext-primary' : 'text-matrix'
        }`}
      >
        {project.linkLabel}
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
        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-[10px]">
          <ShowcaseCard project={showcaseRow1} />
          <div className="flex flex-col gap-[10px]">
            {compactRow1.map((p) => (
              <CompactCard key={p.name} project={p} />
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-[10px]">
          <ShowcaseCard project={showcaseRow2} />
          <div className="flex flex-col gap-[10px]">
            {compactRow2.map((p) => (
              <CompactCard key={p.name} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
