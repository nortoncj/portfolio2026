'use Client'
import { Post } from "@/types/Post";
import { useMemo, useState } from "react"

const PAGE_SIZE = 12;

// ─── Featured card ────────────────────────────────────────────────────────────
function FeaturedCard({ article }: { article: Post }) {
  const [activeCat, setActiveCat]   = useState("all");
  const [query,     setQuery]       = useState("");
  const [page,      setPage]        = useState(1);

  // Filter + search
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return ARTICLE.filter((a: any) => {
      const catMatch = activeCat === "all" || a.cat === activeCat;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q)   ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.includes(q))
      );
    });
  }, [activeCat, query]);

  const visible   = filtered.slice(0, page * PAGE_SIZE);
  const hasMore   = visible.length < filtered.length;
  const featured  = visible.find((a) => a.featured);
  const rest      = visible.filter((a) => !a.featured || activeCat !== "all");

  // Reset page when filters change
  const handleCat = useCallback((key: string) => {
    setActiveCat(key);
    setPage(1);
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  }, []);

  const catLabel = CATEGORIES.find((c) => c.key === activeCat)?.label ?? "All";
  return (
    <article
      className="featured-card insight-card"
      data-cat={article.cat}
      itemScope
      itemType="https://schema.org/BlogPosting"
      role="listitem"
    >
      <meta itemProp="datePublished" content={article.dateISO} />
      <meta itemProp="author" content="Chris" />

      {/* The whole featured card is NOT wrapped in an <a> — we use explicit buttons/links */}
      <div className="featured-image-wrap">
        <div className="featured-shimmer" />
        <Image
          className="featured-image"
          src={article.image}
          alt={article.imageAlt}
          width={1200}
          height={480}
          loading="lazy"
          itemProp="image"
        />
        <div className="featured-image-overlay" />
        <span className="featured-badge">⭐ Featured</span>
      </div>

      <div className="featured-body">
        <div className="featured-top">
          <div className="featured-category">
            <span className={`card-category cat-${article.cat}`} style={{ position: "static" }}>
              Marketing
            </span>
          </div>
          <h2 className="featured-title" itemProp="headline">{article.title}</h2>
          <p className="featured-excerpt" itemProp="description">{article.excerpt}</p>
          <div className="featured-tags">
            {article.tags.map((tag) => <TagPill key={tag} tag={tag} />)}
          </div>
        </div>

        <div className="featured-footer">
          <div className="featured-meta">
            <span>{article.date}</span>
            <span>{article.read}</span>
          </div>
          <Link
            href={`/insights/${article.slug}`}
            className="btn-read-featured"
            itemProp="url"
          >
            Read Article
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}