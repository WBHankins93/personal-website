'use client';

import { useState, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const resumes = [
  {
    label: 'Solutions Engineer',
    subtitle: 'Enterprise infrastructure, pre-sales, and technical discovery.',
    href: '/Ben_Hankins_SE_final.pdf',
  },
  {
    label: 'Full-Stack Engineer',
    subtitle: 'Product development, cloud platforms, and AI tooling.',
    href: '/Ben_Hankins_FSE_final.pdf',
  },
];

interface ResumeDropdownProps {
  trigger: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export default function ResumeDropdown({ trigger, align = 'left', className }: ResumeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const open = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  }, []);

  return (
    <div
      className={`relative ${className ?? ''}`}
      onMouseEnter={open}
      onMouseLeave={close}
    >
      {/* Trigger */}
      <button
        type="button"
        className="flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 5l3 3 3-3" />
        </svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full mt-2 z-50 w-[280px] rounded-[8px] border border-matrix-dim backdrop-blur-[12px] overflow-hidden p-1.5 flex flex-col gap-1 ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
            style={{ background: 'rgba(10,10,10,0.97)' }}
          >
            {resumes.map((resume) => (
              <a
                key={resume.label}
                href={resume.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block no-underline rounded-[5px] px-4 py-3 transition-colors duration-150 hover:bg-[rgba(0,255,65,0.06)]"
              >
                <div className="font-heading text-[0.8rem] font-medium text-mtext-primary group-hover:text-matrix-light transition-colors duration-150 mb-0.5">
                  {resume.label}
                </div>
                <div className="font-mono text-[0.65rem] text-mtext-muted leading-snug">
                  {resume.subtitle}
                </div>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
