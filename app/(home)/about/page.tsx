import { FAQ_ITEMS, CREDENTIALS } from "@/data/about";
import { IconType } from "react-icons";
import { Metadata } from "next";
import { buildMetadata } from "@/libs/SEO";
import Image from "next/image";
import { FaqItem } from "./faq";
import { AnimePhoto } from "./AboutPhoto";

export const metadata: Metadata = buildMetadata({
  title: "About Chris Norton Jr",
  description:
    "I specialize in devops, embedded systems, and cloud architecture in the United States",
  image: "/og-image.png",
  url: "https://chrisnortonjr.com",
});

interface CredBadgeProps {
  item: {
    name: string;
    issuer: string;
    year: string;
    color: string;
    icon?: IconType;
    logo?: string;
  };
}

// ─── CREDENTIAL BADGE ────────────────────────────────────────────────────────
function CredBadge({ item }: CredBadgeProps) {
  const inProgress = item.year === "2026";
  return (
    <div className="cred-badge" style={{ ["--accent" as any]: item.color }}>
      {item.logo ? (
        <Image src={item.logo} alt={item.name} className="cred-icon" />
      ) : item.icon ? (
        <item.icon className="cred-icon" />
      ) : null}
      {/* <span className="cred-icon">{item.icon}</span> */}
      <div className="cred-info">
        <span className="cred-name">{item.name}</span>
        <span className="cred-issuer">{item.issuer}</span>
      </div>
      {inProgress ? (
        <span className="cred-tag cred-tag--progress">In Progress</span>
      ) : item.year ? (
        <span className="cred-tag cred-tag--year">{item.year}</span>
      ) : null}
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <style>{CSS}</style>

      <main className="about-root">
        {/* ── HERO IDENTITY ───────────────────────────────────────────────── */}
        <section className="hero-section">
          <div className="hero-left">
            <p className="hero-eyebrow">Multi-disciplinary Engineer</p>
            <h1 className="hero-name">
              Chris
              <br />
              <span className="hero-name-accent">Norton Jr.</span>
            </h1>
            <p className="hero-tagline">
              I build the systems most engineers only get to use.
            </p>
            <p className="hero-bio">
              Electrical engineer turned DevOps practitioner, based in Tampa
              Bay, FL. I specialize in the full stack development. Whether
              bare-metal firmware running on an ESP32 to containerized
              microservices on AWS, connected by pipelines that actually test
              what they ship. My background in EE gives me a different lens than
              most cloud engineers: I know what's on the other side of the
              abstraction layer, and I build with that in mind.
              <br />
              <br />
              Outside the terminal I'm a film buff, anime fan and language
              learner.
            </p>
            <div className="hero-links">
              <a
                href="https://github.com/nortoncj"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-link"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/chrisnortonjr"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-link"
              >
                LinkedIn
              </a>
              <a
                href="https://www.youtube.com/@nortoncj"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-link"
              >
                YouTube
              </a>
            </div>
          </div>

          <div className="hero-right">
            <AnimePhoto />
          </div>
        </section>

        {/* ── EXPERTISE STRIP ─────────────────────────────────────────────── */}
        <section className="strip-section">
          {[
            { label: "DevOps & Cloud", color: "#78dce8" },
            { label: "Firmware & Embedded", color: "#ffd866" },
            { label: "CI/CD Pipelines", color: "#a9dc76" },
            { label: "RF & Antenna Systems", color: "#ab9df2" },
            { label: "Security-First Engineering", color: "#ff6188" },
          ].map((tag) => (
            <span
              key={tag.label}
              className="strip-tag"
              style={{ ["--c" as any]: tag.color } as React.CSSProperties}
            >
              {tag.label}
            </span>
          ))}
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section className="content-section">
          <h2 className="section-heading">Common Questions</h2>
          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} item={item} />
            ))}
          </div>
        </section>

        {/* ── CREDENTIALS ─────────────────────────────────────────────────── */}
        <section className="content-section">
          <h2 className="section-heading">Credentials & Affiliations</h2>
          {CREDENTIALS.map((group) => (
            <div key={group.category} className="cred-group">
              <p className="cred-group-label">{group.category}</p>
              <div className="cred-grid">
                {group.items.map((item) => (
                  <CredBadge key={item.name} item={item} />
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CSS = `
/* ── Design tokens ── */
.about-root {
  --bg:             #f9f8f6;
  --surface:        #ffffff;
  --text-primary:   #2d2a2e;
  --text-secondary: #939293;
  --text-muted:     #c1c0c0;
  --border:         rgba(147,146,147,0.2);
  --red:    #e8365d;
  --pink:   #ff6188;
  --purple: #ab9df2;
  --mint:   #a9dc76;
  --blue:   #78dce8;
  --coral:  #ffd866;
  --hero-grad: linear-gradient(135deg, #e8365d 0%, #ff6188 40%, #ab9df2 100%);
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --snappy: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
  --smooth: all 0.4s cubic-bezier(0.34,1.56,0.64,1);

  background: var(--bg);
  color: var(--text-primary);
  font-family: "Inter", sans-serif;
  min-height: 100vh;
  padding-top: 15vh;
}

/* ── dark mode ── */
@media (prefers-color-scheme: light) {
  .about-root {
    --bg:             #1a1a1a;
    --surface:        #2d2a2e;
    --text-primary:   #fcfcfa;
    --text-secondary: #c1c0c0;
    --text-muted:     #939293;
    --border:         rgba(255,255,255,0.1);
  }
}

.dark .about-root {
  --bg:             #1a1a1a;
  --surface:        #2d2a2e;
  --text-primary:   #fcfcfa;
  --text-secondary: #c1c0c0;
  --text-muted:     #939293;
  --border:         rgba(255,255,255,0.1);
}


/* ── Hero ── */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 64px;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 32px 64px;
}

@media (max-width: 860px) {
  .hero-section { grid-template-columns: 1fr; padding: 48px 24px 40px; }
  .hero-right { order: -1; display: flex; justify-content: center; }
}

.hero-eyebrow {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--pink);
  margin: 0 0 16px;
}

.hero-name {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.0;
  margin: 0 0 24px;
  color: var(--text-primary);
  letter-spacing: -0.03em;
}

.hero-name-accent {
  background: var(--hero-grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-tagline {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0 0 24px;
  font-style: italic;
  font-family: "Playfair Display", serif;
}

.hero-bio {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--text-secondary);
  margin: 0 0 32px;
  max-width: 56ch;
}

.hero-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-link {
  padding: 10px 22px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  background: var(--surface);
  transition: var(--snappy);
}
.hero-link:hover {
  border-color: var(--pink);
  color: var(--red);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(255,97,136,0.15);
}

/* ── Photo with anime transition ── */
.photo-wrapper {
  position: relative;
  width: 340px;
  height: 400px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  box-shadow:
    0 20px 60px rgba(232,54,93,0.18),
    0 8px 24px rgba(171,157,242,0.12);
  user-select: none;
}

.photo-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.05s;
}
.photo-front  { z-index: 2; opacity: 1; }
.photo-behind { z-index: 1; opacity: 1; }

/* Anime slash overlay */
.slash-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
  overflow: hidden;
}

.slash-blade {
  position: absolute;
  height: 100%;
  width: 40%;
  background: linear-gradient(135deg, #e8365d 0%, #ff6188 50%, #ab9df2 100%);
  transform: scaleX(0) skewX(-12deg);
  transform-origin: left center;
  opacity: 0;
}

.slash-1 { left: -5%;  transition: transform 0.18s ease-in, opacity 0.1s; }
.slash-2 { left: 30%;  transition: transform 0.18s ease-in 0.06s, opacity 0.1s 0.06s; }
.slash-3 { left: 65%;  transition: transform 0.18s ease-in 0.12s, opacity 0.1s 0.12s; }

.slash-active .slash-blade { transform: scaleX(1.4) skewX(-12deg); opacity: 1; }
.slash-active .slash-1 { transition: transform 0.2s ease-out, opacity 0.05s; }
.slash-active .slash-2 { transition: transform 0.2s ease-out 0.07s, opacity 0.05s 0.07s; }
.slash-active .slash-3 { transition: transform 0.2s ease-out 0.14s, opacity 0.05s 0.14s; }

.photo-hint {
  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: 20;
  background: rgba(45,42,46,0.75);
  backdrop-filter: blur(8px);
  color: #fcfcfa;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  pointer-events: none;
  opacity: 0.7;
}

/* ── Expertise strip ── */
.strip-section {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  max-width: 1100px;
  margin: 0 auto 16px;
  padding: 0 32px 48px;
  border-bottom: 1px solid var(--border);
}

.strip-tag {
  padding: 8px 18px;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--c);
  background: color-mix(in srgb, var(--c) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--c) 30%, transparent);
  letter-spacing: 0.01em;
}

/* ── Section layout ── */
.content-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 56px 32px;
  border-bottom: 1px solid var(--border);
}
.content-section:last-child { border-bottom: none; }

.section-heading {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 36px;
  letter-spacing: -0.02em;
  padding-bottom: 16px;
  border-bottom: 2px solid;
  border-image: var(--hero-grad) 1;
}

/* ── FAQ ── */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.faq-item {
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  overflow: hidden;
  transition: var(--smooth);
}

.faq-item.faq-open {
  border-color: rgba(255,97,136,0.35);
  box-shadow: 0 4px 24px rgba(255,97,136,0.08);
}

.faq-trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  font-family: "Inter", sans-serif;
  text-align: left;
  gap: 16px;
}

.faq-q {
  font-size: 1rem;
  font-weight: 600;
  flex: 1;
}

.faq-chevron {
  font-size: 1.4rem;
  font-weight: 300;
  color: var(--pink);
  flex-shrink: 0;
  transition: transform 0.3s ease;
  width: 24px;
  text-align: center;
}

.faq-open .faq-chevron { transform: rotate(0deg); }

.faq-body {
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.34,1.56,0.64,1);
}

.faq-a {
  padding: 0 24px 22px;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
}

/* ── Credentials ── */
.cred-group {
  margin-bottom: 36px;
}
.cred-group:last-child { margin-bottom: 0; }

.cred-group-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0 0 14px;
  font-family: "JetBrains Mono", monospace;
}

.cred-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cred-badge {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-radius: var(--radius-md);
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  transition: var(--snappy);
}
.cred-badge:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
}

.cred-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border-radius: var(--radius-sm);
}

.cred-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.cred-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.cred-issuer {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.cred-tag {
  flex-shrink: 0;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  font-family: "JetBrains Mono", monospace;
}

.cred-tag--year {
  background: rgba(169,220,118,0.15);
  color: #a9dc76;
  border: 1px solid rgba(169,220,118,0.3);
}

.cred-tag--progress {
  background: rgba(255,216,102,0.15);
  color: #ffd866;
  border: 1px solid rgba(255,216,102,0.35);
}

@media (prefers-reduced-motion: reduce) {
  .slash-blade, .photo-img, .faq-body, .cred-badge, .hero-link { transition: none !important; }
}
`;
