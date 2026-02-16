import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://daltonneely.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${siteUrl}/experience`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/education`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteUrl}/skills`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/projects`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/tools`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];
}
