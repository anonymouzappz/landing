import type { MetadataRoute } from "next";

const siteUrl = "https://remoteforge.net";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/early-bird/success",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}