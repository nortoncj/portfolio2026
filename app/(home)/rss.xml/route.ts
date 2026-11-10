import { getPosts } from "@/sanity/sanity-utils";

export async function GET() {
  const baseUrl = "https://chrisnortonjr.com";
  const posts = await getPosts();

  const items = posts
    .map((post: any) => {
      const title = post.seo?.title ?? post.title;
      const description = post.seo?.description ?? post.excerpt;
      const link = `${baseUrl}/insights/${post.slug}`;
      const pubDate = new Date(
        post._updatedAt || post.updatedAt || post.publishedAt || Date.now()
      ).toUTCString();

      return `
        <item>
          <title><![CDATA[${title}]]></title>
          <link>${link}</link>
          <guid>${link}</guid>
          <description><![CDATA[${description}]]></description>
          <pubDate>${pubDate}</pubDate>
        </item>
      `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Chris Norton Jr — Insights</title>
      <link>${baseUrl}</link>
      <description>Latest insights and engineering posts from Chris Norton Jr.</description>
      <language>en-us</language>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
