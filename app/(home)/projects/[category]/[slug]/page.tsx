import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { cache } from "react";
import { client } from "@/sanity/lib/client";
import { PROJECT_PAGE_QUERY, PROJECT_PATHS_QUERY } from "@/sanity/lib/queries";
import ProjectPage from "@/components/pages/projects/ProjectPage";
import {
  projectHref,
  type ProjectPageData,
} from "@/components/pages/projects/components/categoryTheme";

const SITE_URL = "https://chrisnortonjr.com";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

const getProject = cache(async (slug: string | undefined) => {
  if (!slug) return null;
  return client.fetch<ProjectPageData | null>(
    PROJECT_PAGE_QUERY,
    { slug },
    { next: { revalidate: 60 } },
  );
});

export const revalidate = 60;

export async function generateStaticParams() {
  return client.fetch<{ category: string; slug: string }[]>(
    PROJECT_PATHS_QUERY,
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProject(slug);
  if (!data) return {};

  const title = data.seo?.title || `${data.title} | Chris Norton Jr.`;
  const description =
    data.seo?.description ||
    data.impact ||
    data.summary ||
    `${data.title}, a project by Chris Norton Jr.`;
  const url = `${SITE_URL}${projectHref(data)}`;
  const image = data.image?.url
    ? `${data.image.url}?w=1200&h=630&fit=crop&auto=format`
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: projectHref(data) },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: data.image?.alt ?? data.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function Page({ params }: Props) {
  const { category, slug } = await params;
  const data = await getProject(slug);
  if (!data) notFound();

  // Project moved to another category in Studio, or someone typed the wrong one: send them to the real URL.
  if (data.category?.slug && data.category.slug !== category)
    permanentRedirect(projectHref(data));

  const url = `${SITE_URL}${projectHref(data)}`;
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
            name: data.category?.title,
            item: `${SITE_URL}/projects/${data.category?.slug}`,
          },
          { "@type": "ListItem", position: 3, name: data.title, item: url },
        ],
      },
      {
        "@type": "CreativeWork",
        name: data.title,
        description: data.summary ?? undefined,
        url,
        image: data.image?.url,
        dateCreated: data.startedAt ?? undefined,
        dateModified: data.completedAt ?? undefined,
        keywords: data.techStack?.join(", "),
        creator: { "@type": "Person", name: "Chris Norton Jr.", url: SITE_URL },
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
      <ProjectPage data={data} />
    </>
  );
}
