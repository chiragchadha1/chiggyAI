import { SiteHeader } from "@/components/site-header";
import { MetricStrip } from "@/components/metric-strip";
import { RepoLinks } from "@/components/repo-links";
import { PhotoGallery } from "@/components/photo-lightbox";
import type { CaseStudyMeta } from "@/content/work/types";

/**
 * Chrome around an MDX case study body: anchored back-header, morphing title, tagline,
 * meta line, metric strip, the body, then stack chips, links, and an optional gallery.
 */
export function CaseStudyShell({
  meta,
  children,
}: {
  meta: CaseStudyMeta;
  children: React.ReactNode;
}) {
  const metaLine = [meta.role ?? meta.org, meta.when].filter(Boolean).join(" · ");

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 md:py-24 text-[15px] leading-relaxed">
      <SiteHeader compact />

      <header className="cs-header">
        <div className="flex items-baseline gap-2.5 flex-wrap">
          <h1
            className="cs-title"
            style={{ viewTransitionName: `work-${meta.slug}` }}
          >
            {meta.title}
          </h1>
          {meta.status && (
            <span className={`project-badge project-badge-${meta.status}`}>
              {meta.status}
            </span>
          )}
        </div>
        <p className="cs-tagline">{meta.tagline}</p>
        {metaLine && <p className="cs-meta">{metaLine}</p>}
      </header>

      <MetricStrip metrics={meta.metrics} />

      <article className="cs-body">{children}</article>

      {meta.stack && meta.stack.length > 0 && (
        <div className="cs-stack">
          {meta.stack.map((s) => (
            <span key={s} className="cs-chip">
              {s}
            </span>
          ))}
        </div>
      )}

      {meta.links.length > 0 && (
        <div className="cs-links">
          <RepoLinks repos={meta.links} />
        </div>
      )}

      {meta.gallery && meta.gallery.length > 0 && (
        <div className="gallery-wrap">
          <PhotoGallery photos={meta.gallery} />
        </div>
      )}

      <footer className="cs-footer">
        {/* Intentional plain <a> for native cross-document view transition (see SiteHeader). */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" className="inline-link">
          &larr; back to home
        </a>
      </footer>
    </main>
  );
}
