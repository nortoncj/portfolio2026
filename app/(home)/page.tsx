import About from "@/components/sections/about/About";
import AboutSection from "@/components/sections/about/aboutSection";
import BlogSection from "@/components/sections/blog/blogSection";
import ContactSection from "@/components/sections/contact/contactSection";
import Hero from "@/components/sections/hero/heroSection";
import ProjectSection from "@/components/sections/projects/projectSection";
import SkillSection from "@/components/sections/skills/skillSection";
import { getPosts } from "@/sanity/sanity-utils";
import { Metadata } from "next";
import { buildMetadata } from "../layout";


export const revalidate = 3600; // cache 60s

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="space-y-8">
      <Hero />
      <SkillSection />
      <ProjectSection />
      <AboutSection />
      {/* <About /> */}
      <BlogSection posts={posts} />
      {/* <ContactSection /> */}
    </main>
  );
}
