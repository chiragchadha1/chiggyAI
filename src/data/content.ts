export const LINKS = [
  { label: "X", href: "https://x.com/chiggyio" },
  { label: "GitHub", href: "https://github.com/chiragchadha1" },
  { label: "LinkedIn", href: "https://linkedin.com/in/chiragkchadha" },
  { label: "Email", href: "mailto:hi@chiggy.ai" },
  { label: "Resume", href: "/chirag-chadha-resume.pdf" },
] as const;

// ── Shared primitives ───────────────────────────────────────────
// Case study data lives in src/content/work/*.mdx (typed `meta` export), aggregated by
// src/content/work/index.ts. These primitives are imported by that content layer.

export interface RepoLink {
  name: string;
  npm?: string;
  github?: string;
  link?: string;
}

export type Status = "building" | "completed" | "active";
export type VisualKey =
  | "memory-layers"
  | "presolve-timeline"
  | "agent-stack"
  | "vault-mirror-persona"
  | "atlas-loop"
  | "craft-timeline";

export interface Metric {
  value: string;
  label: string;
  sub?: string;
}

export interface Photo {
  src: string;
  alt: string;
  size?: "wide" | "tall";
}

export const PHOTOS: Photo[] = [
  { src: "dj-set-light-trails.webp", alt: "Chirag Chadha DJing with long exposure light trails", size: "wide" },
  { src: "santorini-portrait.webp", alt: "Chirag Chadha in Santorini, Greece" },
  { src: "fushimi-inari-torii-gates.webp", alt: "Fushimi Inari torii gates in Kyoto, Japan", size: "tall" },
  { src: "emirates-first-class.webp", alt: "Emirates first class cabin" },
  { src: "graduation-cap-toss.webp", alt: "Chirag Chadha tossing graduation cap at Northeastern University", size: "tall" },
  { src: "polignano-a-mare-portrait.webp", alt: "Chirag Chadha in Polignano a Mare, Italy" },
  { src: "amalfi-coast.webp", alt: "Positano from the sea on the Amalfi Coast, Italy" },
  { src: "vinyl-collection.webp", alt: "Vinyl record collection and coffee table books" },
  { src: "sf-chinatown-lanterns.webp", alt: "Red lanterns in San Francisco Chinatown" },
  { src: "belem-tower-sunset.webp", alt: "Belem Tower at sunset in Lisbon, Portugal", size: "tall" },
  { src: "miami-street-portrait.webp", alt: "Chirag Chadha on a street in Miami, Florida" },
  { src: "lisbon-rooftops-sunset.webp", alt: "Lisbon rooftops at sunset, Portugal" },
  { src: "cabo-resort-pool-night.webp", alt: "Resort pool at night in Cabo San Lucas, Mexico" },
  { src: "venice-bridge-of-sighs.webp", alt: "View from the Bridge of Sighs in Venice, Italy" },
];

export const PLAYLISTS = [
  {
    name: "house aux",
    href: "https://open.spotify.com/playlist/0Jy7Q34JzARlSV4eqB4fcT",
  },
  {
    name: "groovy summer",
    href: "https://open.spotify.com/playlist/6lMhyv8MQXXDJYzmGQLtgS",
  },
  {
    name: "brain tingling tunes",
    href: "https://open.spotify.com/playlist/0c8LuY9yAZDub8vROARt15",
  },
  {
    name: "if i owned a coffee shop",
    href: "https://open.spotify.com/playlist/1mypUUjRkhPmWb2TxN1BXX",
  },
] as const;
