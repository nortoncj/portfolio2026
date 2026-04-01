import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const jetBrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export function buildMetadata({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return {
    title: `${title || "Engineer"} | Chris Norton`,
    description:
      description ||
      "Product Development, DevOps, Cloud and Martech. I build products, deploy them and grow them as a brand",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${jetBrains.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
