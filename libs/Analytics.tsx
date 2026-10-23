"use client";
import { useEffect } from "react";

const GA_ID = "G-S5ZBPZ262W";
const CLARITY_ID = "w3hgf1virm";

// Wait for the first real interaction before loading analytics,
// so GA + Clarity stay out of the initial page load (and Lighthouse).
const EVENTS = ["scroll", "pointerdown", "keydown", "touchstart"] as const;

function loadScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadAnalytics() {
  const w = window as any;

  // Google Analytics
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () {
    w.dataLayer.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_ID);
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);

  // Microsoft Clarity
  w.clarity =
    w.clarity ||
    function (...args: unknown[]) {
      (w.clarity.q = w.clarity.q || []).push(args);
    };
  loadScript(`https://www.clarity.ms/tag/${CLARITY_ID}`);
}

export default function Analytics() {
  useEffect(() => {
    const w = window as any;
    if (w.__analyticsLoaded) return;

    const start = () => {
      if (w.__analyticsLoaded) return;
      w.__analyticsLoaded = true;
      EVENTS.forEach((e) => window.removeEventListener(e, start));
      loadAnalytics();
    };

    EVENTS.forEach((e) =>
      window.addEventListener(e, start, { once: true, passive: true })
    );
    return () => EVENTS.forEach((e) => window.removeEventListener(e, start));
  }, []);

  return null;
}
