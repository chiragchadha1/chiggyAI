const STOPS = [
  { t: "2017 · design", label: "logos + banners" },
  { t: "motion", label: "After Effects, C4D" },
  { t: "video", label: "client promos" },
  { t: "web", label: "full-stack sites" },
  { t: "2026 · AI", label: "agentic products" },
];

/**
 * The DEFYE-to-Chiggy-AI craft progression: each new client ask became a new
 * layer of the stack. Pure inline SVG, themed via CSS custom properties.
 */
export function CraftTimeline() {
  const width = 640;
  const height = 150;
  const padX = 56;
  const lineY = 70;
  const span = width - padX * 2;
  const step = span / (STOPS.length - 1);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="diagram-svg"
      role="img"
      aria-label="Craft timeline from 2017 to 2026: graphic design, then motion graphics in After Effects and Cinema 4D, then client promo videos, then full-stack web work, then agentic AI products under Chiggy AI."
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1={padX}
        y1={lineY}
        x2={width - padX}
        y2={lineY}
        stroke="var(--divider)"
        strokeWidth={2}
        data-anim-line=""
        style={{ ["--len" as string]: span, ["--i" as string]: 0 }}
      />
      {STOPS.map((s, i) => {
        const x = padX + i * step;
        const last = i === STOPS.length - 1;
        return (
          <g key={s.t} data-anim="" style={{ ["--i" as string]: i + 1 }}>
            <circle
              cx={x}
              cy={lineY}
              r={last ? 7 : 5}
              fill={last ? "var(--text)" : "var(--bg)"}
              stroke="var(--text-muted)"
              strokeWidth={2}
            />
            <text
              x={x}
              y={lineY - 22}
              fill="var(--text)"
              fontSize={13}
              fontWeight={600}
              fontFamily="var(--font-mono)"
              textAnchor="middle"
            >
              {s.t}
            </text>
            <text
              x={x}
              y={lineY + 30}
              fill="var(--text-muted)"
              fontSize={11.5}
              textAnchor="middle"
            >
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
