'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SPRING } from '@/lib/animation-configs/spring';

interface Project {
  name: string;
  description: string;
  badge?: string;
  techs: string[];
  gradient: string;
}

const projects: Project[] = [
  {
    name: 'Prompt Library',
    description:
      'Open-source prompt engineering framework with modular personas and reasoning playbooks.',
    badge: 'AI Engineering',
    techs: ['TypeScript', 'LLM', 'Open Source'],
    gradient: 'linear-gradient(135deg, #060f06, #0a1a08, #081208)',
  },
  {
    name: 'AI Business Plan Generator',
    description:
      '5-agent system generating comprehensive business plans. Provider-agnostic across Anthropic, Groq, and OpenAI.',
    badge: 'AI Engineering',
    techs: ['Multi-Agent', 'Python', 'Groq'],
    gradient: 'linear-gradient(135deg, #060f0f, #041a14, #081510)',
  },
  {
    name: 'Job Extractor',
    description:
      'Automated job listing extraction and analysis pipeline for the job search grind.',
    badge: 'Automation',
    techs: ['Python', 'Automation'],
    gradient: 'linear-gradient(135deg, #0a0f06, #101a0a, #0c150a)',
  },
  {
    name: 'Sproutflow Studio',
    description:
      'Web design studio serving small businesses. 5 client applications shipped end-to-end.',
    techs: ['Next.js', 'Supabase', 'Vercel'],
    gradient: 'linear-gradient(135deg, #080f08, #0a1a0a, #0a150a)',
  },
];

function ProjectCard({ project }: { project: Project }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative overflow-hidden rounded-[14px] border border-mborder-subtle backdrop-blur-[12px] transition-all duration-[400ms] gradient-border-card"
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
        className="w-full h-[190px] flex items-center justify-center font-mono text-[0.7rem] text-mtext-muted tracking-[0.08em] uppercase relative transition-[filter] duration-[400ms]"
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

        {/* Badge */}
        {project.badge && (
          <div className="absolute top-3 left-3 font-mono text-[0.55rem] tracking-[0.08em] uppercase bg-matrix text-mbg-primary py-[0.2rem] px-2.5 rounded-[3px] font-medium z-[2]">
            {project.badge}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 px-6">
        <h3 className="font-heading text-[1.05rem] font-semibold mb-1 text-mtext-primary">
          {project.name}
        </h3>
        <p className="text-[0.82rem] text-mtext-muted leading-normal">
          {project.description}
        </p>
        <div className="flex gap-1.5 mt-3">
          {project.techs.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[0.55rem] text-mtext-muted py-[0.2rem] px-2 border border-mborder-subtle rounded-[3px]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

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
          href="#"
          className="font-heading text-[0.8rem] text-matrix no-underline flex items-center gap-1.5 transition-[gap] duration-300 hover:gap-3 shrink-0"
        >
          All Projects <span>→</span>
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </section>
  );
}
