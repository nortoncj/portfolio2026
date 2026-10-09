// ./src/sanity/lib/queries.ts
import { defineQuery } from "groq";

const projectCard = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  summary,
  impact,
  status,
  techStack,
  featured,
  coverImage,
  "category": category->{ title, "slug": slug.current }
`;

const postCard = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  image
`;

/** Card shape for the /projects index (image resolved to a CDN url + blur placeholder). */
const indexCard = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  summary,
  impact,
  status,
  projectType,
  techStack,
  featured,
  "category": category->{ title, "slug": slug.current },
  "image": select(
    defined(coverImage.asset) => {
      "url": coverImage.asset->url,
      "alt": coalesce(coverImage.alt, title),
      "lqip": coverImage.asset->metadata.lqip
    },
    null
  )
`;

/** /projects index: categories that have projects, up to 4 featured, and everything. */
export const PROJECTS_INDEX_QUERY = defineQuery(`{
  "categories": *[_type == "category" && count(*[_type == "project" && references(^._id)]) > 0]{
    _id,
    title,
    "slug": slug.current
  },
  "featured": *[_type == "project" && featured == true && defined(slug.current)]
    | order(completedAt desc) [0...4] { ${indexCard} },
  "projects": *[_type == "project" && defined(slug.current)]
    | order(sortOrder asc, completedAt desc) { ${indexCard} }
}`);

/** /projects/[category]: the category, its projects, and the other categories for "Keep exploring". */
export const CATEGORY_PAGE_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $category][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    "heroImage": select(
      defined(heroImage.asset) => {
        "url": heroImage.asset->url,
        "alt": coalesce(heroImage.alt, title),
        "lqip": heroImage.asset->metadata.lqip
      },
      null
    ),
    "projects": *[_type == "project" && references(^._id) && defined(slug.current)]
      | order(sortOrder asc, completedAt desc) { ${indexCard} },
    "others": *[
      _type == "category" &&
      slug.current != $category &&
      count(*[_type == "project" && references(^._id)]) > 0
    ]{
      _id,
      title,
      "slug": slug.current,
      "count": count(*[_type == "project" && references(^._id)])
    }
  }
`);

/** Blog post card with the image resolved for next/image */
const relatedPostCard = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "category": categories[0]->title,
  "image": select(
    defined(image.asset) => {
      "url": image.asset->url,
      "alt": coalesce(image.alt, title),
      "lqip": image.asset->metadata.lqip
    },
    null
  )
`;

/** /projects/[category]/[slug]: looked up by slug only, the page redirects if the category in the URL is wrong. */
export const PROJECT_PAGE_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    ${indexCard},
    role,
    client,
    startedAt,
    completedAt,
    videoUrl,
    githubUrl,
    liveUrl,
    seo,
    "description": description[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url,
        "lqip": asset->metadata.lqip
      }
    },
    "gallery": gallery[defined(asset)]{
      _key,
      "url": asset->url,
      "alt": coalesce(alt, ""),
      caption,
      "lqip": asset->metadata.lqip
    },
    "posts": *[_type == "post" && references(^._id)]
      | order(publishedAt desc) [0...3] { ${relatedPostCard} },
    "categoryPosts": *[_type == "post" && references(^.category._ref) && !references(^._id)]
      | order(publishedAt desc) [0...3] { ${relatedPostCard} },
    "siblings": *[_type == "project" && category._ref == ^.category._ref && defined(slug.current)]
      | order(sortOrder asc, completedAt desc) { _id, title, "slug": slug.current }
  }
`);

/** Every project URL, for generateStaticParams. */
export const PROJECT_PATHS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current) && defined(category->slug.current)]{
    "category": category->slug.current,
    "slug": slug.current
  }
`);

/** Category slugs that actually have projects, for generateStaticParams. */
export const CATEGORY_SLUGS_QUERY = defineQuery(`
  *[
    _type == "category" &&
    defined(slug.current) &&
    count(*[_type == "project" && references(^._id)]) > 0
  ].slug.current
`);

/** Everything app/sitemap.ts lists. Categories only count if they have projects. */
export const SITEMAP_QUERY = defineQuery(`{
  "categories": *[
    _type == "category" &&
    defined(slug.current) &&
    count(*[_type == "project" && references(^._id)]) > 0
  ]{
    "slug": slug.current,
    _updatedAt
  },
  "projects": *[_type == "project" && defined(slug.current) && defined(category->slug.current)]{
    "category": category->slug.current,
    "slug": slug.current,
    _updatedAt
  },
  "posts": *[_type == "post" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt
  }
}`);

/** All projects, in your manual order. Group by category.slug on the frontend. */
export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)]
  | order(sortOrder asc, completedAt desc) { ${projectCard} }
`);

/** One bucket: $category = "devops" | "hardware" | "software-web" | "automations-martech" */
export const PROJECTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "project" && category->slug.current == $category]
  | order(sortOrder asc, completedAt desc) { ${projectCard} }
`);

/** Project page. Related posts are found in reverse, nothing stored on the project. */
export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    ${projectCard},
    role,
    client,
    description,
    gallery,
    videoUrl,
    githubUrl,
    liveUrl,
    startedAt,
    completedAt,
    seo,
    "relatedPosts": *[_type == "post" && references(^._id)]
      | order(publishedAt desc) { ${postCard} }
  }
`);

/** Post page with its linked projects resolved. */
export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    ...,
    "categories": categories[]->{ title, "slug": slug.current },
    "relatedProjects": relatedProjects[]->{ ${projectCard} }
  }
`);

/** Category hub: everything (posts AND projects) in one category. */
export const CATEGORY_HUB_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $category][0]{
    title,
    "slug": slug.current,
    "projects": *[_type == "project" && references(^._id)]
      | order(sortOrder asc) { ${projectCard} },
    "posts": *[_type == "post" && references(^._id)]
      | order(publishedAt desc) { ${postCard} }
  }
`);

/** Slugs for generateStaticParams / getStaticPaths. */
export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)].slug.current
`);
// import { defineQuery } from "next-sanity";

// export const POSTS_QUERY =
//   defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
//   _id, title, slug
// }`);

// export const POST_QUERY =
//   defineQuery(`*[_type == "post" && slug.current == $slug][0]{
//   title, body, mainImage,
// }`);
