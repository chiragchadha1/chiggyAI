export const LINKS = [
  { label: "X", href: "https://x.com/chiggyio" },
  { label: "GitHub", href: "https://github.com/chiragchadha1" },
  { label: "LinkedIn", href: "https://linkedin.com/in/chiragkchadha" },
  { label: "Email", href: "mailto:hi@chiggy.ai" },
  { label: "Resume", href: "/chirag-chadha-resume.pdf" },
] as const;

export interface RepoLink {
  name: string;
  npm?: string;
  github?: string;
}

export interface Project {
  name: string;
  description: string;
  repos: RepoLink[];
}

export const PROJECTS: Project[] = [
  {
    name: "HubSpot",
    description:
      "I work on HubSpot's developer tooling, primarily the CLI and the local development library. Over 4,000 developers use these tools every week. I've worked on the MCP server that brought us from 346 to 1,817 quarterly active developers, designed a new config system that replaced insecure YAML files with per-directory authentication (97% success rate, up from 65%), and migrated the entire logging layer across 161 files and 5,000 lines of code.",
    repos: [
      {
        name: "hubspot-cli",
        npm: "https://www.npmjs.com/package/@hubspot/cli",
        github: "https://github.com/HubSpot/hubspot-cli",
      },
      {
        name: "local-dev-lib",
        npm: "https://www.npmjs.com/package/@hubspot/local-dev-lib",
        github: "https://github.com/HubSpot/hubspot-local-dev-lib",
      },
    ],
  },
  {
    name: "chiggyOS",
    description:
      "An AI-native operating system for my life, built on Obsidian and Claude Code. It models human memory across five layers: procedural rules, semantic knowledge, episodic journals, a working-memory crash buffer, and an identity layer. Every day it ingests my journal entries, meeting transcripts, and voice notes, then synthesizes them into a searchable, interconnected wiki. Think of it as a second brain that actually remembers what I told it last week.",
    repos: [],
  },
  {
    name: "Seated",
    description:
      "A real-time booking system for impossible-to-get restaurant tables in NYC. Started as a learning project with Playwright, then rebuilt it as an API-first tool with captcha pre-solving that could secure a table in under two seconds. One friend's Instagram story brought 50+ people into my DMs overnight, and I had paying customers within the week. The platform risk caught up, so I shut it down while it was still working.",
    repos: [],
  },
  {
    name: "Anlyst",
    description:
      "An AI startup I co-founded as CTO. We were building personalized agents with persistent contextual memory, architected around a three-layer system for data aggregation, correlation, and proactive action. The MVP integrated Whoop, Apple Health, Google Calendar, and MyFitnessPal into a unified personal intelligence layer. We got to 200+ on the waitlist and had early VC conversations before we graduated and went our separate ways.",
    repos: [],
  },
  {
    name: "Howard Beach Bagel Cafe",
    description:
      "A full-stack website for my favorite bagel spot in NYC (totally unbiased). Designed and built end-to-end using agentic development workflows with Claude Code. Next.js, Framer Motion, and Vercel.",
    repos: [],
  },
  {
    name: "Chiggy AI",
    description:
      "My studio, originally called Defye. I started making logos and websites for people when I was 15. Over 8 years it grew into 50+ projects spanning branding, motion graphics, video production, advertising, and eventually full-stack software.",
    repos: [],
  },
];

export const EXPERIENCE = [
  {
    org: "HubSpot",
    role: "Software Engineer, Developer Experience",
    when: "2025 –",
  },
  { org: "Chiggy AI / Defye", role: "Founder", when: "2017 –" },
  { org: "Anlyst", role: "Co-founder & CTO", when: "2024 – 2025" },
  {
    org: "Generate",
    role: "Content Lead → Software Lead → Engagement Director",
    when: "2022 – 2025",
  },
  {
    org: "HubSpot",
    role: "Software Engineering Co-op",
    when: "2024",
  },
] as const;

export interface Photo {
  src: string;
  alt: string;
  size?: "wide" | "tall";
}

export const PHOTOS: Photo[] = [
  { src: "dj-set-light-trails.webp", alt: "Chirag Chadha DJing with long exposure light trails", size: "wide" },
  { src: "santorini-portrait.webp", alt: "Chirag Chadha in Santorini, Greece" },
  { src: "fushimi-inari-torii-gates.webp", alt: "Fushimi Inari torii gates in Kyoto, Japan", size: "tall" },
  { src: "pena-palace-sintra.webp", alt: "Pena Palace in Sintra, Portugal" },
  { src: "emirates-first-class.webp", alt: "Emirates first class cabin" },
  { src: "venice-bridge-of-sighs.webp", alt: "View from the Bridge of Sighs in Venice, Italy" },
  { src: "graduation-cap-toss.webp", alt: "Chirag Chadha tossing graduation cap at Northeastern University", size: "tall" },
  { src: "wagyu-beef.webp", alt: "Wagyu beef in Tokyo, Japan" },
  { src: "concert-blue-lights.webp", alt: "Music festival with blue industrial lighting", size: "tall" },
  { src: "polignano-a-mare-portrait.webp", alt: "Chirag Chadha in Polignano a Mare, Italy" },
  { src: "sagrada-familia-barcelona.webp", alt: "Sagrada Familia in Barcelona, Spain" },
  { src: "vinyl-collection.webp", alt: "Vinyl record collection and coffee table books" },
  { src: "cabo-resort-pool-night.webp", alt: "Resort pool at night in Cabo San Lucas, Mexico" },
  { src: "sf-chinatown-lanterns.webp", alt: "Red lanterns in San Francisco Chinatown" },
  { src: "belem-tower-sunset.webp", alt: "Belem Tower at sunset in Lisbon, Portugal", size: "tall" },
  { src: "amalfi-coast.webp", alt: "Positano from the sea on the Amalfi Coast, Italy" },
  { src: "dj-set-solo.webp", alt: "Chirag Chadha behind the decks DJing" },
  { src: "miami-street-portrait.webp", alt: "Chirag Chadha on a street in Miami, Florida" },
  { src: "lisbon-rooftops-sunset.webp", alt: "Lisbon rooftops at sunset, Portugal" },
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
