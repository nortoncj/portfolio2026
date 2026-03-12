import InsightsSectionClient from "@/components/sections/blog/InsightsSection";
import { getPosts } from "@/sanity/sanity-utils";

export default async function InsightsPage() {
  const posts = await getPosts(); // PostPreview[]
  return <InsightsSectionClient posts={posts} />;
}
