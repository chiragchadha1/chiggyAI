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

> Software engineer and builder in New York City. Builds developer tools, AI-native
> products, and automation. Software Engineer on the Developer Experience team at HubSpot;
> founder of Chiggy AI. Ships full-stack products zero-to-one, fast.

Contact: hi@chiggy.ai
Site: https://chiggy.ai
GitHub: https://github.com/chiragchadha1
LinkedIn: https://linkedin.com/in/chiragkchadha
X: https://x.com/chiggyio

## Focus
Developer tooling and developer experience (CLI, MCP servers, agent-first interfaces),
AI-native and agentic products, rapid full-stack product development.

## Core technologies
TypeScript, JavaScript, Node.js, React, React Native, Next.js, Tailwind CSS, Model Context
Protocol (MCP), AI agents and LLM tooling, Stripe, Supabase, Playwright.

## Experience
${experience().map(line).join("\n")}

## Projects
${projects().map(line).join("\n")}

## Open to
In-person or hybrid software engineering and founding-engineer roles in NYC.
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
