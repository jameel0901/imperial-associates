import type { MetadataRoute } from "next";
import { SERVICE_SLUGS } from "@/lib/services-detail";

const siteUrl = "https://www.imperialassociates.co.in";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...SERVICE_SLUGS.map((slug) => ({
      url: `${siteUrl}/services/${slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

