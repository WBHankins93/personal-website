'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SPRING } from '@/lib/animation-configs/spring';
import ResumeDropdown from './ResumeDropdown';

interface BentoCard {
  icon: string;
  title: string;
  description: string;
  tags?: string[];
  isHero?: boolean;
}

const capabilities: BentoCard[] = [
  {
    icon: '⟡',
    title: 'Customer-Facing Technical Leadership',
    description:
      'From enterprise architecture workshops with NBC Universal and Citibank to shipping 5 client applications through Sproutflow — I bridge the gap between what engineering builds and what customers need.',
    tags: ['$10.1M Deal Closed', '12 Enterprise Clients', '5 Apps Shipped'],
    isHero: true,
  },
  {
    icon: '</>',
    title: 'Full-Stack Development',
    description: 'TypeScript, React, Next.js, Node.js — end-to-end from UI to API to database.',
  },
  {
    icon: '☁',
    title: 'Cloud & Infrastructure',
    description: 'Multi-cloud Kubernetes, Terraform, 99.9% uptime across production clusters.',
  },
  {
    icon: '⚡',
    title: 'AI Engineering',
    description: 'Multi-agent systems, LLM workflow design, provider-agnostic AI pipelines.',
  },
  {
    icon: '⟳',
    title: 'DevOps & CI/CD',
    description: 'GitHub Actions, deployment automation, 80% reduction in deploy time.',
  },
  {
    icon: '◎',
    title: 'Technical Discovery',
    description: 'Architecture design, POC execution, translating business needs to technical solutions.',
  },
  {
    icon: '△',
    title: 'Solutions Architecture',
    description: 'Enterprise cloud solutions spanning AWS, GCP, and IBM Cloud for Fortune 500 clients.',
  },
];

function Card({ card }: { card: BentoCard }) {
  const prefersReducedMotion = useReducedMotion();

  const baseClasses =
    'relative overflow-hidden rounded-[14px] border backdrop-blur-[12px] transition-all duration-[400ms] gradient-border-card';

  const heroClasses = card.isHero
    ? 'col-span-full p-10 border-mglow-border'
    : 'p-7';

  const hoverProps = prefersReducedMotion
    ? {}
    : card.isHero
      ? {}
      : { y: -1 };

  return (
    <motion.div
      className={`${baseClasses} ${heroClasses}`}
      style={{
        background: card.isHero
          ? 'linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(0,255,65,0.03) 100%)'
          : 'rgba(10,10,10,0.75)',
        borderColor: card.isHero ? 'rgba(0,255,65,0.10)' : 'rgba(255,255,255,0.04)',
      }}
      whileHover={prefersReducedMotion ? {} : {
        ...hoverProps,
        borderColor: 'rgba(0,255,65,0.10)',
        background: card.isHero
          ? 'linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(0,255,65,0.03) 100%)'
          : 'rgba(16,16,16,0.85)',
      }}
      transition={SPRING.gentle}
    >
      {/* Hero card radial glow */}
      {card.isHero && (
        <div
          className="absolute opacity-100 pointer-events-none"
          style={{
            top: '-100px',
            right: '-50px',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(0,255,65,0.08) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Icon */}
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 font-mono text-[0.95rem] text-matrix ${
          card.isHero
            ? 'border-matrix-dim shadow-[0_0_20px_rgba(0,255,65,0.08)]'
            : 'border-mborder-hover'
        }`}
        style={{
          borderWidth: '1px',
          background: card.isHero ? 'rgba(0,255,65,0.04)' : 'transparent',
        }}
      >
        {card.icon}
      </div>

      {/* Title */}
      <h3
        className={`font-heading text-base font-semibold mb-1 ${
          card.isHero ? 'text-[1.3rem] text-matrix-light' : 'text-mtext-primary'
        }`}
      >
        {card.title}
      </h3>

      {/* Description */}
      <p
        className={`text-[0.85rem] leading-relaxed ${
          card.isHero ? 'text-mtext-dim max-w-[650px]' : 'text-mtext-muted max-w-[480px]'
        }`}
      >
        {card.description}
      </p>

      {/* Tags */}
      {card.tags && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[0.6rem] text-matrix-dim py-1 px-2.5 rounded-[3px] border border-mglow-border"
              style={{ background: 'rgba(0,255,65,0.02)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <section className="py-24 px-12">
      {/* Section header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <div className="font-mono text-[0.65rem] text-matrix tracking-[0.2em] uppercase mb-2">
            01 — Core Capabilities
          </div>
          <h2 className="font-heading text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight text-mtext-primary">
            What I Bring to the Table
          </h2>
        </div>
        <ResumeDropdown
          align="right"
          trigger={
            <span className="font-heading text-[0.8rem] text-matrix flex items-center gap-1.5 transition-[gap] duration-300 hover:gap-3 shrink-0">
              View Resume
            </span>
          }
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
        {capabilities.map((card) => (
          <Card key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}
