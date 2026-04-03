import { buildMetadata } from "@/app/layout";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = buildMetadata({
  title: "Digital Marketing Projects",
  description:
    "HTML email templates, SEO systems, Ad Campaigns, analytics dashboards, N8N automations, AI workflows, and full-funnel marketing campaigns.",
});

export default function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
