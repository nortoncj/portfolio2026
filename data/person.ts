// ─── Canonical Person entity for schema.org structured data ──────────────────
// Reused by the sitewide Person schema (app/layout.tsx) and per-post
// BlogPosting author/publisher schema (insights/[slug]/page.tsx) so Google
// sees one consistent entity across the site.
export const SITE_PERSON = {
  "@type": "Person",
  name: "Chris Norton Jr",
  url: "https://chrisnortonjr.com",
  image: "https://chrisnortonjr.com/assets/img/hero_headshot.webp",
  jobTitle: "Devops & Embedded Systems Engineer",
  sameAs: [
    "https://www.github.com/nortoncj",
    "https://www.linkedin.com/in/chrisnortonjr/",
    "https://www.youtube.com/@chrisnortonjr",
  ],
};
