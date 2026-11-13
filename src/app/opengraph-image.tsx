import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Open Graph / Twitter card: a flat still in the painted hero's palette.
// Interim version. Milestone 7 replaces it with a render of the painted
// bayou scene itself. Copy comes from content/site.ts; colors are the
// tokens from globals.css, inlined because ImageResponse renders outside
// the stylesheet. Fonts are static WOFF files in `_og/` because the
// renderer cannot use next/font (or WOFF2).
//
// Node runtime (not edge) so the assets load from disk and the image is
// generated once at build time.
export const alt = `${site.name}: ${site.role}, ${site.place}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CREAM = "#f6ecd4";
const INK = "#0b2423";
const SKY = ["#fbe3ac", "#f9d48f", "#f7bf73", "#f5a657", "#f28f43"];
const HORIZON = 420;

const asset = (file: string) => readFile(join(process.cwd(), "src/app/_og", file));

export default async function OpengraphImage() {
  const [anton, mono] = await Promise.all([
    asset("anton-latin-400-normal.woff"),
    asset("jetbrains-mono-latin-500-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: SKY[0] }}>
        {SKY.slice(1).map((color, i) => (
          <div key={color} style={{ position: "absolute", left: 0, right: 0, top: 190 + i * 58, height: 64, background: color }} />
        ))}
        {/* Sun and ring on the horizon. */}
        <div style={{ position: "absolute", left: 760, top: HORIZON - 196, width: 332, height: 332, borderRadius: 166, border: "5px solid #fff3cf" }} />
        <div style={{ position: "absolute", left: 796, top: HORIZON - 160, width: 260, height: 260, borderRadius: 130, background: "#fff3cf" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: HORIZON - 26, height: 26, background: "#a8502f" }} />
        {/* Water with reflection bars. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: HORIZON, bottom: 0, background: "#1b5853" }} />
        {[220, 150, 260, 120, 190, 90].map((w, i) => (
          <div
            key={i}
            style={{ position: "absolute", left: 926 - w / 2, top: HORIZON + 14 + i * 18, width: w, height: 6, borderRadius: 3, background: "#f7bf73", opacity: 0.9 - i * 0.1 }}
          />
        ))}
        {/* Canopy branch. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 22, background: "#081d1c" }} />

        <div style={{ position: "absolute", left: 56, top: 64, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Anton",
              fontSize: 196,
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
          <div style={{ display: "flex", marginTop: 26, fontFamily: "Mono", fontSize: 26, color: CREAM }}>
            {site.role} · {site.place}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 56,
            bottom: 44,
            display: "flex",
            fontFamily: "Mono",
            fontSize: 20,
            letterSpacing: 2,
            color: INK,
            background: "#ffcb05",
            padding: "10px 16px",
          }}
        >
          BENHANKINS.DEV
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
