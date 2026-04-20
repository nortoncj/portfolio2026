import React from "react";
import type { Metadata } from "next";
import MainHeader from "@/components/sections/header/mainHeaderMid";
import Footer from "@/components/sections/footer/Footer2";
import { Clarity } from "./clarity";



export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Clarity />
      <MainHeader />
      {children}
      <Footer />
    </>
  );
}
