"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
 * Metric value that counts up the first time it scrolls into view. Server-renders
 * the final value (SEO and no-JS safe); the count-up only runs client-side and
 * is skipped entirely under prefers-reduced-motion.
 */
export function MetricValue({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const parsed = useMemo(() => parseMetricValue(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed) return;
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || ran.current) return;
        ran.current = true;
        observer.disconnect();
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
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [parsed]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
