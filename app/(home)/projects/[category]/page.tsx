import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { client } from "@/sanity/lib/client";
import {
  CATEGORY_PAGE_QUERY,
  CATEGORY_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import CategoryPage from "@/components/pages/projects/Categorypage";
import {
  getCategoryTheme,
  type CategoryPageData,
} from "@/components/pages/projects/components/categoryTheme";


const SITE_URL = "https://chrisnortonjr.com";

type Props = {
  // Next 15: params is a Promise. On Next 14 the await is harmless.
  params: Promise<{ category: string }>;
};

/** Deduped per request, so metadata + page share one fetch. */
const getCategory = cache((slug: string) =>
  client.fetch<CategoryPageData | null>(
    CATEGORY_PAGE_QUERY,
    { category: slug },
    { next: { revalidate: 60 } },
  ),
);

export const revalidate = 60;

/** Pre-build every category that has projects. New ones render on demand. */
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(CATEGORY_SLUGS_QUERY);
  return slugs.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const data = await getCategory(category);
  if (!data) return {};

  const description =
    data.description?.trim() ||
    getCategoryTheme(data.slug).tagline ||
    `${data.title} projects by Chris Norton Jr.`;
  const title = `${data.title} Projects | Chris Norton Jr.`;
  const ogImage = data.heroImage?.url
    ? `${data.heroImage.url}?w=1200&h=630&fit=crop&auto=format`
    : getCategoryTheme(data.slug).heroSrc;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${data.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/projects/${data.slug}`,
      images: ogImage
        ? [
            {
              url: ogImage,
              alt: data.heroImage?.alt ?? `${data.title} projects`,
            },
          ]
        : undefined,
    },
  };
}

export default async function Page({ params }: Props) {
  const { category } = await params;
  const data = await getCategory(category);
  if (!data) notFound();

  // Breadcrumb + collection structured data for search results
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Projects",
            item: `${SITE_URL}/projects`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: data.title,
            item: `${SITE_URL}/projects/${data.slug}`,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: `${data.title} Projects`,
        url: `${SITE_URL}/projects/${data.slug}`,
        hasPart: data.projects.map((p) => ({
          "@type": "CreativeWork",
          name: p.title,
          url: `${SITE_URL}/projects/${data.slug}/${p.slug}`,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <CategoryPage data={data} />
    </>
  );
}
