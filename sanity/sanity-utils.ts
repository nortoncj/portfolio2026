import { client } from "./lib/client";
import { groq } from "next-sanity";

export async function getPosts() {
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
