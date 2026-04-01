import React from "react";
import type { Metadata } from "next";
import MainHeader from "@/components/sections/header/mainHeader";
import Footer from "@/components/sections/footer/Footer2";
import { buildMetadata } from "../layout";

export const metadata: Metadata = buildMetadata({
  title: "Chris Norton Jr | Engineer",
  description:
    "Full-Stack Developer. Cloud Engineer. Marketing Technologist. Projects, breakdowns, and insights across DevOps, Embedded Systems, and Web Development — built to inform, impress, and collaborate.",
});

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainHeader />
      {children}
      <Footer />
    </>
  );
}
