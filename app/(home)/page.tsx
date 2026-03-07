import About from "@/components/sections/about/About";
import AboutSection from "@/components/sections/about/aboutSection";
import BlogSection from "@/components/sections/blog/blogSection";
import ContactSection from "@/components/sections/contact/contactSection";
import MainHeader from "@/components/sections/header/mainHeader";
import Hero from "@/components/sections/hero/heroSection";
import VideoModal from "@/components/sections/hero/videoModal";
import ProjectSection from "@/components/sections/projects/projectSection";
import SkillSection from "@/components/sections/skills/skillSection";
import { getPosts } from "@/sanity/sanity-utils";
import Image from "next/image";

export const revalidate = 60; // cache 60s

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
      <ContactSection />
    </main>
  );
}
