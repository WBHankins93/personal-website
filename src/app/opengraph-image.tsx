import { ImageResponse } from "next/og";

// Dynamic Open Graph / Twitter card: editorial, on-brand with the site.
// Copy is the canonical identity line — keep it in sync with the Hero
// tagline and the layout.tsx description. Colors are the field-journal
// tokens from globals.css (paper / ink / forest / rust), inlined because
// ImageResponse renders outside the stylesheet.
export const runtime = "edge";
export const alt =
  "Ben Hankins: customer-facing engineer who builds production software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#F6F1E7";
const INK = "#211C15";
const INK_SOFT = "#51483B";
const INK_MUTED = "#6B5F4A";
const FOREST = "#183F2A";
const RUST = "#9A4E27";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: status eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: INK_MUTED,
            fontSize: 26,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: FOREST,
            }}
          />
          Open to Opportunities
        </div>

        {/* Middle: name + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              color: INK,
              lineHeight: 1,
              letterSpacing: -2,
            }}
          >
            Ben Hankins
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 42,
              fontWeight: 500,
              color: INK_SOFT,
              lineHeight: 1.25,
              maxWidth: 900,
            }}
          >
            Customer-facing engineer by career. Product builder by practice.
          </div>
        </div>

        {/* Bottom: accent rule + url */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{ width: 64, height: 6, borderRadius: 999, background: RUST }}
            />
            <span style={{ fontSize: 28, color: INK_MUTED }}>
              Solutions engineering · Cloud · Full-stack · AI
            </span>
          </div>
          <span style={{ fontSize: 28, color: INK, fontWeight: 600 }}>
            benhankins.dev
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
