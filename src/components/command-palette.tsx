"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  group: string;
  /** Internal path (hard nav, preserves view transition), external URL, or action. */
  href?: string;
  external?: boolean;
  action?: "copy-email" | "open-terminal";
  keywords?: string;
}

export function CommandPalette({
  items,
  email,
}: {
  items: CommandItem[];
  email: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      `${it.label} ${it.group} ${it.keywords ?? ""}`.toLowerCase().includes(q)
    );
  }, [items, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const run = useCallback(
    (item: CommandItem | undefined) => {
      if (!item) return;
      if (item.action === "copy-email") {
        navigator.clipboard?.writeText(email).then(
          () => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          },
          () => {}
        );
        return;
      }
      if (item.action === "open-terminal") {
        close();
        window.dispatchEvent(new Event("open-terminal"));
        return;
      }
      if (!item.href) return;
      if (item.external) {
        window.open(item.href, "_blank", "noopener,noreferrer");
        close();
      } else {
        // Hard navigation so the native cross-document view transition fires.
        window.location.href = item.href;
      }
    },
    [email, close]
  );

  // Global open shortcut: Cmd/Ctrl+K, or "/" when not typing in a field.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        close();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Listen for a custom event so any "press ⌘K" button can open it.
  useEffect(() => {
    function openHandler() {
      setOpen(true);
    }
    window.addEventListener("open-command-palette", openHandler);
    return () => window.removeEventListener("open-command-palette", openHandler);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onListKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        run(filtered[active]);
      }
    },
    [filtered, active, run]
  );

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  return (
    <div className="cmdk-overlay" onClick={close} role="presentation">
      <div
        className="cmdk-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onListKey}
      >
        <input
          ref={inputRef}
          className="cmdk-input"
          placeholder="Jump to a project, copy email, open a link..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
        />
        <div className="cmdk-list" ref={listRef}>
          {filtered.length === 0 && (
            <div className="cmdk-empty">No matches</div>
          )}
          {filtered.map((item, i) => {
            const showGroup = i === 0 || filtered[i - 1].group !== item.group;
            return (
              <div key={item.id}>
                {showGroup && <div className="cmdk-group">{item.group}</div>}
                <button
                  type="button"
                  data-idx={i}
                  className={`cmdk-item${i === active ? " cmdk-item-active" : ""}`}
                  onMouseMove={() => setActive(i)}
                  onClick={() => run(item)}
                >
                  <span className="cmdk-item-label">
                    {item.action === "copy-email" && copied ? "Copied!" : item.label}
                  </span>
                  {item.hint && <span className="cmdk-item-hint">{item.hint}</span>}
                  {item.external && <span className="cmdk-item-arrow">&#8599;</span>}
                </button>
              </div>
            );
          })}
        </div>
        <div className="cmdk-footer">
          <span><kbd className="cmdk-kbd">&#8593;</kbd><kbd className="cmdk-kbd">&#8595;</kbd> navigate</span>
          <span><kbd className="cmdk-kbd">&#8629;</kbd> select</span>
          <span><kbd className="cmdk-kbd">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
