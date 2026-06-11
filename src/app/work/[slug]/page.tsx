import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCaseStudy, visibleSlugs } from "@/content/work";
import { CaseStudyShell } from "@/components/case-study/shell";

export const dynamicParams = false;

export function generateStaticParams() {
  return visibleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const title = `${cs.meta.title} | Chirag Chadha`;
  const description = cs.meta.tagline;
  const url = `/work/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

function CaseStudyJsonLd({ slug }: { slug: string }) {
  const cs = getCaseStudy(slug);
  if (!cs) return null;
  const { meta } = cs;
  const isSoftware = meta.links.some((l) => l.github);
  const schema = {
    "@context": "https://schema.org",
    "@type": isSoftware ? "SoftwareSourceCode" : "CreativeWork",
    name: meta.title,
    headline: meta.title,
    abstract: meta.tagline,
    url: `https://chiggy.ai/work/${slug}`,
    author: {
      "@type": "Person",
      name: "Chirag Chadha",
      url: "https://chiggy.ai",
    },
    ...(meta.stack ? { keywords: meta.stack.join(", ") } : {}),
    ...(isSoftware
      ? { codeRepository: meta.links.find((l) => l.github)?.github }
      : {}),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  const { Body, meta } = cs;
  return (
    <>
      <CaseStudyJsonLd slug={slug} />
      <CaseStudyShell meta={meta}>
        <Body />
      </CaseStudyShell>
    </>
  );
}
