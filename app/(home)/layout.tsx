import React from "react";
import type { Metadata } from "next";
import MainHeader from "@/components/sections/header/mainHeaderMid";
import Footer from "@/components/sections/footer/Footer2";
import Script from "next/script";
import Clarity from "@/libs/Clarity";




export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <>
      <MainHeader />
      < Clarity />
      {/* Google Tag Manager */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-S5ZBPZ262W"
        strategy="lazyOnload"
      />

      <Script id="gtag-init" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S5ZBPZ262W');
          `}
      </Script>
    
      {children}
      
      <Footer />
    </>
  );
}
