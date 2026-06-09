# Portfolio Case Studies — Design Spec

**Date:** 2026-06-09
**Owner:** Chirag Chadha
**Status:** Approved pending review

## Goal

Turn the flat project/experience list on chiggy.ai into a set of dedicated, shareable
"case study" pages, each explaining impact with metrics, narrative, links, and optional
visuals. Keep the existing minimal aesthetic. Add subtle, distinctive interactions that
make the site stand out, anchored on Next 16's View Transitions API so dedicated pages
feel like you never left the homepage.

## Non-Goals

- No redesign of the photo gallery, now-playing, or bio/header content beyond what's
  needed to accommodate the new project rows.
- No CMS. Content stays hand-authored in `src/data/content.ts`.
- No dark mode, no new fonts, no new color system.

## Decisions (from brainstorming)

1. **Dedicated pages, not inline expand.** Each case study is its own URL
   (`/work/[slug]`) for SEO and shareable links. View transitions make navigation feel
   seamless (ped.ro is itself multi-page).
2. **All entries become case studies**, depth scaled to available material. DEFYE gets
   surfaced (currently only implied under Chiggy AI).
3. **Seated: full technical depth, but hideable.** Build the complete case study
   (Playwright → API → captcha pre-solve, Stripe holds). Gate it behind a `hidden` flag
   so it can be removed from the public site instantly. A code comment documents the TOS
   risk at the toggle. Default visibility is a launch-time decision; the flag makes it one
   line either way.
4. **Visuals: image slots + generated SVG.** Optional screenshot slots that render when
   assets are present and collapse cleanly when absent, plus hand-built inline SVG
   diagrams for projects without screenshots (chiggyOS memory layers, Seated pre-solve
   timeline).
5. **Homepage: free to redesign** to fit the richer project set. Rows get an
   **always-visible** clickable cue (arrow / "case study →") so pages are discoverable.

## Architecture

### Data model (`src/data/content.ts`)

Introduce one unified `CaseStudy` type that both projects and experience use. The index
and the detail pages read from the same source — no duplicated copy.

```ts
export interface Metric {
  value: string;   // "+425%", "<2s", "50+", "$25k"
  label: string;   // "quarterly active devs"
  sub?: string;    // optional smaller qualifier, e.g. "72% w4 retention"
}

export interface CaseStudySection {
  heading: string; // "The problem", "What I built", "Impact", "Lessons"
  body: string[];  // paragraphs
}

export type Status = "building" | "completed" | "active";
export type CaseStudyKind = "project" | "experience";

export interface CaseStudy {
  slug: string;              // url segment, e.g. "chiggyos"
  title: string;             // "chiggyOS"
  kind: CaseStudyKind;
  tagline: string;           // one-liner shown on the index
  role?: string;             // "Founder"
  org?: string;              // for experience entries
  when?: string;             // "2026 –"
  status?: Status;
  metrics: Metric[];         // 2–4 impact stats
  sections: CaseStudySection[];
  stack?: string[];          // tech chips
  links: RepoLink[];         // reuse existing github/npm/link pill model
  gallery?: Photo[];         // optional image slots (reuse Photo + lightbox)
  visual?: VisualKey;        // optional generated SVG diagram
  hidden?: boolean;          // exclude from index + 404 the route (Seated safety toggle)
  accent?: string;           // optional per-project accent color (subtle)
}

export type VisualKey = "memory-layers" | "presolve-timeline";
```

- `PROJECTS` and `EXPERIENCE` are replaced by a single `CASE_STUDIES: CaseStudy[]`.
  Helpers `projects()` and `experience()` filter by `kind` and exclude `hidden` entries;
  the homepage and routing read only through these helpers (plus `allSlugs()` for
  `generateStaticParams`).
- Existing `LINKS`, `PHOTOS`, `PLAYLISTS`, `RepoLink`, `Photo` are retained.

### Routing

- `src/app/work/[slug]/page.tsx`
  - `generateStaticParams()` → every non-hidden slug (hidden entries are not
    prerendered).
  - `export const dynamicParams = false` → unknown / hidden slugs 404.
  - `generateMetadata({ params })` → per-case title, description (from tagline),
    canonical `/work/[slug]`, OG/Twitter tags. Falls back gracefully.
  - Page calls `notFound()` if the slug is missing or `hidden`.
- `src/app/work/[slug]/not-found` handled by existing `app/not-found.tsx`.
- `src/app/sitemap.ts` updated to include all non-hidden `/work/[slug]` URLs.

### View transitions (`next.config.ts` + `globals.css`)

- Enable `experimental.viewTransition: true`.
- **Shared-element morph:** index row title and detail `<h1>` share
  `<ViewTransition name={`work-${slug}`} share="morph">`. Soft blur mid-flight.
- **Directional slides:** index→detail link carries `transitionTypes={['nav-forward']}`;
  the `← back` link carries `nav-back`. Detail content wrapped in a `<ViewTransition>`
  mapping those types to slide animations.
- **Anchored header:** a shared site header (name/logo) gets `viewTransitionName:
  'site-header'`, suppressed in CSS so it stays fixed during slides. This means lifting
  the header into a shared component used by both the homepage and `/work/[slug]`.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` zeroes view-transition
  durations (content swaps instantly). Existing reduced-motion block is extended.

### Components

- `src/components/case-study-link.tsx` — client wrapper: `<Link>` + `<ViewTransition>` +
  `transitionTypes`, used for each index row.
- `src/components/site-header.tsx` — extracted, shared, view-transition-anchored header
  (name + logo). Homepage shows the full bio header; `/work` shows a compact back-aware
  variant. Keep it simple: one component, a `compact` prop.
- `src/components/metric-strip.tsx` — renders the `Metric[]` row.
- `src/components/case-study-visual.tsx` — switch on `VisualKey`, renders the matching
  inline SVG (`MemoryLayers`, `PresolveTimeline`). Pure SVG using existing CSS vars, no
  deps.
- Reuse `RepoLinks` (extract from `page.tsx` into `src/components/repo-links.tsx` so both
  the homepage and case study pages use it).
- Reuse `PhotoGallery` / lightbox for `gallery`.

### Homepage changes (`src/app/page.tsx`)

- Replace the flat `.project-row` paragraphs with linked rows: title (morph target) +
  status badge + tagline + a compact metric teaser + an always-visible cue
  (arrow / "case study →"). Hover keeps the existing bg tint.
- Projects and Experience remain two labelled sections (not merged), but both render the
  same row component from `CASE_STUDIES`.
- Header extracted to `SiteHeader`.

## Content plan (drafted from the vault, depth-scaled)

| slug | title | kind | headline metrics | visual | gallery |
|---|---|---|---|---|---|
| hubspot | HubSpot | experience | +425% QAD (346→1,817), 4,000+ weekly devs, 97% vs 65% config success, 161 files | — | — |
| chiggyos | chiggyOS | project | 5 memory layers, daily ingest, live interview asset | memory-layers | optional |
| anlyst | Anlyst | experience | 200+ waitlist, 3+ VC convos, 4 health integrations | — | optional |
| generate | Generate | experience | 160+ students, 300+ showcase, 103K impressions, 15-person team | — | optional |
| chiggy-ai | Chiggy AI (+ DEFYE origin) | experience | 50+ clients, ~$25k, since 2017 | — | optional |
| bagel-cafe | Howard Beach Bagel Cafe | project | first paid freelance, live on Vercel | — | screenshots |
| seated | Seated | project | <2s to book, 50+ inbound overnight, revenue in 1 week | presolve-timeline | — |

Section skeleton per case study: **The problem → What I built → Impact → Lessons**
(omit any section without material). HubSpot and chiggyOS are the deepest; Bagel Cafe and
Anlyst are medium; Generate and Chiggy AI/DEFYE are tighter.

**Seated safety:** the `seated` entry is the only one whose technical content is
sensitive. It ships with the `hidden` toggle and a code comment noting that public
disclosure of the booking technique is against the platform's TOS. Whether it launches
visible is a final pre-deploy decision.

## Interactions summary (the "stand out" layer)

- Shared-element title morph on navigation (the signature move).
- Directional forward/back slides with an anchored header.
- Always-visible row cue with hover tint.
- Metric strip with a subtle count-up / fade-in on first view (respects reduced motion).
- Existing micro-interactions (hover-image, copy-email, now-playing, 3D-tilt gallery,
  lightbox) carried over unchanged.

## Risks / edge cases

- **View Transitions API is experimental + browser-variable.** Must degrade to plain
  navigation with no animation where unsupported (the API already does this; verify in
  Safari).
- **Static export.** `dynamicParams = false` + `generateStaticParams` keeps everything
  prerendered for Vercel. Confirm `next build` produces all `/work/[slug]` pages.
- **Hidden entries must not leak** into sitemap, generateStaticParams, or index.
- **Empty optional fields** (no gallery, no visual, no stack) must render nothing, not
  empty containers.
- **No em dashes** anywhere in copy or code (project style rule).

## Out of scope / later

- Real screenshots for chiggyOS, Anlyst, Generate, Bagel Cafe (image slots ready;
  Chirag drops files in `public/images/work/` later).
- Per-project OG images (use the site default `og.png` for now).
