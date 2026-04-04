import { buildMetadata } from "@/app/layout";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  ...buildMetadata({
    title: "Hardware & Embedded Systems Projects",
    description:
      "A curated list of hardware and embedded systems projects including IoT devices, RTOS firmware, PCB designs, and embedded Linux gateways.",
  }),
  openGraph: {
    title: "Hardware & Embedded Systems Projects",
    description:
      "A curated list of hardware and embedded systems projects including IoT devices, RTOS firmware, PCB designs, and embedded Linux gateways.",
    url: "https://chrisnortonjr.com",
    siteName: "Chris Norton JR Portfolio",
    images: [
      {
        url: "https://chrisnortonjr.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hardware & Embedded Systems Projects",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
