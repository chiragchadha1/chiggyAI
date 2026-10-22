import { ImageResponse } from "next/og";

export const alt = "Chirag Chadha, founding engineer at Spur, powerlifter, and DJ in New York";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#999",
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: 600, color: "#1a1a1a" }}>Chirag Chadha</span>
            <span style={{ margin: "0 12px" }}>·</span>
            <span>chiggy.ai</span>
          </span>
          <span style={{ letterSpacing: 2 }}>NEW YORK</span>
        </div>

        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            color: "#111",
            letterSpacing: -2,
            lineHeight: 1.08,
            maxWidth: 1000,
          }}
        >
          I design and build developer tools, AI agents, and whatever I can&apos;t stop thinking about.
        </div>

        <div style={{ display: "flex", fontSize: 30, color: "#555" }}>
          Founding engineer at Spur · Powerlifter and DJ · Previously HubSpot
        </div>
      </div>
    ),
    { ...size }
  );
}
