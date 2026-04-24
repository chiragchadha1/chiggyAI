"use client";

import { useState, useEffect, useCallback } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }, [email]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "c" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        copy();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [copy]);

  return (
    <button type="button" onClick={copy} className="copy-email">
      <span className={`copy-email-layer ${copied ? "copy-email-hidden" : ""}`}>
        {email}
        <kbd className="copy-email-kbd">C</kbd>
      </span>
      <span className={`copy-email-layer copy-email-abs ${copied ? "" : "copy-email-hidden"}`}>
        copied
      </span>
    </button>
  );
}
