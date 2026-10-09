"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { TagCount } from "./categoryTheme";

const COLLAPSED_COUNT = 12;

type Props = {
  tags: TagCount[];
  selected: string[];
  onToggle: (key: string) => void;
  onClear: () => void;
};

/**
 * Tech tag chips. Multi-select, match-any. Colors come from the nearest
 * data-category ancestor, so this matches whatever page it's dropped into.
 */
export default function TagFilter({
  tags,
  selected,
  onToggle,
  onClear,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  if (tags.length === 0) return null;

  const selectedSet = new Set(selected);
  const shown = expanded
    ? tags
    : tags.filter((t, i) => i < COLLAPSED_COUNT || selectedSet.has(t.key));
  const hidden = tags.length - shown.length;

  return (
    <div className="mb-10">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
          Filter by tool
        </p>
        <AnimatePresence>
          {selected.length > 0 && (
            <motion.button
              type="button"
              onClick={onClear}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="text-sm font-semibold text-[var(--cat-text)] underline-offset-4 hover:underline"
            >
              Clear {selected.length}{" "}
              {selected.length === 1 ? "filter" : "filters"}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <motion.ul
        layout
        className="flex flex-wrap gap-2"
        aria-label="Filter projects by tool"
      >
        <AnimatePresence initial={false}>
          {shown.map((t) => {
            const active = selectedSet.has(t.key);
            return (
              <motion.li
                key={t.key}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
              >
                <motion.button
                  type="button"
                  aria-pressed={active}
                  onClick={() => onToggle(t.key)}
                  whileTap={{ scale: 0.93 }}
                  className={`relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border px-3.5 py-1.5 text-sm font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--cat-accent)] ${
                    active
                      ? "border-transparent text-[var(--cat-on-accent)] shadow-[0_6px_20px_var(--cat-glow)]"
                      : "border-[var(--cat-border)] bg-[var(--cat-soft)] text-[var(--cat-text)] hover:border-[var(--cat-accent)]"
                  }`}
                  style={{
                    fontFamily: "var(--font-code), ui-monospace, monospace",
                  }}
                >
                  <AnimatePresence>
                    {active && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-0"
                        style={{ background: "var(--cat-gradient)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      />
                    )}
                  </AnimatePresence>

                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.svg
                        key="check"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="relative h-3.5 w-3.5"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 14, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        aria-hidden
                      >
                        <motion.path
                          d="M5 12.5l4.5 4.5L19 7.5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.25, delay: 0.05 }}
                        />
                      </motion.svg>
                    )}
                  </AnimatePresence>

                  <span className="relative">{t.label}</span>
                  <span
                    className={`relative text-xs ${active ? "opacity-80" : "opacity-60"}`}
                  >
                    {t.count}
                  </span>
                </motion.button>
              </motion.li>
            );
          })}
        </AnimatePresence>

        {(hidden > 0 || expanded) && tags.length > COLLAPSED_COUNT && (
          <motion.li layout>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="rounded-full px-3.5 py-1.5 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              {expanded ? "Show less" : `+${hidden} more`}
            </button>
          </motion.li>
        )}
      </motion.ul>
    </div>
  );
}
