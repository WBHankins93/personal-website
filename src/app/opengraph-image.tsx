import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import BayouScene from "@/components/hero/BayouScene";
import { site } from "@/content/site";

// Open Graph / Twitter card: a still of the painted hero. The scene is the
// same <BayouScene/> the page draws, rendered to an SVG string and used as
// the card's background, so the card cannot drift from the site. The name
// and role line sit on top exactly as in the hero.
//
// Copy comes from content/site.ts. Fonts are static WOFF files in `_og/`
// because the renderer cannot use next/font (or WOFF2).
//
// Node runtime (not edge) so the assets load from disk and the image is
// generated once at build time.
export const alt = `${site.name}: ${site.role}, ${site.place}. A painted bayou at dawn with cypress trees, Spanish moss and an egret.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CREAM = "#f6ecd4";
const INK = "#0b2423";

const asset = (file: string) => readFile(join(process.cwd(), "src/app/_og", file));

async function paintedScene(): Promise<string> {
  // Loaded lazily: Next refuses a static react-dom/server import in app/.
  const { renderToStaticMarkup } = await import("react-dom/server");
  const svg = renderToStaticMarkup(<BayouScene mode="paint" />)
    // The scene is 1440 x 810. Crop to the card's shape, keeping the horizon.
    .replace('viewBox="0 0 1440 810"', 'xmlns="http://www.w3.org/2000/svg" viewBox="0 27 1440 756" width="1200" height="630"');
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export default async function OpengraphImage() {
  const [anton, mono, scene] = await Promise.all([
    asset("anton-latin-400-normal.woff"),
    asset("jetbrains-mono-latin-500-normal.woff"),
    paintedScene(),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#fbe3ac" }}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={scene} width={1200} height={630} style={{ position: "absolute", left: 0, top: 0 }} />

        <div style={{ position: "absolute", left: 44, top: 70, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Anton",
              fontSize: 178,
              lineHeight: 0.92,
              letterSpacing: 2,
              color: CREAM,
              textTransform: "uppercase",
              textShadow: `7px 7px 0 ${INK}`,
            }}
          >
            <span>Ben</span>
            <span>Hankins</span>
          </div>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              marginTop: 30,
              fontFamily: "Mono",
              fontSize: 24,
              color: CREAM,
              background: "#081d1c",
              padding: "8px 14px",
            }}
          >
            {site.role} · {site.place}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Anton", data: anton, weight: 400, style: "normal" },
        { name: "Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
