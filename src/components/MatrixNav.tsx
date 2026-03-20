'use client';

import { usePathname } from 'next/navigation';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import ResumeDropdown from './ResumeDropdown';

export default function MatrixNav() {
  const pathname = usePathname();
  const { isScrolled, scrollDirection } = useScrollTrigger(8);
  const shouldShow = scrollDirection === 'up' || !isScrolled;

  const anchor = (hash: string) => (pathname === '/' ? hash : `/${hash}`);

  return (
    <nav
      className="fixed top-0 left-0 right-0 flex items-center justify-between py-4 px-6 md:px-12 z-[100] backdrop-blur-[24px] border-b border-mborder-rule transition-transform duration-300"
      style={{
        background: 'rgba(6,6,6,0.75)',
        transform: shouldShow ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      {/* Green gradient line along bottom edge */}
      <div
        className="absolute -bottom-px left-[15%] right-[15%] h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.30), transparent)',
        }}
      />

      {/* Logo */}
      <a href={pathname === '/' ? '#home' : '/'} className="flex items-center gap-3 font-heading font-semibold text-base text-mtext-primary no-underline">
        <div
          className="w-[30px] h-[30px] border-[1.5px] border-matrix rounded-[5px] flex items-center justify-center font-mono font-medium text-[0.8rem] text-matrix relative"
        >
          {/* Radial glow behind logo */}
          <span
            className="absolute -inset-[3px] rounded-[7px] -z-[1]"
            style={{
              background: 'radial-gradient(circle, rgba(0,255,65,0.08) 0%, transparent 70%)',
            }}
          />
          B
        </div>
        Ben Hankins
      </a>

      {/* Nav links — hidden on mobile */}
      <ul className="hidden md:flex items-center gap-10 list-none font-heading text-[0.8rem] tracking-[0.05em] uppercase">
        <li>
          <a
            href={anchor('#work')}
            className="text-mtext-muted no-underline transition-colors duration-300 hover:text-matrix-light"
          >
            Work
          </a>
        </li>
        <li>
          <a
            href="/about"
            className="text-mtext-muted no-underline transition-colors duration-300 hover:text-matrix-light"
          >
            About
          </a>
        </li>
        <li>
          <ResumeDropdown
            trigger={
              <span className="text-mtext-muted no-underline transition-colors duration-300 hover:text-matrix-light font-heading text-[0.8rem] tracking-[0.05em] uppercase">
                Resume
              </span>
            }
          />
        </li>
      </ul>

      {/* GitHub CTA */}
      <a
        href="https://github.com/WBHankins93"
        target="_blank"
        rel="noopener noreferrer"
        className="font-heading text-[0.75rem] font-medium tracking-[0.06em] uppercase text-mbg-primary bg-matrix py-2 px-5 rounded-[4px] no-underline inline-flex items-center gap-2 transition-all duration-300 hover:bg-matrix-light"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-mbg-primary">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        GitHub
      </a>
    </nav>
  );
}
