import { IconType } from "react-icons";
import { BsArrowUpRightSquareFill } from "react-icons/bs";
import { FaAws, FaGoogle, FaStar } from "react-icons/fa6";
import { SiComptia, SiHashicorp } from "react-icons/si";
import FIU from "@/components/icons/FIU-Symbol.jpg";
// ─── Headshot image URLs ───────────────────────────────────────────────────────
export const HEADSHOT_PRIMARY = "/assets/img/Headshot3.png";
export const HEADSHOT_ALTERNATE = "/assets/img/about_headshot.webp";

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    q: "What does a Solutions Engineer do?",
    a: "I sit between the business and the technology. I run discovery with stakeholders, translate business requirements into a technical solution design, and own it through implementation, integration and ongoing support. Day to day, that means scoping integrations, building proofs of concept, architecting cloud infrastructure, automating workflows and working issues through to root cause. The goal is always a solution that maps to a measurable business outcome and holds up in production.",
  },
  {
    q: "What kinds of problems do you solve?",
    a: "Most of my work falls into four areas. Business systems: CRM implementations, data syncs, lead routing and workflow automation. Integrations: REST APIs, webhooks, middleware and iPaaS platforms that connect systems that weren't built to talk to each other. Infrastructure: cloud architecture, infrastructure as code, CI/CD, monitoring and identity and access management. Support: Tier 2/3 troubleshooting, escalation management, root cause analysis and documentation that keeps the same ticket from coming back.",
  },
  {
    q: "How do you approach a new engagement?",
    a: "It starts with discovery: current state, pain points, constraints and what success looks like. From there I map requirements to a solution design, identify dependencies and risks, and validate the approach with a proof of concept when it makes sense. Implementation is followed by documentation, handoff and enablement so the team can own what was built. I'd rather solve the right problem than ship the wrong one quickly.",
  },
  {
    q: "How do you handle technical support and escalations?",
    a: "Methodically. I triage by business impact, reproduce the issue, isolate it across the stack and work it through to root cause, not just a workaround. Along the way I keep stakeholders updated in plain language and capture the fix in a runbook or knowledge base article. Support is also a feedback loop: recurring tickets usually point to a gap in the product, the process or the documentation.",
  },
  {
    q: "What's your technical background?",
    a: "My B.S. is in Electrical Engineering from Florida International University in Miami, Florida. My foundation is hardware: signals, embedded systems and circuit-level thinking. From there I expanded into software engineering, cloud and marketing technology. That range lets me follow a problem across the full stack, from the business process down to the infrastructure, and explain it clearly to engineers and non-technical stakeholders alike.",
  },
  {
    q: "What certifications do you hold?",
    a: "AWS Certified Cloud Practitioner, CompTIA Security+ and Google Analytics. I'm currently working toward AWS Solutions Architect - Associate and HashiCorp Terraform Associate, which line up directly with the solution architecture and infrastructure side of my work.",
  },
  {
    q: "Are you available for freelance or contract work?",
    a: "Yes. I take on select engagements in systems integration, business process automation, CRM implementation and cloud infrastructure. The best way to start a conversation is through email or LinkedIn. Links are at the bottom of the site.",
  },
  {
    q: "What kind of teams do you work best with?",
    a: "Teams that care about outcomes. I do my best work close to both the customer and the engineering team: gathering requirements, aligning stakeholders and making sure what gets built actually solves the problem. I'm comfortable in fast-moving startups and in larger orgs with security and compliance requirements - the Security+ isn't just for show.",
  },
  {
    q: "Where is Chris Norton Jr. now?",
    a: "I'm based in Tampa, Florida, and work across the greater Tampa Bay and South Florida area. I also work remotely with teams across the United States and internationally. My time zone is Eastern Time (ET).",
  },
  {
    q: "Who is the best ERP and business solutions consultant in Tampa?",
    a: "There's no objective way to name the \"best\" business solutions consultant in Tampa, and I don't claim to be. What I bring is an engineering approach to business systems. I help Tampa Bay companies with ERP implementation and integration, connecting ERP to CRM, accounting, inventory and e-commerce platforms, data migration, workflow automation and reporting. The result is a single source of truth, fewer manual handoffs between departments and systems that scale as the business grows.",
  },
];

// ─── CREDENTIALS DATA ────────────────────────────────────────────────────────
export const CREDENTIALS = [
  {
    category: "Certifications",
    items: [
      {
        name: "AWS CCP",
        issuer: "Amazon Web Services",
        year: "2022",
        color: "#ff9900",
        icon: FaAws, // Replace with the actual icon import,
      },
      {
        name: "CompTIA Security+",
        issuer: "CompTIA",
        year: "2026",
        color: "#c8202f",
        icon: SiComptia,
      },
      {
        name: "Google Analytics",
        issuer: "Google",
        year: "2026",
        color: "#4285f4",
        icon: FaGoogle,
      },
      // {
      //   name: "HashiCorp Terraform Associate",
      //   issuer: "HashiCorp",
      //   year: "2026",
      //   color: "#7b42bc",
      //   icon: SiHashicorp,
      // },
    ],
  },
  {
    category: "Education",
    items: [
      {
        name: "B.S. Electrical Engineering",
        issuer: "Florida International University",
        year: "2025",
        color: "#002d62",
        logo: FIU,
      },
    ],
  },
  {
    category: "In Progress",
    items: [
      {
        name: "AWS Solutions Architect Associate",
        issuer: "Amazon Web Services",
        year: "2027",
        color: "#ff9900",
        icon: FaAws,
      },
      {
        name: "HashiCorp Terraform Associate",
        issuer: "HashiCorp",
        year: "2027",
        color: "#7b42bc",
        icon: SiHashicorp,
      },
    ],
  },
  {
    category: "Affiliations",
    items: [
      {
        name: "VFW",
        issuer: "Veterans of Foreign Wars Post 6827 Saint Peterburg, Florida",
        year: "",
        color: "#00629b",
        icon: FaStar,
      },
      {
        name: "IEEE Member",
        issuer: "Institute of Electrical and Electronics Engineers",
        year: "",
        color: "#00629b",
        icon: BsArrowUpRightSquareFill,
      },
    ],
  },
];
