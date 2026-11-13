"use client";

// The Trail (handoff 7.4). Desktop: one wide SVG elevation profile with a
// dashed coral trail through six markers; hover, focus or tap on a marker
// opens a detail card. Phones: a vertical trail, newest first, with details
// that expand in place.
//
// The trail draws in once when it scrolls into view. Everything is visible
// by default: the "armed" state that hides the line and markers is only set
// by JavaScript, only when the map is still below the fold and motion is
// allowed, so nothing can be stranded invisible.
import { useEffect, useRef, useState } from "react";
import { trail, type TrailStop } from "@/content/trail";
import { n, rnd } from "@/lib/rand";

const W = 1352;
const H = 600;
const AXIS_Y = 566;
/** Marker positions in the 1352 x 600 map, oldest to newest. */
const POINTS: [number, number][] = [
  [110, 480],
  [330, 440],
  [560, 360],
  [800, 285],
  [1040, 215],
  [1270, 120],
];
const LABEL_W = 206;

const line = (dy: number) => POINTS.map(([x, y]) => `${x},${y + dy}`).join(" L");
const TRAIL_PATH = `M0,540 L${line(0)}`;

function Slope() {
  const r = rnd(3);
  const firs = [];
  for (let i = 0; i < 34; i++) {
    const x = 20 + i * 40 + r() * 14;
    const y = 560 - (x / W) * 400 + r() * 30;
    const h = 26 + r() * 34;
    if (y < 590) firs.push(<path key={i} d={`M${n(x - 10)},${n(y + 50)} L${n(x)},${n(y + 50 - h)} L${n(x + 10)},${n(y + 50)} Z`} fill="#12403e" />);
  }
  return (
    <>
      {/* Two tan ridge layers with snow caps. */}
      <path d="M0,420 L120,330 L240,380 L380,250 L520,330 L640,220 L800,300 L930,190 L1100,280 L1230,170 L1352,230 L1352,600 L0,600 Z" fill="#dccb9f" />
      <path d="M0,520 L160,300 L260,400 L420,180 L560,360 L700,150 L860,330 L1010,90 L1180,300 L1352,120 L1352,600 L0,600 Z" fill="#cdbb8d" />
      <path d="M1010,90 L975,150 L1000,140 L1018,160 L1045,146 Z M700,150 L672,196 L696,188 L712,204 L730,196 Z" fill="#f6ecd4" />
      {/* Teal slope, contour lines parallel to its surface, scattered firs. */}
      <path d={`M0,560 L${line(30)} L${W},125 L${W},${H} L0,${H} Z`} fill="#2c6f66" />
      {[1, 2, 3, 4, 5, 6].map((k) => (
        <path key={k} d={`M0,${560 + k * 34} L${line(30 + k * 34)} L${W},${125 + k * 34}`} fill="none" stroke="#3f857a" strokeWidth="1.6" />
      ))}
      {firs}
    </>
  );
}

function Compass() {
  return (
    <g transform="translate(905 492)">
      <circle r="40" fill="#f6ecd4" stroke="#0b2423" strokeWidth="2.5" />
      <path d="M0,-32 L9,0 L0,32 L-9,0 Z" fill="#0b2423" />
      <path d="M0,-32 L9,0 L-9,0 Z" fill="#ee4e34" />
      <path d="M-32,0 L0,-7 L32,0 L0,7 Z" fill="#0b2423" opacity=".35" />
      <text y="-44" textAnchor="middle" fontSize="13" fill="#f6ecd4">
        N
      </text>
    </g>
  );
}

function Legend() {
  return (
    <g transform="translate(1000 440)">
      <rect width="300" height="108" fill="#f6ecd4" stroke="#0b2423" strokeWidth="2" />
      <text x="14" y="22" fontSize="11" letterSpacing="2" fill="#1f5a53">
        LEGEND
      </text>
      <line x1="14" y1="42" x2="62" y2="42" stroke="#ee4e34" strokeWidth="4" strokeDasharray="10 7" />
      <text x="76" y="46" fontSize="11" fill="#0b2423">
        career trail
      </text>
      <circle cx="38" cy="66" r="8" fill="#f6ecd4" stroke="#0b2423" strokeWidth="3" />
      <text x="76" y="70" fontSize="11" fill="#0b2423">
        role · hover for stack + stories
      </text>
      <path d="M32,98 v-18 l16,5 l-16,5" fill="#ff3d8b" stroke="#0b2423" strokeWidth="2" />
      <text x="76" y="94" fontSize="11" fill="#0b2423">
        next summit
      </text>
    </g>
  );
}

function Detail({ stop }: { stop: TrailStop }) {
  return (
    <>
      <p className="trail-detail-role">{stop.roleLong}</p>
      {stop.bullets.length > 0 && (
        <ul className="trail-detail-bullets">
          {stop.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {stop.stack.length > 0 && (
        <ul className="trail-detail-chips" aria-label="Stack">
          {stop.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function TrailMap() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [draw, setDraw] = useState<"idle" | "armed" | "drawn">("idle");
  const shown = pinned ?? active;

  // Draw in once on entering the viewport. Skipped under reduced motion.
  useEffect(() => {
    const el = wrap.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.8) return;
    setDraw("armed");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDraw("drawn");
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Escape or a click elsewhere closes a pinned card.
  useEffect(() => {
    if (!pinned) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPinned(null);
        setActive(null);
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest(".trail-stop")) setPinned(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [pinned]);

  return (
    <div ref={wrap} className="trail-map" data-draw={draw}>
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
        <defs>
          {/* Solid copy of the trail, used to wipe the dashed line in. */}
          <mask id="trail-wipe" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            <path className="trail-wipe" d={TRAIL_PATH} pathLength="1" fill="none" stroke="#fff" strokeWidth="14" strokeLinecap="round" />
          </mask>
        </defs>
        <Slope />
        <path d={TRAIL_PATH} mask="url(#trail-wipe)" fill="none" stroke="#ee4e34" strokeWidth="5" strokeDasharray="14 10" strokeLinecap="round" />
        {/* Ink axis band with the year under each marker. */}
        <rect x="0" y={AXIS_Y} width={W} height={H - AXIS_Y} fill="#0b2423" />
        {trail.map((stop, i) => {
          const [x, y] = POINTS[i];
          return (
            <g key={stop.id}>
              <line x1={x} y1={y} x2={x} y2={AXIS_Y} stroke="#f6ecd4" strokeOpacity=".55" strokeDasharray="2 6" strokeWidth="1.5" />
              <text x={x} y="588" textAnchor="middle" fontSize="12" fill="#f6ecd4" letterSpacing="2">
                {stop.axisYear}
              </text>
            </g>
          );
        })}
        <Compass />
        <Legend />
        {trail.map((stop, i) => {
          const [x, y] = POINTS[i];
          const bx = stop.summit ? x - LABEL_W + 40 : x - LABEL_W / 2;
          const by = stop.summit ? y + 84 : y - 96;
          return (
            <g key={stop.id} className="trail-pop" style={{ "--i": i } as React.CSSProperties}>
              <circle cx={x} cy={y} r={stop.summit ? 16 : 11} fill={stop.summit ? "#ffcb05" : "#f6ecd4"} stroke="#0b2423" strokeWidth="4" />
              {stop.summit && <path d={`M${x},${y - 16} v-46 l38,12 l-38,12`} fill="#ff3d8b" stroke="#0b2423" strokeWidth="3" />}
              <rect x={bx} y={by} width={LABEL_W} height="68" fill="#f6ecd4" stroke="#0b2423" strokeWidth="2" />
              <text x={bx + 10} y={by + 19} fontSize="11" fill="#1f5a53" letterSpacing="1.5">
                {stop.years.toUpperCase()}
              </text>
              <text className="trail-label-name" x={bx + 10} y={by + 41} fontSize="20" fill="#0b2423">
                {stop.name.toUpperCase()}
              </text>
              <text x={bx + 10} y={by + 58} fontSize="11" fill="#0b2423">
                {stop.role}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Real, focusable markers laid over the drawing. */}
      <ol className="trail-stops">
        {trail.map((stop, i) => {
          const [x, y] = POINTS[i];
          const hasDetail = stop.bullets.length > 0;
          const open = shown === stop.id && hasDetail;
          const style = { left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` };
          return (
            <li
              key={stop.id}
              className="trail-stop"
              style={style}
              data-side={x > W * 0.6 ? "left" : "right"}
              onMouseEnter={() => setActive(stop.id)}
              onMouseLeave={() => setActive(null)}
            >
              {hasDetail ? (
                <button
                  type="button"
                  className="trail-marker"
                  aria-expanded={open}
                  aria-controls={`trail-${stop.id}`}
                  onFocus={() => setActive(stop.id)}
                  onBlur={() => setActive(null)}
                  onClick={() => setPinned((p) => (p === stop.id ? null : stop.id))}
                >
                  <span className="sr-only">
                    {stop.years}: {stop.name}, {stop.roleLong}. Show details.
                  </span>
                </button>
              ) : (
                <span className="sr-only">
                  {stop.years}: {stop.name}, {stop.roleLong}.
                </span>
              )}
              {hasDetail && (
                <div id={`trail-${stop.id}`} className="trail-detail" hidden={!open}>
                  <p className="trail-detail-name">{stop.name}</p>
                  <Detail stop={stop} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function TrailList() {
  // Newest at the top.
  const stops = [...trail].reverse();
  return (
    <ol className="trail-list">
      {stops.map((stop) => {
        const body = (
          <>
            <span className="trail-list-years">{stop.years}</span>
            <span className="trail-list-name">{stop.name}</span>
            <span className="trail-list-role">{stop.roleLong}</span>
          </>
        );
        return (
          <li key={stop.id} className="trail-list-stop" data-summit={stop.summit || undefined}>
            {stop.bullets.length > 0 ? (
              <details>
                <summary>
                  {body}
                  <span className="trail-list-more mono" aria-hidden="true" />
                </summary>
                <div className="trail-list-detail">
                  <Detail stop={stop} />
                </div>
              </details>
            ) : (
              <div className="trail-list-static">{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default function Trail() {
  return (
    <section id="trail" className="section trail grain" aria-labelledby="trail-title">
      <p className="eyebrow">The trail · 2018 to now</p>
      <h2 id="trail-title" className="section-title">
        How I got here
      </h2>
      <div className="trail-desktop">
        <TrailMap />
      </div>
      <div className="trail-phone">
        <TrailList />
      </div>
    </section>
  );
}
