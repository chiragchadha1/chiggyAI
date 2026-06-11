const STAGES = [
  { step: "01 · collect", name: "Vault", sub: "aggregates your data" },
  { step: "02 · understand", name: "Mirror", sub: "builds personal context" },
  { step: "03 · act", name: "Persona", sub: "acts proactively for you" },
];

/**
 * Anlyst's three-layer architecture as a left-to-right pipeline: collect,
 * understand, act. Pure inline SVG, themed via CSS custom properties.
 */
export function VaultMirrorPersona() {
  const width = 640;
  const height = 188;
  const boxW = 170;
  const boxH = 64;
  const boxY = 64;
  const xs = [10, 235, 460];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="diagram-svg"
      role="img"
      aria-label="Anlyst's three-layer pipeline: the Vault collects and aggregates your data, the Mirror turns it into personal context, and the Persona acts proactively on your behalf."
      xmlns="http://www.w3.org/2000/svg"
    >
      {STAGES.map((stage, i) => {
        const x = xs[i];
        const cx = x + boxW / 2;
        const last = i === STAGES.length - 1;
        return (
          <g key={stage.name}>
            <g data-anim="" style={{ ["--i" as string]: i * 1.6 }}>
              <text
                x={cx}
                y={46}
                fill="var(--text-dim)"
                fontSize={11}
                fontFamily="var(--font-mono)"
                textAnchor="middle"
              >
                {stage.step}
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
                y={boxY + 27}
                fill={last ? "var(--bg)" : "var(--text)"}
                fontSize={15}
                fontWeight={600}
                textAnchor="middle"
              >
                {stage.name}
              </text>
              <text
                x={cx}
                y={boxY + 46}
                fill={last ? "var(--bg)" : "var(--text-muted)"}
                opacity={last ? 0.65 : 1}
                fontSize={11.5}
                textAnchor="middle"
              >
                {stage.sub}
              </text>
            </g>
            {i < STAGES.length - 1 && (
              <g data-anim="" style={{ ["--i" as string]: i * 1.6 + 0.8 }}>
                <line
                  x1={x + boxW + 6}
                  y1={boxY + boxH / 2}
                  x2={xs[i + 1] - 14}
                  y2={boxY + boxH / 2}
                  stroke="var(--text-muted)"
                  strokeWidth={1.5}
                />
                <polygon
                  points={`${xs[i + 1] - 6},${boxY + boxH / 2} ${xs[i + 1] - 14},${boxY + boxH / 2 - 4.5} ${xs[i + 1] - 14},${boxY + boxH / 2 + 4.5}`}
                  fill="var(--text-muted)"
                />
              </g>
            )}
          </g>
        );
      })}
      <text
        x={width / 2}
        y={164}
        fill="var(--text-muted)"
        fontSize={11.5}
        textAnchor="middle"
        data-anim=""
        style={{ ["--i" as string]: 5 }}
      >
        MVP signal: Whoop, Apple Health, Google Calendar, MyFitnessPal
      </text>
    </svg>
  );
}
