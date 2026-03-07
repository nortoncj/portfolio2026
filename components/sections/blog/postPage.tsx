"use client";

/**
 * BlogPostPage.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Next.js / React TypeScript blog post detail page.
 * Matches the portfolio design system (globals.css tokens).
 *
 * Features
 *  • 3 px gradient reading-progress bar (fixed top)
 *  • Floating share sidebar (desktop, IntersectionObserver-gated)
 *  • Full-viewport hero: YouTube embed if post.video exists, else hero image
 *  • Sticky auto-generated TOC with IntersectionObserver active-highlight
 *    and SVG progress ring
 *  • Two-column article layout (prose + 300 px sticky sidebar)
 *  • PortableText custom renderers:
 *      h2 – gradient left-bar + gradient text
 *      h3 – purple accent underline
 *      blockquote – Playfair glass card
 *      image – glass <figure> with caption
 *      table – glass table with gradient header row
 *      callout – tip / warn / info / danger variants
 *      code (inline) – purple badge
 *      code (block) – dark pre + language tag
 *  • Related posts 3-up grid (scroll-reveal)
 *  • Article footer: share row + glass author card
 *  • Back-to-insights CTA
 *  • Full SEO: <Head> meta + JSON-LD BlogPosting schema
 *  • Framer Motion scroll-reveal on cards
 *
 * Install
 *   npm install @portabletext/react @portabletext/types framer-motion
 *   (next, react already present)
 *
 * Usage
 *   Place at app/insights/[slug]/page.tsx (or pages/insights/[slug].tsx).
 *   Pass `post` (Post) and `relatedPosts` (RelatedPost[]) as props.
 */

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  CSSProperties,
} from "react";
import Head from "next/head";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────



interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────

const T = {
  burgundy: "#ff6188",
  magenta: "#fc5fa3",
  purple: "#ab9df2",
  coral: "#ffd866",
  mint: "#a9dc76",
  blue: "#78dce8",
  white: "#fcfcfa",
  cream: "#f9f8f6",
  charcoal: "#2d2a2e",
  slate: "#221f22",
  mid: "#312e32",
  silver: "#939293",
  gradPrimary: "linear-gradient(135deg,#ff6188 0%,#fc5fa3 50%,#ab9df2 100%)",
  gradVibrant: "linear-gradient(135deg,#ff6188,#ffd866)",
  borderGlass: "1px solid rgba(255,255,255,.1)",
  shadowMd: "0 8px 32px rgba(0,0,0,.28)",
  shadowLg: "0 16px 48px rgba(0,0,0,.36)",
  glowPink: "0 0 24px rgba(255,97,136,.35)",
};

// Category colour map
const CAT_COLOURS: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  marketing: {
    bg: "rgba(252,95,163,.2)",
    border: "rgba(252,95,163,.45)",
    text: T.magenta,
  },
  devops: {
    bg: "rgba(120,220,232,.2)",
    border: "rgba(120,220,232,.45)",
    text: T.blue,
  },
  seo: {
    bg: "rgba(255,97,136,.2)",
    border: "rgba(255,97,136,.45)",
    text: T.burgundy,
  },
  cloud: {
    bg: "rgba(171,157,242,.2)",
    border: "rgba(171,157,242,.4)",
    text: T.purple,
  },
  linux: {
    bg: "rgba(169,220,118,.2)",
    border: "rgba(169,220,118,.45)",
    text: T.mint,
  },
  email: {
    bg: "rgba(255,216,102,.2)",
    border: "rgba(255,216,102,.45)",
    text: T.coral,
  },
  hardware: {
    bg: "rgba(147,146,147,.2)",
    border: "rgba(147,146,147,.45)",
    text: T.silver,
  },
  automation: {
    bg: "rgba(171,157,242,.2)",
    border: "rgba(171,157,242,.45)",
    text: T.purple,
  },
  "web-dev": {
    bg: "rgba(255,97,136,.15)",
    border: "rgba(255,97,136,.4)",
    text: T.burgundy,
  },
  code: {
    bg: "rgba(120,220,232,.15)",
    border: "rgba(120,220,232,.4)",
    text: T.blue,
  },
};

function catStyle(slug: string) {
  return (
    CAT_COLOURS[slug.toLowerCase()] ?? {
      bg: "rgba(255,97,136,.15)",
      border: "rgba(255,97,136,.35)",
      text: T.burgundy,
    }
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function readingTime(blocks: any[]): number {
  const text = blocks
    .filter((b) => b._type === "block" && Array.isArray(b.children))
    .flatMap((b) => b.children.map((c: any) => c.text || ""))
    .join(" ");

  const words = text.trim().split(/\s+/).length;

  return Math.max(1, Math.ceil(words / 220));
}


function extractTOC(blocks: any[]): TOCItem[] {
  return blocks
    .filter(
      (b) => b._type === "block" && (b.style === "h2" || b.style === "h3"),
    )
    .map((b) => {
      const text =
        (b as PortableTextBlock & { children?: { text: string }[] }).children
          ?.map((c) => c.text)
          .join("") ?? "";
      return {
        id: slugify(text),
        text,
        level: (b.style === "h2" ? 2 : 3) as 2 | 3,
      };
    })
    .filter((item) => item.text.length > 0);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function youtubeEmbed(url: string): string | null {
  const m =
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?]+)/) ||
    url.match(/youtube\.com\/embed\/([^&\s?]+)/);
  return m
    ? `https://www.youtube.com/embed/${m[1]}?rel=0&modestbranding=1`
    : null;
}

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL STYLES  (injected once via useEffect)
// ─────────────────────────────────────────────────────────────────────────────

import "@css/insights/post.css";
import { Post, RelatedPost } from "@/types/Post";

// ─────────────────────────────────────────────────────────────────────────────
// SVG ICONS
// ─────────────────────────────────────────────────────────────────────────────

const IconTwitter = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2 2.25h6.08l4.275 5.644 5.89-5.644Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const IconLinkedIn = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const IconFacebook = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const IconCopy = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);
const IconEmail = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconCalendar = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconClock = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconArrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const IconList = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);
const IconTag = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const IconGithub = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// SHARE ACTIONS
// ─────────────────────────────────────────────────────────────────────────────

function useShare(title: string) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const share = useCallback(
    (platform: "twitter" | "linkedin" | "facebook" | "copy" | "email") => {
      const enc = encodeURIComponent;
      switch (platform) {
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`,
            "_blank",
          );
          break;
        case "linkedin":
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
            "_blank",
          );
          break;
        case "facebook":
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
            "_blank",
          );
          break;
        case "email":
          window.location.href = `mailto:?subject=${enc(title)}&body=${enc(url)}`;
          break;
        case "copy":
          navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
          });
          break;
      }
    },
    [title, url],
  );

  return { share, copied };
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARE BUTTONS (reusable row)
// ─────────────────────────────────────────────────────────────────────────────

function ShareButtons({
  title,
  compact = false,
}: {
  title: string;
  compact?: boolean;
}) {
  const { share, copied } = useShare(title);

  return (
    <>
      <button
        className="bp-share-btn tw"
        onClick={() => share("twitter")}
        aria-label="Share on X / Twitter"
      >
        <IconTwitter />
        {!compact && "X / Twitter"}
      </button>
      <button
        className="bp-share-btn li"
        onClick={() => share("linkedin")}
        aria-label="Share on LinkedIn"
      >
        <IconLinkedIn />
        {!compact && "LinkedIn"}
      </button>
      <button
        className="bp-share-btn fb"
        onClick={() => share("facebook")}
        aria-label="Share on Facebook"
      >
        <IconFacebook />
        {!compact && "Facebook"}
      </button>
      <button
        className={`bp-share-btn cp${copied ? " copied" : ""}`}
        onClick={() => share("copy")}
        aria-label="Copy link"
      >
        <IconCopy />
        {!compact && (copied ? "Copied!" : "Copy link")}
      </button>
      <button
        className="bp-share-btn em"
        onClick={() => share("email")}
        aria-label="Share via email"
      >
        <IconEmail />
        {!compact && "Email"}
      </button>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING SHARE SIDEBAR
// ─────────────────────────────────────────────────────────────────────────────

function ShareSidebar({ title, visible }: { title: string; visible: boolean }) {
  const { share, copied } = useShare(title);

  return (
    <aside
      className={`bp-share-sidebar${visible ? " visible" : ""}`}
      aria-label="Share this article"
    >
      <span className="bp-sidebar-label">Share</span>
      <button
        className="bp-sidebar-btn tw"
        data-tip="Share on X"
        aria-label="Share on X"
        onClick={() => share("twitter")}
      >
        <IconTwitter />
      </button>
      <button
        className="bp-sidebar-btn li"
        data-tip="Share on LinkedIn"
        aria-label="Share on LinkedIn"
        onClick={() => share("linkedin")}
      >
        <IconLinkedIn />
      </button>
      <button
        className="bp-sidebar-btn fb"
        data-tip="Share on Facebook"
        aria-label="Share on Facebook"
        onClick={() => share("facebook")}
      >
        <IconFacebook />
      </button>
      <button
        className={`bp-sidebar-btn cp${copied ? " copied" : ""}`}
        data-tip={copied ? "Copied!" : "Copy link"}
        aria-label="Copy link"
        onClick={() => share("copy")}
      >
        <IconCopy />
      </button>
      <button
        className="bp-sidebar-btn em"
        data-tip="Share via Email"
        aria-label="Share via email"
        onClick={() => share("email")}
      >
        <IconEmail />
      </button>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOC SIDEBAR
// ─────────────────────────────────────────────────────────────────────────────

function TOCSidebar({
  items,
  activeId,
  progress,
}: {
  items: TOCItem[];
  activeId: string;
  progress: number;
}) {
  if (items.length === 0) return null;

  // SVG ring constants
  const r = 14;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="bp-toc-card"
      role="navigation"
      aria-label="Table of contents"
    >
      <div className="bp-toc-header">
        <IconList />
        <span>Contents</span>
        <div className="bp-toc-ring-wrap">
          <span>{Math.round(progress)}%</span>
          <svg
            width="34"
            height="34"
            className="bp-toc-ring"
            aria-hidden="true"
          >
            <circle
              cx="17"
              cy="17"
              r={r}
              fill="none"
              stroke="rgba(255,255,255,.1)"
              strokeWidth="2.5"
            />
            <circle
              cx="17"
              cy="17"
              r={r}
              fill="none"
              stroke="url(#bpRingGrad)"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset .1s linear" }}
            />
            <defs>
              <linearGradient id="bpRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff6188" />
                <stop offset="100%" stopColor="#ab9df2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <ol className="bp-toc-list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`bp-toc-link${item.level === 3 ? " h3" : ""}${activeId === item.id ? " active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// META CARD (sidebar read-time panel)
// ─────────────────────────────────────────────────────────────────────────────

function MetaCard({
  readMin,
  publishedAt,
  wordCount,
  progress,
}: {
  readMin: number;
  publishedAt: string;
  wordCount: number;
  progress: number;
}) {
  return (
    <div className="bp-meta-card">
      <div className="bp-smeta-row">
        <span className="bp-smeta-label">
          <IconClock /> Read time
        </span>
        <span className="bp-smeta-value">{readMin} min</span>
      </div>
      <div className="bp-smeta-row">
        <span className="bp-smeta-label">
          <IconCalendar /> Published
        </span>
        <span className="bp-smeta-value">{formatDate(publishedAt)}</span>
      </div>
      <div className="bp-smeta-row">
        <span className="bp-smeta-label">
          <IconTag /> Words
        </span>
        <span className="bp-smeta-value">{wordCount.toLocaleString()}</span>
      </div>
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,.07)",
          paddingTop: ".75rem",
        }}
      >
        <div className="bp-smeta-row" style={{ marginBottom: ".4rem" }}>
          <span className="bp-smeta-label">Progress</span>
          <span className="bp-smeta-value" style={{ color: T.burgundy }}>
            {Math.round(progress)}%
          </span>
        </div>
        <div className="bp-read-bar-wrap">
          <div className="bp-read-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RELATED POST CARD
// ─────────────────────────────────────────────────────────────────────────────

function RelatedPostCard({
  post,
  index,
}: {
  post: RelatedPost
  index: number;
}) {
  const cat = post.categories[0];
  const cs = catStyle(cat?.slug ?? "");

  return (
    <motion.article
      className="bp-r-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {post.image ? (
        <div className="bp-r-img-wrap">
          <img
            src={post.image.asset.url}
            alt={post.image.alt}
            className="bp-r-img"
            loading="lazy"
          />
          <div className="bp-r-img-overlay" />
        </div>
      ) : (
        <div
          style={{
            aspectRatio: "16/9",
            background: `linear-gradient(135deg, rgba(255,97,136,.15), rgba(171,157,242,.15))`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
          }}
          aria-hidden="true"
        >
          ✍️
        </div>
      )}
      <div className="bp-r-body">
        <div className="bp-r-meta">
          {cat && (
            <span
              style={{
                padding: "2px 8px",
                borderRadius: "999px",
                fontSize: ".65rem",
                fontWeight: 700,
                background: cs.bg,
                border: `1px solid ${cs.border}`,
                color: cs.text,
              }}
            >
              {cat.title}
            </span>
          )}
          <span className="bp-r-dot" />
          <span>{formatDate(post.publishedAt)}</span>
        </div>
        <h3 className="bp-r-title">{post.title}</h3>
        <p className="bp-r-excerpt">{post.excerpt}</p>
      </div>
      <div className="bp-r-footer">
        <Link
          href={`/insights/${post.slug}`}
          className="bp-r-read"
          aria-label={`Read ${post.title}`}
        >
          Read post <IconArrow />
        </Link>
        {post.readTime && (
          <span
            style={{
              fontSize: ".72rem",
              color: T.silver,
              fontFamily: "'JetBrains Mono',monospace",
            }}
          >
            {post.readTime} min
          </span>
        )}
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTHOR CARD
// ─────────────────────────────────────────────────────────────────────────────

function AuthorCard() {
  return (
    <div className="bp-author-card">
      <div className="bp-author-card-avatar" aria-hidden="true">
        C
      </div>
      <div>
        <p className="bp-author-card-name">Chris</p>
        <p className="bp-author-card-role">
          Full-Stack Engineer · Digital Marketer · Freelancer
        </p>
        <p className="bp-author-card-bio">
          Builder of web things, writer of marketing copy, and breaker of
          production servers at 2 am. I cover web dev, DevOps, marketing
          automation, and the occasional rabbit hole.
        </p>
        <div className="bp-author-links">
          <a
            href="https://github.com/yourgithub"
            target="_blank"
            rel="noopener noreferrer"
            className="bp-author-social"
            aria-label="GitHub profile"
          >
            <IconGithub /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/yourlinkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="bp-author-social"
            aria-label="LinkedIn profile"
          >
            <IconLinkedIn /> LinkedIn
          </a>
          <a
            href="https://twitter.com/yourtwitter"
            target="_blank"
            rel="noopener noreferrer"
            className="bp-author-social"
            aria-label="Twitter profile"
          >
            <IconTwitter /> Twitter
          </a>
          <a
            href="mailto:hello@yourportfolio.dev"
            className="bp-author-social"
            aria-label="Send email"
          >
            <IconEmail /> Email me
          </a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PORTABLE TEXT CUSTOM COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function buildPortableTextComponents(): PortableTextComponents {
  return {
    block: {
      h2: ({ children, value }) => {
        const text = React.Children.toArray(children).join("");
        const id = slugify(text);
        return (
          <h2 id={id} className="bp-prose" style={{ margin: "2.8rem 0 1rem" }}>
            <span className="bp-h2-bar" aria-hidden="true" />
            <span className="bp-h2-text">{children}</span>
          </h2>
        );
      },
      h3: ({ children }) => {
        const text = React.Children.toArray(children).join("");
        const id = slugify(text);
        return (
          <h3
            id={id}
            style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              lineHeight: 1.3,
              margin: "2rem 0 .75rem",
              letterSpacing: "-.02em",
              scrollMarginTop: "100px",
              color: T.white,
              borderBottom: `2px solid ${T.purple}`,
              paddingBottom: "2px",
              display: "inline-block",
            }}
          >
            {children}
          </h3>
        );
      },
      blockquote: ({ children }) => (
        <blockquote className="bp-blockquote">{children}</blockquote>
      ),
      normal: ({ children }) => (
        <p
          style={{
            marginBottom: "1.4rem",
            lineHeight: 1.8,
            color: "rgba(252,252,250,.82)",
          }}
        >
          {children}
        </p>
      ),
    },

    list: {
      bullet: ({ children }) => (
        <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.4rem" }}>
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol style={{ paddingLeft: "1.5rem", marginBottom: "1.4rem" }}>
          {children}
        </ol>
      ),
    },

    listItem: {
      bullet: ({ children }) => (
        <li style={{ marginBottom: ".55rem", color: "rgba(252,252,250,.82)" }}>
          {children}
        </li>
      ),
      number: ({ children }) => (
        <li style={{ marginBottom: ".55rem", color: "rgba(252,252,250,.82)" }}>
          {children}
        </li>
      ),
    },

    marks: {
      strong: ({ children }) => (
        <strong style={{ color: T.white, fontWeight: 700 }}>{children}</strong>
      ),
      em: ({ children }) => (
        <em style={{ fontStyle: "italic", color: "rgba(252,252,250,.85)" }}>
          {children}
        </em>
      ),
      code: ({ children }) => (
        <code className="bp-code-inline">{children}</code>
      ),
      link: ({ children, value }) => (
        <a
          href={value?.href ?? "#"}
          target={value?.href?.startsWith("http") ? "_blank" : undefined}
          rel={
            value?.href?.startsWith("http") ? "noopener noreferrer" : undefined
          }
          style={{
            color: T.burgundy,
            borderBottom: `1px solid rgba(255,97,136,.35)`,
            transition: "color .2s, border-color .2s",
          }}
        >
          {children}
        </a>
      ),
    },

    types: {
      // Code block (from sanity-plugin-code-input or similar)
      code: ({
        value,
      }: {
        value: { code: string; language?: string; filename?: string };
      }) => (
        <div className="bp-pre">
          {value.language && (
            <span className="bp-code-lang">
              {value.filename || value.language}
            </span>
          )}
          <pre style={{ margin: 0 }}>
            <code>{value.code}</code>
          </pre>
        </div>
      ),

      // Image from Sanity
      image: ({
        value,
      }: {
        value: { asset?: { url: string }; alt?: string; caption?: string };
      }) =>
        value.asset?.url ? (
          <figure className="bp-figure">
            <img src={value.asset.url} alt={value.alt ?? ""} loading="lazy" />
            {value.caption && (
              <figcaption className="bp-figcaption">{value.caption}</figcaption>
            )}
          </figure>
        ) : null,

      // Table (from sanity-plugin-table)
      table: ({
        value,
      }: {
        value: { rows: { _key: string; cells: string[] }[] };
      }) => {
        if (!value.rows?.length) return null;
        const [header, ...body] = value.rows;
        return (
          <div className="bp-table-wrap">
            <table className="bp-table">
              <thead>
                <tr>
                  {header.cells.map((cell, i) => (
                    <th key={i}>{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row) => (
                  <tr key={row._key}>
                    {row.cells.map((cell, i) => (
                      <td key={i}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      },

      // Callout box
      callout: ({
        value,
      }: {
        value: { tone?: "tip" | "warn" | "info" | "danger"; message: string };
      }) => {
        const icons = { tip: "💡", warn: "⚠️", info: "ℹ️", danger: "🚨" };
        const tone = value.tone ?? "info";
        return (
          <div className={`bp-callout bp-callout-${tone}`}>
            <span className="bp-callout-icon" aria-hidden="true">
              {icons[tone]}
            </span>
            <div
              className="bp-callout-body"
              dangerouslySetInnerHTML={{ __html: value.message }}
            />
          </div>
        );
      },

      // Horizontal divider
      divider: () => (
        <hr
          style={{
            border: "none",
            borderTop: "1px solid rgba(255,255,255,.08)",
            margin: "2.5rem 0",
          }}
        />
      ),
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface BlogPostPageProps {
  post: Post;
  relatedPosts?: RelatedPost[];
}

export default function BlogPostPage({
  post,
  relatedPosts = [],
}: BlogPostPageProps) {
  // ── Reading progress ──────────────────────────────────────────
  const [progress, setProgress] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [heroBgLoaded, setHeroBgLoaded] = useState(false);

  const articleRef = useRef<HTMLDivElement>(null);

  // Inject global CSS once
  useEffect(() => {
    const id = "bp-global-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      //   el.textContent = GLOBAL_CSS;
      document.head.appendChild(el);
    }
  }, []);

  // Scroll listener: update progress bar + sidebar visibility
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? Math.min(100, (scrollY / docH) * 100) : 0;
      setProgress(pct);

      // Show floating sidebar after hero is scrolled past
      const heroH =
        document.querySelector(".bp-hero")?.getBoundingClientRect().bottom ??
        400;
      setSidebarVisible(heroH < 0);

      // Update progress bar
      const bar = document.getElementById("bp-progress");
      if (bar) {
        bar.style.width = `${pct}%`;
        if (pct > 1) bar.classList.add("active");
        else bar.classList.remove("active");
      }

      // Update TOC progress ring in meta card
      const fill = document.querySelector(".bp-read-bar-fill") as HTMLElement;
      if (fill) fill.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver: track active heading
  const tocItems = useMemo(() => extractTOC(post.body), [post.body]);

  useEffect(() => {
    if (tocItems.length === 0) return;
    const headingEls = tocItems
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tocItems]);

  // Hero bg pan animation
  useEffect(() => {
    setTimeout(() => setHeroBgLoaded(true), 100);
  }, []);

  // Derived values
  const readMin = readingTime(post.body);
  const wordCount = useMemo(() => {
    const text = post.body
      .map(
        (b) =>
          (b as PortableTextBlock & { children?: { text: string }[] }).children
            ?.map((c) => c.text)
            .join(" ") ?? "",
      )
      .join(" ");
    return text.trim().split(/\s+/).length;
  }, [post.body]);

  const firstCat = post.categories[0];
  const cs = catStyle(firstCat?.slug ?? "");
  const seoTitle = post.seo?.title ?? post.title;
  const seoDescription = post.seo?.description ?? post.excerpt;
  const seoKeywords =
    post.seo?.keywords?.join(", ") ?? post.tags.map((t) => t.title).join(", ");
  const heroImage = post.image?.asset?.url ?? "";
  const videoEmbed = post.video ? youtubeEmbed(post.video) : null;
  const canonicalUrl = `https://yourportfolio.dev/insights/${post.slug}`;
  const portableTextComponents = useMemo(
    () => buildPortableTextComponents(),
    [],
  );

  // JSON-LD BlogPosting schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: seoTitle,
    description: seoDescription,
    image: heroImage,
    datePublished: post.publishedAt,
    dateModified: post._createdAt,
    author: {
      "@type": "Person",
      name: "Chris",
      url: "https://yourportfolio.dev",
    },
    publisher: {
      "@type": "Person",
      name: "Chris",
      url: "https://yourportfolio.dev",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    keywords: seoKeywords,
    wordCount: wordCount,
    timeRequired: `PT${readMin}M`,
    articleSection: firstCat?.title ?? "Insights",
  };

  return (
    <>
      {/* ── SEO HEAD ────────────────────────────────────────── */}
      <Head>
        <title>{seoTitle} | Chris.dev</title>
        <meta name="description" content={seoDescription} />
        {seoKeywords && <meta name="keywords" content={seoKeywords} />}
        <link rel="canonical" href={canonicalUrl} />
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        {heroImage && <meta property="og:image" content={heroImage} />}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="article:author" content="Chris" />
        <meta property="article:published_time" content={post.publishedAt} />
        {firstCat && (
          <meta property="article:section" content={firstCat.title} />
        )}
        {post.tags.map((t) => (
          <meta key={t._id} property="article:tag" content={t.title} />
        ))}
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        {heroImage && <meta name="twitter:image" content={heroImage} />}
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
        />
      </Head>

      <div className="bp-root">
        {/* ── READING PROGRESS BAR ────────────────────────── */}
        <div
          id="bp-progress"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Article reading progress"
        />

        {/* ── FLOATING SHARE SIDEBAR ──────────────────────── */}
        <ShareSidebar title={post.title} visible={sidebarVisible} />

        {/* ── STICKY NAV ──────────────────────────────────── */}
        <nav className="bp-nav" aria-label="Site navigation">
          <div className="bp-nav-brand">
            <span className="bp-nav-dot" aria-hidden="true" />
            <Link href="/">
              Chris<span style={{ color: T.burgundy }}>.</span>dev
            </Link>
          </div>

          <nav className="bp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/insights">Insights</Link>
            <span aria-hidden="true">/</span>
            <span
              style={{ color: "rgba(252,252,250,.75)" }}
              aria-current="page"
            >
              {post.title.length > 40
                ? post.title.slice(0, 40) + "…"
                : post.title}
            </span>
          </nav>

          <ul className="bp-nav-links" aria-label="Main navigation">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/insights" className="active">
                Insights
              </Link>
            </li>
            <li>
              <Link href="/contact" className="bp-nav-cta">
                Hire Me
              </Link>
            </li>
          </ul>
        </nav>

        {/* ── ARTICLE HERO ────────────────────────────────── */}
        <header
          className="bp-hero"
          style={{ minHeight: videoEmbed ? "80vh" : "580px" }}
        >
          {videoEmbed ? (
            <div className="bp-hero-video" aria-label="Article video">
              <iframe
                src={videoEmbed}
                title={post.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div
              className={`bp-hero-bg${heroBgLoaded ? " loaded" : ""}`}
              style={{
                backgroundImage: heroImage ? `url('${heroImage}')` : "none",
                background: heroImage
                  ? undefined
                  : "linear-gradient(135deg,#312e32,#221f22)",
              }}
              role="img"
              aria-label={post.image?.alt ?? post.title}
            />
          )}
          <div className="bp-hero-overlay" aria-hidden="true" />
          <div className="bp-hero-mesh" aria-hidden="true" />

          <div className="bp-hero-content">
            {/* Category badges + read time */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "1.25rem",
              }}
            >
              {post.categories.map((cat) => {
                const c = catStyle(cat.slug);
                return (
                  <Link
                    key={cat._id}
                    href={`/insights?cat=${cat.slug}`}
                    className="bp-cat-badge"
                    style={{
                      background: c.bg,
                      borderColor: c.border,
                      color: c.text,
                    }}
                  >
                    {cat.title}
                  </Link>
                );
              })}
              <span className="bp-read-time">
                📖 {readMin} min read · {wordCount.toLocaleString()} words
              </span>
              {post.featured && (
                <span
                  style={{
                    padding: "5px 12px",
                    borderRadius: "999px",
                    fontSize: ".7rem",
                    fontWeight: 700,
                    background: "rgba(255,216,102,.2)",
                    border: "1px solid rgba(255,216,102,.4)",
                    color: T.coral,
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                  }}
                >
                  ⭐ Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="bp-article-title">{post.title}</h1>

            {/* Excerpt */}
            <p className="bp-article-subtitle">{post.excerpt}</p>

            {/* Author + meta */}
            <div className="bp-meta-row">
              <div className="bp-author-pill">
                <div className="bp-author-avatar" aria-hidden="true">
                  C
                </div>
                <div>
                  <span
                    style={{
                      fontSize: ".82rem",
                      fontWeight: 600,
                      color: T.white,
                      display: "block",
                    }}
                  >
                    Chris
                  </span>
                  <span style={{ fontSize: ".7rem", color: T.silver }}>
                    Full-Stack Engineer &amp; Marketer
                  </span>
                </div>
              </div>
              <div className="bp-meta-item">
                <IconCalendar />
                {formatDate(post.publishedAt)}
              </div>
              <div className="bp-meta-item">
                <IconClock />
                {readMin} min read
              </div>
            </div>

            {/* Hero share row */}
            <div className="bp-hero-share-row">
              <span className="bp-share-label">Share</span>
              <ShareButtons title={post.title} />
            </div>
          </div>
        </header>

        {/* ── MAIN ARTICLE LAYOUT ─────────────────────────── */}
        <main>
          <div className="bp-layout">
            {/* ── Article Body ── */}
            <article ref={articleRef}>
              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="bp-tags-row" aria-label="Post tags">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag._id}
                      href={`/insights?tag=${slugify(tag.title)}`}
                      className="bp-tag"
                    >
                      #{tag.title}
                    </Link>
                  ))}
                </div>
              )}

              {/* Post body image (if no video & no hero but image exists) */}
              {post.image?.asset?.url && !videoEmbed && (
                <figure className="bp-figure" style={{ marginBottom: "2rem" }}>
                  <img
                    src={post.image.asset.url}
                    alt={post.image.alt}
                    loading="eager"
                  />
                  {post.image.caption && (
                    <figcaption className="bp-figcaption">
                      {post.image.caption}
                    </figcaption>
                  )}
                </figure>
              )}

              {/* Portable Text body */}
              <div className="bp-prose">
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              </div>

              {/* Article footer: share + author */}
              <footer className="bp-article-footer">
                <p className="bp-af-label">Found this helpful? Share it ✨</p>
                <div className="bp-af-share-row">
                  <ShareButtons title={post.title} />
                </div>
                <AuthorCard />
              </footer>
            </article>

            {/* ── Sticky Sidebar ── */}
            <aside className="bp-sidebar" aria-label="Article sidebar">
              <TOCSidebar
                items={tocItems}
                activeId={activeSection}
                progress={progress}
              />
              <MetaCard
                readMin={readMin}
                publishedAt={post.publishedAt}
                wordCount={wordCount}
                progress={progress}
              />
            </aside>
          </div>
        </main>

        {/* ── RELATED POSTS ───────────────────────────────── */}
        {relatedPosts.length > 0 && (
          <section className="bp-related" aria-label="Related posts">
            <div className="bp-related-inner">
              <div className="bp-related-head">
                <h2 className="bp-related-title">More to Read</h2>
                <Link href="/insights" className="bp-related-link">
                  All posts <IconArrow />
                </Link>
              </div>
              <div className="bp-related-grid">
                {relatedPosts.slice(0, 3).map((rp, i) => (
                  <RelatedPostCard key={rp._id} post={rp} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── BACK CTA ────────────────────────────────────── */}
        <div className="bp-back-cta">
          <p>Ready for more? The next rabbit hole awaits.</p>
          <div className="bp-cta-row">
            <Link href="/insights" className="bp-btn-back">
              ← Back to Insights
            </Link>
            <Link href="/contact" className="bp-btn-primary">
              Work with me <IconArrow />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// USAGE EXAMPLE (App Router)
// ─────────────────────────────────────────────────────────────────────────────
//
// app/insights/[slug]/page.tsx
// ────────────────────────────
// import { getPostBySlug, getRelatedPosts } from "@/sanity/queries";
// import BlogPostPage from "@/components/BlogPostPage";
//
// export async function generateMetadata({ params }) {
//   const post = await getPostBySlug(params.slug);
//   return {
//     title: post.seo?.title ?? post.title,
//     description: post.seo?.description ?? post.excerpt,
//   };
// }
//
// export default async function Page({ params }) {
//   const post = await getPostBySlug(params.slug);
//   const relatedPosts = await getRelatedPosts(post._id, post.categories[0]?.slug);
//   return <BlogPostPage post={post} relatedPosts={relatedPosts} />;
// }
//
// ─────────────────────────────────────────────────────────────────────────────
// SANITY QUERY EXAMPLE
// ─────────────────────────────────────────────────────────────────────────────
//
// export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
//   _id, _createdAt, title,
//   "slug": slug.current,
//   publishedAt,
//   excerpt,
//   image{ asset->{ url, metadata }, alt, caption },
//   video,
//   body[]{
//     ...,
//     _type == "image" => { ..., asset-> },
//   },
//   categories[]->{ _id, title, "slug": slug.current },
//   tags[]->{ _id, title },
//   featured,
//   seo
// }`;
//
// export const relatedPostsQuery = groq`*[
//   _type == "post" &&
//   _id != $currentId &&
//   count(categories[@->slug.current == $catSlug]) > 0
// ] | order(publishedAt desc) [0..2] {
//   _id, title, "slug": slug.current, publishedAt, excerpt,
//   image{ asset->{ url }, alt },
//   categories[]->{ _id, title, "slug": slug.current },
//   "readTime": round(length(pt::text(body)) / 5 / 220)
// }`;
