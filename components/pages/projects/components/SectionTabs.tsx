"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowIcon, sanityLoader, type RichNode } from "./categoryTheme";

// ---------------------------------------------------------------------------
// Split the Portable Text write-up into sections at every H2
// ---------------------------------------------------------------------------
export type Section = { id: string; label: string; blocks: RichNode[] };

function plainText(node: RichNode): string {
  const children = node.children;
  if (!Array.isArray(children)) return "";
  return children
    .map((c) => {
      const text = (c as { text?: unknown }).text;
      return typeof text === "string" ? text : "";
    })
    .join("")
    .trim();
}

const toId = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "section";

export function splitSections(nodes: RichNode[] | null | undefined): Section[] {
  const sections: Section[] = [];
  let current: Section | null = null;
  for (const node of nodes ?? []) {
    if (node._type === "block" && node.style === "h2") {
      const label = plainText(node) || "Details";
      current = { id: toId(label), label, blocks: [] };
      sections.push(current);
      continue;
    }
    if (!current) {
      current = { id: "overview", label: "Overview", blocks: [] };
      sections.push(current);
    }
    current.blocks.push(node);
  }
  // unique ids even if two headings match
  const seen = new Map<string, number>();
  return sections
    .filter((s) => s.blocks.length > 0)
    .map((s) => {
      const n = seen.get(s.id) ?? 0;
      seen.set(s.id, n + 1);
      return n ? { ...s, id: `${s.id}-${n + 1}` } : s;
    });
}

// ---------------------------------------------------------------------------
// Section icons, picked from the heading text
// ---------------------------------------------------------------------------
function SectionIcon({ label }: { label: string }) {
  const l = label.toLowerCase();
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-4 w-4",
    "aria-hidden": true,
  };
  if (l.includes("challenge") || l.includes("problem"))
    return (
      <svg {...common}>
        <path d="M4 21V4m0 0h11l-2 4 2 4H4" />
      </svg>
    );
  if (l.includes("solution") || l.includes("approach") || l.includes("how"))
    return (
      <svg {...common}>
        <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3Z" />
      </svg>
    );
  if (l.includes("result") || l.includes("impact") || l.includes("outcome"))
    return (
      <svg {...common}>
        <path d="M3 3v18h18M7 15l4-4 3 3 5-6" />
      </svg>
    );
  if (l.includes("feature"))
    return (
      <svg {...common}>
        <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3Z" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Portable Text rendering, themed by the page's data-category
// ---------------------------------------------------------------------------
type CodeNode = { code?: string; language?: string; filename?: string };
type ImageNode = {
  url?: string;
  alt?: string;
  caption?: string;
  lqip?: string;
  width?: number;
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[17px] leading-[1.75] text-[var(--text-secondary)]">
        {children}
      </p>
    ),
    h3: ({ children }) => (
      <h3 className="pt-4 text-xl font-semibold tracking-tight text-[var(--text-primary)]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="pt-2 text-lg font-semibold text-[var(--text-primary)]">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="quote border-l-4 border-[var(--cat-accent)] pl-5 text-xl leading-relaxed text-[var(--text-primary)]">
        {children}
      </blockquote>
    ),
  },
  list: {
    // Bullet lists render as a grid of check cards. In these write-ups they're almost always feature lists.
    bullet: ({ children }) => (
      <ul className="grid gap-3 sm:grid-cols-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="ml-5 list-decimal space-y-2 text-[17px] leading-relaxed text-[var(--text-secondary)] marker:font-semibold marker:text-[var(--cat-text)]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3 rounded-[16px] border border-[var(--cat-border)] bg-[var(--cat-soft)] p-4 text-[15px] leading-snug text-[var(--text-primary)]">
        <span
          className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[var(--cat-on-accent)]"
          style={{ background: "var(--cat-gradient)" }}
          aria-hidden
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[var(--text-primary)]">
        {children}
      </strong>
    ),
    code: ({ children }) => (
      <code
        className="rounded-md bg-[var(--cat-soft)] px-1.5 py-0.5 text-[0.9em] text-[var(--cat-text)]"
        style={{ fontFamily: "var(--font-code), ui-monospace, monospace" }}
      >
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = (value as { href?: string } | undefined)?.href ?? "#";
      const blank =
        (value as { blank?: boolean } | undefined)?.blank ??
        /^https?:/.test(href);
      return (
        <a
          href={href}
          target={blank ? "_blank" : undefined}
          rel={blank ? "noopener noreferrer" : undefined}
          className="font-medium text-[var(--cat-text)] underline decoration-[var(--cat-accent)] decoration-2 underline-offset-4 hover:decoration-[var(--cat-text)]"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const v = value as ImageNode;
      if (!v.url) return null;
      return (
        <figure className="overflow-hidden rounded-[20px] border border-[var(--border-primary)]">
          <div className="relative aspect-[16/9]">
            <Image
              loader={sanityLoader}
              src={v.url}
              alt={v.alt ?? ""}
              fill
              sizes="(min-width: 1024px) 720px, 100vw"
              placeholder={v.lqip ? "blur" : "empty"}
              blurDataURL={v.lqip}
              className="object-cover"
            />
          </div>
          {v.caption && (
            <figcaption className="bg-[var(--surface-secondary)] px-4 py-3 text-sm text-[var(--text-secondary)]">
              {v.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => {
      const v = value as CodeNode;
      return (
        <figure className="overflow-hidden rounded-[16px] border border-[var(--border-primary)] bg-[#221f22]">
          {(v.filename || v.language) && (
            <figcaption className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-[#c1c0c0]">
              <span>{v.filename}</span>
              <span className="badge-tech px-2 py-0.5">{v.language}</span>
            </figcaption>
          )}
          <pre
            className="overflow-x-auto p-4 text-sm leading-relaxed text-[#fcfcfa]"
            style={{ fontFamily: "var(--font-code), ui-monospace, monospace" }}
          >
            <code>{v.code}</code>
          </pre>
        </figure>
      );
    },
  },
};

function Rich({ blocks }: { blocks: RichNode[] }) {
  return (
    <div className="space-y-5">
      <PortableText
        value={blocks}
        components={components}
        onMissingComponent={false}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------
type Props = {
  sections: Section[];
  /** Shown when there's no write-up at all */
  fallback?: ReactNode;
};

/**
 * The write-up as tabs instead of one long scroll.
 * Every panel stays in the HTML (inactive ones are `hidden`), so search engines
 * still index the full write-up even though visitors only see one tab at a time.
 */
export default function SectionTabs({ sections, fallback }: Props) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (sections.length === 0) return <>{fallback}</>;
  if (sections.length === 1) return <Rich blocks={sections[0].blocks} />;

  function select(i: number, focus = false) {
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
    // If the tab bar is stuck to the top (reader scrolled deep), bring the new panel's start into view.
    const top = rootRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0)
      rootRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = sections.length - 1;
    const map: Record<string, number> = {
      ArrowRight: i === last ? 0 : i + 1,
      ArrowLeft: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    };
    if (e.key in map) {
      e.preventDefault();
      select(map[e.key], true);
    }
  }

  const next = sections[active + 1];

  return (
    <div ref={rootRef} className="scroll-mt-24">
      <div className="sticky top-20 z-20 -mx-4 mb-8 px-4 py-2 backdrop-blur-xl sm:mx-0 sm:rounded-[20px] sm:border sm:border-[var(--border-primary)] sm:bg-[var(--surface-primary)]/75 sm:px-2">
        <div
          role="tablist"
          aria-label="Project write-up"
          className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {sections.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${s.id}`}
                aria-controls={`panel-${s.id}`}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative flex shrink-0 items-center gap-2 rounded-[14px] px-4 py-2.5 text-sm font-semibold outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--cat-accent)] ${
                  isActive
                    ? "text-[var(--cat-on-accent)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="section-tab-pill"
                    aria-hidden
                    className="absolute inset-0 rounded-[14px] shadow-[0_8px_24px_var(--cat-glow)]"
                    style={{ background: "var(--cat-gradient)" }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">
                  <SectionIcon label={s.label} />
                </span>
                <span className="relative">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {sections.map((s, i) => (
        <div
          key={s.id}
          role="tabpanel"
          id={`panel-${s.id}`}
          aria-labelledby={`tab-${s.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="outline-none"
        >
          <motion.div
            initial={false}
            animate={
              i === active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
            }
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Rich blocks={s.blocks} />
          </motion.div>
        </div>
      ))}

      {next && (
        <button
          type="button"
          onClick={() => select(active + 1)}
          className="group mt-10 flex w-full items-center justify-between gap-4 rounded-[20px] border border-[var(--cat-border)] bg-[var(--cat-soft)] px-6 py-5 text-left transition-colors hover:border-[var(--cat-accent)]"
        >
          <span>
            <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Up next
            </span>
            <span className="text-lg font-semibold text-[var(--text-primary)]">
              {next.label}
            </span>
          </span>
          <ArrowIcon className="h-5 w-5 text-[var(--cat-text)] transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      )}
    </div>
  );
}
