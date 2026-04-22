"use client";
import React, { useState } from "react";
import "@css/hero.css";
import VideoModal from "./videoModal";
import { email, social } from "@/data/socials";
import Link from "next/link";
import { Fader } from "./Fader";
import { FaGear, FaGraduationCap, FaPlay } from "react-icons/fa6";
import Photo from "@images/hero_headshot.png";
import Image from "next/image";
import { Play } from "./Play";

function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <section className="hero blobGradient">
      <div className="hero-blob3"></div>
      <div className="hero-grid">
        <div className="hero-left">
          <h2 className="hero-title fade-up">
            Hi, I'm <span className="name">Chris</span>
          </h2>

          <h1 className="hero-subtitle fade-up delay-1">
            I Build
            <span id="" className="code ">
              {" "}
              <Fader />
            </span>
          </h1>

          <p className="hero-desc fade-up delay-2">
            Multi-disciplinary engineer specializing in
            <strong className="c-purple"> scalable software solutions</strong>,
            <strong className="c-magenta"> intelligent automation</strong>, and
            <strong className="c-pink"> embedded systems</strong>. Transforming
            complex problems into elegant, production-ready solutions.
          </p>

          <div className="hero-tags fade-up delay-3">
            <span className="tag tag-purple">Email Automation</span>
            <span className="tag tag-cyan">Cloud &amp; DevOps</span>
            <span className="tag tag-mint">Data Analyst</span>
            <span className="tag tag-pink"> Embedded Systems</span>
          </div>

          <div className="hero-cta-row fade-up delay-4">
            <Link href="#projects" className="btn-primary">
              View My Work →
            </Link>

            {/* Play */}
            <Play onClick={() => setModalOpen(true)} />
          </div>

          <div className="hero-socials fade-up delay-5">
            {social.map((item) => (
              <Link key={item.name} href={item.url} aria-label={item.name}>
                <item.icon className="h-5 w-5" />
              </Link>
            ))}

            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                email();
              }}
              aria-label="Email"
            >
              <svg
                width="20"
                height="20"
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
          </div>
        </div>

        <div className="hero-right">
          <div className="photo-ring">
            <div className="photo-inner">
              <Image src={Photo} alt="Chris Norton" />
            </div>
          </div>

          <div className="badge badge-projects">
            <div className="badge-icon badge-icon-pink">
              <FaGear />{" "}
            </div>
            <div>
              <div className="badge-val">10+</div>
              <div className="badge-sub">Projects</div>
            </div>
          </div>

          <div className="badge badge-degree">
            <div className="badge-icon badge-icon-purple">
              <FaGraduationCap />{" "}
            </div>
            <div>
              <div className="badge-val">B.S.</div>
              <div className="badge-sub">Engineering</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <VideoModal
        open={modalOpen}
        url="https://www.youtube.com/embed/NMWM5lHDySE?autoplay=1&mute=1"
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}

export default Hero;
