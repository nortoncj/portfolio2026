"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import {
  portableTextComponents,
  extractToc,
} from "./components/portableTextComponents";
import "@css/insights/post.css";
import { shareItems } from "@/data/socials";
import { FaCopy, FaEnvelope, FaFacebookF, FaLink, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

type Category = {
  slug: string;
  title: string;
};

type Tag = {
  title: string;
};

type SanityImage = {
  asset?: {
    url?: string;
  };
  alt?: string;
  caption?: string;
};

type Post = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  _createdAt?: string;
  body: any[];
  image?: SanityImage;
  video?: string;
  categories?: Category[];
  tags?: Tag[];
};

type RelatedPost = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  image?: SanityImage;
  categories?: Category[];
  tags?: Tag[];
  readTime?: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function readingTimeFromBody(body: any[] = []) {
  const text = body
    .map((block) =>
      Array.isArray(block?.children)
        ? block.children.map((child: any) => child?.text || "").join(" ")
        : "",
    )
    .join(" ");

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / 180));
  return {
    words,
    mins,
    label: `${mins} min read`,
  };
}

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function getCategoryClass(slug?: string) {
  return ["bp-cat-badge", slug ? `bp-cat-${slug}` : ""]
    .filter(Boolean)
    .join(" ");
}

function ShareButtons({ className = "" }: { className?: string }) {
  const handleShare = async (type: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    if (type === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
        "_blank",
        "noopener,width=600,height=450",
      );
    }

    if (type === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        "_blank",
        "noopener,width=600,height=500",
      );
    }

    if (type === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank",
        "noopener,width=600,height=450",
      );
    }

    if (type === "email") {
      window.location.href = `mailto:?subject=${title}&body=${encodeURIComponent(
        `Thought you'd find this interesting: ${window.location.href}`,
      )}`;
    }

    if (type === "copy") {
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch {}
    }
  };

  return (
    <div className={["bp-share-row", className].filter(Boolean).join(" ")}>
      {shareItems.map((item) => (
        <button
          key={item.name}
          type="button"
          className={`bp-share-btn bp-share-btn-${item.name}`}
          onClick={() => handleShare(item.name)}
        >
          <item.icon />
        </button>
      ))}
    </div>
  );
}

export default function BlogPostPage({
  post,
  relatedPosts,
}: {
  post: Post;
  relatedPosts: RelatedPost[];
}) {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState("");
  const primaryCat = post.categories?.[0];
  const toc = useMemo(() => extractToc(post.body || []), [post.body]);
  const stats = useMemo(
    () => readingTimeFromBody(post.body || []),
    [post.body],
  );

  useEffect(() => {
    const update = () => {
      const el = document.getElementById("articleContent");
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const bottom = top + el.offsetHeight - window.innerHeight;

      if (bottom <= 0) {
        setProgress(100);
        return;
      }

      const pct = Math.max(
        0,
        Math.min(100, ((window.scrollY - top) / (bottom - top)) * 100),
      );
      setProgress(Math.round(pct));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll(
        ".bp-prose h2[id], .bp-prose h3[id], .bp-prose h4[id]",
      ),
    ) as HTMLElement[];

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];

        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-12% 0px -70% 0px",
        threshold: 0.1,
      },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [toc]);

  return (
    <div className="bp-root" id="bp-root">
      <div className="bp-progress-track" aria-hidden="true">
        <div
          id="bp-progress"
          className={`bp-progress ${progress > 0 && progress < 100 ? "bp-is-active" : ""}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <aside
        className={`bp-share-sidebar ${progress > 5 ? "bp-is-visible" : ""}`}
        aria-label="Share this article"
      >
        <span className="bp-sidebar-label">Share</span>

        <button
          type="button"
          className="bp-sidebar-btn bp-sidebar-btn-x"
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`,
              "_blank",
              "noopener,width=600,height=450",
            )
          }
        >
          <FaXTwitter  />
        </button>

        <button
          type="button"
          className="bp-sidebar-btn bp-sidebar-btn-li"
          onClick={() =>
            window.open(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
              "_blank",
              "noopener,width=600,height=500",
            )
          }
        >
          <FaLinkedinIn  />
        </button>

        <button
          type="button"
          className="bp-sidebar-btn bp-sidebar-btn-fb"
          onClick={() =>
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
              "_blank",
              "noopener,width=600,height=450",
            )
          }
        >
          <FaFacebookF />
        </button>

        <button
          type="button"
          className="bp-sidebar-btn bp-sidebar-btn-copy"
          onClick={() => navigator.clipboard.writeText(window.location.href)}
        >
          <FaLink />
        </button>

        <button
          type="button"
          className="bp-sidebar-btn bp-sidebar-btn-email"
          onClick={() =>
            (window.location.href = `mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(window.location.href)}`)
          }
        >
          <FaEnvelope  />
        </button>
      </aside>

      <header className="bp-hero">
        {post.video ? (
          <iframe
            className="bp-hero-video"
            src={post.video}
            title={post.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            className="bp-hero-bg"
            style={{ backgroundImage: `url(${post.image?.asset?.url || ""})` }}
            aria-label={post.image?.alt || post.title}
            role="img"
          />
        )}

        <div className="bp-hero-overlay" />
        <div className="bp-hero-mesh" />

        <div className="bp-hero-content">
          <div className="bp-hero-top">
            {primaryCat ? (
              <Link
                href={`/insights?cat=${primaryCat.slug}`}
                className={getCategoryClass(primaryCat.slug)}
              >
                {primaryCat.title}
              </Link>
            ) : null}

            <span className="bp-read-time">
              {stats.label} · {stats.words.toLocaleString()} words
            </span>
          </div>

          <h1 className="bp-article-title">{post.title}</h1>
          <p className="bp-article-subtitle">{post.excerpt}</p>

          <div className="bp-meta-row">
            <div className="bp-author-pill">
              <div className="bp-author-avatar" aria-hidden="true">
                <span className="bp-author-avatar-fallback">C</span>
              </div>

              <div className="bp-author-info">
                <span className="bp-author-name">Chris</span>
                <span className="bp-author-role">
                  Full-Stack Engineer & Digital Marketer
                </span>
              </div>
            </div>

            <span className="bp-meta-pill">{formatDate(post.publishedAt)}</span>
            <span className="bp-meta-pill">
              Last updated {formatDate(post._createdAt || post.publishedAt)}
            </span>
          </div>

          <div className="bp-share-row">
            <span className="bp-sidebar-label">Share</span>
            <ShareButtons />
          </div>
        </div>
      </header>

      <div className="bp-layout">
        <main className="bp-main" id="articleContent">
          {!!post.tags?.length && (
            <div className="bp-tags-row" aria-label="Article tags">
              {post.tags.map((tag) => (
                <Link
                  key={tag.title}
                  href={`/insights?tag=${encodeURIComponent(tag.title)}`}
                  className="bp-tag"
                >
                  #{tag.title}
                </Link>
              ))}
            </div>
          )}

          <article className="bp-article">
            <div className="bp-prose">
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </div>
          </article>

          <footer className="bp-article-footer">
            <div className="bp-af-card">
              <div className="bp-af-card-body">
                <h2 className="bp-af-title">Found this useful?</h2>
                <p className="bp-af-text">
                  Share it with someone building something real.
                </p>
                <div className="bp-af-share-row">
                  <ShareButtons />
                </div>
              </div>
            </div>

            <div className="bp-author-card">
              <div className="bp-author-card-media" aria-hidden="true">
                <div className="bp-author-card-fallback">C</div>
              </div>

              <div className="bp-author-card-body">
                <p className="bp-author-card-kicker">Written by</p>
                <div className="bp-author-card-name">Chris</div>
                <div className="bp-author-card-role">
                  Full-Stack Engineer · Digital Marketer · Freelancer
                </div>
                <p className="bp-af-text">
                  I build things that ship and write about what I learn in the
                  process. From DevOps pipelines to email sequences, I care
                  about the full stack — code, copy, and the machinery between.
                </p>

                <div className="bp-tags-row">
                  <a
                    href="https://github.com"
                    className="bp-tag"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com"
                    className="bp-tag"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <Link href="/contact" className="bp-tag">
                    Hire Me
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </main>

        <aside className="bp-sidebar" aria-label="Article sidebar">
          <div className="bp-meta-card">
            <p className="bp-sidebar-kicker">Reading progress</p>

            <div className="bp-read-bar-wrap">
              <div className="bp-read-bar" style={{ width: `${progress}%` }} />
            </div>

            <div className="bp-read-stats">
              <div className="bp-read-stat">
                <span className="bp-read-stat-label">Read time</span>
                <strong className="bp-read-stat-value">{stats.mins} min</strong>
              </div>

              <div className="bp-read-stat">
                <span className="bp-read-stat-label">Progress</span>
                <strong className="bp-read-stat-value">{progress}%</strong>
              </div>

              <div className="bp-read-stat">
                <span className="bp-read-stat-label">Words</span>
                <strong className="bp-read-stat-value">
                  ~{stats.words.toLocaleString()}
                </strong>
              </div>

              <div className="bp-read-stat">
                <span className="bp-read-stat-label">Published</span>
                <strong className="bp-read-stat-value">
                  {formatDate(post.publishedAt)}
                </strong>
              </div>
            </div>
          </div>

          {!!toc.length && (
            <nav className="bp-toc-card" aria-label="Table of contents">
              <p className="bp-toc-title">Contents</p>

              <ul className="bp-toc-list">
                {toc.map((item) => (
                  <li
                    key={item.id}
                    className={[
                      "bp-toc-item",
                      item.level === "h3" ? "bp-toc-level-3" : "",
                      item.level === "h4" ? "bp-toc-level-4" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <Link
                      href={`#${item.id}`}
                      className={`bp-toc-link ${activeId === item.id ? "bp-is-active" : ""}`}
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
      </div>

      {!!relatedPosts.length && (
        <section className="bp-related" aria-labelledby="relatedHeading">
          <div className="bp-related-inner">
            <div className="bp-related-head">
              <p className="bp-related-kicker">Keep reading</p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <h2 className="bp-related-title" id="relatedHeading">
                  Related Articles
                </h2>

                <Link href="/insights" className="bp-r-link">
                  View All Insights{" "}
                  <span className="bp-r-link-arrow">
                    <ArrowRight />
                  </span>
                </Link>
              </div>
            </div>

            <div className="bp-related-grid">
              {relatedPosts.slice(0, 3).map((item) => {
                const cat = item.categories?.[0];
                const img = item.image?.asset?.url;

                return (
                  <article key={item.slug} className="bp-r-card">
                    <Link
                      href={`/insights/${item.slug}`}
                      className="bp-r-media-link"
                      style={{ position: "relative" }}
                    >
                      {img ? (
                        <Image
                          className="bp-r-media"
                          src={img}
                          alt={item.image?.alt || item.title}
                          width={600}
                          height={340}
                          unoptimized
                        />
                      ) : (
                        <div className="bp-r-media bp-r-media-fallback" />
                      )}

                      {cat ? (
                        <span
                          className={getCategoryClass(cat.slug)}
                          style={{ position: "absolute", top: 12, left: 12 }}
                        >
                          {cat.title}
                        </span>
                      ) : null}
                    </Link>

                    <div className="bp-r-content">
                      <div className="bp-r-meta">
                        <span className="bp-r-date">
                          {formatDate(item.publishedAt)}
                        </span>
                        <span className="bp-r-date"> · </span>
                        <span className="bp-r-date">
                          {item.readTime || "5 min read"}
                        </span>
                      </div>

                      <h3 className="bp-r-title">
                        <Link
                          href={`/insights/${item.slug}`}
                          className="bp-r-title-link"
                        >
                          {item.title}
                        </Link>
                      </h3>

                      <p className="bp-r-excerpt">{item.excerpt}</p>

                      <div className="bp-r-meta">
                        <span className="bp-r-date">
                          {(item.tags || []).map((t) => t.title).join(" · ")}
                        </span>
                      </div>

                      <Link
                        href={`/insights/${item.slug}`}
                        className="bp-r-link"
                      >
                        Read article{" "}
                        <span className="bp-r-link-arrow">
                          <ArrowRight size={12} />
                        </span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <div className="bp-back-cta">
        <p className="bp-related-kicker">
          More where that came from — the archive never sleeps.
        </p>

        <div className="bp-cta-row">
          <Link href="/insights" className="bp-btn-back">
            Back to Insights
          </Link>
          <Link href="/contact" className="bp-btn-primary">
            Work With Me <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
