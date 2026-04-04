import { buildMetadata } from '@/libs/SEO';
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  ...buildMetadata({
    title: "DevOps Engineering Projects",
    description:
      "End-to-end CI/CD pipelines, container orchestration, infrastructure as code, and cloud automation built for production. Every project is designed for reliability, repeatability, and scale.",
  }),
  openGraph: {
    title: "DevOps Engineering Projects",
    description:
      "End-to-end CI/CD pipelines, container orchestration, infrastructure as code, and cloud automation built for production.",
    url: "https://chrisnortonjr.com",
    siteName: "Chris Norton JR Portfolio",
    images: [
      {
        url: "https://chrisnortonjr.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DevOps Engineering Projects",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function layout({children}: {children: React.ReactNode}) {
  return (
      <>
          {children}
          </>
  )
}
