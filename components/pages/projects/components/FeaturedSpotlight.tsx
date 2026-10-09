"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowIcon,
  getCategoryTheme,
  prettyType,
  projectHref,
  sanityLoader,
  type ProjectCardData,
} from "./categoryTheme";

const SLIDE_MS = 6500;

type Props = { projects: ProjectCardData[] };

/**
 * Auto-rotating featured showcase. Big panel on the left, a selectable list
 * with progress bars on the right. Pauses on hover or keyboard focus, and
 * stops rotating entirely for reduced-motion users.
 */
export default function FeaturedSpotlight({ projects }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const rotating = !paused && !reduce && projects.length > 1;

  useEffect(() => {
    if (!rotating) return;
    const t = window.setTimeout(
      () => setActive((a) => (a + 1) % projects.length),
      SLIDE_MS,
    );
    return () => window.clearTimeout(t);
  }, [active, rotating, projects.length]);

  if (projects.length === 0) return null;

  const current = projects[Math.min(active, projects.length - 1)];
  const theme = getCategoryTheme(current.category?.slug);
  const type = prettyType(current.projectType);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured projects"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null))
          setPaused(false);
      }}
      className="grid gap-6 lg:grid-cols-[1.5fr_1fr]"
    >
      {/* ---------------- Big panel ---------------- */}
      <div className="relative isolate">
        {/* morphing color blob behind the panel, tinted by category */}
        <motion.div
          aria-hidden
          className="liquid-morph absolute -inset-6 -z-10 opacity-40 blur-3xl"
          animate={{ background: theme.gradient }}
          transition={{ duration: 0.8 }}
        />

        <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] border border-[var(--border-primary)] bg-[var(--surface-secondary)] shadow-[var(--premium-shadow)] sm:aspect-[16/10]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.article
              key={current._id}
              aria-roledescription="slide"
              aria-label={`${active + 1} of ${projects.length}: ${current.title}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {current.image ? (
                <Image
                  loader={sanityLoader}
                  src={current.image.url}
                  alt={current.image.alt}
                  fill
                  priority={active === 0}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  placeholder={current.image.lqip ? "blur" : "empty"}
                  blurDataURL={current.image.lqip ?? undefined}
                  className="object-cover"
                />
              ) : (
                <div
                  className="shimmer absolute inset-0"
                  style={{ background: theme.gradient }}
                />
              )}

              {/* legibility gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 text-[#fcfcfa] sm:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                    <span
                      className="rounded-full px-3 py-1 text-[#2d2a2e]"
                      style={{ background: theme.accent }}
                    >
                      {current.category?.title ?? "Project"}
                    </span>
                    {type && (
                      <span className="rounded-full border border-white/30 px-3 py-1 backdrop-blur-sm">
                        {type}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 max-w-2xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                    {current.title}
                  </h3>

                  {(current.impact || current.summary) && (
                    <p className="mt-3 line-clamp-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
                      {current.impact ?? current.summary}
                    </p>
                  )}

                  <Link
                    href={projectHref(current)}
                    className="group mt-6 inline-flex items-center gap-2 rounded-[16px] bg-[#fcfcfa] px-5 py-3 text-sm font-semibold text-[#2d2a2e] transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    See how it works
                    <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      {/* ---------------- Selector list ---------------- */}
      <ol
        className="flex flex-col gap-3"
        aria-label="Choose a featured project"
      >
        {projects.map((p, i) => {
          const t = getCategoryTheme(p.category?.slug);
          const isActive = i === active;
          return (
            <li key={p._id}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={isActive}
                className={`group relative w-full overflow-hidden rounded-[24px] border p-5 text-left transition-colors duration-300 ${
                  isActive
                    ? "border-transparent bg-[var(--surface-primary)] shadow-[var(--medium-shadow)]"
                    : "border-[var(--border-primary)] bg-transparent hover:bg-[var(--surface-primary)]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="featured-active-bg"
                    aria-hidden
                    className="absolute inset-0 rounded-[24px]"
                    style={{ boxShadow: `inset 0 0 0 1.5px ${t.accent}` }}
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}

                <div className="relative flex items-center gap-4">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] text-[#fcfcfa]"
                    style={{ background: t.gradient }}
                  >
                    <t.Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                      {p.category?.title}
                    </p>
                    <p className="truncate font-semibold text-[var(--text-primary)]">
                      {p.title}
                    </p>
                  </div>
                </div>

                {/* progress bar for the active slide */}
                <span className="relative mt-4 block h-1 overflow-hidden rounded-full bg-[var(--border-primary)]">
                  {isActive && (
                    <motion.span
                      key={`${active}-${rotating}`}
                      className="absolute inset-0 origin-left rounded-full"
                      style={{ background: t.gradient }}
                      initial={{ scaleX: rotating ? 0 : 1 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: rotating ? SLIDE_MS / 1000 : 0,
                        ease: "linear",
                      }}
                    />
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
