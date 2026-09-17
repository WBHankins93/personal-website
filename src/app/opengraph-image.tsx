import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Open Graph / Twitter card, built as a still of the homepage hero so a shared
// link looks like the site itself: same ledger grid, masthead, terminal badge,
// serif name, tagline, and the tilted specimen plate with the headshot.
//
// Copy mirrors Hero.tsx — keep the tagline in sync. Colors are the
// field-journal tokens from globals.css, inlined because ImageResponse renders
// outside the stylesheet. Fonts are static TTFs in `_og/` because the renderer
// can't use next/font; they match the families loaded in layout.tsx.
//
// Node runtime (not edge) so the assets load from disk and the image is
// generated once at build time.
export const alt =
  "Ben Hankins: customer-facing engineer by career, product builder by practice";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#F6F1E7";
const PLATE = "#FBF6EC";
const INK = "#211C15";
const INK_MUTED = "#6B5F4A";
const LINE = "#D8C7A4";
const FOREST = "#183F2A";
const FOREST_DEEP = "#0F2B1C";
const ACCENT_SOFT = "rgba(216, 232, 216, 0.75)";
const RUST = "#9A4E27";
const RUST_BRIGHT = "#B85A2C";

// Same figures as the Hero stat strip.
const STATS = [
  { num: "$13M", label: "Pipeline supported" },
  { num: "12", label: "Named accounts" },
  { num: "80%", label: "Faster deploys" },
];

const asset = (file: string) => readFile(join(process.cwd(), "src/app/_og", file));

export default async function OpenGraphImage() {
  const [oldStandard, workSansMedium, spaceMono, spaceMonoBold, headshot] =
    await Promise.all([
      asset("OldStandardTT-Bold.ttf"),
      asset("WorkSans-Medium.ttf"),
      asset("SpaceMono-Regular.ttf"),
      asset("SpaceMono-Bold.ttf"),
      asset("headshot.jpg"),
    ]);
  const headshotSrc = `data:image/jpeg;base64,${headshot.toString("base64")}`;

  const mono = { fontFamily: "Space Mono", textTransform: "uppercase" as const };

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
          backgroundColor: PAPER,
          backgroundImage:
            "linear-gradient(to right, rgba(80, 64, 40, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(80, 64, 40, 0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          fontFamily: "Work Sans",
          color: INK,
        }}
      >
        {/* Flat signal plate behind the portrait */}
        <div
          style={{
            position: "absolute",
            right: -70,
            top: 36,
            width: 470,
            height: 560,
            transform: "rotate(3deg)",
            backgroundColor: ACCENT_SOFT,
            border: "1px solid rgba(24, 63, 42, 0.15)",
          }}
        />

        {/* Specimen plate */}
        <div
          style={{
            position: "absolute",
            right: 78,
            top: 118,
            display: "flex",
            flexDirection: "column",
            transform: "rotate(-1.5deg)",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              padding: 9,
              backgroundColor: PLATE,
              border: `2px solid ${INK}`,
              boxShadow: "0 26px 50px -24px rgba(33, 28, 21, 0.55)",
            }}
          >
            <img
              src={headshotSrc}
              width={300}
              height={375}
              style={{ objectFit: "cover" }}
              alt=""
            />
            <div
              style={{
                ...mono,
                position: "absolute",
                top: -15,
                left: 18,
                display: "flex",
                padding: "6px 12px",
                backgroundColor: FOREST_DEEP,
                color: PLATE,
                fontSize: 14,
                letterSpacing: 2,
              }}
            >
              Fig. 01 · Specimen
            </div>
          </div>
          <div
            style={{
              ...mono,
              marginTop: 16,
              fontSize: 13,
              letterSpacing: 1,
              color: INK_MUTED,
            }}
          >
            Ben Hankins, building from New Orleans
          </div>
        </div>

        {/* Text column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "48px 0 0 64px",
            width: 740,
          }}
        >
          {/* Masthead */}
          <div
            style={{
              ...mono,
              display: "flex",
              alignItems: "center",
              fontSize: 16,
              letterSpacing: 4,
              color: INK_MUTED,
            }}
          >
            <span style={{ color: RUST }}>No. 01</span>
            <span style={{ marginLeft: 22 }}>Portfolio</span>
            <div style={{ display: "flex", marginLeft: 22, width: 330, height: 1, borderTop: `1px solid ${LINE}` }} />
          </div>

          {/* Terminal badge */}
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              alignItems: "center",
              marginTop: 30,
              padding: "8px 16px",
              backgroundColor: FOREST_DEEP,
              color: PLATE,
              fontFamily: "Space Mono",
              fontSize: 17,
            }}
          >
            <span style={{ color: "rgba(251, 246, 236, 0.55)" }}>$</span>
            <span style={{ marginLeft: 12 }}>open_to_opportunities:</span>
            <span style={{ marginLeft: 12, fontWeight: 700 }}>true</span>
            <div style={{ marginLeft: 8, width: 10, height: 20, backgroundColor: RUST_BRIGHT }} />
          </div>

          {/* Name */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 14,
              fontFamily: "Old Standard TT",
              fontSize: 108,
              lineHeight: 0.95,
              letterSpacing: -2,
              color: INK,
            }}
          >
            <span>Ben</span>
            <div style={{ display: "flex" }}>
              <span>Hankins</span>
              <span style={{ color: RUST }}>.</span>
            </div>
          </div>

          {/* Tagline — lines set explicitly so the colored phrase wraps predictably */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 22,
              fontSize: 27,
              lineHeight: 1.3,
              color: INK,
            }}
          >
            <div style={{ display: "flex" }}>
              <span style={{ color: FOREST }}>Customer-facing engineer</span>
              <span style={{ marginLeft: 8 }}>by career.</span>
            </div>
            <span>Product builder by practice. I turn complex</span>
            <span>requirements into software that ships.</span>
          </div>

          {/* Ledger stat strip */}
          <div
            style={{
              display: "flex",
              marginTop: 26,
              width: 640,
              borderTop: `1px solid ${LINE}`,
              borderBottom: `1px solid ${LINE}`,
            }}
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  padding: "12px 0 12px 20px",
                  borderLeft: i === 0 ? "none" : `1px solid ${LINE}`,
                }}
              >
                <span
                  style={{
                    fontFamily: "Old Standard TT",
                    fontSize: 32,
                    lineHeight: 1,
                    color: FOREST_DEEP,
                  }}
                >
                  {stat.num}
                </span>
                <span
                  style={{
                    ...mono,
                    marginTop: 8,
                    fontSize: 11,
                    letterSpacing: 1.5,
                    color: INK_MUTED,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Old Standard TT", data: oldStandard, weight: 700, style: "normal" },
        { name: "Work Sans", data: workSansMedium, weight: 500, style: "normal" },
        { name: "Space Mono", data: spaceMono, weight: 400, style: "normal" },
        { name: "Space Mono", data: spaceMonoBold, weight: 700, style: "normal" },
      ],
    }
  );
}
