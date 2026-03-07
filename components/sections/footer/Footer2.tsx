"use client";

/**
 * Footer.tsx
 * ─────────────────────────────────────────────────────────────
 * Portfolio footer — globals.css design system
 * Sections: Brand + Social · Nav · Resources · Tech Stack
 * Strip:    Newsletter CTA
 * Bar:      Copyright · legal links · back-to-top
 * ─────────────────────────────────────────────────────────────
 */

import React, { useState } from "react";
import "@css/styles.css"; // adjust to your import alias
import Newsletter from "./Newsletter";
import { CV, email } from "@/data/socials";
import Link from "next/link";

// ─── Social icon definitions ──────────────────────────────────────────────────
const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/nortoncj", // ← swap
    color: "#fcfcfa",
    hoverColor: "#ab9df2",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/chrisnortonjr", // ← swap
    color: "#fcfcfa",
    hoverColor: "#78dce8",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  // {
  //   label: "X / Twitter",
  //   href: "https://x.com/chrisnortonjr", // ← swap
  //   color: "#fcfcfa",
  //   hoverColor: "#ff6188",
  //   icon: (
  //     <svg
  //       width="17"
  //       height="17"
  //       viewBox="0 0 24 24"
  //       fill="currentColor"
  //       aria-hidden
  //     >
  //       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  //     </svg>
  //   ),
  // },
  {
    label: "Email",
    href: "", // ← swap
    color: "#fcfcfa",
    hoverColor: "#ffd866",
    click: email(),
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
  },
  {
    label: "CV",
    href: "",
    color: "#fcfcfa",
    click: CV(),
    hoverColor: "#a9dc76",
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM16 12V13.5C16 14.8807 17.1193 16 18.5 16V16C19.8807 16 21 14.8807 21 13.5V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
    ),
  },
  {
    label: "RSS Feed",
    href: "/insights/rss.xml",
    color: "#fcfcfa",
    hoverColor: "#a9dc76",
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <circle cx="6.18" cy="17.82" r="2.18" />
        <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
      </svg>
    ),
  },
];

// ─── Tech stack badges ─────────────────────────────────────────────────────────
const TECH_STACK = [
  { name: "Python", icon: "🐍", color: "#ffd866" },
  { name: "JavaScript", icon: "✦", color: "#ffd866" },
  { name: "TypeScript", icon: "🔷", color: "#78dce8" },
  { name: "React", icon: "⚛️", color: "#78dce8" },
  { name: "Next.js", icon: "▲", color: "#fcfcfa" },
  { name: "Docker", icon: "🐳", color: "#78dce8" },
  { name: "AWS", icon: "☁️", color: "#ffd866" },
  { name: "PHP", icon: "🔷", color: "#ab9df2" },
  { name: "Kubernetes", icon: "⎈", color: "#78dce8" },
  { name: "N8N", icon: "⚙️", color: "#a9dc76" },
  { name: "Linux", icon: "🐧", color: "#a9dc76" },
  { name: "Node.js", icon: "🟢", color: "#a9dc76" },
];

// ─── Nav columns ──────────────────────────────────────────────────────────────
const NAV_COLS = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Skills", href: "#skills" },
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Insights", href: "#insights" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      // { label: "Newsletter", href: "/newsletter" },
      // { label: "Tools", href: "/tools" },
      { label: "Blog", href: "/insights" },
      { label: "Open Source", href: "https://github.com/nortoncj" },
      {
        label: "Resume / CV",
        href: "",
        click: CV(),
      },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Web Dev", href: "/projects/web-dev" },
      { label: "Hardware", href: "/projects/hardware" },
      { label: "DevOps & Cloud", href: "/projects/devops" },
      { label: "Automation", href: "/projects/automation" },
      { label: "Hire Me →", href: "/contact" },
    ],
  },
];

// ─── Tiny helper: social icon button ─────────────────────────────────────────
function SocialBtn({
  href,
  label,
  color,
  hoverColor,
  click,
  icon,
}: (typeof SOCIAL_LINKS)[number]) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Link
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={label}
      onClick={
        click
          ? click
          : () => {
              console.log("");
            }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 12,
        background: hovered ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.06)",
        border: `1px solid ${hovered ? hoverColor + "55" : "rgba(255,255,255,.1)"}`,
        color: hovered ? hoverColor : color,
        textDecoration: "none",
        transition: "all 0.22s ease",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? `0 6px 20px ${hoverColor}33` : "none",
        flexShrink: 0,
      }}
    >
      {icon}
    </Link>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="footer-nav"
      style={{
        background: "linear-gradient(180deg, #2d2a2e 0%, #221f22 100%)",
        color: "#fcfcfa",
        borderTop: "1px solid rgba(255,255,255,.06)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      {/* ── Top gradient accent bar ──────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background:
            "linear-gradient(90deg, #ff6188 0%, #fc5fa3 30%, #ab9df2 65%, #78dce8 100%)",
        }}
      />

      {/* ── Background mesh blobs ───────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-10%",
            width: "55vw",
            height: "55vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,97,136,.12) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-5%",
            width: "40vw",
            height: "40vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(171,157,242,.1) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* ════════════════════════════════════════════════════════════
          NEWSLETTER CTA STRIP
      ════════════════════════════════════════════════════════════ */}
      <Newsletter />

      {/* ════════════════════════════════════════════════════════════
          MAIN FOOTER BODY
      ════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "4rem 2rem 3rem",
          display: "grid",
          gridTemplateColumns: "1.6fr repeat(3, 1fr)",
          gap: "3rem",
        }}
        className="footer-grid"
      >
        {/* ── Brand column ─────────────────────────────────────── */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {/* Name + title */}
          <div>
            <h1
              style={{
                fontSize: "1.4rem",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                background:
                  "linear-gradient(135deg,#ff6188 0%,#fc5fa3 50%,#ab9df2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.1,
                marginBottom: "0.2rem",
                fontFamily: "'Inter', Georgia, serif",
              }}
            >
              Chris Norton Jr.
            </h1>
            <h2
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(252,252,250,.45)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Systems Engineer · Full-Stack Dev
            </h2>
          </div>

          {/* Availability badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 14px",
              borderRadius: 999,
              background: "rgba(169,220,118,.12)",
              border: "1px solid rgba(169,220,118,.3)",
              alignSelf: "flex-start",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#a9dc76",
                boxShadow: "0 0 8px #a9dc76",
                animation: "footerPulse 2s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "#a9dc76",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Open to Work
            </span>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: "0.88rem",
              color: "rgba(252,252,250,.55)",
              lineHeight: 1.7,
              maxWidth: 280,
            }}
          >
            Build systems that scale. Results with precision. Turning complex
            engineering problems into elegant, shippable solutions.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {SOCIAL_LINKS.map((s) => (
              <SocialBtn key={s.label} {...s} />
            ))}
          </div>

          {/* Location / timezone */}
          <p
            style={{
              fontSize: "0.72rem",
              color: "rgba(252,252,250,.3)",
              fontFamily: "'JetBrains Mono', monospace",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            EST · Remote-friendly · Available worldwide
          </p>
        </div>

        {/* ── Nav columns ──────────────────────────────────────── */}
        {NAV_COLS.map((col) => (
          <div
            key={col.title}
            style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}
          >
            <h4
              className="footer-title"
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(252,252,250,.35)",
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: "0.25rem",
              }}
            >
              {col.title}
            </h4>
            {col.links.map((link) => (
              <FooterLink
                key={link.label}
                href={link.href}
                label={link.label}
                onClick={link.click}
              />
            ))}
          </div>
        ))}
      </div>

      {/* ── Tech stack strip ──────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 2rem 3rem",
        }}
      >
        <p
          style={{
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(252,252,250,.25)",
            fontFamily: "'JetBrains Mono', monospace",
            marginBottom: "1rem",
          }}
        >
          Tech Stack
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {TECH_STACK.map((tech) => (
            <TechBadge key={tech.name} {...tech} />
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          BOTTOM BAR
      ════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(255,255,255,.06)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "1.25rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          {/* Copyright */}
          <p
            style={{
              fontSize: "0.78rem",
              color: "rgba(252,252,250,.3)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            © {currentYear} Chris Norton Jr. All rights reserved.
          </p>

          {/* Legal links */}
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Sitemap", href: "/sitemap.xml" },
              { label: "RSS", href: "/insights/rss.xml" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(252,252,250,.3)",
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "#ff6188")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(252,252,250,.3)")
                }
              >
                {label}
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,.1)",
              background: "rgba(255,255,255,.05)",
              color: "rgba(252,252,250,.4)",
              fontSize: "0.74rem",
              cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.color = "#ff6188";
              el.style.borderColor = "rgba(255,97,136,.35)";
              el.style.background = "rgba(255,97,136,.08)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.color = "rgba(252,252,250,.4)";
              el.style.borderColor = "rgba(255,255,255,.1)";
              el.style.background = "rgba(255,255,255,.05)";
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
            Top
          </button>
        </div>
      </div>

      {/* ── Injected keyframes ───────────────────────────────────── */}
      <style>{`
        @keyframes footerPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #a9dc76; }
          50%       { opacity: 0.6; box-shadow: 0 0 16px #a9dc76; }
        }

        /* Responsive grid collapse */
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Focus ring */
        footer a:focus-visible,
        footer button:focus-visible {
          outline: 2px solid #ff6188;
          outline-offset: 3px;
        }

        /* Input placeholder */
        footer input::placeholder {
          color: rgba(252,252,250,.3);
        }
      `}</style>
    </footer>
  );
}

// ─── Helper sub-components ────────────────────────────────────────────────────

function FooterLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: any;
}) {
  const [hovered, setHovered] = useState(false);
  const isExternal =
    href.startsWith("http") ||
    href.startsWith("mailto") ||
    href.endsWith(".pdf");

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className="footer-link"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: "0.88rem",
        color: hovered ? "#ff6188" : "rgba(252,252,250,.55)",
        textDecoration: "none",
        transition: "color 0.2s, transform 0.2s",
        transform: hovered ? "translateX(4px)" : "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        lineHeight: 1.4,
      }}
    >
      {label}
      {isExternal && (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
          style={{ opacity: 0.5, flexShrink: 0 }}
        >
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      )}
    </Link>
  );
}

function TechBadge({
  name,
  icon,
  color,
}: {
  name: string;
  icon: string;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "4px 11px",
        borderRadius: 8,
        fontSize: "0.73rem",
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 600,
        background: hovered ? `${color}1a` : "rgba(255,255,255,.05)",
        border: `1px solid ${hovered ? color + "44" : "rgba(255,255,255,.09)"}`,
        color: hovered ? color : "rgba(252,252,250,.45)",
        transition: "all 0.2s ease",
        cursor: "default",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? `0 4px 14px ${color}22` : "none",
      }}
    >
      <span style={{ fontSize: "0.78rem" }}>{icon}</span>
      {name}
    </span>
  );
}
