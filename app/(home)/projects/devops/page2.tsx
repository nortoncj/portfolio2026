"use client";
import React, { useEffect } from "react";
import "@css/projects/devops.css";
import { buildMetadata } from "@/libs/SEO";
import { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "DevOps Engineering Projects",
  description:
    "End-to-end CI/CD pipelines, container orchestration, infrastructure as code, and cloud automation built for production. Every project is designed for reliability, repeatability, and scale.",
});
export default function DevopsPage() {
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
    <>
      <div className="page-wrap">
        <section className="cat-hero" aria-labelledby="cat-heading">
          <div className="cat-hero-inner">
            <div className="cat-hero-left">
              <div className="cat-eyebrow reveal">
                <span className="cat-eyebrow-dot" aria-hidden="true"></span>
                Project Category
              </div>

              <h1 className="cat-heading reveal rd1" id="cat-heading">
                <span className="cat-grad">DevOps</span>
                <br />
                Engineering
              </h1>

              <p className="cat-desc reveal rd2">
                End-to-end <strong>CI/CD pipelines</strong>, container
                orchestration, infrastructure as code, and{" "}
                <strong>cloud automation</strong> built for production. Every
                project is designed for reliability, repeatability, and scale.
              </p>

              <div className="cat-stats reveal rd3">
                <div className="stat">
                  <span className="stat-val">
                    <span className="accent">6</span>
                  </span>
                  <span className="stat-lbl">Projects</span>
                </div>
                <div className="stat-sep"></div>
                <div className="stat">
                  <span className="stat-val">
                    <span className="accent">8</span>
                  </span>
                  <span className="stat-lbl">Core Skills</span>
                </div>
                <div className="stat-sep"></div>
                <div className="stat">
                  <span className="stat-val">
                    <span className="accent">12</span>
                  </span>
                  <span className="stat-lbl">Technologies</span>
                </div>
              </div>
            </div>

            <div className="cat-icon-wrap reveal rd4" aria-hidden="true">
              ⚙️
            </div>
          </div>
        </section>
      </div>

      <div className="section-divider"></div>

      <div className="page-wrap">
        <section className="skills-section" aria-labelledby="skills-heading">
          <div className="sec-header reveal">
            <h2 className="sec-title" id="skills-heading">
              Core Skills
              <span className="sec-count">8 skills</span>
            </h2>
          </div>

          <ul className="skills-grid" aria-label="Core skills list" role="list">
            <li className="skill-pill reveal rd1" data-tags="docker,kubernetes">
              <span className="skill-icon" aria-hidden="true">
                🐳
              </span>
              <span className="skill-name">Docker & Kubernetes</span>
              <div className="skill-bar-wrap"></div>
            </li>

            <li className="skill-pill reveal rd2" data-tags="terraform,iac">
              <span className="skill-icon" aria-hidden="true">
                🏗️
              </span>
              <span className="skill-name">Terraform / IaC</span>
              <div className="skill-bar-wrap"></div>
            </li>

            <li className="skill-pill reveal rd3" data-tags="aws,ec2,s3">
              <span className="skill-icon" aria-hidden="true">
                ☁️
              </span>
              <span className="skill-name">AWS Cloud</span>
              <div className="skill-bar-wrap"></div>
            </li>

            <li
              className="skill-pill reveal rd4"
              data-tags="github-actions,jenkins,cicd"
            >
              <span className="skill-icon" aria-hidden="true">
                🔄
              </span>
              <span className="skill-name">CI/CD Pipelines</span>
              <div className="skill-bar-wrap"></div>
            </li>

            <li className="skill-pill reveal rd5" data-tags="linux,bash">
              <span className="skill-icon" aria-hidden="true">
                🐧
              </span>
              <span className="skill-name">Linux & Bash</span>
              <div className="skill-bar-wrap"></div>
            </li>

            <li
              className="skill-pill reveal rd6"
              data-tags="prometheus,grafana,monitoring"
            >
              <span className="skill-icon" aria-hidden="true">
                📊
              </span>
              <span className="skill-name">Monitoring & Observability</span>
              <div className="skill-bar-wrap"></div>
            </li>

            <li className="skill-pill reveal rd1" data-tags="ansible,puppet">
              <span className="skill-icon" aria-hidden="true">
                🤖
              </span>
              <span className="skill-name">Ansible / Config Mgmt</span>
              <div className="skill-bar-wrap"></div>
            </li>

            <li className="skill-pill reveal rd2" data-tags="git,github">
              <span className="skill-icon" aria-hidden="true">
                🌿
              </span>
              <span className="skill-name">Git & Version Control</span>
              <div className="skill-bar-wrap"></div>
            </li>
          </ul>
        </section>
      </div>

      <div className="section-divider"></div>

      <div className="page-wrap">
        <section
          className="projects-section"
          aria-labelledby="projects-heading"
        >
          <div className="sec-header reveal">
            <h2 className="sec-title" id="projects-heading">
              Projects
              <span className="sec-count" id="project-count">
                6 projects
              </span>
            </h2>
          </div>

          <div
            className="tag-filter-bar reveal rd1"
            role="group"
            aria-label="Filter projects by technology tag"
          >
            <span className="tag-filter-label">Filter by tag:</span>

            <button
              className="tag-chip active"
              data-tag="all"
              aria-pressed="true"
            >
              All
            </button>
            <a
              className="tag-chip"
              href="/projects/tag/kubernetes"
              data-tag="kubernetes"
              aria-pressed="false"
            >
              kubernetes <span className="chip-count">3</span>
            </a>
            <a
              className="tag-chip"
              href="/projects/tag/docker"
              data-tag="docker"
              aria-pressed="false"
            >
              docker <span className="chip-count">4</span>
            </a>
            <a
              className="tag-chip"
              href="/projects/tag/aws"
              data-tag="aws"
              aria-pressed="false"
            >
              aws <span className="chip-count">3</span>
            </a>
            <a
              className="tag-chip"
              href="/projects/tag/terraform"
              data-tag="terraform"
              aria-pressed="false"
            >
              terraform <span className="chip-count">2</span>
            </a>
            <a
              className="tag-chip"
              href="/projects/tag/github-actions"
              data-tag="github-actions"
              aria-pressed="false"
            >
              github-actions <span className="chip-count">3</span>
            </a>
            <a
              className="tag-chip"
              href="/projects/tag/prometheus"
              data-tag="prometheus"
              aria-pressed="false"
            >
              prometheus <span className="chip-count">2</span>
            </a>
            <a
              className="tag-chip"
              href="/projects/tag/linux"
              data-tag="linux"
              aria-pressed="false"
            >
              linux <span className="chip-count">2</span>
            </a>
            <a
              className="tag-chip"
              href="/projects/tag/ansible"
              data-tag="ansible"
              aria-pressed="false"
            >
              ansible <span className="chip-count">1</span>
            </a>

            <button
              className="tag-reset"
              id="tag-reset"
              aria-label="Clear filter"
            >
              ✕ Clear
            </button>
          </div>

          <div
            className="projects-grid"
            id="projects-grid"
            aria-live="polite"
            aria-label="Projects"
          >
            <div className="no-results" id="no-results" aria-live="assertive">
              <div className="no-results-icon">🔍</div>
              <p className="no-results-msg">No projects match that tag yet.</p>
              <p className="no-results-sub">
                New projects are added regularly — check back soon.
              </p>
            </div>

            <article
              id="project-1"
              className="project-card reveal rd1"
              data-tags="kubernetes docker linux aws"
              aria-label="Project: Kubernetes Homelab Cluster"
              tabIndex={0}
            >
              <img
                className="pc-img"
                src="https://picsum.photos/seed/k8shome/600/400"
                alt="Kubernetes Homelab Cluster project screenshot"
                loading="lazy"
              />
              <div className="pc-overlay"></div>

              <span className="pc-cat" aria-label="Category: DevOps">
                DevOps
              </span>

              <div className="pc-content">
                <div className="pc-rest">
                  <span className="pc-number" aria-hidden="true">
                    01
                  </span>
                  <div className="pc-arrow" aria-hidden="true">
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
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="pc-hover">
                <h3 className="pc-title">Kubernetes Homelab Cluster</h3>
                <p className="pc-desc">
                  A fully functional 3-node K8s cluster running on Raspberry Pi
                  5 hardware. Includes Helm chart deployments, Longhorn
                  persistent storage, MetalLB load balancing, and full
                  Prometheus/Grafana monitoring stack.
                </p>

                <div className="pc-tags" aria-label="Technologies used">
                  <a href="/projects/tag/kubernetes" className="pc-tag">
                    kubernetes
                  </a>
                  <a href="/projects/tag/docker" className="pc-tag">
                    docker
                  </a>
                  <a href="/projects/tag/linux" className="pc-tag">
                    linux
                  </a>
                  <a href="/projects/tag/aws" className="pc-tag">
                    aws
                  </a>
                </div>
                <div className="pc-actions">
                  <a
                    href="#"
                    className="pc-btn pc-btn-primary"
                    aria-label="View live demo of Kubernetes Homelab Cluster"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                  <a
                    href="#"
                    className="pc-btn pc-btn-ghost"
                    aria-label="View GitHub repo for Kubernetes Homelab Cluster"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </article>

            <article
              id="project-2"
              className="project-card reveal rd2"
              data-tags="github-actions docker aws cicd"
              aria-label="Project: GitOps CI/CD Pipeline"
              tabIndex={0}
            >
              <img
                className="pc-img"
                src="https://picsum.photos/seed/gitops2026/600/400"
                alt="GitOps CI/CD Pipeline"
                loading="lazy"
              />
              <div className="pc-overlay"></div>
              <span className="pc-cat">DevOps</span>
              <div className="pc-content">
                <div className="pc-rest">
                  <span className="pc-number" aria-hidden="true">
                    02
                  </span>
                  <div className="pc-arrow" aria-hidden="true">
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
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="pc-hover">
                <h3 className="pc-title">GitOps CI/CD Pipeline</h3>
                <p className="pc-desc">
                  Full GitOps workflow with GitHub Actions, automated testing,
                  Docker image builds pushed to ECR, and zero-downtime rolling
                  deployments to ECS Fargate.
                </p>
                <div className="pc-tags">
                  <a href="/projects/tag/github-actions" className="pc-tag">
                    github-actions
                  </a>
                  <a href="/projects/tag/docker" className="pc-tag">
                    docker
                  </a>
                  <a href="/projects/tag/aws" className="pc-tag">
                    aws
                  </a>
                  <a href="/projects/tag/cicd" className="pc-tag">
                    cicd
                  </a>
                </div>
                <div className="pc-actions">
                  <a href="#" className="pc-btn pc-btn-primary">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                  <a href="#" className="pc-btn pc-btn-ghost">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </article>

            <article
              id="project-3"
              className="project-card reveal rd3"
              data-tags="terraform aws iac"
              aria-label="Project: Terraform AWS Infrastructure"
              tabIndex={0}
            >
              <img
                className="pc-img"
                src="https://picsum.photos/seed/terraform2026/600/400"
                alt="Terraform AWS Infrastructure"
                loading="lazy"
              />
              <div className="pc-overlay"></div>
              <span className="pc-cat">DevOps</span>
              <div className="pc-content">
                <div className="pc-rest">
                  <span className="pc-number" aria-hidden="true">
                    03
                  </span>
                  <div className="pc-arrow" aria-hidden="true">
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
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="pc-hover">
                <h3 className="pc-title">Terraform AWS Infrastructure</h3>
                <p className="pc-desc">
                  Modular Terraform codebase provisioning VPCs, subnets, ECS
                  clusters, RDS, and Route 53 records. Includes remote state
                  management with S3 + DynamoDB locking.
                </p>
                <div className="pc-tags">
                  <a href="/projects/tag/terraform" className="pc-tag">
                    terraform
                  </a>
                  <a href="/projects/tag/aws" className="pc-tag">
                    aws
                  </a>
                  <a href="/projects/tag/iac" className="pc-tag">
                    iac
                  </a>
                </div>
                <div className="pc-actions">
                  <a href="#" className="pc-btn pc-btn-primary">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                  <a href="#" className="pc-btn pc-btn-ghost">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </article>

            <article
              id="project-4"
              className="project-card reveal rd4"
              data-tags="docker kubernetes github-actions"
              aria-label="Project: Docker Swarm Microservices"
              tabIndex={0}
            >
              <img
                className="pc-img"
                src="https://picsum.photos/seed/swarm2026/600/400"
                alt="Docker Swarm Microservices"
                loading="lazy"
              />
              <div className="pc-overlay"></div>
              <span className="pc-cat">DevOps</span>
              <div className="pc-content">
                <div className="pc-rest">
                  <span className="pc-number" aria-hidden="true">
                    04
                  </span>
                  <div className="pc-arrow" aria-hidden="true">
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
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="pc-hover">
                <h3 className="pc-title">Docker Swarm Microservices</h3>
                <p className="pc-desc">
                  Multi-service application deployed on Docker Swarm with
                  automated rolling updates, overlay networking, secrets
                  management, and per-service health checks.
                </p>
                <div className="pc-tags">
                  <a href="/projects/tag/docker" className="pc-tag">
                    docker
                  </a>
                  <a href="/projects/tag/kubernetes" className="pc-tag">
                    kubernetes
                  </a>
                  <a href="/projects/tag/github-actions" className="pc-tag">
                    github-actions
                  </a>
                </div>
                <div className="pc-actions">
                  <a href="#" className="pc-btn pc-btn-primary">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                  <a href="#" className="pc-btn pc-btn-ghost">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </article>

            <article
              id="project-5"
              className="project-card reveal rd5"
              data-tags="github-actions terraform linux"
              aria-label="Project: GitHub Actions Monorepo Pipeline"
              tabIndex={0}
            >
              <img
                className="pc-img"
                src="https://picsum.photos/seed/monorepo26/600/400"
                alt="GitHub Actions Monorepo"
                loading="lazy"
              />
              <div className="pc-overlay"></div>
              <span className="pc-cat">DevOps</span>
              <div className="pc-content">
                <div className="pc-rest">
                  <span className="pc-number" aria-hidden="true">
                    05
                  </span>
                  <div className="pc-arrow" aria-hidden="true">
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
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="pc-hover">
                <h3 className="pc-title">GitHub Actions Monorepo Pipeline</h3>
                <p className="pc-desc">
                  Path-filtered GitHub Actions workflows for a monorepo:
                  per-service builds, shared caches, matrix strategies, and
                  environment-gated deployments to staging + production.
                </p>
                <div className="pc-tags">
                  <a href="/projects/tag/github-actions" className="pc-tag">
                    github-actions
                  </a>
                  <a href="/projects/tag/terraform" className="pc-tag">
                    terraform
                  </a>
                  <a href="/projects/tag/linux" className="pc-tag">
                    linux
                  </a>
                </div>
                <div className="pc-actions">
                  <a href="#" className="pc-btn pc-btn-primary">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                  <a href="#" className="pc-btn pc-btn-ghost">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.836 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </article>

            <article
              id="project-6"
              className="project-card reveal rd6"
              data-tags="prometheus grafana docker ansible"
              aria-label="Project: Prometheus + Grafana Monitoring Stack"
              tabIndex={0}
            >
              <img
                className="pc-img"
                src="https://picsum.photos/seed/grafana2026/600/400"
                alt="Prometheus Grafana Monitoring"
                loading="lazy"
              />
              <div className="pc-overlay"></div>
              <span className="pc-cat">DevOps</span>
              <div className="pc-content">
                <div className="pc-rest">
                  <span className="pc-number" aria-hidden="true">
                    06
                  </span>
                  <div className="pc-arrow" aria-hidden="true">
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
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="pc-hover">
                <h3 className="pc-title">
                  Prometheus + Grafana Monitoring Stack
                </h3>
                <p className="pc-desc">
                  Full observability stack deployed via Docker Compose +
                  Ansible: Prometheus scraping 20+ exporters, custom Grafana
                  dashboards, Alertmanager routes, and PagerDuty integration.
                </p>
                <div className="pc-tags">
                  <a href="/projects/tag/prometheus" className="pc-tag">
                    prometheus
                  </a>
                  <a href="/projects/tag/grafana" className="pc-tag">
                    grafana
                  </a>
                  <a href="/projects/tag/docker" className="pc-tag">
                    docker
                  </a>
                  <a href="/projects/tag/ansible" className="pc-tag">
                    ansible
                  </a>
                </div>
                <div className="pc-actions">
                  <a href="#" className="pc-btn pc-btn-primary">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                  <a href="#" className="pc-btn pc-btn-ghost">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>

      <div className="section-divider"></div>
      <div className="page-wrap">
        <section className="tag-cloud-section" aria-labelledby="tags-heading">
          <div className="sec-header reveal">
            <h2 className="sec-title" id="tags-heading">
              Browse by Technology
            </h2>
          </div>

          <div
            className="tag-cloud-grid reveal rd1"
            role="list"
            aria-label="All technologies used in DevOps projects"
          >
            <a href="/projects/tag/docker" className="tc-tag" role="listitem">
              <span className="tc-name">Docker</span>{" "}
              <span className="tc-count">4</span>
            </a>
            <a
              href="/projects/tag/kubernetes"
              className="tc-tag"
              role="listitem"
            >
              <span className="tc-name">Kubernetes</span>{" "}
              <span className="tc-count">3</span>
            </a>
            <a href="/projects/tag/aws" className="tc-tag" role="listitem">
              <span className="tc-name">AWS</span>{" "}
              <span className="tc-count">3</span>
            </a>
            <a
              href="/projects/tag/github-actions"
              className="tc-tag"
              role="listitem"
            >
              <span className="tc-name">GitHub Actions</span>
              <span className="tc-count">3</span>
            </a>
            <a
              href="/projects/tag/terraform"
              className="tc-tag"
              role="listitem"
            >
              <span className="tc-name">Terraform</span>{" "}
              <span className="tc-count">2</span>
            </a>
            <a
              href="/projects/tag/prometheus"
              className="tc-tag"
              role="listitem"
            >
              <span className="tc-name">Prometheus</span>{" "}
              <span className="tc-count">2</span>
            </a>
            <a href="/projects/tag/linux" className="tc-tag" role="listitem">
              <span className="tc-name">Linux</span>{" "}
              <span className="tc-count">2</span>
            </a>
            <a href="/projects/tag/grafana" className="tc-tag" role="listitem">
              <span className="tc-name">Grafana</span>{" "}
              <span className="tc-count">1</span>
            </a>
            <a href="/projects/tag/ansible" className="tc-tag" role="listitem">
              <span className="tc-name">Ansible</span>{" "}
              <span className="tc-count">1</span>
            </a>
            <a href="/projects/tag/cicd" className="tc-tag" role="listitem">
              <span className="tc-name">CI/CD</span>{" "}
              <span className="tc-count">1</span>
            </a>
            <a href="/projects/tag/iac" className="tc-tag" role="listitem">
              <span className="tc-name">IaC</span>{" "}
              <span className="tc-count">1</span>
            </a>
          </div>
        </section>

        <div className="page-wrap">
          <section
            className="bottom-cta"
            aria-label="Explore more or get in touch"
          >
            <div className="cta-card reveal">
              <div className="cta-left">
                <h2 className="cta-heading">Want to work together?</h2>
                <p className="cta-sub">
                  Have a project that needs solid DevOps infrastructure,
                  <br />
                  automation pipelines, or cloud architecture?
                </p>
              </div>
              <div className="cta-buttons">
                <a href="/contact" className="btn-cta-primary">
                  <svg
                    width="15"
                    height="15"
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
                  Let's Talk
                </a>
                <a href="/projects" className="btn-cta-ghost">
                  ← All Projects
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
