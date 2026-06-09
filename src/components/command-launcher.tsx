"use client";

import { useEffect, useState } from "react";

/** Floating pill that opens the command palette. Shows the platform-correct shortcut. */
export function CommandLauncher() {
  const [mac, setMac] = useState(true);

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);

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
