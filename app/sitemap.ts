import type { MetadataRoute } from "next";
import { site, sitePages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...sitePages
      // /legal is set to noindex, so keep it out of the sitemap.
      .filter((p) => p.href !== "/legal")
      .map((p) => ({
        url: `${site.url}${p.href}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
