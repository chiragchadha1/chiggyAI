import { ArrowRight } from "@/components/icons";
import type { CaseStudyMeta } from "@/content/work/types";

/**
 * Homepage row linking to a case study. Plain <a> (hard navigation) so the browser's
 * native cross-document View Transition fires; the title carries a matching
 * `viewTransitionName` so it morphs into the detail page heading.
 */
export function CaseStudyLink({ meta }: { meta: CaseStudyMeta }) {
  return (
    <a href={`/work/${meta.slug}`} className="project-row cs-row">
      <div className="flex items-baseline gap-2.5 flex-wrap">
        <h3
          className="project-name"
          style={{ viewTransitionName: `work-${meta.slug}` }}
        >
          {meta.title}
        </h3>
        {meta.status && (
          <span className={`project-badge project-badge-${meta.status}`}>
            {meta.status}
          </span>
        )}
        <span className="cs-row-cue" aria-hidden="true">
          case study
          <ArrowRight />
        </span>
      </div>
      <p className="cs-row-tagline">{meta.tagline}</p>
    </a>
  );
}
