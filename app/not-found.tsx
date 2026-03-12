'use client'
import React from "react";
import Link from "next/link";

const T = {
  burgundy: "#ff6188",
  magenta: "#fc5fa3",
  purple: "#ab9df2",
  coral: "#ffd866",
  mint: "#a9dc76",
  blue: "#78dce8",
  cream: "#f9f8f6",
  charcoal: "#2d2a2e",
  slate: "#221f22",
  white: "#fcfcfa",
  grad: "linear-gradient(135deg,#ff6188 0%,#fc5fa3 50%,#ab9df2 100%)",
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: T.slate,
        color: T.white,
        position: "relative",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        padding: "clamp(1.25rem, 3vw, 2.5rem)",
      }}
    >
      {/* Ambient blobs */}
      <div aria-hidden="true" style={blobStyle(1)} />
      <div aria-hidden="true" style={blobStyle(2)} />
      <div aria-hidden="true" style={blobStyle(3)} />

      {/* Mesh grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(circle at 50% 40%, rgba(0,0,0,.9) 0%, rgba(0,0,0,.4) 55%, transparent 75%)",
          opacity: 0.65,
        }}
      />

      {/* Content */}
      <section
        className="mt-20"
        style={{
          position: "relative",
          width: "min(980px, 100%)",
          display: "grid",
          gridTemplateColumns: "1.1fr .9fr",
          gap: "clamp(1rem, 3vw, 2rem)",
          alignItems: "stretch",
          zIndex: 2,
        }}
      >
        {/* Left panel */}
        <div style={glassCardStyle({ padding: "clamp(1.25rem, 3vw, 2rem)" })}>
          <p
            style={{
              fontFamily:
                "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              fontSize: ".85rem",
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "rgba(252,252,250,.65)",
              marginBottom: ".75rem",
            }}
          >
            Error 404 · Page Not Found
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(2.1rem, 4.6vw, 3.6rem)",
              lineHeight: 1.05,
              letterSpacing: "-.04em",
              fontWeight: 900,
            }}
          >
            This link went
            <span
              style={{
                display: "block",
                background: T.grad,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              off-script.
            </span>
          </h1>

          <p
            style={{
              marginTop: "1rem",
              marginBottom: "1.5rem",
              maxWidth: "62ch",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "rgba(252,252,250,.75)",
            }}
          >
            The page you asked for doesn’t exist (or it moved). The good news?
            We can still ship something beautiful today.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: ".75rem",
              alignItems: "center",
            }}
          >
            <Link href="/" style={btnPrimaryStyle()}>
              Go Home
              <Arrow />
            </Link>
            <Link href="/insights" style={btnGhostStyle()}>
              Read Insights
            </Link>
            <Link href="/projects" style={btnGhostStyle()}>
              Browse Projects
            </Link>
            <Link href="/contact" style={btnGhostStyle()}>
              Hire Me
            </Link>
          </div>

          <div
            style={{
              marginTop: "1.75rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid rgba(255,255,255,.08)",
              display: "flex",
              flexWrap: "wrap",
              gap: ".75rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "rgba(252,252,250,.55)",
                fontSize: ".9rem",
              }}
            >
              If you typed the URL manually, try checking for typos.
            </p>
            <span style={pillStyle()}>
              <span aria-hidden="true" style={dotStyle()} />
              Open to Freelance
            </span>
          </div>
        </div>

        {/* Right panel */}
        <div style={glassCardStyle({ padding: "clamp(1.25rem, 3vw, 2rem)" })}>
          <p
            style={{
              margin: 0,
              fontWeight: 800,
              letterSpacing: "-.02em",
              fontSize: "1.1rem",
            }}
          >
            Quick routes
          </p>
          <p
            style={{
              margin: ".5rem 0 1.25rem",
              color: "rgba(252,252,250,.65)",
              lineHeight: 1.6,
              fontSize: ".95rem",
            }}
          >
            Consider this a tiny portal back into the good parts.
          </p>

          <div style={{ display: "grid", gap: ".75rem" }}>
            <RouteCard
              href="/insights"
              title="Insights"
              desc="Blog posts, systems, and sharp opinions."
              accent={T.burgundy}
            />
            <RouteCard
              href="/projects/web-dev"
              title="Web Dev"
              desc="Interfaces with taste. Code with intent."
              accent={T.magenta}
            />
            <RouteCard
              href="/projects/devops"
              title="DevOps"
              desc="Automation, reliability, and calm dashboards."
              accent={T.blue}
            />
            <RouteCard
              href="/projects/marketing"
              title="Marketing"
              desc="Email, SEO, automations, and growth loops."
              accent={T.mint}
            />
          </div>

          <div
            style={{
              marginTop: "1.25rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid rgba(255,255,255,.08)",
              display: "flex",
              gap: ".75rem",
              flexWrap: "wrap",
            }}
          >
            <span style={miniBadge(T.purple)}>Glass</span>
            <span style={miniBadge(T.coral)}>Gradients</span>
            <span style={miniBadge(T.blue)}>Motion-ready</span>
            <span style={miniBadge(T.mint)}>On-brand</span>
          </div>
        </div>
      </section>

      {/* CSS (hover + responsive + motion fallback) */}
      <style>{`
        @media (max-width: 920px) {
          section { grid-template-columns: 1fr !important; }
        }

        .nf-routeCard {
          transform: translateY(0);
          transition:
            transform .2s ease,
            border-color .2s ease,
            box-shadow .2s ease;
        }

        .nf-routeCard:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,.18) !important;
          box-shadow: 0 16px 44px rgba(0,0,0,.35);
        }

        @keyframes floatBlob {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(0,-18px,0) scale(1.03); }
        }
      `}</style>
    </main>
  );
}

function RouteCard({
  href,
  title,
  desc,
  accent,
}: {
  href: string;
  title: string;
  desc: string;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className="nf-routeCard"
      style={{
        ...glassCardStyle({ padding: "1rem 1.1rem", borderRadius: 18 }),
        textDecoration: "none",
        border: `1px solid rgba(255,255,255,.10)`,
        display: "block",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
        <span
          aria-hidden="true"
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: accent,
            boxShadow: `0 0 18px ${accent}55`,
            flexShrink: 0,
          }}
        />
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: ".75rem",
            }}
          >
            <p style={{ margin: 0, fontWeight: 850, letterSpacing: "-.02em" }}>
              {title}
            </p>
            <span style={{ color: "rgba(252,252,250,.7)" }} aria-hidden="true">
              ↗
            </span>
          </div>
          <p
            style={{
              margin: ".35rem 0 0",
              color: "rgba(252,252,250,.60)",
              lineHeight: 1.55,
              fontSize: ".92rem",
            }}
          >
            {desc}
          </p>
        </div>
      </div>
    </Link>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
      style={{ marginLeft: 6 }}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function blobStyle(n: 1 | 2 | 3): React.CSSProperties {
  const common: React.CSSProperties = {
    position: "absolute",
    width: "clamp(340px, 42vw, 560px)",
    height: "clamp(340px, 42vw, 560px)",
    borderRadius: 9999,
    filter: "blur(42px)",
    opacity: 0.55,
    animation: "floatBlob 14s ease-in-out infinite",
    zIndex: 0,
  };

  if (n === 1)
    return {
      ...common,
      left: "-10%",
      top: "-12%",
      background:
        "radial-gradient(circle at 30% 30%, rgba(255,97,136,.85), transparent 62%)",
    };
  if (n === 2)
    return {
      ...common,
      right: "-12%",
      top: "8%",
      animationDelay: "-4s",
      background:
        "radial-gradient(circle at 30% 30%, rgba(120,220,232,.85), transparent 62%)",
    };
  return {
    ...common,
    left: "10%",
    bottom: "-16%",
    animationDelay: "-8s",
    background:
      "radial-gradient(circle at 30% 30%, rgba(171,157,242,.85), transparent 62%)",
  };
}

function glassCardStyle(extra?: React.CSSProperties): React.CSSProperties {
  return {
    background: "rgba(45,42,46,.82)",
    border: "1px solid rgba(255,255,255,.10)",
    borderRadius: 28,
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    ...extra,
  };
}

function btnPrimaryStyle(): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "12px 18px",
    borderRadius: 999,
    background: T.grad,
    color: "white",
    fontWeight: 750,
    letterSpacing: "-.01em",
    boxShadow: "0 10px 28px rgba(255,97,136,.25)",
  };
}

function btnGhostStyle(): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 16px",
    borderRadius: 999,
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.12)",
    color: "rgba(252,252,250,.82)",
    fontWeight: 650,
  };
}

function pillStyle(): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(169,220,118,.10)",
    border: "1px solid rgba(169,220,118,.22)",
    color: "rgba(252,252,250,.78)",
    fontSize: ".85rem",
    fontWeight: 650,
    whiteSpace: "nowrap",
  };
}

function dotStyle(): React.CSSProperties {
  return {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: T.mint,
    boxShadow: "0 0 16px rgba(169,220,118,.55)",
  };
}

function miniBadge(color: string): React.CSSProperties {
  return {
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(255,255,255,.06)",
    border: `1px solid ${color}55`,
    color: "rgba(252,252,250,.78)",
    fontSize: ".78rem",
    fontWeight: 650,
  };
}
