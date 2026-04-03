import React from "react";
import type { Metadata } from "next";
import MainHeader from "@/components/sections/header/mainHeader";
import Footer from "@/components/sections/footer/Footer2";
import { buildMetadata } from "../layout";



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
