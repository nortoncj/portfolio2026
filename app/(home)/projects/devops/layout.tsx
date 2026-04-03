import { buildMetadata } from '@/app/layout';
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = buildMetadata({
  title: "DevOps Engineering Projects",
  description:
    "End-to-end CI/CD pipelines, container orchestration, infrastructure as code, and cloud automation built for production. Every project is designed for reliability, repeatability, and scale.",
});

export default function layout({children}: {children: React.ReactNode}) {
  return (
      <>
          {children}
          </>
  )
}
