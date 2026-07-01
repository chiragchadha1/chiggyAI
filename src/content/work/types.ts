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
  /** Sort order within its section (experience or projects). */
  order: number;
  metrics: Metric[];
  stack?: string[];
  links: RepoLink[];
  gallery?: Photo[];
  visual?: VisualKey;
  /**
   * When true: excluded from the homepage, sitemap, and static generation, and the route
   * returns 404. One-line kill switch (used for Seated's TOS-sensitive content).
   */
  hidden?: boolean;
  /**
   * When true: appears on the homepage but doesn't link to a detail page.
   * Used for roles that haven't started yet (no case study content to show).
   */
  noDetailPage?: boolean;
}
