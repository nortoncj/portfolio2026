import { Project } from "@/types/Post";

export const project: Project[] = [
  {
    id: "1",
    title: "Project",
    image: "",
    modal: false,
    category: "dashboards",
    description: "",
    longDesc: "",
    skills: ["Analytics"],
    icon: "",
    featured: true,
    timeline: {
      duration: "1 week",
      startDate: "09-01-24",
      endDate: "09-10-24",
    },
    tags: ["hello"],
    status: "completed",
    liveUrl: "#",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubUrl: "#",
    details: {
      overview: "",
      challenges: "",
      solutions: "",
      results: "",
      features: [""],
    },
  },
];

export const Devops: Project[] = [
  {
    id: "k3s-homelab",
    title: "Production-grade Homelab K3s Cluster",
    description:
      "4-node Raspberry Pi K3s cluster with Helm, ArgoCD GitOps, Traefik ingress, cert-manager TLS, and full Prometheus/Grafana observability stack.",
    longDesc:
      "Built a lightweight Kubernetes cluster on 4 Raspberry Pi 4 nodes running K3s. Configured Helm releases for all workloads, ArgoCD for GitOps-driven deployment from a mono-repo, Traefik as the ingress controller with Let's Encrypt TLS via cert-manager, Longhorn for distributed block storage, and a full Prometheus/Grafana/Alertmanager observability stack. Exposed safely via Cloudflare Tunnel — zero ports forwarded.",
    image: "https://picsum.photos/seed/k3s-homelab-devops/800/500",
    modal:true,
    tags: [
      "kubernetes",
      "k3s",
      "argocd",
      "helm",
      "traefik",
      "prometheus",
      "raspberry-pi",
    ],
    skills: ["kubernetes", "helm", "argocd", "prometheus", "nginx"],
    status: "completed",
    featured: true,
    githubUrl: "https://github.com",
    liveUrl: "https://yourportfolio.dev",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "terraform-aws-infra",
    title: "Terraform AWS Infrastructure as Code",
    description:
      "Modular Terraform mono-repo provisioning VPC, ECS Fargate services, RDS Aurora, S3, CloudFront CDN, and WAF — zero manual click-ops.",
    longDesc:
      "Authored a fully modular Terraform codebase that provisions a production-grade AWS environment: multi-AZ VPC with public/private subnets, ECS Fargate cluster with auto-scaling, RDS Aurora Serverless, S3 + CloudFront CDN with origin access control, AWS WAF, and IAM roles with least-privilege policies. Remote state stored in S3 with DynamoDB locking. Workspaces separate staging/production. GitHub Actions pipeline runs `terraform plan` on PRs and `apply` on merge.",
    image: "https://picsum.photos/seed/terraform-aws-devops/800/500",
    tags: [
      "terraform",
      "aws",
      "ecs",
      "rds",
      "cloudfront",
      "iac",
      "github-actions",
    ],
    skills: ["terraform", "aws", "github-actions"],
    status: "completed",
    featured: true,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "gitops-pipeline",
    title: "Full GitOps CI/CD Pipeline",
    description:
      "GitHub Actions → Docker build → ECR push → ArgoCD sync: a reusable pipeline template with semantic versioning, Trivy scanning, and Slack alerts.",
    longDesc:
      "Designed a reusable GitOps pipeline that runs on every merge to main: GitHub Actions builds and tests the Docker image, scans it with Trivy for CVEs, tags it with semantic version, pushes to Amazon ECR, commits the new image tag to the GitOps manifests repo, and ArgoCD auto-syncs to the cluster. Slack webhook posts success/failure with a direct diff link. The full cycle — commit to running pod — takes under 4 minutes.",
    image: "https://picsum.photos/seed/gitops-pipeline-devops/800/500",
    details: {
      overview: "",
      challenges: "",
      solutions: "",
      results: "",
      features: [""],
    },
    tags: [
      "github-actions",
      "argocd",
      "docker",
      "ecr",
      "trivy",
      "semantic-versioning",
      "slack",
    ],
    skills: ["github-actions", "argocd", "docker", "aws"],
    status: "completed",
    featured: true,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "monitoring-stack",
    title: "Observability Stack — Prometheus + Grafana + Loki",
    description:
      "Self-hosted monitoring platform collecting metrics from 12 hosts, 40+ services with custom alerting rules and a Grafana On-Call rotation.",
    longDesc:
      "Deployed a full observability stack on the homelab: Prometheus scrapes node-exporter, kube-state-metrics, cAdvisor, and custom app endpoints on a 15s interval. Loki + Promtail aggregate logs from all cluster pods. Grafana renders 8 custom dashboards covering cluster health, per-app RED metrics, and hardware temps. Alertmanager routes critical alerts to PagerDuty and non-critical to a Telegram bot. Retained 90-day metric history via Thanos S3 offload.",
    image: "https://picsum.photos/seed/monitoring-devops/800/500",
    tags: [
      "prometheus",
      "grafana",
      "loki",
      "alertmanager",
      "thanos",
      "monitoring",
      "observability",
    ],
    skills: ["prometheus", "kubernetes", "linux"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "ansible-server-bootstrap",
    title: "Ansible Server Bootstrap Playbooks",
    description:
      "Idempotent playbook collection that provisions a bare Debian/Ubuntu host to a hardened, Docker-ready state in under 8 minutes.",
    longDesc:
      "A collection of Ansible roles that configure a fresh Debian/Ubuntu server: SSH key-only auth, UFW firewall with minimal rule set, fail2ban, unattended-upgrades, Docker CE + Compose plugin, Caddy or Nginx reverse proxy, and a non-root deploy user with sudo policy. Vault-encrypted secrets. Molecule tests verify idempotency in Docker containers. Used to bootstrap 15+ VPS instances across DigitalOcean and Hetzner.",
    image: "https://picsum.photos/seed/ansible-devops/800/500",
    tags: [
      "ansible",
      "linux",
      "debian",
      "docker",
      "hardening",
      "bash",
      "vault",
    ],
    skills: ["ansible", "linux", "docker"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "self-hosted-platform",
    title: "Self-hosted PaaS on K3s",
    description:
      "Coolify-inspired self-hosted platform running 20+ services — Git push deploys, SSL, backups, and a custom admin UI — on commodity hardware.",
    longDesc:
      "Replaced Heroku-style managed hosting with a self-hosted PaaS layer on top of K3s. A webhook listener triggers Kaniko in-cluster image builds on git push. Traefik issues Let's Encrypt certs automatically. Velero handles daily backups to Backblaze B2. A small Next.js admin UI lists running services, shows logs via a WebSocket proxy, and offers one-click restart/rollback. Hosting 20+ personal and client projects at a fraction of SaaS cost.",
    image: "https://picsum.photos/seed/selfhosted-devops/800/500",
    tags: [
      "kubernetes",
      "coolify",
      "kaniko",
      "traefik",
      "velero",
      "gitops",
      "self-hosted",
    ],
    skills: ["kubernetes", "helm", "argocd", "nginx", "linux"],
    status: "in-progress",
    featured: true,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "azure-aks-setup",
    title: "Azure AKS Production Cluster",
    description:
      "Terraform-provisioned AKS cluster with Azure AD workload identity, Defender for Containers, and Azure Monitor integrated Prometheus.",
    longDesc:
      "Provisioned an Azure Kubernetes Service cluster via Terraform: node pools with auto-scaling (2–10 nodes), Azure AD workload identity for pod-level RBAC to Key Vault and Blob storage, Microsoft Defender for Containers with CVE alerting, Azure CNI Overlay networking, and an Azure Monitor-managed Prometheus workspace. Azure DevOps pipeline deploys Helm releases on every tag. Integrated with Entra ID for SSO to Grafana.",
    image: "https://picsum.photos/seed/aks-devops/800/500",
    tags: [
      "azure",
      "aks",
      "terraform",
      "azure-devops",
      "workload-identity",
      "defender",
    ],
    skills: ["azure", "terraform", "kubernetes", "prometheus"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "nginx-reverse-proxy",
    title: "Nginx / Traefik Reverse Proxy Config Library",
    description:
      "Battle-tested config library for Nginx and Traefik — SSL termination, rate limiting, CORS headers, WebSocket proxying, and upstream health checks.",
    longDesc:
      "An open-source repository of production-tested Nginx and Traefik configurations covering: TLS 1.3 hardening with HSTS, Brotli + gzip compression, rate limiting by IP and route, CORS preflight handling, WebSocket upgrade proxying, upstream health-check intervals, custom error pages, and Docker/K8s label-driven Traefik dynamic routing. Every config is tested against Mozilla SSL Lab's A+ benchmark. Includes a GitHub Actions workflow that lints configs with nginx -t on every PR.",
    image: "https://picsum.photos/seed/nginx-devops/800/500",
    tags: [
      "nginx",
      "traefik",
      "ssl",
      "reverse-proxy",
      "docker",
      "linux",
      "security",
    ],
    skills: ["nginx", "linux", "docker", "github-actions"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
];
export const Web: Project[] = [
  {
    id: "portfolio-site",
    title: "Personal Portfolio & Blog",
    description:
      "Next.js 14 App Router site with MDX blog, dark/light themes, Framer Motion animations, and Lighthouse 100 scores.",
    longDesc:
      "Built a performant personal brand site using Next.js 14 App Router with MDX-powered blog posts, ISR revalidation, and a custom design system. Achieves Lighthouse 100 across all categories. Features include category-filtered project pages, animated hero with GSAP, glassmorphism cards, structured schema.org data, and an email newsletter powered by Resend.",
    image: "https://picsum.photos/seed/portfolio-web/800/500",
    tags: ["next.js", "typescript", "tailwind", "mdx", "framer-motion", "seo"],
    skills: ["react", "typescript", "tailwind", "animations", "seo"],
    status: "completed",
    featured: true,
    modal:true,
    liveUrl: "https://yourportfolio.dev",
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "saas-dashboard",
    title: "SaaS Analytics Dashboard",
    description:
      "Real-time metrics dashboard with Supabase Realtime, Recharts, role-based auth, and Stripe billing integration.",
    longDesc:
      "Full-stack SaaS application with a Next.js 14 frontend, Supabase backend, and Stripe Checkout. Features real-time chart updates via Supabase Realtime WebSockets, row-level security policies, multi-tenant workspace isolation, CSV export, and email alerts on threshold breaches. CI/CD via GitHub Actions deploys to Vercel on every merge to main.",
    image: "https://picsum.photos/seed/saas-dashboard-web/800/500",
    tags: ["next.js", "supabase", "recharts", "stripe", "typescript", "rls"],
    skills: ["react", "postgres", "typescript", "cicd", "docker"],
    status: "completed",
    featured: true,
    liveUrl: "https://demo.yourportfolio.dev",
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "ecommerce-platform",
    title: "Headless E-commerce Store",
    description:
      "Shopify Storefront API + Next.js storefront with cart context, optimistic UI, and edge-cached product pages.",
    longDesc:
      "Custom headless storefront powered by Shopify's Storefront API and Next.js. Product, collection, and checkout pages are fully SSR/ISR. Cart state is managed via React Context with optimistic updates and edge-cached using Vercel Edge Config. Integrates Klaviyo for abandoned-cart flows and a custom loyalty points widget.",
    image: "https://picsum.photos/seed/ecommerce-web/800/500",
    tags: [
      "next.js",
      "shopify",
      "graphql",
      "typescript",
      "edge-functions",
      "klaviyo",
    ],
    skills: ["react", "graphql", "typescript", "tailwind"],
    status: "completed",
    featured: true,
    githubUrl: "https://github.com",
    liveUrl: "https://yourportfolio.dev",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "email-automation",
    title: "Email Automation Platform",
    description:
      "Node.js + Resend platform for drag-and-drop transactional email sequences with A/B testing and analytics.",
    longDesc:
      "A lightweight email automation tool built on Node.js, Resend (sending), and a React-based drag-and-drop sequence builder. Supports conditional branching, A/B test splits, open/click webhooks, and a Recharts analytics panel. PostgreSQL stores subscribers and event logs; Docker Compose orchestrates local dev; GitHub Actions deploys to a DigitalOcean Droplet.",
    image: "https://picsum.photos/seed/email-platform-web/800/500",
    tags: ["node.js", "resend", "react", "postgresql", "docker", "email"],
    skills: ["nodejs", "react", "postgres", "docker", "cicd"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "devops-dashboard",
    title: "Homelab Monitoring Dashboard",
    description:
      "React + FastAPI dashboard surfacing Prometheus metrics from a 4-node K3s cluster with dark glassmorphism UI.",
    longDesc:
      "Custom monitoring UI that reads Prometheus metrics via a FastAPI proxy and displays server health, pod counts, CPU/memory trends, and alert state. Built with React, Recharts, and a dark glassmorphism design system. Authentication via JWT; WebSocket pushes live metric snapshots every 5 s. Deployed as a Docker container on the same K3s cluster it monitors.",
    image: "https://picsum.photos/seed/devops-dash-web/800/500",
    tags: ["react", "fastapi", "python", "prometheus", "docker", "websockets"],
    skills: ["react", "python", "docker", "typescript", "animations"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "marketing-site",
    title: "Digital Marketing Agency Site",
    description:
      "Conversion-optimised agency site with GSAP scroll animations, CMS-driven case studies, and 98 Lighthouse score.",
    longDesc:
      "Designed and developed a multi-page marketing site for a digital agency. Pages use GSAP ScrollTrigger for section reveals and parallax effects. Content is managed via Sanity CMS with live previews. Open Graph tags, JSON-LD, and Core Web Vitals tuning pushed Lighthouse to 98/100. Lead capture form integrates with HubSpot via API.",
    image: "https://picsum.photos/seed/agency-web/800/500",
    tags: ["next.js", "gsap", "sanity-cms", "seo", "hubspot", "typescript"],
    skills: ["react", "animations", "seo", "typescript", "tailwind"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com",
    liveUrl: "https://yourportfolio.dev",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "ai-content-tool",
    title: "AI Content Generation Tool",
    description:
      "Next.js SaaS wrapping OpenAI GPT-4o with streaming responses, prompt templates, and Stripe subscription billing.",
    longDesc:
      "A niche SaaS product that lets marketers generate SEO-optimised blog drafts using GPT-4o. The Next.js frontend streams tokens via OpenAI's Edge runtime; a template library stores reusable prompts in Supabase. Stripe handles subscription tiers (Starter / Pro / Agency). Includes a custom WYSIWYG editor built on TipTap and one-click WordPress XML export.",
    image: "https://picsum.photos/seed/ai-content-web/800/500",
    tags: ["next.js", "openai", "supabase", "stripe", "tiptap", "typescript"],
    skills: ["react", "typescript", "postgres", "nodejs"],
    status: "in-progress",
    featured: true,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "component-library",
    title: "Open-Source Component Library",
    description:
      "Accessible, animated React component library (Storybook + Radix UI primitives) published to npm.",
    longDesc:
      "Curated a collection of 30+ production-ready React components built on Radix UI primitives with full ARIA compliance. Animated variants powered by Framer Motion; dark/light themes via CSS custom properties. Storybook documents every prop, slot, and interaction. Published to npm; tested with Vitest + Testing Library; typed with TypeScript strict mode.",
    image: "https://picsum.photos/seed/component-lib-web/800/500",
    tags: ["react", "radix-ui", "storybook", "typescript", "npm", "a11y"],
    skills: ["react", "typescript", "animations", "figma"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com",
    liveUrl: "https://yourportfolio.dev",
    timeline: {
      endDate: "2025",
    },
  },
];
export const Marketing: Project[] = [
  {
    id: "email-template-library",
    title: "HTML Email Template Library",
    description:
      "30+ production-ready responsive email templates built in MJML — dark-mode aware, accessible, tested across 40+ clients including Gmail, Outlook, and Apple Mail.",
    longDesc:
      "Hand-coded a library of 30+ modular HTML email templates using MJML for reliable cross-client rendering. Every template supports dark mode via media queries and prefers-color-scheme, passes WCAG 2.1 AA colour contrast, and is tested across 40+ clients in Litmus. Modules include hero sections, product grids, countdown timers, dynamic coupon blocks, and multi-column layouts. Exported as Klaviyo-ready HTML, Mailchimp drag-and-drop, and raw MJML source.",
    image: "https://picsum.photos/seed/email-templates-mktg/800/500",
    tags: [
      "html-email",
      "mjml",
      "klaviyo",
      "dark-mode",
      "accessibility",
      "responsive",
    ],
    skills: ["html-email", "klaviyo", "copywriting"],
    status: "completed",
    featured: true,
    liveUrl: "https://yourportfolio.dev",
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "n8n-lead-pipeline",
    title: "N8N Lead Generation & Nurture Pipeline",
    description:
      "End-to-end lead capture → CRM enrich → email sequence automation built in N8N, processing 500+ leads/day with zero manual touch.",
    longDesc:
      "Built a fully automated lead pipeline in self-hosted N8N: form submissions hit a webhook, a GPT-4o node qualifies and scores the lead, Hunter.io enriches the contact, the record is pushed to HubSpot with tags, a personalised 5-email welcome sequence triggers via Klaviyo, and a Slack notification fires for high-score leads. Handles 500+ leads per day. Includes retry logic, error routing to a Telegram alert channel, and a Looker Studio dashboard tracking conversion at every stage.",
    image: "https://picsum.photos/seed/n8n-pipeline-mktg/800/500",
    tags: [
      "n8n",
      "hubspot",
      "klaviyo",
      "openai",
      "webhooks",
      "automation",
      "lead-gen",
    ],
    skills: ["n8n", "ai-workflows", "hubspot", "klaviyo", "looker"],
    status: "completed",
    featured: true,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "ai-content-pipeline",
    title: "AI Content Generation Pipeline",
    description:
      "N8N + OpenAI pipeline that drafts SEO blog posts from a keyword list, runs a readability pass, inserts internal links, and publishes to WordPress — fully hands-off.",
    longDesc:
      "Designed an AI content workflow in N8N triggered by a Google Sheets keyword list: GPT-4o generates a structured outline, a second pass writes the full post with keyword density controls, a Hemingway-style readability agent rewrites complex sentences, an internal link injector queries existing posts via the WordPress REST API and inserts contextual anchors, and the final post is scheduled via WP-JSON. Achieves a consistent Yoast SEO score of 85+ without human editing. Reduced content production cost by 70%.",
    image: "https://picsum.photos/seed/ai-content-mktg/800/500",
    tags: [
      "n8n",
      "openai",
      "wordpress",
      "seo",
      "ai-workflows",
      "content",
      "automation",
    ],
    skills: ["n8n", "ai-workflows", "technical-seo", "copywriting"],
    status: "completed",
    featured: true,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "ga4-looker-dashboard",
    title: "GA4 + Looker Studio Marketing Dashboard",
    description:
      "Executive-ready marketing dashboard blending GA4, Search Console, and ad platform data into a single Looker Studio report with automated weekly email delivery.",
    longDesc:
      "Built a multi-source Looker Studio dashboard that blends GA4 event data, Google Search Console impressions/clicks, Google Ads performance, and Klaviyo email metrics. Custom calculated fields surface ROAS, email-attributed revenue, top organic landing pages, and conversion funnel drop-off. Scheduled weekly PDF snapshots email to stakeholders automatically via the Looker Studio scheduling API. Reduced reporting time from 3 hours/week to fully automated.",
    image: "https://picsum.photos/seed/looker-dashboard-mktg/800/500",
    tags: [
      "ga4",
      "looker-studio",
      "google-ads",
      "search-console",
      "reporting",
      "analytics",
    ],
    skills: ["ga4", "looker", "ahrefs"],
    status: "completed",
    featured: false,
    liveUrl: "https://yourportfolio.dev",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "abandoned-cart-automation",
    title: "Abandoned Cart Recovery Automation",
    description:
      "Zapier + Klaviyo flow recovering abandoned Shopify carts with a 3-email sequence personalised by product category, cart value, and prior purchase history.",
    longDesc:
      "Configured a Zapier trigger on Shopify abandoned_checkout events that pushes customer + cart data to Klaviyo and fires a three-email sequence: 1hr reminder with product images, 24hr social-proof email with reviews, 72hr discount code for first-time buyers only (suppressed for repeat purchasers). Personalisation tokens pull product category, cart value tier, and prior order count from Klaviyo profiles. Achieved a 22% cart recovery rate — double the industry average. All emails pass Litmus spam testing and render correctly in dark mode.",
    image: "https://picsum.photos/seed/abandoned-cart-mktg/800/500",
    tags: [
      "zapier",
      "klaviyo",
      "shopify",
      "email",
      "automation",
      "ecommerce",
      "personalization",
    ],
    skills: ["zapier", "klaviyo", "html-email", "copywriting"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "seo-audit-system",
    title: "Automated Technical SEO Audit System",
    description:
      "Python + N8N pipeline that crawls a site weekly, scores 40 technical SEO factors, and delivers a prioritised Notion report with fix instructions.",
    longDesc:
      "Built a weekly SEO health system using Screaming Frog CLI triggered by an N8N cron, combined with Google Search Console API and PageSpeed Insights API data. A Python script scores 40 factors (Core Web Vitals, canonical errors, missing meta, broken internal links, structured data validity, hreflang mismatches). Results are pushed to a Notion database with priority scores and templated fix instructions. A Slack summary posts the top 5 issues every Monday morning. Reduced time-to-fix critical SEO errors from weeks to days.",
    image: "https://picsum.photos/seed/seo-audit-mktg/800/500",
    tags: [
      "n8n",
      "python",
      "seo",
      "search-console",
      "core-web-vitals",
      "notion",
      "automation",
    ],
    skills: ["n8n", "technical-seo", "ahrefs", "ai-workflows"],
    status: "completed",
    featured: true,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "drip-campaign-system",
    title: "Multi-Channel Drip Campaign System",
    description:
      "HubSpot + Klaviyo + SMS drip system segmenting leads across 6 lifecycle stages, with conditional branching based on engagement scores and product interest.",
    longDesc:
      "Architected a 6-stage lifecycle email + SMS system across HubSpot and Klaviyo: Awareness (3 emails), Consideration (5 emails + retargeting audience sync to Meta), Decision (3 emails with case studies), Onboarding (7-email sequence with conditional logic by product tier), Retention (monthly digest + NPS survey), and Win-back (dormant re-engagement with progressive discounts). Conditional branches fire based on HubSpot lead score, email engagement rate, and product interest tags. Total sequence: 22 touchpoints, 0 manual sends.",
    image: "https://picsum.photos/seed/drip-campaign-mktg/800/500",
    tags: [
      "hubspot",
      "klaviyo",
      "email",
      "sms",
      "drip",
      "segmentation",
      "lifecycle",
    ],
    skills: ["hubspot", "klaviyo", "copywriting", "html-email"],
    status: "completed",
    featured: false,
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "zapier-social-automation",
    title: "AI Social Media Content Automation",
    description:
      "Make.com + OpenAI pipeline that repurposes blog posts into platform-native social content for LinkedIn, X, and Instagram — scheduled and posted automatically.",
    longDesc:
      "Built a Make.com scenario that monitors an RSS feed for new blog posts, sends the content to GPT-4o with platform-specific system prompts (LinkedIn thought-leadership, X thread format, Instagram caption + hashtags), generates a matching hero image via DALL-E 3, schedules posts via Buffer API, and logs every piece of content to an Airtable content calendar. Produces 12–18 social posts per blog article. Reduced social content production time by 85% while maintaining a consistent brand voice defined in system prompt guidelines.",
    image: "https://picsum.photos/seed/social-automation-mktg/800/500",
    tags: [
      "make.com",
      "openai",
      "social-media",
      "automation",
      "buffer",
      "airtable",
      "ai-workflows",
    ],
    skills: ["zapier", "ai-workflows", "copywriting", "n8n"],
    status: "in-progress",
    featured: true,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
];

export const Hardware: Project[] = [
  {
    id: "smart-irrigation",
    title: "Smart Irrigation Controller",
    description:
      "ESP32-based system with soil moisture sensors, weather API integration, and MQTT-driven automation.",
    longDesc:
      "Built a fully autonomous garden irrigation system using an ESP32 microcontroller with capacitive soil moisture sensors. Integrates real-time weather data to skip watering on rainy days and uses MQTT to push telemetry to an AWS IoT Core dashboard. Firmware written in C++ with FreeRTOS task scheduling for sensor polling, network sync, and valve actuation.",
    image: "https://picsum.photos/seed/irrigation-hw/800/500",
    tags: ["esp32", "freertos", "mqtt", "aws-iot", "c++", "sensors"],
    skills: ["esp32", "rtos", "mqtt", "awsiot", "cpp"],
    status: "completed",
    featured: true,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "embedded-motor-ctrl",
    title: "Brushless Motor Controller",
    description:
      "Custom STM32-based BLDC motor controller with FOC algorithm and real-time telemetry over UART.",
    longDesc:
      "Designed and implemented a field-oriented control (FOC) algorithm on an STM32F4 for a brushless DC motor. Custom PCB designed in KiCad featuring gate driver ICs, current sensing shunts, and isolated UART for PC-side telemetry logging. Achieved sub-millisecond loop times using DMA-based ADC sampling.",
    image: "https://picsum.photos/seed/motorctrl-hw/800/500",
    tags: ["stm32", "bldc", "foc", "kicad", "pcb", "c++", "uart"],
    skills: ["stm32", "pcb", "i2c", "cpp", "kicad"],
    status: "completed",
    featured: true,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "homelab-cluster",
    title: "Raspberry Pi Kubernetes Cluster",
    description:
      "4-node ARM cluster running K3s, Prometheus, and Grafana — full homelab CI/CD testbed.",
    longDesc:
      "Built a 4-node Raspberry Pi 4 cluster running K3s (lightweight Kubernetes). Custom 3D-printed rack, PoE HATs for clean power, and a managed switch for inter-node networking. Hosts a self-contained CI/CD environment with Gitea, Drone CI, Prometheus, and Grafana dashboards for cluster metrics.",
    image: "https://picsum.photos/seed/rpicluster-hw/800/500",
    tags: [
      "raspberry-pi",
      "kubernetes",
      "k3s",
      "linux",
      "devops",
      "networking",
    ],
    skills: ["rpi", "python", "mqtt"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com",
    liveUrl: "https://yourportfolio.dev",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "iot-weather",
    title: "IoT Environmental Monitor",
    description:
      "Multi-sensor ESP32 node network posting temperature, humidity, CO₂ and AQI data to InfluxDB.",
    longDesc:
      "Deployed a mesh of 6 ESP32 nodes around a building collecting temperature, humidity, CO₂ (SCD40), and particulate matter (PMS5003) data. Nodes communicate over MQTT, data is ingested by an InfluxDB instance on a Raspberry Pi, and visualised in Grafana. PCBs designed in KiCad with LiPo charging circuits for portability.",
    image: "https://picsum.photos/seed/envmonitor-hw/800/500",
    tags: ["esp32", "sensors", "mqtt", "influxdb", "grafana", "pcb"],
    skills: ["esp32", "mqtt", "pcb", "i2c", "cpp"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "keyboard-firmware",
    title: "Custom Keyboard Firmware (QMK)",
    description:
      "Hand-wired 65% keyboard with custom QMK firmware, RGB per-key lighting, and macro layers.",
    longDesc:
      "Hand-wired a 65% mechanical keyboard on a custom PCB using Pro Micro controllers. Wrote and extended QMK firmware in C for tap-dance keys, leader sequences, RGB Matrix animations, and OLED secondary display support. Designed the PCB in KiCad and had it fabricated at JLCPCB.",
    image: "https://picsum.photos/seed/keyboard-hw/800/500",
    tags: ["qmk", "avr", "arduino", "c", "pcb", "kicad", "rgb"],
    skills: ["arduino", "cpp", "pcb", "kicad"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "rtos-drone-fc",
    title: "FreeRTOS Drone Flight Controller",
    description:
      "STM32-based flight controller with IMU fusion, PID attitude control, and RC receiver decoding.",
    longDesc:
      "Developed a bare-metal drone flight controller on an STM32F7 running FreeRTOS. IMU data (MPU-6050) is fused using a complementary filter at 1kHz. PID attitude loops run in high-priority tasks. RC PWM input is decoded via TIM input capture, and ESC signals are output via DMA-driven TIM PWM channels.",
    image: "https://picsum.photos/seed/dronefc-hw/800/500",
    tags: ["stm32", "freertos", "imu", "pid", "pwm", "c++", "drone"],
    skills: ["stm32", "rtos", "cpp", "i2c"],
    status: "in-progress",
    featured: true,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "embedded-linux-gateway",
    title: "Industrial IoT Gateway",
    description:
      "Embedded Linux gateway on Yocto-built image bridging Modbus RTU devices to AWS IoT Core.",
    longDesc:
      "Designed an industrial IoT gateway running a minimal Yocto Linux image on a custom SOM. The gateway reads Modbus RTU data from factory sensors via RS-485, translates to MQTT JSON payloads, and forwards to AWS IoT Core with X.509 certificate-based authentication. Manages OTA firmware updates via a custom update agent.",
    image: "https://picsum.photos/seed/iotgateway-hw/800/500",
    tags: ["embedded-linux", "yocto", "modbus", "mqtt", "aws-iot", "rs485"],
    skills: ["awsiot", "mqtt", "cpp", "python", "i2c"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
  {
    id: "homelab-sensors",
    title: "Homelab Infrastructure Monitor",
    description:
      "Arduino-based rack monitor with temp sensors, relay-controlled fans, and web dashboard.",
    longDesc:
      "Built a rack-mounted Arduino Mega system that monitors ambient temperature in a server cabinet using DS18B20 sensors on a 1-Wire bus. Relay module controls cabinet fans based on configurable thresholds. An ESP32 bridge publishes metrics to an MQTT broker consumed by a Node-RED dashboard with alert notifications via Telegram.",
    image: "https://picsum.photos/seed/hlabimon-hw/800/500",
    tags: ["arduino", "1-wire", "relay", "mqtt", "node-red", "telegram"],
    skills: ["arduino", "esp32", "mqtt", "i2c", "cpp"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com",
    timeline: {
      endDate: "2025",
    },
  },
];
