import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    formats: ["image/webp", "image/avif"],
    domains: [
      "images.unsplash.com",
      "thumbs.dreamstime.com",
      "static.vecteezy.com",
      "www.shutterstock.com",
      "cdn.sanity.io", // Sanity CDN for dynamic images
    ],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
