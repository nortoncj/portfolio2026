import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PROJECTS_INDEX_QUERY } from "@/sanity/lib/queries";
import ProjectsIndex from "@/components/pages/projects/ProjectsIndex";
import type { ProjectsIndexData } from "@/components/pages/projects/components/categoryTheme";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects | Chris Norton Jr.",
  description:
    "DevOps, hardware, software, and automation projects by Chris Norton Jr.",
  alternates: { canonical: "/projects" },
};

export default async function Page() {
  const data = await client.fetch<ProjectsIndexData>(
    PROJECTS_INDEX_QUERY,
    {},
    { next: { revalidate: 60 } },
  );

  return <ProjectsIndex data={data} />;
}
