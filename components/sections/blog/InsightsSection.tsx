"use client";

import { useMemo, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PostPreview } from "@/types/Post";
import "@css/insights/style.css";



type Article = {
  slug: string;
  categories: { slug: string; title: string }[];
  tags: string[];
  title: string;
  excerpt: string;
  dateLabel: string;
  dateISO: string;
    readLabel: string;
  image?: string;
  imageAlt: string;
  featured?: boolean;
};

const PAGE_SIZE = 12;

const ArrowRight = ({ size = 13 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function TagPill({ tag }: { tag: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      className="card-tag"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/insights?tag=${encodeURIComponent(tag)}`);
      }}
    >
      {tag}
    </button>
  );
}

function FeaturedCard({ article }: { article: Article }) {
  const primaryCat = article.categories[0];

  return (
    <article className="featured-card insight-card" role="listitem">
      <div className="featured-image-wrap">
        <div className="featured-shimmer" />
        {article.image ? (
          <Image
            className="featured-image"
            src={article.image}
            alt={article.imageAlt}
            width={1200}
            height={480}
            priority={false}
          />
        ) : (
          <div
            className="featured-image featured-image--fallback"
            aria-hidden="true"
          />
        )}
        <div className="featured-image-overlay" />
        <span className="featured-badge">⭐ Featured</span>
      </div>

      <div className="featured-body">
        <div className="featured-top">
          {primaryCat && (
            <div className="featured-category">
              <span
                className={`card-category cat-${primaryCat.slug}`}
                style={{ position: "static" }}
              >
                {primaryCat.title}
              </span>
            </div>
          )}

          <h2 className="featured-title">{article.title}</h2>
          <p className="featured-excerpt">{article.excerpt}</p>

          <div className="featured-tags">
            {article.tags.map((tag) => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>
        </div>

        <div className="featured-footer">
          <div className="featured-meta">
            <span>{article.dateLabel}</span>
            <span>{article.readLabel}</span>
          </div>

          <Link
            href={`/insights/${article.slug}`}
            className="btn-read-featured"
          >
            Read Article <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const primaryCat = article.categories[0];

  return (
    <article className="insight-card" role="listitem">
      <Link href={`/insights/${article.slug}`} className="card-link-wrap">
        <div className="card-image-wrap">
          {article.image ? (
            <Image
              className="card-image"
              src={article.image}
              alt={article.imageAlt}
              width={600}
              height={340}
              loading="lazy"
            />
          ) : (
            <div
              className="card-image card-image--fallback"
              aria-hidden="true"
            />
          )}

          <div className="card-image-overlay" />
          {primaryCat && (
            <span className={`card-category cat-${primaryCat.slug}`}>
              {primaryCat.title}
            </span>
          )}
        </div>

        <div className="card-body">
          <div className="card-meta">
            <span>{article.dateLabel}</span>
            <span className="card-meta-dot" />
            <span>{article.readLabel}</span>
          </div>

          <h3 className="card-title">{article.title}</h3>
          <p className="card-excerpt">{article.excerpt}</p>

          <div className="card-footer">
            <div className="card-author">
              <div className="card-author-avatar">C</div>
              <span>Chris</span>
            </div>
            <span className="card-read-link">
              Read <ArrowRight />
            </span>
          </div>
        </div>
      </Link>

      {/* Tags OUTSIDE Link to avoid nested anchors */}
      <div className="card-tags">
        {article.tags.map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>
    </article>
  );
}

export default function InsightsSectionClient({
  posts,
}: {
  posts: PostPreview[];
}) {
  const [activeCat, setActiveCat] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  // Convert Sanity → Article
  const articles: Article[] = useMemo(() => {
    return posts.map((p) => {
      const categories = (p.categories ?? []).map((c) => ({
        slug: c.slug,
        title: c.title,
      }));
      const tags = (p.tags ?? []).map((t) => t.title);

      // If you add readTime to your getPosts query, use it here.
      // Otherwise just show a placeholder or compute server-side.
      const readLabel =  "2 min read";

      return {
        slug: p.slug,
        categories,
        tags,
        title: p.title,
        excerpt: p.excerpt,
        dateISO: p.publishedAt,
        dateLabel: formatDate(p.publishedAt),
        readLabel,
        image: p.image?.asset?.url,
        imageAlt: p.image?.alt ?? p.title,
        featured: p.featured,
      };
    });
  }, [posts]);

  // Build categories dynamically from Sanity data (no hard-coded map)
  const categories = useMemo(() => {
    const map = new Map<string, string>();
    for (const a of articles) {
      for (const c of a.categories) map.set(c.slug, c.title);
    }
    const derived = Array.from(map.entries())
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map(([key, label]) => ({ key, label }));

    return [{ key: "all", label: "All" }, ...derived];
  }, [articles]);

  // Filter + search
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    return articles.filter((a) => {
      const catMatch =
        activeCat === "all" || a.categories.some((c) => c.slug === activeCat);

      if (!catMatch) return false;
      if (!q) return true;

      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        a.categories.some((c) => c.title.toLowerCase().includes(q))
      );
    });
  }, [articles, activeCat, query]);

  const featured = useMemo(() => {
    if (activeCat !== "all") return undefined;

    return [...filtered]
      .filter((a) => a.featured)
      .sort(
        (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime(),
      )[0];
  }, [filtered, activeCat]);

  const nonFeatured = useMemo(() => {
    if (!featured) return filtered;
    return filtered.filter((a) => a.slug !== featured.slug);
  }, [filtered, featured]);

  const visible = nonFeatured.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < nonFeatured.length;


  const handleCat = useCallback((key: string) => {
    setActiveCat(key);
    setPage(1);
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  }, []);

  const catLabel = categories.find((c) => c.key === activeCat)?.label ?? "All";
const renderedCount = visible.length + (featured ? 1 : 0);

  return (
    <>
      {/* Controls */}
      <div
        className="insights-controls"
        role="search"
        aria-label="Search and filter articles"
      >
        <div className="controls-inner">
          <div className="search-row">
            <div className="search-wrap">
              <svg
                className="search-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                className="search-input"
                placeholder="Search articles, topics, tags…"
                aria-label="Search articles"
                autoComplete="off"
                value={query}
                onChange={handleSearch}
              />
            </div>

            <span className="results-count" aria-live="polite">
              Showing <strong>{renderedCount}</strong> of{" "}
              <strong>{renderedCount}</strong> articles
            </span>
          </div>

          <div
            className="filter-row"
            role="group"
            aria-label="Filter by category"
          >
            <span className="filter-label">Filter:</span>
            <div className="filter-pills">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  className={`filter-pill ${activeCat === cat.key ? "active" : ""}`}
                  onClick={() => handleCat(cat.key)}
                  aria-pressed={activeCat === cat.key}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="insights-main" id="main">
        <div className="section-header">
          <h2 className="section-title">
            {activeCat === "all" ? "All Articles" : catLabel}
          </h2>
          <span className="section-meta">Sorted by latest</span>
        </div>

        <div className="cards-grid" role="list" aria-label="Article list">
          {featured && <FeaturedCard article={featured} />}

          {visible.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}

          {filtered.length === 0 && (
            <div className="no-results" aria-live="polite">
              <div className="no-results-icon">🔍</div>
              <h3>No articles found</h3>
              <p>Try different keywords or clear the filter.</p>
            </div>
          )}
        </div>

        {hasMore && (
          <div className="load-more-wrap">
            <button
              className="btn-load-more"
              onClick={() => setPage((p) => p + 1)}
              aria-label="Load more articles"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
              Load More Articles
            </button>
          </div>
        )}
      </main>
    </>
  );
}
