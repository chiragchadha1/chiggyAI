import type { VisualKey } from "@/data/content";
import { MemoryLayers } from "./diagrams/memory-layers";
import { PresolveTimeline } from "./diagrams/presolve-timeline";

const MAP: Record<VisualKey, React.ComponentType> = {
  "memory-layers": MemoryLayers,
  "presolve-timeline": PresolveTimeline,
};

/** Renders a named, hand-built SVG diagram. Usage in MDX: <Diagram name="memory-layers" /> */
export function Diagram({ name }: { name: VisualKey }) {
  const Cmp = MAP[name];
  if (!Cmp) return null;
  return (
    <div className="cs-diagram">
      <Cmp />
    </div>
  );
}
