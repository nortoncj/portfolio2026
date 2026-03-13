"use client";
import React from "react";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { emailSkills, webSkills, engineeringSkills } from "@/data/skills"; // 🔁 update path
import { Skill } from "@/types/Skill";

// ─── DevOps pulled from webSkills until you add a dedicated array ────────────
const DEVOPS_NAMES = [
  "AWS",
  "Docker",
  "Git",
  "Node.js",
  "PostgreSQL",
  "REST APIs",
  "TypeScript",
];
const devopsSkills: Skill[] = webSkills.filter((s) =>
  DEVOPS_NAMES.includes(s.name),
);

import "@css/skills.css";
import { SkillItem } from "./skillItem";

const TABS = [
  { key: "marketing", label: "Marketing", skills: emailSkills },
  { key: "devops", label: "DevOps", skills: devopsSkills },
  { key: "web", label: "Web", skills: webSkills },
  { key: "hardware", label: "Hardware", skills: engineeringSkills },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function SkillSection() {
  const [active, setActive] = useState<TabKey>("marketing");
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const [animating, setAnimating] = useState(false);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const navRef = useRef<HTMLDivElement>(null);

  // Move the sliding pill to the active button
  useLayoutEffect(() => {
    const btn = btnRefs.current[active];
    const nav = navRef.current;
    if (!btn || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setPillStyle({
      left: btnRect.left - navRect.left,
      width: btnRect.width,
    });
  }, [active]);

  // Fade the grid when switching tabs
  const handleTabChange = (key: TabKey) => {
    if (key === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(key);
      setAnimating(false);
    }, 160);
  };

  const currentSkills = TABS.find((t) => t.key === active)!.skills;
  return (
    <section className="skills-section">
      <div className="lightGlass text-center center skillsNav">
        <div
          className="nav nav-tabs text-center center skills-nav"
          ref={navRef}
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              ref={(el) => {
                btnRefs.current[tab.key] = el;
              }}
              onClick={() => handleTabChange(tab.key)}
              className={`skill-btn ${active === tab.key ? "skill-btn--active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="glass-card skill-container">
        <ul
          className="skill-list"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(6px)" : "translateY(0)",
            transition: "opacity 0.16s ease, transform 0.16s ease",
          }}
        >
          {currentSkills.map((skill) => {
            const Icon = skill.icon;
            return <SkillItem key={skill.name} skill={skill} />;
          })}
        </ul>
      </div>
    </section>
  );
}

export default SkillSection;
