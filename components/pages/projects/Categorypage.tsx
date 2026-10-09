"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import "@css/projects/category-themes.css";
import { CountUp } from "./components/categoryTiles";
import ProjectGrid from "./components/Projectgrid";
import TagFilter from "./components/Tagfilter";
import {
  ArrowIcon,
  buildTags,
  getCategoryTheme,
  sanityLoader,
  type CategoryPageData,
} from "./components/categoryTheme";

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

const HERO_FADE =
  "linear-gradient(to top, var(--background) 4%, color-mix(in srgb, var(--background) 85%, transparent) 34%, color-mix(in srgb, var(--background) 35%, transparent) 66%, transparent 100%)";

export default function CategoryPage({ data }: { data: CategoryPageData }) {
  const theme = getCategoryTheme(data.slug);
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);

  // ---- parallax: image drifts slower than the page, copy fades as you leave the hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // ---- tags
  const tags = useMemo(() => buildTags(data.projects), [data.projects]);
  const [selected, setSelected] = useState<string[]>([]);

  // Read ?tags= on load. Done client-side so the page itself stays statically generated.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("tags");
    if (!param) return;
    const valid = new Set(tags.map((t) => t.key));
    const fromUrl = param
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter((k) => valid.has(k));
    if (fromUrl.length) setSelected(fromUrl);
  }, [tags]);

  function commit(next: string[]) {
    setSelected(next);
    try {
      const url = new URL(window.location.href);
      if (next.length) url.searchParams.set("tags", next.join(","));
      else url.searchParams.delete("tags");
      window.history.replaceState(window.history.state, "", url);
    } catch {
      /* URL sync is optional */
    }
  }

  const toggle = (key: string) =>
    commit(
      selected.includes(key)
        ? selected.filter((k) => k !== key)
        : [...selected, key],
    );

  const visible = useMemo(() => {
    if (selected.length === 0) return data.projects;
    return data.projects.filter((p) =>
      (p.techStack ?? []).some((t) =>
        selected.includes(t.trim().toLowerCase()),
      ),
    );
  }, [data.projects, selected]);

  const liveCount = data.projects.filter(
    (p) => (p.status ?? "live") === "live",
  ).length;
  const intro = data.description?.trim() || theme.tagline;

  const heroSrc = data.heroImage?.url ?? theme.heroSrc;
  const heroAlt = data.heroImage?.alt ?? `${data.title} projects`;
  const heroFromSanity = Boolean(data.heroImage?.url);

  return (
    <MotionConfig reducedMotion="user">
      <main data-category={data.slug} className="relative overflow-x-clip">
        {/* ============================ HERO ============================ */}
        <section
          ref={heroRef}
          className="relative isolate flex min-h-[72vh] items-end overflow-hidden pt-28 lg:min-h-[80vh]"
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 -z-30"
            style={reduce ? undefined : { y: imageY, scale: imageScale }}
          >
            {heroSrc ? (
              <Image
                src={heroSrc}
                alt={heroAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                {...(heroFromSanity
                  ? {
                      loader: sanityLoader,
                      placeholder: data.heroImage?.lqip
                        ? ("blur" as const)
                        : ("empty" as const),
                      blurDataURL: data.heroImage?.lqip ?? undefined,
                    }
                  : {})}
              />
            ) : (
              <div
                className="h-full w-full"
                style={{ background: "var(--cat-gradient)" }}
              />
            )}
          </motion.div>

          {/* category color wash, then a fade into the page background so copy reads in light and dark */}
          <div
            aria-hidden
            className="absolute inset-0 -z-20"
            style={{ background: "var(--cat-hero-wash)" }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{ background: HERO_FADE }}
          />
          <div
            aria-hidden
            className="liquid-morph absolute -right-24 bottom-10 -z-10 h-80 w-80 opacity-30 blur-3xl"
            style={{ background: "var(--cat-gradient)" }}
          />

          <motion.div
            style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
            className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8"
          >
            <motion.nav
              aria-label="Breadcrumb"
              variants={rise}
              initial="hidden"
              animate="show"
              custom={0}
              className="mb-6 text-sm"
            >
              <ol className="flex items-center gap-2 text-[var(--text-secondary)]">
                <li>
                  <Link
                    href="/projects"
                    className="hover:text-[var(--text-primary)]"
                  >
                    Projects
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li
                  aria-current="page"
                  className="font-semibold text-[var(--cat-text)]"
                >
                  {data.title}
                </li>
              </ol>
            </motion.nav>

            <motion.span
              variants={rise}
              initial="hidden"
              animate="show"
              custom={0.08}
              className="floating-soft grid h-14 w-14 place-items-center rounded-[18px] text-[var(--cat-on-accent)] shadow-[0_12px_32px_var(--cat-glow)]"
              style={{ background: "var(--cat-gradient)" }}
            >
              <theme.Icon className="h-7 w-7" />
            </motion.span>

            <motion.h1
              variants={rise}
              initial="hidden"
              animate="show"
              custom={0.16}
              className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl"
            >
              {data.title}
              <span
                className="block bg-clip-text pb-2 text-transparent"
                style={{ backgroundImage: "var(--cat-gradient)" }}
              >
                projects.
              </span>
            </motion.h1>

            {intro && (
              <motion.p
                variants={rise}
                initial="hidden"
                animate="show"
                custom={0.28}
                className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]"
              >
                {intro}
              </motion.p>
            )}

            <motion.dl
              variants={rise}
              initial="hidden"
              animate="show"
              custom={0.4}
              className="mt-10 flex flex-wrap gap-x-10 gap-y-4"
            >
              {[
                { label: "Projects", value: data.projects.length },
                { label: "Shipped", value: liveCount },
                { label: "Tools used", value: tags.length },
              ].map((s) => (
                <div
                  key={s.label}
                  className="border-l-2 border-[var(--cat-accent)] pl-4"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    {s.label}
                  </dt>
                  <dd className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                    <CountUp to={s.value} />
                  </dd>
                </div>
              ))}
            </motion.dl>

            <motion.button
              type="button"
              variants={rise}
              initial="hidden"
              animate="show"
              custom={0.5}
              onClick={() =>
                workRef.current?.scrollIntoView({
                  behavior: reduce ? "auto" : "smooth",
                  block: "start",
                })
              }
              className="group mt-10 inline-flex items-center gap-2 rounded-[16px] px-6 py-3.5 text-sm font-semibold text-[var(--cat-on-accent)] shadow-[0_10px_30px_var(--cat-glow)] transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "var(--cat-gradient)" }}
            >
              See the work
              <ArrowIcon className="h-4 w-4 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
            </motion.button>
          </motion.div>
        </section>

        {/* ============================ WORK ============================ */}
        <section
          ref={workRef}
          aria-labelledby="work-heading"
          className="scroll-mt-24 px-4 pb-24 pt-8 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--cat-text)]">
                  The work
                </p>
                <h2
                  id="work-heading"
                  className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl"
                >
                  {selected.length
                    ? "Filtered projects"
                    : `Every ${data.title} project`}
                </h2>
              </div>
              <p
                className="text-sm text-[var(--text-secondary)]"
                aria-live="polite"
              >
                Showing{" "}
                <span className="font-semibold text-[var(--text-primary)]">
                  {visible.length}
                </span>{" "}
                of {data.projects.length}
              </p>
            </div>

            <TagFilter
              tags={tags}
              selected={selected}
              onToggle={toggle}
              onClear={() => commit([])}
            />

            <ProjectGrid
              projects={visible}
              animateFirstRender
              empty={
                <div className="rounded-[24px] border border-dashed border-[var(--cat-border)] bg-[var(--cat-soft)] p-12 text-center">
                  <p className="font-semibold text-[var(--text-primary)]">
                    Nothing matches those tools.
                  </p>
                  <button
                    type="button"
                    onClick={() => commit([])}
                    className="mt-3 text-sm font-semibold text-[var(--cat-text)] underline-offset-4 hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              }
            />
          </div>
        </section>

        {/* ======================= KEEP EXPLORING ======================= */}
        {data.others.length > 0 && (
          <section
            aria-labelledby="more-heading"
            className="px-4 pb-32 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-6xl">
              <h2
                id="more-heading"
                className="mb-6 text-2xl font-semibold tracking-tight text-[var(--text-primary)]"
              >
                Keep exploring
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {data.others.map((o, i) => {
                  const t = getCategoryTheme(o.slug);
                  return (
                    <motion.div
                      key={o._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        delay: i * 0.07,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={`/projects/${o.slug}`}
                        data-category={o.slug}
                        className="group relative flex items-center gap-4 overflow-hidden rounded-[20px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-5 shadow-[var(--soft-shadow)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--cat-border)] hover:shadow-[0_14px_40px_var(--cat-glow)]"
                      >
                        <span
                          className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] text-[var(--cat-on-accent)]"
                          style={{ background: "var(--cat-gradient)" }}
                        >
                          <t.Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-semibold text-[var(--text-primary)]">
                            {o.title}
                          </span>
                          <span className="text-sm text-[var(--cat-text)]">
                            {o.count} {o.count === 1 ? "project" : "projects"}
                          </span>
                        </span>
                        <ArrowIcon className="ml-auto h-4 w-4 shrink-0 text-[var(--cat-text)] transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <Link
                href="/projects"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <ArrowIcon className="h-4 w-4 rotate-180" />
                All projects
              </Link>
            </div>
          </section>
        )}
      </main>
    </MotionConfig>
  );
}
