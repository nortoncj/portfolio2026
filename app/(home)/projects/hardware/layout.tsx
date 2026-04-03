import { buildMetadata } from "@/app/layout";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = buildMetadata({
  title: "Hardware & Embedded Systems Projects",
  description:
    "A curated list of hardware and embedded systems projects including IoT devices, RTOS firmware, PCB designs, and embedded Linux gateways.",
});

export default function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
