import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chirag Chadha",
  description:
    "Engineer. Founder. DJ. Lifter. Building things since 15.",
  openGraph: {
    title: "Chirag Chadha",
    description: "Engineer. Founder. DJ. Lifter. Building things since 15.",
    url: "https://chirag.nyc",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${hanken.variable} h-full`}>
      <body className="min-h-full font-[family-name:var(--font-hanken)]">
        {children}
      </body>
    </html>
  );
}
