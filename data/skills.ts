import { Cert, Degree, Skill } from "@/types/Skill";
import {
  FaAws,
  FaBolt,
  FaBrain,
  FaBroadcastTower,
  FaCertificate,
  FaChartBar,
  FaChartLine,
  FaCode,
  FaCodeBranch,
  FaCog,
  FaCogs,
  FaCss3,
  FaCube,
  FaDatabase,
  FaDocker,
  FaEnvelope,
  FaEnvelopeOpenText,
  FaEye,
  FaFigma,
  FaGit,
  FaGraduationCap,
  FaHtml5,
  FaHubspot,
  FaJs,
  FaLeaf,
  FaLink,
  FaMailchimp,
  FaMicrochip,
  FaMobileAlt,
  FaNetworkWired,
  FaNode,
  FaPaperPlane,
  FaPlug,
  FaProjectDiagram,
  FaPython,
  FaReact,
  FaRobot,
  FaServer,
  FaSignal,
  FaSync,
  FaToolbox,
  FaWifi,
  FaWind,
} from "react-icons/fa";
import { FaB, FaP, FaR, FaWordpress } from "react-icons/fa6";
import { HiFlag } from "react-icons/hi";
import { LuWaves } from "react-icons/lu";
import { SiCplusplus, SiPhp } from "react-icons/si";
import { TbBrandCSharp, TbBrandMysql } from "react-icons/tb";

// VIBRANT COLOR REFERENCE
const colors = {
  // Enhanced burgundy/maroon
  burgundy: {
    base: "#A01848", // More saturated burgundy
    light: "#C21E5B", // Brighter burgundy
    dark: "#7A0F30", // Deeper burgundy
  },

  // Enhanced magenta/rose
  magenta: {
    base: "#D63D7F", // Vibrant magenta
    light: "#FF4D9A", // Bright hot pink
    ultraLight: "#F5A5C8", // Soft rose
  },

  // Enhanced purple
  purple: {
    base: "#9854B8", // Vivid purple
    light: "#B565E0", // Bright lavender
    dark: "#6B2D8A", // Deep purple
  },

  // Enhanced charcoal (same as original - already vibrant)
  charcoal: {
    base: "#2C2C2C",
    light: "#404040",
    dark: "#1a1a1a",
  },

  // Enhanced warm whites
  warm: {
    white: "#FEFCFC",
    light: "#FFE5F0", // Warmer, more pink-tinted
    cream: "#F8F6F7",
  },
};

// ADDITIONAL COLOR GRADIENTS (Enhanced vibrancy)
const gradients = {
  // YELLOW - More golden and vibrant
  yellow: {
    default:
      "bg-gradient-to-br from-amber-400 to-yellow-500 dark:from-amber-400 dark:to-yellow-500",
    subtle:
      "from-amber-100 to-yellow-200 dark:from-amber-900/40 dark:to-yellow-800/40",
    text: "text-amber-600 dark:text-amber-400",
  },

  // GREEN - Vivid emerald
  green: {
    default:
      "bg-gradient-to-br from-emerald-600 to-green-700 dark:from-emerald-500 dark:to-green-600",
    subtle:
      "from-emerald-100 to-green-200 dark:from-emerald-900/40 dark:to-green-800/40",
    text: "text-emerald-600 dark:text-emerald-400",
  },

  // RED - Bold and striking
  red: {
    default:
      "bg-gradient-to-br from-rose-600 to-red-700 dark:from-rose-500 dark:to-red-600",
    subtle: "from-rose-100 to-red-200 dark:from-rose-900/40 dark:to-red-800/40",
    text: "text-rose-600 dark:text-rose-400",
  },

  // ORANGE - Fiery and energetic
  orange: {
    default:
      "bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500",
    subtle:
      "from-orange-100 to-red-200 dark:from-orange-900/40 dark:to-red-800/40",
    text: "text-orange-600 dark:text-orange-400",
  },

  // SKY BLUE - Bright and electric
  skyBlue: {
    default:
      "bg-gradient-to-br from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500",
    subtle: "from-sky-100 to-blue-200 dark:from-sky-900/40 dark:to-blue-800/40",
    text: "text-sky-600 dark:text-sky-400",
  },

  // BLUE - Deep and vibrant
  blue: {
    default:
      "bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500",
    subtle:
      "from-blue-100 to-cyan-200 dark:from-blue-900/40 dark:to-cyan-800/40",
    text: "text-blue-600 dark:text-blue-400",
  },

  // PURPLE - Rich and royal
  purple: {
    default:
      "bg-gradient-to-br from-purple-600 to-violet-700 dark:from-purple-500 dark:to-violet-600",
    subtle:
      "from-purple-100 to-violet-200 dark:from-purple-900/40 dark:to-violet-800/40",
    text: "text-purple-600 dark:text-purple-400",
  },

  // SLATE/CHARCOAL - Deep with contrast
  slate: {
    default:
      "bg-gradient-to-br from-slate-700 to-gray-800 dark:from-slate-600 dark:to-gray-700",
    subtle:
      "from-slate-200 to-gray-300 dark:from-slate-800/60 dark:to-gray-900/60",
    text: "text-slate-700 dark:text-slate-400",
  },

  // FUSCHIA - Bold and eye-catching
  fuschia: {
    default:
      "bg-gradient-to-br from-fuchsia-600 to-pink-700 dark:from-fuchsia-500 dark:to-pink-600",
    subtle:
      "from-fuchsia-100 to-pink-200 dark:from-fuchsia-900/40 dark:to-pink-800/40",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
  },

  // LIGHT GRAY/SMOKE - Warm neutrals
  smoke: {
    default:
      "bg-gradient-to-br from-gray-300 to-slate-400 dark:from-gray-600 dark:to-slate-700",
    subtle:
      "from-gray-100 to-slate-200 dark:from-gray-800/40 dark:to-slate-900/40",
    text: "text-gray-600 dark:text-gray-400",
  },
};

export const emailSkills: Skill[] = [
  // {
  //   name: "ActiveCampaign",
  //   icon: FaEnvelope,
  //   description:
  //     "Marketing automation platform for email campaigns and lead nurturing",
  //   tags: ["Automation", "Workflows", "CRM"],
  // },
  {
    name: "HTML",
    icon: FaHtml5,
    description: "Standard markup language for creating web pages",
    tags: ["Web", "Markup", "Frontend"],
    badgeColor:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
    style: gradients.orange.default,
  },
  {
    name: "CSS",
    icon: FaCss3,
    description: "Style sheet language for designing web pages",
    tags: ["Design", "Styling", "Responsive"],
    badgeColor:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    style: gradients.purple.default,
  },
  {
    name: "Liquid",
    icon: LuWaves,
    description: "Template language for dynamic content rendering",
    tags: ["Templates", "E-commerce", "Dynamic"],
    badgeColor: "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300",
    style: gradients.skyBlue.default,
  },
  {
    name: "HubSpot",
    icon: FaHubspot,
    description: "All-in-one marketing, sales, and service platform",
    tags: ["Marketing", "Sales", "Analytics"],
    badgeColor:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
    style: gradients.orange.default,
  },
  {
    name: "Mailchimp",
    icon: FaMailchimp,
    description: "Email marketing and automation service",
    tags: ["Campaigns", "Templates", "Analytics"],
    color: "black",
    badgeColor:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    style: gradients.yellow.default,
  },
  {
    name: "Zapier",
    icon: FaRobot,
    description: "Workflow automation connecting apps and services",
    tags: ["Automation", "Integration", "No-code"],
    badgeColor: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    style: gradients.red.default,
  },
  {
    name: "Make",
    icon: FaProjectDiagram,
    description: "Visual platform for workflow automation",
    tags: ["Workflows", "API", "Integration"],
    badgeColor:
      "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
    style: gradients.fuschia.default,
  },
  {
    name: "Salesforce",
    icon: FaDatabase,
    description: "Cloud-based CRM and customer success platform",
    tags: ["CRM", "Sales", "Enterprise"],
    badgeColor:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    style: gradients.blue.default,
  },
  // {
  //   name: "SendGrid",
  //   icon: FaCogs,
  //   description: "Email delivery and transactional email service",
  //   tags: ["Deliverability", "API", "SMTP"],
  // },
  {
    name: "AWS SES",
    icon: FaCodeBranch,
    description: "Amazon Simple Email Service for scalable sending",
    tags: ["AWS", "Cloud", "Scalable"],
    badgeColor:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    style: gradients.slate.default,
  },
  // {
  //   name: "Postmark",
  //   icon: FaSync,
  //   description: "Fast and reliable transactional email delivery",
  //   tags: ["Transactional", "API", "Delivery"],
  // },
  {
    name: "N8N",
    icon: FaPlug,
    description: "Open-source workflow automation tool",
    tags: ["Open-source", "Self-hosted", "Workflows"],
    badgeColor:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    style: gradients.purple.default,
  },
  {
    name: "Figma",
    icon: FaFigma,
    description: "Collaborative interface design tool",
    tags: ["Design", "Prototyping", "Collaboration"],
    badgeColor:
      "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
    style: gradients.fuschia.default,
  },
  {
    name: "Klaviyo",
    icon: HiFlag,
    description: "Marketing automation platform for e-commerce",
    tags: ["E-commerce", "Segmentation", "Automation"],
    badgeColor:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    style: gradients.purple.default,
  },
  // {
  //   name: "Webhooks",
  //   icon: FaLink,
  //   description: "Real-time data integration between applications",
  //   tags: ["API", "Real-time", "Integration"],
  // },
  {
    name: "Analytics",
    icon: FaChartBar,
    description:
      "Email campaign tracking and performance metrics with Litmus. ",
    tags: ["Metrics", "Reporting", "ROI", "GMB", "GA", "GSC"],
    badgeColor:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    style: gradients.green.default,
  },
  {
    name: "Wordpress",
    icon: FaWordpress,
    description:
      "Increase Web traffic and conversion performance with Google Analytics, Google Search Console, and Google My Business profile management",
    tags: ["Divi", "Elementor", "PHP", "GoHighLevel"],
    badgeColor:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    style: gradients.blue.default,
  },
];
export const webSkills: Skill[] = [
  {
    name: "React",
    icon: FaReact,
    description: "JavaScript library for building user interfaces",
    tags: ["Frontend", "Components", "Hooks"],
    badgeColor:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    style: gradients.skyBlue.default,
  },
  {
    name: "Next.js",
    icon: FaCode,
    description: "React framework with SSR and static generation",
    tags: ["React", "SSR", "Full-stack"],
    badgeColor: "bg-black/10 dark:bg-white/10 text-gray-900 dark:text-white",
    style: gradients.slate.default,
  },
  {
    name: "Node.js",
    icon: FaNode,
    description: "JavaScript runtime for backend development",
    tags: ["Backend", "JavaScript", "API"],
    badgeColor:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    style: gradients.green.default,
  },
  {
    name: "Python",
    icon: FaPython,
    description:
      "High-level programming for web and data science and web frameworks like Django and FastAPI",
    tags: ["Backend", "Data", "ML"],
    badgeColor:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    style: gradients.yellow.default,
  },
  {
    name: "MySQL",
    icon: TbBrandMysql,
    description: "Popular open-source relational database",
    tags: ["SQL", "Database", "Relational"],
    badgeColor:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    style: gradients.blue.default,
  },
  {
    name: "PostgreSQL",
    icon: FaDatabase,
    description: "Advanced open-source relational database",
    tags: ["SQL", "Database", "ACID"],
    badgeColor:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    style: gradients.slate.default,
  },
  {
    name: "MongoDB",
    icon: FaLeaf,
    description: "NoSQL document database for modern apps",
    tags: ["NoSQL", "JSON", "Scalable"],
    badgeColor:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    style: gradients.green.default,
  },
  {
    name: "PHP",
    icon: SiPhp,
    description: "Server-side scripting language for web development",
    tags: ["Backend", "Web", "Scripting"],
    badgeColor:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    style: gradients.purple.default,
  },
  {
    name: "C/C++",
    icon: SiCplusplus,
    description:
      "Powerful programming languages for system/software development",
    tags: ["Systems", "Performance", "Low-level"],
    badgeColor:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    style: gradients.blue.default,
  },
  {
    name: "C#",
    icon: TbBrandCSharp,
    description: "Modern programming language for .NET applications",
    tags: [".NET", "Windows", "Applications"],
    badgeColor:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    style: gradients.purple.default,
  },
  {
    name: "AWS",
    icon: FaAws,
    description: "Amazon Web Services cloud platform",
    tags: ["Cloud", "Infrastructure", "DevOps"],
    badgeColor:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    style: gradients.slate.default,
  },
  {
    name: "Docker",
    icon: FaDocker,
    description: "Containerization platform for applications",
    tags: ["Containers", "DevOps", "Deployment"],
    badgeColor:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    style: gradients.blue.default,
  },
  {
    name: "Git",
    icon: FaGit,
    description: "Distributed version control system",
    tags: ["Version Control", "Collaboration", "GitHub"],
    badgeColor: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    style: gradients.red.default,
  },
  {
    name: "Tailwind CSS",
    icon: FaWind,
    description: "Utility-first CSS framework",
    tags: ["CSS", "Responsive", "Design"],
    badgeColor: "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300",
    style: gradients.skyBlue.default,
  },
  {
    name: "TypeScript",
    icon: FaJs,
    description: "Typed superset of JavaScript",
    tags: ["JavaScript", "Typescript", "React"],
    badgeColor:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    style: gradients.blue.default,
  },
  {
    name: "REST APIs",
    icon: FaServer,
    description: "RESTful API design and development",
    tags: ["API", "HTTP", "Backend"],
    badgeColor:
      "bg-stone-100 dark:bg-stone-900/30 text-stone-700 dark:text-stone-300",
    style: gradients.smoke.default,
  },
];
export const engineeringSkills: Skill[] = [
  {
    name: "Microcontrollers",
    icon: FaMicrochip,
    description: "lightweight computers that run code rather than OS",
    tags: ["Arduino", "ESP32", "PIC", "ARM"],
    badgeColor: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    style: gradients.red.default,
  },
  {
    name: "Wireless",
    icon: FaWifi,
    description: "Wi-Fi and Bluetooth connectivity for devices",
    tags: ["IoT", "Wireless", "Low-power"],
    badgeColor:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    style: gradients.yellow.default,
  },
  {
    name: "MatLab",
    icon: FaChartLine,
    description: "Numerical computing and simulation software",
    tags: ["Simulation", "Modeling", "Data Analysis", "Simulink"],
    badgeColor:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    style: gradients.blue.default,
  },
  {
    name: "MQTT",
    icon: FaNetworkWired,
    description: "Lightweight messaging protocol for IoT",
    tags: ["IoT", "Messaging", "Pub/Sub"],
    badgeColor:
      "bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300",
    style: gradients.slate.default,
  },
  {
    name: "Circuit Design",
    icon: FaBolt,
    description: "Electronic circuit design and analysis",
    tags: ["Hardware", "PCB", "Analog", "AC", "DC"],
    badgeColor:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    style: gradients.purple.default,
  },
  {
    name: "CAD",
    icon: FaCube,
    description: "Computer-aided design for mechanical parts",
    tags: ["3D Modeling", "Design", "Manufacturing", "Fusion 360"],
    badgeColor:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    style: gradients.blue.default,
  },
  {
    name: "Python",
    icon: FaPython,
    description:
      "High-level programming for data analysis, automation, and machine learning with MatLab, NumPy, and SciPy. GUI development with Tkinter and PyQt.",
    tags: ["Backend", "Data", "ML"],
    badgeColor:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    style: gradients.yellow.default,
  },
  // {
  //   name: "TensorFlow",
  //   icon: FaBrain,
  //   description: "Machine learning and deep learning framework",
  //   tags: ["ML", "Neural Networks", "AI"],
  // },
  // {
  //   name: "OpenCV",
  //   icon: FaEye,
  //   description: "Computer vision and image processing library",
  //   tags: ["Vision", "Image Processing", "ML"],
  // },
  // {
  //   name: "PID Control",
  //   icon: FaCogs,
  //   description: "Proportional-Integral-Derivative control systems",
  //   tags: ["Control", "Automation", "Feedback"],
  // },
  // {
  //   name: "LoRa",
  //   icon: FaSignal,
  //   description: "Long-range, low-power wireless communication",
  //   tags: ["Wireless", "IoT", "Long-range"],
  // },
  // {
  //   name: "BLE",
  //   icon: FaBroadcastTower,
  //   description: "Bluetooth Low Energy for wireless devices",
  //   tags: ["Bluetooth", "Wireless", "Low-power"],
  // },
  {
    name: "Embedded C",
    icon: FaToolbox,
    description: "C programming for embedded systems",
    tags: ["Programming", "Low-level", "Firmware"],
    badgeColor:
      "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300",
    style: gradients.blue.default,
  },
  {
    name: "VDHL",
    icon: FaBrain,
    description:
      "Hardware description languages for FPGA/ASIC design with VDHL/Verilog",
    tags: ["FPGA", "ASIC", "Digital Design"],
    badgeColor:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
    style: gradients.orange.default,
  },
  {
    name: "PLC",
    icon: FaCodeBranch,
    description: "Programmable Logic Controllers for industrial automation",
    tags: ["Siemens", "LadderLogic", "Control"],
    badgeColor:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    style: gradients.purple.default,
  },
];
export const education: Degree = {
  id: "1",
  degree: "Bachelor of Science in Electrical Engineering",
  institution: "Florida International University",
  period: "Graduated",
  description:
    "Focused on Computer Engineering and Electrical Engineering with emphasis on embedded systems, automation, and software development. Honor Roll and Dean's List multiple semesters.",
  tags: ["Computer Engineering", "Electrical Engineering", "GPA: 3.4/4.0"],
  style: gradients.blue.default,
  
};
export const certifications: Cert[] = [
  {
    id: 1,
    title: "AWS Certified Cloud Practioner",
    issuer: "Amazon Web Services",
    description:
      "Validated expertise in designing distributed systems on AWS infrastructure.",
    year: "2022",
    icon: FaAws,
    gradient: "from-blue-500 to-cyan-500",
    style: gradients.blue.default,
    tags: [
      "EC2",
      "S3",
      "AWS Lambda",
      "IAM",
      "IOT",
      "DynamoDb",
      "VPC",
      "Cloudfront",
      "Route53",
    ],
  },
  // {
  //   id: 2,
  //   title: "AWS Solutions Architect",
  //   issuer: "Amazon Web Services",
  //   year: "2022",
  //   icon: FaAws,
  //   gradient: "from-blue-500 to-cyan-500",
  //   style: gradients.blue.default,
  //    tags:[]
  // },
  {
    id:2,
    title: "HubSpot Email Marketing",
    issuer: "HubSpot Academy",
    year: "2025",
    icon: FaEnvelope,
    description:"Email automation Cert teachs about deliverability to drive conversion",
    // gradient: "from-green-500 to-emerald-500",
    gradient: "from-orange-500 to-amber 500",
     style: gradients.red.default ,
     tags:['hubspot','mailchimp','klayvio','litmus','salesforce',],
  },
  // {
  //    id:3,
  //   title: "Advanced React & Next.js",
  //   issuer: "Frontend Masters",
  //   year: "2022",
  //   icon: FaReact,
  //   gradient: "from-purple-500 to-pink-500",
  //    style:
  //    tags:[]
  // },
  // {
  //    id:4,
  //   title: "Embedded Systems Specialist",
  //   issuer: "Professional Development",
  //   year: "2021",
  //   icon: FaRobot,
  //   gradient: "from-orange-500 to-red-500",
  //    style:
  //    tags:[]
  // },
  // {
  //   id: 2,
  //   title: "Certified Kubernetes Administrator",
  //   issuer: "CNCF",
  //   year: "2021",
  //   description:
  //     "Hands-on exam covering cluster setup, networking, storage and troubleshooting.",
  //   icon: FaAws,
  //   gradient: "from-blue-500 to-blue-500",
  //   style: gradients.blue.subtle,
  //   tags: ["Pods", "Networking", "Helm", "RBAC"],
  // },
  // {
  //   id: 3,
  //   title: "CompTIA Security+",
  //   issuer: "CompTIA",
  //   year: "2025",
  //   description:
  //     "Core security concepts, threat management, cryptography, and network hardening.",
  //   icon: FaAws,
  //   gradient: "from-blue-500 to-blue-500",
  //   style: gradients.blue.subtle,
  //   tags: ["Cryptography", "Networking", "Wireshark", "Zero Trust"],
  // },
  // {
  //   id: 4,
  //   title: "Google Data Analystics",
  //   issuer: "Google / Coursera",
  //   year: "2025",
  //   description:
  //     "End-to-end data workflow: collection, cleaning, analysis, and visualization.",
  //   icon: FaAws,
  //   gradient: "from-blue-500 to-blue-500",
  //   style: gradients.blue.subtle,
  //   tags: ["SQL", "Tableau", "R", "Sheets", "Excel", "Power BI", "Python"],
  // },
];
