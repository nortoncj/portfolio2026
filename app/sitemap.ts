import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://chrisnortonjr.com";

  const res = await fetch(`${baseUrl}/api/insights`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const posts = await res.json();

  const insightRoutes = posts.map((post: any) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(post.updatedAt),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
    },
    ...insightRoutes,
  ];
}
