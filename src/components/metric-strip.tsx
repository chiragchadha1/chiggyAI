"use client";

import { useEffect, useRef, useState } from "react";
import { MetricValue } from "@/components/metric-value";
import type { Metric } from "@/data/content";

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
          <MetricValue value={m.value} className="metric-value" />
          <span className="metric-label">{m.label}</span>
          {m.sub && <span className="metric-sub">{m.sub}</span>}
        </div>
      ))}
    </div>
  );
}
