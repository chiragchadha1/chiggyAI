"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Metric } from "@/data/content";

interface ParsedValue {
  prefix: string;
  num: number;
  suffix: string;
  grouped: boolean;
  decimals: number;
}

/** Split "4,000+" into prefix/number/suffix so the number can count up. */
function parseMetricValue(value: string): ParsedValue | null {
  const m = value.match(/^([^0-9]*)([0-9][0-9,]*\.?[0-9]*)(.*)$/);
  if (!m) return null;
  const raw = m[2];
  const num = parseFloat(raw.replace(/,/g, ""));
  if (!isFinite(num)) return null;
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  return { prefix: m[1], num, suffix: m[3], grouped: raw.includes(","), decimals };
}

function formatParsed(p: ParsedValue, n: number) {
  const body = p.grouped
    ? n.toLocaleString("en-US", {
        minimumFractionDigits: p.decimals,
        maximumFractionDigits: p.decimals,
      })
    : n.toFixed(p.decimals);
  return `${p.prefix}${body}${p.suffix}`;
}

/**
 * Metric value that counts up once it scrolls into view. Server-renders the final
 * value (SEO and no-JS safe); the count-up only runs client-side with motion allowed.
 */
function MetricValue({ value, animate }: { value: string; animate: boolean }) {
  const parsed = useMemo(() => parseMetricValue(value), [value]);
  const [display, setDisplay] = useState(value);
  const ran = useRef(false);

  useEffect(() => {
    if (!animate || !parsed || ran.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ran.current = true;
    let raf = 0;
    const duration = 900;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(formatParsed(parsed, parsed.num * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, parsed]);

  return <span className="metric-value">{display}</span>;
}

export function MetricStrip({ metrics }: { metrics: Metric[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("metric-strip-in");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (metrics.length === 0) return null;

  return (
    <div ref={ref} className={`metric-strip${visible ? " metric-strip-in" : ""}`}>
      {metrics.map((m, i) => (
        <div
          key={m.label}
          className={`metric${visible ? " metric-visible" : ""}`}
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          <MetricValue value={m.value} animate={visible} />
          <span className="metric-label">{m.label}</span>
          {m.sub && <span className="metric-sub">{m.sub}</span>}
        </div>
      ))}
    </div>
  );
}
