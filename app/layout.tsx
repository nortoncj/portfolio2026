import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/libs/SEO";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="7JxhJ8Q3PXbQgekYOnrwz4G3K6tFCe-2yIUdsZjeAhw"
      />
      <body
        className={`${inter.variable} ${playfair.variable} ${jetBrains.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
