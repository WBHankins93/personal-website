"use client";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="px-6 md:px-8 py-10 border-t-2 border-ink bg-paper-alt">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-mono text-[0.72rem] text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          © {year} Ben Hankins — Solutions Engineer
        </p>
        <p className="font-mono text-[0.72rem] text-ink-muted">
          Built with Next.js · Designed to ship.
        </p>
      </div>
    </footer>
  );
}
