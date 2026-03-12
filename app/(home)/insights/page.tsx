import InsightsSectionClient from "@/components/sections/blog/InsightsSection";
import { getPosts } from "@/sanity/sanity-utils";

export const revalidate = 3600; // cache 1 hr
export default async function InsightsPage() {
  const posts = await getPosts(); // PostPreview[]
  return <InsightsSectionClient posts={posts} />;
}
