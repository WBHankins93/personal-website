"use client";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="px-6 md:px-8 py-10 border-t border-line">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-[0.72rem] text-ink-muted">
          © {year} Ben Hankins
        </p>
        <p className="font-mono text-[0.72rem] text-ink-muted">
          Built with Next.js · Designed to ship.
        </p>
      </div>
    </footer>
  );
}
