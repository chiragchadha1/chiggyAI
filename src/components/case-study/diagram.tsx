import type { VisualKey } from "@/data/content";
import { Reveal } from "@/components/reveal";
import { MemoryLayers } from "./diagrams/memory-layers";
import { PresolveTimeline } from "./diagrams/presolve-timeline";
import { AgentStack } from "./diagrams/agent-stack";
import { VaultMirrorPersona } from "./diagrams/vault-mirror-persona";
import { AtlasLoop } from "./diagrams/atlas-loop";
import { CraftTimeline } from "./diagrams/craft-timeline";

const MAP: Record<VisualKey, React.ComponentType> = {
  "memory-layers": MemoryLayers,
  "presolve-timeline": PresolveTimeline,
  "agent-stack": AgentStack,
  "vault-mirror-persona": VaultMirrorPersona,
  "atlas-loop": AtlasLoop,
  "craft-timeline": CraftTimeline,
};

/**
 * Renders a named, hand-built SVG diagram. Usage in MDX: <Diagram name="memory-layers" />
 * Wrapped in Reveal so elements marked data-anim stagger in when scrolled into view.
 */
export function Diagram({ name }: { name: VisualKey }) {
  const Cmp = MAP[name];
  if (!Cmp) return null;
  return (
    <Reveal className="cs-diagram">
      <Cmp />
    </Reveal>
  );
}
