import { buildMetadata } from "@/libs/SEO";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  ...buildMetadata({
    title: "Digital Marketing Projects",
    description:
      "HTML email templates, SEO systems, Ad Campaigns, analytics dashboards, N8N automations, AI workflows, and full-funnel marketing campaigns.",
  }),
  openGraph: {
    title: "Digital Marketing Projects",
    description:
      "HTML email templates, SEO systems, Ad Campaigns, analytics dashboards, N8N automations, AI workflows, and full-funnel marketing campaigns.",
    url: "https://chrisnortonjr.com",
    siteName: "Chris Norton JR Portfolio",
    images: [
      {
        url: "https://chrisnortonjr.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Marketing Projects",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
