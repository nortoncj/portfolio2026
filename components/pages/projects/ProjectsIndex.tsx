"use client";

import { useMemo, useRef, useState } from "react";
import {
  LayoutGroup,
  MotionConfig,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import CategoryTiles, { CountUp } from "./components/categoryTiles";
import FeaturedSpotlight from "./components/FeaturedSpotlight";
import ProjectGrid from "./components/Projectgrid";
import {
  buildCategorySummaries,
  getCategoryTheme,
  type ProjectsIndexData,
} from "./components/categoryTheme";

type Props = {
  data: ProjectsIndexData;
  initialCategory?: string;
};

const ALL = "all";
const LINE_ONE = ["Work", "that"];
const LINE_TWO = ["does", "the", "work."];

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.08 + i * 0.07,
      type: "spring",
      stiffness: 110,
      damping: 16,
    },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function ProjectsIndex({ data, initialCategory }: Props) {
  const reduce = useReducedMotion();
  const gridRef = useRef<HTMLElement>(null);

  const categories = useMemo(
    () => buildCategorySummaries(data.categories, data.projects),
    [data.categories, data.projects],
  );

  const validSlugs = useMemo(
    () => new Set(categories.map((c) => c.slug)),
    [categories],
  );
  const [active, setActive] = useState<string>(
    initialCategory && validSlugs.has(initialCategory) ? initialCategory : ALL,
  );

  const visible = useMemo(
    () =>
      active === ALL
        ? data.projects
        : data.projects.filter((p) => p.category?.slug === active),
    [active, data.projects],
  );

  const liveCount = data.projects.filter(
    (p) => (p.status ?? "live") === "live",
  ).length;

  /** Update filter, keep the URL shareable (?category=devops) without a reload. */
  function select(slug: string, scrollToGrid = false) {
    setActive(slug);
    try {
      const url = new URL(window.location.href);
      if (slug === ALL) url.searchParams.delete("category");
      else url.searchParams.set("category", slug);
      window.history.replaceState(window.history.state, "", url);
    } catch {
      /* URL sync is a nice-to-have, never worth crashing over */
    }
    if (scrollToGrid) {
      gridRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    }
  }

  /** Clicking the active tile again clears the filter. */
  function toggleFromTile(slug: string) {
    select(active === slug ? ALL : slug, active !== slug);
  }

  const tabs = [
    { slug: ALL, title: "All", count: data.projects.length },
    ...categories.map((c) => ({
      slug: c.slug,
      title: c.title,
      count: c.count,
    })),
  ];

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative overflow-x-clip">
        {/* =========================== HERO =========================== */}
        <section className="relative isolate px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-36">
          <div aria-hidden className="meshBackground absolute inset-0 -z-20" />
          <div
            aria-hidden
            className="liquid-morph absolute -right-32 -top-20 -z-10 h-[28rem] w-[28rem] opacity-30 blur-3xl"
            style={{ background: "var(--heroVibrant)" }}
          />
          <div
            aria-hidden
            className="floating-soft absolute -left-24 top-1/2 -z-10 h-72 w-72 rounded-full opacity-25 blur-3xl"
            style={{ background: "var(--coolFlow)" }}
          />

          <div className="mx-auto max-w-6xl">
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="badge-glass inline-flex px-3 py-1 text-xs"
            >
              Portfolio
            </motion.span>

            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
              <span className="block">
                {LINE_ONE.map((w, i) => (
                  <motion.span
                    key={w}
                    variants={wordVariants}
                    initial="hidden"
                    animate="show"
                    custom={i}
                    className="mr-[0.25em] inline-block"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
              <span className="block">
                {LINE_TWO.map((w, i) => (
                  <motion.span
                    key={w}
                    variants={wordVariants}
                    initial="hidden"
                    animate="show"
                    custom={i + LINE_ONE.length}
                    className="mr-[0.25em] inline-block bg-clip-text pb-2 text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #e8365d, #ff6188, #ab9df2)",
                    }}
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.45}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]"
            >
              Cloud infrastructure, custom hardware, websites, and the marketing
              systems that tie them together. Built for real clients and real
              problems, not tutorials.
            </motion.p>

            <motion.dl
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.6}
              className="mt-10 flex flex-wrap gap-x-10 gap-y-4"
            >
              {[
                { label: "Projects", value: data.projects.length },
                { label: "Shipped", value: liveCount },
                { label: "Disciplines", value: categories.length },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    {s.label}
                  </dt>
                  <dd className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                    <CountUp to={s.value} />
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </section>

        {/* ======================== CATEGORIES ======================== */}
        <section
          aria-labelledby="disciplines-heading"
          className="px-4 pb-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              id="disciplines-heading"
              eyebrow="What I do"
              title="Pick a lane"
              blurb="Each tile filters the full list below. Click it again to show everything."
            />
            <LayoutGroup id="category-tiles">
              <CategoryTiles
                categories={categories}
                active={active}
                onSelect={toggleFromTile}
              />
            </LayoutGroup>
          </div>
        </section>

        {/* ========================= FEATURED ========================= */}
        {data.featured.length > 0 && (
          <section
            aria-labelledby="featured-heading"
            className="px-4 pb-24 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-6xl">
              <SectionHeading
                id="featured-heading"
                eyebrow="Highlights"
                title="Featured builds"
              />
              <LayoutGroup id="featured">
                <FeaturedSpotlight projects={data.featured} />
              </LayoutGroup>
            </div>
          </section>
        )}

        {/* ======================== ALL PROJECTS ======================= */}
        <section
          ref={gridRef}
          aria-labelledby="all-heading"
          className="scroll-mt-24 px-4 pb-32 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              id="all-heading"
              eyebrow="Everything"
              title="All projects"
            />

            {/* Filter tabs: sticky, with a sliding gradient pill */}
            <div className="sticky top-20 z-20 -mx-4 mb-10 px-4 py-3 backdrop-blur-xl sm:mx-0 sm:rounded-[20px] sm:border sm:border-[var(--border-primary)] sm:bg-[var(--surface-primary)]/70 sm:px-2 sm:py-2">
              <LayoutGroup id="filter-tabs">
                <div
                  role="tablist"
                  aria-label="Filter projects by category"
                  className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {tabs.map((t) => {
                    const isActive = active === t.slug;
                    const theme = getCategoryTheme(
                      t.slug === ALL ? null : t.slug,
                    );
                    return (
                      <button
                        key={t.slug}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => select(t.slug)}
                        className={`relative shrink-0 rounded-[14px] px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                          isActive
                            ? "text-[#fcfcfa]"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="filter-pill"
                            aria-hidden
                            className="absolute inset-0 rounded-[14px] shadow-[0_8px_24px_rgba(255,97,136,0.25)]"
                            style={{ background: theme.gradient }}
                            transition={{
                              type: "spring",
                              stiffness: 420,
                              damping: 34,
                            }}
                          />
                        )}
                        <span className="relative">
                          {t.title}
                          <span
                            className={`ml-2 text-xs ${isActive ? "opacity-90" : "opacity-60"}`}
                          >
                            {t.count}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>

            <ProjectGrid projects={visible} />
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  blurb,
}: {
  id: string;
  eyebrow: string;
  title: string;
  blurb?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mb-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pink)]">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl"
      >
        {title}
      </h2>
      {blurb && <p className="mt-2 text-[var(--text-secondary)]">{blurb}</p>}
    </motion.div>
  );
}
