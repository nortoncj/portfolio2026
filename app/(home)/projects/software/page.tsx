"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";

// ─── DESIGN TOKENS (mirrors globals.css :root) ───────────────────────────────
const T = {
  // Brand palette
  burgundy: "#ff6188",
  magenta: "#fc5fa3",
  purple: "#ab9df2",
  coral: "#ffd866",
  mint: "#a9dc76",
  blue: "#78dce8",
  // Light-theme surfaces
  white: "#fcfcfa",
  cream: "#f9f8f6",
  charcoal: "#2d2a2e",
  slate: "#221f22",
  mid: "#3a3742",
  silver: "#6b7280",
  muted: "#939293",
  // Web Dev primary accent — burgundy/magenta duo
  cat: "#ff6188",
  catRgb: "255,97,136",
  catDark: "#e0456f",
  catGlow: "rgba(255,97,136,0.28)",
  // Gradients
  gradPrimary: "linear-gradient(135deg,#ff6188 0%,#fc5fa3 50%,#ab9df2 100%)",
  gradWeb: "linear-gradient(135deg,#ff6188,#ab9df2)",
  gradCool: "linear-gradient(135deg,#ab9df2,#78dce8)",
  gradWarm: "linear-gradient(135deg,#ff6188,#ffd866)",
} as const;

// ─── TYPE DEFINITIONS ─────────────────────────────────────────────────────────
type SkillCategory =
  | "frontend"
  | "backend"
  | "devops"
  | "design"
  | "languages"
  | "tools";
type ProjectStatus = "completed" | "in-progress" | "concept";

interface Skill {
  id: string;
  name: string;
  icon: IconType;
  color?: string;
  level: number; // 0–100
  levelLabel: "Expert" | "Advanced" | "Intermediate" | "Familiar";
  category: SkillCategory;
  tags: string[];
  yearsExp: number;
}

// ─── MOCK DATA — Skills ───────────────────────────────────────────────────────
const SKILLS: Skill[] = [
  {
    id: "react",
    name: "React / Next.js",
    icon: FaReact,
    level: 94,
    levelLabel: "Expert",
    category: "frontend",
    tags: ["jsx", "hooks", "server-components", "app-router"],
    yearsExp: 5,
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: SiTypescript,
    level: 90,
    levelLabel: "Expert",
    category: "languages",
    tags: ["generics", "utility-types", "zod", "strict"],
    yearsExp: 4,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: RiTailwindCssFill,
    level: 95,
    levelLabel: "Expert",
    category: "frontend",
    tags: ["utility-first", "responsive", "dark-mode", "animations"],
    yearsExp: 4,
  },
  {
    id: "nodejs",
    name: "Node.js / Express",
    icon: FaNode,
    level: 88,
    levelLabel: "Expert",
    category: "backend",
    tags: ["rest-api", "middleware", "auth", "express"],
    yearsExp: 5,
  },
  {
    id: "postgres",
    name: "PostgreSQL / Supabase",
    icon: BiLogoPostgresql,
    level: 83,
    levelLabel: "Advanced",
    category: "backend",
    tags: ["sql", "rls", "realtime", "functions"],
    yearsExp: 4,
  },
  {
    id: "graphql",
    name: "GraphQL / REST",
    icon: SiGraphql,
    level: 80,
    levelLabel: "Advanced",
    category: "backend",
    tags: ["apollo", "resolvers", "schema", "subscriptions"],
    yearsExp: 3,
  },
  {
    id: "docker",
    name: "Docker / Compose",
    icon: FaDocker,
    level: 85,
    levelLabel: "Advanced",
    category: "devops",
    tags: ["containerization", "multi-stage", "volumes", "networks"],
    yearsExp: 4,
  },
  {
    id: "cicd",
    name: "CI/CD — GitHub Actions",
    icon: FaGear,
    level: 82,
    levelLabel: "Advanced",
    category: "devops",
    tags: ["workflows", "runners", "secrets", "matrix"],
    yearsExp: 3,
  },
  {
    id: "figma",
    name: "Figma / UI Design",
    icon: FaDrawPolygon,
    level: 76,
    levelLabel: "Intermediate",
    category: "design",
    tags: ["components", "auto-layout", "prototyping", "design-tokens"],
    yearsExp: 3,
  },
  {
    id: "animations",
    name: "GSAP / Framer Motion",
    icon: FaPlaneCircleExclamation,
    level: 85,
    levelLabel: "Advanced",
    category: "frontend",
    tags: ["scroll-trigger", "timeline", "spring", "intersection"],
    yearsExp: 3,
  },
  {
    id: "seo",
    name: "Technical SEO",
    icon: DiGoogleAnalytics,
    level: 88,
    levelLabel: "Expert",
    category: "tools",
    tags: ["schema.org", "core-web-vitals", "lighthouse", "og-meta"],
    yearsExp: 4,
  },
  {
    id: "python",
    name: "Python / FastAPI",
    icon: FaPython,
    level: 80,
    levelLabel: "Advanced",
    category: "languages",
    tags: ["fastapi", "pydantic", "async", "scripting"],
    yearsExp: 4,
  },
];

// ─── MOCK DATA — Projects ─────────────────────────────────────────────────────

import { Web as PROJECTS } from "@/data/project";
import { Project } from "@/types/Post";
import { IconType } from "react-icons";
import {
  FaDocker,
  FaDrawPolygon,
  FaGear,
  FaNode,
  FaPlaneCircleExclamation,
  FaPython,
  FaReact,
} from "react-icons/fa6";
import { SiGraphql, SiTypescript } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { DiGoogleAnalytics } from "react-icons/di";
import WebDev from "@images/webdev.jpg";
import ProjectModal from "@/components/partials/projectModals";

// ─── DERIVED CONSTANTS ────────────────────────────────────────────────────────
const ALL_TAGS = Array.from(new Set(PROJECTS.flatMap((p) => p.tags))).sort();

const SKILL_CATEGORIES: {
  id: SkillCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "All Skills" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "devops", label: "DevOps" },
  { id: "languages", label: "Languages" },
  { id: "design", label: "Design" },
  { id: "tools", label: "Tools" },
];

const STATUS_COLORS: Record<
  ProjectStatus,
  { bg: string; border: string; color: string; label: string }
> = {
  completed: {
    bg: "rgba(169,220,118,.18)",
    border: "rgba(169,220,118,.45)",
    color: T.mint,
    label: "Completed",
  },
  "in-progress": {
    bg: "rgba(120,220,232,.18)",
    border: "rgba(120,220,232,.45)",
    color: T.blue,
    label: "In Progress",
  },
  concept: {
    bg: "rgba(147,146,147,.18)",
    border: "rgba(147,146,147,.35)",
    color: T.muted,
    label: "Concept",
  },
};

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1], delay: i * 0.08 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  },
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

/** Animated proficiency bar */
const SkillBar: React.FC<{ level: number; color?: string }> = ({
  level,
  color = T.burgundy,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      style={{
        height: 5,
        borderRadius: 4,
        background: "rgba(45,42,46,.12)",
        overflow: "hidden",
        marginTop: 6,
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: inView ? `${level}%` : 0 }}
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        style={{
          height: "100%",
          borderRadius: 4,
          background: `linear-gradient(90deg, ${color}, ${T.purple})`,
          boxShadow: `0 0 8px ${color}55`,
        }}
      />
    </div>
  );
};

/** Level badge pill */
const LevelBadge: React.FC<{ label: string }> = ({ label }) => {
  const colors: Record<string, { bg: string; color: string }> = {
    Expert: { bg: "rgba(255,97,136,.15)", color: T.burgundy },
    Advanced: { bg: "rgba(171,157,242,.15)", color: T.purple },
    Intermediate: { bg: "rgba(120,220,232,.15)", color: T.blue },
    Familiar: { bg: "rgba(147,146,147,.15)", color: T.muted },
  };
  const c = colors[label] ?? colors["Familiar"];
  return (
    <span
      style={{
        padding: "2px 9px",
        borderRadius: 999,
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        background: c.bg,
        color: c.color,
        border: `1px solid ${c.color}55`,
        fontFamily: "'JetBrains Mono', monospace",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
};

/** Skill card */
const SkillCard: React.FC<{ skill: Skill; index: number }> = ({
  skill,
  index,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      key={index}
      custom={index % 4}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -5, borderColor: `${T.burgundy}55` }}
      style={{
        padding: "1.25rem",
        borderRadius: 16,
        background: "rgba(249,248,246,.9)",
        border: "1px solid rgba(255,97,136,.15)",
        backdropFilter: "blur(12px)",
        boxShadow:
          "0 2px 12px rgba(45,42,46,.06), 0 0 0 1px rgba(255,97,136,.06)",
        transition: "border-color 0.3s, box-shadow 0.3s",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {/* Icon + name row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 2,
        }}
      >
        <span
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "rgba(255,97,136,.1)",
            border: "1px solid rgba(255,97,136,.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            flexShrink: 0,
          }}
        >
          <skill.icon className={skill.color} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "0.88rem",
              fontWeight: 700,
              color: T.charcoal,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {skill.name}
          </div>
          {/* <div
            style={{
              fontSize: "0.7rem",
              color: T.silver,
              fontFamily: "'JetBrains Mono',monospace",
            }}
          >
            {skill.yearsExp} yr{skill.yearsExp !== 1 ? "s" : ""} exp
          </div> */}
        </div>
        {/* <LevelBadge label={skill.levelLabel} /> */}
      </div>

      {/* Proficiency bar */}
      {/* <SkillBar level={skill.level} /> */}

      {/* Tag chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
        {skill.tags.slice(0, 3).map((tag) => (
          <a
            key={tag}
            href={`/projects/web-dev/skill/${tag}`}
            style={{
              padding: "2px 8px",
              borderRadius: 6,
              fontSize: "0.66rem",
              fontFamily: "'JetBrains Mono',monospace",
              background: "rgba(255,97,136,.07)",
              border: "1px solid rgba(255,97,136,.18)",
              color: T.silver,
              textDecoration: "none",
              transition: "color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = T.burgundy;
              el.style.background = "rgba(255,97,136,.14)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = T.silver;
              el.style.background = "rgba(255,97,136,.07)";
            }}
          >
            #{tag}
          </a>
        ))}
      </div>
    </motion.div>
  );
};

/** Project card with hover-reveal overlay */
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  onClick: (p: Project) => void;
}> = ({ project, index, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const status = STATUS_COLORS[project.status];

  return (
    <motion.article
      ref={ref}
      custom={index % 3}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      itemScope
      onClick={() => onClick(project)}
      itemType="https://schema.org/SoftwareApplication"
      style={{
        borderRadius: 24,
        overflow: "hidden",
        background: "rgba(249,248,246,.95)",
        border: "1px solid rgba(255,97,136,.12)",
        boxShadow: "0 4px 20px rgba(45,42,46,.08)",
        transition: "box-shadow 0.35s, border-color 0.35s, transform 0.35s",
        cursor: "pointer",
        position: "relative",
      }}
      whileHover={{
        y: -7,
        boxShadow: `0 20px 60px rgba(0,0,0,.12), 0 0 30px rgba(${T.catRgb},.18)`,
        borderColor: `rgba(${T.catRgb},.35)`,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Featured ribbon */}
      {project.featured && (
        <div
          style={{
            position: "absolute",
            top: 14,
            left: -1,
            zIndex: 4,
            padding: "3px 12px",
            background: T.gradPrimary,
            fontSize: "0.65rem",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: T.white,
            borderRadius: "0 8px 8px 0",
            boxShadow: `0 4px 12px rgba(${T.catRgb},.4)`,
          }}
        >
          ⭐ Featured
        </div>
      )}

      {/* Image */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16/10",
          overflow: "hidden",
        }}
      >
        <motion.img
          src={project.image}
          alt={`${project.title} — web development project`}
          loading="lazy"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          itemProp="image"
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(249,248,246,.08) 0%, rgba(45,42,46,.45) 100%)",
          }}
        />

        {/* Hover reveal panel */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.28 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(45,42,46,.88)",
                backdropFilter: "blur(4px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "1.5rem",
                zIndex: 3,
              }}
            >
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "rgba(252,252,250,.85)",
                  lineHeight: 1.65,
                  marginBottom: "1rem",
                }}
              >
                {project.longDesc}
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status badge */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 4,
            padding: "4px 11px",
            borderRadius: 999,
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            background: status.bg,
            color: status.color,
            border: `1px solid ${status.border}`,
            backdropFilter: "blur(6px)",
          }}
        >
          {status.label}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "1.25rem 1.4rem 1.4rem" }}>
        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            marginBottom: "0.75rem",
          }}
        >
          {project.tags.slice(0, 4).map((tag) => (
            <a
              key={tag}
              href={`/projects/web-dev/tag/${tag}`}
              style={{
                padding: "2px 9px",
                borderRadius: 6,
                fontSize: "0.64rem",
                fontFamily: "'JetBrains Mono',monospace",
                background: "rgba(255,97,136,.08)",
                border: "1px solid rgba(255,97,136,.2)",
                color: T.burgundy,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {tag}
            </a>
          ))}
          {project.tags.length > 4 && (
            <span
              style={{
                padding: "2px 9px",
                borderRadius: 6,
                fontSize: "0.64rem",
                fontFamily: "'JetBrains Mono',monospace",
                background: "rgba(45,42,46,.06)",
                color: T.silver,
              }}
            >
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        <h3
          itemProp="name"
          style={{
            fontSize: "1.05rem",
            fontWeight: 700,
            color: T.charcoal,
            lineHeight: 1.35,
            marginBottom: "0.45rem",
          }}
        >
          {project.title}
        </h3>

        <p
          itemProp="description"
          style={{
            fontSize: "0.85rem",
            color: T.silver,
            lineHeight: 1.65,
            marginBottom: "1rem",
          }}
        >
          {project.description}
        </p>

        {/* Year */}
        <div
          style={{
            fontSize: "0.72rem",
            color: T.muted,
            fontFamily: "'JetBrains Mono',monospace",
          }}
        >
          {project.timeline?.endDate}
        </div>
      </div>
    </motion.article>
  );
};

/** Filter pill */
const FilterPill: React.FC<{
  label: string;
  active: boolean;
  count?: number;
  onClick: () => void;
  color?: string;
}> = ({ label, active, count, onClick, color = T.burgundy }) => (
  <button
    onClick={onClick}
    aria-pressed={active}
    style={{
      padding: "6px 16px",
      borderRadius: 999,
      fontSize: "0.8rem",
      fontWeight: 600,
      cursor: "pointer",
      border: active
        ? `1.5px solid ${color}`
        : "1.5px solid rgba(45,42,46,.15)",
      background: active
        ? `linear-gradient(135deg,${color}22,${T.purple}22)`
        : "rgba(249,248,246,.8)",
      color: active ? color : T.silver,
      backdropFilter: "blur(8px)",
      transition: "all 0.22s ease",
      display: "flex",
      alignItems: "center",
      gap: 6,
      boxShadow: active ? `0 0 12px ${color}25` : "none",
    }}
  >
    {label}
    {count !== undefined && (
      <span
        style={{
          background: active ? `${color}33` : "rgba(45,42,46,.08)",
          color: active ? color : T.muted,
          padding: "1px 7px",
          borderRadius: 999,
          fontSize: "0.68rem",
          fontWeight: 700,
          fontFamily: "'JetBrains Mono',monospace",
        }}
      >
        {count}
      </span>
    )}
  </button>
);

// ─── SEO SCHEMA ───────────────────────────────────────────────────────────────
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://chrisnortonjr.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: "https://chrisnortonjr.com/projects",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Web Development",
          item: "https://chrisnortonjr.com/projects/web-dev",
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "Web Development Projects",
      description:
        "Full-stack web development projects spanning Next.js, Laravel, .NET, Vue, React, Node.js, and modern tooling.",
      numberOfItems: PROJECTS.length,
      itemListElement: PROJECTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "SoftwareApplication",
          name: p.title,
          description: p.description,
          url:
            p.liveUrl ?? `https://chrisnortonjr.com/projects/web-dev/${p.id}`,
          applicationCategory: "WebApplication",
          operatingSystem: "Web Browser",
        },
      })),
    },
    {
      "@type": "Person",
      name: "Chris Norton",
      url: "https://chrisnortonjr.com/about",
      jobTitle: "Full-Stack Web Developer & Systems Engineer",
      knowsAbout: SKILLS.map((s) => s.name),
    },
  ],
};



// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function WebDevCategoryPage() {
  // Filter state
  const [skillCat, setSkillCat] = useState<SkillCategory | "all">("all");
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllTags, setShowAllTags] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleProjectClick = useCallback((project: Project) => {
    if (project.modal) {
      setSelectedProject(project);
    } else {
      const url = project.liveUrl ?? project.githubUrl;
      if (url) window.open(url, "_blank", "noopener,noreferrer");
    }
  }, []);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 260);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Filtered skills
  const filteredSkills = useMemo(
    () =>
      skillCat === "all"
        ? SKILLS
        : SKILLS.filter((s) => s.category === skillCat),
    [skillCat],
  );

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchSearch =
        !debouncedSearch ||
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.tags.some((t) =>
          t.toLowerCase().includes(debouncedSearch.toLowerCase()),
        );
      const matchTags =
        activeTags.size === 0 ||
        [...activeTags].every((tag) => p.tags.includes(tag));
      return matchSearch && matchTags;
    });
  }, [debouncedSearch, activeTags]);

  const toggleTag = useCallback((tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }, []);

  // Stats
  const stats = useMemo(
    () => ({
      completed: PROJECTS.filter((p) => p.status === "completed").length,
      inProgress: PROJECTS.filter((p) => p.status === "in-progress").length,
      totalSkills: SKILLS.length,
      expertSkills: SKILLS.filter((s) => s.levelLabel === "Expert").length,
    }),
    [],
  );

  const tagsToShow = showAllTags ? ALL_TAGS : ALL_TAGS.slice(0, 20);

  return (
    <>
      {/* ── JSON-LD schema ───────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main
        style={{
          fontFamily: "'Inter', -apple-system, sans-serif",
          background: T.cream,
          color: T.charcoal,
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        {/* ══════════════════════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════════════════════ */}
        <section
          aria-label="Web Development hero"
          style={{
            position: "relative",
            minHeight: "82vh",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #221f22 0%, #2d2a2e 50%, #1a1820 100%)",
          }}
        >
          {/* Background image */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${WebDev.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.18,
            }}
            aria-hidden
          />

          {/* Mesh gradient blobs */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-15%",
                left: "-10%",
                width: "60vw",
                height: "60vw",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,97,136,.35) 0%, transparent 70%)",
                filter: "blur(80px)",
                animation: "floatBlob 9s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-20%",
                right: "-5%",
                width: "50vw",
                height: "50vw",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(171,157,242,.3) 0%, transparent 70%)",
                filter: "blur(90px)",
                animation: "floatBlob 12s ease-in-out infinite reverse",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "40%",
                left: "40%",
                width: "40vw",
                height: "40vw",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(120,220,232,.2) 0%, transparent 70%)",
                filter: "blur(70px)",
                animation: "floatBlob 15s ease-in-out infinite 3s",
              }}
            />
          </div>

          {/* Grid overlay */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(255,97,136,.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,97,136,.06) 1px, transparent 1px)
              `,
              backgroundSize: "64px 64px",
            }}
          />

          {/* Hero content */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: 1200,
              margin: "0 auto",
              padding: "8rem 2rem 6rem",
              width: "100%",
            }}
          >
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
              <ol
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  fontSize: "0.78rem",
                  color: "rgba(252,252,250,.55)",
                  fontFamily: "'JetBrains Mono',monospace",
                }}
                itemScope
                itemType="https://schema.org/BreadcrumbList"
              >
                {[
                  { label: "Home", href: "/" },
                  { label: "Projects", href: "/projects" },
                  { label: "Web Dev", href: "/projects/web-dev" },
                ].map((crumb, i, arr) => (
                  <li
                    key={crumb.href}
                    itemScope
                    itemType="https://schema.org/ListItem"
                    itemProp="itemListElement"
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <a
                      href={crumb.href}
                      itemProp="item"
                      style={{
                        color:
                          i === arr.length - 1
                            ? T.burgundy
                            : "rgba(252,252,250,.55)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                    >
                      <span itemProp="name">{crumb.label}</span>
                    </a>
                    <meta itemProp="position" content={`${i + 1}`} />
                    {i < arr.length - 1 && (
                      <span aria-hidden style={{ opacity: 0.35 }}>
                        /
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 18px",
                borderRadius: 999,
                background: "rgba(255,97,136,.18)",
                border: "1px solid rgba(255,97,136,.35)",
                marginBottom: "1.25rem",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: T.burgundy,
                  boxShadow: `0 0 8px ${T.burgundy}`,
                  animation: "glowPulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: T.burgundy,
                  fontFamily: "'JetBrains Mono',monospace",
                }}
              >
                Web Development
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              itemProp="name"
              style={{
                fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                background: T.gradPrimary,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "1.25rem",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Crafting the Web,
              <br />
              One Pixel at a Time.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: "rgba(252,252,250,.72)",
                lineHeight: 1.7,
                maxWidth: 580,
                marginBottom: "2.5rem",
              }}
            >
              Full-stack experiences — from pixel-perfect UIs to battle-tested
              APIs, seamless CI/CD pipelines, and SEO-charged landing pages that
              actually convert.
            </motion.p>

            {/* Stat chips */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 12 }}
            >
              {[
                {
                  value: `${stats.completed}`,
                  label: "Shipped",
                  color: T.mint,
                },
                {
                  value: `${stats.inProgress}`,
                  label: "In Progress",
                  color: T.blue,
                },
                {
                  value: `${stats.totalSkills}`,
                  label: "Skills",
                  color: T.purple,
                },
                // {
                //   value: `${stats.expertSkills}`,
                //   label: "Expert-level",
                //   color: T.burgundy,
                // },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 14,
                    background: "rgba(255,255,255,.08)",
                    border: `1px solid ${s.color}33`,
                    backdropFilter: "blur(12px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: 84,
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: 800,
                      color: s.color,
                      lineHeight: 1.1,
                      fontFamily: "'JetBrains Mono',monospace",
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      color: "rgba(252,252,250,.55)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                display: "flex",
                gap: 14,
                marginTop: "2.5rem",
                flexWrap: "wrap",
              }}
            >
              <a
                href="#projects"
                className="btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 28px",
                  borderRadius: 12,
                  background: T.gradPrimary,
                  color: T.white,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  boxShadow: `0 8px 28px rgba(${T.catRgb},.4)`,
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 12px 36px rgba(${T.catRgb},.55)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "none";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 8px 28px rgba(${T.catRgb},.4)`;
                }}
              >
                View Projects
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </a>
              <a
                href="/contact"
                className="btn-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 28px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,.08)",
                  color: T.white,
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  border: "1.5px solid rgba(255,255,255,.2)",
                  backdropFilter: "blur(8px)",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,.14)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,.08)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,.2)";
                }}
              >
                Hire Me
              </a>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SKILLS SECTION
        ══════════════════════════════════════════════════════════ */}
        <section
          id="skills"
          aria-label="Web development skills"
          style={{
            padding: "6rem 2rem",
            background: T.white,
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {/* Section header */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              style={{ textAlign: "center", marginBottom: "3rem" }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: T.burgundy,
                  marginBottom: "0.75rem",
                  fontFamily: "'JetBrains Mono',monospace",
                }}
              >
                Skill Stack
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.9rem, 4vw, 2.9rem)",
                  fontWeight: 800,
                  color: T.charcoal,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.9rem",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                The tools I reach for first
              </h2>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: T.silver,
                  maxWidth: 540,
                  margin: "0 auto",
                  lineHeight: 1.7,
                }}
              >
                A battle-tested toolkit built across 5+ years of shipping
                production web apps — no tutorial toys here.
              </p>
            </motion.div>

            {/* Category filter pills */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                justifyContent: "center",
                marginBottom: "2.5rem",
              }}
              role="group"
              aria-label="Filter skills by category"
            >
              {SKILL_CATEGORIES.map((cat) => (
                <FilterPill
                  key={cat.id}
                  label={`${cat.label}`}
                  active={skillCat === cat.id}
                  count={
                    cat.id === "all"
                      ? SKILLS.length
                      : SKILLS.filter((s) => s.category === cat.id).length
                  }
                  onClick={() => setSkillCat(cat.id)}
                  color={T.burgundy}
                />
              ))}
            </div>

            {/* Skills grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={skillCat}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "1.25rem",
                }}
              >
                {filteredSkills.map((skill, i) => (
                  <SkillCard key={skill.id} skill={skill} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            PROJECTS SECTION
        ══════════════════════════════════════════════════════════ */}
        <section
          id="projects"
          aria-label="Web development projects"
          style={{
            padding: "6rem 2rem",
            background: T.cream,
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {/* Section header */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              style={{ marginBottom: "3rem" }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: T.burgundy,
                  marginBottom: "0.75rem",
                  fontFamily: "'JetBrains Mono',monospace",
                }}
              >
                Featured Work
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexWrap: "wrap",
                  gap: 16,
                }}
              >
                <h2
                  style={{
                    fontSize: "clamp(1.9rem, 4vw, 2.9rem)",
                    fontWeight: 800,
                    color: T.charcoal,
                    letterSpacing: "-0.02em",
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  Projects that ship
                </h2>
                {/* Search input */}
                <div style={{ position: "relative" }}>
                  <svg
                    style={{
                      position: "absolute",
                      left: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: T.silver,
                    }}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="search"
                    placeholder="Search projects…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search projects"
                    style={{
                      padding: "10px 16px 10px 40px",
                      borderRadius: 12,
                      border: "1.5px solid rgba(45,42,46,.15)",
                      background: "rgba(249,248,246,.9)",
                      color: T.charcoal,
                      fontSize: "0.88rem",
                      outline: "none",
                      width: 240,
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor =
                        T.burgundy;
                      (e.target as HTMLInputElement).style.boxShadow =
                        `0 0 0 3px rgba(${T.catRgb},.12)`;
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor =
                        "rgba(45,42,46,.15)";
                      (e.target as HTMLInputElement).style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Tag filter cloud */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 7,
                marginBottom: "2rem",
              }}
              role="group"
              aria-label="Filter projects by tag"
            >
              {tagsToShow.map((tag) => {
                const count = PROJECTS.filter((p) =>
                  p.tags.includes(tag),
                ).length;
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    aria-pressed={activeTags.has(tag)}
                    style={{
                      padding: "4px 12px",
                      borderRadius: 999,
                      fontSize: "0.72rem",
                      fontFamily: "'JetBrains Mono',monospace",
                      fontWeight: 600,
                      cursor: "pointer",
                      border: activeTags.has(tag)
                        ? `1.5px solid ${T.burgundy}`
                        : "1.5px solid rgba(45,42,46,.14)",
                      background: activeTags.has(tag)
                        ? `rgba(${T.catRgb},.12)`
                        : "rgba(249,248,246,.8)",
                      color: activeTags.has(tag) ? T.burgundy : T.silver,
                      transition: "all 0.2s",
                    }}
                  >
                    #{tag}
                    <span
                      style={{
                        marginLeft: 5,
                        opacity: 0.55,
                        fontSize: "0.65rem",
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
              {ALL_TAGS.length > 20 && (
                <button
                  onClick={() => setShowAllTags((p) => !p)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 999,
                    fontSize: "0.72rem",
                    fontFamily: "'JetBrains Mono',monospace",
                    cursor: "pointer",
                    border: "1.5px dashed rgba(45,42,46,.2)",
                    background: "transparent",
                    color: T.silver,
                  }}
                >
                  {showAllTags
                    ? "↑ less"
                    : `+${ALL_TAGS.length - 20} more tags`}
                </button>
              )}
              {activeTags.size > 0 && (
                <button
                  onClick={() => setActiveTags(new Set())}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 999,
                    fontSize: "0.72rem",
                    fontFamily: "'JetBrains Mono',monospace",
                    cursor: "pointer",
                    border: `1.5px solid rgba(${T.catRgb},.3)`,
                    background: `rgba(${T.catRgb},.07)`,
                    color: T.burgundy,
                  }}
                >
                  ✕ Clear filters
                </button>
              )}
            </div>

            {/* Result count */}
            <p
              aria-live="polite"
              style={{
                fontSize: "0.8rem",
                color: T.muted,
                marginBottom: "1.5rem",
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              Showing {filteredProjects.length} of {PROJECTS.length} projects
              {activeTags.size > 0 &&
                ` · filtered by: ${[...activeTags].join(", ")}`}
            </p>

            {/* Projects grid */}
            <AnimatePresence mode="wait">
              {filteredProjects.length > 0 ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(340px, 1fr))",
                    gap: "1.75rem",
                  }}
                >
                  {filteredProjects.map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={i}
                      onClick={handleProjectClick}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    textAlign: "center",
                    padding: "5rem 2rem",
                    color: T.muted,
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                    🔍
                  </div>
                  <p style={{ fontSize: "1.05rem" }}>
                    No projects match those filters.
                  </p>
                  <button
                    onClick={() => {
                      setActiveTags(new Set());
                      setSearchQuery("");
                    }}
                    style={{
                      marginTop: "1rem",
                      padding: "8px 20px",
                      borderRadius: 999,
                      border: `1.5px solid ${T.burgundy}`,
                      background: "transparent",
                      color: T.burgundy,
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    Reset filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SEO TAG CLOUD SECTION
        ══════════════════════════════════════════════════════════ */}
        <section
          aria-label="Technology and tag index"
          style={{
            padding: "4rem 2rem",
            background: T.white,
            borderTop: "1px solid rgba(45,42,46,.08)",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <h2
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: T.charcoal,
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    background: T.gradPrimary,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Technologies &amp; Tags
                </span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontFamily: "'JetBrains Mono',monospace",
                    color: T.muted,
                    fontWeight: 400,
                  }}
                >
                  — all indexed for search engines
                </span>
              </h2>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {ALL_TAGS.map((tag) => {
                  const count = PROJECTS.filter((p) =>
                    p.tags.includes(tag),
                  ).length;
                  return (
                    <a
                      key={tag}
                      href={`/projects/web-dev/tag/${tag}`}
                      style={{
                        padding: "5px 13px",
                        borderRadius: 8,
                        fontSize: "0.75rem",
                        fontFamily: "'JetBrains Mono',monospace",
                        fontWeight: 600,
                        background: "rgba(255,97,136,.06)",
                        border: "1px solid rgba(255,97,136,.18)",
                        color: T.charcoal,
                        textDecoration: "none",
                        transition: "all 0.2s",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.background = `rgba(${T.catRgb},.14)`;
                        el.style.color = T.burgundy;
                        el.style.borderColor = `rgba(${T.catRgb},.35)`;
                        el.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.background = "rgba(255,97,136,.06)";
                        el.style.color = T.charcoal;
                        el.style.borderColor = "rgba(255,97,136,.18)";
                        el.style.transform = "none";
                      }}
                    >
                      #{tag}
                      <span
                        style={{
                          padding: "1px 6px",
                          borderRadius: 999,
                          fontSize: "0.62rem",
                          background: "rgba(45,42,46,.08)",
                          color: T.muted,
                        }}
                      >
                        {count}
                      </span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            CTA SECTION
        ══════════════════════════════════════════════════════════ */}
        <section
          aria-label="Contact call-to-action"
          style={{
            padding: "7rem 2rem",
            background: "linear-gradient(135deg, #221f22 0%, #2d2a2e 100%)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glow blobs */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "80vw",
              height: "80vw",
              maxWidth: 700,
              maxHeight: 700,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(${T.catRgb},.2) 0%, transparent 70%)`,
              filter: "blur(80px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: T.burgundy,
                  marginBottom: "1rem",
                  fontFamily: "'JetBrains Mono',monospace",
                }}
              >
                Let's Build Something
              </p>
              <h2
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: 900,
                  color: T.white,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  marginBottom: "1.25rem",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                Got a project that needs a real developer?
              </h2>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "rgba(252,252,250,.65)",
                  lineHeight: 1.7,
                  marginBottom: "2.5rem",
                }}
              >
                From idea to deployment — I handle the full stack so you can
                focus on the business.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="/contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "14px 32px",
                    borderRadius: 14,
                    background: T.gradPrimary,
                    color: T.white,
                    fontWeight: 700,
                    fontSize: "1rem",
                    textDecoration: "none",
                    boxShadow: `0 8px 32px rgba(${T.catRgb},.45)`,
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-2px) scale(1.02)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 16px 48px rgba(${T.catRgb},.6)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "none";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 8px 32px rgba(${T.catRgb},.45)`;
                  }}
                >
                  Start a Project
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <a
                  href="/projects"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 28px",
                    borderRadius: 14,
                    background: "rgba(255,255,255,.07)",
                    color: T.white,
                    fontWeight: 600,
                    fontSize: "1rem",
                    textDecoration: "none",
                    border: "1.5px solid rgba(255,255,255,.18)",
                    backdropFilter: "blur(8px)",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,.14)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,.07)";
                  }}
                >
                  All Projects
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Project Detal Modal */}
      <ProjectModal
        project={selectedProject as any}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* ── Keyframe injections (same as globals.css) ─────────────── */}
      <style>{`
        @keyframes floatBlob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(3%, 5%) scale(1.04); }
          66%       { transform: translate(-3%, -3%) scale(0.97); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px currentColor; }
          50%       { opacity: 0.65; box-shadow: 0 0 18px currentColor; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        /* Smooth font rendering */
        * { -webkit-font-smoothing: antialiased; box-sizing: border-box; }

        /* Scroll-behaviour */
        html { scroll-behavior: smooth; }

        /* Focus outline for accessibility */
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid #ff6188;
          outline-offset: 3px;
        }
      `}</style>
    </>
  );
}
