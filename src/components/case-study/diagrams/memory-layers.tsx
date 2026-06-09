const LAYERS = [
  { name: "Identity", sub: "persona anchor, who I am" },
  { name: "Semantic", sub: "stable facts, people, projects" },
  { name: "Episodic", sub: "daily journals & session digests" },
  { name: "Working", sub: "cross-session crash buffer" },
  { name: "Procedural", sub: "rules of operation" },
];

/**
 * The five memory layers of chiggyOS, rendered as a stacked diagram.
 * Pure inline SVG, themed via CSS custom properties.
 */
export function MemoryLayers() {
  const rowH = 52;
  const gap = 12;
  const top = 16;
  const width = 600;
  const height = top * 2 + LAYERS.length * rowH + (LAYERS.length - 1) * gap;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="diagram-svg"
      role="img"
      aria-label="The five memory layers of chiggyOS: identity, semantic, episodic, working, and procedural."
      xmlns="http://www.w3.org/2000/svg"
    >
      {LAYERS.map((layer, i) => {
        const y = top + i * (rowH + gap);
        return (
          <g key={layer.name}>
            <rect
              x={1}
              y={y}
              width={width - 2}
              height={rowH}
              rx={10}
              fill="var(--hover-bg)"
              stroke="var(--divider)"
              strokeWidth={1}
            />
            <rect x={1} y={y} width={4} height={rowH} rx={2} fill="var(--text-muted)" />
            <text
              x={28}
              y={y + rowH / 2 - 2}
              fill="var(--text)"
              fontSize={15}
              fontWeight={600}
              dominantBaseline="middle"
            >
              {layer.name}
            </text>
            <text
              x={28}
              y={y + rowH / 2 + 16}
              fill="var(--text-muted)"
              fontSize={12}
              dominantBaseline="middle"
            >
              {layer.sub}
            </text>
            <text
              x={width - 20}
              y={y + rowH / 2}
              fill="var(--text-dim)"
              fontSize={12}
              fontFamily="var(--font-mono)"
              textAnchor="end"
              dominantBaseline="middle"
            >
              {`L${LAYERS.length - i}`}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
