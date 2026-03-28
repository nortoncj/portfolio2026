import { getPosts } from "@/sanity/sanity-utils";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://chrisnortonjr.com";

  // Only static routes here
  const staticRoutes = [
    "/",
    "/projects/devops",
    "/projects/web",
    "/projects/marketing",
    "/projects/hardware",
    "/insights",
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  try {
    const posts = await getPosts();

    const insightRoutes: MetadataRoute.Sitemap = posts.map((post: any) => ({
      url: `${baseUrl}/insights/${post.slug}`,
      lastModified: new Date(
        post._updatedAt || post.updatedAt || post.publishedAt || Date.now(),
      ),
    }));

    return [...staticPages, ...insightRoutes];
  } catch (error) {
    console.error("Failed to generate sitemap:", error);
    return staticPages;
  }
}
