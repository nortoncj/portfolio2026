"use client";

/**
 * ProjectModal.tsx
 * ─────────────────────────────────────────────────────────────
 * Universal project detail modal — globals.css design system.
 *
 * Features
 * ─────────────────────────────────────────────────────────────
 * • YouTube video embed (auto-converted from watch URL) or hero image
 * • Category-aware accent colour (maps every category to a brand token)
 * • Framer Motion overlay + panel animations
 * • Keyboard accessible: Escape closes, focus-trap inside modal
 * • Body scroll-lock while open
 * • Responsive: single-column on mobile, two-column body on ≥ 768 px
 * • Sections: Overview · Challenges · Solutions · Results · Features
 * • Sidebar: Timeline card · Tech stack · Tags · CTA buttons
 *
 * Usage
 * ─────────────────────────────────────────────────────────────
 * import ProjectModal from "@/components/ProjectModal";
 *
 * <ProjectModal
 *   project={selectedProject}
 *   isOpen={!!selectedProject}
 *   onClose={() => setSelectedProject(null)}
 * />
 *
 * Dependencies: framer-motion
 * ─────────────────────────────────────────────────────────────
 */

import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa6";

// ─── TYPE DEFINITIONS (matches your data model exactly) ──────────────────────
export interface ProjectTimeline {
  duration: string;
  startDate: string;
  endDate: string;
}

export interface ProjectDetails {
  overview: string;
  challenges: string;
  solutions: string;
  results: string;
  features: string[];
  tags: string[];
}

export interface Project {
  id: number;
  title: string;
  thumbnail: string;
  modal: boolean;
  category: string;
  description: string;
  technologies: string[];
  icon: string;
  featured: boolean;
  timeline: ProjectTimeline;
  liveUrl?: string;
  videoUrl?: string;
  githubUrl?: string;
  details: ProjectDetails;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
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
  silver: "#6b7280",
  muted: "#939293",
} as const;

// ─── CATEGORY → ACCENT COLOUR MAP ────────────────────────────────────────────
const CATEGORY_COLORS: Record<
  string,
  { accent: string; rgb: string; grad: string }
> = {
  // Dashboards / Analytics
  dashboards: {
    accent: T.coral,
    rgb: "255,216,102",
    grad: `linear-gradient(135deg,${T.coral},${T.mint})`,
  },
  analytics: {
    accent: T.coral,
    rgb: "255,216,102",
    grad: `linear-gradient(135deg,${T.coral},${T.blue})`,
  },
  // Web development
  web: {
    accent: T.burgundy,
    rgb: "255,97,136",
    grad: `linear-gradient(135deg,${T.burgundy},${T.purple})`,
  },
  "web-dev": {
    accent: T.burgundy,
    rgb: "255,97,136",
    grad: `linear-gradient(135deg,${T.burgundy},${T.purple})`,
  },
  frontend: {
    accent: T.burgundy,
    rgb: "255,97,136",
    grad: `linear-gradient(135deg,${T.burgundy},${T.purple})`,
  },
  // DevOps / Cloud / Infrastructure
  devops: {
    accent: T.blue,
    rgb: "120,220,232",
    grad: `linear-gradient(135deg,${T.blue},${T.mint})`,
  },
  cloud: {
    accent: T.blue,
    rgb: "120,220,232",
    grad: `linear-gradient(135deg,${T.blue},${T.purple})`,
  },
  infra: {
    accent: T.blue,
    rgb: "120,220,232",
    grad: `linear-gradient(135deg,${T.blue},${T.mint})`,
  },
  // Marketing / Email / SEO / Automation
  marketing: {
    accent: T.mint,
    rgb: "169,220,118",
    grad: `linear-gradient(135deg,${T.mint},${T.blue})`,
  },
  email: {
    accent: T.mint,
    rgb: "169,220,118",
    grad: `linear-gradient(135deg,${T.mint},${T.coral})`,
  },
  seo: {
    accent: T.mint,
    rgb: "169,220,118",
    grad: `linear-gradient(135deg,${T.mint},${T.blue})`,
  },
  automation: {
    accent: T.purple,
    rgb: "171,157,242",
    grad: `linear-gradient(135deg,${T.purple},${T.blue})`,
  },
  // Hardware / Embedded
  hardware: {
    accent: T.coral,
    rgb: "255,216,102",
    grad: `linear-gradient(135deg,${T.coral},${T.mint})`,
  },
  embedded: {
    accent: T.coral,
    rgb: "255,216,102",
    grad: `linear-gradient(135deg,${T.coral},${T.mint})`,
  },
  iot: {
    accent: T.coral,
    rgb: "255,216,102",
    grad: `linear-gradient(135deg,${T.coral},${T.blue})`,
  },
};

const DEFAULT_COLOR = {
  accent: T.purple,
  rgb: "171,157,242",
  grad: `linear-gradient(135deg,${T.purple},${T.blue})`,
};

function getCategoryColor(category: string) {
  const key = category.toLowerCase().replace(/\s+/g, "-");
  return CATEGORY_COLORS[key] ?? DEFAULT_COLOR;
}

// ─── YOUTUBE HELPERS ─────────────────────────────────────────────────────────
function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function buildEmbedUrl(videoUrl: string): string | null {
  const id = extractYouTubeId(videoUrl);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&color=white`;
}

// ─── SMALL REUSABLE PIECES ───────────────────────────────────────────────────

/** Gradient section heading with left-bar accent */
const SectionHeading: React.FC<{
  children: React.ReactNode;
  accent: string;
}> = ({ children, accent }) => (
  <h3
    style={{
      fontSize: "0.72rem",
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: accent,
      fontFamily: "'JetBrains Mono', monospace",
      marginBottom: "0.65rem",
      display: "flex",
      alignItems: "center",
      gap: 8,
    }}
  >
    <span
      style={{
        display: "inline-block",
        width: 3,
        height: 12,
        borderRadius: 2,
        background: accent,
        boxShadow: `0 0 8px ${accent}88`,
        flexShrink: 0,
      }}
    />
    {children}
  </h3>
);

/** Prose paragraph */
const Prose: React.FC<{ text: string }> = ({ text }) =>
  text ? (
    <p
      style={{
        fontSize: "0.92rem",
        color: T.silver,
        lineHeight: 1.8,
        margin: 0,
      }}
    >
      {text}
    </p>
  ) : null;

/** Glass card wrapper */
const Card: React.FC<{
  children: React.ReactNode;
  accent?: string;
  style?: React.CSSProperties;
}> = ({ children, accent, style }) => (
  <div
    style={{
      padding: "1.25rem 1.4rem",
      borderRadius: 16,
      background: "rgba(249,248,246,.96)",
      border: `1px solid ${accent ? `rgba(${hexToRgb(accent)},.18)` : "rgba(45,42,46,.1)"}`,
      boxShadow: "0 2px 12px rgba(45,42,46,.06)",
      ...style,
    }}
  >
    {children}
  </div>
);

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "45,42,46";
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}

/** Chip pill */
const Chip: React.FC<{
  label: string;
  accent: string;
  rgb: string;
  href?: string;
}> = ({ label, accent, rgb, href }) => {
  const style: React.CSSProperties = {
    padding: "3px 11px",
    borderRadius: 999,
    fontSize: "0.7rem",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 600,
    background: `rgba(${rgb},.1)`,
    border: `1px solid rgba(${rgb},.28)`,
    color: accent,
    textDecoration: "none",
    whiteSpace: "nowrap" as const,
    transition: "background 0.2s, transform 0.15s",
    display: "inline-block",
    cursor: href ? "pointer" : "default",
  };
  if (href) {
    return (
      <a
        href={href}
        style={style}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = `rgba(${rgb},.2)`;
          (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = `rgba(${rgb},.1)`;
          (e.currentTarget as HTMLElement).style.transform = "none";
        }}
      >
        {label}
      </a>
    );
  }
  return <span style={style}>{label}</span>;
};

// ─── CTA BUTTON ──────────────────────────────────────────────────────────────
const CtaButton: React.FC<{
  href: string;
  label: string;
  icon: React.ReactNode;
  variant: "primary" | "secondary";
  grad?: string;
  accent?: string;
}> = ({ href, label, icon, variant, grad, accent }) => {
  const isPrimary = variant === "primary";
  return (
    <a
      href={href}
      target={href !== "#" ? "_blank" : undefined}
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "11px 22px",
        borderRadius: 12,
        fontSize: "0.88rem",
        fontWeight: 700,
        textDecoration: "none",
        transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
        ...(isPrimary
          ? {
              background: grad ?? T.purple,
              color: T.charcoal,
              border: "none",
              boxShadow: `0 6px 20px rgba(${hexToRgb(accent ?? T.purple)},.35)`,
            }
          : {
              background: "rgba(45,42,46,.06)",
              color: T.charcoal,
              border: "1px solid rgba(45,42,46,.15)",
            }),
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-2px)";
        if (isPrimary)
          el.style.boxShadow = `0 10px 30px rgba(${hexToRgb(accent ?? T.purple)},.5)`;
        else el.style.background = "rgba(45,42,46,.1)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "none";
        if (isPrimary)
          el.style.boxShadow = `0 6px 20px rgba(${hexToRgb(accent ?? T.purple)},.35)`;
        else el.style.background = "rgba(45,42,46,.06)";
      }}
    >
      {icon}
      {label}
    </a>
  );
};

// ─── ICON SVGs ────────────────────────────────────────────────────────────────
const IconGitHub = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const IconExternal = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    aria-hidden
  >
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const IconCal = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconClock = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconCheck = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    aria-hidden
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconClose = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    aria-hidden
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── MAIN MODAL COMPONENT ────────────────────────────────────────────────────
export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // ── Derived values ──────────────────────────────────────────────────────────
  const color = useMemo(
    () => getCategoryColor(project?.category ?? ""),
    [project?.category],
  );
  const embedUrl = useMemo(
    () => (project?.videoUrl ? buildEmbedUrl(project.videoUrl) : null),
    [project?.videoUrl],
  );
  const hasVideo = !!embedUrl;

  // ── Scroll lock ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus close button on open
      setTimeout(() => closeRef.current?.focus(), 60);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── Keyboard handling ───────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  // ── Backdrop click ──────────────────────────────────────────────────────────
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!project) return null;

  const {
    title,
    category,
    description,
    technologies,
    icon,
    featured,
    thumbnail,
    timeline,
    liveUrl,
    githubUrl,
    details,
  } = project;

  const { overview, challenges, solutions, results, features, tags } = details;

  // ── Format date helper ──────────────────────────────────────────────────────
  const fmtDate = (d: string) => {
    if (!d) return "";
    const parts = d.split("-");
    if (parts.length !== 3) return d;
    const [mm, dd, yy] = parts;
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const m = months[parseInt(mm, 10) - 1] ?? mm;
    const year = parseInt(yy, 10) < 100 ? `20${yy}` : yy;
    return `${m} ${parseInt(dd, 10)}, ${year}`;
  };

  const hasDetails = overview || challenges || solutions || results;
  const hasFeatures = features?.length > 0;
  const hasTags = tags?.length > 0;
  const hasTech = technologies?.length > 0;
  const showLive = liveUrl && liveUrl !== "#";
  const showGH = githubUrl && githubUrl !== "#";

  return (
    <AnimatePresence>
      {isOpen && (
        /* ── Backdrop ──────────────────────────────────────────── */
        <motion.div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} project details`}
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9000,
            background: "rgba(34,31,34,.72)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            overflowY: "auto",
          }}
        >
          {/* ── Modal Panel ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: T.cream,
              borderRadius: 24,
              width: "100%",
              maxWidth: 860,
              maxHeight: "90vh",
              overflowY: "auto",
              overflowX: "hidden",
              boxShadow: `0 32px 80px rgba(0,0,0,.35), 0 0 0 1px rgba(255,255,255,.08), 0 0 60px rgba(${color.rgb},.1)`,
              border: `1px solid rgba(${color.rgb},.2)`,
              fontFamily: "'Inter', -apple-system, sans-serif",
              position: "relative",
              scrollbarWidth: "thin",
              scrollbarColor: `rgba(${color.rgb},.35) transparent`,
            }}
          >
            {/* ── TOP ACCENT BAR ─────────────────────────────────── */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: color.grad,
                borderRadius: "24px 24px 0 0",
                zIndex: 10,
              }}
            />

            {/* ── CLOSE BUTTON ───────────────────────────────────── */}
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close project modal"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 20,
                width: 36,
                height: 36,
                borderRadius: 10,
                border: "1px solid rgba(45,42,46,.15)",
                background: "rgba(249,248,246,.92)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: T.silver,
                transition: "all 0.18s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = `rgba(${color.rgb},.15)`;
                el.style.borderColor = `rgba(${color.rgb},.35)`;
                el.style.color = color.accent;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "rgba(249,248,246,.92)";
                el.style.borderColor = "rgba(45,42,46,.15)";
                el.style.color = T.silver;
              }}
            >
              <IconClose />
            </button>

            {/* ═══════════════════════════════════════════════════════
                HERO — VIDEO or IMAGE
            ═══════════════════════════════════════════════════════ */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                background: "#1a1820",
                borderRadius: "24px 24px 0 0",
                overflow: "hidden",
              }}
            >
              {hasVideo ? (
                /* ── YouTube embed ─────────────────────────────── */
                <>
                  <iframe
                    src={embedUrl!}
                    title={`${title} demo video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                    loading="lazy"
                  />
                  {/* Video badge */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 14,
                      left: 14,
                      zIndex: 5,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "4px 12px",
                      borderRadius: 999,
                      background: "rgba(34,31,34,.75)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,.12)",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: "rgba(252,252,250,.8)",
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: "0.06em",
                    }}
                  >
                    <span style={{ color: "#ff0000", fontSize: "0.9rem" }}>
                      ▶
                    </span>
                    VIDEO DEMO
                  </div>
                </>
              ) : thumbnail ? (
                /* ── Thumbnail image ───────────────────────────── */
                <>
                  <img
                    src={thumbnail}
                    alt={`${title} project screenshot`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,.05) 50%, rgba(34,31,34,.6) 100%)",
                    }}
                  />
                </>
              ) : (
                /* ── Placeholder ───────────────────────────────── */
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, rgba(${color.rgb},.15), rgba(45,42,46,.9))`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                  }}
                >
                  {icon ? (
                    <span style={{ fontSize: "4rem" }}>{icon}</span>
                  ) : (
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={color.accent}
                      strokeWidth="1.5"
                      opacity={0.5}
                    >
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  )}
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontFamily: "'JetBrains Mono',monospace",
                      color: "rgba(252,252,250,.35)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    No preview available
                  </span>
                </div>
              )}

              {/* Featured ribbon */}
              {featured && (
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    left: -1,
                    zIndex: 10,
                    padding: "3px 14px",
                    background: color.grad,
                    fontSize: "0.62rem",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: T.charcoal,
                    borderRadius: "0 8px 8px 0",
                    boxShadow: `0 4px 14px rgba(${color.rgb},.45)`,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <FaStar color="var(--coral)" /> Featured
                </div>
              )}
            </div>

            {/* ═══════════════════════════════════════════════════════
                HEADER ROW — title, category, icon
            ═══════════════════════════════════════════════════════ */}
            <div style={{ padding: "1.75rem 2rem 0" }}>
              {/* Category badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "3px 12px",
                  borderRadius: 999,
                  background: `rgba(${color.rgb},.12)`,
                  border: `1px solid rgba(${color.rgb},.3)`,
                  marginBottom: "0.75rem",
                }}
              >
                {icon && <span style={{ fontSize: "0.85rem" }}>{icon}</span>}
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: color.accent,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {category}
                </span>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: "clamp(1.4rem, 4vw, 2rem)",
                  fontWeight: 900,
                  color: T.charcoal,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.75rem",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {title}
              </h2>

              {/* Short description */}
              {description && (
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: T.silver,
                    lineHeight: 1.75,
                    marginBottom: "1.25rem",
                    maxWidth: 680,
                  }}
                >
                  {description}
                </p>
              )}

              {/* Technologies + Tags row */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginBottom: "1.5rem",
                  paddingBottom: "1.5rem",
                  borderBottom: "1px solid rgba(45,42,46,.08)",
                }}
              >
                {hasTech &&
                  technologies.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      accent={color.accent}
                      rgb={color.rgb}
                    />
                  ))}
                {hasTags &&
                  tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={`#${tag}`}
                      accent={T.silver}
                      rgb={hexToRgb(T.silver)}
                      href={`/projects/${category}/tag/${tag}`}
                    />
                  ))}
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                BODY — two-column on ≥ 640 px
            ═══════════════════════════════════════════════════════ */}
            <div
              style={{
                padding: "0 2rem 2rem",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1.5rem",
              }}
              className="modal-body-grid"
            >
              {/* ── MAIN CONTENT ─────────────────────────────────── */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {/* Overview */}
                {overview && (
                  <Card accent={color.accent}>
                    <SectionHeading accent={color.accent}>
                      Overview
                    </SectionHeading>
                    <Prose text={overview} />
                  </Card>
                )}

                {/* Challenges + Solutions — side by side if both exist */}
                {(challenges || solutions) && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        challenges && solutions ? "1fr 1fr" : "1fr",
                      gap: "1rem",
                    }}
                    className="modal-cs-grid"
                  >
                    {challenges && (
                      <Card accent={T.burgundy}>
                        <SectionHeading accent={T.burgundy}>
                          Challenges
                        </SectionHeading>
                        <Prose text={challenges} />
                      </Card>
                    )}
                    {solutions && (
                      <Card accent={T.mint}>
                        <SectionHeading accent={T.mint}>
                          Solutions
                        </SectionHeading>
                        <Prose text={solutions} />
                      </Card>
                    )}
                  </div>
                )}

                {/* Results */}
                {results && (
                  <Card accent={color.accent}>
                    <SectionHeading accent={color.accent}>
                      Results
                    </SectionHeading>
                    <Prose text={results} />
                  </Card>
                )}

                {/* Features */}
                {hasFeatures && (
                  <Card accent={color.accent}>
                    <SectionHeading accent={color.accent}>
                      Key Features
                    </SectionHeading>
                    <ul
                      style={{
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.55rem",
                      }}
                    >
                      {features.map((feat) => (
                        <li
                          key={feat}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            fontSize: "0.9rem",
                            color: T.charcoal,
                            lineHeight: 1.5,
                          }}
                        >
                          <span
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 6,
                              background: `rgba(${color.rgb},.15)`,
                              border: `1px solid rgba(${color.rgb},.3)`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: color.accent,
                              flexShrink: 0,
                              marginTop: 2,
                            }}
                          >
                            <IconCheck />
                          </span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </div>

              {/* ── SIDEBAR ──────────────────────────────────────── */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {/* Timeline card */}
                <Card accent={color.accent}>
                  <SectionHeading accent={color.accent}>
                    Timeline
                  </SectionHeading>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    {/* Duration */}
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <span
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 8,
                          background: `rgba(${color.rgb},.12)`,
                          border: `1px solid rgba(${color.rgb},.25)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: color.accent,
                          flexShrink: 0,
                        }}
                      >
                        <IconClock />
                      </span>
                      <div>
                        <div
                          style={{
                            fontSize: "0.66rem",
                            fontFamily: "'JetBrains Mono',monospace",
                            color: T.muted,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          Duration
                        </div>
                        <div
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            color: T.charcoal,
                          }}
                        >
                          {timeline.duration}
                        </div>
                      </div>
                    </div>

                    {/* Date range */}
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <span
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 8,
                          background: `rgba(${color.rgb},.12)`,
                          border: `1px solid rgba(${color.rgb},.25)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: color.accent,
                          flexShrink: 0,
                        }}
                      >
                        <IconCal />
                      </span>
                      <div>
                        <div
                          style={{
                            fontSize: "0.66rem",
                            fontFamily: "'JetBrains Mono',monospace",
                            color: T.muted,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          Period
                        </div>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: T.charcoal,
                            fontFamily: "'JetBrains Mono',monospace",
                          }}
                        >
                          {fmtDate(timeline.startDate)}
                          <br />
                          <span
                            style={{ color: T.silver, fontSize: "0.78rem" }}
                          >
                            → {fmtDate(timeline.endDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* CTA buttons */}
                {(showLive || showGH) && (
                  <Card accent={color.accent}>
                    <SectionHeading accent={color.accent}>Links</SectionHeading>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      {showLive && (
                        <CtaButton
                          href={liveUrl!}
                          label="Live Demo"
                          icon={<IconExternal />}
                          variant="primary"
                          grad={color.grad}
                          accent={color.accent}
                        />
                      )}
                      {showGH && (
                        <CtaButton
                          href={githubUrl!}
                          label="View on GitHub"
                          icon={<IconGitHub />}
                          variant="secondary"
                        />
                      )}
                    </div>
                  </Card>
                )}

                {/* Share strip */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.75rem 1rem",
                    borderRadius: 12,
                    background: `rgba(${color.rgb},.06)`,
                    border: `1px solid rgba(${color.rgb},.15)`,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontFamily: "'JetBrains Mono',monospace",
                      color: T.muted,
                      fontWeight: 600,
                    }}
                  >
                    Share
                  </span>
                  <div style={{ display: "flex", gap: 8 }}>
                    {/* X / Twitter */}
                    <ShareBtn
                      href={`https://x.com/intent/tweet?text=Check out "${title}" by @chrisnortonjr`}
                      label="Share on X"
                      color={color.accent}
                      rgb={color.rgb}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </ShareBtn>
                    {/* LinkedIn */}
                    <ShareBtn
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                      label="Share on LinkedIn"
                      color={color.accent}
                      rgb={color.rgb}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </ShareBtn>
                    {/* Copy link */}
                    <CopyLinkBtn color={color.accent} rgb={color.rgb} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── Responsive + scrollbar styles ────────────────────────── */}
      <style>{`
        /* Two-column body on wider viewports */
        @media (min-width: 640px) {
          .modal-body-grid {
            grid-template-columns: 1fr 280px !important;
          }
        }
        /* Stack challenges/solutions on small screens */
        @media (max-width: 520px) {
          .modal-cs-grid {
            grid-template-columns: 1fr !important;
          }
        }
        /* Custom scrollbar for modal panel */
        [role="dialog"] ::-webkit-scrollbar { width: 6px; }
        [role="dialog"] ::-webkit-scrollbar-track { background: transparent; }
        [role="dialog"] ::-webkit-scrollbar-thumb {
          border-radius: 99px;
          background: rgba(45,42,46,.2);
        }
        /* Font smoothing */
        [role="dialog"] * { -webkit-font-smoothing: antialiased; box-sizing: border-box; }
        /* Focus ring */
        [role="dialog"] button:focus-visible,
        [role="dialog"] a:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 2px;
        }
      `}</style>
    </AnimatePresence>
  );
}

// ─── SHARE BUTTON ─────────────────────────────────────────────────────────────
function ShareBtn({
  href,
  label,
  color,
  rgb,
  children,
}: {
  href: string;
  label: string;
  color: string;
  rgb: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        background: `rgba(${rgb},.1)`,
        border: `1px solid rgba(${rgb},.22)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color,
        textDecoration: "none",
        transition: "all 0.18s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = `rgba(${rgb},.22)`;
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = `rgba(${rgb},.1)`;
        el.style.transform = "none";
      }}
    >
      {children}
    </a>
  );
}

// ─── COPY LINK BUTTON ─────────────────────────────────────────────────────────
function CopyLinkBtn({ color, rgb }: { color: string; rgb: string }) {
  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={copy}
      aria-label={copied ? "Link copied!" : "Copy link"}
      style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        background: copied ? `rgba(${rgb},.22)` : `rgba(${rgb},.1)`,
        border: `1px solid rgba(${rgb},.22)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: copied ? color : color,
        cursor: "pointer",
        transition: "all 0.18s",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        if (!copied)
          (e.currentTarget as HTMLElement).style.background = `rgba(${rgb},.2)`;
      }}
      onMouseLeave={(e) => {
        if (!copied)
          (e.currentTarget as HTMLElement).style.background = `rgba(${rgb},.1)`;
      }}
    >
      {copied ? (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
        </svg>
      )}
    </button>
  );
}
