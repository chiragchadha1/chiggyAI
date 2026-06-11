const NODES = [
  { meta: "voice · clips · notes", name: "Capture", sub: "raw and messy" },
  { meta: "cron · nightly", name: "Absorb", sub: "distill meaning" },
  { meta: "plain text", name: "Wiki", sub: "linked memory" },
  { meta: "remote agent", name: "Atlas", sub: "acts + reports" },
];

/**
 * The chiggyOS operating loop: raw capture is absorbed nightly into a plain-text
 * wiki that the Atlas agent acts from, and its output feeds the next capture.
 * Pure inline SVG, themed via CSS custom properties.
 */
export function AtlasLoop() {
  const width = 640;
  const height = 234;
  const boxW = 136;
  const boxH = 58;
  const boxY = 64;
  const gap = 24;
  const x0 = 12;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="diagram-svg"
      role="img"
      aria-label="The chiggyOS loop: raw captures are absorbed nightly into a plain-text wiki, the Atlas agent acts from that memory and reports through Telegram, and its output becomes new context for the next capture."
      xmlns="http://www.w3.org/2000/svg"
    >
      {NODES.map((node, i) => {
        const x = x0 + i * (boxW + gap);
        const cx = x + boxW / 2;
        const last = i === NODES.length - 1;
        return (
          <g key={node.name}>
            <g data-anim="" style={{ ["--i" as string]: i * 1.4 }}>
              <text
                x={cx}
                y={48}
                fill="var(--text-dim)"
                fontSize={10.5}
                fontFamily="var(--font-mono)"
                textAnchor="middle"
              >
                {node.meta}
              </text>
              <rect
                x={x}
                y={boxY}
                width={boxW}
                height={boxH}
                rx={12}
                fill={last ? "var(--text)" : "var(--hover-bg)"}
                stroke={last ? "none" : "var(--divider)"}
                strokeWidth={1}
              />
              <text
                x={cx}
                y={boxY + 25}
                fill={last ? "var(--bg)" : "var(--text)"}
                fontSize={14.5}
                fontWeight={600}
                textAnchor="middle"
              >
                {node.name}
              </text>
              <text
                x={cx}
                y={boxY + 43}
                fill={last ? "var(--bg)" : "var(--text-muted)"}
                opacity={last ? 0.65 : 1}
                fontSize={11}
                textAnchor="middle"
              >
                {node.sub}
              </text>
            </g>
            {i < NODES.length - 1 && (
              <g data-anim="" style={{ ["--i" as string]: i * 1.4 + 0.7 }}>
                <line
                  x1={x + boxW + 4}
                  y1={boxY + boxH / 2}
                  x2={x + boxW + gap - 9}
                  y2={boxY + boxH / 2}
                  stroke="var(--text-muted)"
                  strokeWidth={1.5}
                />
                <polygon
                  points={`${x + boxW + gap - 3},${boxY + boxH / 2} ${x + boxW + gap - 10},${boxY + boxH / 2 - 4} ${x + boxW + gap - 10},${boxY + boxH / 2 + 4}`}
                  fill="var(--text-muted)"
                />
              </g>
            )}
          </g>
        );
      })}

      {/* Return loop: Atlas output becomes the next capture's context */}
      <g data-anim="" style={{ ["--i" as string]: 5.5 }}>
        <path
          d={`M ${x0 + 3.5 * (boxW + gap) + boxW / 2} ${boxY + boxH + 8}
              C ${x0 + 3.5 * (boxW + gap) + boxW / 2} 196, ${x0 + boxW / 2} 196, ${x0 + boxW / 2} ${boxY + boxH + 14}`}
          fill="none"
          stroke="var(--text-muted)"
          strokeWidth={1.5}
          strokeDasharray="5 5"
        />
        <polygon
          points={`${x0 + boxW / 2},${boxY + boxH + 6} ${x0 + boxW / 2 - 4.5},${boxY + boxH + 15} ${x0 + boxW / 2 + 4.5},${boxY + boxH + 15}`}
          fill="var(--text-muted)"
        />
        <text
          x={width / 2}
          y={216}
          fill="var(--text-muted)"
          fontSize={11.5}
          textAnchor="middle"
        >
          briefings land in Telegram, and what I do next becomes new context
        </text>
      </g>
    </svg>
  );
}
