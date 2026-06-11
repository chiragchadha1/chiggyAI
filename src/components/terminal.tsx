"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface TerminalWorkItem {
  slug: string;
  title: string;
  kind: "experience" | "project";
  tagline: string;
}

interface Line {
  id: number;
  kind: "cmd" | "out";
  node: React.ReactNode;
}

const COMMANDS = [
  "help",
  "whoami",
  "work",
  "open",
  "stack",
  "now",
  "contact",
  "resume",
  "clear",
] as const;

/**
 * A small working shell, opened as a popup from the launcher, the hint bar,
 * the command palette, or Ctrl+` (VS Code muscle memory). I build CLI tooling
 * for a living, so the site gets a real one: command history, tab completion,
 * and a few easter eggs. The work list comes from the real content layer.
 * Session state survives close/reopen because the component stays mounted.
 */
export function TerminalDialog({ items }: { items: TerminalWorkItem[] }) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  // global openers: custom event + Ctrl/Cmd+backtick
  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("open-terminal", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("open-terminal", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // focus the prompt and lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = "";
    };
  }, [open]);

  const push = useCallback((kind: Line["kind"], node: React.ReactNode) => {
    setLines((prev) => [...prev, { id: nextId.current++, kind, node }]);
  }, []);

  // keep the latest output in view
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      push("cmd", cmd);
      if (!cmd) return;
      setHistory((h) => [cmd, ...h]);
      setHistIdx(-1);

      const [name, ...args] = cmd.split(/\s+/);
      const arg = args.join(" ");

      switch (name.toLowerCase()) {
        case "help":
          push(
            "out",
            <>
              <span className="term-row"><span className="term-key">help</span>this menu</span>
              <span className="term-row"><span className="term-key">whoami</span>who is this guy</span>
              <span className="term-row"><span className="term-key">work</span>everything shipped</span>
              <span className="term-row"><span className="term-key">open &lt;slug&gt;</span>jump into a case study</span>
              <span className="term-row"><span className="term-key">stack</span>what I build with</span>
              <span className="term-row"><span className="term-key">now</span>what I am up to</span>
              <span className="term-row"><span className="term-key">contact</span>get in touch</span>
              <span className="term-row"><span className="term-key">resume</span>the formal version</span>
              <span className="term-row"><span className="term-key">clear</span>wipe the screen</span>
            </>
          );
          break;
        case "whoami":
          push(
            "out",
            <>Chirag Chadha. Software engineer at HubSpot (Developer Experience), founder of
            Chiggy AI, based in NYC. I build developer tools and the agents that use them.</>
          );
          break;
        case "work":
        case "ls":
          push(
            "out",
            <>
              <span className="term-dim">experience/</span>
              {items.filter((i) => i.kind === "experience").map((i) => (
                <span key={i.slug} className="term-row">
                  <span className="term-key">{i.slug}</span>
                  {i.tagline}
                </span>
              ))}
              <span className="term-dim">projects/</span>
              {items.filter((i) => i.kind === "project").map((i) => (
                <span key={i.slug} className="term-row">
                  <span className="term-key">{i.slug}</span>
                  {i.tagline}
                </span>
              ))}
              <span className="term-dim">hint: open {items[0]?.slug}</span>
            </>
          );
          break;
        case "open": {
          const item = items.find((i) => i.slug === arg.toLowerCase());
          if (!item) {
            push("out", <>no case study named &quot;{arg || "?"}&quot;. try <span className="term-key-inline">work</span> to list them.</>);
            break;
          }
          push("out", <>opening {item.slug}…</>);
          // hard navigation so the native view transition fires
          window.setTimeout(() => {
            window.location.href = `/work/${item.slug}`;
          }, 350);
          break;
        }
        case "stack":
          push(
            "out",
            <>TypeScript · React · Next.js · Node · React Ink · MCP · Claude Code · Tailwind ·
            Supabase · Playwright</>
          );
          break;
        case "now":
          push(
            "out",
            <>
              <span className="term-row"><span className="term-dim">→</span>driving the Agent First CLI direction at HubSpot</span>
              <span className="term-row"><span className="term-dim">→</span>building chiggyOS, my personal agent operating system</span>
              <span className="term-row"><span className="term-dim">→</span>recovering from my first USAPL powerlifting meet (May 2026)</span>
              <span className="term-row"><span className="term-dim">→</span>open to new opportunities, in person or hybrid in NYC</span>
            </>
          );
          break;
        case "contact":
          push(
            "out",
            <>
              <span className="term-row"><span className="term-key">email</span><a href="mailto:hi@chiggy.ai">hi@chiggy.ai</a></span>
              <span className="term-row"><span className="term-key">x</span><a href="https://x.com/chiggyio" target="_blank" rel="noreferrer">@chiggyio</a></span>
              <span className="term-row"><span className="term-key">github</span><a href="https://github.com/chiragchadha1" target="_blank" rel="noreferrer">chiragchadha1</a></span>
              <span className="term-row"><span className="term-key">linkedin</span><a href="https://linkedin.com/in/chiragkchadha" target="_blank" rel="noreferrer">chiragkchadha</a></span>
            </>
          );
          break;
        case "resume":
          push("out", <>opening resume.pdf…</>);
          window.open("/chirag-chadha-resume.pdf", "_blank", "noreferrer");
          break;
        case "clear":
          setLines([]);
          break;
        case "sudo":
          if (arg.toLowerCase() === "hire-me") {
            push(
              "out",
              <>
                ✓ access granted. email <a href="mailto:hi@chiggy.ai">hi@chiggy.ai</a> and
                tell me you found the terminal.
              </>
            );
          } else {
            push("out", <>with great power… try <span className="term-key-inline">sudo hire-me</span></>);
          }
          break;
        case "hs":
          push("out", <>that one is my day job. try <span className="term-key-inline">open hubspot</span></>);
          break;
        case "vim":
        case "nvim":
        case "emacs":
          push("out", <>relax, this is a website. you are safe here.</>);
          break;
        case "cd":
          push("out", <>there is no escape. try <span className="term-key-inline">open &lt;slug&gt;</span></>);
          break;
        case "pwd":
          push("out", <>~/nyc</>);
          break;
        case "exit":
        case "q":
        case ":q":
          push("out", <>you can check out any time you like…</>);
          window.setTimeout(() => setOpen(false), 600);
          break;
        default:
          push(
            "out",
            <>command not found: {name}. try <span className="term-key-inline">help</span></>
          );
      }
    },
    [items, push]
  );

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      if (history[next] !== undefined) {
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      setHistIdx(next);
      setInput(next >= 0 ? history[next] : "");
    } else if (e.key === "Tab" && input.length > 0) {
      // only intercept Tab mid-command so keyboard users can still tab away
      e.preventDefault();
      const [head] = input.split(/\s+/);
      const match = COMMANDS.find((c) => c.startsWith(head.toLowerCase()));
      if (match && match !== head) setInput(match + (match === "open" ? " " : ""));
      else if (head.toLowerCase() === "open") {
        const partial = input.slice(5).trim();
        const slug = items.find((i) => i.slug.startsWith(partial));
        if (slug) setInput(`open ${slug.slug}`);
      }
    } else if (e.key === "c" && e.ctrlKey) {
      push("cmd", input + "^C");
      setInput("");
    }
  }

  if (!open) return null;

  return (
    <div className="terminal-overlay" onClick={() => setOpen(false)}>
      <div
        className="terminal"
        role="dialog"
        aria-modal="true"
        aria-label="Interactive terminal. Type help for available commands."
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
      >
        <div className="terminal-bar">
          <button
            type="button"
            className="terminal-dot terminal-dot-close"
            aria-label="Close terminal"
            onClick={() => setOpen(false)}
          />
          <span className="terminal-dot" />
          <span className="terminal-dot" />
          <span className="terminal-bar-title">guest@chiggy.ai · zsh</span>
        </div>
        <div ref={bodyRef} className="terminal-body">
          <div className="term-out term-welcome">
            chiggyOS shell. type <span className="term-key-inline">help</span> to look around.
          </div>
          <div role="log" aria-live="polite">
            {lines.map((line) =>
              line.kind === "cmd" ? (
                <div key={line.id} className="term-cmd">
                  <span className="term-prompt">➜</span>
                  <span className="term-prompt-path">~</span>
                  {line.node}
                </div>
              ) : (
                <div key={line.id} className="term-out">
                  {line.node}
                </div>
              )
            )}
          </div>
          <div className="term-cmd term-input-row">
            <span className="term-prompt">➜</span>
            <span className="term-prompt-path">~</span>
            <input
              ref={inputRef}
              className="term-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              aria-label="Terminal command input"
              enterKeyHint="send"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Slim prompt-styled row in the About section that opens the terminal popup. */
export function TerminalLauncher() {
  return (
    <button
      type="button"
      className="terminal-launcher"
      onClick={() => window.dispatchEvent(new Event("open-terminal"))}
    >
      <span className="term-prompt">➜</span>
      <span className="term-prompt-path">~</span>
      <span className="terminal-launcher-text">open the terminal</span>
      <span className="terminal-launcher-cursor" aria-hidden="true" />
    </button>
  );
}
