"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import { MOTION } from "@/lib/animation-configs/motion";
import { DARK_SECTION_IDS, SECTION_IDS, SECTIONS } from "@/lib/sections";

/**
 * Fixed margin rail: a running table of contents for the page.
 *
 * The index number of the section you are reading lights up, and a hairline
 * track fills with overall scroll progress. Both are cheap — the fill is a
 * motion value (no React render per frame) and the active section comes from an
 * IntersectionObserver, not a scroll listener.
 *
 * Only shown from xl up, where the 6xl content column leaves real margin for it.
 */
export default function ScrollRail() {
  const reduce = Boolean(useReducedMotion());
  const active = useActiveSection(SECTION_IDS);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, MOTION.spring.progress);

  // The contact section paints deep forest green, so the rail has to invert
  // there or it drops to ~2:1 against its own background.
  const onDark = active !== null && DARK_SECTION_IDS.includes(active);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-4 top-1/2 z-[90] hidden -translate-y-1/2 xl:block"
    >
      {/* The rail floats over whatever happens to be under it — including the
          contact section's clay plate, where bare marks fell to ~3.3:1. Giving
          it its own near-opaque ground keeps every state legible regardless. */}
      <div
        className={[
          "flex items-stretch gap-2.5 rounded-xl border py-3 pl-3 pr-2.5",
          onDark ? "border-paper/20 bg-accent" : "border-line bg-paper",
        ].join(" ")}
      >
        <ul className="flex list-none flex-col gap-4">
        {SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center justify-end gap-2 no-underline focus-visible:outline-none"
              >
                <span
                  className={[
                    "pointer-events-none whitespace-nowrap rounded-md border px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100",
                    onDark
                      ? "border-paper/25 bg-accent-hover text-paper"
                      : "border-line bg-paper-card text-ink",
                  ].join(" ")}
                >
                  {section.label}
                </span>

                <span
                  className={[
                    // No colour transition: the chip's ground swaps between light
                    // and dark the instant the section changes, so a fading mark
                    // would spend ~200ms dark-on-dark at the boundary.
                    "font-mono text-[0.62rem] tabular-nums",
                    onDark
                      ? isActive
                        ? "text-[#F3B18C]"
                        : "text-paper/85"
                      : isActive
                        ? "text-clay"
                        : "text-ink-muted",
                  ].join(" ")}
                >
                  {section.num}
                </span>

                <span
                  aria-hidden
                  className={[
                    // width only, for the same reason as above
                    "h-px transition-[width] duration-300",
                    isActive ? "w-5" : "w-2.5 group-hover:w-4",
                    onDark
                      ? isActive
                        ? "bg-[#F3B18C]"
                        : "bg-paper/45 group-hover:bg-paper/85"
                      : isActive
                        ? "bg-clay"
                        : "bg-line-strong group-hover:bg-ink-muted",
                  ].join(" ")}
                />
              </a>
            </li>
          );
        })}
        </ul>

        {/* Overall scroll progress, as a hairline ledger rule down the margin. */}
        <div
          aria-hidden
          className={`relative w-px ${onDark ? "bg-paper/25" : "bg-line-strong"}`}
        >
          <motion.span
            className={`absolute inset-x-0 top-0 h-full origin-top ${onDark ? "bg-[#F3B18C]" : "bg-clay"}`}
            style={{ scaleY: reduce ? 1 : progress }}
          />
        </div>
      </div>
    </nav>
  );
}
