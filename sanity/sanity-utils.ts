import { Post } from "@/types/Post";
import { client } from "./lib/client";
import { groq } from "next-sanity";

export async function getPosts(): Promise<Post[]> {
  return client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      "slug": slug.current,
      publishedAt,
      featured,
      image{
        asset->{
          url,
          metadata
        },
        alt,
        caption
      },
      video,
      categories[]->{
        _id,
        title,
        "slug": slug.current
      },
      tags[]->{
        _id,
        title
      },
      seo
    }`,
  );
}

export async function getPost(slug: string): Promise<Post> {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      excerpt,
      "slug": slug.current,
      publishedAt,
      featured,
      image{
        asset->{
          url,
          metadata
        },
        alt,
        caption
      },
      video,
      body[]{
        ...,
        _type == "image" => {
          ...,
          asset->{
            url,
            metadata
          }
        }
      },
      categories[]->{
        _id,
        title,
        "slug": slug.current
      },
      tags[]->{
        _id,
        title
      },
      seo
    }`,
    { slug },
  );
}

export async function getRelatedPosts(
  currentId: string,
  catSlug: string,
): Promise<Post[]> {
  return client.fetch(
    groq`*[
      _type == "post" &&
      _id != $currentId &&
      count(categories[@->slug.current == $catSlug]) > 0
    ] | order(publishedAt desc) [0..2] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      image{
        asset->{ url },
        alt
      },
      categories[]->{ _id, title, "slug": slug.current },
      "readTime": round(length(pt::text(body)) / 5 / 220)
    }`,
    { currentId, catSlug },
  );
}
