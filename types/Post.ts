import type { PortableTextBlock } from "sanity";
export type Post = {
  _id: string;
  _createdAt: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;

  image?: {
    asset: {
      url: string;
      metadata?: any;
    };
    alt: string;
    caption?: string;
  };

  video?: string;

  body: PortableTextBlock[];

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

export type Category = {
  _id: string;
  title: string;
  slug: string;
};

export type Tag = {
  _id: string;
  title: string;
};
