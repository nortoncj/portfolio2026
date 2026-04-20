import React from "react";
import type { Metadata } from "next";
import MainHeader from "@/components/sections/header/mainHeaderMid";
import Footer from "@/components/sections/footer/Footer2";
import Script from "next/script";



export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  return (
    <>
      <MainHeader />
      {children}
      {clarityId && (
  <Script id="ms-clarity" strategy="afterInteractive">
    {`
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${clarityId}");
    `}
  </Script>
)}
      <Footer />
    </>
  );
}
