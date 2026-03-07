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
      <div className="about-inner">
        <div className="bio-grid reveal">
          <div className="bio-text">
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

          <div className="bio-photo-wrap">
            <div className="photo-ring-sm">
              <div className="photo-inner-sm">
                <img
                  src="https://placehold.co/600x700/221f22/fcfcfa?text=Chris"
                  alt="Chris Norton"
                />
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
