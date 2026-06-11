const AGENTS = ["Claude Code", "Cursor", "Codex", "Gemini", "Windsurf"];

/**
 * The HubSpot MCP architecture: five AI agents converging on one MCP server that
 * drives the developer platform. Pure inline SVG, themed via CSS custom properties.
 */
export function AgentStack() {
  const width = 640;
  const height = 284;
  const chipW = 118;
  const chipH = 34;
  const chipGap = 12;
  const chipY = 14;
  const mcpY = 128;
  const mcpW = 250;
  const mcpH = 56;
  const platY = 214;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="diagram-svg"
      role="img"
      aria-label="Five AI agents (Claude Code, Cursor, Codex, Gemini, and Windsurf) all connect through one HubSpot MCP server, which drives the HubSpot developer platform."
      xmlns="http://www.w3.org/2000/svg"
    >
      {AGENTS.map((name, i) => {
        const x = 1 + i * (chipW + chipGap);
        const cx = x + chipW / 2;
        const lineLen = Math.hypot(width / 2 - cx, mcpY - (chipY + chipH));
        return (
          <g key={name}>
            <g data-anim="" style={{ ["--i" as string]: i * 0.5 }}>
              <rect
                x={x}
                y={chipY}
                width={chipW}
                height={chipH}
                rx={17}
                fill="var(--hover-bg)"
                stroke="var(--divider)"
                strokeWidth={1}
              />
              <text
                x={cx}
                y={chipY + chipH / 2 + 1}
                fill="var(--text)"
                fontSize={12.5}
                fontWeight={500}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {name}
              </text>
            </g>
            <line
              x1={cx}
              y1={chipY + chipH}
              x2={width / 2}
              y2={mcpY - 2}
              stroke="var(--divider)"
              strokeWidth={1.5}
              data-anim-line=""
              style={{ ["--len" as string]: Math.ceil(lineLen), ["--i" as string]: 3 }}
            />
          </g>
        );
      })}

      <g data-anim="" style={{ ["--i" as string]: 4.5 }}>
        <rect
          x={width / 2 - mcpW / 2}
          y={mcpY}
          width={mcpW}
          height={mcpH}
          rx={12}
          fill="var(--text)"
        />
        <text
          x={width / 2}
          y={mcpY + 24}
          fill="var(--bg)"
          fontSize={15}
          fontWeight={600}
          textAnchor="middle"
        >
          HubSpot MCP server
        </text>
        <text
          x={width / 2}
          y={mcpY + 42}
          fill="var(--bg)"
          opacity={0.65}
          fontSize={11.5}
          textAnchor="middle"
        >
          one surface for every agent
        </text>
      </g>

      <line
        x1={width / 2}
        y1={mcpY + mcpH}
        x2={width / 2}
        y2={platY - 2}
        stroke="var(--divider)"
        strokeWidth={1.5}
        data-anim-line=""
        style={{ ["--len" as string]: platY - mcpY - mcpH, ["--i" as string]: 5.5 }}
      />

      <g data-anim="" style={{ ["--i" as string]: 6 }}>
        <rect
          x={70}
          y={platY}
          width={width - 140}
          height={54}
          rx={12}
          fill="var(--hover-bg)"
          stroke="var(--divider)"
          strokeWidth={1}
        />
        <text
          x={width / 2}
          y={platY + 23}
          fill="var(--text)"
          fontSize={14.5}
          fontWeight={600}
          textAnchor="middle"
        >
          HubSpot developer platform
        </text>
        <text
          x={width / 2}
          y={platY + 41}
          fill="var(--text-muted)"
          fontSize={11.5}
          textAnchor="middle"
        >
          CRM, projects, local dev, accounts
        </text>
      </g>
    </svg>
  );
}
