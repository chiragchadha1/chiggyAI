import type { MetadataRoute } from "next";
import { visibleSlugs } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: "https://chiggy.ai",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...visibleSlugs().map((slug) => ({
      url: `https://chiggy.ai/work/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
