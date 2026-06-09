import { Logo } from "@/components/logo";
import { ArrowLeft } from "@/components/icons";

/**
 * Shared name + logo cluster, anchored for cross-document view transitions so it stays
 * pinned while page content morphs underneath it. `compact` renders the back-aware variant
 * used on case study pages.
 */
export function SiteHeader({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      // Intentional plain <a>: a hard navigation triggers the browser's native
      // cross-document View Transition (title morph + anchored header). next/link soft
      // navigation would bypass it.
      // eslint-disable-next-line @next/next/no-html-link-for-pages
      <a href="/" className="site-header site-header-back">
        <span className="site-header-arrow" aria-hidden="true">
          <ArrowLeft />
        </span>
        <Logo />
        <span className="site-header-name">Chirag Chadha</span>
      </a>
    );
  }

  return (
    <div className="site-header flex items-center gap-3">
      <Logo />
      <h1 className="text-xl font-semibold tracking-tight">Chirag Chadha</h1>
    </div>
  );
}
