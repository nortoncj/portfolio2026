"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import "@css/projects.css";
import Devops from "@images/devops.jpg";
import WebDev from "@images/webdev.jpg";
import Marketing from "@images/marketing.jpg";
import Embedded from "@images/embedded.jpg";
import Image from "next/image";
import { FaTools } from "react-icons/fa";

export default function ProjectSection() {
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
    <section id="projects" className="projects">
      <div className="projects-inner">
        <div className="reveal">
          <h2 className="section-title">
            Built across <span className="grad">every layer</span>
          </h2>

          <p className="section-sub">
            Pick a discipline and explore the projects behind it.
          </p>
          <div className="section-label">
            {" "}
            <FaTools color="black" /> My Work
          </div>
        </div>

        <div className="cat-grid">
          <Link href="projects/devops" className="cat-tile reveal d1">
            {/* <div className="cat-bg"></div> */}
            <Image
              src={Devops}
              alt="DevOps"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: ".55",
              }}
            />
            <div className="cat-overlay ov-devops"></div>

            {/* Replace the cat-bg div with a real image like so:
          <img src="images/devops-cover.jpg" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.55;" />
         */}
            <div className="cat-content">
              <div className="cat-title">
                Cloud Infrastructure
                <br />
                &amp; DevOps
              </div>
              <div className="cat-arrow">
                View projects <span className="arrow-circle">→</span>
              </div>
            </div>
            <div className="cat-accent ac-devops"></div>
          </Link>

          <Link href="projects/web" className="cat-tile reveal d2">
            {/* <div className="cat-bg"></div> */}
            <Image
              src={WebDev}
              alt="software and web development"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: ".55",
              }}
            />
            <div className="cat-overlay ov-web"></div>
            <div className="cat-content">
              <div className="cat-title">
                Full-Stack Web
                <br />
                Development
              </div>
              <div className="cat-arrow">
                View projects <span className="arrow-circle">→</span>
              </div>
            </div>
            <div className="cat-accent ac-web"></div>
          </Link>

          <Link href="projects/marketing" className="cat-tile reveal d3">
            {/* <div className="cat-bg"></div> */}
            <Image
              src={Marketing}
              alt="marketing"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: ".55",
              }}
            />
            <div className="cat-overlay ov-auto"></div>
            <div className="cat-content">
              <div className="cat-title">
                Marketing &amp;
                <br />
                Automation Systems
              </div>
              <div className="cat-arrow">
                View projects <span className="arrow-circle">→</span>
              </div>
            </div>
            <div className="cat-accent ac-auto"></div>
          </Link>

          <Link href="projects/hardware" className="cat-tile reveal d4">
            {/* <div className="cat-bg"></div> */}
            <Image
              src={Embedded}
              alt="Hardware, Circuits and Embedded Systems for IOT"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: ".55",
              }}
            />
            <div className="cat-overlay ov-hardware"></div>
            <div className="cat-content">
              <div className="cat-title">
                Embedded Systems
                <br />
                &amp; Hardware Design
              </div>
              <div className="cat-arrow">
                View projects <span className="arrow-circle">→</span>
              </div>
            </div>
            <div className="cat-accent ac-hardware"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}
