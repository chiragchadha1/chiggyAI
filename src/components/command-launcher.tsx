"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};
const isMacSnapshot = () =>
  /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
const isMacServerSnapshot = () => true;

/** Floating pill that opens the command palette. Shows the platform-correct shortcut. */
export function CommandLauncher() {
  const mac = useSyncExternalStore(noopSubscribe, isMacSnapshot, isMacServerSnapshot);

  return (
    <button
      type="button"
      className="cmdk-launcher"
      aria-label="Open command palette"
      onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
    >
      <span className="cmdk-launcher-dot" />
      <span>Navigate</span>
      <kbd className="cmdk-launcher-kbd">{mac ? "⌘" : "Ctrl"} K</kbd>
    </button>
  );
}
