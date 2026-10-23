import React from "react";
import type { Metadata } from "next";
import MainHeader from "@/components/sections/header/mainHeaderMid";
import Footer from "@/components/sections/footer/Footer2";
import Analytics from "@/libs/Analytics";




export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <>
      <MainHeader />
      <Analytics />
    
      {children}
      
      <Footer />
    </>
  );
}
