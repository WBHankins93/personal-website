'use client';

export default function MatrixFooter() {
  return (
    <>
      {/* Footer CTA */}
      <section id="contact" className="py-28 px-12 text-center relative">
        {/* Radial glow background */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,255,65,0.08) 0%, transparent 70%)',
          }}
        />
        <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight mb-3 relative text-mtext-primary">
          Let&apos;s build something.
        </h2>
        <p className="text-base text-mtext-muted mb-8 relative">
          Currently open to full-stack, solutions engineering, and AI-focused roles.
        </p>
        <a
          href="mailto:benhankins.work@gmail.com"
          className="font-heading text-[0.8rem] font-medium tracking-[0.04em] text-mbg-primary bg-matrix py-[0.7rem] px-7 rounded-[4px] no-underline inline-flex items-center gap-2 relative transition-all duration-300 hover:bg-matrix-light"
        >
          <span
            className="absolute -inset-1.5 rounded-[10px] -z-[1]"
            style={{
              background: 'radial-gradient(circle, rgba(0,255,65,0.15) 0%, transparent 70%)',
            }}
          />
          Get In Touch <span>→</span>
        </a>
      </section>

      {/* Divider */}
      <div className="mx-12 h-px relative" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="absolute top-0 left-[30%] right-[30%] h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.30), transparent)',
          }}
        />
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-mborder-rule flex justify-between items-center text-[0.75rem] text-mtext-muted">
        <span>© 2026 Ben Hankins</span>
        <div className="flex gap-6 font-mono text-[0.65rem]">
          <a
            href="https://github.com/WBHankins93"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mtext-muted no-underline transition-colors duration-300 hover:text-matrix"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ben-hankins/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mtext-muted no-underline transition-colors duration-300 hover:text-matrix"
          >
            LinkedIn
          </a>
          <a
            href="mailto:benhankins.work@gmail.com"
            className="text-mtext-muted no-underline transition-colors duration-300 hover:text-matrix"
          >
            Email
          </a>
        </div>
      </footer>
    </>
  );
}
