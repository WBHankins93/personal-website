"use client";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-paper/15 bg-accent-hover px-6 py-10 md:px-8">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-mono text-[0.72rem] text-paper/65">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F3B18C]" />
          © {year} Ben Hankins, Solutions Engineer
        </p>
        <p className="font-mono text-[0.72rem] text-paper/65">
          Built with Next.js · Designed to ship.
        </p>
      </div>
    </footer>
  );
}
