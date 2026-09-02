"use client";
import { useState } from "react";
// ─── Types ────────────────────────────────────────────────────────────────────
interface FaqItemProps {
  item: { q: string; a: string };
}

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
export function FaqItem({ item }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "faq-open" : ""}`}>
      <button
        className="faq-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="faq-q">{item.q}</span>
        <span className="faq-chevron">{open ? "−" : "+"}</span>
      </button>
      <div className="faq-body" style={{ maxHeight: open ? "400px" : "0" }}>
        <p className="faq-a">{item.a}</p>
      </div>
    </div>
  );
}
