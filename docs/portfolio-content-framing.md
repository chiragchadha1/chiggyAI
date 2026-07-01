# Portfolio content framing

How to write and update public-facing portfolio content on chiggy.ai. Pairs with [[chirag-professional-voice]], [[humanizer]], and [[portfolio-update-pack]].

This skill exists because internal docs (brag doc, handoff doc, Linear, Slack) carry detail that doesn't belong in a public portfolio. The portfolio tells the story; the internal docs have the receipts.

---

## Public-facing content rules

### No internal names or references

- Never use colleague names, manager names, or internal team names (e.g. "App Foundations BE", "DevRel", "DPG"). Describe by function instead: "the backend platform team", "the design partner I worked with."
- Never reference confidential strategy documents, internal quotes from leadership, or internal project codenames.
- Never use internal identifiers like Linear issue numbers, internal Slack channels, or internal tool names that outsiders won't recognize.

### Explain company context for outsiders

People reading this don't work at HubSpot (or wherever the experience is from). Ask: would someone outside this company understand what I'm describing?

- "portals" → "HubSpot instances" or just "accounts" depending on context
- "an agency partner managing 1,100 accounts" → "an agency partner managing over 1,000 client instances" (explain the scale, not the internal terminology)
- "platform version 2026.9" → skip it entirely, or say "an upcoming platform update"
- If a term only makes sense inside the company, rephrase or cut it.

### No code or architecture that could be confidential

- Code samples should illustrate a pattern, not expose internal implementation details.
- Don't show internal API endpoints, internal service names, or internal data structures.
- When in doubt, write a representative example that shows the same pattern without using real internal code.

---

## Framing for impact

### Lead with the problem, not the output

Don't start with "I built X." Start with why X needed to exist. What was broken? What was the gap? What was the cost of not fixing it?

Good: "About a third of new developers failed silently during onboarding."
Bad: "I redesigned the authentication system."

The build comes after the reader understands why it matters.

### Show thinking and judgment

The portfolio should make it clear that Chirag thinks at a senior/staff level, not just executes tasks. For each piece of work, show:

- **Why** this architecture, not just what it is. "I designed it to detect config files rather than storing flags, so it works even if the user set things up manually."
- **How** you thought about the user. "Agents can't answer interactive prompts. They need structured output they can parse."
- **What tradeoffs** you made. "I moved the API functions directly into the CLI for iteration speed, knowing we'd formalize them later."

### Numbers should tell stories

Raw counts don't impress. Framed results do.

- Bad: "Shipped 173 PRs" (so what?)
- Bad: "+2,005 lines added" (means nothing)
- Bad: "Applied 7 design patterns (SRP, IoC, CQS, SoC, OCP, DRY, ISP)" (resume padding)
- Good: "Grew the quarterly active developer community by 425%, from 346 to over 1,800"
- Good: "First-run config success rate went from 65% to 97%"
- Good: "Led 9 projects in under a year"

The test: does this number make someone say "wow" on its own? If it needs context to be impressive, either add the context or cut the number.

### Don't flex process details

These are internal process details that don't belong on a public portfolio:
- Breaking a large PR into smaller ones
- Number of design patterns applied
- Line counts
- Number of repos touched
- Coordinating with specific named teams

These are impact and thinking, which do belong:
- The problem it solved and why it matters
- How you thought about the architecture
- Cross-functional collaboration (described generically: "coordinated with the backend platform team")
- Customer feedback (anonymized by role and scale)

### Customer stories

Customer validation quotes are powerful when anonymized properly:
- Use role and scale: "a platinum agency partner managing over 1,000 client instances"
- Don't use names, company names, or specific partner tiers that only make sense internally
- Keep the quote if it's concrete: "it will remove the possibility of pushing the wrong code to the wrong portal" works because anyone can understand the risk

---

## Internal brag doc vs public portfolio

Same work, different audience, different framing:

| Dimension | Brag doc (internal) | Portfolio (public) |
|---|---|---|
| Audience | Manager, skip-level, promo committee | Recruiters, engineers, founders, internet |
| Names | Full names, team names, manager quotes | Anonymized by role and scale |
| Detail level | Exhaustive (every PR, every issue) | Curated (the most impactful work) |
| Jargon | Internal terms are fine | Must be understandable by outsiders |
| Metrics | All of them, with sources | Only the ones that tell a story |
| Strategy refs | Link to internal docs | Describe the direction without citing docs |
| Tone | Can be formal, detailed | Professional voice with personality |

---

## Case study structure

This structure worked well for the HubSpot case study and should be the default:

1. **The problem** — Framed for outsiders. What was broken? What was the cost? What was at stake? Include scale (number of developers, users, accounts) so the reader understands the impact surface.

2. **What was built** — Organized by theme (e.g. "MCP server", "Authentication overhaul", "CLI infrastructure"), not chronologically. Each section leads with what it does and why, not "I built..."

3. **The thinking** — Woven into the build sections, not a separate section. Show architecture decisions, UX thinking, and cross-functional coordination without naming internal teams.

4. **Impact** — Real numbers, framed meaningfully. End with the aggregate: what does the work amount to? This is the "wow" moment.

---

## Voice

All rules from [[chirag-professional-voice]] apply:
- Full sentences, contractions always
- Commas over em dashes
- No banned vocabulary (see the full list in the voice skill)
- Specific over vague, but don't over-specify with internal details
- Anti-AI final check: "what makes this obviously AI-generated?" Answer it, then fix.

---

## Anti-patterns to watch for

- **Resume voice**: "Spearheaded the migration of..." No. Say what happened and why it matters.
- **Metric soup**: Listing every number you can find. Pick 3-4 that tell a story.
- **Internal context leak**: Naming teams, citing strategy docs, using internal jargon.
- **Empty flex**: "Coordinated cross-functionally with 3 teams" without saying what the coordination actually produced.
- **Passive modesty**: "Contributed to the MCP server." Say what you did.
- **Feature list**: Bullet-pointing every PR. Group by theme and lead with impact.
