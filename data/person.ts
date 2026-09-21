// ─── Canonical Person entity for schema.org structured data ──────────────────
// Reused by the sitewide Person schema (app/layout.tsx) and per-post
// BlogPosting author/publisher schema (insights/[slug]/page.tsx) so Google
// sees one consistent entity across the site.
export const SITE_PERSON = {
  "@type": "Person",
  "@id": "https://chrisnortonjr.com",
  name: "Chris Norton Jr",
  url: "https://chrisnortonjr.com",
  image: "https://chrisnortonjr.com/assets/img/hero_headshot.webp",
  jobTitle: "Devops & Cloud Systems Engineer",
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
    "https://www.github.com/nortoncj",
    "https://www.linkedin.com/in/chrisnortonjr",
    "https://www.youtube.com/@chrisnortonjr",
    "https://www.facebook.com/chris.norton.37051",
    "https://www.instagram.com/chrisnortonjr",
  ],
};
