// Illustration kit reference (handoff milestone 2). Available in local dev
// and on Vercel preview deployments; 404 in production.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import BayouScene from "@/components/hero/BayouScene";
import { Cypress, Fir, FirRow, Halftone, Moss, ReflectionBars, Ridge, type ArtMode } from "@/components/kit";
import PostcardArt from "@/components/offclock/scenes";
import { PosterArt } from "@/components/work/PosterArt";

export const metadata: Metadata = { title: "Illustration kit", robots: { index: false, follow: false } };

const TOKENS: [string, string][] = [
  ["cream", "#f6ecd4"],
  ["ink", "#0b2423"],
  ["teal", "#12403e"],
  ["teal-mid", "#2c6f66"],
  ["water", "#1b5853"],
  ["moss", "#5f7d57"],
  ["moss-light", "#8fae7a"],
  ["sun", "#f58a2c"],
  ["coral", "#ee4e34"],
  ["yellow", "#ffcb05"],
  ["pink", "#ff3d8b"],
  ["cyan", "#37d6ff"],
  ["mint", "#5dffb0"],
  ["schematic-bg", "#06120f"],
  ["sign", "#5b3a21"],
  ["sand", "#e9dcbc"],
];

function Pair({ name, viewBox, children }: { name: string; viewBox: string; children: (mode: ArtMode) => ReactNode }) {
  return (
    <figure className="kit-tile">
      <div className="kit-pair">
        <div className="grain">
          <svg viewBox={viewBox} role="img" aria-label={`${name}, painted`}>
            {children("paint")}
          </svg>
        </div>
        <div className="kit-dark">
          <svg viewBox={viewBox} role="img" aria-label={`${name}, schematic`}>
            {children("schematic")}
          </svg>
        </div>
      </div>
      <figcaption>{name}</figcaption>
    </figure>
  );
}

export default function KitPage() {
  if (process.env.VERCEL_ENV === "production") notFound();

  return (
    <main className="kit-page">
      <p className="eyebrow">Dev only · milestone 2</p>
      <h1 className="section-title">Illustration kit</h1>
      <p style={{ maxWidth: 680 }}>
        Every piece draws from seeded geometry, so it is identical on the server and the client. Left is paint mode, right is
        schematic mode. Grain sits on painted surfaces only.
      </p>

      <h2 className="eyebrow" style={{ marginTop: 40 }}>
        Tokens
      </h2>
      <div className="kit-swatches">
        {TOKENS.map(([name, hex]) => (
          <div key={name} className="kit-swatch">
            <i style={{ background: hex }} />
            <span>{name}</span>
            <span>{hex}</span>
          </div>
        ))}
      </div>

      <h2 className="eyebrow" style={{ marginTop: 40 }}>
        Type
      </h2>
      <p className="anton" style={{ fontSize: 72, textShadow: "5px 5px 0 var(--color-coral)" }}>
        Anton display
      </p>
      <p className="mono" style={{ fontSize: 13 }}>
        JetBrains Mono 500 · labels and UI
      </p>
      <p>Space Grotesk 400 for body, <strong>700 for emphasis</strong>.</p>
      <p style={{ fontFamily: "var(--font-serif)", fontSize: 27 }}>DM Serif Display, tagline only.</p>

      <h2 className="eyebrow" style={{ marginTop: 40 }}>
        Components
      </h2>
      <div className="kit-grid">
        <Pair name="<Cypress />" viewBox="0 0 300 240">
          {(mode) => (
            <>
              <Cypress mode={mode} x={95} base={225} h={190} w={10} color="#12403e" mossColor="#8fae7a" seed={202} />
              <Cypress mode={mode} x={220} base={225} h={140} w={7} color="#2c6f66" mossColor="#6fa08b" seed={31} />
            </>
          )}
        </Pair>
        <Pair name="<Fir /> and <FirRow />" viewBox="0 0 300 240">
          {(mode) => (
            <>
              <FirRow mode={mode} width={300} b={225} count={7} h={110} w={16} color="#2f6b3f" seed={5} />
              <Fir mode={mode} x={150} b={230} h={190} w={30} color="#0b2423" />
            </>
          )}
        </Pair>
        <Pair name="<Ridge />" viewBox="0 0 300 240">
          {(mode) => (
            <>
              <Ridge mode={mode} width={300} y={150} amp={80} step={30} seed={5} bottom={240} color="#e2733a" />
              <Ridge mode={mode} width={300} y={180} amp={46} step={20} seed={9} bottom={240} color="#a8502f" />
            </>
          )}
        </Pair>
        <Pair name="<Moss />" viewBox="0 0 300 240">
          {(mode) => (
            <g className={mode === "schematic" ? "bayou-schematic" : undefined}>
              <path d="M0,22 Q150,-10 300,26 L300,44 Q150,8 0,40 Z" fill="#081d1c" />
              <Moss color="#5f7d57" count={11} seed={909} x={(i) => 16 + i * 26} top={(mx) => 34 - Math.sin((mx / 300) * Math.PI) * 20} length={() => [40, 110]} />
            </g>
          )}
        </Pair>
        <Pair name="<Halftone />" viewBox="0 0 300 240">
          {(mode) => (
            <g className={mode === "schematic" ? "bayou-schematic" : undefined}>
              <defs>
                <Halftone id={`kit-dots-${mode}`} color="#143a22" />
              </defs>
              <circle cx="150" cy="120" r="84" fill="#35b45a" />
              <circle className="paint-only" cx="150" cy="120" r="84" fill={`url(#kit-dots-${mode})`} opacity=".3" />
            </g>
          )}
        </Pair>
        <Pair name="<ReflectionBars />" viewBox="0 0 300 240">
          {(mode) => (
            <g className={mode === "schematic" ? "bayou-schematic" : undefined}>
              <circle cx="150" cy="90" r="60" fill="#fff3cf" />
              <rect y="90" width="300" height="150" fill="#1b5853" />
              <ReflectionBars cx={150} y={102} count={12} gap={11} minW={30} spanW={150} jitter={20} height={5} color="#f7bf73" seed={12} startOpacity={0.9} fade={0.05} />
            </g>
          )}
        </Pair>
      </div>

      <h2 className="eyebrow" style={{ marginTop: 40 }}>
        Poster art
      </h2>
      <div className="kit-grid">
        {(["field-kit", "greenlit", "plan-writer", "clipboard", "generic"] as const).map((art) => (
          <Pair key={art} name={art} viewBox="0 0 300 425">
            {(mode) => (
              <>
                {mode === "paint" && <rect width="300" height="425" fill={{ "field-kit": "#0d2f2d", greenlit: "#dff0c8", "plan-writer": "#1c2a4a", clipboard: "#f3b23e", generic: "#fbe3ac" }[art]} />}
                <PosterArt art={art} mode={mode} uid={`kit-${art}-${mode}`} />
              </>
            )}
          </Pair>
        ))}
      </div>

      <h2 className="eyebrow" style={{ marginTop: 40 }}>
        Postcard scenes
      </h2>
      <div className="kit-grid">
        {(["hiking", "marsh", "festivals", "golf"] as const).map((scene) => (
          <figure key={scene} className="kit-tile">
            <div className="grain" style={{ position: "relative" }}>
              <PostcardArt scene={scene} />
            </div>
            <figcaption>{scene}</figcaption>
          </figure>
        ))}
      </div>

      <h2 className="eyebrow" style={{ marginTop: 40 }}>
        Hero scene
      </h2>
      <div className="kit-grid" style={{ gridTemplateColumns: "1fr" }}>
        <figure className="kit-tile">
          <div className="kit-pair">
            <div className="grain" style={{ aspectRatio: "1440 / 810" }}>
              <BayouScene mode="paint" />
            </div>
            <div className="kit-dark" style={{ aspectRatio: "1440 / 810" }}>
              <BayouScene mode="schematic" />
            </div>
          </div>
          <figcaption>&lt;BayouScene /&gt; · layers: sky, sun, ridges, far-trees, water, mid-trees, egret, foreground</figcaption>
        </figure>
      </div>
    </main>
  );
}
