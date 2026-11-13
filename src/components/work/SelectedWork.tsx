"use client";

// Selected Work (handoff 7.3). A wall of posters. Hover or keyboard focus
// flips a poster to its schematic side; click or Enter unfolds a detail
// panel under the wall. On touch screens a tap flips and a "Details" button
// on the back unfolds. One panel open at a time, Escape closes it.
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { labs, projects, type Project } from "@/content/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PosterBack, PosterFront } from "./Poster";

const FLIP = { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const };
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function PosterButton({
  project,
  flipped,
  open,
  touch,
  reduced,
  onFlip,
  onActivate,
  onDetails,
  register,
}: {
  project: Project;
  flipped: boolean;
  open: boolean;
  touch: boolean;
  reduced: boolean;
  onFlip: (on: boolean) => void;
  onActivate: () => void;
  onDetails: () => void;
  register: (el: HTMLButtonElement | null) => void;
}) {
  const title = project.titleLines.join(" ");
  const altId = `${project.slug}-schematic`;
  return (
    <li className="poster-slot" data-open={open || undefined}>
      <button
        ref={register}
        type="button"
        className="poster-btn"
        aria-expanded={open}
        aria-controls="work-panel"
        aria-describedby={altId}
        onClick={onActivate}
        onMouseEnter={touch ? undefined : () => onFlip(true)}
        onMouseLeave={touch ? undefined : () => onFlip(false)}
        onFocus={touch ? undefined : () => onFlip(true)}
        onBlur={touch ? undefined : () => onFlip(false)}
      >
        <span className="sr-only">
          {title}. {project.footer}. {touch ? "Flip the poster" : open ? "Close details" : "Open details"}.
        </span>
        <motion.span
          className="poster-flip"
          aria-hidden="true"
          initial={false}
          animate={{ rotateY: flipped && !reduced ? 180 : 0 }}
          transition={FLIP}
        >
          {/* Reduced motion: the faces cross-fade in place instead of flipping. */}
          <motion.span
            className="poster-face"
            initial={false}
            animate={{ opacity: reduced && flipped ? 0 : 1 }}
            transition={{ duration: reduced ? 0.2 : 0 }}
          >
            <PosterFront project={project} uid={`wall-${project.slug}`} />
          </motion.span>
          <motion.span
            className={`poster-face ${reduced ? "poster-face--flat" : "poster-face--back"}`}
            initial={false}
            animate={{ opacity: reduced && !flipped ? 0 : 1 }}
            transition={{ duration: reduced ? 0.2 : 0 }}
          >
            <PosterBack project={project} uid={`wall-${project.slug}-back`} />
          </motion.span>
        </motion.span>
      </button>
      <span id={altId} className="sr-only">
        {project.schematic ? project.schematic.alt : "Architecture diagram coming soon."}
      </span>
      {touch && flipped && (
        <button type="button" className="poster-details" onClick={onDetails} aria-controls="work-panel" aria-expanded={open}>
          Details <span aria-hidden="true">↓</span>
          <span className="sr-only"> for {title}</span>
        </button>
      )}
    </li>
  );
}

function Panel({ project, onClose }: { project: Project; onClose: () => void }) {
  const title = project.titleLines.join(" ");
  const shots = project.screenshots;
  return (
    <>
      <div className="panel-poster" aria-hidden="true">
        <PosterFront project={project} uid={`panel-${project.slug}`} />
      </div>
      <div className="panel-body">
        <p className="eyebrow">Unfolded view</p>
        <h3 id="work-panel-title" className="panel-title">
          {title}
        </h3>
        <ul className="panel-bullets">
          {project.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        {project.stack.length > 0 && (
          <ul className="panel-chips" aria-label="Stack">
            {project.stack.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
        )}
        {project.link.href ? (
          <a className="panel-cta" href={project.link.href} target="_blank" rel="noopener noreferrer">
            {project.link.label} →
          </a>
        ) : (
          <span className="panel-cta panel-cta--pending">{project.link.label} · link coming</span>
        )}
      </div>
      <div className="panel-shots">
        {[0, 1, 2].map((i) => {
          const shot = shots[i];
          return shot ? (
            <div key={i} className="shot">
              <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes={i === 0 ? "(min-width: 64rem) 30vw, 100vw" : "(min-width: 64rem) 15vw, 50vw"} />
            </div>
          ) : (
            <div key={i} className="shot shot--empty">
              <span>{i === 0 ? "Product screenshot coming" : `Screenshot ${i + 1} coming`}</span>
            </div>
          );
        })}
      </div>
      <button type="button" className="panel-close" onClick={onClose}>
        Close <span aria-hidden="true">×</span>
      </button>
    </>
  );
}

export default function SelectedWork() {
  const reduced = useReducedMotion();
  const [flipped, setFlipped] = useState<string | null>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [touch, setTouch] = useState(false);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const panel = useRef<HTMLDivElement>(null);
  const openProject = projects.find((p) => p.slug === openSlug) ?? null;

  useEffect(() => {
    const mq = window.matchMedia(HOVER_QUERY);
    const sync = () => setTouch(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const close = useCallback(() => {
    setOpenSlug((slug) => {
      if (slug) buttons.current.get(slug)?.focus({ preventScroll: true });
      return null;
    });
  }, []);

  // Escape closes the panel and hands focus back to its poster.
  useEffect(() => {
    if (!openSlug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openSlug, close]);

  // Opening moves focus to the panel and scrolls it into view.
  useEffect(() => {
    if (!openSlug || !panel.current) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panel.current.focus({ preventScroll: true });
    panel.current.scrollIntoView({ block: "nearest", behavior: smooth ? "smooth" : "auto" });
  }, [openSlug]);

  const toggleOpen = (slug: string) => setOpenSlug((current) => (current === slug ? null : slug));

  return (
    <section id="work" className="section work grain" aria-labelledby="work-title">
      <p className="eyebrow">Selected work · {touch ? "tap a poster to flip it" : "click a poster to unfold it"}</p>
      <h2 id="work-title" className="section-title">
        Things I built
      </h2>

      <ul className="wall" style={{ "--posters": projects.length } as CSSProperties}>
        {projects.map((project) => (
          <PosterButton
            key={project.slug}
            project={project}
            flipped={flipped === project.slug}
            open={openSlug === project.slug}
            touch={touch}
            reduced={reduced}
            onFlip={(on) => setFlipped((current) => (on ? project.slug : current === project.slug ? null : current))}
            onActivate={() => {
              if (touch) setFlipped((current) => (current === project.slug ? null : project.slug));
              else toggleOpen(project.slug);
            }}
            onDetails={() => setOpenSlug(project.slug)}
            register={(el) => {
              if (el) buttons.current.set(project.slug, el);
              else buttons.current.delete(project.slug);
            }}
          />
        ))}
      </ul>
      <p className="wall-swipe mono" aria-hidden="true">
        ← Swipe →
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {openProject && (
          <motion.div
            key={openProject.slug}
            ref={panel}
            id="work-panel"
            className="panel motion-reveal"
            role="region"
            aria-labelledby="work-panel-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <Panel project={openProject} onClose={close} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="labs">
        <span className="labs-label mono">Open source + labs →</span>
        {labs.map((lab) => (
          <a key={lab.href} className="labs-chip mono" href={lab.href} target="_blank" rel="noopener noreferrer">
            {lab.label}
          </a>
        ))}
      </div>
    </section>
  );
}
