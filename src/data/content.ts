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
export type CaseStudyKind = "project" | "experience";
export type VisualKey = "memory-layers" | "presolve-timeline";

export interface Metric {
  value: string;
  label: string;
  sub?: string;
}

export interface CaseStudySection {
  heading: string;
  body: string[];
}

export interface Photo {
  src: string;
  alt: string;
  size?: "wide" | "tall";
}

export interface CaseStudy {
  slug: string;
  title: string;
  kind: CaseStudyKind;
  tagline: string;
  role?: string;
  org?: string;
  when?: string;
  status?: Status;
  metrics: Metric[];
  sections: CaseStudySection[];
  stack?: string[];
  links: RepoLink[];
  gallery?: Photo[];
  visual?: VisualKey;
  /**
   * When true the entry is excluded from the homepage, sitemap, and static
   * generation, and its route returns 404. Flip to remove a project from the
   * public site in one line.
   */
  hidden?: boolean;
}

export const CASE_STUDIES: CaseStudy[] = [
  // ── Experience ──────────────────────────────────────────────
  {
    slug: "hubspot",
    title: "HubSpot",
    kind: "experience",
    org: "HubSpot",
    role: "Software Engineer, Developer Experience",
    when: "2024 –",
    status: "active",
    tagline:
      "Developer tools used by 4,000+ developers every week, and the MCP server that grew the community 425%.",
    metrics: [
      { value: "+425%", label: "quarterly active developers", sub: "346 to 1,817, 72% week-4 retention" },
      { value: "4,000+", label: "developers every week" },
      { value: "97%", label: "config success rate", sub: "up from 65% on the legacy flow" },
      { value: "161", label: "files in the logging refactor" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "HubSpot's developer platform is built and extended through the command line. As AI coding agents took off, developers were spread across Claude Code, Cursor, Codex, Gemini, and Windsurf, and none of them could talk to HubSpot. The tooling also carried years of debt: an insecure config format, inconsistent logging, and onboarding flows that quietly failed for a third of new developers.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "I started as a co-op and converted to full-time on the Developer Experience team. My biggest win was an MCP server that lets agents drive the HubSpot platform directly, plus integrations shipping it across five editors and agents.",
          "Alongside it I championed a config overhaul that replaced the insecure hubspot.yml with a structured settings model, designed the core logging abstraction touching 161 files, and built the release management CLI commands that replaced the deprecated deploy path.",
        ],
      },
      {
        heading: "Impact",
        body: [
          "The MCP server grew the developer community from 346 to 1,817 quarterly active developers, a 425% jump with 72% week-4 retention. The config overhaul moved first-run success from 65% to 97%. Tooling I own ships to more than 4,000 developers every week.",
        ],
      },
    ],
    stack: ["TypeScript", "Node", "React Ink", "MCP"],
    links: [
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
    slug: "chiggy-ai",
    title: "Chiggy AI",
    kind: "experience",
    org: "Chiggy AI",
    role: "Founder",
    when: "2017 –",
    status: "active",
    tagline:
      "An AI-forward software and design studio. 50+ client engagements, started as DEFYE in a high-school bedroom.",
    metrics: [
      { value: "50+", label: "client engagements" },
      { value: "~$25k", label: "earned as DEFYE" },
      { value: "2017", label: "year it started" },
    ],
    sections: [
      {
        heading: "The origin",
        body: [
          "I started DEFYE in September 2017, in high school, designing logos and profile pictures. A client wanted a promo video, so I taught myself After Effects, then Cinema 4D, then the full Adobe suite, all before Figma existed. Web design came last, and by the end it was a full creative shop run mostly solo because the work was better when I owned it end to end.",
        ],
      },
      {
        heading: "What it became",
        body: [
          "DEFYE earned around $25k across 50+ clients through college. After graduating I folded its spirit into Chiggy AI Inc, the same muscle of full-ownership client work with an AI-era framing: full-stack products and custom agentic tooling for founders and small businesses, from websites and branding to motion graphics and video.",
        ],
      },
    ],
    stack: ["Next.js", "After Effects", "Cinema 4D", "Adobe Suite"],
    links: [{ name: "defye", link: "https://defye.us" }],
  },
  {
    slug: "anlyst",
    title: "Anlyst",
    kind: "experience",
    org: "Anlyst",
    role: "Co-founder & CTO",
    when: "2024 – 2025",
    status: "completed",
    tagline:
      "Consumer AI fighting decision fatigue with stateful agents that actually remember you.",
    metrics: [
      { value: "200+", label: "waitlist sign-ups" },
      { value: "3+", label: "VC conversations" },
      { value: "4", label: "health data integrations" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Most AI assistants forget you the moment a session ends. Anlyst was a bet that decision fatigue gets solved by agents with persistent, personal context, not by another stateless chatbot.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "As CTO of a two-person founding team I architected a three-layer Vault, Mirror, and Persona system for personalized stateful agents with persistent contextual memory. The MVP pulled real signal from Whoop, Apple Health, Google Calendar, and MyFitnessPal.",
        ],
      },
      {
        heading: "Impact",
        body: [
          "The launch drove 200+ waitlist sign-ups and 3+ VC conversations before I moved to full-time engineering at HubSpot. The memory thesis stuck with me and became the seed for chiggyOS.",
        ],
      },
    ],
    stack: ["TypeScript", "Stateful agents", "Health APIs"],
    links: [],
  },
  {
    slug: "generate",
    title: "Generate",
    kind: "experience",
    org: "Generate",
    role: "Engagement Director, Software Lead, Content Lead",
    when: "2022 – 2025",
    status: "completed",
    tagline:
      "Northeastern's student-led product studio. Ran programming for 160+ students and shipped a social app.",
    metrics: [
      { value: "160+", label: "students in the org" },
      { value: "300+", label: "Showcase attendees" },
      { value: "103K+", label: "campaign impressions" },
    ],
    sections: [
      {
        heading: "What I did",
        body: [
          "Generate is Northeastern's student-led product development studio. I oversaw programming for an organization of 160+ students across three roles.",
          "I shipped Couplet, a social networking mobile app, with a 15-person cross-functional team, presenting to 300+ Showcase attendees. As content lead I drove 103K+ impressions through a rebranding campaign.",
        ],
      },
    ],
    stack: ["React Native", "Cross-functional teams"],
    links: [
      { name: "generate", link: "https://generatenu.com" },
      { name: "couplet", github: "https://github.com/generatenu/couplet" },
    ],
  },

  // ── Projects ────────────────────────────────────────────────
  {
    slug: "chiggyos",
    title: "chiggyOS",
    kind: "project",
    role: "Personal infrastructure",
    when: "2026 –",
    status: "building",
    tagline:
      "An AI-native operating system for my life. A second brain that actually remembers what I told it last week.",
    metrics: [
      { value: "5", label: "layers of memory" },
      { value: "daily", label: "journal + transcript ingest" },
      { value: "live", label: "demoed in real interviews" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "AI models change constantly, but my context shouldn't have to. I wanted a foundational infrastructure layer for my life that I own, where I can plug and play whatever model I use and never lose what I have already taught it.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "chiggyOS runs on Obsidian and Claude Code, modeling human memory across five layers: procedural rules, semantic knowledge, episodic journals, a working-memory crash buffer, and an identity layer.",
          "Every day it ingests my journal entries, meeting transcripts, and voice notes, then synthesizes them into a searchable, interconnected wiki. An autonomous agent runs it on a server, handling email, tasks, and calendar.",
        ],
      },
      {
        heading: "Impact",
        body: [
          "It is the system I use every day, and it became a live conversation piece in interviews. I have installed and debugged the agent on screen mid-interview, with it pulling my own context out of the vault in real time, something no static demo could replicate.",
        ],
      },
    ],
    stack: ["Obsidian", "Claude Code", "Markdown", "Cron"],
    visual: "memory-layers",
    links: [],
  },
  {
    slug: "bagel-cafe",
    title: "Howard Beach Bagel Cafe",
    kind: "project",
    role: "Design + build",
    when: "2026",
    status: "building",
    tagline:
      "A full-stack site for my favorite bagel spot in NYC. Totally unbiased.",
    metrics: [
      { value: "1st", label: "paid freelance project" },
      { value: "100%", label: "agentic build", sub: "Claude Code, end to end" },
      { value: "live", label: "shipped on Vercel" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Customers kept finding outdated photos and old menus scattered across the web, which created real confusion about what the shop actually serves. The store needed one source of truth it controlled.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "A Next.js, React, and Framer Motion site designed and built end to end with agentic development workflows: a homepage with hero, auto-scrolling photos, an about section, and a catering CTA, a full daily menu page with search, and a catering page with packages and pricing. Every order button routes to ChowNow, and the whole thing is mobile responsive on Vercel.",
        ],
      },
      {
        heading: "Why it matters",
        body: [
          "It is my first paid freelance project after years of doing free digital work for the shop, and the first time the family business has a website that stays current.",
        ],
      },
    ],
    stack: ["Next.js", "React", "Framer Motion", "Vercel"],
    links: [],
    gallery: [],
  },
  {
    slug: "seated",
    title: "Seated",
    kind: "project",
    role: "Prototype",
    when: "2026",
    status: "completed",
    tagline:
      "A real-time booking engine for impossible-to-get NYC restaurant tables. Built it, shipped it, shut it down.",
    metrics: [
      { value: "<2s", label: "from drop to booked" },
      { value: "50+", label: "people in my DMs overnight" },
      { value: "1 week", label: "from prototype to paying customers" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "The best tables in NYC open and vanish in seconds. I wanted to learn to code something genuinely hard, so I started building a bot that could grab them the instant they dropped.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "It started as a slow browser-automation script. The competitive drops demanded speed, so I reverse-engineered the booking flow into an API-first tool and added a pre-solve trick borrowed from sneaker bots: prep the slow verification step a minute ahead of the drop, cache the result, then fire the booking the instant the table opened. That took bookings down to under two seconds from drop time.",
          "Around the engine I built a real dashboard: login, customer profiles, request management, and Stripe authorization holds that only charge on a successful booking.",
        ],
      },
      {
        heading: "What happened",
        body: [
          "One friend's Instagram story brought 50+ people into my DMs overnight, and I had paying customers within the week. Instant product-market fit.",
        ],
      },
      {
        heading: "Lessons",
        body: [
          "The platform risk caught up with me, so I shut it down while it was still working. The build proved I could ship something people wanted fast. The shutdown taught me the harder lesson: some things you build in private, and knowing when to walk away is its own skill.",
        ],
      },
    ],
    stack: ["TypeScript", "Playwright", "REST", "Stripe", "Supabase"],
    visual: "presolve-timeline",
    links: [],
    // Seated's technical content describes booking-automation techniques that
    // run against a third-party platform's terms of service. Set `hidden: true`
    // to pull it from the public site instantly if that ever becomes a concern.
    hidden: false,
  },
];

// ── Helpers ────────────────────────────────────────────────────
export const visibleCaseStudies = (): CaseStudy[] =>
  CASE_STUDIES.filter((c) => !c.hidden);

export const projects = (): CaseStudy[] =>
  visibleCaseStudies().filter((c) => c.kind === "project");

export const experience = (): CaseStudy[] =>
  visibleCaseStudies().filter((c) => c.kind === "experience");

export const allSlugs = (): string[] =>
  visibleCaseStudies().map((c) => c.slug);

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  CASE_STUDIES.find((c) => c.slug === slug && !c.hidden);

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
