"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};
const isMacSnapshot = () =>
  /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
const isMacServerSnapshot = () => true;

interface Hint {
  label: string;
  kbd?: string;
  mono?: boolean;
  action: "palette" | "terminal";
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/**
 * Floating bottom pill: opens the command palette and quietly rotates hints for the
 * site's hidden surfaces (the terminal, easter eggs). The theme toggle lives beside it.
 */
export function HintBar() {
  const mac = useSyncExternalStore(noopSubscribe, isMacSnapshot, isMacServerSnapshot);
  const [hints, setHints] = useState<Hint[]>([{ label: "Navigate", kbd: "K", action: "palette" }]);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  // discover page surfaces + current theme after mount (deferred a frame so the
  // effect body stays free of synchronous setState)
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const found: Hint[] = [{ label: "Navigate", kbd: "K", action: "palette" }];
      if (document.querySelector(".terminal")) {
        found.push({ label: "Try the terminal", action: "terminal" });
        found.push({ label: "sudo hire-me", mono: true, action: "terminal" });
      }
      setHints(found);
      setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // rotate hints; respect reduced motion and hover
  useEffect(() => {
    if (hints.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setIdx((i) => (i + 1) % hints.length), 5000);
    return () => window.clearInterval(t);
  }, [hints, paused]);

  const hint = hints[idx % hints.length];

  function runHint() {
    if (hint.action === "terminal") {
      const term = document.querySelector<HTMLElement>(".terminal");
      const input = document.querySelector<HTMLInputElement>(".term-input");
      term?.scrollIntoView({ block: "center", behavior: "smooth" });
      window.setTimeout(() => input?.focus({ preventScroll: true }), 450);
    } else {
      window.dispatchEvent(new Event("open-command-palette"));
    }
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  }

  return (
    <div
      className="hint-bar"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button
        type="button"
        className="hint-pill"
        aria-label={hint.action === "palette" ? "Open command palette" : "Jump to the terminal"}
        onClick={runHint}
      >
        <span className="hint-dot" />
        <span key={idx} className={`hint-label${hint.mono ? " hint-label-mono" : ""}`}>
          {hint.label}
        </span>
        {hint.kbd && (
          <kbd className="hint-kbd">
            {mac ? "⌘" : "Ctrl"} {hint.kbd}
          </kbd>
        )}
      </button>
      <button
        type="button"
        className="hint-theme"
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        onClick={toggleTheme}
      >
        {theme === null ? <MoonIcon /> : theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
}
