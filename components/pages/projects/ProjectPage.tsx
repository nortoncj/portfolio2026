"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "motion/react";
import "@css/projects/category-themes.css";
import MediaViewer from "@/components/pages/projects/components/MediaViewer";
import SectionTabs, {
  splitSections,
} from "@/components/pages/projects/components/SectionTabs";
import {
  ArrowIcon,
  BLOG_BASE,
  formatDay,
  formatDuration,
  formatTimeline,
  getCategoryTheme,
  prettyType,
  projectHref,
  sanityLoader,
  youtubeId,
  type PostCardData,
  type ProjectPageData,
} from "@/components/pages/projects/components/categoryTheme";

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  }),
};

const STATUS_LABEL = {
  live: "Shipped",
  "in-progress": "In progress",
  archived: "Archived",
} as const;

// ---------------------------------------------------------------------------
// Small inline icons
// ---------------------------------------------------------------------------
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
function PostCard({ post, index }: { post: PostCardData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link
        href={`${BLOG_BASE}/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--border-primary)] bg-[var(--surface-primary)] shadow-[var(--soft-shadow)] transition-[box-shadow,border-color] duration-300 hover:border-[var(--cat-border)] hover:shadow-[0_16px_44px_var(--cat-glow)]"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-secondary)]">
          {post.image ? (
            <Image
              loader={sanityLoader}
              src={post.image.url}
              alt={post.image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              placeholder={post.image.lqip ? "blur" : "empty"}
              blurDataURL={post.image.lqip ?? undefined}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div
              className="h-full w-full opacity-80"
              style={{ background: "var(--cat-gradient)" }}
            />
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--cat-text)]">
            {[post.category, formatDay(post.publishedAt)]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <h3 className="mt-2 text-lg font-semibold leading-snug text-[var(--text-primary)]">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              {post.excerpt}
            </p>
          )}
          <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-[var(--cat-text)]">
            Read the post
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
export default function ProjectPage({ data }: { data: ProjectPageData }) {
  const reduce = useReducedMotion();
  const theme = getCategoryTheme(data.category?.slug);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [playSignal, setPlaySignal] = useState(0);

  // reading progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const sections = useMemo(
    () => splitSections(data.description),
    [data.description],
  );
  const yt = youtubeId(data.videoUrl);
  const type = prettyType(data.projectType);
  const status = data.status ?? "live";
  const timeline = formatTimeline(data.startedAt, data.completedAt);
  const duration = formatDuration(
    data.startedAt,
    data.completedAt,
    data.status,
  );
  const categorySlug = data.category?.slug ?? "";

  // Direct links first; fill with recent posts from the same category
  const posts = useMemo(() => {
    const seen = new Set(data.posts.map((p) => p._id));
    return [
      ...data.posts,
      ...data.categoryPosts.filter((p) => !seen.has(p._id)),
    ].slice(0, 3);
  }, [data.posts, data.categoryPosts]);
  const postsAreDirect = data.posts.length > 0;

  // prev / next inside the category (wraps around)
  const { prev, next } = useMemo(() => {
    const list = data.siblings;
    const i = list.findIndex((s) => s._id === data._id);
    if (i === -1 || list.length < 2) return { prev: null, next: null };
    const n = list[(i + 1) % list.length];
    const p = list[(i - 1 + list.length) % list.length];
    return { prev: list.length > 2 ? p : null, next: n };
  }, [data.siblings, data._id]);

  const primaryLink = data.liveUrl ?? data.githubUrl ?? null;

  function watchDemo() {
    setPlaySignal((n) => n + 1);
    mediaRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });
  }

  const facts = [
    { label: "Status", value: STATUS_LABEL[status] },
    { label: "Role", value: data.role },
    { label: "Client", value: data.client },
    { label: "Timeline", value: timeline },
    { label: "Duration", value: duration },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden
        data-category={categorySlug}
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left"
        style={{ scaleX: progress, background: "var(--cat-gradient)" }}
      />

      <main
        data-category={categorySlug}
        className={`relative overflow-x-clip ${primaryLink ? "pb-24 lg:pb-0" : ""}`}
      >
        {/* ============================ HERO ============================ */}
        <section className="relative isolate px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{ background: "var(--cat-hero-wash)" }}
          />

          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            {/* ---- pitch ---- */}
            <div>
              <motion.nav
                aria-label="Breadcrumb"
                variants={rise}
                initial="hidden"
                animate="show"
                custom={0}
              >
                <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <li>
                    <Link
                      href="/projects"
                      className="hover:text-[var(--text-primary)]"
                    >
                      Projects
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li>
                    <Link
                      href={`/projects/${categorySlug}`}
                      className="font-semibold text-[var(--cat-text)] hover:underline"
                    >
                      {data.category?.title}
                    </Link>
                  </li>
                </ol>
              </motion.nav>

              <motion.div
                variants={rise}
                initial="hidden"
                animate="show"
                custom={0.06}
                className="mt-6 flex flex-wrap items-center gap-2"
              >
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-[var(--cat-on-accent)]"
                  style={{ background: "var(--cat-gradient)" }}
                >
                  <theme.Icon className="h-3.5 w-3.5" />
                  {data.category?.title}
                </span>
                {type && (
                  <span className="rounded-full border border-[var(--cat-border)] bg-[var(--cat-soft)] px-3 py-1 text-xs font-semibold text-[var(--cat-text)]">
                    {type}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-primary)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                  <span className="relative flex h-2 w-2">
                    {status === "in-progress" && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--cat-accent)] opacity-70" />
                    )}
                    <span
                      className={`relative inline-flex h-2 w-2 rounded-full ${
                        status === "archived"
                          ? "bg-[var(--text-muted)]"
                          : "bg-[var(--cat-accent)]"
                      }`}
                    />
                  </span>
                  {STATUS_LABEL[status]}
                </span>
              </motion.div>

              <motion.h1
                variants={rise}
                initial="hidden"
                animate="show"
                custom={0.12}
                className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl"
              >
                {data.title}
              </motion.h1>

              {data.summary && (
                <motion.p
                  variants={rise}
                  initial="hidden"
                  animate="show"
                  custom={0.2}
                  className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]"
                >
                  {data.summary}
                </motion.p>
              )}

              {data.impact && (
                <motion.div
                  variants={rise}
                  initial="hidden"
                  animate="show"
                  custom={0.28}
                  className="mt-6 flex gap-3 rounded-[18px] border border-[var(--cat-border)] bg-[var(--cat-soft)] p-4"
                >
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] text-[var(--cat-on-accent)]"
                    style={{ background: "var(--cat-gradient)" }}
                    aria-hidden
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 17l6-6 4 4 8-8M21 7v6M21 7h-6" />
                    </svg>
                  </span>
                  <p className="font-medium leading-snug text-[var(--text-primary)]">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--cat-text)]">
                      The result
                    </span>
                    {data.impact}
                  </p>
                </motion.div>
              )}

              <motion.div
                variants={rise}
                initial="hidden"
                animate="show"
                custom={0.36}
                className="mt-8 flex flex-wrap gap-3"
              >
                {data.liveUrl && (
                  <a
                    href={data.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-[16px] px-6 py-3.5 text-sm font-semibold text-[var(--cat-on-accent)] shadow-[0_10px_30px_var(--cat-glow)] transition-transform duration-200 hover:-translate-y-0.5"
                    style={{ background: "var(--cat-gradient)" }}
                  >
                    Visit live site
                    <ExternalIcon className="h-4 w-4" />
                  </a>
                )}
                {yt && (
                  <button
                    type="button"
                    onClick={watchDemo}
                    className={`inline-flex items-center gap-2 rounded-[16px] px-6 py-3.5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 ${
                      data.liveUrl
                        ? "border-2 border-[var(--cat-border)] text-[var(--cat-text)] hover:border-[var(--cat-accent)]"
                        : "text-[var(--cat-on-accent)] shadow-[0_10px_30px_var(--cat-glow)]"
                    }`}
                    style={
                      data.liveUrl
                        ? undefined
                        : { background: "var(--cat-gradient)" }
                    }
                  >
                    <PlayIcon className="h-4 w-4" />
                    Watch demo
                  </button>
                )}
                {data.githubUrl && (
                  <a
                    href={data.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-[16px] border-2 border-[var(--border-primary)] px-6 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--cat-accent)]"
                  >
                    <GitHubIcon className="h-4 w-4" />
                    Source code
                  </a>
                )}
              </motion.div>
            </div>

            {/* ---- media ---- */}
            <motion.div
              ref={mediaRef}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <MediaViewer
                title={data.title}
                categorySlug={categorySlug}
                cover={data.image}
                gallery={data.gallery}
                youtube={yt}
                playSignal={playSignal}
              />
            </motion.div>
          </div>
        </section>

        {/* ===================== WRITE-UP + AT A GLANCE ===================== */}
        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* At a glance: first on mobile (compact), right rail on desktop */}
            <aside className="lg:col-start-2 lg:row-start-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[24px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-6 shadow-[var(--soft-shadow)] lg:sticky lg:top-24"
              >
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--cat-text)]">
                  At a glance
                </h2>

                {facts.length > 0 && (
                  <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 lg:grid-cols-1">
                    {facts.map((f) => (
                      <div key={f.label}>
                        <dt className="text-xs text-[var(--text-secondary)]">
                          {f.label}
                        </dt>
                        <dd className="font-semibold text-[var(--text-primary)]">
                          {f.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {(data.techStack?.length ?? 0) > 0 && (
                  <div className="mt-6 border-t border-[var(--border-primary)] pt-5">
                    <p className="text-xs text-[var(--text-secondary)]">
                      Built with
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {data.techStack?.map((t) => (
                        <li key={t}>
                          <Link
                            href={`/projects/${categorySlug}?tags=${encodeURIComponent(t.trim().toLowerCase())}`}
                            title={`More ${data.category?.title ?? ""} projects using ${t}`}
                            className="inline-block rounded-[8px] border border-[var(--cat-border)] bg-[var(--cat-soft)] px-2.5 py-1 text-xs text-[var(--cat-text)] transition-colors hover:border-[var(--cat-accent)]"
                            style={{
                              fontFamily:
                                "var(--font-code), ui-monospace, monospace",
                            }}
                          >
                            {t}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(data.liveUrl || data.githubUrl) && (
                  <div className="mt-6 hidden flex-col gap-2 border-t border-[var(--border-primary)] pt-5 lg:flex">
                    {data.liveUrl && (
                      <a
                        href={data.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-[12px] px-4 py-2.5 text-sm font-semibold text-[var(--cat-on-accent)]"
                        style={{ background: "var(--cat-gradient)" }}
                      >
                        Live site <ExternalIcon className="h-4 w-4" />
                      </a>
                    )}
                    {data.githubUrl && (
                      <a
                        href={data.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-[12px] border border-[var(--border-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--cat-accent)]"
                      >
                        Source code <GitHubIcon className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            </aside>

            <article className="min-w-0 lg:col-start-1 lg:row-start-1">
              <SectionTabs
                sections={sections}
                fallback={
                  <p className="text-[17px] leading-[1.75] text-[var(--text-secondary)]">
                    {data.summary ?? "Full write-up coming soon."}
                  </p>
                }
              />
            </article>
          </div>
        </section>

        {/* ========================= RELATED POSTS ========================= */}
        {posts.length > 0 && (
          <section
            aria-labelledby="posts-heading"
            className="border-t border-[var(--border-primary)] px-4 py-20 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-6xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--cat-text)]">
                {postsAreDirect ? "Behind the build" : "Keep reading"}
              </p>
              <h2
                id="posts-heading"
                className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text-primary)]"
              >
                {postsAreDirect
                  ? "Read the story behind this project"
                  : `More on ${data.category?.title ?? "this"}`}
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((p, i) => (
                  <PostCard key={p._id} post={p} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ========================== PREV / NEXT ========================== */}
        {next && (
          <nav
            aria-label="More projects"
            className="px-4 pb-28 sm:px-6 lg:px-8"
          >
            <div
              className={`mx-auto grid max-w-6xl gap-4 ${prev ? "sm:grid-cols-2" : ""}`}
            >
              {prev && (
                <Link
                  href={projectHref({
                    slug: prev.slug,
                    category: data.category,
                  })}
                  className="group rounded-[24px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--cat-border)] hover:shadow-[0_14px_40px_var(--cat-glow)]"
                >
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    <ArrowIcon className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
                    Previous
                  </span>
                  <span className="mt-2 block text-lg font-semibold text-[var(--text-primary)]">
                    {prev.title}
                  </span>
                </Link>
              )}
              <Link
                href={projectHref({ slug: next.slug, category: data.category })}
                className="group relative overflow-hidden rounded-[24px] p-6 text-right text-[var(--cat-on-accent)] shadow-[0_14px_40px_var(--cat-glow)] transition-transform duration-300 hover:-translate-y-1"
                style={{ background: "var(--cat-gradient)" }}
              >
                <span
                  className="shimmer pointer-events-none absolute inset-0 opacity-40"
                  aria-hidden
                />
                <span className="relative flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-wider opacity-80">
                  Next {data.category?.title} project
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="relative mt-2 block text-lg font-semibold">
                  {next.title}
                </span>
              </Link>
            </div>
            <div className="mx-auto mt-6 max-w-6xl text-center">
              <Link
                href={`/projects/${categorySlug}`}
                className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                See all {data.category?.title} projects
              </Link>
            </div>
          </nav>
        )}

        {/* =================== MOBILE STICKY ACTION BAR =================== */}
        {primaryLink && (
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-primary)] bg-[var(--surface-primary)]/90 px-4 py-3 backdrop-blur-xl lg:hidden">
            <div className="flex gap-3">
              <a
                href={primaryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-[14px] py-3 text-sm font-semibold text-[var(--cat-on-accent)]"
                style={{ background: "var(--cat-gradient)" }}
              >
                {data.liveUrl ? "Visit live site" : "View source"}
                {data.liveUrl ? (
                  <ExternalIcon className="h-4 w-4" />
                ) : (
                  <GitHubIcon className="h-4 w-4" />
                )}
              </a>
              {yt && (
                <button
                  type="button"
                  onClick={watchDemo}
                  aria-label="Watch demo"
                  className="grid w-12 place-items-center rounded-[14px] border border-[var(--cat-border)] text-[var(--cat-text)]"
                >
                  <PlayIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </MotionConfig>
  );
}
