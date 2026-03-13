"use client";

import { useState, useRef, useEffect } from "react";
import { Skill } from "@/types/Skill";

interface SkillItemProps {
  skill: Skill;
}

export function SkillItem({ skill }: SkillItemProps) {
  const Icon = skill.icon;
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<"top" | "bottom">("top");
  const itemRef = useRef<HTMLLIElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  // Flip popover above/below based on available viewport space
  const handleMouseEnter = () => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      // If less than 160px above, render below instead
      setPos(rect.top > 160 ? "top" : "bottom");
    }
    setOpen(true);
  };

  // Close on outside click (mobile tap support)
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setOpen(false)}
      onFocus={handleMouseEnter}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      aria-describedby={open ? `popover-${skill.name}` : undefined}
    >
      {/* Icon circle */}
      <span className={`skill-icon ${skill.style ?? ""}`}>
        <Icon color={skill?.color || "white"} />
      </span>

      {/* Label */}
      <p className="skill-name">{skill.name}</p>

      {/* Popover */}
      {open && (
        <div
          ref={popRef}
          id={`popover-${skill.name}`}
          role="tooltip"
          className={`skill-popover skill-popover--${pos}`}
        >
          {/* Arrow */}
          <span
            className={`skill-popover__arrow skill-popover__arrow--${pos}`}
          />

          {/* Icon + name header */}
          <div className="skill-popover__header">
            <span className={`skill-popover__icon ${skill.style ?? ""}`}>
              <Icon color={skill?.color || "white"} size={14} />
            </span>
            <strong className="skill-popover__name">{skill.name}</strong>
          </div>

          {/* Description */}
          <p className="skill-popover__desc">{skill.description}</p>

          {/* Tag badges */}
          {skill.tags?.length > 0 && (
            <div className="skill-popover__tags">
              {skill.tags.map((tag) => (
                <span
                  key={tag}
                  className={`skill-popover__tag ${skill.badgeColor ?? ""}`}
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
