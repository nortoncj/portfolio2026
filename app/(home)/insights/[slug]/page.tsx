/**
 * app/insights/[slug]/page.tsx
 *
 * Next.js 15 App Router — params is now a Promise.
 * You MUST await params before reading any property.
 * https://nextjs.org/docs/messages/sync-dynamic-apis
 */

// import BlogPostPage from "@/components/sections/blog/postPage";
import BlogPostPage from "@/components/sections/blog/blogPostPage";
import { getPost, getRelatedPosts } from "@/sanity/sanity-utils";
import type { Metadata } from "next";

import { notFound } from "next/navigation";

// ── Next.js 15: params is a Promise ────────────────────────────────────────
interface Props {
  params: Promise<{ slug: string }>;
}
export const revalidate = 3600; // cache 60s
// ── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ✅ await params first — required in Next.js 15+
  const { slug } = await params;

  const post = await getPost(slug).catch(() => null);
  if (!post) return {};

  return {
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
    openGraph: {
      title: post.seo?.title ?? post.title,
      description: post.seo?.description ?? post.excerpt,
      images: post.image?.asset?.url ? [post.image.asset.url] : [],
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo?.title ?? post.title,
      description: post.seo?.description ?? post.excerpt,
      images: post.image?.asset?.url ? [post.image.asset.url] : [],
    },
  };
}

// ── Page ────────────────────────────────────────────────────────────────────

export default async function Page({ params }: Props) {
  // ✅ await params first — required in Next.js 15+
  const { slug } = await params;

  const post = await getPost(slug).catch(() => null);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(
    post._id,
    post.categories[0]?.slug ?? "",
  ).catch(() => []);

  return <BlogPostPage post={post} relatedPosts={relatedPosts} />;
}
