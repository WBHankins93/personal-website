'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '@/data/projects';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type Filter = 'all' | 'full-stack' | 'ai-engineering' | 'python' | 'infrastructure' | 'client-work';

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Full-Stack', value: 'full-stack' },
  { label: 'AI Engineering', value: 'ai-engineering' },
  { label: 'Python', value: 'python' },
  { label: 'Infrastructure', value: 'infrastructure' },
  { label: 'Client Work', value: 'client-work' },
];

function sortProjects(list: Project[]): Project[] {
  return [...list].sort((a, b) => {
    const rank = (p: Project) => (p.showcase ? 0 : p.featured ? 1 : 2);
    return rank(a) - rank(b);
  });
}

function filterProjects(filter: Filter): Project[] {
  let result: Project[];
  switch (filter) {
    case 'full-stack':
      result = projects.filter(
        (p) => p.category === 'web-dev' || p.tags?.includes('full-stack')
      );
      break;
    case 'ai-engineering':
      result = projects.filter(
        (p) => p.category === 'ai-engineering' || p.tags?.includes('ai-engineering')
      );
      break;
    case 'python':
      result = projects.filter((p) => p.category === 'python');
      break;
    case 'infrastructure':
      result = projects.filter(
        (p) =>
          p.category === 'infrastructure' ||
          p.category === 'ci-cd' ||
          p.category === 'education' ||
          p.tags?.includes('infrastructure')
      );
      break;
    case 'client-work':
      result = projects.filter(
        (p) =>
          p.category === 'client-work' ||
          p.tags?.includes('client-work') ||
          p.projectType === 'Client Work'
      );
      break;
    default:
      result = projects;
  }
  return sortProjects(result);
}

const categoryLabel: Record<string, string> = {
  'web-dev': 'Full-Stack',
  'ai-engineering': 'AI Engineering',
  python: 'Python',
  infrastructure: 'Infrastructure',
  'ci-cd': 'CI/CD',
  education: 'Education',
  'client-work': 'Client Work',
  monitoring: 'Monitoring',
  security: 'Security',
  automation: 'Automation',
};

function statusColor(status: Project['status']): string {
  switch (status) {
    case 'Active':
    case 'Maintained':
      return '#00FF41';
    case 'Live Beta':
      return 'rgba(255,180,0,0.85)';
    case 'Complete':
    case 'Archived':
      return 'rgba(255,255,255,0.35)';
    default:
      return '#999';
  }
}

function ProjectCard({ project }: { project: Project }) {
  const prefersReducedMotion = useReducedMotion();
  const isNDA = !project.github_url && !project.live_url;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-[14px] border border-mborder-subtle backdrop-blur-[12px] transition-all duration-[400ms] gradient-border-card flex flex-col"
      style={{ background: 'rgba(10,10,10,0.75)' }}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              y: -3,
              borderColor: 'rgba(0,255,65,0.10)',
              boxShadow: '0 6px 24px rgba(0,255,65,0.06), 0 2px 6px rgba(0,255,65,0.03)',
            }
      }
    >
      {/* Image placeholder */}
      <div
        className="w-full h-[140px] flex items-center justify-center relative"
        style={{ background: 'linear-gradient(135deg, #060f06, #0a1a08, #081208)' }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3 font-mono text-[0.5rem] tracking-[0.08em] uppercase bg-matrix text-mbg-primary py-[0.15rem] px-2 rounded-[3px] font-medium z-[2]">
          {categoryLabel[project.category] ?? project.category}
        </div>
        {/* Status badge */}
        <span
          className="absolute top-3 right-3 font-mono text-[0.5rem] tracking-[0.08em] uppercase py-[0.15rem] px-2 rounded-[3px] font-medium z-[2] border"
          style={{
            color: statusColor(project.status),
            borderColor: statusColor(project.status),
            background: 'rgba(0,0,0,0.5)',
          }}
        >
          {project.status}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-[0.95rem] font-semibold mb-1.5 text-mtext-primary">
          {project.name}
        </h3>
        <p className="font-body text-[0.78rem] text-mtext-light leading-relaxed mb-3 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-auto mb-3">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[0.5rem] text-mtext-muted py-[0.15rem] px-1.5 border border-mborder-subtle rounded-[3px]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="font-mono text-[0.5rem] text-mtext-muted py-[0.15rem] px-1.5">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Link */}
        {!isNDA ? (
          <a
            href={project.live_url || project.github_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-[0.75rem] text-matrix no-underline flex items-center gap-1.5 transition-[gap] duration-300 hover:gap-3"
          >
            {project.live_url ? 'Visit Site →' : 'GitHub →'}
          </a>
        ) : (
          <a
            href="/contact"
            className="font-heading text-[0.75rem] text-mtext-dim no-underline flex items-center gap-1.5 transition-colors duration-300 hover:text-mtext-primary"
          >
            Get in touch to learn more →
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const filtered = filterProjects(activeFilter);

  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="font-mono text-[0.65rem] text-matrix tracking-[0.2em] uppercase mb-2">
          All Projects
        </div>
        <h1 className="font-heading text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-tight text-mtext-primary">
          Everything I&apos;ve Built
        </h1>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        className="flex flex-wrap gap-2 mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`font-mono text-[0.7rem] tracking-[0.05em] uppercase py-2 px-4 rounded-[4px] transition-all duration-200 cursor-pointer border ${
              activeFilter === f.value
                ? 'bg-matrix text-mbg-primary border-matrix'
                : 'bg-transparent text-mtext-muted border-mborder-hover hover:text-mtext-primary hover:border-mglow-borderHover'
            }`}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Count */}
      <div className="mt-8 font-mono text-[0.7rem] text-mtext-muted tracking-[0.05em]">
        {filtered.length} project{filtered.length !== 1 ? 's' : ''}
      </div>
    </section>
  );
}
