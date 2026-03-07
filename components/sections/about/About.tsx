"use client";
import React, { useEffect } from "react";
import "@css/about/about.css";
function About() {
  useEffect(() => {
    /* ── Scroll reveal ── */ const selectors =
      ".reveal, .service-card, .testimonial-card, .cred-card";
    const targets = document.querySelectorAll<HTMLElement>(selectors);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          // stagger siblings
          const parent = el.parentElement;
          if (!parent) return;
          const siblings = Array.from(
            parent.querySelectorAll<HTMLElement>(selectors),
          );
          const idx = siblings.indexOf(el);
          const base = parseInt(el.style.transitionDelay) || 0;
          const delay = base || (idx % 3) * 110;
          setTimeout(() => el.classList.add("revealed"), delay);
          observer.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    /* ── Stat counter animation ── */
    const statTargets = document.querySelectorAll<HTMLElement>(".stat-num");
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const text = el.textContent || "";
          const num = parseInt(text);
          const suffix = text.replace(num.toString(), "");
          if (isNaN(num)) return;
          let current = 0;
          const step = Math.ceil(num / 40);
          const timer = setInterval(() => {
            current = Math.min(current + step, num);
            el.textContent = current + suffix;
            if (current >= num) clearInterval(timer);
          }, 35);
          statObserver.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );
    statTargets.forEach((el) => statObserver.observe(el));
    /* Cleanup */ return () => {
      observer.disconnect();
      statObserver.disconnect();
    };
  }, []);
  return (
    <section
      className="about-section"
      id="about"
      aria-labelledby="aboutHeading"
    >
      <div className="about-bg" aria-hidden="true">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="about-inner">
        <header className="about-header reveal">
          <div className="eyebrow">👤 About Me</div>
          <h2 className="section-title" id="aboutHeading">
            The Person Behind the Code
          </h2>
          <p className="section-sub">
            Crafting scalable systems and automations with precision — and
            telling you exactly how I did it.
          </p>
        </header>

        <div className="intro-grid">
          <div className="photo-col reveal">
            <div className="photo-card">
              <div className="photo-frame">
                <img
                  className="photo-img"
                  src="https://picsum.photos/seed/chrisportrait/840/1050"
                  alt="Christopher Norton — Systems Engineer and Developer"
                  width="840"
                  height="1050"
                  loading="eager"
                />
                <div className="photo-overlay" aria-hidden="true"></div>
                <div className="photo-nameplate">
                  <span className="photo-name">Christopher Norton</span>
                  <span className="photo-role">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    Systems Engineer
                  </span>
                </div>
              </div>

              <div className="float-badge fb-available" aria-hidden="true">
                Open to Freelance
              </div>
              <div className="float-badge fb-exp" aria-hidden="true">
                5+ Years Exp
              </div>
              <div className="float-badge fb-projects" aria-hidden="true">
                🚀 40+ Projects
              </div>
            </div>
          </div>

          <div className="bio-col reveal" style={{ transitionDelay: ".15s" }}>
            <div className="bio-top">
              <p className="bio-greeting">// about_chris.md</p>
              <h3 className="bio-headline">
                I build systems that
                <br />
                <span>actually ship</span> — and
                <br />
                scale when they do.
              </h3>
              <p className="bio-text">
                I'm Christopher — a systems engineer, developer, and digital
                strategist who lives at the intersection of{" "}
                <strong style={{ color: "var(--white)" }}>
                  DevOps precision
                </strong>{" "}
                and
                <strong style={{ color: "var(--white)" }}>
                  creative problem-solving
                </strong>
                . I've spent years turning complex infrastructure challenges
                into clean, automated solutions for startups, agencies, and solo
                founders.
              </p>
              <p className="bio-text">
                Whether that's a CI/CD pipeline that deploys on every push, an
                IoT system reading sensor data at the edge, or a marketing
                funnel that converts while you sleep — I build things that work
                without babysitting. Then I write about every step of the
                process.
              </p>
            </div>

            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-num">5+</div>
                <div className="stat-label">Years of hands-on experience</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">40+</div>
                <div className="stat-label">Projects shipped to production</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">12+</div>
                <div className="stat-label">Technical articles published</div>
              </div>
            </div>

            <div className="trait-row">
              <span className="trait-pill tp-devops">⚙️ DevOps</span>
              <span className="trait-pill tp-auto">🤖 Automation</span>
              <span className="trait-pill tp-cloud">☁️ Cloud Infra</span>
              <span className="trait-pill tp-linux">🐧 Linux</span>
              <span className="trait-pill tp-iot">🔌 IoT</span>
              <span className="trait-pill tp-seo">📈 SEO & Marketing</span>
            </div>

            <div className="bio-ctas">
              <a href="/contact" className="btn-primary">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Get In Touch
              </a>
              <a href="/insights" className="btn-secondary">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Read My Insights
              </a>
            </div>
          </div>
        </div>

        <div className="seen-in reveal">
          <p className="seen-label">
            Seen in the wild — tools &amp; platforms I work with
          </p>
          <div className="seen-logos" role="list" aria-label="Technologies">
            <div className="tech-badge tb-aws" role="listitem">
              <svg
                width="24"
                height="15"
                viewBox="0 0 80 49"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M22.7 19.5c0 .9.1 1.6.3 2.1.2.5.5.9.9 1.3-.1.2-.3.3-.5.5-.2.1-.4.2-.6.2-.4 0-.8-.2-1.1-.6s-.5-.9-.5-1.6c-.6.7-1.3 1.3-2 1.7s-1.5.6-2.4.6c-1 0-1.8-.3-2.4-.8-.6-.5-.9-1.3-.9-2.2 0-1.1.4-1.9 1.1-2.5.7-.6 1.8-.9 3.1-.9.5 0 1 0 1.5.1.5.1.9.1 1.2.2v-.7c0-.9-.2-1.5-.5-1.9-.3-.4-.8-.6-1.5-.6-.5 0-1 .1-1.5.4-.5.2-.9.5-1.3.8l-.8-1.1c.5-.4 1.1-.8 1.7-1 .6-.3 1.3-.4 2-.4 1.2 0 2.1.3 2.7.9.5.6.8 1.5.8 2.7l.2 2.7zm-2.1.5v-1.5c-.3-.1-.6-.1-1-.2-.4 0-.8-.1-1.1-.1-.8 0-1.4.2-1.9.5-.5.3-.7.8-.7 1.4 0 .5.2.9.5 1.2.3.3.7.4 1.2.4.6 0 1.2-.2 1.7-.5.5-.3 1-.7 1.3-1.2zM29.1 23.1c-.2.1-.5.2-.8.2s-.6 0-.9-.1c-.3-.1-.5-.3-.7-.5-.2-.2-.3-.5-.4-.9-.1-.4-.1-.8-.1-1.4v-5.6H25v-1.5h1.2V11l1.9-.5v2.8h2.4v1.5h-2.4v5.4c0 .5 0 .9.1 1.1.1.3.3.4.6.4.2 0 .4 0 .6-.1l.5-.2.2 1.7zM39.9 22.9h-1.9V17c0-.8-.1-1.4-.4-1.9-.3-.4-.7-.7-1.3-.7-.3 0-.7.1-1 .2-.3.2-.6.4-.9.7-.3.3-.5.6-.7 1-.2.4-.3.8-.3 1.3v5.3H31.5V8.5h1.9v5.7c.4-.6.9-1.1 1.5-1.4.6-.3 1.2-.5 1.9-.5 1 0 1.8.3 2.3 1 .5.7.8 1.6.8 2.9v6.7zM56.2 22.9h-2.1l-3.5-9.6-3.5 9.6h-2l-4.2-10.1h2.1l3.1 8.6 3.4-8.6h2l3.3 8.6 3.1-8.6h2l-3.7 10.1z"
                  fill="#FF9900"
                />
                <path
                  d="M24.5 38.3c-6.1 4.5-14.9 6.9-22.5 6.9-10.6 0-20.2-3.9-27.4-10.4-.6-.5-.1-1.2.6-.8 7.8 4.5 17.4 7.2 27.4 7.2 6.7 0 14.1-1.4 20.9-4.3 1-.4 1.9.7 1 1.4z"
                  fill="#FF9900"
                />
              </svg>
              AWS
            </div>
            <div className="tech-badge tb-k8s" role="listitem">
              <svg
                width="18"
                height="18"
                viewBox="0 0 32 32"
                aria-hidden="true"
                fill="#3274e5"
              >
                <path d="M15.9 2a14 14 0 100 28 14 14 0 000-28zm0 2a12 12 0 110 24 12 12 0 010-24z" />
                <path d="M16 7l-1 5h2l-1-5zm5 2l-4 3 1 2 3-5zm-10 0l3 5 1-2-4-3zM9 13l4 2v-2H9zm14 0h-4v2l4-2zm-5 5l1-2-5-2 4 4zm-4 0l4-4-5 2 1 2zm2 2v5l1-2.5L16 20z" />
              </svg>
              Kubernetes
            </div>
            <div className="tech-badge tb-docker" role="listitem">
              <svg
                width="20"
                height="15"
                viewBox="0 0 32 22"
                aria-hidden="true"
                fill="#0db7ed"
              >
                <rect x="0" y="8" width="4" height="4" rx=".5" />
                <rect x="5" y="8" width="4" height="4" rx=".5" />
                <rect x="10" y="8" width="4" height="4" rx=".5" />
                <rect x="5" y="3" width="4" height="4" rx=".5" />
                <rect x="10" y="3" width="4" height="4" rx=".5" />
                <rect x="10" y="13" width="4" height="4" rx=".5" />
                <path d="M28 10c-.4-.3-1.4-.7-2.8-.5-.3-1.7-1.4-2.5-1.4-2.5s-1.2 1.4-.8 3.1c-.5.3-1.3.7-2.5.7H2.5c-.3 2.1.3 3.9 1.5 5.1 1.1 1.1 2.7 1.7 4.7 1.7 4.4 0 7.8-2 9.9-5.7.7.1 2.2.2 3-.9.1-.1.4-.4.4-1z" />
              </svg>
              Docker
            </div>
            <div className="tech-badge tb-linux" role="listitem">
              🐧 Linux
            </div>
            <div className="tech-badge tb-python" role="listitem">
              <svg
                width="18"
                height="18"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path
                  d="M15.9 2.5c-5.2 0-4.9 2.3-4.9 2.3v2.3h5v.8H8.6S5 7.5 5 12.8s3.1 5.1 3.1 5.1H10v-2.5s-.1-3.1 3-3.1h5.3s2.9.1 2.9-2.8V5.4s.4-2.9-5.3-2.9zm-3 1.7c.5 0 1 .4 1 1s-.4 1-1 1-.9-.5-.9-1 .4-1 .9-1z"
                  fill="#3776ab"
                />
                <path
                  d="M16.1 29.5c5.2 0 4.9-2.3 4.9-2.3v-2.3h-5v-.8h7.4s3.6.4 3.6-4.9-3.1-5.1-3.1-5.1H22v2.5s.1 3.1-3 3.1H13.7s-2.9-.1-2.9 2.8v4.1s-.4 2.9 5.3 2.9zm3-1.7c-.5 0-.9-.4-.9-1s.4-1 .9-1 1 .5 1 1-.5 1-1 1z"
                  fill="#ffd043"
                />
              </svg>
              Python
            </div>
            <div className="tech-badge tb-tf" role="listitem">
              <svg
                width="18"
                height="18"
                viewBox="0 0 32 32"
                aria-hidden="true"
                fill="#7B42BC"
              >
                <path d="M0 4.7l9.4 5.4V21L0 15.7V4.7zm10.6 5.4L20 4.7v10.3L10.6 20v-9.9zm0 11l9.4 5.4L29.3 21V10.7L20 16v-1l-9.4-5.4V21z" />
              </svg>
              Terraform
            </div>
            <div className="tech-badge tb-make" role="listitem">
              <span
                style={{
                  fontSize: ".9rem",
                  fontWeight: 800,
                  background: "linear-gradient(135deg,#a9dc76,#78dce8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                make
              </span>
            </div>
            <div className="tech-badge tb-n8n" role="listitem">
              <span
                style={{ fontSize: ".9rem", fontWeight: 800, color: "#EA3667" }}
              >
                n8n
              </span>
            </div>
          </div>
        </div>

        <div className="what-i-do">
          <div className="wid-header reveal">
            <h3 className="wid-heading">What I Do</h3>
            <span className="wid-sub">
              // 6 disciplines · always compounding
            </span>
          </div>

          <div className="services-grid">
            <div className="service-card sc-devops">
              <div className="sc-icon sci-devops" aria-hidden="true">
                ⚙️
              </div>
              <h4 className="sc-title">Web &amp; DevOps</h4>
              <p className="sc-desc">
                Building scalable cloud infrastructure, automated CI/CD
                pipelines, and containerised deployments that push to production
                without drama.
              </p>
              <div className="sc-tags">
                <span className="sc-tag">Docker</span>
                <span className="sc-tag">Kubernetes</span>
                <span className="sc-tag">GitHub Actions</span>
                <span className="sc-tag">AWS</span>
                <span className="sc-tag">Nginx</span>
              </div>
            </div>

            <div className="service-card sc-iot">
              <div className="sc-icon sci-iot" aria-hidden="true">
                🔌
              </div>
              <h4 className="sc-title">IoT &amp; Hardware</h4>
              <p className="sc-desc">
                Developing smart devices, real-time sensor monitoring systems,
                and embedded firmware solutions that bridge the physical and
                digital worlds.
              </p>
              <div className="sc-tags">
                <span className="sc-tag">RTOS</span>
                <span className="sc-tag">Arduino</span>
                <span className="sc-tag">Raspberry Pi</span>
                <span className="sc-tag">MQTT</span>
                <span className="sc-tag">C++</span>
              </div>
            </div>

            <div className="service-card sc-auto">
              <div className="sc-icon sci-auto" aria-hidden="true">
                🤖
              </div>
              <h4 className="sc-title">Automation &amp; AI</h4>
              <p className="sc-desc">
                Designing efficient workflows, no-code integrations, and
                LLM-powered automations that eliminate repetitive work and scale
                business processes.
              </p>
              <div className="sc-tags">
                <span className="sc-tag">n8n</span>
                <span className="sc-tag">Make</span>
                <span className="sc-tag">LangChain</span>
                <span className="sc-tag">Python</span>
                <span className="sc-tag">OpenAI API</span>
              </div>
            </div>

            <div className="service-card sc-seo">
              <div className="sc-icon sci-seo" aria-hidden="true">
                📈
              </div>
              <h4 className="sc-title">SEO &amp; Digital Marketing</h4>
              <p className="sc-desc">
                Turning websites into organic traffic machines — technical SEO
                audits, content strategy, funnel architecture, and copy that
                converts without the buzzwords.
              </p>
              <div className="sc-tags">
                <span className="sc-tag">Core Web Vitals</span>
                <span className="sc-tag">Schema.org</span>
                <span className="sc-tag">GA4</span>
                <span className="sc-tag">Funnels</span>
              </div>
            </div>

            <div className="service-card sc-linux">
              <div className="sc-icon sci-linux" aria-hidden="true">
                🐧
              </div>
              <h4 className="sc-title">Linux &amp; Systems</h4>
              <p className="sc-desc">
                Configuring and hardening Linux servers, writing Bash
                automation, managing homelabs and VPS environments, and making
                systems do exactly what they should.
              </p>
              <div className="sc-tags">
                <span className="sc-tag">Ubuntu</span>
                <span className="sc-tag">Bash</span>
                <span className="sc-tag">Networking</span>
                <span className="sc-tag">Terraform</span>
              </div>
            </div>

            <div className="service-card sc-email">
              <div className="sc-icon sci-email" aria-hidden="true">
                ✉️
              </div>
              <h4 className="sc-title">Email &amp; Deliverability</h4>
              <p className="sc-desc">
                Setting up and optimising email infrastructure — DKIM, SPF,
                DMARC, transactional pipelines, and marketing sequences that
                actually land in the inbox.
              </p>
              <div className="sc-tags">
                <span className="sc-tag">DKIM / SPF</span>
                <span className="sc-tag">DMARC</span>
                <span className="sc-tag">SendGrid</span>
                <span className="sc-tag">Postfix</span>
              </div>
            </div>
          </div>
        </div>

        <div className="testimonial-belt">
          <div className="testimonial-card">
            <div className="tc-stars" aria-label="5 stars">
              ★★★★★
            </div>
            <blockquote className="tc-quote">
              "Chris took our messy manual deployment process and transformed it
              into a fully automated pipeline. Deploys that used to take an
              afternoon now happen in minutes without a single human touch.
              Exceptional work."
            </blockquote>
            <div className="tc-author">
              <div className="tc-avatar" aria-hidden="true">
                MR
              </div>
              <div className="tc-info">
                <div className="tc-name">Marcus R.</div>
                <div className="tc-title">CTO, SaaS Startup</div>
              </div>
              <span className="tc-tag tc-devops-tag">DevOps</span>
            </div>
          </div>

          <div className="testimonial-card" style={{ transitionDelay: ".15s" }}>
            <div className="tc-stars" aria-label="5 stars">
              ★★★★★
            </div>
            <blockquote className="tc-quote">
              "Hired Chris for SEO and ended up with a whole content strategy.
              Organic traffic went up 340% in four months. He writes like a
              marketer but thinks like an engineer — rare combination."
            </blockquote>
            <div className="tc-author">
              <div className="tc-avatar" aria-hidden="true">
                JL
              </div>
              <div className="tc-info">
                <div className="tc-name">Julia L.</div>
                <div className="tc-title">Founder, E-Commerce Brand</div>
              </div>
              <span className="tc-tag tc-marketing">Marketing</span>
            </div>
          </div>
        </div>

        <div className="credentials-row">
          <div className="cred-card">
            <span className="cred-icon">☁️</span>
            <span className="cred-label">Certification</span>
            <span className="cred-value">AWS Solutions Architect</span>
          </div>
          <div className="cred-card" style={{ transitionDelay: ".1s" }}>
            <span className="cred-icon">🎓</span>
            <span className="cred-label">Education</span>
            <span className="cred-value">BSc. Computer Engineering</span>
          </div>
          <div className="cred-card" style={{ transitionDelay: ".2s" }}>
            <span className="cred-icon">📝</span>
            <span className="cred-label">Content</span>
            <span className="cred-value">12+ Technical Articles</span>
          </div>
          <div className="cred-card" style={{ transitionDelay: ".3s" }}>
            <span className="cred-icon">🌍</span>
            <span className="cred-label">Remote</span>
            <span className="cred-value">Worldwide · Async-first</span>
          </div>
        </div>
      </div>

      <div className="about-inner" style={{ paddingBottom: 0 }}>
        <div className="connect-block reveal">
          <div className="connect-eyebrow">📬 Let's Connect</div>
          <h3 className="connect-title">
            Got a project that needs
            <br />
            <span>precision &amp; personality?</span>
          </h3>
          <p className="connect-sub">
            Whether you need cloud infrastructure, a custom automation, or an
            SEO strategy that actually works — I'd love to hear about it.
          </p>
          <div
            className="avail-pill"
            style={{ margin: "0 auto 2rem", width: "fitContent" }}
          >
            <span className="avail-dot"></span>
            Available for freelance projects
          </div>
          <div className="connect-ctas">
            <a href="/contact" className="btn-primary">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Get In Touch
            </a>
            <a href="/insights" className="btn-secondary">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              Browse Insights
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
