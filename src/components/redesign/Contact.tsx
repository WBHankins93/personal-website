"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const EMAIL = "benhankins.work@gmail.com";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const washYRaw = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const washY = useSpring(washYRaw, { stiffness: 100, damping: 28, mass: 0.35 });

  return (
    <section ref={sectionRef} id="contact" className="inverse-ledger relative overflow-hidden bg-accent px-6 py-20 text-paper md:px-8 md:py-28">
      {/* Tree-ring cross-section, drawn in public/tree-rings.svg and painted as a
          background so ~15KB of path data stays out of the client bundle. */}
      <motion.div
        className="tree-ring-field pointer-events-none absolute -right-28 top-0 hidden h-full w-[62%] md:block"
        style={reduce ? undefined : { y: washY }}
        aria-hidden
      />
      {/* No scroll-reveal: contact is below the fold and renders visible by
          default (docs/DESIGN.md Migration Note #1). */}
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mb-5 flex items-center justify-center gap-3 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-paper/70">
          <span className="h-px w-8 bg-paper/30" />
          <span className="text-[#F3B18C]">No. 04</span>
          <span>Contact</span>
          <span className="h-px w-8 bg-paper/30" />
        </div>
        <h2 className="font-heading text-[clamp(2.25rem,5.5vw,3.5rem)] font-bold tracking-tight text-paper">
          Let&apos;s build something.
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] font-body text-[1.05rem] leading-relaxed text-paper/75">
          Open to Solutions Engineer, Sales Engineer, and Forward Deployed
          Engineer roles. Also available for consulting through{" "}
          <a
            href="https://sproutflow-studio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-paper underline decoration-paper/45 underline-offset-4 transition-colors hover:decoration-paper"
          >
            Sproutflow Studio
          </a>
          .
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 rounded-sm bg-paper px-5 py-3 font-heading text-[0.95rem] font-medium text-accent no-underline transition-colors hover:bg-paper-alt"
          >
            <Mail className="h-4 w-4" /> Email
          </a>
          <a
            href="https://www.linkedin.com/in/ben-hankins/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-paper/35 px-5 py-3 font-heading text-[0.95rem] font-medium text-paper no-underline transition-colors hover:border-paper hover:bg-paper/10"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href="https://github.com/WBHankins93"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-paper/35 px-5 py-3 font-heading text-[0.95rem] font-medium text-paper no-underline transition-colors hover:border-paper hover:bg-paper/10"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
