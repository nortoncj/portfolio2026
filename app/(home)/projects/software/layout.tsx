import { buildMetadata } from "@/libs/SEO";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
    ...buildMetadata({
  title: "Web Development Projects",
  description:
    "Full-stack web development projects spanning Next.js, Laravel, .NET, Vue, React, Node.js, and modern tooling.",
}),
    openGraph: {
        title: "Web Development Projects",
        description:
            "Full-stack web development projects spanning Next.js, Laravel, .NET, Vue, React, Node.js, and modern tooling.",
        url: "https://chrisnortonjr.com",
        siteName: "Chris Norton JR Portfolio",
        images: [
            {
                url: "https://chrisnortonjr.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Web Development Projects",
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
