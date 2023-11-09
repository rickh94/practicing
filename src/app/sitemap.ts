import { type MetadataRoute } from "next";
import { env } from "~/env.mjs";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${env.SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${env.SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${env.SITE_URL}/practice/random-spots`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${env.SITE_URL}/practice/repeat`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${env.SITE_URL}/practice/starting-point`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
