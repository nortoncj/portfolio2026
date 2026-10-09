import { client } from "@/sanity/lib/client";
import { SITEMAP_QUERY } from "@/sanity/lib/queries";
import { MetadataRoute } from "next";

const baseUrl = "https://chrisnortonjr.com";

export const revalidate = 3600;

type SitemapData = {
  categories: { slug: string; _updatedAt: string }[];
  projects: { category: string; slug: string; _updatedAt: string }[];
  posts: { slug: string; _updatedAt: string }[];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Only static routes here. Categories, projects and posts come from Sanity.
  const staticRoutes = ["/", "/about", "/projects", "/insights"];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  try {
    const { categories, projects, posts } =
      await client.fetch<SitemapData>(SITEMAP_QUERY);

    const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
      url: `${baseUrl}/projects/${c.slug}`,
      lastModified: new Date(c._updatedAt),
    }));

    const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
      url: `${baseUrl}/projects/${p.category}/${p.slug}`,
      lastModified: new Date(p._updatedAt),
    }));

    const insightRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/insights/${post.slug}`,
      lastModified: new Date(post._updatedAt),
    }));

    return [...staticPages, ...categoryRoutes, ...projectRoutes, ...insightRoutes];
  } catch (error) {
    console.error("Failed to generate sitemap:", error);
    return staticPages;
  }
}
