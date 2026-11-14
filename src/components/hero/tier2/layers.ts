// Tier 2 layer textures. The server-rendered <BayouScene/> SVGs already in
// the page are the single source of art: each data-layer group is serialized
// and rasterized to a canvas here, once, in the browser. Nothing is
// downloaded and nothing is drawn twice in code.
//
// Every layer has a painted texture and (except the moss layers) a line
// texture. The shader picks between them with the shared reveal uniform.

export const SCENE_W = 1440;
export const SCENE_H = 810;
const MINT = "#5dffb0";
/** Longest texture side. Keeps GPU memory near 100MB on a retina laptop. */
const MAX_TEXTURE = 2048;

type MossFilter = "all" | "none" | "only";

export interface LayerSpec {
  id: string;
  /** data-layer groups to draw, back to front. */
  groups: string[];
  moss: MossFilter;
  /** Distance behind the foreground plane, in CSS px at rest. Bigger moves less. */
  depth: number;
  /** Region of the scene this layer covers. Defaults to all of it. */
  crop?: [x: number, y: number, w: number, h: number];
  /** Line texture too? Moss layers ride on their tree layer's line texture. */
  line: boolean;
  /** Extra groups drawn only into the line texture (the node labels). */
  lineGroups?: string[];
  /** Idle motion handled in the shader. */
  motion?: "sway" | "shimmer";
}

// Eight layers, back to front (handoff section 5: 6 to 8 flat layers).
export const LAYERS: LayerSpec[] = [
  { id: "sky", groups: ["sky", "sun"], moss: "all", depth: 6000, line: true },
  { id: "ridges", groups: ["ridges", "far-trees"], moss: "all", depth: 1100, line: true },
  { id: "water", groups: ["water"], moss: "all", depth: 1100, line: true, motion: "shimmer" },
  { id: "mid-trees", groups: ["mid-trees"], moss: "none", depth: 500, line: true, lineGroups: ["labels"] },
  { id: "mid-moss", groups: ["mid-trees"], moss: "only", depth: 500, line: false, motion: "sway" },
  { id: "egret", groups: ["egret"], moss: "all", depth: 300, crop: [730, 570, 110, 140], line: true },
  { id: "foreground", groups: ["foreground"], moss: "none", depth: 0, line: true },
  { id: "fore-moss", groups: ["foreground"], moss: "only", depth: 0, line: false, motion: "sway" },
];

export interface LayerTextures {
  spec: LayerSpec;
  paint: HTMLCanvasElement;
  line: HTMLCanvasElement | null;
}

const SHAPES = "path,circle,ellipse,rect,line,polygon";

function pickGroups(svg: SVGSVGElement, names: string[], moss: MossFilter): string {
  return names
    .map((name) => {
      const group = svg.querySelector(`[data-layer="${name}"]`);
      if (!group) return "";
      const clone = group.cloneNode(true) as Element;
      if (moss === "none") clone.querySelectorAll(".moss").forEach((el) => el.remove());
      if (moss === "only") clone.querySelectorAll(SHAPES).forEach((el) => !el.classList.contains("moss") && el.remove());
      // Labels are drawn with the page's own font afterwards.
      clone.querySelectorAll("text").forEach((el) => el.remove());
      return new XMLSerializer().serializeToString(clone);
    })
    .join("");
}

/** Same rules as .bayou-schematic in globals.css, inlined because an SVG loaded as an image cannot see the page's CSS. */
function schematicCss(stroke: number): string {
  return (
    `.bayou-schematic :is(${SHAPES}):not(.keep){fill:none;stroke:${MINT};stroke-width:${stroke};stroke-dasharray:none;opacity:1;vector-effect:non-scaling-stroke}` +
    `.bayou-schematic .moss:not(.keep){stroke-width:${(stroke * 2) / 3};opacity:.7}` +
    `.keep{vector-effect:non-scaling-stroke;stroke-width:${stroke / 1.2}}`
  );
}

async function rasterize(markup: string, crop: [number, number, number, number], width: number, height: number, css: string, mode: string): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d canvas unavailable");
  if (markup) {
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${crop.join(" ")}" width="${width}" height="${height}" preserveAspectRatio="none">` +
      `<style>${css}</style><g class="${mode}">${markup}</g></svg>`;
    const img = new Image();
    img.decoding = "async";
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    await img.decode();
    ctx.drawImage(img, 0, 0, width, height);
  }
  return canvas;
}

/** Node labels, drawn with the page's JetBrains Mono (an SVG image cannot load it). */
function drawLabels(canvas: HTMLCanvasElement, svg: SVGSVGElement, names: string[], crop: [number, number, number, number], pxPerUnit: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  names.forEach((name) => {
    svg.querySelectorAll<SVGTextElement>(`[data-layer="${name}"] text`).forEach((text) => {
      const family = getComputedStyle(text).fontFamily || "monospace";
      ctx.font = `500 ${11 * pxPerUnit}px ${family}`;
      ctx.fillStyle = MINT;
      const x = (Number(text.getAttribute("x")) - crop[0]) * pxPerUnit;
      const y = (Number(text.getAttribute("y")) - crop[1]) * pxPerUnit;
      ctx.fillText(text.textContent ?? "", x, y);
    });
  });
}

/**
 * Rasterize every layer for a hero of the given CSS size.
 * `cover` is CSS px per scene unit (the SVG's xMidYMid slice scale).
 */
export async function buildLayerTextures(hero: HTMLElement, cover: number, dpr: number): Promise<LayerTextures[]> {
  const painted = hero.querySelector<SVGSVGElement>(".hero-layer--painted .hero-scene");
  const schematic = hero.querySelector<SVGSVGElement>(".hero-layer--schematic .hero-scene");
  if (!painted || !schematic) throw new Error("hero scenes not found");

  // Texture px per scene unit: match the screen, within the size cap.
  const pxPerUnit = Math.min(cover * dpr, MAX_TEXTURE / SCENE_W);
  // 1.2 CSS px lines, as in Tier 1, expressed in texture px.
  const stroke = Math.max(1, (1.2 * pxPerUnit) / cover);
  await document.fonts.ready;

  const out: LayerTextures[] = [];
  for (const spec of LAYERS) {
    const crop = spec.crop ?? [0, 0, SCENE_W, SCENE_H];
    const width = Math.ceil(crop[2] * pxPerUnit);
    const height = Math.ceil(crop[3] * pxPerUnit);
    const paint = await rasterize(pickGroups(painted, spec.groups, spec.moss), crop, width, height, "", "bayou-paint");
    let line: HTMLCanvasElement | null = null;
    if (spec.line) {
      // A tree layer's line texture keeps its moss: the moss layers have none.
      const groups = [...spec.groups, ...(spec.lineGroups ?? [])];
      line = await rasterize(pickGroups(schematic, groups, spec.moss === "none" ? "all" : spec.moss), crop, width, height, schematicCss(stroke), "bayou-schematic");
      if (spec.lineGroups) drawLabels(line, schematic, spec.lineGroups, crop, pxPerUnit);
    }
    out.push({ spec, paint, line });
  }
  return out;
}
