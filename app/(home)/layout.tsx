import React from "react";
import type { Metadata } from "next";
import MainHeader from "@/components/sections/header/mainHeader";
import Footer from "@/components/sections/footer/Footer2";

export const metadata: Metadata = {
  title: "Chris Norton Jr | Systems Engineer",
  description: "Marketing, Development and Deployment ",
};

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
