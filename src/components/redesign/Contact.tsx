"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/animation-configs/ease";

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
    <section ref={sectionRef} id="contact" className="relative overflow-hidden px-6 md:px-8 py-20 md:py-28 bg-paper-alt">
      <motion.div
        className="botanical-wash pointer-events-none absolute -inset-y-8 inset-x-0"
        style={reduce ? undefined : { y: washY }}
        aria-hidden
      />
      <motion.div
        className="relative mx-auto max-w-3xl text-center"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: EASE.easeOut }}
      >
        <div className="mb-5 flex items-center justify-center gap-3 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-ink-muted">
          <span className="h-px w-8 bg-line-strong" />
          <span className="text-clay">No. 04</span>
          <span>Contact</span>
          <span className="h-px w-8 bg-line-strong" />
        </div>
        <h2 className="font-heading font-bold text-ink tracking-tight text-[clamp(2.25rem,5.5vw,3.5rem)]">
          Let&apos;s build something.
        </h2>
        <p className="mt-5 mx-auto max-w-[52ch] font-body text-ink-soft leading-relaxed text-[1.05rem]">
          {/* TODO: Confirm whether GTM Engineer should remain, or be replaced with Solutions Architect. */}
          Open to Solutions Engineer and GTM Engineer roles. Also available for
          consulting through Sproutflow Studio.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 rounded-md bg-accent hover:bg-accent-hover transition-colors text-white font-heading font-medium text-[0.95rem] px-5 py-3 no-underline"
          >
            <Mail className="h-4 w-4" /> Email
          </a>
          <a
            href="https://www.linkedin.com/in/ben-hankins/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-line-strong hover:border-ink text-ink font-heading font-medium text-[0.95rem] px-5 py-3 no-underline transition-colors"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href="https://github.com/WBHankins93"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-line-strong hover:border-ink text-ink font-heading font-medium text-[0.95rem] px-5 py-3 no-underline transition-colors"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}
