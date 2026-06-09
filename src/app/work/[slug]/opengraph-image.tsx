import { ImageResponse } from "next/og";
import { getCaseStudy, visibleSlugs } from "@/content/work";

export const alt = "Case study by Chirag Chadha";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return visibleSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getCaseStudy(slug)?.meta;

  const title = meta?.title ?? "Chirag Chadha";
  const tagline = meta?.tagline ?? "Software engineer and builder in New York.";
  const kind = (meta?.kind ?? "").toUpperCase();
  const metrics = (meta?.metrics ?? []).slice(0, 3);

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
          <span style={{ fontWeight: 600, color: "#1a1a1a" }}>Chirag Chadha</span>
          <span style={{ letterSpacing: 2 }}>{kind}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: "#111",
              letterSpacing: -2,
              lineHeight: 1.02,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#555",
              marginTop: 24,
              maxWidth: 980,
              lineHeight: 1.35,
            }}
          >
            {tagline}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 56 }}>
            {metrics.map((m) => (
              <div key={m.label} style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 46, fontWeight: 700, color: "#111" }}>{m.value}</span>
                <span style={{ fontSize: 22, color: "#999", marginTop: 4 }}>{m.label}</span>
              </div>
            ))}
          </div>
          <span style={{ fontSize: 24, color: "#999" }}>chiggy.ai</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
