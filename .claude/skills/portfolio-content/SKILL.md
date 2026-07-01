---
name: portfolio-content
description: Write and update public-facing portfolio content (case studies, taglines, bio copy) in Chirag's professional voice. Use when adding a new experience, updating an existing case study, or writing any copy that will appear on chiggy.ai.
version: 1.0.0
user-invocable: true
argument-hint: "[experience or project name]"
---

## MANDATORY PREPARATION

1. Invoke `/professional-voice` — Chirag's professional writing rules
2. Invoke `/humanizer` — anti-AI pattern checklist
3. Invoke `/quality-gate` — 7-criterion quality rubric (0.82+ to ship)
4. Read the existing case studies at `src/content/work/*.mdx` to match the established structure and tone
5. If the content involves a past role, check `~/vaults/chiggyOS/20-wiki/` and `~/vaults/chiggyOS/10-journal/work/` for source material

Related skills (all invocable):
- `/professional-voice` — professional writing rules
- `/personal-voice` — casual/social writing rules (tweets, DMs, IG captions)
- `/humanizer` — 29-pattern anti-AI checklist
- `/quality-gate` — scored rubric, 0.82+ avg to ship
- `/portfolio-update-pack` — portfolio through-line and design direction

---

## Public-facing content rules

Everything on chiggy.ai is visible to recruiters, engineers, founders, and LLMs. Apply these rules to every piece of copy.

### No internal leaks

- No colleague names, manager names, or internal team names. Describe by function: "the backend platform team", "the designer I partnered with."
- No confidential strategy documents, internal quotes from leadership, or internal project codenames.
- No internal identifiers (Linear issues, Slack channels, internal tools outsiders won't recognize).

### Outsider-readable

Ask: would someone who's never worked at this company understand what I'm describing?

- Replace internal jargon with plain language ("portals" → "accounts" or "client instances")
- Skip internal version numbers and release names
- If a term only makes sense inside the company, rephrase or cut it

### No confidential code

- Code samples illustrate patterns, not internal implementation
- Don't show internal API endpoints, service names, or data structures
- When in doubt, write a representative example that shows the same idea

---

## Framing for impact

### Lead with the problem

Don't start with "I built X." Start with why X needed to exist. What was broken? What was the gap?

- Good: "About a third of new developers failed silently during onboarding."
- Bad: "I redesigned the authentication system."

### Show thinking and judgment

The portfolio should show senior-level thinking, not just task execution.

- **Why** this architecture, not just what it is
- **How** you thought about the user experience
- **What tradeoffs** you made and why

### Numbers should tell stories

- Bad: "Shipped 173 PRs" or "+2,005 lines added" (means nothing)
- Good: "Grew the quarterly active developer community by 425%, from 346 to over 1,800"
- Good: "Led 9 projects in under a year"

Test: does this number make someone say "wow" on its own?

### Don't flex process details

These don't belong: breaking large PRs into smaller ones, number of design patterns applied, line counts, number of repos touched, coordinating with specifically named teams.

These do belong: the problem it solved, how you thought about the architecture, cross-functional collaboration (described generically), customer feedback (anonymized by role and scale).

### Customer stories

Anonymize by role and scale, not by name:
- "a platinum agency partner managing over 1,000 client instances"
- Keep quotes that are concrete enough for anyone to understand

---

## Case study structure

Use this structure for any new experience or project page:

1. **The problem** — Framed for outsiders. What was broken, at what scale, and what was at stake?
2. **What was built** — Organized by theme, not chronologically. Each section leads with what it does and why.
3. **The thinking** — Woven into the build sections. Show architecture decisions, UX thinking, cross-team coordination without naming internal teams.
4. **Impact** — Real numbers, framed meaningfully. End with the aggregate "wow."

---

## Content types and where they live

| Content | File | Notes |
|---|---|---|
| Case study | `src/content/work/<slug>.mdx` | Must export `meta` object matching `CaseStudyMeta` type |
| Homepage bio | `src/app/page.tsx` | Bio bullets in the about section |
| Terminal copy | `src/components/terminal.tsx` | `whoami`, `now`, `stack` commands |
| SEO/meta | `src/app/layout.tsx` | Title, description, JSON-LD |
| LLM summary | `src/app/llms.txt/route.ts` | Auto-generated from content layer |

### Adding a new experience

1. Create `src/content/work/<slug>.mdx` with meta + body
2. Register it in `src/content/work/index.ts` (import + add to modules array)
3. Set `order` to control position (lower = higher in the list)
4. For roles not yet started, set `noDetailPage: true` in meta
5. Run `npx next build` to verify

---

## Voice checklist (run before finishing)

- [ ] Full sentences with subject + verb throughout
- [ ] Contractions used everywhere (I'm, I've, I don't, it's)
- [ ] No em dashes (use commas or periods)
- [ ] No banned vocabulary: additionally, showcase, vibrant, crucial, pivotal, delve, underscore, testament, landscape, tapestry, garner, foster, enhance, leveraging, seamless, robust, passionate, AI-native, AI-forward, game-changing, spearheading
- [ ] No banned constructions: "It's not just about X, it's about Y", "At its core...", "Let's dive into...", rule-of-three for effect, sycophancy, generic positive conclusions
- [ ] Specific over vague throughout
- [ ] Anti-AI final check: "What makes this obviously AI-generated?" Answer it, then fix it.
