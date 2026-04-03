import { buildMetadata } from "@/app/layout";
import InsightsSectionClient from "@/components/sections/blog/InsightsSection";
import { getPosts } from "@/sanity/sanity-utils";
import { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Engineer",
  description:
    "Full-Stack Developer. Cloud Engineer. Marketing Technologist. Projects, breakdowns, and insights across DevOps, Embedded Systems, and Web Development — built to inform, impress, and collaborate.",
});

export const revalidate = 3600; // cache 1 hr
export default async function InsightsPage() {
  const posts = await getPosts(); // PostPreview[]
  return <InsightsSectionClient posts={posts} />;
}
