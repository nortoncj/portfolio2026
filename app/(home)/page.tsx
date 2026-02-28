import { getPosts } from "@/sanity/sanity-utils";

import Image from "next/image";

export const revalidate = 60; // cache 60s

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="space-y-8">
      <ul className="space-y-4">
        {posts.map((post: any) => (
          <li key={post._id} className="border p-4 rounded">
            <a href="#" className="text-xl font-semibold">
              {post.title}
            </a>
            <p className="text-gray-600">{post.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
