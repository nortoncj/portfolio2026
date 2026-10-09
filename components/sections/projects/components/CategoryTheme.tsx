import type { ImageLoader } from "next/image";
import type { ComponentType } from "react";

// ---------------------------------------------------------------------------
// Types (match PROJECTS_INDEX_QUERY)
// ---------------------------------------------------------------------------
export type ProjectStatus = "live" | "in-progress" | "archived";

export type ProjectImage = {
  url: string;
  alt: string;
  lqip?: string | null;
};

export type ProjectCardData = {
  _id: string;
  title: string;
  slug: string;
  summary?: string | null;
  impact?: string | null;
  status?: ProjectStatus | null;
  projectType?: string | null;
  techStack?: string[] | null;
  featured?: boolean | null;
  category?: { title: string; slug: string } | null;
  image?: ProjectImage | null;
};

export type CategoryData = {
  _id: string;
  title: string;
  slug: string;
};

export type CategorySummary = CategoryData & {
  count: number;
  topStack: string[];
};

export type ProjectsIndexData = {
  categories: CategoryData[];
  featured: ProjectCardData[];
  projects: ProjectCardData[];
};

// ---------------------------------------------------------------------------
// Icons (inline so there's no icon library dependency)
// ---------------------------------------------------------------------------
type IconProps = { className?: string };

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function BoltIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}

function CodeIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  );
}

function ServerIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </svg>
  );
}

function ChipIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </svg>
  );
}

function SparkIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} strokeWidth={2} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Category themes (colors pulled from your design system)
// ---------------------------------------------------------------------------
export type CategoryTheme = {
  gradient: string;
  accent: string;
  glow: string;
  tagline: string;
  Icon: ComponentType<IconProps>;
};

const THEMES: Record<string, CategoryTheme> = {
  devops: {
    gradient: "linear-gradient(135deg, #78dce8, #ab9df2)", // coolFlow
    accent: "#78dce8",
    glow: "rgba(120, 220, 232, 0.22)",
    tagline:
      "Cloud and infrastructure that stays up, so nobody gets the 3 a.m. phone call.",
    Icon: ServerIcon,
  },
  engineering: {
    gradient: "linear-gradient(135deg, #a9dc76, #78dce8)",
    accent: "#a9dc76",
    glow: "rgba(169, 220, 118, 0.22)",
    tagline:
      "Electronics and embedded systems, taken from schematic to a working device.",
    Icon: ChipIcon,
  },
  software: {
    gradient: "linear-gradient(135deg, #e8365d, #ff6188, #ab9df2)", // heroVibrant
    accent: "#ff6188",
    glow: "rgba(255, 97, 136, 0.2)",
    tagline: "Websites and apps built to turn visitors into customers.",
    Icon: CodeIcon,
  },
  growth: {
    gradient: "linear-gradient(135deg, #ffd866, #e8365d)", // warmGlow
    accent: "#ff8c69",
    glow: "rgba(255, 140, 105, 0.22)",
    tagline:
      "Dashboards, emails, and automations that keep revenue moving while you sleep.",
    Icon: BoltIcon,
  },
};

const FALLBACK_THEME: CategoryTheme = {
  gradient: "linear-gradient(135deg, #e8365d, #ff6188, #ab9df2)",
  accent: "#ab9df2",
  glow: "rgba(171, 157, 242, 0.22)",
  tagline: "",
  Icon: SparkIcon,
};

export function getCategoryTheme(slug?: string | null): CategoryTheme {
  return (slug && THEMES[slug]) || FALLBACK_THEME;
}

// DevOps and Hardware first because that's where the job hunt is aimed.
// If this page is mostly for agency clients, flip the order.
export const CATEGORY_ORDER = [
  "devops",
  "engineering",
  "software",
  "growth",
];

function rank(slug: string) {
  const i = CATEGORY_ORDER.indexOf(slug);
  return i === -1 ? CATEGORY_ORDER.length : i;
}

/** Top N tech by frequency inside a category, case-insensitive. */
function topStack(projects: ProjectCardData[], n = 3): string[] {
  const freq = new Map<string, { label: string; count: number }>();
  for (const p of projects) {
    for (const t of p.techStack ?? []) {
      const k = t.toLowerCase();
      const hit = freq.get(k);
      if (hit) hit.count += 1;
      else freq.set(k, { label: t, count: 1 });
    }
  }
  return [...freq.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, n)
    .map((e) => e.label);
}

export function buildCategorySummaries(
  categories: CategoryData[],
  projects: ProjectCardData[],
): CategorySummary[] {
  return [...categories]
    .sort((a, b) => rank(a.slug) - rank(b.slug))
    .map((c) => {
      const inCategory = projects.filter((p) => p.category?.slug === c.slug);
      return { ...c, count: inCategory.length, topStack: topStack(inCategory) };
    })
    .filter((c) => c.count > 0);
}

// ---------------------------------------------------------------------------
// Display helpers
// ---------------------------------------------------------------------------
const TYPE_LABELS: Record<string, string> = {
  data: "Data",
  email: "Email",
  wordpress: "WordPress",
  nodejs: "Node.js",
  clickfunnels: "ClickFunnels",
  iot: "IoT",
  cloud: "Cloud",
  devops: "DevOps",
  hardware: "Hardware",
};

export function prettyType(type?: string | null): string | null {
  if (!type) return null;
  return TYPE_LABELS[type.toLowerCase()] ?? type;
}

/**
 * next/image loader that lets Sanity's CDN do the resizing + format
 * conversion. Means you don't need remotePatterns in next.config.
 */
export const sanityLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
};
