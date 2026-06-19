"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/animation-configs/ease";

const EMAIL = "benhankins.work@gmail.com";

export default function Contact() {
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="px-6 md:px-8 py-24 md:py-32 bg-paper-alt">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: EASE.easeOut }}
      >
        <h2 className="font-heading font-bold text-ink tracking-tight text-[clamp(2rem,5vw,3.25rem)]">
          Let&apos;s build something.
        </h2>
        <p className="mt-5 mx-auto max-w-[52ch] font-body text-ink-soft leading-relaxed text-[1.05rem]">
          Open to Solutions Architect, Solutions Engineer, and GTM Engineer
          roles. Also available for consulting through Sproutflow Studio.
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
