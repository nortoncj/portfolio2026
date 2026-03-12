"use client";
import React, { useEffect } from "react";
import "@css/contact.css";
import Link from "next/link";
import { CV, email, social } from "@/data/socials";
import {
  FaBolt,
  FaBriefcase,
  FaEnvelope,
  FaGithub,
  FaLocationPin,
} from "react-icons/fa6";

export default function ContactSection() {
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
    <section id="contact" aria-label="Contact Chris Norton">
      <div className="contact-bg">
        <div className="flowgrid"></div>
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="deco-badge deco-badge-1">
        <div
          className="deco-badge-icon"
          style={{
            background: "linear-gradient(135deg, #ff6188, #fc5fa3)",
            boxShadow: "0 4px 14px rgba(255, 97, 136, 0.35)",
          }}
        >
          <FaBolt style={{ color: "var(--coral)" }} />
        </div>
        <div>
          <div className="deco-badge-val">24h</div>
          <div className="deco-badge-sub">Response time</div>
        </div>
      </div>
      <div className="deco-badge deco-badge-2">
        <div
          className="deco-badge-icon"
          style={{
            background: "linear-gradient(135deg, #a9dc76, #78dce8)",
            boxShadow: "0 4px 14px rgba(169, 220, 118, 0.35)",
          }}
        >
          <FaBriefcase />
        </div>
        <div>
          <div className="deco-badge-val">Open</div>
          <div className="deco-badge-sub">To work</div>
        </div>
      </div>

      <div className="contact-inner">
        <div className="contact-info">
          <div className="section-eyebrow">
            <span>
              {" "}
              <FaEnvelope />{" "}
            </span>{" "}
            Get In Touch
          </div>

          <div className="reveal" style={{ transitionDelay: "0.08s" }}>
            <h2 className="contact-heading">
              Let's Build
              <br />
              <span className="gradient-text">Something Great</span>
            </h2>
          </div>

          <p
            className="contact-sub reveal"
            style={{ transitionDelay: "0.16s" }}
          >
            Whether you have a <strong>project in mind</strong>, want to talk
            <strong> tech & systems</strong>, or just want to say hello my inbox
            is always open.
          </p>

          <div
            className="info-cards reveal"
            style={{ transitionDelay: "0.24s" }}
          >
            <Link
              href="/cdn-cgi/l/email-protection#9bf8f3e9f2e8dbfee3faf6ebf7feb5f8f4f6"
              className="info-card"
              onClick={(e) => {
                e.preventDefault();
                email();
              }}
            >
              <div className="info-icon pink">
                <FaEnvelope />{" "}
              </div>
              <div>
                <div className="info-label">Email</div>
                <div className="info-value">
                  <span
                    className="__cf_email__"
                    data-cfemail="b7d4dfc5dec4f7d2cfd6dac7dbd299d4d8da"
                  >
                    {/* [email&#160;protected] */} click to email
                  </span>
                </div>
              </div>
            </Link>
            <Link
              href="https://github.com/"
              target="_blank"
              rel="noopener"
              className="info-card"
            >
              <div className="info-icon purple">
                <FaGithub />{" "}
              </div>
              <div>
                <div className="info-label">GitHub</div>
                <div className="info-value">github.com/nortoncj</div>
              </div>
            </Link>
            <Link href="#" className="info-card">
              <div className="info-icon coral">
                <FaLocationPin />{" "}
              </div>
              <div>
                <div className="info-label">Location</div>{" "}
                <div className="info-value">
                  Tampa, Florida, US · Available Worldwide
                </div>
              </div>
            </Link>
          </div>

          <div
            className="availability reveal"
            style={{ transitionDelay: "0.32s" }}
          >
            <div className="avail-dot"></div>
            Currently available for new projects
          </div>

          <div
            className="social-row reveal"
            style={{ transitionDelay: "0.4s" }}
          >
            {social.map((item) => (
              <Link
                key={item.name}
                href={item.url}
                aria-label={item.name}
                className="social-link"
              >
                <item.icon className="w-5 h-5" />
              </Link>
            ))}
            <Link
              href="/cdn-cgi/l/email-protection#8ae9e2f8e3f9caeff2ebe7fae6efa4e9e5e7"
              aria-label="Email"
              onClick={(e) => {
                e.preventDefault();
                email();
              }}
              className="social-link"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </Link>
            <Link
              href="#"
              aria-label="Read.cv / Portfolio"
              className="social-link"
              onClick={(e) => {
                e.preventDefault();
                CV();
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="form-card reveal" style={{ transitionDelay: "0.12s" }}>
          <div id="form-content">
            <h3 className="form-card-heading">Send a Message</h3>
            <p className="form-card-sub">
              I read every message personally. No bots, no auto-replies.
            </p>

            <form id="contact-form" noValidate>
              <div className="field-row">
                <div className="field-group">
                  <label className="field-label" htmlFor="cf-name">
                    Full Name
                  </label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    className="field-input"
                    placeholder="Chris Norton"
                    autoComplete="name"
                  />
                  <span className="field-error" id="err-name"></span>
                </div>
                <div className="field-group">
                  <label className="field-label" htmlFor="cf-email">
                    Email
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    className="field-input"
                    placeholder="hello@domain.com"
                    autoComplete="email"
                  />
                  <span className="field-error" id="err-email"></span>
                </div>
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="cf-type">
                  Project Type
                </label>
                <select id="cf-type" name="type" className="field-select">
                  <option value="" disabled defaultValue="consulting">
                    Select what fits best…
                  </option>
                  <option value="freelance">Freelance / Contract Work</option>
                  <option value="fulltime">Full-Time Opportunity</option>
                  <option value="collab">Collaboration / Partnership</option>
                  <option value="consulting">Consulting / Advisory</option>
                  <option value="other">Just Saying Hello 👋</option>
                </select>
                <span className="field-error" id="err-type"></span>
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="cf-subject">
                  Subject
                </label>
                <input
                  id="cf-subject"
                  name="subject"
                  type="text"
                  className="field-input"
                  placeholder="What's the project about?"
                />
                <span className="field-error" id="err-subject"></span>
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="cf-message">
                  Message
                </label>
                <textarea
                  id="cf-message"
                  name="message"
                  className="field-textarea"
                  placeholder="Tell me about your project, timeline, stack — all the good stuff…"
                  maxLength={800}
                ></textarea>
                <div className="char-counter" id="char-count">
                  0 / 800
                </div>
                <span className="field-error" id="err-message"></span>
              </div>

              <button type="submit" id="submit-btn" className="btn-submit">
                <span
                  className="btn-text"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  Send Message
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
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </span>
                <div className="btn-spinner"></div>
              </button>
            </form>
          </div>

          <div className="success-state" id="success-state">
            <div className="success-icon-wrap">✅</div>
            <h3 className="success-title">Message Sent!</h3>
            <p className="success-msg">
              Thanks for reaching out. I'll get back to you within 24 hours.
              Keep building great things in the meantime.
            </p>
            <div className="success-badge">
              <span>⚡</span> Expected reply within 24h
            </div>
            <button className="success-reset" id="reset-btn">
              Send another message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
