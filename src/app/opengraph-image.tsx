import { ImageResponse } from "next/og";

// Dynamic Open Graph / Twitter card — editorial, on-brand with the site.
export const runtime = "edge";
export const alt =
  "Ben Hankins — Solutions Engineer who builds production software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#FFFFFF",
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
            color: "#6B7280",
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
              background: "#15803D",
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
              color: "#111418",
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
              color: "#3C4350",
              lineHeight: 1.25,
              maxWidth: 900,
            }}
          >
            Solutions Engineer by career. Builder by default.
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
              style={{ width: 64, height: 6, borderRadius: 999, background: "#1B6CA8" }}
            />
            <span style={{ fontSize: 28, color: "#6B7280" }}>
              Enterprise architecture · Cloud · AI · Product
            </span>
          </div>
          <span style={{ fontSize: 28, color: "#111418", fontWeight: 600 }}>
            benhankins.dev
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
