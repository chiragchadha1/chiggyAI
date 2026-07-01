import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CommandMenu } from "@/components/command-menu";
import { HintBar } from "@/components/hint-bar";
import { ConsoleSignature } from "@/components/console-signature";
import { TerminalDialog } from "@/components/terminal";
import { projects, experience } from "@/content/work";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#151310" },
  ],
};

/** Runs before paint so the saved theme never flashes. */
const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})()`;

export const metadata: Metadata = {
  title: "Chirag Chadha | Founding Engineer, Builder, DJ in New York",
  description:
    "Chirag Chadha is a founding engineer and builder based in New York City. Previously at HubSpot (Developer Experience). Builds developer tools, AI agents, and side projects.",
  metadataBase: new URL("https://chiggy.ai"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Chirag Chadha",
    "software engineer",
    "full-stack engineer",
    "founding engineer",
    "developer tools",
    "developer experience",
    "AI engineer",
    "AI agents",
    "agentic software",
    "AI-native developer tools",
    "Model Context Protocol",
    "MCP",
    "TypeScript",
    "React",
    "Next.js",
    "New York",
    "NYC",
    "HubSpot",
    "Chiggy AI",
  ],
  openGraph: {
    title: "Chirag Chadha | Founding Engineer, Builder, DJ",
    description:
      "Founding engineer and builder based in New York City. Previously at HubSpot (Developer Experience). Developer tools, AI agents, and side projects.",
    url: "https://chiggy.ai",
    siteName: "Chirag Chadha",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Chirag Chadha - Software Engineer, Founder, DJ in New York",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chirag Chadha | Founding Engineer, Builder, DJ",
    description:
      "Founding engineer and builder based in New York City. Previously at HubSpot. Developer tools, AI agents, and side projects.",
    creator: "@chiggyio",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://chiggy.ai/#person",
    name: "Chirag Chadha",
    givenName: "Chirag",
    familyName: "Chadha",
    alternateName: ["Chirag K Chadha", "chiggy", "chiggyio"],
    url: "https://chiggy.ai",
    email: "hi@chiggy.ai",
    jobTitle: "Founding Applied AI Product Engineer",
    description:
      "New York-based founding engineer at Spur, previously at HubSpot (Developer Experience). Builds developer tools, AI agents, and side projects.",
    worksFor: {
      "@type": "Organization",
      name: "Spur",
      url: "https://spurtest.com",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Northeastern University",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "New York",
      addressRegion: "NY",
      addressCountry: "US",
    },
    sameAs: [
      "https://x.com/chiggyio",
      "https://github.com/chiragchadha1",
      "https://linkedin.com/in/chiragkchadha",
      "https://instagram.com/chiragcchadha",
      "https://instagram.com/chiggylifts",
      "https://tiktok.com/@chiragcchadha",
      "https://beliapp.com/app/chirag",
    ],
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Software Engineer",
        skills: "TypeScript, React, Next.js, Node.js, AI agents, Model Context Protocol, developer tools, developer experience",
      },
      {
        "@type": "Occupation",
        name: "Founder",
        skills: "AI-native products, rapid prototyping, full-stack product development, automation",
      },
    ],
    knowsLanguage: ["en"],
    seeks: "",
    knowsAbout: [
      "Software Engineering",
      "Full-Stack Development",
      "Developer Tools",
      "Developer Experience",
      "Command Line Tools",
      "Model Context Protocol",
      "AI Agents",
      "Agentic AI",
      "AI-Native Developer Tools",
      "LLM Applications",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "React",
      "React Native",
      "Next.js",
      "Tailwind CSS",
      "Rapid Prototyping",
      "Startups",
      "DJing",
      "Electronic Dance Music",
      "Powerlifting",
    ],
  };
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Chiggy AI",
    url: "https://chiggy.ai",
    founder: {
      "@type": "Person",
      name: "Chirag Chadha",
      url: "https://chiggy.ai",
    },
    description:
      "Chiggy AI is Chirag Chadha's software and design studio. Full-stack products, automation, and developer tooling.",
  };
  const chiggyOsSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "chiggyOS",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web, macOS, iOS",
    url: "https://chiggy.ai/work/chiggyos",
    author: {
      "@type": "Person",
      name: "Chirag Chadha",
      url: "https://chiggy.ai",
    },
    description:
      "chiggyOS is Chirag Chadha's personal agent operating system built on Obsidian, plain-text memory, Claude Code, cron, Telegram, and human-in-the-loop workflows.",
    keywords:
      "AI agents, personal knowledge management, Obsidian, agent workflows, second brain, MCP, AI-native tooling",
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://chiggy.ai/#website",
    name: "Chirag Chadha",
    alternateName: "chiggy.ai",
    url: "https://chiggy.ai",
    publisher: { "@id": "https://chiggy.ai/#person" },
  };

  const schemas = [personSchema, organizationSchema, chiggyOsSchema, websiteSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`${schema["@type"]}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${hanken.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <JsonLd />
      </head>
      <body className="min-h-full font-[family-name:var(--font-hanken)]">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
        <HintBar />
        <CommandMenu />
        <TerminalDialog
          items={[...experience(), ...projects()].map(({ meta }) => ({
            slug: meta.slug,
            title: meta.title,
            kind: meta.kind,
            tagline: meta.tagline,
          }))}
        />
        <ConsoleSignature />
        <Analytics />
      </body>
    </html>
  );
}
