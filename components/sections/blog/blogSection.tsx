"use client";
import React, { useEffect } from "react";
import "@css/blog.css";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/Post";
import { FaStar } from "react-icons/fa6";
import { PortableTextBlock } from "@portabletext/types";

function BlogSection({ posts }: { posts: Post[] }) {
  const featured = posts[0];
  const featuredPosts = posts.filter((post) => post.featured);
  useEffect(() => {
    document.body.classList.add("js-ready");
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" },
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <section id="insights" aria-label="Technical Insights">
      <div className="bg-grid"></div>
      <div className="bg-blob bg-blob-1"></div>
      <div className="bg-blob bg-blob-2"></div>

      <div className="insights-inner">
        <div className="section-blog-header">
          {/* <span className="eyebrow reveal text-center">💡 Technical Insights</span> */}
          <h2 className="section-heading reveal reveal-d1">
            Latest <span className="grad">Thinking</span>
          </h2>
          <p className="section-sub reveal reveal-d2">
            Strategic perspectives on systems engineering, automation
            architecture, cloud infrastructure, and the craft of building
            scalable solutions.
          </p>
        </div>

        <Link
          href={`/insights/${featured.slug}`}
          className="featured-card reveal reveal-d3"
          aria-label="Read: Web Marketing 101"
        >
          <img
            className="feat-img"
            src={featured.image?.asset.url}
            alt={featured.image?.alt}
            loading="lazy"
          />
          <div className="feat-overlay"></div>

          {featured.featured ? (
            <div className="feat-badge">
              {" "}
              <FaStar color="var(--coral)" /> Featured Insight
            </div>
          ) : (
            ""
          )}

          <div className="feat-content">
            <div className="feat-meta">
              <span className="feat-meta-txt">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {FormatDate(featured.publishedAt)}
              </span>
              <div className="feat-meta-dot"></div>
              <span className="feat-meta-txt">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {readTime(featured.body)} min read
              </span>
              <div className="feat-meta-dot"></div>
              {featured.categories.map((cat) => (
                <span key={cat._id} className={`feat-cat ${cat.slug}`}>
                  {cat.title}
                </span>
              ))}
              {/* <span className="feat-cat marketing">Marketing</span>
              <span className="feat-cat seo">SEO</span> */}
            </div>

            <h3 className="feat-title">{featured.title}</h3>

            <p className="feat-excerpt">{featured.excerpt}</p>

            <div className="feat-cta">
              Read Full Article
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        </Link>

        <div className="grid-header reveal reveal-d4">
          <h3 className="grid-title">Latest Insights</h3>

          <Link
            href="/insights"
            className="link-view-all"
            aria-label="View all insights"
          >
            <span>View All</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="insights-grid">
          {featuredPosts.slice(1, 7).map((post) => (
            <Link
              key={post._id}
              href={`/insights/${post.slug}`}
              className="insight-card reveal reveal-d1"
              aria-label="Read: How I Built a $500 Homelab for Learning DevOps"
            >
              <img
                className="card-img"
                src={post?.image?.asset.url}
                alt={post.image?.alt}
                loading="lazy"
              />
              <div className="card-overlay"></div>
              {post.categories.map((cat) => (
                <span key={cat._id} className={`card-cat cat-${cat.slug}`}>
                  {cat.title}
                </span>
              ))}

              <div className="card-body">
                <div className="card-meta">
                  <span className="card-meta-item">
                    {FormatDate(post.publishedAt)}
                  </span>
                  <div className="card-meta-sep"></div>
                  <span className="card-meta-item">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {readTime(post.body)} min
                  </span>
                </div>
                <h4 className="card-title">{post.title}</h4>
                <p className="card-excerpt">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="cta-row reveal">
          <a href="/insights" className="btn-primary btn-all">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Browse All Insights
          </a>
          <p className="cta-sub">
            Engineering write-ups · Deep dives · Guides · Case studies
          </p>
        </div>
      </div>
    </section>
  );
}

export function FormatDate(dateTime: string) {
  return new Date(dateTime).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function readTime(blocks: any[]): number {
  if (!Array.isArray(blocks)) return 5;

  const words = blocks
    .filter((b) => b?._type === "block" && Array.isArray(b.children))
    .flatMap((b) => b.children)
    .map((c: any) => c.text || "")
    .join(" ")
    .trim()
    .split(/\s+/).length;

  return Math.max(1, Math.ceil(words / 220));
}

export default BlogSection;
