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
  link?: string;
}

export type Status = "building" | "completed" | "active";

export interface Project {
  name: string;
  role?: string;
  when?: string;
  description: string;
  repos: RepoLink[];
  status?: Status;
}

export const PROJECTS: Project[] = [
  {
    name: "Seated",
    description:
      "A real-time booking system for impossible-to-get restaurant tables in NYC. Started as a learning project with Playwright, then rebuilt it as an API-first tool with captcha pre-solving that could secure a table in under two seconds. One friend's Instagram story brought 50+ people into my DMs overnight, and I had paying customers within the week. The platform risk caught up, so I shut it down while it was still working.",
    repos: [],
    status: "completed",
  },
  {
    name: "chiggyOS",
    description:
      "An AI-native operating system for my life, built on Obsidian and Claude Code. It models human memory across five layers: procedural rules, semantic knowledge, episodic journals, a working-memory crash buffer, and an identity layer. Every day it ingests my journal entries, meeting transcripts, and voice notes, then synthesizes them into a searchable, interconnected wiki. Think of it as a second brain that actually remembers what I told it last week.",
    repos: [],
    status: "building",
  },
  {
    name: "Howard Beach Bagel Cafe",
    description:
      "A full-stack website for my favorite bagel spot in NYC (totally unbiased). Designed and built end-to-end using agentic development workflows with Claude Code. Next.js, Framer Motion, and Vercel.",
    repos: [],
    status: "building",
  },
];

export interface Experience {
  org: string;
  role: string;
  when: string;
  description: string;
  repos: RepoLink[];
  link?: string;
  status?: Status;
}

export const EXPERIENCE: Experience[] = [
  {
    org: "HubSpot",
    role: "Software Engineer, Developer Experience",
    when: "2024 –",
    description:
      "I started as a co-op and came back full-time to build developer tools that over 4,000 developers use every week. My biggest win was the MCP server that grew our developer community from 346 to 1,817 quarterly active developers (+425% with 72% week-4 retention). I also shipped MCP integrations across Claude Code, Cursor, Codex, Gemini, and Windsurf, championed a config overhaul that reaches 97% success vs. 65% on the legacy flow, and designed the core logging abstraction across 161 files.",
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
    status: "active",
  },
  {
    org: "Chiggy AI",
    role: "Founder",
    when: "2017 –",
    description:
      "An AI-forward software and design studio shipping full-stack products and custom agentic tooling for founders and small businesses. I ran the agency as defye from 2017 to 2025, delivering 50+ client engagements across websites, logos, branding, motion graphics, video production, and advertising content.",
    repos: [
      {
        name: "defye",
        link: "https://defye.us",
      },
    ],
    status: "active",
  },
  {
    org: "Anlyst",
    role: "Co-founder & CTO",
    when: "2024 – 2025",
    description:
      "Co-founded a consumer AI platform tackling decision fatigue via personalized stateful agents with persistent contextual memory, architected around a three-layer Vault, Mirror, and Persona system. As CTO of a two-person founding team, launched an MVP integrating Whoop, Apple Health, Google Calendar, and MyFitnessPal, driving 200+ waitlist sign-ups and 3+ VC conversations before transitioning to full-time engineering at HubSpot.",
    repos: [],
    status: "completed",
  },
  {
    org: "Generate",
    role: "Engagement Director, Software Lead, Content Lead",
    when: "2022 – 2025",
    description:
      "Northeastern's student-led product development studio. I oversaw programming for an organization of 160+ students, shipped Couplet (a social networking mobile app) with a 15-person cross-functional team to 300+ Showcase attendees, and drove 103K+ impressions through a rebranding campaign.",
    repos: [
      {
        name: "generate",
        link: "https://generatenu.com",
      },
      {
        name: "couplet",
        github: "https://github.com/generatenu/couplet",
      },
    ],
    status: "completed",
  },
];

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
