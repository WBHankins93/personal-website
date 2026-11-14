"use client";

// Hero, Tier 1 (handoff 7.1). Pure SVG and CSS: a schematic layer with a
// painted layer clipped on top of it. One number drives everything, the
// reveal position p from 0 (all schematic) to 1 (all painted). The auto
// sweep, the drag handle, the keyboard and the switch all call setReveal().
//
// Tier 2 (Three.js) mounts over this later and reads the same value; this
// component stays as the phone version and the fallback.
//
// The nav and text block render three times: a mint copy inside the
// schematic layer, a cream copy inside the clipped painted layer, and a
// transparent "live" copy on top that holds the real h1 and links. The two
// visual copies are inert and aria-hidden.
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { navLinks, site } from "@/content/site";

// Tier 2: Three.js layers over the SVG. A separate chunk, fetched after
// first paint, never on the server.
const BayouCanvas = dynamic(() => import("./tier2/BayouCanvas"), { ssr: false });

type Mode = "schematic" | "painted";
type Variant = Mode | "live";

const SWEEP_DELAY = 400;
const SWEEP_MS = 3000;
const SWITCH_MS = 600;
/** How far the line leans at mid-sweep, as a share of the hero width. */
const LEAN = 11;
/** Handle travel insets in px. Keep in step with .hero-handle in hero.css. */
const HANDLE_MIN = 34;
const HANDLE_MAX = 22;
const DESKTOP = "(min-width: 64rem)";
const REDUCED = "(prefers-reduced-motion: reduce)";
/** Set when Tier 2 gave up on this machine, so a reload does not retry it. */
const TIER_FLAG = "bayou-tier1";

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return gl !== null;
  } catch {
    return false;
  }
}

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function Chrome({ variant }: { variant: Variant }) {
  const live = variant === "live";
  const hidden = live ? {} : { "aria-hidden": true, inert: true };
  const Name = live ? "h1" : "div";
  return (
    <div className={`hero-chrome hero-chrome--${variant}`} {...hidden}>
      <header className="hero-nav">
        <a className="hero-logo" href="#top" aria-label="Ben Hankins, back to top">
          <Image src="/b-logo-back-removed.png" alt="" width={46} height={46} priority={variant === "schematic"} />
        </a>
        <nav aria-label="Sections">
          <ul className="hero-nav-links">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div className="hero-copy">
        <Name className="hero-name">
          <span>Ben</span> <span>Hankins</span>
        </Name>
        <p className="hero-role">
          {site.role} · {site.place}
        </p>
        <p className="hero-tagline">{site.tagline}</p>
        <div className="hero-cta">
          <a className="hero-btn hero-btn--primary" href="#work">
            See the work →
          </a>
          <a className="hero-btn" href="#trail">
            Walk the trail
          </a>
        </div>
      </div>
    </div>
  );
}

interface HeroProps {
  /** <BayouScene mode="schematic" />, rendered on the server. */
  schematicScene: ReactNode;
  /** <BayouScene mode="paint" />, rendered on the server. */
  paintedScene: ReactNode;
  featured: { eyebrow: string; title: string; cta: string; href: string; external: boolean };
}

export default function Hero({ schematicScene, paintedScene, featured }: HeroProps) {
  const root = useRef<HTMLElement>(null);
  const line = useRef<SVGGElement>(null);
  const handle = useRef<HTMLDivElement>(null);
  const paintPct = useRef<HTMLElement>(null);
  const reflect = useRef<HTMLElement>(null);
  const reveal = useRef(0);
  const frame = useRef(0);
  const dragging = useRef(false);
  // Which end the reveal is nearer. Drives aria-pressed and what is tabbable.
  const [mode, setMode] = useState<Mode>("schematic");
  // Tier 2 state: "off" (SVG only), "loading" (canvas mounting underneath
  // the SVG), "on" (canvas drawing, SVG scenes hidden).
  const [tier2, setTier2] = useState<"off" | "loading" | "on">("off");
  const [guard, setGuard] = useState(true);

  const cancel = useCallback(() => cancelAnimationFrame(frame.current), []);

  const setReveal = useCallback((value: number) => {
    const p = clamp01(value);
    reveal.current = p;
    const el = root.current;
    if (!el) return;
    const lean = LEAN * Math.sin(Math.PI * p);
    el.style.setProperty("--x", `${(p * 100).toFixed(3)}%`);
    el.style.setProperty("--k", `${lean.toFixed(3)}%`);
    if (p <= 0) el.dataset.edge = "schematic";
    else if (p >= 1) el.dataset.edge = "painted";
    else delete el.dataset.edge;
    line.current?.querySelectorAll("line").forEach((l) => {
      l.setAttribute("x1", lean.toFixed(3));
      l.setAttribute("x2", (-lean).toFixed(3));
    });
    const pct = Math.round(p * 100);
    if (handle.current) {
      handle.current.setAttribute("aria-valuenow", String(pct));
      handle.current.setAttribute("aria-valuetext", `${pct}% painted`);
    }
    if (paintPct.current) paintPct.current.textContent = p <= 0 ? "starting" : `${pct}%`;
    if (reflect.current) {
      reflect.current.textContent = p > 0.3 ? "ok" : "waiting";
      reflect.current.className = p > 0.3 ? "" : "is-wait";
    }
    setMode(p < 0.5 ? "schematic" : "painted");
  }, []);

  const animateTo = useCallback(
    (target: number, ms: number) => {
      cancel();
      if (window.matchMedia(REDUCED).matches || ms <= 0) {
        setReveal(target);
        return;
      }
      const from = reveal.current;
      const start = performance.now();
      const tick = (now: number) => {
        const t = clamp01((now - start) / ms);
        setReveal(from + (target - from) * easeInOut(t));
        if (t < 1) frame.current = requestAnimationFrame(tick);
      };
      frame.current = requestAnimationFrame(tick);
    },
    [cancel, setReveal],
  );

  // On load: schematic, then one sweep to painted. Phones and reduced
  // motion skip the sweep and start painted, matching the CSS defaults.
  useEffect(() => {
    const still = !window.matchMedia(DESKTOP).matches || window.matchMedia(REDUCED).matches;
    if (still) {
      setReveal(1);
      return;
    }
    setReveal(0);
    const timer = window.setTimeout(() => animateTo(1, SWEEP_MS), SWEEP_DELAY);
    return () => {
      window.clearTimeout(timer);
      cancel();
    };
  }, [animateTo, cancel, setReveal]);

  // Tier 2 mounts only at 1024px and wider, with WebGL, with reduced motion
  // off, and after the page has loaded, so it never delays first paint.
  // ?tier=1 forces the SVG hero; ?tier=2 forces the canvas and switches off
  // the frame-rate fallback (for review on slow or headless machines).
  useEffect(() => {
    const force = new URLSearchParams(window.location.search).get("tier");
    const desktop = window.matchMedia(DESKTOP);
    const reduced = window.matchMedia(REDUCED);
    let idle = 0;
    const gaveUp = () => {
      try {
        return window.sessionStorage.getItem(TIER_FLAG) === "1";
      } catch {
        return false;
      }
    };

    const decide = () => {
      const eligible = desktop.matches && !reduced.matches && force !== "1" && (force === "2" || !gaveUp());
      if (!eligible) {
        setTier2("off");
        return;
      }
      setGuard(force !== "2");
      setTier2((current) => (current === "off" && hasWebGL() ? "loading" : current));
    };
    const start = () => {
      idle = window.setTimeout(decide, 300);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    desktop.addEventListener("change", decide);
    reduced.addEventListener("change", decide);
    return () => {
      window.clearTimeout(idle);
      window.removeEventListener("load", start);
      desktop.removeEventListener("change", decide);
      reduced.removeEventListener("change", decide);
    };
  }, []);

  const onTierReady = useCallback(() => setTier2((current) => (current === "loading" ? "on" : current)), []);
  const onTierFail = useCallback((reason: string) => {
    setTier2("off");
    try {
      window.sessionStorage.setItem(TIER_FLAG, "1");
    } catch {}
    if (process.env.NODE_ENV !== "production") console.info(`[hero] staying on Tier 1: ${reason}`);
  }, []);

  const revealFromPointer = (clientX: number) => {
    const el = root.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    setReveal((clientX - box.left - HANDLE_MIN) / (box.width - HANDLE_MIN - HANDLE_MAX));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    cancel();
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
    e.currentTarget.focus({ preventScroll: true });
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) revealFromPointer(e.clientX);
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = 0.05;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = reveal.current + step;
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = reveal.current - step;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 1;
    if (next === null) return;
    e.preventDefault();
    cancel();
    // Snap to the 5% grid so repeated presses land on round numbers.
    setReveal(Math.round(next * 20) / 20);
  };

  const painted = mode === "painted";

  return (
    <section id="top" ref={root} className="hero" data-mode={mode} data-edge="schematic" data-tier={tier2 === "on" ? "2" : "1"} aria-label="Introduction">
      <noscript>
        <style>{`.hero{--x:100%}`}</style>
      </noscript>

      {tier2 !== "off" && <BayouCanvas hero={root} reveal={reveal} guard={guard} onReady={onTierReady} onFail={onTierFail} />}

      <div className="hero-layer hero-layer--schematic">
        {schematicScene}
        <div className="hero-fade" aria-hidden="true" />
        <Chrome variant="schematic" />
        <div className="hero-log" aria-hidden="true">
          <div>&gt; build bayou.scene</div>
          <div>
            &gt; cypress.mesh <b>ok</b>
          </div>
          <div>
            &gt; moss.shader <b>ok</b>
          </div>
          <div>
            &gt; water.reflect <b ref={reflect} className="is-wait">waiting</b>
          </div>
          <div>
            &gt; paint
            <span>
              <b ref={paintPct}>starting</b>
              <i className="hero-caret" />
            </span>
          </div>
        </div>
      </div>

      <div className="hero-layer hero-layer--painted grain">
        {paintedScene}
        <div className="hero-scrim" aria-hidden="true" />
        <Chrome variant="painted" />
      </div>

      <div className="hero-line" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <g ref={line} stroke="#5dffb0" strokeLinecap="round">
            <line x1="0" y1="0" x2="0" y2="100" strokeWidth="14" opacity=".25" vectorEffect="non-scaling-stroke" />
            <line x1="0" y1="0" x2="0" y2="100" strokeWidth="3" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>
      </div>
      <div className="hero-park" aria-hidden="true" />

      <Chrome variant="live" />

      {/* Painted-only UI, clipped by the same reveal shape. */}
      <div className="hero-layer hero-layer--ui">
        <a
          className="hero-feat"
          href={featured.href}
          tabIndex={painted ? undefined : -1}
          {...(featured.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <span className="mono">{featured.eyebrow}</span>
          <b>{featured.title}</b>
          <span className="mono">{featured.cta} →</span>
        </a>
      </div>

      <div
        ref={handle}
        className="hero-handle"
        role="slider"
        tabIndex={0}
        aria-label="Schematic to painted"
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <span aria-hidden="true">◂▸</span>
      </div>

      <div className="hero-toggle" role="group" aria-label="Hero rendering">
        <button type="button" aria-pressed={!painted} onClick={() => animateTo(0, SWITCH_MS)}>
          Schematic
        </button>
        <button type="button" aria-pressed={painted} onClick={() => animateTo(1, SWITCH_MS)}>
          Painted
        </button>
      </div>
    </section>
  );
}
