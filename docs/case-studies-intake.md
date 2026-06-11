# Case Studies — Content Intake

> **Status (2026-06-09, iteration 2):** The site is substantially built and richer now.
> Homepage has a bold hero + portrait + ⌘K command palette + live clock; case studies are
> enriched from the vault (publish-safe), with diagrams, real code, and view-transition
> navigation. Live-site screenshots are in for Chiggy AI (defye.us), Generate
> (generatenu.com), and Bagel Cafe (hbbagelcafe.com). GEO is live: `/llms.txt`, keyword
> metadata, JSON-LD, and dynamic per-case OG images.
>
> What still helps from you: (1) real product screenshots/recordings for **HubSpot** (MCP
> in action), **chiggyOS** (the vault/wiki), **Anlyst** (MVP), and **Couplet**; (2) confirm
> the hero portrait (currently `santorini-portrait.webp`, swap in `src/app/page.tsx`);
> (3) the **Seated** launch-visibility call; (4) sanity-check any metric you'd rather not
> publish. Edit a case study at `src/content/work/<slug>.mdx`; drop media in
> `public/images/work/<slug>/` and reference it with `<Figure src="..." />`.


This is the living checklist for making each case study impressive. Fill in what you can,
when you can. The single highest-leverage items are **real screenshots/recordings** and
**confirmed public links**. Everything here is optional per-project — the page degrades
gracefully when something is missing.

For each project, drop assets in `public/images/work/<slug>/` and note links/details below.

## Global questions (answer once)

- [ ] Which GitHub repos / live URLs are **public and safe to link**? (Per project below.)
- [ ] Any metric I pulled from your vault that you do **not** want published? (e.g. salary,
      internal HubSpot numbers, anything under NDA.)
- [ ] Do you have a 1-line "what I'm most proud of, technically" for each? (The senior signal.)
- [ ] Resume: keep the PDF link, or also build a web `/resume`? (Default: keep PDF.)

---

## 1. HubSpot (experience) — flagship

- [ ] Public repos to feature (hubspot-cli, local-dev-lib confirmed public — others?)
- [ ] Screenshot/GIF: the MCP server in action (Claude Code / Cursor calling HubSpot tools)
- [ ] OK to publish: 346 → 1,817 QAD (+425%), 72% w4 retention, 4,000+ weekly devs,
      97% vs 65% config success, 161-file logging refactor?
- [ ] Any public blog post / launch / docs you want linked?
- [ ] Code snippet you'd be proud to show (e.g. the logging abstraction)?

## 2. chiggyOS (project)

- [ ] Screenshot: the Obsidian vault / wiki graph / a synthesized wiki page
- [ ] GIF: daily ingest → wiki synthesis, or a `/wiki` command running
- [ ] Is the repo public/shareable, or keep it closed (describe only)?
- [ ] Confirm the 5-layer memory model framing is how you want it told
- [ ] The "demoed live in a Windmill interview" story — include it? (great proof)

## 3. Anlyst (experience)

- [ ] Screenshots: the MVP, the Vault/Mirror/Persona system, onboarding
- [ ] Logo / brand assets
- [ ] OK to publish: 200+ waitlist, 3+ VC conversations?
- [ ] Any demo video from the build?
- [ ] Co-founder credit / link?

## 4. Generate (experience)

- [ ] Couplet: app screenshots, the repo (github.com/generatenu/couplet — public?)
- [ ] Showcase photos (300+ attendees), rebrand campaign visuals
- [ ] OK to publish: 160+ students, 103K impressions, 15-person team?
- [ ] generatenu.com link confirmed

## 5. Chiggy AI + DEFYE origin (experience)

- [ ] Best client work to showcase: logos, motion/video reels, sites (which are public?)
- [ ] defye.us — keep live and linkable?
- [ ] A few representative thumbnails (logo grid, a motion still, a site screenshot)
- [ ] OK to publish: 50+ clients, ~$25k, "since 2017"?

## 6. Howard Beach Bagel Cafe (project)

- [ ] Live URL (Vercel) to link
- [ ] Screenshots: homepage hero, menu page, catering, mobile
- [ ] Short screen recording of the auto-scrolling photos / Framer Motion polish
- [ ] OK to mention: first paid freelance, the outdated-menu problem solved

## 7. Seated (project) — SENSITIVE

- [ ] **Decision: launch visible or hidden?** (Default ships behind a `hidden` flag.)
- [ ] If visible: confirm the altitude of technical detail you're comfortable publishing
      (the spec builds the full pre-solve arc; we can dial it down per your call)
- [ ] No platform names / no live link (by design)
- [ ] Any sanitized screenshot (dashboard with branding/data removed)?

---

## Asset format guide

- **Screenshots:** PNG/WebP, 2x resolution, real content (blur any sensitive data).
- **Recordings:** 10–40s, muted, MP4 or GIF. Loom export is fine. Show the thing working.
- **Code:** paste the real snippet; I'll syntax-highlight and trim to the interesting part.
- **Diagrams:** you don't need to make these — tell me the architecture and I'll draw the SVG.
