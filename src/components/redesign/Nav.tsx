"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { MOTION } from "@/lib/animation-configs/motion";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { isScrolled } = useScrollTrigger(8);
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
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-heading text-[0.85rem] text-ink-soft no-underline transition-colors hover:text-accent"
              >
                {l.label}
              </Link>
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
                  onClick={() => setOpen(false)}
                  className="block py-3 font-heading text-[0.95rem] text-ink-soft no-underline border-b border-line last:border-0"
                >
                  {l.label}
                </Link>
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
