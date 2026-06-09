import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { CommandMenu } from "@/components/command-menu";
import { CommandLauncher } from "@/components/command-launcher";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chirag Chadha | Software Engineer, Founder, DJ in New York",
  description:
    "Chirag Chadha is a software engineer at HubSpot, founder of Chiggy AI, and DJ based in New York City. Building developer tools, AI systems, and spinning house music.",
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
    title: "Chirag Chadha | Software Engineer, Founder, DJ",
    description:
      "Software engineer at HubSpot, founder of Chiggy AI, and DJ based in New York City. Building developer tools, AI systems, and spinning house music.",
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
    title: "Chirag Chadha | Software Engineer, Founder, DJ",
    description:
      "Software engineer at HubSpot, founder of Chiggy AI, and DJ based in New York City.",
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
    name: "Chirag Chadha",
    url: "https://chiggy.ai",
    email: "hi@chiggy.ai",
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "HubSpot",
      url: "https://hubspot.com",
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
    ],
    knowsAbout: [
      "Software Engineering",
      "Full-Stack Development",
      "Developer Tools",
      "Developer Experience",
      "Command Line Tools",
      "Model Context Protocol",
      "AI Agents",
      "Agentic AI",
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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${hanken.variable} h-full`}>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full font-[family-name:var(--font-hanken)]">
        {children}
        <CommandLauncher />
        <CommandMenu />
      </body>
    </html>
  );
}
