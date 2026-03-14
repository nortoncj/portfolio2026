"use client";

import { useState, useEffect, useRef } from "react";
import { Skill } from "@/types/Skill";

// ─── Static badge color map — keyed by gradient name ─────────────────────────
// Inline styles = never purged by Tailwind, always legible on light glass bg
const BADGE_STYLES: Record<
  string,
  { bg: string; color: string; border: string }
> = {
  orange: {
    bg: "rgba(249,115,22,0.12)",
    color: "#c2410c",
    border: "rgba(249,115,22,0.35)",
  },
  purple: {
    bg: "rgba(147,51,234,0.12)",
    color: "#6b21a8",
    border: "rgba(147,51,234,0.35)",
  },
  skyBlue: {
    bg: "rgba(14,165,233,0.12)",
    color: "#0c4a6e",
    border: "rgba(14,165,233,0.35)",
  },
  yellow: {
    bg: "rgba(234,179,8,0.12)",
    color: "#713f12",
    border: "rgba(234,179,8,0.35)",
  },
  red: {
    bg: "rgba(220,38,38,0.12)",
    color: "#7f1d1d",
    border: "rgba(220,38,38,0.35)",
  },
  fuschia: {
    bg: "rgba(192,38,211,0.12)",
    color: "#701a75",
    border: "rgba(192,38,211,0.35)",
  },
  blue: {
    bg: "rgba(37,99,235,0.12)",
    color: "#1e3a8a",
    border: "rgba(37,99,235,0.35)",
  },
  slate: {
    bg: "rgba(71,85,105,0.12)",
    color: "#1e293b",
    border: "rgba(71,85,105,0.35)",
  },
  green: {
    bg: "rgba(22,163,74,0.12)",
    color: "#14532d",
    border: "rgba(22,163,74,0.35)",
  },
  smoke: {
    bg: "rgba(107,114,128,0.12)",
    color: "#1f2937",
    border: "rgba(107,114,128,0.35)",
  },
};

// Infer badge style from the skill.style Tailwind gradient string
function getBadgeStyle(styleStr?: string) {
  if (!styleStr) return BADGE_STYLES.slate;
  if (styleStr.includes("fuchsia") || styleStr.includes("pink"))
    return BADGE_STYLES.fuschia;
  if (styleStr.includes("sky")) return BADGE_STYLES.skyBlue;
  if (styleStr.includes("orange")) return BADGE_STYLES.orange;
  if (styleStr.includes("violet") || styleStr.includes("purple"))
    return BADGE_STYLES.purple;
  if (styleStr.includes("amber") || styleStr.includes("yellow"))
    return BADGE_STYLES.yellow;
  if (styleStr.includes("rose") || styleStr.includes("red"))
    return BADGE_STYLES.red;
  if (styleStr.includes("emerald") || styleStr.includes("green"))
    return BADGE_STYLES.green;
  if (styleStr.includes("blue") || styleStr.includes("cyan"))
    return BADGE_STYLES.blue;
  if (styleStr.includes("slate") || styleStr.includes("gray"))
    return BADGE_STYLES.slate;
  return BADGE_STYLES.slate;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function SkillItem({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<"top" | "bottom">("top");
  const itemRef = useRef<HTMLLIElement>(null);
  const badge = getBadgeStyle(skill.style);

  const handleOpen = () => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setPos(rect.top > 180 ? "top" : "bottom");
    }
    setOpen(true);
  };

  // Dismiss on outside click (mobile)
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <li
      ref={itemRef}
      className="skill-item"
      onMouseEnter={handleOpen}
      onMouseLeave={() => setOpen(false)}
      onFocus={handleOpen}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      aria-describedby={open ? `pop-${skill.name}` : undefined}
    >
      {/* Icon circle */}
      <span className={`skill-icon ${skill.style ?? ""}`}>
        <Icon color={skill.color || "white"} />
      </span>

      {/* Label */}
      <p className="skill-name">{skill.name}</p>

      {/* Popover */}
      {open && (
        <div
          id={`pop-${skill.name}`}
          role="tooltip"
          className={`skill-popover skill-popover--${pos}`}
        >
          <span
            className={`skill-popover__arrow skill-popover__arrow--${pos}`}
          />

          {/* Header */}
          <div className="skill-popover__header">
            <span className={`skill-popover__icon ${skill.style ?? ""}`}>
              <Icon color="white" size={13} />
            </span>
            <strong className="skill-popover__name">{skill.name}</strong>
          </div>

          {/* Description */}
          <p className="skill-popover__desc">{skill.description}</p>

          {/* Tags — inline styles, always legible */}
          {skill.tags?.length > 0 && (
            <div className="skill-popover__tags">
              {skill.tags.map((tag) => (
                <span
                  key={tag}
                  className="skill-popover__tag"
                  style={{
                    background: badge.bg,
                    color: badge.color,
                    border: `1px solid ${badge.border}`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </li>
  );
}
