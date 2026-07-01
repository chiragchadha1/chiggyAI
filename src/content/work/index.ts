import type { ComponentType } from "react";
import type { CaseStudyMeta } from "@/content/work/types";

import * as spur from "./spur.mdx";
import * as hubspot from "./hubspot.mdx";
import * as anlyst from "./anlyst.mdx";
import * as generate from "./generate.mdx";
import * as chiggyAi from "./chiggy-ai.mdx";
import * as chiggyos from "./chiggyos.mdx";
import * as bagelCafe from "./bagel-cafe.mdx";
import * as seated from "./seated.mdx";

export interface CaseStudyModule {
  meta: CaseStudyMeta;
  Body: ComponentType;
}

const modules = [spur, hubspot, anlyst, generate, chiggyAi, chiggyos, bagelCafe, seated] as const;

const ALL: CaseStudyModule[] = modules.map((m) => ({
  meta: m.meta as CaseStudyMeta,
  Body: m.default as ComponentType,
}));

// Build-time integrity guard. MDX files are not type-checked by tsc, so validate the
// shape of each `meta` here: a malformed case study fails the build loudly instead of
// rendering broken at runtime.
const seen = new Set<string>();
for (const { meta } of ALL) {
  const ctx = `case study "${meta?.slug ?? "<unknown>"}"`;
  if (!meta || typeof meta !== "object") throw new Error(`${ctx}: missing meta export`);
  for (const field of ["slug", "title", "tagline"] as const) {
    if (!meta[field]) throw new Error(`${ctx}: missing required field "${field}"`);
  }
  if (meta.kind !== "project" && meta.kind !== "experience") {
    throw new Error(`${ctx}: kind must be "project" or "experience"`);
  }
  if (typeof meta.order !== "number") throw new Error(`${ctx}: order must be a number`);
  if (!Array.isArray(meta.metrics)) throw new Error(`${ctx}: metrics must be an array`);
  if (!Array.isArray(meta.links)) throw new Error(`${ctx}: links must be an array`);
  if (seen.has(meta.slug)) throw new Error(`Duplicate case study slug: ${meta.slug}`);
  seen.add(meta.slug);
}

const bySection = (kind: CaseStudyMeta["kind"]): CaseStudyModule[] =>
  ALL.filter((m) => m.meta.kind === kind && !m.meta.hidden).sort(
    (a, b) => a.meta.order - b.meta.order
  );

export const allCaseStudies = (): CaseStudyModule[] => ALL.filter((m) => !m.meta.hidden);
export const projects = (): CaseStudyModule[] => bySection("project");
export const experience = (): CaseStudyModule[] => bySection("experience");
export const visibleSlugs = (): string[] =>
  allCaseStudies().filter((m) => !m.meta.noDetailPage).map((m) => m.meta.slug);
export const getCaseStudy = (slug: string): CaseStudyModule | undefined =>
  allCaseStudies().find((m) => m.meta.slug === slug && !m.meta.noDetailPage);
