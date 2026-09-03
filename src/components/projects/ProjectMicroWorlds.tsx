"use client";

import { motion } from "framer-motion";
import {
  Bot,
  BriefcaseBusiness,
  Check,
  FileText,
  Layers3,
  Route,
  ScanSearch,
  Sparkles,
} from "lucide-react";
import type { MicroWorldId } from "@/data/projects";
import { supportingWork } from "@/data/projects";
import { MARKS } from "@/lib/marks";

interface WorldProps {
  play: boolean;
  active: boolean;
  reduced: boolean;
}
const loop = (play: boolean, duration: number, delay = 0) => ({
  duration,
  delay,
  ease: "easeInOut" as const,
  repeat: play ? Infinity : 0,
  repeatDelay: 0.35,
});

function GreenlitWorld({ play, active, reduced }: WorldProps) {
  const running = play && !reduced;
  const speed = active ? 2.4 : 4.8;

  return (
    <div className="relative h-full overflow-hidden" aria-hidden>
      <div className="absolute inset-0 micro-grid opacity-65" />
      <motion.div
        className="absolute left-[7%] top-[18%] flex h-20 w-20 items-center justify-center rounded-full border border-line bg-paper shadow-sm md:h-24 md:w-24"
        animate={running ? { y: [0, -4, 0], rotate: [0, -1, 0] } : undefined}
        transition={loop(running, speed + 1)}
      >
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[conic-gradient(var(--signal)_0_82%,var(--color-paper-deep)_82%_100%)] md:h-16 md:w-16">
          <div className="flex h-10 w-10 flex-col items-center justify-center rounded-full bg-paper md:h-12 md:w-12">
            <span className="font-heading text-lg font-bold leading-none text-ink">8.2</span>
            <span className="font-mono text-[0.42rem] uppercase tracking-wider text-ink-muted">score</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute left-[31%] top-[11%] h-[78%] w-[39%] rounded-xl border border-line-strong bg-paper p-3 shadow-[0_16px_32px_-20px_rgba(34,27,18,0.45)]"
        animate={running ? { y: [7, 0, 0, 7], rotate: [-1, 0, 0, -1] } : undefined}
        transition={loop(running, speed, 0.1)}
      >
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="h-5 w-5 rounded-full bg-[var(--color-mark-pine-soft)]" />
          <div className="space-y-1">
            <span className="block h-1.5 w-14 rounded-full bg-ink/80" />
            <span className="block h-1 w-9 rounded-full bg-line-strong" />
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {[78, 92, 68, 84, 58].map((width, index) => (
            <motion.span
              key={width}
              className={`block h-1.5 rounded-full ${index === 2 ? "bg-[var(--signal)] opacity-60" : "bg-line-strong"}`}
              // The growing bar animates scaleX, not width: width would force
              // layout on every frame of an infinite loop, scaleX stays on the
              // compositor. 68% → 88% and 68% → 76% become the ratios below.
              style={{ width: `${width}%`, transformOrigin: "left center" }}
              animate={
                running && index === 2
                  ? { scaleX: active ? [1, 1.294, 1.294, 1] : [1, 1.118, 1] }
                  : undefined
              }
              transition={loop(running, speed, 0.35)}
            />
          ))}
        </div>
        <div className="mt-4 flex gap-1.5">
          <span className="rounded bg-[var(--color-status-beta-bg)] px-1.5 py-1 font-mono text-[0.44rem] uppercase text-[var(--color-status-beta)]">ATS</span>
          <span className="rounded bg-[var(--signal-soft)] px-1.5 py-1 font-mono text-[0.44rem] uppercase text-[var(--signal)]">Evidence</span>
        </div>
        <motion.span
          className="absolute inset-y-0 left-0 w-9 bg-gradient-to-r from-transparent via-[rgba(47,111,115,0.22)] to-transparent"
          animate={running ? { x: ["-120%", "520%"] } : { x: "520%" }}
          transition={{ duration: active ? 1.5 : 2.7, ease: "linear", repeat: running ? Infinity : 0, repeatDelay: active ? 0.7 : 2.5 }}
        />
      </motion.div>

      <div className="absolute right-[5%] top-[22%] space-y-2">
        {["Impact", "Keywords", "Clarity"].map((label, index) => (
          <motion.div
            key={label}
            className="flex items-center gap-1.5 rounded-lg border border-line bg-paper/90 px-2.5 py-2 shadow-sm"
            animate={running ? { x: [10, 0, 0, 10], opacity: [0.55, 1, 1, 0.55] } : undefined}
            transition={loop(running, speed + 0.7, index * 0.22)}
          >
            <Check className="h-3 w-3 text-[var(--signal)]" />
            <span className="font-mono text-[0.48rem] uppercase tracking-wide text-ink-soft">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const agentNodes = [
  { label: "Intake", x: 13, y: 50 },
  { label: "Market", x: 37, y: 27 },
  { label: "Finance", x: 37, y: 73 },
  { label: "Writer", x: 65, y: 50 },
  { label: "Critic", x: 87, y: 50 },
] as const;

function BusinessPlanWorld({ play, active, reduced }: WorldProps) {
  const running = play && !reduced;
  const duration = active ? 3.3 : 6.2;

  return (
    <div className="relative h-full overflow-hidden" aria-hidden>
      <div className="absolute inset-0 micro-grid opacity-55" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {[
          "M13 50 L37 27",
          "M13 50 L37 73",
          "M37 27 L65 50",
          "M37 73 L65 50",
          "M65 50 L87 50",
        ].map((d, index) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke={index === 4 ? "var(--signal)" : "var(--color-line-strong)"}
            strokeWidth="0.75"
            strokeDasharray={index === 4 ? "2 2" : undefined}
            animate={running ? { pathLength: [0, 1, 1] } : { pathLength: 1 }}
            transition={{ duration: duration * 0.45, delay: index * 0.14, ease: "easeOut", repeat: running ? Infinity : 0, repeatDelay: duration * 0.55 }}
          />
        ))}
      </svg>

      {agentNodes.map((node, index) => (
        <motion.div
          key={node.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          animate={running ? { y: [0, -3, 0], scale: [1, active ? 1.06 : 1.025, 1] } : undefined}
          transition={loop(running, duration, index * 0.18)}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line-strong bg-paper shadow-sm md:h-14 md:w-14">
            {index === 0 && <FileText className="h-5 w-5 text-[var(--color-mark-plum)]" />}
            {index === 1 && <BriefcaseBusiness className="h-5 w-5 text-[var(--color-mark-denim)]" />}
            {index === 2 && <Layers3 className="h-5 w-5 text-[var(--color-mark-honey)]" />}
            {index === 3 && <Sparkles className="h-5 w-5 text-clay" />}
            {index === 4 && <ScanSearch className="h-5 w-5 text-accent" />}
          </div>
          <span className="mt-1.5 block text-center font-mono text-[0.46rem] uppercase tracking-wide text-ink-muted">{node.label}</span>
        </motion.div>
      ))}

      <motion.div
        className="absolute bottom-[7%] right-[3%] flex items-center gap-1.5 rounded-full border border-[var(--signal)] bg-[var(--signal-soft)] px-2.5 py-1.5 font-mono text-[0.46rem] uppercase tracking-wider text-[var(--signal)] shadow-sm"
        animate={running ? { opacity: [0.45, 1, 1, 0.45], x: [4, 0, 0, 4] } : undefined}
        transition={loop(running, duration, 1.1)}
      >
        <Check className="h-3 w-3" /> Review gated
      </motion.div>
    </div>
  );
}

function LivingPlaybooksWorld({ play, active, reduced }: WorldProps) {
  const running = play && !reduced;
  const duration = active ? 3.4 : 6.4;
  const tracks = [
    { label: "SE track", color: "bg-[var(--signal-soft)] text-[var(--signal)]", items: ["Discovery", "POCs", "Recovery"] },
    { label: "SA track", color: "bg-[var(--color-mark-denim-soft)] text-[var(--color-mark-denim)]", items: ["Architecture", "Migration", "Compliance"] },
    // clay-hover, not clay: plain clay on clay-soft lands at 4.45:1, just under AA.
    { label: "Situation", color: "bg-clay-soft text-clay-hover", items: ["Templates", "Diagrams", "Talk tracks"] },
  ];

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden px-4 py-5" aria-hidden>
      <div className="absolute inset-0 micro-grid opacity-50" />
      <motion.div
        className="relative grid w-full max-w-xl grid-cols-3 gap-2.5 md:gap-4"
        animate={running ? { y: [3, 0, 0, 3] } : undefined}
        transition={loop(running, duration + 1)}
      >
        {tracks.map((track, trackIndex) => (
          <div key={track.label} className="rounded-xl border border-line bg-paper/90 p-2.5 shadow-sm md:p-3">
            <div className={`flex items-center justify-between rounded-lg px-2 py-1.5 ${track.color}`}>
              <span className="font-mono text-[0.45rem] font-semibold uppercase tracking-wider md:text-[0.52rem]">{track.label}</span>
              <Route className="h-3 w-3" />
            </div>
            <div className="mt-2 space-y-1.5">
              {track.items.map((item, itemIndex) => (
                <motion.div
                  key={item}
                  className="rounded-md border border-line bg-paper-alt/65 px-2 py-1.5 font-body text-[0.55rem] text-ink-soft md:text-[0.62rem]"
                  animate={running ? { x: [trackIndex % 2 ? 3 : -3, 0, 0, trackIndex % 2 ? 3 : -3], opacity: [0.62, 1, 1, 0.62] } : undefined}
                  transition={loop(running, duration, trackIndex * 0.23 + itemIndex * 0.15)}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
      <div className="absolute bottom-3 right-4 flex items-center gap-2 rounded-full border border-line bg-paper/90 px-3 py-1.5 shadow-sm">
        <OpenBookMark />
        <span className="font-mono text-[0.46rem] uppercase tracking-wider text-ink-muted">111 resources · 13 diagrams</span>
      </div>
    </div>
  );
}

function OpenBookMark() {
  const Icon = MARKS["solutions-playbook"].Icon;
  return <Icon className="h-3.5 w-3.5 text-[var(--signal)]" />;
}

function BreadthWorld({ play, active, reduced }: WorldProps) {
  const running = play && !reduced;
  return (
    <div className="relative flex h-full flex-col justify-center gap-2 overflow-hidden px-4 py-5" aria-hidden>
      <div className="absolute inset-0 micro-grid opacity-45" />
      {supportingWork.map((work, index) => {
        const markId = ["clipboard", "treehouse", "solutions-playbook", "ai-engineering-studio"][index];
        const mark = MARKS[markId];
        const Icon = mark.Icon;
        return (
          <motion.div
            key={work.name}
            className="relative flex items-center gap-2.5 rounded-xl border border-line bg-paper/92 px-3 py-2 shadow-sm"
            animate={running ? { x: [index % 2 ? 6 : -6, 0, 0, index % 2 ? 6 : -6], y: [0, active ? -2 : -1, 0] } : undefined}
            transition={loop(running, active ? 3.2 : 6, index * 0.3)}
          >
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${mark.bg} ${mark.text}`}>
              <Icon className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-heading text-[0.68rem] font-semibold text-ink">{work.name}</p>
              <p className="truncate font-mono text-[0.43rem] uppercase tracking-wide text-ink-muted">{work.capability}</p>
            </div>
            <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong" />
          </motion.div>
        );
      })}
      <motion.div
        className="absolute right-3 top-3 text-[var(--signal)]"
        animate={running ? { rotate: [0, 8, 0], scale: [1, active ? 1.12 : 1.04, 1] } : undefined}
        transition={loop(running, active ? 2.6 : 5.5)}
      >
        <Bot className="h-4 w-4" />
      </motion.div>
    </div>
  );
}

const worlds: Record<MicroWorldId, (props: WorldProps) => React.ReactElement> = {
  greenlit: GreenlitWorld,
  "business-plan-writer": BusinessPlanWorld,
  "living-playbooks": LivingPlaybooksWorld,
  breadth: BreadthWorld,
};

export function ProjectMicroWorld({
  id,
  play,
  active,
  reduced,
}: WorldProps & { id: MicroWorldId }) {
  const World = worlds[id];
  return <World play={play} active={active} reduced={reduced} />;
}
