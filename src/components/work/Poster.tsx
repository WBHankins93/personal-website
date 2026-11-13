// One poster face. Pure markup (spans only, so a face can sit inside a
// <button>). The front is the painted poster; the back is the schematic
// side: the product's architecture, or the poster's own shapes in mint with
// "schematic coming" until Ben supplies the architecture notes.
import type { Project } from "@/content/projects";
import { PosterArt, SchematicDiagram, SchematicGrid } from "./PosterArt";

/**
 * Anton is about 0.43em per character. Scale the title so the longest line
 * fits the poster's inner width, capped at the mockup's 18.2cqw.
 */
function titleSize(lines: string[], cap: number): string {
  const longest = Math.max(...lines.map((l) => l.length));
  return `${Math.min(cap, Math.round((170 / longest) * 10) / 10)}cqw`;
}

export function PosterFront({ project, uid }: { project: Project; uid: string }) {
  return (
    <span className={`poster-paper poster-paper--${project.theme} grain`}>
      {project.badge && <span className="poster-badge">{project.badge}</span>}
      <svg viewBox="0 0 300 425" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <PosterArt art={project.art} mode="paint" uid={uid} />
      </svg>
      <span className="poster-head">
        <span className="poster-mast">
          <span>{project.masthead[0]}</span>
          <span>{project.masthead[1]}</span>
        </span>
        <span className="poster-title" style={{ fontSize: titleSize(project.titleLines, 18.2) }}>
          {project.titleLines.map((line) => (
            <span key={line}>{line} </span>
          ))}
        </span>
      </span>
      <span className="poster-foot">{project.footer}</span>
    </span>
  );
}

export function PosterBack({ project, uid }: { project: Project; uid: string }) {
  const { schematic } = project;
  return (
    <span className="poster-paper poster-paper--schematic">
      <svg viewBox="0 0 300 425" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <SchematicGrid uid={uid} />
        {schematic ? <SchematicDiagram schematic={schematic} /> : <PosterArt art={project.art} mode="schematic" uid={`${uid}-wire`} />}
      </svg>
      <span className="poster-head">
        <span className="poster-mast">
          <span>Schematic</span>
          <span>{schematic ? "Architecture" : "Pending"}</span>
        </span>
        <span className="poster-title" style={{ fontSize: titleSize(project.titleLines, 12.6) }}>
          {project.titleLines.map((line) => (
            <span key={line}>{line} </span>
          ))}
        </span>
      </span>
      <span className="poster-foot">
        {schematic && project.stack.length > 0 ? project.stack.slice(0, 4).join(" · ") : "Schematic coming"}
      </span>
    </span>
  );
}
