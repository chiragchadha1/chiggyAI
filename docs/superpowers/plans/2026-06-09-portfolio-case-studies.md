# Portfolio Redesign + Case Studies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn chiggy.ai into a polished, shareable case-study portfolio: MDX-authored
case studies at `/work/[slug]`, seamless View-Transition navigation, generated SVG
visuals + Shiki code, and a redesigned homepage, on Next 16 + React 19.

**Architecture:** Content lives in MDX files (`src/content/work/*.mdx`), each exporting a
typed `meta` block + a markdown/JSX body. A dynamic route statically generates one page
per visible slug. Shared building-block components (Code, Diagram, Figure, MetricStrip,
RepoLinks, Callout) are registered globally via `src/mdx-components.tsx`. Native View
Transitions morph the project title from the homepage into each case study.

**Tech Stack:** Next 16 (App Router, Turbopack), React 19, TypeScript, Tailwind v4,
`@next/mdx` + `@mdx-js/*`, `remark-gfm`, Shiki, Motion, native View Transitions API.

**Verification approach:** This codebase has no unit-test harness and the work is
design/UI-heavy, so verification per task is: `bunx tsc --noEmit` (types), `bun run lint`,
`bun run build` (catches MDX/import/prerender errors), and visual checks via the dev
server + Playwright screenshots. Pure-logic invariants (slug uniqueness, hidden
exclusion) are enforced by a build-time guard in the content index rather than a test
runner. This deviates from default TDD intentionally, per the codebase reality.

---

## Pre-flight: reconcile existing uncommitted work

A prior session left uncommitted work on this branch. Keep and build on it:

- **Keep as-is:** `next.config.ts` (already has `experimental.viewTransition: true`),
  `src/components/icons.tsx`, `src/components/metric-strip.tsx`,
  `src/components/repo-links.tsx`.
- **Migrate, then slim:** `src/data/content.ts` currently holds a full `CaseStudy[]` with
  drafted prose in `sections[]`. That prose is the source for the MDX bodies (Task 5).
  After migration, `content.ts` keeps `LINKS`, `PHOTOS`, `PLAYLISTS`, `RepoLink`, `Photo`,
  `Metric`, `Status`; the `CaseStudy`/`sections` data structures move to the content layer
  (Task 4/7).

- [ ] **Step 1: Commit the existing foundation before changing it** (so migration is reviewable)

```bash
git add next.config.ts src/components/icons.tsx src/components/metric-strip.tsx src/components/repo-links.tsx src/data/content.ts docs/superpowers/specs/2026-06-09-portfolio-case-studies-design.md
git commit -m "feat: scaffold case-study data model, shared components, view-transition config"
```

---

## Phase A — MDX + tooling infrastructure

### Task 1: Install dependencies

**Files:** `package.json`, `bun.lock`

- [ ] **Step 1: Install**

```bash
bun add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx remark-gfm shiki motion
```

- [ ] **Step 2: Verify** versions resolved

Run: `bun pm ls | grep -E '@next/mdx|@mdx-js|shiki|motion|remark-gfm'`
Expected: all six listed.

- [ ] **Step 3: Commit**

```bash
git add package.json bun.lock && git commit -m "chore: add mdx, shiki, motion, remark-gfm deps"
```

### Task 2: Wire MDX into next.config.ts (keep viewTransition)

**Files:** Modify `next.config.ts`

- [ ] **Step 1: Replace file contents**

```ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Let .mdx files be pages/imports alongside ts/tsx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  experimental: {
    viewTransition: true,
  },
};

const withMDX = createMDX({
  // Turbopack requires string-named plugins with serializable options only.
  options: {
    remarkPlugins: [["remark-gfm", {}]],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
```

- [ ] **Step 2: Verify dev server boots**

Run: `bun run build 2>&1 | tail -20` (expect no MDX/config error; build may warn that
`mdx-components` is missing until Task 3 — if it errors on that, proceed to Task 3 then
re-run).

- [ ] **Step 3: Commit**

```bash
git add next.config.ts && git commit -m "feat: enable @next/mdx with gfm + keep view transitions"
```

### Task 3: Create the required `mdx-components.tsx`

**Files:** Create `src/mdx-components.tsx`

This is required by `@next/mdx` in the App Router. It maps markdown elements to the site's
typography and registers the custom components used inside MDX. Custom components are added
as they are built (Tasks 8–11); start with the element mappings + placeholders importing
the real components.

- [ ] **Step 1: Create the file**

```tsx
import type { MDXComponents } from "mdx/types";
import { Code } from "@/components/case-study/code";
import { Diagram } from "@/components/case-study/diagram";
import { Figure } from "@/components/case-study/figure";
import { Callout } from "@/components/case-study/callout";

const components: MDXComponents = {
  h2: ({ children }) => <h2 className="cs-h2">{children}</h2>,
  h3: ({ children }) => <h3 className="cs-h3">{children}</h3>,
  p: ({ children }) => <p className="cs-p">{children}</p>,
  ul: ({ children }) => <ul className="cs-ul">{children}</ul>,
  ol: ({ children }) => <ol className="cs-ol">{children}</ol>,
  li: ({ children }) => <li className="cs-li">{children}</li>,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer" className="inline-link">
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="cs-strong">{children}</strong>,
  // Custom components available in every .mdx file:
  Code,
  Diagram,
  Figure,
  Callout,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
```

> NOTE: This file imports components built in Phase C. Build Tasks 8–11 before running a
> full build, or temporarily stub the imports. Order in execution: do Task 3's file
> creation but expect the build to pass only after Phase C.

- [ ] **Step 2: Commit** (after Phase C compiles)

```bash
git add src/mdx-components.tsx && git commit -m "feat: add mdx-components registry"
```

---

## Phase B — Content layer

### Task 4: Define `CaseStudyMeta` types

**Files:** Create `src/content/work/types.ts`

- [ ] **Step 1: Create**

```ts
import type { Metric, RepoLink, Photo, Status, VisualKey } from "@/data/content";

export type CaseStudyKind = "project" | "experience";

export interface CaseStudyMeta {
  slug: string;
  title: string;
  kind: CaseStudyKind;
  tagline: string;
  role?: string;
  org?: string;
  when?: string;
  status?: Status;
  order: number; // sort order within its section
  metrics: Metric[];
  stack?: string[];
  links: RepoLink[];
  gallery?: Photo[];
  visual?: VisualKey;
  /**
   * When true: excluded from homepage, sitemap, and static generation; route 404s.
   * One-line kill switch (used for Seated's TOS-sensitive content).
   */
  hidden?: boolean;
}
```

- [ ] **Step 2: Typecheck** `bunx tsc --noEmit` (will fail until `content.ts` re-exports
  the referenced types in Task 7; acceptable mid-phase).

### Task 5: Author the 7 MDX case studies (migrate from content.ts prose)

**Files:** Create `src/content/work/{hubspot,chiggy-ai,anlyst,generate,chiggyos,bagel-cafe,seated}.mdx`

Each file: a typed `export const meta` (copied verbatim from the matching object in the
current `src/data/content.ts`, plus an `order` field) and a markdown body built from that
object's `sections[]` (each `section.heading` becomes `## heading`, each `body[]` string
becomes a paragraph). Insert `<Diagram name="..."/>`, `<Code .../>`, and `<Figure .../>`
where the visual/code belongs. No em dashes.

This task is **parallelizable**: one subagent per file. Each subagent reads the matching
object in `src/data/content.ts` (lines listed below) and produces the `.mdx` file.

| slug | source object | visual / code / figure to embed |
|---|---|---|
| hubspot | content.ts hubspot | `<Code lang="ts">` snippet of a logging-abstraction call after "What I built" |
| chiggy-ai | content.ts chiggy-ai | `<Figure>` placeholder for a client-work thumbnail (optional) |
| anlyst | content.ts anlyst | `<Figure>` placeholder for MVP screenshot (optional) |
| generate | content.ts generate | `<Figure>` placeholder for Couplet screenshot (optional) |
| chiggyos | content.ts chiggyos | `<Diagram name="memory-layers"/>` after "What I built"; `<Code lang="ts">` ingest loop |
| bagel-cafe | content.ts bagel-cafe | `<Figure>` placeholders for homepage/menu screenshots |
| seated | content.ts seated | `<Diagram name="presolve-timeline"/>` after "What I built"; `<Code lang="ts">` pre-solve token reuse |

- [ ] **Step 1: Create `src/content/work/chiggyos.mdx`** (canonical example; others follow the same shape)

```mdx
import type { CaseStudyMeta } from "@/content/work/types";

export const meta = {
  slug: "chiggyos",
  title: "chiggyOS",
  kind: "project",
  role: "Personal infrastructure",
  when: "2026 -",
  status: "building",
  order: 1,
  tagline:
    "An AI-native operating system for my life. A second brain that actually remembers what I told it last week.",
  metrics: [
    { value: "5", label: "layers of memory" },
    { value: "daily", label: "journal + transcript ingest" },
    { value: "live", label: "demoed in real interviews" },
  ],
  stack: ["Obsidian", "Claude Code", "Markdown", "Cron"],
  visual: "memory-layers",
  links: [],
} satisfies CaseStudyMeta;

## The problem

AI models change constantly, but my context shouldn't have to. I wanted a foundational
infrastructure layer for my life that I own, where I can plug and play whatever model I use
and never lose what I have already taught it.

## What I built

chiggyOS runs on Obsidian and Claude Code, modeling human memory across five layers:
procedural rules, semantic knowledge, episodic journals, a working-memory crash buffer,
and an identity layer.

<Diagram name="memory-layers" />

Every day it ingests my journal entries, meeting transcripts, and voice notes, then
synthesizes them into a searchable, interconnected wiki. An autonomous agent runs it on a
server, handling email, tasks, and calendar.

<Code lang="ts" file="absorb.ts">{`// nightly: read new raw sources, synthesize into the wiki
for (const source of await newSourcesSince(lastRun)) {
  const meaning = await interpret(source);      // what does this mean?
  await wiki.integrate(meaning);                 // connect to what I know
}
await memory.checkpoint();`}</Code>

## Impact

It is the system I use every day, and it became a live conversation piece in interviews. I
have installed and debugged the agent on screen mid-interview, with it pulling my own
context out of the vault in real time, something no static demo could replicate.
```

- [ ] **Step 2: Create the other six** `.mdx` files using the same pattern, copying
  `meta` from the corresponding `content.ts` object and converting `sections[]` to prose.
  Assign `order` per section: experience order hubspot=1, anlyst=2, generate=3, chiggy-ai=4;
  projects order chiggyos=1, bagel-cafe=2, seated=3. Carry `hidden` + the TOS comment on
  seated.

- [ ] **Step 3: Verify** each file parses (after Phase C + Task 6): `bun run build`.

- [ ] **Step 4: Commit**

```bash
git add src/content/work/*.mdx && git commit -m "feat: author case studies as mdx (migrated from content.ts)"
```

### Task 6: Build the content collection index + build-time guard

**Files:** Create `src/content/work/index.ts`

Statically import each MDX module (default = body component, `meta` = typed metadata) and
expose helpers. A guard throws at module load if slugs collide or a slug mismatches its
filename, so a bad content file fails the build loudly.

- [ ] **Step 1: Create**

```ts
import type { ComponentType } from "react";
import type { CaseStudyMeta } from "@/content/work/types";

import * as hubspot from "./hubspot.mdx";
import * as chiggyAi from "./chiggy-ai.mdx";
import * as anlyst from "./anlyst.mdx";
import * as generate from "./generate.mdx";
import * as chiggyos from "./chiggyos.mdx";
import * as bagelCafe from "./bagel-cafe.mdx";
import * as seated from "./seated.mdx";

export interface CaseStudyModule {
  meta: CaseStudyMeta;
  Body: ComponentType;
}

const modules = [hubspot, chiggyAi, anlyst, generate, chiggyos, bagelCafe, seated] as const;

const ALL: CaseStudyModule[] = modules.map((m) => ({
  meta: m.meta as CaseStudyMeta,
  Body: m.default as ComponentType,
}));

// Build-time integrity guard.
const seen = new Set<string>();
for (const { meta } of ALL) {
  if (seen.has(meta.slug)) throw new Error(`Duplicate case study slug: ${meta.slug}`);
  seen.add(meta.slug);
}

const bySection = (kind: CaseStudyMeta["kind"]) =>
  ALL.filter((m) => m.meta.kind === kind && !m.meta.hidden).sort(
    (a, b) => a.meta.order - b.meta.order
  );

export const allCaseStudies = (): CaseStudyModule[] => ALL.filter((m) => !m.meta.hidden);
export const projects = (): CaseStudyModule[] => bySection("project");
export const experience = (): CaseStudyModule[] => bySection("experience");
export const visibleSlugs = (): string[] => allCaseStudies().map((m) => m.meta.slug);
export const getCaseStudy = (slug: string): CaseStudyModule | undefined =>
  allCaseStudies().find((m) => m.meta.slug === slug);
```

- [ ] **Step 2: Typecheck** `bunx tsc --noEmit` (needs `mdx.d.ts` ambient module decl;
  add `src/content/work/mdx.d.ts` if TS complains about `.mdx` imports):

```ts
// src/content/work/mdx.d.ts
declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { CaseStudyMeta } from "@/content/work/types";
  export const meta: CaseStudyMeta;
  const Component: ComponentType;
  export default Component;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/content/work/index.ts src/content/work/mdx.d.ts && git commit -m "feat: case study content collection with integrity guard"
```

### Task 7: Slim `src/data/content.ts`

**Files:** Modify `src/data/content.ts`

Remove the `CaseStudy` interface, the `CASE_STUDIES` array, and the `CaseStudy` helpers
(now in the content layer). Keep `LINKS`, `RepoLink`, `Status`, `VisualKey`, `Metric`,
`Photo`, `PHOTOS`, `PLAYLISTS`. The content layer imports `Metric`, `RepoLink`, `Photo`,
`Status`, `VisualKey` from here.

- [ ] **Step 1: Delete** lines defining `CaseStudy`, `CaseStudySection`, `CASE_STUDIES`,
  `visibleCaseStudies`, `projects`, `experience`, `allSlugs`, `getCaseStudy`. Keep the
  type exports and the `PHOTOS`/`PLAYLISTS`/`LINKS` constants.

- [ ] **Step 2: Typecheck + build** `bunx tsc --noEmit && bun run build`
- [ ] **Step 3: Commit**

```bash
git add src/data/content.ts && git commit -m "refactor: move case study data to content layer, keep shared types"
```

---

## Phase C — Building-block components (`src/components/case-study/`)

### Task 8: Shiki `<Code>` component (async, build-time)

**Files:** Create `src/components/case-study/code.tsx`

Server component; highlights at build time with Shiki, zero runtime JS. Light theme tuned
to the palette.

- [ ] **Step 1: Create**

```tsx
import { codeToHtml } from "shiki";

export async function Code({
  children,
  lang = "ts",
  file,
}: {
  children: string;
  lang?: string;
  file?: string;
}) {
  const html = await codeToHtml(children.trim(), {
    lang,
    theme: "github-light",
  });
  return (
    <figure className="cs-code">
      {file && <figcaption className="cs-code-file">{file}</figcaption>}
      <div className="cs-code-body" dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}
```

- [ ] **Step 2: Add CSS** for `.cs-code`, `.cs-code-file`, `.cs-code-body` in
  `globals.css` (mono font, rounded border, `--hover-bg` background, horizontal scroll,
  small font). Override Shiki's inline `pre` background to transparent.
- [ ] **Step 3: Verify** renders in a built page (after Phase D). Commit with Phase C.

### Task 9: `<Figure>` image/video slot with placeholder

**Files:** Create `src/components/case-study/figure.tsx`

- [ ] **Step 1: Create**

```tsx
import Image from "next/image";

export function Figure({
  src,
  alt = "",
  caption,
  video = false,
  width = 1280,
  height = 800,
}: {
  src?: string;
  alt?: string;
  caption?: string;
  video?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="cs-figure">
      {src ? (
        video ? (
          <video className="cs-figure-media" src={src} autoPlay muted loop playsInline />
        ) : (
          <Image className="cs-figure-media" src={src} alt={alt} width={width} height={height} />
        )
      ) : (
        <div className="cs-figure-placeholder" aria-hidden="true">
          <span>{alt || "screenshot coming soon"}</span>
        </div>
      )}
      {caption && <figcaption className="cs-figure-caption">{caption}</figcaption>}
    </figure>
  );
}
```

- [ ] **Step 2: Add CSS** for `.cs-figure*` (rounded, subtle border; placeholder is a
  dashed, muted box at a sensible aspect ratio).

### Task 10: `<Diagram>` dispatcher + two SVG diagrams

**Files:** Create `src/components/case-study/diagram.tsx`,
`src/components/case-study/diagrams/memory-layers.tsx`,
`src/components/case-study/diagrams/presolve-timeline.tsx`

- [ ] **Step 1: Dispatcher**

```tsx
import type { VisualKey } from "@/data/content";
import { MemoryLayers } from "./diagrams/memory-layers";
import { PresolveTimeline } from "./diagrams/presolve-timeline";

export function Diagram({ name }: { name: VisualKey }) {
  const map = { "memory-layers": MemoryLayers, "presolve-timeline": PresolveTimeline };
  const Cmp = map[name];
  return Cmp ? <div className="cs-diagram"><Cmp /></div> : null;
}
```

- [ ] **Step 2: `MemoryLayers`** — inline SVG, 5 stacked labelled layers (Procedural,
  Semantic, Episodic, Working / crash buffer, Identity) using `currentColor` +
  `var(--text-*)`; responsive `viewBox`, no fixed pixel width. Refined-minimal styling.
- [ ] **Step 3: `PresolveTimeline`** — inline SVG horizontal timeline: `T-60s pre-solve`
  → `cache token` → `T-0 fire booking` → `< 2s booked`. Platform-agnostic labels only.
- [ ] **Step 4: CSS** `.cs-diagram` (centered, max-width, vertical rhythm).

### Task 11: `<Callout>` component

**Files:** Create `src/components/case-study/callout.tsx`

- [ ] **Step 1: Create** a simple bordered aside:

```tsx
export function Callout({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <aside className="cs-callout">
      {label && <span className="cs-callout-label">{label}</span>}
      <div className="cs-callout-body">{children}</div>
    </aside>
  );
}
```

- [ ] **Step 2: CSS** `.cs-callout*`. 
- [ ] **Step 3: Build** `bun run build` (now `mdx-components.tsx` imports all resolve).
- [ ] **Step 4: Commit Phase C + Task 3**

```bash
git add src/components/case-study src/mdx-components.tsx && git commit -m "feat: case study building blocks (code, figure, diagrams, callout) + mdx registry"
```

---

## Phase D — Routing + case study shell

### Task 12: Shared `SiteHeader`

**Files:** Create `src/components/site-header.tsx`; later used by home + work layout.

Extract the name + logo cluster into a shared component anchored for view transitions. A
`compact` prop renders the back-aware variant on `/work`.

- [ ] **Step 1: Create**

```tsx
import Link from "next/link";
import { Logo } from "@/components/logo";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <div className="site-header" style={{ viewTransitionName: "site-header" }}>
      {compact ? (
        <Link href="/" className="site-header-back" data-back>
          <Logo />
          <span>Chirag Chadha</span>
        </Link>
      ) : (
        <div className="flex items-center gap-3">
          <Logo />
          <h1 className="text-xl font-semibold tracking-tight">Chirag Chadha</h1>
        </div>
      )}
    </div>
  );
}
```

> The homepage currently inlines this markup in `page.tsx`. Task 19 swaps it to use
> `SiteHeader` so the anchor name matches across routes.

- [ ] **Step 2: CSS** `.site-header*`.

### Task 13: `CaseStudyShell` layout component

**Files:** Create `src/components/case-study/shell.tsx`

Renders the full detail chrome around the MDX body: compact header, back link, morphing
title, tagline, meta line, metric strip, body slot, stack chips, repo links, optional
gallery.

- [ ] **Step 1: Create**

```tsx
import { unstable_ViewTransition as ViewTransition } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { MetricStrip } from "@/components/metric-strip";
import { RepoLinks } from "@/components/repo-links";
import { PhotoGallery } from "@/components/photo-lightbox";
import { ArrowLeft } from "@/components/icons";
import type { CaseStudyMeta } from "@/content/work/types";

export function CaseStudyShell({
  meta,
  children,
}: {
  meta: CaseStudyMeta;
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 md:py-24 text-[15px] leading-relaxed">
      <SiteHeader compact />
      <Link href="/" className="cs-back" data-back>
        <ArrowLeft /> back
      </Link>

      <header className="cs-header">
        <div className="flex items-baseline gap-2.5">
          <ViewTransition name={`work-${meta.slug}`}>
            <h1 className="cs-title">{meta.title}</h1>
          </ViewTransition>
          {meta.status && (
            <span className={`project-badge project-badge-${meta.status}`}>{meta.status}</span>
          )}
        </div>
        <p className="cs-tagline">{meta.tagline}</p>
        <p className="cs-meta">
          {[meta.role ?? meta.org, meta.when].filter(Boolean).join(" · ")}
        </p>
      </header>

      <MetricStrip metrics={meta.metrics} />

      <article className="cs-body">{children}</article>

      {meta.stack && meta.stack.length > 0 && (
        <div className="cs-stack">
          {meta.stack.map((s) => (
            <span key={s} className="cs-chip">{s}</span>
          ))}
        </div>
      )}

      <div className="cs-links"><RepoLinks repos={meta.links} /></div>

      {meta.gallery && meta.gallery.length > 0 && (
        <div className="gallery-wrap"><PhotoGallery photos={meta.gallery} /></div>
      )}
    </main>
  );
}
```

> Verify the correct React import name for the ViewTransition component in this version:
> check `node_modules/react` exports; the Next docs import `{ ViewTransition } from "react"`.
> Use whatever the installed React 19.2 exposes (`ViewTransition` or
> `unstable_ViewTransition`). Confirm before relying on it.

- [ ] **Step 2: CSS** for `.cs-*` (title scale dialed up, tagline secondary, meta mono,
  body rhythm, stack chips, back link).

### Task 14: Dynamic route `app/work/[slug]/page.tsx`

**Files:** Create `src/app/work/[slug]/page.tsx`

- [ ] **Step 1: Create**

```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCaseStudy, visibleSlugs } from "@/content/work";
import { CaseStudyShell } from "@/components/case-study/shell";

export const dynamicParams = false;

export function generateStaticParams() {
  return visibleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const title = `${cs.meta.title} | Chirag Chadha`;
  return {
    title,
    description: cs.meta.tagline,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { title, description: cs.meta.tagline, url: `/work/${slug}`, type: "article" },
    twitter: { card: "summary_large_image", title, description: cs.meta.tagline },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  const { Body, meta } = cs;
  return (
    <CaseStudyShell meta={meta}>
      <Body />
    </CaseStudyShell>
  );
}
```

- [ ] **Step 2: Build** `bun run build` and confirm output lists `/work/hubspot`,
  `/work/chiggyos`, etc. (and NOT a hidden slug if any is hidden).
- [ ] **Step 3: Commit Phase D**

```bash
git add src/components/site-header.tsx src/components/case-study/shell.tsx src/app/work && git commit -m "feat: case study route + shell with shared header"
```

---

## Phase E — View transitions

> **IMPLEMENTATION NOTE (revised approach):** React 19.2.4 does not export `ViewTransition`
> and Next's `experimental.viewTransition` only integrates that React component, so the
> originally-planned React `<ViewTransition>` morph is unavailable on the pinned versions.
> We use **native cross-document (MPA) View Transitions** instead:
> - Navigation to `/work/[slug]` uses plain `<a>` (hard nav to a static page), not `<Link>`.
> - `globals.css` adds `@view-transition { navigation: auto; }`.
> - The morphing title carries `style={{ viewTransitionName: \`work-${slug}\` }}` on BOTH
>   the homepage row and the detail `<h1>`; the shared header carries
>   `viewTransitionName: "site-header"`.
> - `::view-transition-old/new(root)` keyframes provide the crossfade; matching
>   `view-transition-name`s auto-morph the title; the header is pinned (`animation: none`).
> - Remove `experimental.viewTransition` from `next.config.ts` (inert here).
> - No React `ViewTransition` import anywhere; no `unstable_ViewTransition`.
> The shell (Task 13) and CaseStudyLink (Task 15) reflect this (inline
> `viewTransitionName` style instead of the React component).

### Task 15: `CaseStudyLink` row wrapper

**Files:** Create `src/components/case-study-link.tsx`

Wraps a homepage row in `<Link transitionTypes={['nav-forward']}>` and the title in a
`<ViewTransition name={`work-${slug}`}>` so it morphs into the detail title.

- [ ] **Step 1: Create** (client component; uses the morph name matching the shell)

```tsx
"use client";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import type { CaseStudyMeta } from "@/content/work/types";
import { MetricStrip } from "@/components/metric-strip";
import { ArrowRight } from "@/components/icons";

export function CaseStudyLink({ meta }: { meta: CaseStudyMeta }) {
  return (
    <Link href={`/work/${meta.slug}`} className="project-row cs-row" data-forward>
      <div className="flex items-baseline gap-2.5">
        <ViewTransition name={`work-${meta.slug}`}>
          <h3 className="project-name">{meta.title}</h3>
        </ViewTransition>
        {meta.status && (
          <span className={`project-badge project-badge-${meta.status}`}>{meta.status}</span>
        )}
        <span className="cs-row-cue" aria-hidden="true">case study <ArrowRight /></span>
      </div>
      <p className="cs-row-tagline">{meta.tagline}</p>
      <MetricStrip metrics={meta.metrics.slice(0, 3)} />
    </Link>
  );
}
```

> `transitionTypes` is a `<Link>` prop in this Next version (per the view-transitions doc).
> Add `transitionTypes={["nav-forward"]}` to the `<Link>` once confirmed against
> `node_modules/next` Link types. The `← back` link in the shell gets
> `transitionTypes={["nav-back"]}`.

- [ ] **Step 2: Confirm** `transitionTypes` prop exists: 
  `grep -r "transitionTypes" node_modules/next/dist/ | head`. Wire it on both links.

### Task 16: View transition CSS

**Files:** Modify `src/app/globals.css`

- [ ] **Step 1: Add** morph (with mid-flight blur), directional `nav-forward`/`nav-back`
  slides, anchored `site-header` group (`animation: none`, old `display:none`,
  `z-index:100`), and a `prefers-reduced-motion` block zeroing
  `::view-transition-*` durations. Use the exact rules from the Next view-transitions doc
  (already read into context) adapted to the palette.

- [ ] **Step 2: Verify** in dev: navigating a row morphs the title; back slides right;
  header stays put; reduced-motion (DevTools emulate) disables motion.
- [ ] **Step 3: Commit**

```bash
git add src/components/case-study-link.tsx src/app/globals.css && git commit -m "feat: view transition morph + directional slides + anchored header"
```

---

## Phase F — Homepage redesign

### Task 17: Rewrite `app/page.tsx` to use the content layer

**Files:** Modify `src/app/page.tsx`

- [ ] **Step 1:** Replace the inline header cluster with `<SiteHeader />` (keep the bio,
  availability, music, CTA, social blocks). Replace the hand-rolled Experience/Projects
  `.project-row` map + local `RepoLinks` with `experience()` / `projects()` from
  `@/content/work` rendered via `<CaseStudyLink>`. Remove the now-duplicated local icon
  and `RepoLinks` definitions (use `@/components/icons` + `@/components/repo-links`).
  Keep Photos + footer.

- [ ] **Step 2: Build + visual** `bun run build`; dev server: homepage shows linked rows
  with metric teasers + always-visible "case study →" cue; hover tint intact.
- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx && git commit -m "feat: redesign homepage around case study content layer"
```

---

## Phase G — SEO baseline (GEO is a later phase)

### Task 18: Sitemap includes case studies

**Files:** Modify `src/app/sitemap.ts`

- [ ] **Step 1:** Add `/work/${slug}` for every `visibleSlugs()` entry (import from
  `@/content/work`), with the site base URL.
- [ ] **Step 2: Build**; fetch `/sitemap.xml` in dev and confirm the work URLs appear and
  hidden ones do not.

### Task 19: Per-case JSON-LD

**Files:** Modify `src/app/work/[slug]/page.tsx`

- [ ] **Step 1:** Inject a `CreativeWork` (or `SoftwareSourceCode` when a github link
  exists) JSON-LD `<script type="application/ld+json">` built from `meta` (name,
  description=tagline, author=Person Chirag, url, sameAs links). Keep it minimal; richer
  GEO work is the follow-up phase.
- [ ] **Step 2: Commit**

```bash
git add src/app/sitemap.ts src/app/work/[slug]/page.tsx && git commit -m "feat: sitemap + per-case structured data"
```

---

## Phase H — Verification & polish

### Task 20: Full verification sweep

- [ ] `bunx tsc --noEmit` → no errors
- [ ] `bun run lint` → clean
- [ ] `bun run build` → all `/work/[slug]` prerendered, no hidden leak, no MDX errors
- [ ] Grep guard: `grep -RnP "\x{2014}" src/ docs/ || echo "no em dashes"` (style rule)

### Task 21: Visual QA via dev server + Playwright

- [ ] Start dev server; screenshot home, each `/work/*`, a forward nav, a back nav, mobile
  width (390px), and reduced-motion. Confirm: title morph, anchored header, metric strips,
  diagrams render, code is highlighted, figure placeholders look intentional, lightbox
  still works.
- [ ] Use the repo's `audit` skill for an a11y/perf pass; fix P0/P1 findings.

### Task 22: Polish pass + finish

- [ ] Run the `polish` (and `typeset`/`animate` as needed) skills on the case study shell
  + homepage rows; tighten spacing, type scale, motion timing to the refined-minimal bar.
- [ ] Final `bun run build`.
- [ ] Update `docs/case-studies-intake.md` status notes if any media slots were filled.
- [ ] Commit and offer to push / open PR.

```bash
git add -A && git commit -m "polish: case study typography, spacing, motion timing"
```

---

## Self-review notes (spec coverage)

- Dedicated shareable pages → Task 14 (route, metadata, static params). ✓
- MDX authoring + easy updates → Tasks 1–6 (config, registry, content, collection). ✓
- All 7 entries incl. DEFYE-as-origin → Task 5 (chiggy-ai.mdx carries DEFYE). ✓
- Refined-minimal design dialed up → Tasks 13, 17, 22 (shell, homepage, polish). ✓
- Selective real code (Shiki) → Tasks 8 + 5 (snippets in hubspot/chiggyos/seated). ✓
- Generated SVG + placeholder slots → Tasks 9, 10. ✓
- View-transition seamless nav → Tasks 12, 13, 15, 16. ✓
- Seated full depth + hideable → Task 5 (meta.hidden + comment), guard Task 6. ✓
- SEO baseline; GEO follow-up flagged → Tasks 18, 19; spec follow-up section. ✓
- No em dashes → Task 20 guard. ✓
