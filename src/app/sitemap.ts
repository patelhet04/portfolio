import type { MetadataRoute } from "next";
import { careerSpans } from "@/utils/experience";
import { site } from "@/utils/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    ...careerSpans.map((s) => ({ url: `${site.url}/experience/${s.slug}`, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
