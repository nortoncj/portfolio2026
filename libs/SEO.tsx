// lib/metadata.ts

type MetadataInput = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

export function buildMetadata({
  title,
  description,
  image = "/og-default.jpg",
  url = "https://chrisnorton.com",
}: MetadataInput) {
  const fullTitle = `${title || "Engineer"} | Chris Norton`;
  const fullDescription =
    description ||
    "Product Development, DevOps, Cloud and Martech. I build products, deploy them and grow them as a brand.";

  return {
    // -------------------------
    // 🔍 GOOGLE SEO
    // -------------------------
    title: fullTitle,
    description: fullDescription,
    alternates: {
      canonical: url,
    },

    // -------------------------
    // 🟦 OPEN GRAPH (FB, LinkedIn, Slack, Discord)
    // -------------------------
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: "Chris Norton",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_US",
      type: "website",
    },

    // -------------------------
    // 🐦 TWITTER CARDS
    // -------------------------
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [image],
      creator: "@chrisnortonjr", // optional
    },

    // -------------------------
    // 📱 iMessage / SMS / WhatsApp
    // (these apps use OG tags automatically)
    // -------------------------
    metadataBase: new URL(url),
  };
}
