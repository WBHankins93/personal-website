"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";

const links = [
  { label: "What I Build", href: "#build" },
  { label: "Work", href: "#products" },
  { label: "Experience", href: "#experience" },
  { label: "Labs", href: "#labs" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { isScrolled } = useScrollTrigger(8);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-[100] transition-colors duration-300",
        isScrolled
          ? "bg-paper border-b border-line"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 md:px-8 h-16">
        {/* Logo / monogram */}
        <a href="#hero" className="flex items-center gap-2.5 no-underline" aria-label="Ben Hankins — home">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-line-strong">
            <Image
              src="/b-logo-updated-photoroom.png"
              alt="Ben Hankins monogram"
              width={20}
              height={20}
              className="h-5 w-5"
            />
          </span>
          <span className="font-heading font-semibold text-[0.95rem] text-ink tracking-tight">
            Ben Hankins
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-heading text-[0.85rem] text-ink-soft no-underline transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/Ben_Hankins_SE_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-[0.85rem] font-medium text-white no-underline bg-accent hover:bg-accent-hover transition-colors rounded-md px-4 py-2"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center h-9 w-9 text-ink"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-line bg-paper">
          <ul className="flex flex-col px-6 py-3 list-none">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-heading text-[0.95rem] text-ink-soft no-underline border-b border-line last:border-0"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/Ben_Hankins_SE_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block mt-3 mb-1 text-center font-heading text-[0.9rem] font-medium text-white no-underline bg-accent rounded-md px-4 py-2.5"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
