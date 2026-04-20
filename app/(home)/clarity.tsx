"use client";

import { useEffect } from "react";
import { clarity } from "clarity-js";

export function Clarity() {
  useEffect(() => {
    clarity.start({
      projectId: process.env.NEXT_PUBLIC_CLARITY_ID || "yourProjectId",
    });
  }, []);

  return null;
}
