import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "404 | Chirag Chadha",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="cs-page mx-auto px-6 py-16 md:py-24" id="main-content">
      <SiteHeader compact />
      <div className="nf-block">
        <p className="nf-prompt">
          <span className="nf-arrow">➜</span> <span className="nf-tilde">~</span> cd{" "}
          /this-page
        </p>
        <p className="nf-error">cd: no such file or directory</p>
        <h1 className="nf-title">404</h1>
        <p className="nf-body">
          This path does not exist. The good stuff is back on the{" "}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- hard nav keeps the native view transition */}
          <a href="/" className="inline-link">
            homepage
          </a>
          , or press <kbd className="hint-kbd">⌘ K</kbd> to jump anywhere.
        </p>
      </div>
    </main>
  );
}
