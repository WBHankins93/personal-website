"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { useActiveSection } from "@/hooks/useActiveSection";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { MOTION } from "@/lib/animation-configs/motion";
import { SECTION_IDS } from "@/lib/sections";

const links = [
  { label: "Work", href: "/#work", section: "work" },
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "Sproutflow", href: "https://sproutflow-studio.com", section: null, external: true },
  { label: "Contact", href: "/#contact", section: "contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { isScrolled } = useScrollTrigger(8);
  const activeSection = useActiveSection(SECTION_IDS);
  const reduce = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, MOTION.spring.progress);

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
        <Link href="/#hero" className="flex items-center gap-2.5 no-underline" aria-label="Ben Hankins home">
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
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map((l) => {
            const isActive = l.section !== null && l.section === activeSection;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "relative font-body text-[0.85rem] font-medium no-underline transition-colors hover:text-accent",
                    isActive ? "text-accent" : "text-ink-soft",
                  ].join(" ")}
                >
                  <span className="inline-flex items-center gap-1">
                    {l.label}
                    {l.external && <ArrowUpRight className="h-3 w-3" aria-hidden />}
                  </span>
                  {/* Underline tracks the section you are reading. */}
                  <span
                    aria-hidden
                    className={[
                      "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0",
                    ].join(" ")}
                  />
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href="/Ben_Hankins_SE_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[0.85rem] font-semibold text-white no-underline bg-accent hover:bg-accent-hover transition-colors rounded-md px-4 py-2"
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
      <AnimatePresence initial={false}>
        {open && (
        <motion.div
          initial={reduce ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={reduce ? undefined : { height: 0, opacity: 0 }}
          transition={{ duration: MOTION.duration.base, ease: MOTION.ease.easeOut }}
          className="overflow-hidden border-t border-line bg-paper md:hidden"
        >
          <ul className="flex flex-col px-6 py-3 list-none">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-body text-[0.95rem] font-medium text-ink-soft no-underline border-b border-line last:border-0"
                >
                  <span className="inline-flex items-center gap-1.5">
                    {l.label}
                    {l.external && <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/Ben_Hankins_SE_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block mt-3 mb-1 text-center font-body text-[0.9rem] font-semibold text-white no-underline bg-accent rounded-md px-4 py-2.5"
              >
                Resume
              </a>
            </li>
          </ul>
        </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-clay"
        style={{ scaleX: reduce ? 0 : progress }}
      />
    </header>
  );
}
