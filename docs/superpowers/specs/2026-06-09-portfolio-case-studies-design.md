# Portfolio Redesign + Case Studies — Design Spec

**Date:** 2026-06-09
**Owner:** Chirag Chadha
**Status:** Approved pending review

## Mission

chiggy.ai is a conversion tool for Chirag's job search and inbound opportunities. It must
make engineers and hiring managers immediately understand what he can build. The site is
itself a work sample: its craft (speed, polish, accessibility, interaction quality) is
part of the argument. It is an extension of the resume, so impact and evidence lead.

Success = higher interview hit-rate and more qualified inbounds. The most important asset
is the **content of the case studies** (clear narrative, real metrics, visualizations,
code, demos), backed by a design that signals taste and seniority.

## Scope

The **entire site is open to redesign**. Homepage, header, type scale, and section
structure can all change in service of the mission. What stays: the light, restrained
aesthetic (refined minimal, dialed up to top-1% polish — not flashy), the existing
micro-interactions worth keeping, and the no-em-dash / concise-copy style rules.

## Non-Goals

- No CMS/backend. Content is local MDX files in the repo.
- No dark mode, no new web fonts beyond the current Hanken + SF Mono (unless a later pass
  justifies it).
- No per-project custom OG images in v1 (use site default `og.png`; revisit later).

## Decisions (locked in brainstorming)

1. **Dedicated, shareable pages** at `/work/[slug]`, statically generated, each
   independently indexable with its own metadata. View transitions make navigation feel
   continuous.
2. **All entries become case studies**, depth scaled to material. DEFYE surfaced as the
   origin of Chiggy AI.
3. **Authoring = MDX content collection.** One `.mdx` per case study with a typed
   `export const meta` block + a markdown/JSX body. Adding a project later = copy the
   template. Optimized for easy long-term updates and rich media.
4. **Design dial: refined minimal, dialed up.** Confident, fast, detail-obsessed; not
   experimental/flashy. Taste reads as seniority.
5. **Code snippets: selective.** One short, genuinely interesting real snippet per
   technical project, syntax-highlighted.
6. **Visuals now: generated SVG + placeholder slots.** Hand-built inline SVG diagrams
   ship immediately; image/video slots render tasteful placeholders until Chirag drops in
   real screenshots/recordings (see `docs/case-studies-intake.md`).
7. **Seated: full technical depth, hideable.** Built complete (Playwright → API → captcha
   pre-solve) behind a one-line `hidden` flag + a TOS-risk code comment. Launch visibility
   is a final pre-deploy call.

## Tooling / stack additions

| Concern | Choice | Why |
|---|---|---|
| Authoring | `@next/mdx` + `@mdx-js/loader` + `@mdx-js/react` + `@types/mdx` | Native Next 16 MDX; local files, Server-Component friendly |
| Frontmatter | Typed `export const meta` per MDX (not YAML) | Type-safety; avoids extra remark plugin + Turbopack serialization limits |
| Markdown tables/GFM | `remark-gfm` (string config) | Turbopack-safe (no function options) |
| Code highlighting | **Shiki** via a custom async server `<Code>` / `pre` override | Build-time, zero runtime JS; full styling control; sidesteps Turbopack rehype-plugin limits |
| Page transitions | Next 16 native View Transitions (`experimental.viewTransition`) | Platform API, no heavy lib; senior signal |
| In-page motion | `motion` (Motion, successor to Framer Motion) | Scroll-reveal, metric count-ups, staggers; React 19 ready |
| Diagrams | Hand-built inline SVG | On-brand, full control, not generic (vs Mermaid) |
| Quality passes | repo skills: `impeccable` (direction), `animate`, `typeset`, `polish`, `audit` | Non-generic design + a11y/perf verification |

> Turbopack note: Next 16 dev/build default to Turbopack. Only string-named remark/rehype
> plugins with serializable options are allowed. The chosen approach (typed `meta` export +
> Shiki component, only `remark-gfm` as a string plugin) stays fully Turbopack-compatible.

## Architecture

### Content layer

```
src/content/work/
  hubspot.mdx
  chiggyos.mdx
  anlyst.mdx
  generate.mdx
  chiggy-ai.mdx
  bagel-cafe.mdx
  seated.mdx
src/content/work/index.ts   // imports all meta, exported helpers
```

Each MDX file:

```mdx
export const meta = {
  slug: "chiggyos",
  title: "chiggyOS",
  kind: "project",
  tagline: "An AI-native second brain on Obsidian",
  role: "Founder",
  when: "2026 –",
  status: "building",
  order: 2,
  metrics: [{ value: "5", label: "memory layers" }, ...],
  stack: ["Next.js", "Obsidian", "Claude Code"],
  links: [{ name: "...", github: "..." }],
  visual: "memory-layers",   // optional
  hidden: false,
} satisfies CaseStudyMeta;

## The problem
…prose…

<Diagram name="memory-layers" />

## What I built
<Code lang="ts" file="ingest.ts">{`await absorb(journal)`}</Code>

<Demo src="/images/work/chiggyos/ingest.mp4" poster="…" />
```

- `CaseStudyMeta` type lives in `src/content/work/types.ts`. `meta` is the single source
  of structured data for both the index and the detail page.
- `src/content/work/index.ts` statically imports each file's `meta` (typed) and exposes:
  `allCaseStudies()`, `projects()`, `experience()` (filter `kind`, exclude `hidden`,
  sort by `order`), `visibleSlugs()`.

### Routing (`src/app/work/[slug]/page.tsx`)

- `generateStaticParams()` → `visibleSlugs()` (hidden entries not prerendered).
- `export const dynamicParams = false` → unknown/hidden slugs 404.
- Body via dynamic import: `const { default: Body, meta } = await import(
  \`@/content/work/${slug}.mdx\`)`; `notFound()` if missing or `meta.hidden`.
- `generateMetadata({ params })` → per-case title/description (from `meta`), canonical
  `/work/[slug]`, OG/Twitter.
- Shared layout `src/app/work/[slug]/layout.tsx` (or a `CaseStudyShell` component) renders
  the anchored header, title (morph target), tagline, meta line, metric strip, then the
  MDX body, stack chips, links, and optional gallery.

### MDX components (`mdx-components.tsx` at `src/`)

Maps markdown elements to the site's typography and provides custom components available
in every MDX file: `Diagram`, `Code`, `Demo`, `Metric`/`MetricStrip`, `Callout`, `Figure`
(image slot with placeholder), `RepoLinks`. Headings/links/lists styled to match the
existing token system (no Tailwind `prose`; bespoke styles for control).

### View transitions (`next.config.ts` + `globals.css`)

- Enable `experimental.viewTransition: true` (alongside MDX `pageExtensions`).
- **Shared-element morph:** index row title and detail `<h1>` share
  `<ViewTransition name={`work-${slug}`} share="morph">` (soft blur mid-flight).
- **Directional slides:** index→detail link `transitionTypes={['nav-forward']}`; `← back`
  link `nav-back`; detail content wrapped in a type-mapped `<ViewTransition>`.
- **Anchored header:** shared `SiteHeader` gets `viewTransitionName: 'site-header'`,
  suppressed in CSS so it stays fixed during slides.
- **Reduced motion:** extend existing block to zero view-transition durations.

### Components (new / extracted)

- `site-header.tsx` — shared, transition-anchored header (`compact` prop: full bio on
  home, back-aware on `/work`).
- `case-study-link.tsx` — `<Link>` + `<ViewTransition>` + `transitionTypes` row wrapper.
- `metric-strip.tsx` — renders `Metric[]`, with count-up on first view (reduced-motion safe).
- `case-study-visual.tsx` / `diagrams/` — `MemoryLayers`, `PresolveTimeline` SVGs.
- `code.tsx` — async server component; Shiki `codeToHtml` with a light theme tuned to the
  palette; used by `<Code>` and the MDX `pre` override.
- `figure.tsx` — image/video slot with graceful placeholder.
- `repo-links.tsx` — extracted from `page.tsx`, reused on home + detail.

### Homepage (`src/app/page.tsx`)

- Extract header to `SiteHeader`. Free to refine the bio/hero within the dialed-up minimal
  direction.
- Projects and Experience render linked rows via `case-study-link`: title (morph) + status
  badge + tagline + a compact metric teaser + an **always-visible** cue (arrow /
  "case study →"); hover keeps the bg tint.
- Two labelled sections retained (not merged).

### Sitemap (`src/app/sitemap.ts`)

Add all `visibleSlugs()` as `/work/[slug]` URLs.

## Content plan (drafted from the vault, depth-scaled)

| slug | title | kind | headline metrics | visual | media |
|---|---|---|---|---|---|
| hubspot | HubSpot | experience | +425% QAD (346→1,817), 4,000+ weekly devs, 97% vs 65% config, 161 files | system map (opt) | code: logging abstraction |
| chiggyos | chiggyOS | project | 5 memory layers, daily ingest, live interview asset | memory-layers | code: ingest loop; vault screenshot slot |
| anlyst | Anlyst | experience | 200+ waitlist, 3+ VC convos, 4 health integrations | vault/mirror/persona (opt) | screenshot slots |
| generate | Generate | experience | 160+ students, 300+ showcase, 103K impressions, 15-person team | — | Couplet screenshot slots |
| chiggy-ai | Chiggy AI (+ DEFYE origin) | experience | 50+ clients, ~$25k, since 2017 | skill-evolution timeline (opt) | client work thumbnails |
| bagel-cafe | Howard Beach Bagel Cafe | project | first paid freelance, live on Vercel | — | live link + screenshot slots |
| seated | Seated | project | <2s to book, 50+ inbound overnight, revenue in 1 week | presolve-timeline | code: pre-solve token reuse |

Section skeleton per study: **The problem → What I built → Impact → Lessons** (omit any
section lacking material). HubSpot + chiggyOS deepest; Anlyst + Bagel Cafe medium;
Generate + Chiggy AI/DEFYE tighter.

## Interactions summary (the "stand out" layer)

- Shared-element title morph on navigation (signature move).
- Directional forward/back slides with an anchored header.
- Always-visible row cue + hover tint.
- Metric count-up / staggered section reveal via Motion (reduced-motion safe).
- Syntax-highlighted real code via Shiki.
- Existing micro-interactions retained (hover-image, copy-email, now-playing, 3D-tilt
  gallery, lightbox).

## Risks / edge cases

- **View Transitions experimental + browser-variable** → must degrade to plain nav;
  verify Safari.
- **MDX + Turbopack** → keep plugins string-named/serializable; verify `next build`
  prerenders all `/work/[slug]`.
- **Hidden entries** must not leak into sitemap, `generateStaticParams`, or index.
- **Empty optional fields** (no gallery/visual/stack) render nothing, not empty shells.
- **Shiki async component** must work in static export (build-time highlight, no runtime).
- **No em dashes** anywhere in copy or code.

## What we need from Chirag (tracked in `docs/case-studies-intake.md`)

Confirmed public links per project, any metrics NOT to publish, screenshots/recordings,
one "proudest technical detail" per project, the Seated launch-visibility call. None block
the build; pages degrade gracefully and media slots fill in later.

## Out of scope / later

- Real media capture (slots ready).
- Per-project OG images.
- Optional web `/resume` page (keep PDF link for now).
