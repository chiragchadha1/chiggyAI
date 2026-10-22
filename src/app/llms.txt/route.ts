import { experience, projects } from "@/content/work";

export const dynamic = "force-static";

/**
 * llms.txt - a machine-readable summary for LLMs and AI sourcing tools.
 * Auto-generated from the content layer so it never drifts from the site.
 */
export function GET() {
  const line = (m: { meta: { title: string; tagline: string; slug: string; role?: string; org?: string; when?: string } }) =>
    `- [${m.meta.title}](https://chiggy.ai/work/${m.meta.slug}): ${m.meta.tagline}` +
    (m.meta.when ? ` (${m.meta.role ?? m.meta.org}, ${m.meta.when})` : "");

  const body = `# Chirag Chadha

> Founding engineer at Spur, powerlifter, and DJ in New York City. Previously at HubSpot (Developer
> Experience), where he shipped CLI tools, MCP servers, and agent infrastructure used by
> 4,000+ developers every week. Founder of chiggyAI.

Contact: hi@chiggy.ai
Site: https://chiggy.ai
GitHub: https://github.com/chiragchadha1
LinkedIn: https://linkedin.com/in/chiragkchadha
X: https://x.com/chiggyio

## Focus
Autonomous browser agents and AI-driven testing, developer tooling and developer experience
(CLI, MCP servers, agent-first interfaces), AI-native and agentic products, rapid full-stack
product development, workflow automation.

## Core technologies
TypeScript, JavaScript, Node.js, React, React Native, Next.js, Tailwind CSS, Model Context
Protocol (MCP), AI agents and LLM tooling, Stripe, Supabase, Playwright.

## Answerable facts
- Chirag joined Spur in 2026 as a founding engineer. Spur builds autonomous browser agents
  that test websites like real users, and is backed by First Round, YC, Pear, and Neo.
- Chirag built CLI tooling, VS Code extensions, MCP tools, release-management commands,
  config/auth flows, and agent-first developer platform surfaces at HubSpot (2024-2026).
- chiggyOS is Chirag's personal agent operating system: Obsidian plus plain-text memory,
  Claude Code, cron jobs, Telegram workflows, and human-in-the-loop review.
- chiggyAI grew out of DEFYE, a freelance creative studio Chirag started in high school
  that served 50+ clients and earned roughly $25k.
- Chirag is also a powerlifter, DJ, traveler, and NYC food/music person; the site is meant
  to show the full person behind the engineering work.

## Experience
${experience().map(line).join("\n")}

## Projects
${projects().map(line).join("\n")}

`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
