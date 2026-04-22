import type { PortableTextBlock, PortableTextObject } from "sanity";
export type Post = {
  _id: string;
  _createdAt: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
git?: string;
link?:string;
  image?: {
    asset: {
      url: string;
      metadata?: any;
    };
    alt: string;
    caption?: string;
  };

  video?: string;

  body: (PortableTextBlock | PortableTextObject)[];

  categories: {
    _id: string;
    title: string;
    slug: string;
  }[];

  tags: {
    _id: string;
    title: string;
  }[];

  featured: boolean;

  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
};
type ProjectStatus = "completed" | "in-progress" | "concept";
export type Project = {
  id: string;
  title: string;
  description: string;
  longDesc: string;
  image?: string;
  videoUrl?: string;
  skills: string[];
  liveUrl?: string;
  githubUrl?: string;
  icon?: string;
  category?: string;
  timeline?: {
    duration?: string;
    startDate?: string;
    endDate?: string;
  };

  modal?: boolean;
  featured?: boolean;
  status: ProjectStatus;
  categories?: string[];
  tags: string[];

  details?: {
    overview?: string;
    challenges?: string;
    solutions?: string;
    results?: string;
    features?: string[];
  };

  content?: PortableTextBlock[];
};

/**
 * types/PostPreview.ts
 *
 * Lightweight shapes for queries that don't fetch the full Post document.
 *
 *  PostPreview  — used by getPosts()        (index / card listings)
 *  RelatedPost  — used by getRelatedPosts() (sidebar / related section)
 *
 * Import in BlogPostPage.tsx:
 *   import type { RelatedPost } from "@/types/PostPreview";
 *
 * Import in queries.ts:
 *   import { RelatedPost, PostPreview } from "@/types/PostPreview";
 */

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

export type Category = {
  _id: string;
  title: string;
  slug: string;
};

export type Tag = {
  _id: string;
  title: string;
};

export type ImageAsset = {
  url: string;
  metadata?: Record<string, unknown>;
};

export type PostImage = {
  asset: ImageAsset;
  alt: string;
  caption?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// POST PREVIEW  (used on index / blog listing page)
// Matches the getPosts() projection — no body, no _createdAt
// ─────────────────────────────────────────────────────────────────────────────

export type PostPreview = {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  featured: boolean;
  image?: PostImage;
  video?: string;
  categories: Category[];
  tags: Tag[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// RELATED POST  (used in BlogPostPage relatedPosts section)
// Matches the getRelatedPosts() projection — minimal fields + computed readTime
// ─────────────────────────────────────────────────────────────────────────────

export type RelatedPost = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  image?: {
    asset: { url: string };
    alt: string;
  };
  categories: Category[];
  readTime?: number;
};
