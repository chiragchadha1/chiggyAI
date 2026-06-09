import { ArrowRight } from "@/components/icons";
import type { CaseStudyMeta } from "@/content/work/types";

/**
 * Homepage row linking to a case study. Plain <a> (hard navigation) so the browser's
 * native cross-document View Transition fires; the title carries a matching
 * `viewTransitionName` so it morphs into the detail page heading.
 */
export function CaseStudyLink({ meta }: { meta: CaseStudyMeta }) {
  const headline = meta.metrics[0];
  return (
    <a href={`/work/${meta.slug}`} className="project-row cs-row">
      <div className="cs-row-main">
        <span className="cs-row-mono" aria-hidden="true">
          {meta.title.charAt(0)}
        </span>
        <div className="cs-row-text">
          <div className="cs-row-head">
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
          </div>
          <p className="cs-row-tagline">{meta.tagline}</p>
        </div>
      </div>
      <div className="cs-row-aside">
        {headline && (
          <span className="cs-row-metric">
            <strong>{headline.value}</strong> {headline.label}
          </span>
        )}
        <span className="cs-row-cue">
          case study
          <ArrowRight />
        </span>
      </div>
    </a>
  );
}
