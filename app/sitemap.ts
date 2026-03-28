
import { getPost, getPosts } from "@/sanity/sanity-utils";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://chrisnortonjr.com";

  const staticRoutes = [
    "/",
    "/projects/devops",
    "/projects/web",
    "/projects/marketing",
    "/projects/hardware",
    "/insights",
    "/insights/seo-optimizer",
    "/insights/lightweight-emails",
    "/insights/aws-devops",
    "/insights/my-first-iot-project",
    "/insights/windows-linux",
  ];

  

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  if (!res.ok) return [];


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
