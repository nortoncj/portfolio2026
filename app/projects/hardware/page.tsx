"use client";

/**
 * HardwareCategoryPage.tsx
 * ─────────────────────────────────────────────────────────────
 * React + TypeScript category page for Hardware / Embedded Systems.
 * Design system: presets.css tokens (burgundy, coral, mint, purple…)
 * Animations: Framer Motion
 * SEO: schema.org ItemList + BreadcrumbList + Person knowsAbout
 * ─────────────────────────────────────────────────────────────
 * Dependencies:
 *   npm install framer-motion
 *   (Next.js ≥13 – add <Script> tags or next/head for schema JSON-LD)
 */

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FaAws,
  FaBots,
  FaC,
  FaMicrochip,
  FaNetworkWired,
  FaPlug,
  FaPython,
  FaRaspberryPi,
  FaRobot,
} from "react-icons/fa6";
import { FaTools } from "react-icons/fa";
import { IconType } from "react-icons";
import { Hardware as PROJECTS } from "@/data/project";
import { Project } from "@/types/Post";
import Hardware from "@images/embedded.jpg";
import ProjectModal from "@/components/partials/projectModals";

// ─── DESIGN TOKENS (mirrors presets.css :root) ─────────────────
const T = {
  burgundy: "#ff6188",
  magenta: "#fc5fa3",
  purple: "#ab9df2",
  coral: "#ffd866", // ← primary hardware accent
  mint: "#a9dc76",
  blue: "#78dce8",
  white: "#fcfcfa",
  cream: "#f9f8f6",
  charcoal: "#2d2a2e",
  slate: "#221f22",
  mid: "#2a272b",
  silver: "#939293",
  // hardware palette
  cat: "#ffd866", // coral/amber — circuit-board warmth
  catRgb: "255,216,102",
  catDark: "#e6c240",
  catGlow: "rgba(255,216,102,0.28)",
  gradPrimary: "linear-gradient(135deg,#ff6188 0%,#fc5fa3 50%,#ab9df2 100%)",
  gradHw: "linear-gradient(135deg,#ffd866,#a9dc76)",
  gradWarm: "linear-gradient(135deg,#ffd866,#ff6188)",
} as const;

// ─── TYPE DEFINITIONS ──────────────────────────────────────────
type SkillCategory =
  | "firmware"
  | "hardware"
  | "protocols"
  | "tools"
  | "languages";
type ProjectStatus = "completed" | "in-progress" | "concept";

interface Skill {
  id: string;
  name: string;
  icon: IconType;
  level: number; // 0–100
  levelLabel: "Expert" | "Advanced" | "Intermediate" | "Familiar";
  category: SkillCategory;
  tags: string[];
  yearsExp: number;
}

// ─── MOCK DATA ─────────────────────────────────────────────────
const SKILLS: Skill[] = [
  {
    id: "cpp",
    name: "C / C++",
    icon: FaC,
    level: 90,
    levelLabel: "Expert",
    category: "languages",
    tags: ["embedded", "firmware", "performance"],
    yearsExp: 5,
  },
  {
    id: "python",
    name: "Python (Hardware)",
    icon: FaPython,
    level: 85,
    levelLabel: "Advanced",
    category: "languages",
    tags: ["scripting", "raspberry-pi", "data"],
    yearsExp: 5,
  },
  {
    id: "rtos",
    name: "FreeRTOS / RTOS",
    icon: FaBots,
    level: 80,
    levelLabel: "Advanced",
    category: "firmware",
    tags: ["real-time", "scheduling", "concurrency"],
    yearsExp: 4,
  },
  {
    id: "arduino",
    name: "Arduino / AVR",
    icon: FaRobot,
    level: 95,
    levelLabel: "Expert",
    category: "firmware",
    tags: ["microcontroller", "avr", "prototyping"],
    yearsExp: 6,
  },
  {
    id: "stm32",
    name: "STM32 / ARM Cortex",
    icon: FaMicrochip,
    level: 75,
    levelLabel: "Advanced",
    category: "firmware",
    tags: ["arm", "hal", "dma", "timers"],
    yearsExp: 3,
  },
  {
    id: "esp32",
    name: "ESP32 / ESP8266",
    icon: FaMicrochip,
    level: 88,
    levelLabel: "Expert",
    category: "firmware",
    tags: ["wifi", "bluetooth", "ble", "ota"],
    yearsExp: 4,
  },
  {
    id: "rpi",
    name: "Raspberry Pi",
    icon: FaRaspberryPi,
    level: 92,
    levelLabel: "Expert",
    category: "hardware",
    tags: ["linux", "gpio", "sbc", "debian"],
    yearsExp: 5,
  },
  {
    id: "pcb",
    name: "PCB Design (KiCad)",
    icon: FaMicrochip,
    level: 70,
    levelLabel: "Intermediate",
    category: "hardware",
    tags: ["kicad", "schematic", "layout", "gerber"],
    yearsExp: 3,
  },
  {
    id: "mqtt",
    name: "MQTT / IoT Protocols",
    icon: FaNetworkWired,
    level: 85,
    levelLabel: "Advanced",
    category: "protocols",
    tags: ["mqtt", "coap", "http", "websocket"],
    yearsExp: 4,
  },
  {
    id: "i2c",
    name: "I²C / SPI / UART",
    icon: FaPlug,
    level: 90,
    levelLabel: "Expert",
    category: "protocols",
    tags: ["i2c", "spi", "uart", "serial", "communication"],
    yearsExp: 5,
  },
  {
    id: "kicad",
    name: "Soldering & Debugging",
    icon: FaTools,
    level: 85,
    levelLabel: "Advanced",
    category: "tools",
    tags: ["oscilloscope", "logic-analyzer", "multimeter"],
    yearsExp: 5,
  },
  {
    id: "awsiot",
    name: "AWS IoT Core",
    icon: FaAws,
    level: 72,
    levelLabel: "Intermediate",
    category: "tools",
    tags: ["aws", "iot", "cloud", "mqtt", "shadow"],
    yearsExp: 2,
  },
];

// Derived tag universe from all projects
const ALL_TAGS = Array.from(new Set(PROJECTS.flatMap((p) => p.tags))).sort();

const SKILL_CATEGORIES: {
  id: SkillCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "All Skills" },
  { id: "firmware", label: "Firmware" },
  { id: "hardware", label: "Hardware" },
  { id: "protocols", label: "Protocols" },
  { id: "languages", label: "Languages" },
  { id: "tools", label: "Tools" },
];

const STATUS_COLORS: Record<
  ProjectStatus,
  { bg: string; border: string; color: string; label: string }
> = {
  completed: {
    bg: "rgba(169,220,118,.18)",
    border: "rgba(169,220,118,.45)",
    color: "#a9dc76",
    label: "Completed",
  },
  "in-progress": {
    bg: "rgba(255,216,102,.18)",
    border: "rgba(255,216,102,.45)",
    color: "#ffd866",
    label: "In Progress",
  },
  concept: {
    bg: "rgba(147,146,147,.18)",
    border: "rgba(147,146,147,.35)",
    color: "#939293",
    label: "Concept",
  },
};

// ─── ANIMATION VARIANTS ────────────────────────────────────────
const fadeUp: any = {
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

// ─── SUB-COMPONENTS ────────────────────────────────────────────

/** Animated proficiency bar */
const SkillBar: React.FC<{ level: number; color?: string }> = ({
  level,
  color = T.coral,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      style={{
        height: 5,
        borderRadius: 4,
        background: "rgba(255,255,255,.08)",
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
          background: `linear-gradient(90deg, ${color}, ${T.mint})`,
          boxShadow: `0 0 8px ${color}55`,
        }}
      />
    </div>
  );
};

/** Level badge pill */
const LevelBadge: React.FC<{ label: string }> = ({ label }) => {
  const colors: Record<string, { bg: string; color: string }> = {
    Expert: { bg: "rgba(255,216,102,.18)", color: T.coral },
    Advanced: { bg: "rgba(169,220,118,.15)", color: T.mint },
    Intermediate: { bg: "rgba(171,157,242,.15)", color: T.purple },
    Familiar: { bg: "rgba(147,146,147,.15)", color: T.silver },
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

/** Single skill card */
const SkillCard: React.FC<{ skill: Skill; index: number }> = ({
  skill,
  index,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      custom={index % 4}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -5, borderColor: `${T.coral}44` }}
      style={{
        padding: "1.25rem",
        borderRadius: 16,
        background: "rgba(45,42,46,.8)",
        border: "1px solid rgba(255,255,255,.1)",
        backdropFilter: "blur(12px)",
        transition: "border-color 0.3s",
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
            background: `rgba(${T.catRgb},.14)`,
            border: `1px solid rgba(${T.catRgb},.3)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            flexShrink: 0,
          }}
        >
          <skill.icon />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "0.88rem",
              fontWeight: 700,
              color: T.white,
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

      {/* Progress bar */}
      {/* <SkillBar level={skill.level} /> */}

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
        {skill.tags.slice(0, 3).map((tag) => (
          <a
            key={tag}
            href={`/projects/hardware/skill/${tag}`}
            style={{
              padding: "2px 8px",
              borderRadius: 6,
              fontSize: "0.66rem",
              fontFamily: "'JetBrains Mono',monospace",
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.1)",
              color: "rgba(252,252,250,.55)",
              textDecoration: "none",
              transition: "color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = T.coral;
              (e.currentTarget as HTMLAnchorElement).style.background =
                `rgba(${T.catRgb},.12)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(252,252,250,.55)";
              (e.currentTarget as HTMLAnchorElement).style.background =
                "rgba(255,255,255,.06)";
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
        background: "rgba(45,42,46,.85)",
        border: "1px solid rgba(255,255,255,.1)",
        transition: "box-shadow 0.35s, border-color 0.35s, transform 0.35s",
        cursor: "pointer",
        position: "relative",
      }}
      whileHover={{
        y: -7,
        boxShadow: `0 20px 60px rgba(0,0,0,.4), 0 0 30px rgba(${T.catRgb},.18)`,
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
            background: T.gradWarm,
            fontSize: "0.65rem",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: T.charcoal,
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
          alt={`${project.title} — hardware project`}
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
        {/* Base overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,.12) 0%, rgba(0,0,0,.55) 100%)",
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
                background: "rgba(34,31,34,.88)",
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
                  color: "rgba(252,252,250,.8)",
                  lineHeight: 1.65,
                  marginBottom: "1rem",
                }}
              >
                {project.longDesc}
              </p>
              <div style={{ display: "flex", gap: 10 }}></div>
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
            background: status.bg,
            border: `1px solid ${status.border}`,
            fontSize: "0.68rem",
            fontWeight: 700,
            color: status.color,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            backdropFilter: "blur(8px)",
          }}
        >
          {status.label}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "1.25rem" }}>
        {/* Year */}
        <div
          style={{
            fontSize: "0.7rem",
            fontFamily: "'JetBrains Mono',monospace",
            color: T.silver,
            marginBottom: 6,
          }}
        >
          {project.timeline?.endDate}
        </div>

        <h3
          itemProp="name"
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: T.white,
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
            marginBottom: "0.5rem",
            transition: "color 0.2s",
            ...(hovered ? { color: T.coral } : {}),
          }}
        >
          {project.title}
        </h3>

        <p
          itemProp="description"
          style={{
            fontSize: "0.82rem",
            color: "rgba(252,252,250,.6)",
            lineHeight: 1.6,
            marginBottom: "0.85rem",
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {project.tags.map((tag) => (
            <a
              key={tag}
              href={`/projects/hardware/tag/${tag}`}
              itemProp="keywords"
              style={{
                padding: "3px 9px",
                borderRadius: 7,
                fontSize: "0.67rem",
                fontFamily: "'JetBrains Mono',monospace",
                fontWeight: 500,
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
                color: "rgba(252,252,250,.55)",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = T.coral;
                (e.currentTarget as HTMLAnchorElement).style.background =
                  `rgba(${T.catRgb},.14)`;
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  `rgba(${T.catRgb},.35)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(252,252,250,.55)";
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,.06)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(255,255,255,.1)";
              }}
            >
              {tag}
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

// ─── SCHEMA.ORG JSON-LD ────────────────────────────────────────
const SchemaOrgScripts: React.FC = () => {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://yourportfolio.dev",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "https://yourportfolio.dev/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Hardware & Embedded Systems",
        item: "https://yourportfolio.dev/projects/hardware",
      },
    ],
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hardware & Embedded Systems Projects by Christopher Norton",
    description:
      "A curated list of hardware and embedded systems projects including IoT devices, RTOS firmware, PCB designs, and embedded Linux gateways.",
    url: "https://yourportfolio.dev/projects/hardware",
    numberOfItems: PROJECTS.length,
    itemListElement: PROJECTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: p.title,
        description: p.description,
        url: `https://yourportfolio.dev/projects/hardware/${p.id}`,
        image: p.image,
        applicationCategory: "HardwareApplication",
        keywords: p.tags.join(", "),
        author: { "@type": "Person", name: "Christopher Norton" },
      },
    })),
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Christopher Norton",
    url: "https://yourportfolio.dev",
    jobTitle: "Systems Engineer & Embedded Developer",
    knowsAbout: SKILLS.map((s) => s.name),
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "AWS Solutions Architect",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
};

// ─── MAIN COMPONENT ────────────────────────────────────────────
const HardwareCategoryPage: React.FC = () => {
  // ── State ──
  const [activeSkillCat, setActiveSkillCat] = useState<SkillCategory | "all">(
    "all",
  );
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const handleProjectClick = useCallback((project: Project) => {
    if (project.modal) {
      setSelectedProject(project);
    } else {
      const url = project.liveUrl ?? project.githubUrl;
      if (url) window.open(url, "_blank", "noopener,noreferrer");
    }
  }, []);
  // Debounce search
  useEffect(() => {
    const t = setTimeout(
      () => setDebouncedQuery(searchQuery.trim().toLowerCase()),
      300,
    );
    return () => clearTimeout(t);
  }, [searchQuery]);

  // ── Derived filtered lists ──
  const filteredSkills = useMemo(
    () =>
      activeSkillCat === "all"
        ? SKILLS
        : SKILLS.filter((s) => s.category === activeSkillCat),
    [activeSkillCat],
  );

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchTags =
        activeTags.size === 0 || p.tags.some((t) => activeTags.has(t));
      const matchSearch =
        !debouncedQuery ||
        [p.title, p.description, ...p.tags].some((field) =>
          field.toLowerCase().includes(debouncedQuery),
        );
      return matchTags && matchSearch;
    });
  }, [activeTags, debouncedQuery]);

  const toggleTag = useCallback((tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setActiveTags(new Set());
    setSearchQuery("");
    if (searchRef.current) searchRef.current.value = "";
  }, []);

  // ── Refs for hero section ──
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  // ─────────── RENDER ───────────
  return (
    <>
      <SchemaOrgScripts />

      <div
        style={{
          minHeight: "100vh",
          background: T.slate,
          fontFamily: "'Inter', sans-serif",
          color: T.white,
          overflowX: "hidden",
        }}
      >
        {/* ═══════════════════════════════════
            HERO HEADER
        ═══════════════════════════════════ */}
        <section
          ref={heroRef}
          style={{
            position: "relative",
            minHeight: 520,
            display: "flex",
            alignItems: "flex-end",
            overflow: "hidden",
          }}
          itemScope
          itemType="https://schema.org/WebPage"
        >
          {/* Background image */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${Hardware.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.3) saturate(1.3)",
              transform: "scale(1.04)",
            }}
          />
          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, rgba(34,31,34,.7) 0%, rgba(${T.catRgb},.12) 50%, rgba(34,31,34,.95) 100%)`,
            }}
          />
          {/* Mesh grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
              backgroundSize: "58px 58px",
            }}
          />

          {/* Floating decorative blobs */}
          {[
            {
              w: 500,
              h: 500,
              top: -120,
              left: -80,
              bg: `rgba(${T.catRgb},.2)`,
              delay: 0,
            },
            {
              w: 400,
              h: 400,
              top: 80,
              right: -60,
              bg: "rgba(169,220,118,.15)",
              delay: -4,
            },
            {
              w: 300,
              h: 300,
              bottom: 40,
              left: "35%",
              bg: "rgba(171,157,242,.12)",
              delay: -8,
            },
          ].map((blob, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -18, 0], scale: [1, 1.05, 1] }}
              transition={{
                duration: 14 + i * 3,
                repeat: Infinity,
                delay: blob.delay,
                ease: "easeInOut",
              }}
              style={
                {
                  position: "absolute",
                  width: blob.w,
                  height: blob.h,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${blob.bg}, transparent 70%)`,
                  filter: "blur(70px)",
                  ...(blob as Record<string, unknown>),
                  pointerEvents: "none",
                } as React.CSSProperties
              }
            />
          ))}

          {/* Hero content */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: 1180,
              margin: "0 auto",
              padding: "5rem 2rem 3.5rem",
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
                  color: "rgba(252,252,250,.5)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                itemScope
                itemType="https://schema.org/BreadcrumbList"
              >
                {[
                  { href: "/", label: "Home" },
                  { href: "/projects", label: "Projects" },
                  { href: "/projects/hardware", label: "Hardware" },
                ].map((crumb, i, arr) => (
                  <React.Fragment key={crumb.href}>
                    <li
                      itemProp="itemListElement"
                      itemScope
                      itemType="https://schema.org/ListItem"
                    >
                      {i === arr.length - 1 ? (
                        <span
                          style={{ color: T.coral, fontWeight: 600 }}
                          itemProp="name"
                          aria-current="page"
                        >
                          {crumb.label}
                        </span>
                      ) : (
                        <a
                          href={crumb.href}
                          itemProp="item"
                          style={{
                            color: "rgba(252,252,250,.5)",
                            textDecoration: "none",
                            transition: "color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            ((e.target as HTMLElement).style.color = T.white)
                          }
                          onMouseLeave={(e) =>
                            ((e.target as HTMLElement).style.color =
                              "rgba(252,252,250,.5)")
                          }
                        >
                          <span itemProp="name">{crumb.label}</span>
                        </a>
                      )}
                      <meta itemProp="position" content={String(i + 1)} />
                    </li>
                    {i < arr.length - 1 && (
                      <li
                        aria-hidden
                        style={{ color: "rgba(252,252,250,.25)" }}
                      >
                        /
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ol>
            </nav>

            <motion.div
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {/* Category icon + eyebrow */}
              <motion.div variants={fadeUp} style={{ marginBottom: "1rem" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "7px 18px",
                    borderRadius: 999,
                    background: `rgba(${T.catRgb},.15)`,
                    border: `1px solid rgba(${T.catRgb},.35)`,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: T.coral,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}></span>
                  Hardware &amp; Embedded Systems
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                variants={fadeUp}
                itemProp="name"
                style={{
                  fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  lineHeight: 1.05,
                  marginBottom: "1rem",
                  background: `linear-gradient(135deg, ${T.coral} 0%, ${T.mint} 60%, ${T.blue} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                From Circuit to Cloud
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                itemProp="description"
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  color: "rgba(252,252,250,.65)",
                  lineHeight: 1.7,
                  maxWidth: 620,
                  marginBottom: "2rem",
                }}
              >
                Microcontrollers, RTOS firmware, IoT protocols, PCB design, and
                embedded Linux — hardware engineering that ships to the real
                world and talks to the cloud.
              </motion.p>

              {/* Stats row */}
              <motion.div
                variants={fadeUp}
                style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}
              >
                {[
                  { value: `${PROJECTS.length}`, label: "Projects" },
                  { value: `${SKILLS.length}`, label: "Skills" },
                  { value: `${ALL_TAGS.length}`, label: "Technologies" },
                  // { value: "5+", label: "Years Exp" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    style={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <span
                      style={{
                        fontSize: "1.85rem",
                        fontWeight: 900,
                        lineHeight: 1,
                        background: `linear-gradient(135deg, ${T.coral}, ${T.mint})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {value}
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: T.silver,
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.09em",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            MAIN CONTENT
        ═══════════════════════════════════ */}
        <main
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "4rem 2rem 6rem",
          }}
        >
          {/* ───── SKILLS SECTION ───── */}
          <section
            aria-labelledby="skillsHeading"
            style={{ marginBottom: "5rem" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              style={{ marginBottom: "2rem" }}
            >
              {/* Section header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: "1.5rem",
                }}
              >
                <h2
                  id="skillsHeading"
                  style={{
                    fontSize: "1.7rem",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: T.white,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 4,
                      height: "1.3em",
                      background: T.gradHw,
                      borderRadius: 4,
                    }}
                  />
                  Skills &amp; Expertise
                </h2>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontFamily: "'JetBrains Mono',monospace",
                    color: T.silver,
                  }}
                >
                  {filteredSkills.length} of {SKILLS.length} skills shown
                </span>
              </div>

              {/* Category filter pills */}
              <div
                style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                role="group"
                aria-label="Filter skills by category"
              >
                {SKILL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveSkillCat(cat.id)}
                    aria-pressed={activeSkillCat === cat.id}
                    style={{
                      padding: "7px 16px",
                      borderRadius: 999,
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      border: "1px solid",
                      fontFamily: "'Inter',sans-serif",
                      transition: "all 0.22s",
                      ...(activeSkillCat === cat.id
                        ? {
                            background: `linear-gradient(135deg, ${T.coral}, ${T.mint})`,
                            borderColor: "transparent",
                            color: T.charcoal,
                            boxShadow: `0 4px 16px rgba(${T.catRgb},.45)`,
                          }
                        : {
                            background: "rgba(255,255,255,.06)",
                            borderColor: "rgba(255,255,255,.14)",
                            color: "rgba(252,252,250,.65)",
                          }),
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Skills grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkillCat}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: "1rem",
                }}
              >
                {filteredSkills.map((skill, i) => (
                  <SkillCard key={skill.id} skill={skill} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </section>

          {/* ───── PROJECTS SECTION ───── */}
          <section aria-labelledby="projectsHeading">
            {/* Header + search + filter */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              style={{ marginBottom: "1.75rem" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: "1.25rem",
                }}
              >
                <h2
                  id="projectsHeading"
                  style={{
                    fontSize: "1.7rem",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: T.white,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 4,
                      height: "1.3em",
                      background: T.gradHw,
                      borderRadius: 4,
                    }}
                  />
                  Projects
                </h2>

                {/* Search */}
                <div style={{ position: "relative" }}>
                  <svg
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: T.silver,
                      pointerEvents: "none",
                    }}
                    width="15"
                    height="15"
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
                    ref={searchRef}
                    type="search"
                    placeholder="Search projects…"
                    aria-label="Search projects"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Escape" && clearFilters()}
                    style={{
                      paddingLeft: 36,
                      paddingRight: 14,
                      paddingTop: 9,
                      paddingBottom: 9,
                      borderRadius: 999,
                      width: 220,
                      background: "rgba(255,255,255,.07)",
                      border: "1px solid rgba(255,255,255,.12)",
                      color: T.white,
                      fontSize: "0.85rem",
                      fontFamily: "'Inter',sans-serif",
                      outline: "none",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = `rgba(${T.catRgb},.5)`;
                      e.target.style.boxShadow = `0 0 0 3px rgba(${T.catRgb},.12)`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,.12)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Tag filter */}
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: T.silver,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginRight: 4,
                    flexShrink: 0,
                  }}
                >
                  Filter by tag:
                </span>
                {ALL_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    aria-pressed={activeTags.has(tag)}
                    style={{
                      padding: "4px 11px",
                      borderRadius: 999,
                      fontSize: "0.71rem",
                      fontFamily: "'JetBrains Mono',monospace",
                      fontWeight: 500,
                      cursor: "pointer",
                      border: "1px solid",
                      fontStyle: "normal",
                      transition: "all 0.18s",
                      ...(activeTags.has(tag)
                        ? {
                            background: `rgba(${T.catRgb},.22)`,
                            borderColor: `rgba(${T.catRgb},.5)`,
                            color: T.coral,
                            boxShadow: `0 2px 10px rgba(${T.catRgb},.25)`,
                          }
                        : {
                            background: "rgba(255,255,255,.05)",
                            borderColor: "rgba(255,255,255,.12)",
                            color: "rgba(252,252,250,.55)",
                          }),
                    }}
                  >
                    {tag}
                  </button>
                ))}
                {(activeTags.size > 0 || debouncedQuery) && (
                  <button
                    onClick={clearFilters}
                    style={{
                      padding: "4px 11px",
                      borderRadius: 999,
                      fontSize: "0.71rem",
                      cursor: "pointer",
                      background: "rgba(255,97,136,.12)",
                      border: "1px solid rgba(255,97,136,.3)",
                      color: T.burgundy,
                      fontFamily: "'Inter',sans-serif",
                    }}
                  >
                    ✕ Clear
                  </button>
                )}
              </div>

              {/* Result count */}
              <p
                style={{
                  fontSize: "0.78rem",
                  color: T.silver,
                  marginTop: "0.75rem",
                  fontFamily: "'JetBrains Mono',monospace",
                }}
                aria-live="polite"
              >
                Showing{" "}
                <span style={{ color: T.coral, fontWeight: 700 }}>
                  {filteredProjects.length}
                </span>{" "}
                of {PROJECTS.length} projects
              </p>
            </motion.div>

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
                      "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: "1.5rem",
                    marginBottom: "4rem",
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
                  exit={{ opacity: 0 }}
                  style={{
                    textAlign: "center",
                    padding: "5rem 2rem",
                    color: T.silver,
                  }}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                    🔍
                  </div>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: T.white,
                      marginBottom: 8,
                    }}
                  >
                    No projects found
                  </h3>
                  <p style={{ fontSize: "0.85rem" }}>
                    Try different tags or clear the search.
                  </p>
                  <button
                    onClick={clearFilters}
                    style={{
                      marginTop: "1.25rem",
                      padding: "9px 22px",
                      borderRadius: 999,
                      background: T.gradHw,
                      border: "none",
                      color: T.charcoal,
                      fontFamily: "'Inter',sans-serif",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    Reset Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── SEO TAG CLOUD ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              style={{
                padding: "2rem",
                borderRadius: 24,
                background: "rgba(45,42,46,.6)",
                border: "1px solid rgba(255,255,255,.08)",
                backdropFilter: "blur(12px)",
                marginBottom: "5rem",
              }}
            >
              <h3
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: T.silver,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                Technologies &amp; Keywords
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {ALL_TAGS.map((tag) => {
                  const count = PROJECTS.filter((p) =>
                    p.tags.includes(tag),
                  ).length;
                  return (
                    <a
                      key={tag}
                      href={`/projects/hardware/tag/${tag}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "5px 12px",
                        borderRadius: 10,
                        fontSize: "0.76rem",
                        fontFamily: "'JetBrains Mono',monospace",
                        fontWeight: 500,
                        background: "rgba(255,255,255,.05)",
                        border: "1px solid rgba(255,255,255,.1)",
                        color: "rgba(252,252,250,.6)",
                        textDecoration: "none",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.color = T.coral;
                        el.style.background = `rgba(${T.catRgb},.13)`;
                        el.style.borderColor = `rgba(${T.catRgb},.35)`;
                        el.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.color = "rgba(252,252,250,.6)";
                        el.style.background = "rgba(255,255,255,.05)";
                        el.style.borderColor = "rgba(255,255,255,.1)";
                        el.style.transform = "none";
                      }}
                    >
                      #{tag}
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 999,
                          background: "rgba(255,255,255,.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.62rem",
                          fontWeight: 700,
                          color: T.silver,
                        }}
                      >
                        {count}
                      </span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </section>

          {/* ───── CTA BLOCK ───── */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            aria-label="Contact call to action"
            style={{
              position: "relative",
              padding: "3.5rem",
              borderRadius: 32,
              background: "rgba(45,42,46,.7)",
              border: "1px solid rgba(255,255,255,.1)",
              backdropFilter: "blur(16px)",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            {/* Shimmer top stripe */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, ${T.coral}, ${T.mint})`,
                backgroundSize: "200%",
              }}
            />

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "5px 14px",
                borderRadius: 999,
                background: `rgba(${T.catRgb},.13)`,
                border: `1px solid rgba(${T.catRgb},.3)`,
                fontSize: "0.72rem",
                fontWeight: 700,
                color: T.coral,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Hardware &amp; Embedded
            </span>

            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: T.white,
                marginBottom: "0.75rem",
              }}
            >
              Got a hardware project that needs{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${T.coral}, ${T.mint})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                precision engineering?
              </span>
            </h2>

            <p
              style={{
                fontSize: "1rem",
                color: "rgba(252,252,250,.62)",
                lineHeight: 1.65,
                maxWidth: 520,
                margin: "0 auto 2rem",
              }}
            >
              From firmware to cloud integration — if it blinks, beeps, or
              communicates over a protocol, let's talk about building it right.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <a
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 30px",
                  borderRadius: 999,
                  background: `linear-gradient(135deg, ${T.coral}, ${T.mint})`,
                  color: T.charcoal,
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  border: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    `0 8px 24px rgba(${T.catRgb},.45)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "none";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "none";
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Start a Project
              </a>
              <a
                href="/projects"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 28px",
                  borderRadius: 999,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,.2)",
                  color: "rgba(252,252,250,.8)",
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.22s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = `rgba(${T.catRgb},.1)`;
                  el.style.borderColor = `rgba(${T.catRgb},.4)`;
                  el.style.color = T.white;
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "transparent";
                  el.style.borderColor = "rgba(255,255,255,.2)";
                  el.style.color = "rgba(252,252,250,.8)";
                  el.style.transform = "none";
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                All Projects
              </a>
            </div>
          </motion.section>
        </main>

        {/* Project Detal Modal */}
        <ProjectModal
          project={selectedProject as any}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </>
  );
};

export default HardwareCategoryPage;
