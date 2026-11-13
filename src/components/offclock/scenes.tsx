// Postcard scenes for Off the Clock, ported from the approved mockup.
// Each draws in a 300 x 210 box.
import type { ReactNode } from "react";
import { Fir, ReflectionBars, Ridge } from "@/components/kit";
import type { PostcardScene } from "@/content/postcards";
import { n, rnd } from "@/lib/rand";

const INK = "#0b2423";
const NIGHT = "#0a061c";

function Grass({ x, y, count, h, seed }: { x: number; y: number; count: number; h: number; seed: number }) {
  const r = rnd(seed);
  const blades = [];
  for (let i = 0; i < count; i++) {
    const gx = x + r() * 26 - 13;
    blades.push(
      <path
        key={i}
        d={`M${n(gx)},${y} q${n((r() - 0.5) * 10)},${n(-h * 0.6)} ${n((r() - 0.5) * 14)},${n(-h * (0.6 + r() * 0.5))}`}
        stroke={INK}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />,
    );
  }
  return <>{blades}</>;
}

function Hiking() {
  return (
    <>
      <rect width="300" height="210" fill="#fbe3ac" />
      <rect y="70" width="300" height="50" fill="#f9d08a" />
      <circle cx="214" cy="74" r="34" fill="#f58a2c" />
      <Ridge width={300} y={128} amp={62} step={34} seed={4} bottom={210} floor={0.3} color="#9fc0b8" />
      <Ridge width={300} y={152} amp={44} step={26} seed={14} bottom={210} floor={0.3} color="#4f8a80" />
      <Ridge width={300} y={182} amp={26} step={20} seed={24} bottom={210} floor={0.3} color="#1f5a56" />
      <path d="M96,210 C120,186 150,190 168,170 S214,150 226,128" fill="none" stroke="#fbe3ac" strokeWidth="3" strokeDasharray="7 6" strokeLinecap="round" />
      <Fir x={30} b={212} h={120} w={22} color={INK} />
      <Fir x={66} b={214} h={86} w={17} color={INK} />
      <Fir x={272} b={214} h={134} w={24} color={INK} />
      <Fir x={240} b={214} h={78} w={15} color={INK} />
    </>
  );
}

function Marsh() {
  return (
    <>
      <rect width="300" height="210" fill="#f9c777" />
      <rect y="60" width="300" height="34" fill="#f5a657" />
      <rect y="94" width="300" height="30" fill="#f28f43" />
      <circle cx="150" cy="120" r="58" fill="#fff3cf" />
      <Ridge width={300} y={122} amp={12} step={14} seed={2} bottom={124} floor={0.3} color="#a8502f" />
      <rect y="122" width="300" height="90" fill="#1b5853" />
      <ReflectionBars cx={150} y={128} count={8} gap={9} minW={30} spanW={110} jitter={14} height={4} color="#fbe3ac" seed={52} startOpacity={0.95} fade={0.09} />
      {/* Pirogue with a poler. */}
      <path d="M176,160 q42,12 92,-2 l-10,10 h-70 Z" fill={INK} />
      <path d="M236,158 v-30 M236,128 l-22,54" stroke={INK} strokeWidth="2.5" fill="none" />
      <circle cx="236" cy="124" r="5" fill={INK} />
      <path d="M229,134 h14 v22 h-14 Z" fill={INK} />
      {/* Egret. */}
      <path d="M84,176 q-4,-22 6,-34 q6,-7 4,-14 l13,4 l-10,1 q5,8 -3,16 q-7,9 -3,27 Z" fill="#fff7e2" />
      <Grass x={18} y={212} count={14} h={60} seed={1} />
      <Grass x={48} y={212} count={10} h={40} seed={2} />
      <Grass x={284} y={212} count={14} h={56} seed={3} />
      <Grass x={120} y={214} count={8} h={26} seed={4} />
    </>
  );
}

function Festivals() {
  const r = rnd(71);
  const stars = Array.from({ length: 40 }, (_, i) => (
    <circle key={i} cx={n(r() * 300)} cy={n(r() * 90)} r={n(0.5 + r())} fill="#fff" />
  ));
  const crowd = Array.from({ length: 24 }, (_, i) => {
    const x = n(6 + i * 12.6 + r() * 4);
    const y = n(186 + r() * 10);
    return (
      <g key={i}>
        <circle cx={x} cy={y} r="6.5" fill={NIGHT} />
        {i % 3 === 0 && (
          <path d={`M${n(x - 5)},${y} l-5,-20 M${n(x + 5)},${y} l6,-19`} stroke={NIGHT} strokeWidth="3.2" strokeLinecap="round" />
        )}
      </g>
    );
  });
  return (
    <>
      <rect width="300" height="210" fill="#170f3a" />
      <rect y="96" width="300" height="40" fill="#5a1f6b" />
      <rect y="130" width="300" height="34" fill="#ff3d8b" />
      <rect y="158" width="300" height="60" fill="#f58a2c" />
      {stars}
      {/* Ferris wheel. */}
      <g transform="translate(248 104)">
        <circle r="34" fill="none" stroke={NIGHT} strokeWidth="3" />
        {[0, 30, 60, 90, 120, 150].map((a) => (
          <line key={a} x1="-34" x2="34" stroke={NIGHT} strokeWidth="1.6" transform={`rotate(${a})`} />
        ))}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <circle key={a} r="4" cx={n(34 * Math.cos((a * Math.PI) / 180))} cy={n(34 * Math.sin((a * Math.PI) / 180))} fill="#ffcb05" />
        ))}
        <path d="M0,0 L-16,76 M0,0 L16,76" stroke={NIGHT} strokeWidth="3" />
      </g>
      {/* Stage beams: pink, yellow, cyan. */}
      <path d="M96,70 L20,210 L84,210 Z" fill="#ff3d8b" opacity=".5" />
      <path d="M118,70 L96,210 L160,210 Z" fill="#ffcb05" opacity=".45" />
      <path d="M140,70 L176,210 L236,210 Z" fill="#37d6ff" opacity=".45" />
      <path d="M52,180 V84 Q118,36 184,84 V180 H170 V96 Q118,62 66,96 V180 Z" fill={NIGHT} />
      <rect x="60" y="150" width="116" height="34" fill={NIGHT} />
      <rect x="0" y="196" width="300" height="20" fill={NIGHT} />
      {crowd}
    </>
  );
}

function Golf() {
  return (
    <>
      <rect width="300" height="210" fill="#fde6b0" />
      <rect y="56" width="300" height="34" fill="#f9cf8a" />
      <circle cx="72" cy="92" r="36" fill="#f58a2c" />
      <ellipse cx="90" cy="150" rx="210" ry="56" fill="#9cc27a" />
      <ellipse cx="250" cy="170" rx="200" ry="62" fill="#5fa35a" />
      <ellipse cx="120" cy="222" rx="260" ry="64" fill="#2f7d4a" />
      <ellipse cx="150" cy="176" rx="84" ry="20" fill="#8fd17a" />
      {/* Bunker, cup, pin with pink flag, ball. */}
      <path d="M18,196 q26,-18 58,-6 q16,10 -8,18 q-34,8 -50,-12 Z" fill="#fbe3ac" />
      <ellipse cx="170" cy="176" rx="7" ry="2.6" fill={INK} />
      <path d="M170,176 V104" stroke={INK} strokeWidth="2.5" />
      <path d="M170,104 l30,10 l-30,10 Z" fill="#ff3d8b" />
      <circle cx="128" cy="180" r="3.4" fill="#fff" />
      <Fir x={262} b={170} h={96} w={17} color={INK} />
      <Fir x={286} b={176} h={120} w={20} color={INK} />
      <Fir x={238} b={166} h={62} w={12} color="#143a22" />
    </>
  );
}

const SCENES: Record<PostcardScene, () => ReactNode> = {
  hiking: Hiking,
  marsh: Marsh,
  festivals: Festivals,
  golf: Golf,
};

export default function PostcardArt({ scene }: { scene: PostcardScene }) {
  const Scene = SCENES[scene];
  return (
    <svg viewBox="0 0 300 210" aria-hidden="true" focusable="false">
      <Scene />
    </svg>
  );
}
