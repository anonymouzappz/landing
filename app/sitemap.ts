import type { MetadataRoute } from "next";

const siteUrl = "https://remoteforge.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    "",
    "#vision",
    "#how",
    "#security",
    "#earlybird",
    "#pricing",
    "#download",
    "#faq",
    "/privacy",
    "/terms",
    "/download",
    "/early-bird/success",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}