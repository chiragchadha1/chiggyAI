import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

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
  openGraph: {
    title: "Chirag Chadha | Software Engineer, Founder, DJ",
    description:
      "Software engineer at HubSpot, founder of Chiggy AI, and DJ based in New York City. Building developer tools, AI systems, and spinning house music.",
    url: "https://chiggy.ai",
    siteName: "Chirag Chadha",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chirag Chadha | Software Engineer, Founder, DJ",
    description:
      "Software engineer at HubSpot, founder of Chiggy AI, and DJ based in New York City.",
    creator: "@chiggyio",
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
      "Developer Tools",
      "TypeScript",
      "Next.js",
      "AI Agents",
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
      </body>
    </html>
  );
}
