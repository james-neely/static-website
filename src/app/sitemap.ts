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
    {
      url: `${siteUrl}/tools/context-window-calculator`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/tools/text-counter`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/tools/port-generator`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/tools/uuid-generator`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/tools/password-generator`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/tools/string-generator`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/tools/random-name-generator`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/tools/url-encoder-decoder`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/tools/file-hash-verifier`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    { url: `${siteUrl}/useable-security`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];
}
