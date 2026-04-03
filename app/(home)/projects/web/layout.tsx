import { buildMetadata } from "@/app/layout";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = buildMetadata({
  title: "Web Development Projects",
  description:
    "Full-stack web development projects spanning Next.js, Laravel, .NET, Vue, React, Node.js, and modern tooling.",
});

export default function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
