'use client';

import { useState, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const resumes = [
  { label: 'Full-Stack Engineer', href: '/Ben_Hankins_FS_final.pdf' },
  { label: 'Solutions Engineer', href: '/Ben_Hankins_SE_final.pdf' },
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
            className={`absolute top-full mt-2 z-50 min-w-[200px] rounded-[6px] border border-matrix-dim backdrop-blur-[12px] overflow-hidden ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
            style={{ background: 'rgba(10,10,10,0.95)' }}
          >
            {resumes.map((resume) => (
              <a
                key={resume.label}
                href={resume.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-mono text-[0.7rem] tracking-[0.05em] text-mtext-dim no-underline py-3 px-4 transition-colors duration-200 hover:text-matrix-light hover:bg-[rgba(0,255,65,0.05)]"
              >
                {resume.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
