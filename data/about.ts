import { IconType } from "react-icons";
import { BsArrowUpRightSquareFill } from "react-icons/bs";
import { FaAws, FaStar } from "react-icons/fa6";
import { SiComptia, SiHashicorp } from "react-icons/si";
import FIU from "@/components/icons/FIU-Symbol.jpg";
// ─── Headshot image URLs ───────────────────────────────────────────────────────
export const HEADSHOT_PRIMARY = "/assets/img/Headshot3.png";
export const HEADSHOT_ALTERNATE = "/assets/img/about_headshot.webp";

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    q: "What do you actually do?",
    a: "I build systems end-to-end - cloud infrastructure, firmware pipelines, DevSecOps toolchains, and the automation that holds all of it together. I specialize in the space where hardware meets software and where manual processes become pipelines.",
  },
  {
    q: "What's your engineering background?",
    a: "My B.S. is in Electrical Engineering from Florida International University in Miami, Florida. My foundation is hardware: signals, embedded systems, circuit-level thinking. While in school, I expanded upon my hardware engineering skills into software engineering, cloud and martech. That background is what makes my software work different: I understand what's actually running on the other end of the wire.",
  },
  {
    q: "What certifications do you hold?",
    a: "AWS Certified Cloud Practitioner and CompTIA Security+. Currently studying for AWS Solutions Architect Associate, with Terraform Associate and CKA on the roadmap.",
  },
  {
    q: "Are you available for freelance or contract work?",
    a: "Yes. I take on select projects in DevOps infrastructure, embedded systems, marketing, and cloud architecture. The best way to start a conversation is through email or LinkedIn. Links at the bottom of the site.",
  },
  {
    q: "What kind of teams do you work best with?",
    a: "Teams that build real things. I do my best work in environments where ownership is clear, quality is expected, and engineers are trusted to make decisions. I'm comfortable in small startups moving fast and in larger orgs with compliance requirements - the Security+ isn't just for show.",
  },
  {
    q: "Where is Chris Norton Jr. now?",
    a: "I'm currently based in Tampa,Florida and the greater Tampa Bay/South Florida area, in the United States. I work remotely with teams across the country and internationally. My timezone is Eastern Standard Time (EST).",
  },
];

// ─── CREDENTIALS DATA ────────────────────────────────────────────────────────
export const CREDENTIALS = [
  {
    category: "Certifications",
    items: [
      {
        name: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        year: "2022",
        color: "#ff9900",
        icon: FaAws, // Replace with the actual icon import,
      },
      {
        name: "CompTIA Security+",
        issuer: "CompTIA",
        year: "2024",
        color: "#c8202f",
        icon: SiComptia,
      },
    ],
  },
  {
    category: "Education",
    items: [
      {
        name: "B.S. Electrical Engineering",
        issuer: "Florida International University",
        year: "2023",
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
        year: "2026",
        color: "#ff9900",
        icon: FaAws,
      },
      {
        name: "HashiCorp Terraform Associate",
        issuer: "HashiCorp",
        year: "2026",
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
