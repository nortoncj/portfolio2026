import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Clarity from "@microsoft/clarity";

// Make sure to add your actual project id instead of "yourProjectId".
const projectId = process.env.CLARITY_PROJECT_ID || "yourProjectId";

Clarity.init(projectId);


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
      <body
        className={`${inter.variable} ${playfair.variable} ${jetBrains.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
