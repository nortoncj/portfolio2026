"use client";
import React, { useEffect } from "react";
import "@css/about.css";
import { certifications, education } from "@/data/skills";
import {
  FaBook,
  FaCalendar,
  FaChartColumn,
  FaCloud,
  FaCode,
  FaComputer,
  FaGraduationCap,
  FaMusic,
  FaPlane,
  FaRobot,
  FaTv,
  FaUsers,
  FaWrench,
} from "react-icons/fa6";
import aboutPicture from "@images/about_headshot.jpeg";
import Image from "next/image";
import joMaloneLogo from "@images/logos/jo-malone.png";
import carrierEnterpriseLogo from "@images/logos/carrier-enterprise.png";
import newYorkLifeLogo from "@images/logos/new-york-life.png";
import watscoLogo from "@images/logos/watsco.png";
import vfwLogo from "@images/logos/vfw.png";
import carnivalLogo from "@images/logos/carnival.png";

const brands = [
  { name: "Carrier Enterprise", logo: carrierEnterpriseLogo },
  { name: "Jo Malone", logo: joMaloneLogo, style: "#f9f0e6" },
  { name: "New York Life", logo: newYorkLifeLogo },
  {
    name: "Watsco",
    logo: watscoLogo,
    style: "rgba(0, 71, 171, 0.5)",
  },
  { name: "VFW", logo: vfwLogo },
  { name: "Carnival Cruise Lines", logo: carnivalLogo },
];

export default function AboutSection() {
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
    <section id="about" className="about">
      <div className="relative w-full max-w-7xl mx-auto px-6 py-24">
        {/* Glass Panel Card */}
        <div
          className="relative overflow-hidden"
          style={{
            // background: "rgba(16, 13, 17, 0.5)",
            // backdropFilter: "blur(24px)",
            borderRadius: "2rem",
            border: "1px solid rgba(255, 139, 162, 0.15)",
            boxShadow: `
            0 0 1px rgba(255, 139, 162, 0.1) inset,
            0 40px 80px rgba(255, 139, 162, 0.08)
          `,
            marginBottom: "4rem",
            padding: "4rem 3rem",
          }}
        >
          {/* Gradient Signature Texture - Background */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, #ff8ba2 0%, #f85c83 100%)",
              mixBlendMode: "overlay",
            }}
          />

          {/* Content Container */}
          <div className="relative  text-center space-y-8">
            {/* Label - Technical Metadata */}
            <div
              className="uppercase tracking-[0.2em] font-semibold"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.75rem",
                color: "#ff8ba2",
                letterSpacing: "0.2em",
              }}
            >
              Validated Excellence
            </div>

            {/* Display Headline - Editorial Impact */}
            <h3
              className="font-bold leading-tight"
              style={{
                fontFamily: "'Noto Serif', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                background: "linear-gradient(135deg, #ffe6a6 0%, #ff8ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
              }}
            >
              {/* Systems Engineered For */}
              Engineering Systems For{" "}
              <span className="grad">Real-World Impact</span>
            </h3>

            {/* Brand Icons Grid */}
            <div
              className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center pt-8"
              style={{
                marginTop: "3.5rem",
              }}
            >
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="group relative flex items-center justify-center transition-all duration-500 hover:scale-110"
                  style={{
                    filter: "grayscale(100%) brightness(0.4)",
                    transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    borderRadius: "1rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter =
                      "grayscale(0%) brightness(1) drop-shadow(0 0 8px rgba(255, 139, 162, 0.6)) ";
                    e.currentTarget.style.backgroundColor =
                      brand.style || "transparent";
                    e.currentTarget.style.padding = "20px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter =
                      "grayscale(100%) brightness(0.4)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {/* Ambient Glow on Hover */}
                  <div
                    className="absolute inset-0 place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(142, 242, 254, 0.3) 0%, transparent 70%)",
                      transform: "scale(1.5)",
                    }}
                  />

                  <Image
                    src={brand.logo}
                    width={80}
                    height={80}
                    alt={brand.name}
                    className="relative z-10"
                    style={{
                      maxWidth: "80px",
                      height: "auto",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Ghost Border Inner Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "2rem",
              boxShadow: "0 0 0 1px rgba(255, 139, 162, 0.1) inset",
            }}
          />
        </div>
      </div>
      <div className="about-inner">
        <div className="bio-grid reverse reveal">
          <div className="bio-text left">
            <div>
              <div className="section-label">✦ About Me</div>
              <h2 className="section-title">
                The person <span className="grad">behind the code</span>
              </h2>
            </div>
            <p className="bio-para">
              I'm <strong className="c-pink">Christopher Norton</strong>, a
              multi-disciplinary engineer who lives at the intersection of
              <strong className="c-cyan"> systems thinking</strong> and
              <strong className="c-purple"> creative problem-solving</strong>. I
              got my B.S. in Engineering and since then I've been obsessed with
              building things that actually work at scale — whether that's a
              <strong className="c-gold"> cloud pipeline</strong>, an
              <strong className="c-mint"> embedded hardware solution</strong>,
              or a fully automated marketing funnel. When I'm not shipping code
              I'm probably deep in an anime arc, tinkering with electronics, or
              traveling with family.
            </p>
            <div className="interest-row">
              <span className="interest-pill pill-cyan">
                <FaUsers /> family
              </span>
              <span className="interest-pill pill-purple">
                {" "}
                <FaTv /> Anime
              </span>
              <span className="interest-pill pill-mint">
                <FaWrench /> Hardware Tinkering
              </span>
              <span className="interest-pill pill-pink">
                {" "}
                <FaMusic /> Music
              </span>
              <span className="interest-pill pill-gold">
                {" "}
                <FaPlane /> Travel
              </span>
              <span className="interest-pill pill-cyan">
                {" "}
                <FaBook /> Reading
              </span>
              <span className="interest-pill pill-purple">
                <FaRobot /> AI / Automation
              </span>
              <span className="interest-pill pill-mint">
                {" "}
                <FaCode /> Open Source
              </span>
            </div>
          </div>
          <div className="bio-photo-wrap right">
            <div className="photo-ring-sm">
              <div className="photo-inner-sm">
                <Image src={aboutPicture} alt="Chris Norton" />
              </div>
            </div>
            <div className="stat-badge top">
              <div className="stat-badge-icon sbg-cyan">
                {" "}
                <FaComputer />
              </div>
              <div>
                <div className="stat-val">5+ yrs</div>
                <div className="stat-sub">Engineering</div>
              </div>
            </div>
            <div className="stat-badge bottom">
              <div className="stat-badge-icon sbg-mint">
                {" "}
                <FaChartColumn />
              </div>
              <div>
                <div className="stat-val">Always</div>
                <div className="stat-sub">Building</div>
              </div>
            </div>
          </div>
        </div>

        <div className="band-divider"></div>

        <div className="reveal">
          <div className="section-label">
            {" "}
            <FaGraduationCap /> Credentials
          </div>
          <h2 className="section-title" style={{ marginBottom: "8px" }}>
            Education &amp; <span className="grad">Certifications</span>
          </h2>
          <p
            style={{
              color: "var(--silver)",
              fontSize: "0.9rem",
              marginBottom: "32px",
            }}
          >
            Hover any card to reveal the details.
          </p>

          <div className="edu-grid">
            <div key={education.degree} className="edu-card-wrap featured">
              <div className="edu-front">
                <div className="edu-front-top">
                  <div className="edu-icon">
                    <FaGraduationCap />{" "}
                  </div>

                  <span className="edu-badge eb-degree">Degree</span>
                </div>
                <div>
                  <div className="edu-name">{education.degree}</div>
                  <div className="edu-school">
                    {education.institution} · {education.period}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* <span className="edu-year">📅 20XX</span> */}
                  <span className="edu-hover-hint">hover to reveal →</span>
                </div>
              </div>
              <div className="edu-back edu-back-degree">
                <div className="edu-back-label">Bachelor of Science</div>
                <div className="edu-back-title">Engineering</div>
                <div className="edu-back-desc">{education.description}</div>
                <div className="edu-back-skills">
                  {education.tags.map((tag: any) => {
                    return (
                      <span key={tag} className="edu-skill-pill">
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            {certifications.map((cert) => {
              return (
                <div key={cert.id} className="edu-card-wrap">
                  <div className="edu-front">
                    <div className="edu-front-top">
                      <div className="edu-icon">
                        <cert.icon color={cert.style} />
                      </div>
                      <span className="edu-badge eb-cert">Cert</span>
                    </div>
                    <div>
                      <div className="edu-name">{cert.title}</div>
                      <div className="edu-school">{cert.issuer}</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span className="edu-year">
                        {" "}
                        <FaCalendar /> {cert.year}
                      </span>
                      <span className="edu-hover-hint">hover →</span>
                    </div>
                  </div>
                  <div className={`edu-back edu-back-cert${cert.id}`}>
                    <div className="edu-back-label">Certification</div>
                    <div className="edu-back-title">{cert.title}</div>
                    <div className="edu-back-desc">{cert.description}</div>
                    <div className="edu-back-skills">
                      {cert.tags.map((tag: any) => {
                        return (
                          <span key={tag} className="edu-skill-pill">
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
