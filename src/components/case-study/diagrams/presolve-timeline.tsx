const STEPS = [
  { t: "T-60s", label: "pre-solve the slow check" },
  { t: "T-59s", label: "cache the token" },
  { t: "T-0", label: "fire the booking" },
  { t: "< 2s", label: "table booked" },
];

/**
 * The pre-solve timing trick, as a horizontal timeline. Platform-agnostic labels only.
 * Pure inline SVG, themed via CSS custom properties.
 */
export function PresolveTimeline() {
  const width = 640;
  const height = 150;
  const padX = 40;
  const lineY = 70;
  const span = width - padX * 2;
  const step = span / (STEPS.length - 1);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="diagram-svg"
      role="img"
      aria-label="Pre-solve timeline: prepare the slow verification step a minute before the drop, cache the token, then fire the booking the instant the table opens, securing it in under two seconds."
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1={padX}
        y1={lineY}
        x2={width - padX}
        y2={lineY}
        stroke="var(--divider)"
        strokeWidth={2}
      />
      {STEPS.map((s, i) => {
        const x = padX + i * step;
        const last = i === STEPS.length - 1;
        return (
          <g key={s.t}>
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
              fontSize={14}
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
