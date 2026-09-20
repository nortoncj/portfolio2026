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
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://chrisnortonjr.com",
    name: "Chris Norton Jr.",
    jobTitle: "Devops Engineer",
    url: "https://chrisnortonjr.com",
    alumniOf: "Florida International University",
    worksFor: { "@type": "Organization", name: "WebTech Ninjas" },
    knowsAbout: [
      "AWS",
      "Terraform",
      "DevSecOps",
      "IoT",
      "Python",
      "WordPress",
      "Embedded Systems",
      "Azure",
      "Docker",
      "Linux",
      "Web Development",
      "SEO",
      "Email Marketing",
      "Ads",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tampa",
      addressRegion: "FL",
    },
    sameAs: [
      "github.com/nortoncj",
      "linkedin.com/in/chrisnortonjr",
      "youtube.com/@chrisnortonjr",
      "facebook.com/chris.norton.37051",
      "instagram.com/chrisnortonjr",
    ],
  };
  return (
    <>
      <MainHeader />
      {/* Google Tag Manager */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-S5ZBPZ262W"
        strategy="afterInteractive"
      />

      <Script id="gtag-init" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S5ZBPZ262W');
          `}
      </Script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
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
