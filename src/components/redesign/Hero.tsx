"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Linkedin } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/animation-configs/ease";

const stats = [
  { num: "$13M", label: "Pipeline Supported" },
  { num: "12", label: "Named Accounts" },
  { num: "80%", label: "Faster Deploys" },
];

// Named enterprise accounts engaged across IBM Client Engineering + Prove AI.
// Logos sourced from Wikimedia Commons (official marks, public domain / freely
// licensed for editorial "engagements with" use — see public/logos).
const trustedLogos = [
  { name: "AT&T", src: "/logos/att.svg" },
  { name: "Boeing", src: "/logos/boeing.svg" },
  { name: "Cencora", src: "/logos/cencora.png" },
  { name: "Honeywell", src: "/logos/honeywell.svg" },
  { name: "Juniper Networks", src: "/logos/juniper.svg" },
  { name: "Kroger", src: "/logos/kroger.svg" },
  { name: "NBCUniversal", src: "/logos/nbcuniversal.svg" },
  { name: "Norfolk Southern", src: "/logos/norfolk-southern.svg" },
  { name: "PepsiCo", src: "/logos/pepsico.svg" },
  { name: "CenterPoint Energy", src: "/logos/centerpoint.svg" },
  { name: "Verizon", src: "/logos/verizon.svg" },
  { name: "Hertz", src: "/logos/hertz.svg" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const washYRaw = useTransform(scrollYProgress, [0, 1], [0, 44]);
  const photoYRaw = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const washOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.52]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);
  const washY = useSpring(washYRaw, { stiffness: 110, damping: 28, mass: 0.35 });
  const photoY = useSpring(photoYRaw, { stiffness: 120, damping: 30, mass: 0.4 });
  const reveal = (delay: number) =>
    reduce
      ? {
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0 },
        }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE.easeOut },
        };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative scroll-mt-0 overflow-hidden border-b border-line ledger-grid"
    >
      {/* Flat signal plate: the hero's field-journal annotation */}
      <motion.div
        className="pointer-events-none absolute -right-20 top-20 hidden h-[34rem] w-[42%] rotate-3 border border-accent/15 bg-accent-soft/75 md:block"
        style={reduce ? undefined : { y: washY, opacity: washOpacity }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8 pt-28 md:pt-32 pb-12 md:pb-16">
        {/* Masthead meta row */}
        <motion.div
          className="rule-label font-mono text-[0.7rem] tracking-[0.18em] uppercase text-ink-muted"
          {...reveal(0.04)}
        >
          <span className="text-clay">No. 01</span>
          <span>Portfolio</span>
          <span className="rule-line scroll-rule" />
          <span className="hidden sm:inline">New Orleans, LA</span>
        </motion.div>

        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-10 items-end">
          {/* Text column */}
          <div className="md:col-span-7">
            {/* terminal-moment: hero only, per docs/DESIGN.md — do not repeat
                this pattern elsewhere on the page. */}
            <motion.div
              className="terminal-moment gap-2 rounded-sm px-3.5 py-1.5 mb-6 text-[0.7rem] tracking-[0.03em]"
              {...reveal(0.08)}
            >
              <span aria-hidden className="text-plate/55">
                $
              </span>
              <span>open_to_opportunities:</span>
              {/* plate, not rust-bright: rust-bright is decorative/cursor-only
                  per docs/DESIGN.md — it fails normal-text contrast on
                  forest-deep (3.28:1), so real terminal text stays plate. */}
              <span className="font-bold">true</span>
              <span
                aria-hidden
                className={reduce ? "terminal-cursor" : "terminal-cursor terminal-cursor--blink"}
              />
            </motion.div>

            {/* Oversized editorial headline */}
            <motion.h1
              className="font-heading font-bold text-ink leading-[0.92] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3.25rem, 8.5vw, 6.25rem)" }}
              {...reveal(0.14)}
            >
              <span className="block">
                Ben
                {/* Visually hidden so the accessible name reads "Ben Hankins."
                    instead of "BenHankins." — the two lines still stack
                    visually via `block`. */}
                <span className="sr-only"> </span>
              </span>
              <span className="block">
                Hankins<span className="text-rust">.</span>
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="mt-6 font-heading text-ink leading-snug max-w-[34ch]"
              style={{ fontSize: "clamp(1.2rem, 2.1vw, 1.55rem)", fontWeight: 500 }}
              {...reveal(0.22)}
            >
              <span className="text-accent">Solutions Engineer</span> by career.
              Builder by default. The products are how I stay sharp.
            </motion.p>

            {/* Subline */}
            <motion.p
              className="mt-4 font-body text-ink-soft leading-relaxed max-w-[48ch] text-[1.02rem]"
              {...reveal(0.3)}
            >
              7+ years across solutions engineering, cloud infrastructure, and
              full-stack product development, with production software to show for it.
            </motion.p>

            {/* CTAs: one solid primary, the rest quiet */}
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
              {...reveal(0.38)}
            >
              <a
                href="#work"
                className="button-primary inline-flex items-center gap-2 font-heading font-medium text-[0.95rem] px-5 py-3 no-underline"
              >
                Explore the Work <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/Ben_Hankins_SE_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-heading font-medium text-[0.95rem] text-ink no-underline border-b border-line-strong hover:border-ink pb-0.5 transition-colors"
              >
                Resume
                <ArrowRight className="h-3.5 w-3.5 -rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ben-hankins/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center gap-1.5 font-heading font-medium text-[0.95rem] text-ink-muted hover:text-accent no-underline transition-colors"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Photo plate: matted field-journal print, bled to the right */}
          <motion.figure
            className="md:col-span-5 relative mx-auto md:mx-0 md:ml-auto w-full max-w-[19rem] md:max-w-[20rem]"
            style={reduce ? undefined : { y: photoY }}
            {...reveal(0.18)}
          >
            <div className="plate-frame rotate-[-1.5deg] p-2 shadow-[0_18px_45px_-22px_rgba(33,28,21,0.55)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1px] bg-paper-alt">
                <Image
                  src="/BH-headshot.png"
                  alt="Portrait of Ben Hankins, solutions engineer and software builder, outdoors in New Orleans"
                  fill
                  priority
                  sizes="(max-width: 768px) 304px, 320px"
                  className="object-cover"
                />
              </div>
              {/* fig-tag: half-overlaps the plate-frame's top edge */}
              <span className="fig-tag">Fig. 01 · Specimen</span>
              {/* rotated-stamp: the one per this page — real status language,
                  not decoration. */}
              <span className="rotated-stamp absolute -bottom-5 -right-4 hidden text-[0.56rem] sm:inline-flex">
                Est. 2025
              </span>
            </div>
            <figcaption className="mt-4 rotate-[-1.5deg] font-mono text-[0.66rem] tracking-[0.06em] uppercase text-ink-muted">
              Ben Hankins, building from New Orleans
            </figcaption>
          </motion.figure>
        </div>

        {/* Ledger stat strip: full width, ruled dividers */}
        <motion.div
          className="mt-14 grid grid-cols-3 border-t border-b border-line"
          {...reveal(0.46)}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="border-l border-line px-2 py-5 first:border-l-0 sm:px-6"
            >
              <div className="font-heading text-[1.7rem] sm:text-[1.9rem] font-bold text-forest-deep tracking-tight leading-none">
                {s.num}
              </div>
              <div className="mt-2 font-mono text-[0.6rem] tracking-[0.1em] uppercase text-ink-muted">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Trusted-by — a compact, single-line logo ticker instead of a
            two-line name list. Logos render desaturated (grayscale) so
            their brand colors don't add a fourth accent hue to the page;
            they resolve to full color on hover. Duplicated once for a
            seamless loop via the existing `ticker-scroll` keyframe. */}
        <motion.div className="mt-6 flex items-center gap-4" {...reveal(0.52)}>
          <span className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-ink-muted whitespace-nowrap">
            Trusted on
            <br className="sm:hidden" /> engagements with
          </span>
          <div className="logo-ticker relative min-w-0 flex-1 overflow-hidden">
            <div
              className={`logo-ticker-track flex w-max items-center gap-9 ${
                reduce ? "" : "animate-ticker-scroll"
              }`}
            >
              {[...trustedLogos, ...trustedLogos].map((logo, i) => (
                // eslint-disable-next-line @next/next/no-img-element -- variable-width logo row, next/image needs fixed dims per logo
                <img
                  key={`${logo.name}-${i}`}
                  src={logo.src}
                  alt={i < trustedLogos.length ? logo.name : ""}
                  aria-hidden={i >= trustedLogos.length}
                  className="h-5 w-auto shrink-0 object-contain grayscale opacity-50 transition-all duration-300 hover:opacity-90 hover:grayscale-0 md:h-6"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll cue: a travelling clay tick down a ruled line, fading out as
            soon as the reader takes the hint. */}
        <motion.div
          className="mt-12 hidden flex-col items-center gap-2.5 md:flex"
          style={reduce ? undefined : { opacity: cueOpacity }}
          aria-hidden
        >
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ink-muted">
            Scroll
          </span>
          <span className="relative block h-10 w-px overflow-hidden bg-line-strong">
            <motion.span
              className="absolute inset-x-0 block h-4 bg-clay"
              initial={{ y: -16 }}
              animate={reduce ? { y: -16 } : { y: [-16, 40] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 1.9, repeat: Infinity, ease: EASE.easeInOut, repeatDelay: 0.35 }
              }
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
