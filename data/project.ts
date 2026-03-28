import { Project } from "@/types/Post";
import RealEstate from "@images/portfolio/real_estate_dashboard.png";
import MarketingDashboard from "@images/portfolio/marketing_dashboard.png";
import BookingEmail from "@images/portfolio/booking_email.png";
import MicrosoftPromo from "@images/portfolio/microsoft_holo.png";
import WalmartEmail from "@images/portfolio/walmart_transaction.png";
import Vday from "@images/portfolio/valentines_email.png";
import MCX from "@images/portfolio/mcx.png";
import LTAA from "@images/portfolio/lachelle_travels.png";
import Transact from "@images/portfolio/transact_payment.png";
import Traders from "@images/portfolio/prolific_traders.png";
import PointNorth from "@images/portfolio/point_north.png";
import VFW from "@images/portfolio/vfw.png";
import PowerPulse from "@images/portfolio/power_pulse.png";
import AWSDevOps from "@images/portfolio/AwsDevops.avif";
import Zybo from "@images/portfolio/Zybo.avif";

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
export const Marketing: Project[] = [
  {
    id: "1",
    title: "Real Estate Dashboard",
    image: RealEstate.src,
    modal: true,
    category: "data",
    videoUrl: "https://youtu.be/DzeOil1pBgI?si=9NBIVCqyUX-dxgdn",
    description:
      "Interactive Power BI dashboard analyzing U.S. property management trends with an East vs. West Coast regional breakdown and waterfront preference insights.",
    longDesc:
      "A data analytics project built in Power BI for a real estate agent seeking to understand U.S. property management trends. The dashboard delivers a regional comparative analysis between the East and West Coast markets, with a focus on waterfront versus non-waterfront property preferences. Raw agent data was cleaned, transformed, and modeled before being surfaced through custom DAX measures and advanced Power BI visualizations, enabling the client to make data-informed decisions about market positioning and property focus.",
    skills: ["analytics"],
    icon: "",
    featured: true,
    timeline: {
      duration: "1 week",
      startDate: "09-01-24",
      endDate: "09-10-24",
    },
    tags: ["power bi"],
    status: "completed",
    details: {
      overview:
        "This Power BI dashboard was developed for a real estate agent looking to gain actionable insights from their property management data across the United States. The primary focus was a regional comparison between East Coast and West Coast markets, alongside an analysis of consumer preference for waterfront properties. Data sourced directly from the agent was cleaned, transformed, and structured into an interactive reporting solution that surfaces market trends and pricing patterns through visually compelling dashboards built in Power BI and presented via PowerPoint.",
      challenges:
        "The raw data provided by the agent required significant cleaning and transformation before it could be used for meaningful analysis. Structuring the data to support accurate regional segmentation between East and West Coast markets while simultaneously isolating waterfront versus non-waterfront property trends added complexity to the data model. Translating these insights into a format that was both technically accurate and immediately interpretable for a non-technical client was an additional design constraint.",
      solutions:
        "Data was cleaned and transformed using Power Query to ensure consistency and accuracy across the dataset. Custom DAX measures were written to calculate region-specific metrics and enable dynamic comparisons between East and West Coast property data. Advanced Power BI visuals were used to clearly communicate waterfront preference trends and pricing patterns across markets. A PowerPoint presentation was layered on top of the dashboard to deliver a polished, client-ready reporting experience.",
      results:
        "The completed dashboard gave the client a clear, data-driven view of property management trends across U.S. coastal markets. Regional pricing patterns and waterfront preference data were surfaced in an interactive format, empowering the agent to make informed decisions about market focus and property positioning. The combination of Power BI's analytical depth and a structured PowerPoint presentation ensured the insights were accessible and actionable for the client.",
      features: [
        "Regional market comparison between East Coast and West Coast U.S. property data",
        "Waterfront versus non-waterfront property preference analysis",
        "Data cleaning and transformation via Power Query for reliable modeling",
        "Custom DAX measures for dynamic region-specific metric calculations",
        "Advanced Power BI visualizations for market trend and pricing insights",
        "PowerPoint integration for client-ready presentation of dashboard findings",
      ],
    },
  },
  {
    id: "2",
    title: "Marketing Dashboard",
    image: MarketingDashboard.src,
    modal: true,
    category: "data",
    description:
      "Interactive Tableau dashboard tracking web marketing KPIs including page load times, bounce rates, and click-through rates with custom calculated metrics.",
    longDesc:
      "A web marketing analytics dashboard built in Tableau to monitor and evaluate key performance indicators across a website's marketing funnel. The project involved sourcing and cleaning raw web data before engineering custom calculated fields to surface actionable KPIs including page load times, bounce rates, and click-through rates. The final deliverable combined an interactive Tableau dashboard with a PowerPoint presentation, giving stakeholders a clear and structured view of marketing performance and areas for optimization.",
    skills: ["analytics"],
    icon: "",
    featured: true,
    timeline: {
      duration: "1 week",
      startDate: "09-01-24",
      endDate: "09-10-24",
    },
    tags: ["marketing", "tableau"],
    status: "completed",
    videoUrl: "https://youtu.be/usIyITVMprw?si=NFBcIo2ynDgIXdpW",
    details: {
      overview:
        "This Tableau dashboard was built to give marketing stakeholders a centralized view of web performance KPIs across their digital presence. The dashboard tracks critical metrics including page load times, bounce rates, and click-through rates, providing a data-driven foundation for evaluating marketing effectiveness. Raw web data was cleaned and transformed prior to analysis, and custom calculated fields were engineered to produce accurate, meaningful KPI outputs. The final solution was packaged alongside a PowerPoint presentation for structured stakeholder reporting.",
      challenges:
        "Raw web marketing data arrived inconsistent and required thorough cleaning before it could be reliably used for KPI analysis. Standard out-of-the-box Tableau metrics were insufficient to capture the nuanced performance indicators required, necessitating the development of custom calculated fields and equations. Presenting complex web performance data in a format that was both analytically rigorous and immediately digestible for non-technical stakeholders added an additional layer of design complexity.",
      solutions:
        "Data was cleaned and standardized to ensure consistency across all web metrics before being loaded into Tableau. Custom calculated fields were developed to accurately compute KPIs such as bounce rate trends, click-through rate performance, and page load time distributions that went beyond Tableau's native aggregations. Advanced Tableau visualizations were used to present these metrics interactively, allowing stakeholders to filter and drill down by relevant dimensions. A PowerPoint deck was produced alongside the dashboard to support formal reporting and presentation contexts.",
      results:
        "The completed dashboard delivered a unified, interactive view of web marketing performance across all tracked KPIs. Stakeholders gained the ability to identify underperforming pages, monitor click-through rate trends, and correlate page load times with bounce rate behavior in real time. The combination of a live Tableau dashboard and a structured PowerPoint presentation ensured the insights were actionable at both the analytical and executive level.",
      features: [
        "Web KPI tracking across page load times, bounce rates, and click-through rates",
        "Custom calculated fields and equations for precise metric engineering",
        "Data cleaning and transformation pipeline for consistent, reliable inputs",
        "Interactive Tableau visualizations with dimension-level filtering and drill-down",
        "Funnel performance analysis to identify drop-off points across the marketing journey",
        "PowerPoint integration for executive-ready stakeholder reporting",
      ],
    },
  },
  {
    id: "3",
    title: "Confirmation Email",
    image: BookingEmail.src,
    modal: false,
    category: "email",
    description:
      "Dynamically displayed information using Liquid for an E-commerce brand with HTML and CSS.",
    longDesc:
      "Dynamically displayed information using Liquid for an E-commerce brand with HTML and CSS.",
    skills: ["e-commerce", "marketing", "copywriting", "html", "css", "liquid"],
    icon: "",
    featured: true,
    timeline: {
      duration: "1 week",
      startDate: "09-01-24",
      endDate: "09-10-24",
    },
    tags: ["marketing", "html", "css", "liquid"],
    status: "completed",
    liveUrl: "https://brandbooking-transactional.vercel.app/",
    videoUrl: "",
    details: {
      overview: "",
      challenges: "",
      solutions: "",
      results: "",
      features: [""],
    },
  },
  {
    id: "4",
    title: "Microsoft Hololens X",
    image: MicrosoftPromo.src,
    modal: false,
    category: "email",
    description:
      "Microsoft promotional email about a new product and its features",
    longDesc:
      "Microsoft promotional email about a new product and its features",
    skills: ["e-commerce", "marketing", "copywriting", "html", "css"],
    icon: "",
    featured: true,
    timeline: {
      duration: "1 week",
      startDate: "09-01-24",
      endDate: "09-10-24",
    },
    tags: ["marketing", "html", "css", "microsoft"],
    status: "completed",
    liveUrl: "https://microsoft-email-kohl.vercel.app/",
    videoUrl: "",
    details: {
      overview: "",
      challenges: "",
      solutions: "",
      results: "",
      features: [""],
    },
  },
  {
    id: "5",
    title: "Walmart Transactional Email",
    image: WalmartEmail.src,
    modal: false,
    category: "email",
    description: "Transactional Email for E-commerce",
    longDesc: "Transactional Email for E-commerce",
    skills: [
      "e-commerce",
      "marketing",
      "copywriting",
      "html",
      "css",
      "javascript",
    ],
    icon: "",
    featured: true,
    timeline: {
      duration: "1 week",
      startDate: "09-01-24",
      endDate: "09-10-24",
    },
    tags: ["marketing", "html", "css", "microsoft", "javascript"],
    status: "completed",
    liveUrl: "https://wally-email.vercel.app/",
    videoUrl: "",
    details: {
      overview: "",
      challenges: "",
      solutions: "",
      results: "",
      features: [""],
    },
  },
  {
    id: "6",
    title: "V Day Promo Email",
    image: Vday.src,
    modal: false,
    category: "email",
    description: "Promotional Email for Valentines Day",
    longDesc: "Promotional Email for Valentines Day",
    skills: ["e-commerce", "marketing", "copywriting", "html", "css"],
    icon: "",
    featured: true,
    timeline: {
      duration: "1 week",
      startDate: "09-01-24",
      endDate: "09-10-24",
    },
    tags: ["marketing", "html", "css"],
    status: "completed",
    liveUrl: "https://promo-email-1.vercel.app/",
    videoUrl: "",
    details: {
      overview: "",
      challenges: "",
      solutions: "",
      results: "",
      features: [""],
    },
  },
];
export const Web: Project[] = [
  {
    id: "1",
    title: "Magna Carda Exchange NFC",
    image: MCX.src,
    modal: false,
    category: "nodejs",
    description: "Community platform for networking using NFC chip technology",
    longDesc: "Community platform for networking using NFC chip technology",
    skills: ["analytics", "html", "css", "javascript", "vue"],
    icon: "",
    featured: true,
    timeline: {
      duration: "1 week",
      startDate: "09-01-24",
      endDate: "09-10-24",
    },
    tags: ["html", "css", "tailwind", "javascript", "vue", "php", "laravel"],
    status: "completed",
    liveUrl: "https://mcx-nuxt.vercel.app/",
    videoUrl: "",
    details: {
      overview: "",
      challenges: "",
      solutions: "",
      results: "",
      features: [""],
    },
  },
  {
    id: "2",
    title: "Lachelle's Travels & Adventures",
    image: LTAA.src,
    modal: false,
    category: "wordpress",
    description: "Travel Agency Website where visitors can book travels",
    longDesc: "Travel Agency Website where visitors can book travels",
    skills: ["html", "css", "javascript", "api"],
    icon: "",
    featured: true,
    timeline: {
      duration: "1 week",
      startDate: "09-01-24",
      endDate: "09-10-24",
    },
    tags: ["html", "css", "wordpress", "javascript"],
    status: "completed",
    liveUrl: "https://lachelletravels.com/",
    videoUrl: "",
    details: {
      overview: "",
      challenges: "",
      solutions: "",
      results: "",
      features: [""],
    },
  },
  {
    id: "3",
    title: "Tranzact Payment System",
    image: Transact.src,
    modal: false,
    category: "wordpress",
    description:
      "Cashless transaction with anonymous ATM's and incognito wire transfers",
    longDesc:
      "Cashless transaction with anonymous ATM's and incognito wire transfers",
    skills: ["html", "css", "javascript", "api"],
    icon: "",
    featured: true,
    timeline: {
      duration: "1 week",
      startDate: "09-01-24",
      endDate: "09-10-24",
    },
    tags: ["html", "css", "wordpress", "javascript"],
    status: "completed",
    liveUrl: "https://tranact.com/",
    videoUrl: "",
    details: {
      overview: "",
      challenges: "",
      solutions: "",
      results: "",
      features: [""],
    },
  },
  {
    id: "4",
    title: "Prolific Traders",
    image: Traders.src,
    modal: false,
    category: "clickfunnels",
    description: "Community for Investors and Day traders with Click Funnels.",
    longDesc: "Community for Investors and Day traders with Click Funnels.",
    skills: ["html", "css", "javascript", "api", "click funnels"],
    icon: "",
    featured: true,
    timeline: {
      duration: "1 week",
      startDate: "09-01-24",
      endDate: "09-10-24",
    },
    tags: ["html", "css", "javascript"],
    status: "completed",
    liveUrl: "https://prolifictraders.com/thank-you-630845091742956259996",
    videoUrl: "",
    details: {
      overview: "",
      challenges: "",
      solutions: "",
      results: "",
      features: [""],
    },
  },
  {
    id: "5",
    title: "Point North Contracting",
    image: PointNorth.src,
    modal: false,
    category: "wordpress",
    description: "General Contracting website for Roofing, Construction, etc",
    longDesc: "General Contracting website for Roofing, Construction, etc",
    skills: ["html", "css", "javascript", "api", "wordpress", "copywriting"],
    icon: "",
    featured: true,
    timeline: {
      duration: "1 week",
      startDate: "09-01-24",
      endDate: "09-10-24",
    },
    tags: ["html", "css", "javascript", "wordpress"],
    status: "completed",
    liveUrl: "https://pointnorthcontracting.com/",
    videoUrl: "",
    details: {
      overview: "",
      challenges: "",
      solutions: "",
      results: "",
      features: [""],
    },
  },
  {
    id: "6",
    title: "VFW Post 6827",
    image: VFW.src,
    modal: false,
    category: "wordpress",
    description:
      "Veterans of Foreign Wars Saint Petersburg, Florida custom post theme with custom plugins.",
    longDesc:
      "Veterans of Foreign Wars Saint Petersburg, Florida custom post theme with custom plugins.",
    skills: ["html", "css", "javascript", "api", "wordpress", "copywriting"],
    icon: "",
    featured: true,
    timeline: {
      duration: "1 week",
      startDate: "09-01-24",
      endDate: "09-10-24",
    },
    tags: ["html", "css", "javascript", "wordpress"],
    status: "completed",
    liveUrl: "https://vfwpost6827.org/",
    videoUrl: "",
    details: {
      overview: "",
      challenges: "",
      solutions: "",
      results: "",
      features: [""],
    },
  },
];
export const Hardware: Project[] = [
  {
    id: "1",
    title: "Power Pulse Home Energy Monitoring System",
    image: PowerPulse.src,
    modal: true,
    category: "IOT",
    description:
      "Non-invasive IoT energy monitoring system with real-time cloud dashboards and mobile app visualization.",
    longDesc:
      "Power Pulse is a non-invasive home energy monitoring system built on the ESP32 microcontroller. It leverages CT and voltage sensors to measure real-time power consumption without requiring any direct electrical wiring modifications. Data is processed on-device and transmitted to cloud infrastructure via AWS and Azure, where it is stored, analyzed, and surfaced through a responsive React-based dashboard and mobile application. The system displays live voltage, current, power, and cumulative kilowatt-hour consumption, enabling homeowners to monitor and optimize their energy usage remotely.",
    skills: ["analytics", "circuits", "rtos", "i2c", "pcb", "cloud", "react"],
    icon: "",
    featured: true,
    timeline: {
      duration: "1 week",
      startDate: "09-01-24",
      endDate: "09-10-24",
    },
    tags: ["circuits", "pcb", "azure", "aws", "iot", "C"],
    status: "completed",
    videoUrl: "https://youtu.be/ewC8UrDEJRQ?si=Gs0k5jgpHPXaxphQ",
    details: {
      overview:
        "Power Pulse is an IoT-based home energy monitoring system designed to automate the collection and visualization of residential energy consumption data. Using non-invasive current and voltage sensors interfaced with an ESP32 microcontroller, the system captures real-time electrical metrics and transmits them to AWS and Azure cloud services. A React-based dashboard provides users with an intuitive interface to monitor voltage, current, power draw, and kilowatt-hour totals from any device.",
      challenges:
        "Existing commercial energy monitors were either cost-prohibitive or dependent on closed subscription platforms with limited customization. Capturing accurate AC voltage and current data without invasive electrical modifications posed hardware integration challenges. Ensuring reliable data transmission, cloud scalability, and a seamless user experience across local and remote access scenarios required careful architectural planning.",
      solutions:
        "Non-invasive sensing was achieved using the SCT-013 split-core CT sensor and the ZMPT101B AC voltage sensor, eliminating the need for direct wiring modifications. The ESP32 microcontroller was selected for its processing power, built-in Wi-Fi, and compatibility with the sensor suite. Cloud infrastructure was built on AWS IoT Core, DynamoDB, S3, and Lambda for serverless, scalable data handling. A React frontend was developed to deliver a visually rich dashboard as an alternative to basic serial monitor outputs used in comparable projects.",
      results:
        "The completed system successfully captures and transmits real-time energy consumption data to the cloud, displaying live readings of voltage, current, power, and kWh through a responsive dashboard. The non-invasive hardware setup requires no licensed electrical work, and the serverless AWS architecture keeps operational costs minimal. Power Pulse demonstrates a viable, scalable alternative to both expensive commercial monitors and limited closed-platform IoT solutions.",
      features: [
        "Non-invasive AC current and voltage sensing via SCT-013 and ZMPT101B sensors",
        "Real-time data processing and transmission using ESP32 with built-in Wi-Fi",
        "Cloud data pipeline built on AWS IoT Core, DynamoDB, S3, and Lambda",
        "React-based dashboard displaying live voltage, current, power, and kWh metrics",
        "Remote accessibility via internet-connected dashboard and mobile application",
        "Serverless architecture designed for scalability and minimal operational cost",
        "Custom PCB design for a production-grade hardware implementation",
      ],
    },
  },
  {
    id: "2",
    title: "HDMI Video Processing on Zybo Z7-20 FPGA",
    image: Zybo.src,
    modal: true,
    category: "IOT",
    description:
      "Real-time HDMI video transmission and processing using a Zybo Z7-20 FPGA with interrupt-driven architecture.",
    longDesc:
      "Designed and implemented a Zynq-based embedded system to capture, process, and output HDMI video. The system uses AXI video pipelines, VDMA, and interrupt handling to enable real-time video streaming and manipulation between input and display.",
    skills: [
      "embedded systems",
      "fpga",
      "verilog",
      "c",
      "video processing",
      "interrupts",
      "zynq",
      "hardware-software integration",
    ],
    icon: "",
    featured: true,
    timeline: {
      duration: "1 week",
      startDate: "04-15-25",
      endDate: "04-22-25",
    },
    tags: ["FPGA", "Zynq", "HDMI", "C", "Verilog", "Embedded"],
    status: "completed",
    videoUrl: "https://youtube.com/shorts/mdwsWR4utwU?si=KS5I3HMolQvgAs0b",
    details: {
      overview:
        "Built an HDMI video pipeline on a Zybo Z7-20 using Vivado and SDK. Integrated input/output modules, AXI streaming, and processing system for real-time video display.",
      challenges:
        "Managing multiple interrupt sources, synchronizing video timing, and ensuring stable HDMI signal processing without frame drops.",
      solutions:
        "Implemented an interrupt-driven architecture combining VDMA, VTC, and GPIO signals through a concat block to efficiently handle events and reduce CPU polling.",
      results:
        "Successfully demonstrated real-time HDMI input/output with frame buffering, resolution control, and visual effects via a menu-driven interface.",
      features: [
        "Interrupt-driven video processing",
        "HDMI input and output pipeline",
        "AXI VDMA frame buffering",
        "Real-time video effects (scaling, inversion)",
        "Menu-based user control",
      ],
    },
  },
];
export const Devops: Project[] = [
  {
    id: "1",
    title: "Deploying Java Application to AWS",
    image: AWSDevOps.src,
    modal: true,
    category: "Cloud",
    description:
      "Production-grade Spring Boot deployment on AWS featuring Redis caching, RabbitMQ messaging, EC2 auto-scaling, and Route 53 hosted zone configuration.",
    longDesc:
      "A full cloud deployment project demonstrating the end-to-end process of taking a Spring Boot application to production on AWS. The deployment pipeline involved packaging a Maven-built WAR file, storing it in S3, and deploying it across multiple EC2 instances configured for failover and auto-scaling. The project showcases Redis caching as a core performance optimization — demonstrating the measurable difference between first-load database queries and subsequent cache hits. Additional infrastructure included RabbitMQ for message brokering, Spring Security for application-level protection, and Route 53 for hosted zone and DNS management.",
    skills: ["cloud"],
    icon: "",
    videoUrl: "https://youtu.be/1Z6E46F5H-o?si=PRXiwwBGeRq5Mut3",
    featured: true,
    status: "completed",
    tags: ["aws", "java", "spring", "redis", "devops"],
    timeline: {
      duration: "1 week",
      startDate: "09-01-24",
      endDate: "09-10-24",
    },
    details: {
      overview:
        "This project demonstrates a production-ready deployment of a Spring Boot application on AWS, covering the full spectrum of cloud infrastructure setup and application delivery. The Maven-built WAR file was uploaded via the AWS CLI and stored in an S3 bucket before being deployed to EC2 instances configured for high availability through failover and auto-scaling groups. Redis caching was implemented as the centerpiece of the project, visually demonstrating the performance delta between a cold database read on first load and a cache-served response on subsequent requests. Supporting infrastructure included RabbitMQ for asynchronous message brokering, Spring Security for securing application endpoints, and Route 53 for DNS and hosted zone management.",
      challenges:
        "Configuring a resilient multi-EC2 deployment with proper failover behavior and auto-scaling policies required careful AWS infrastructure planning. Integrating Redis caching into the Spring Boot application while ensuring cache invalidation and consistency with the underlying database added architectural complexity. Setting up RabbitMQ alongside the application stack and securing the entire system with Spring Security principles demanded a coordinated approach across multiple AWS services. Managing the full deployment pipeline — from Maven build through CLI upload, S3 storage, and EC2 provisioning — without a CI/CD tool required precise manual orchestration.",
      solutions:
        "The application was packaged as a WAR file using Maven and uploaded to an S3 bucket via the AWS CLI, establishing a reliable artifact storage and retrieval workflow. Multiple EC2 instances were provisioned and configured within an auto-scaling group with failover policies to ensure high availability under load. Redis was integrated into the Spring Boot application to cache database responses, with the caching behavior demonstrated live — showing a first-request database hit followed by a significantly faster cache-served response on repeat requests. RabbitMQ was deployed as the message broker for asynchronous communication, Spring Security was configured to enforce authentication and authorization, and Route 53 was used to manage the hosted zone and route traffic to the load-balanced EC2 fleet.",
      results:
        "The deployment successfully demonstrated a production-grade AWS architecture capable of handling failover, scaling under load, and efficient data retrieval through Redis caching. The Redis demonstration clearly illustrated the performance improvement between database-sourced and cache-sourced responses, providing a tangible example of caching as a scalability strategy. The full infrastructure stack — EC2, S3, RabbitMQ, Redis, Route 53, and Spring Security — operated cohesively, validating the deployment pipeline and cloud architecture design.",
      features: [
        "End-to-end Spring Boot deployment pipeline via Maven build, AWS CLI, and S3 artifact storage",
        "Multi-EC2 instance deployment with auto-scaling and failover configuration for high availability",
        "Redis caching implementation demonstrating live performance comparison between database and cache reads",
        "RabbitMQ integration for asynchronous message brokering within the application stack",
        "Spring Security configuration for endpoint authentication and authorization",
        "Route 53 hosted zone setup for DNS management and traffic routing",
        "Load-balanced EC2 fleet architecture designed for production resilience and scalability",
      ],
    },
  },
];

// export const Devops: Project[] = [
//   {
//     id: "k3s-homelab",
//     title: "Production-grade Homelab K3s Cluster",
//     description:
//       "4-node Raspberry Pi K3s cluster with Helm, ArgoCD GitOps, Traefik ingress, cert-manager TLS, and full Prometheus/Grafana observability stack.",
//     longDesc:
//       "Built a lightweight Kubernetes cluster on 4 Raspberry Pi 4 nodes running K3s. Configured Helm releases for all workloads, ArgoCD for GitOps-driven deployment from a mono-repo, Traefik as the ingress controller with Let's Encrypt TLS via cert-manager, Longhorn for distributed block storage, and a full Prometheus/Grafana/Alertmanager observability stack. Exposed safely via Cloudflare Tunnel — zero ports forwarded.",
//     image: "https://picsum.photos/seed/k3s-homelab-devops/800/500",
//     modal:true,
//     tags: [
//       "kubernetes",
//       "k3s",
//       "argocd",
//       "helm",
//       "traefik",
//       "prometheus",
//       "raspberry-pi",
//     ],
//     skills: ["kubernetes", "helm", "argocd", "prometheus", "nginx"],
//     status: "completed",
//     featured: true,
//     githubUrl: "https://github.com",
//     liveUrl: "https://yourportfolio.dev",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "terraform-aws-infra",
//     title: "Terraform AWS Infrastructure as Code",
//     description:
//       "Modular Terraform mono-repo provisioning VPC, ECS Fargate services, RDS Aurora, S3, CloudFront CDN, and WAF — zero manual click-ops.",
//     longDesc:
//       "Authored a fully modular Terraform codebase that provisions a production-grade AWS environment: multi-AZ VPC with public/private subnets, ECS Fargate cluster with auto-scaling, RDS Aurora Serverless, S3 + CloudFront CDN with origin access control, AWS WAF, and IAM roles with least-privilege policies. Remote state stored in S3 with DynamoDB locking. Workspaces separate staging/production. GitHub Actions pipeline runs `terraform plan` on PRs and `apply` on merge.",
//     image: "https://picsum.photos/seed/terraform-aws-devops/800/500",
//     tags: [
//       "terraform",
//       "aws",
//       "ecs",
//       "rds",
//       "cloudfront",
//       "iac",
//       "github-actions",
//     ],
//     skills: ["terraform", "aws", "github-actions"],
//     status: "completed",
//     featured: true,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "gitops-pipeline",
//     title: "Full GitOps CI/CD Pipeline",
//     description:
//       "GitHub Actions → Docker build → ECR push → ArgoCD sync: a reusable pipeline template with semantic versioning, Trivy scanning, and Slack alerts.",
//     longDesc:
//       "Designed a reusable GitOps pipeline that runs on every merge to main: GitHub Actions builds and tests the Docker image, scans it with Trivy for CVEs, tags it with semantic version, pushes to Amazon ECR, commits the new image tag to the GitOps manifests repo, and ArgoCD auto-syncs to the cluster. Slack webhook posts success/failure with a direct diff link. The full cycle — commit to running pod — takes under 4 minutes.",
//     image: "https://picsum.photos/seed/gitops-pipeline-devops/800/500",
//     details: {
//       overview: "",
//       challenges: "",
//       solutions: "",
//       results: "",
//       features: [""],
//     },
//     tags: [
//       "github-actions",
//       "argocd",
//       "docker",
//       "ecr",
//       "trivy",
//       "semantic-versioning",
//       "slack",
//     ],
//     skills: ["github-actions", "argocd", "docker", "aws"],
//     status: "completed",
//     featured: true,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "monitoring-stack",
//     title: "Observability Stack — Prometheus + Grafana + Loki",
//     description:
//       "Self-hosted monitoring platform collecting metrics from 12 hosts, 40+ services with custom alerting rules and a Grafana On-Call rotation.",
//     longDesc:
//       "Deployed a full observability stack on the homelab: Prometheus scrapes node-exporter, kube-state-metrics, cAdvisor, and custom app endpoints on a 15s interval. Loki + Promtail aggregate logs from all cluster pods. Grafana renders 8 custom dashboards covering cluster health, per-app RED metrics, and hardware temps. Alertmanager routes critical alerts to PagerDuty and non-critical to a Telegram bot. Retained 90-day metric history via Thanos S3 offload.",
//     image: "https://picsum.photos/seed/monitoring-devops/800/500",
//     tags: [
//       "prometheus",
//       "grafana",
//       "loki",
//       "alertmanager",
//       "thanos",
//       "monitoring",
//       "observability",
//     ],
//     skills: ["prometheus", "kubernetes", "linux"],
//     status: "completed",
//     featured: false,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "ansible-server-bootstrap",
//     title: "Ansible Server Bootstrap Playbooks",
//     description:
//       "Idempotent playbook collection that provisions a bare Debian/Ubuntu host to a hardened, Docker-ready state in under 8 minutes.",
//     longDesc:
//       "A collection of Ansible roles that configure a fresh Debian/Ubuntu server: SSH key-only auth, UFW firewall with minimal rule set, fail2ban, unattended-upgrades, Docker CE + Compose plugin, Caddy or Nginx reverse proxy, and a non-root deploy user with sudo policy. Vault-encrypted secrets. Molecule tests verify idempotency in Docker containers. Used to bootstrap 15+ VPS instances across DigitalOcean and Hetzner.",
//     image: "https://picsum.photos/seed/ansible-devops/800/500",
//     tags: [
//       "ansible",
//       "linux",
//       "debian",
//       "docker",
//       "hardening",
//       "bash",
//       "vault",
//     ],
//     skills: ["ansible", "linux", "docker"],
//     status: "completed",
//     featured: false,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "self-hosted-platform",
//     title: "Self-hosted PaaS on K3s",
//     description:
//       "Coolify-inspired self-hosted platform running 20+ services — Git push deploys, SSL, backups, and a custom admin UI — on commodity hardware.",
//     longDesc:
//       "Replaced Heroku-style managed hosting with a self-hosted PaaS layer on top of K3s. A webhook listener triggers Kaniko in-cluster image builds on git push. Traefik issues Let's Encrypt certs automatically. Velero handles daily backups to Backblaze B2. A small Next.js admin UI lists running services, shows logs via a WebSocket proxy, and offers one-click restart/rollback. Hosting 20+ personal and client projects at a fraction of SaaS cost.",
//     image: "https://picsum.photos/seed/selfhosted-devops/800/500",
//     tags: [
//       "kubernetes",
//       "coolify",
//       "kaniko",
//       "traefik",
//       "velero",
//       "gitops",
//       "self-hosted",
//     ],
//     skills: ["kubernetes", "helm", "argocd", "nginx", "linux"],
//     status: "in-progress",
//     featured: true,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "azure-aks-setup",
//     title: "Azure AKS Production Cluster",
//     description:
//       "Terraform-provisioned AKS cluster with Azure AD workload identity, Defender for Containers, and Azure Monitor integrated Prometheus.",
//     longDesc:
//       "Provisioned an Azure Kubernetes Service cluster via Terraform: node pools with auto-scaling (2–10 nodes), Azure AD workload identity for pod-level RBAC to Key Vault and Blob storage, Microsoft Defender for Containers with CVE alerting, Azure CNI Overlay networking, and an Azure Monitor-managed Prometheus workspace. Azure DevOps pipeline deploys Helm releases on every tag. Integrated with Entra ID for SSO to Grafana.",
//     image: "https://picsum.photos/seed/aks-devops/800/500",
//     tags: [
//       "azure",
//       "aks",
//       "terraform",
//       "azure-devops",
//       "workload-identity",
//       "defender",
//     ],
//     skills: ["azure", "terraform", "kubernetes", "prometheus"],
//     status: "completed",
//     featured: false,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "nginx-reverse-proxy",
//     title: "Nginx / Traefik Reverse Proxy Config Library",
//     description:
//       "Battle-tested config library for Nginx and Traefik — SSL termination, rate limiting, CORS headers, WebSocket proxying, and upstream health checks.",
//     longDesc:
//       "An open-source repository of production-tested Nginx and Traefik configurations covering: TLS 1.3 hardening with HSTS, Brotli + gzip compression, rate limiting by IP and route, CORS preflight handling, WebSocket upgrade proxying, upstream health-check intervals, custom error pages, and Docker/K8s label-driven Traefik dynamic routing. Every config is tested against Mozilla SSL Lab's A+ benchmark. Includes a GitHub Actions workflow that lints configs with nginx -t on every PR.",
//     image: "https://picsum.photos/seed/nginx-devops/800/500",
//     tags: [
//       "nginx",
//       "traefik",
//       "ssl",
//       "reverse-proxy",
//       "docker",
//       "linux",
//       "security",
//     ],
//     skills: ["nginx", "linux", "docker", "github-actions"],
//     status: "completed",
//     featured: false,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
// ];
// export const Web: Project[] = [
//   {
//     id: "portfolio-site",
//     title: "Personal Portfolio & Blog",
//     description:
//       "Next.js 14 App Router site with MDX blog, dark/light themes, Framer Motion animations, and Lighthouse 100 scores.",
//     longDesc:
//       "Built a performant personal brand site using Next.js 14 App Router with MDX-powered blog posts, ISR revalidation, and a custom design system. Achieves Lighthouse 100 across all categories. Features include category-filtered project pages, animated hero with GSAP, glassmorphism cards, structured schema.org data, and an email newsletter powered by Resend.",
//     image: "https://picsum.photos/seed/portfolio-web/800/500",
//     tags: ["next.js", "typescript", "tailwind", "mdx", "framer-motion", "seo"],
//     skills: ["react", "typescript", "tailwind", "animations", "seo"],
//     status: "completed",
//     featured: true,
//     modal:true,
//     liveUrl: "https://yourportfolio.dev",
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "saas-dashboard",
//     title: "SaaS Analytics Dashboard",
//     description:
//       "Real-time metrics dashboard with Supabase Realtime, Recharts, role-based auth, and Stripe billing integration.",
//     longDesc:
//       "Full-stack SaaS application with a Next.js 14 frontend, Supabase backend, and Stripe Checkout. Features real-time chart updates via Supabase Realtime WebSockets, row-level security policies, multi-tenant workspace isolation, CSV export, and email alerts on threshold breaches. CI/CD via GitHub Actions deploys to Vercel on every merge to main.",
//     image: "https://picsum.photos/seed/saas-dashboard-web/800/500",
//     tags: ["next.js", "supabase", "recharts", "stripe", "typescript", "rls"],
//     skills: ["react", "postgres", "typescript", "cicd", "docker"],
//     status: "completed",
//     featured: true,
//     liveUrl: "https://demo.yourportfolio.dev",
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "ecommerce-platform",
//     title: "Headless E-commerce Store",
//     description:
//       "Shopify Storefront API + Next.js storefront with cart context, optimistic UI, and edge-cached product pages.",
//     longDesc:
//       "Custom headless storefront powered by Shopify's Storefront API and Next.js. Product, collection, and checkout pages are fully SSR/ISR. Cart state is managed via React Context with optimistic updates and edge-cached using Vercel Edge Config. Integrates Klaviyo for abandoned-cart flows and a custom loyalty points widget.",
//     image: "https://picsum.photos/seed/ecommerce-web/800/500",
//     tags: [
//       "next.js",
//       "shopify",
//       "graphql",
//       "typescript",
//       "edge-functions",
//       "klaviyo",
//     ],
//     skills: ["react", "graphql", "typescript", "tailwind"],
//     status: "completed",
//     featured: true,
//     githubUrl: "https://github.com",
//     liveUrl: "https://yourportfolio.dev",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "email-automation",
//     title: "Email Automation Platform",
//     description:
//       "Node.js + Resend platform for drag-and-drop transactional email sequences with A/B testing and analytics.",
//     longDesc:
//       "A lightweight email automation tool built on Node.js, Resend (sending), and a React-based drag-and-drop sequence builder. Supports conditional branching, A/B test splits, open/click webhooks, and a Recharts analytics panel. PostgreSQL stores subscribers and event logs; Docker Compose orchestrates local dev; GitHub Actions deploys to a DigitalOcean Droplet.",
//     image: "https://picsum.photos/seed/email-platform-web/800/500",
//     tags: ["node.js", "resend", "react", "postgresql", "docker", "email"],
//     skills: ["nodejs", "react", "postgres", "docker", "cicd"],
//     status: "completed",
//     featured: false,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "devops-dashboard",
//     title: "Homelab Monitoring Dashboard",
//     description:
//       "React + FastAPI dashboard surfacing Prometheus metrics from a 4-node K3s cluster with dark glassmorphism UI.",
//     longDesc:
//       "Custom monitoring UI that reads Prometheus metrics via a FastAPI proxy and displays server health, pod counts, CPU/memory trends, and alert state. Built with React, Recharts, and a dark glassmorphism design system. Authentication via JWT; WebSocket pushes live metric snapshots every 5 s. Deployed as a Docker container on the same K3s cluster it monitors.",
//     image: "https://picsum.photos/seed/devops-dash-web/800/500",
//     tags: ["react", "fastapi", "python", "prometheus", "docker", "websockets"],
//     skills: ["react", "python", "docker", "typescript", "animations"],
//     status: "completed",
//     featured: false,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "marketing-site",
//     title: "Digital Marketing Agency Site",
//     description:
//       "Conversion-optimised agency site with GSAP scroll animations, CMS-driven case studies, and 98 Lighthouse score.",
//     longDesc:
//       "Designed and developed a multi-page marketing site for a digital agency. Pages use GSAP ScrollTrigger for section reveals and parallax effects. Content is managed via Sanity CMS with live previews. Open Graph tags, JSON-LD, and Core Web Vitals tuning pushed Lighthouse to 98/100. Lead capture form integrates with HubSpot via API.",
//     image: "https://picsum.photos/seed/agency-web/800/500",
//     tags: ["next.js", "gsap", "sanity-cms", "seo", "hubspot", "typescript"],
//     skills: ["react", "animations", "seo", "typescript", "tailwind"],
//     status: "completed",
//     featured: false,
//     githubUrl: "https://github.com",
//     liveUrl: "https://yourportfolio.dev",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "ai-content-tool",
//     title: "AI Content Generation Tool",
//     description:
//       "Next.js SaaS wrapping OpenAI GPT-4o with streaming responses, prompt templates, and Stripe subscription billing.",
//     longDesc:
//       "A niche SaaS product that lets marketers generate SEO-optimised blog drafts using GPT-4o. The Next.js frontend streams tokens via OpenAI's Edge runtime; a template library stores reusable prompts in Supabase. Stripe handles subscription tiers (Starter / Pro / Agency). Includes a custom WYSIWYG editor built on TipTap and one-click WordPress XML export.",
//     image: "https://picsum.photos/seed/ai-content-web/800/500",
//     tags: ["next.js", "openai", "supabase", "stripe", "tiptap", "typescript"],
//     skills: ["react", "typescript", "postgres", "nodejs"],
//     status: "in-progress",
//     featured: true,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "component-library",
//     title: "Open-Source Component Library",
//     description:
//       "Accessible, animated React component library (Storybook + Radix UI primitives) published to npm.",
//     longDesc:
//       "Curated a collection of 30+ production-ready React components built on Radix UI primitives with full ARIA compliance. Animated variants powered by Framer Motion; dark/light themes via CSS custom properties. Storybook documents every prop, slot, and interaction. Published to npm; tested with Vitest + Testing Library; typed with TypeScript strict mode.",
//     image: "https://picsum.photos/seed/component-lib-web/800/500",
//     tags: ["react", "radix-ui", "storybook", "typescript", "npm", "a11y"],
//     skills: ["react", "typescript", "animations", "figma"],
//     status: "completed",
//     featured: false,
//     githubUrl: "https://github.com",
//     liveUrl: "https://yourportfolio.dev",
//     timeline: {
//       endDate: "2025",
//     },
//   },
// ];
// export const Marketing: Project[] = [
//   {
//     id: "email-template-library",
//     title: "HTML Email Template Library",
//     description:
//       "30+ production-ready responsive email templates built in MJML — dark-mode aware, accessible, tested across 40+ clients including Gmail, Outlook, and Apple Mail.",
//     longDesc:
//       "Hand-coded a library of 30+ modular HTML email templates using MJML for reliable cross-client rendering. Every template supports dark mode via media queries and prefers-color-scheme, passes WCAG 2.1 AA colour contrast, and is tested across 40+ clients in Litmus. Modules include hero sections, product grids, countdown timers, dynamic coupon blocks, and multi-column layouts. Exported as Klaviyo-ready HTML, Mailchimp drag-and-drop, and raw MJML source.",
//     image: "https://picsum.photos/seed/email-templates-mktg/800/500",
//     tags: [
//       "html-email",
//       "mjml",
//       "klaviyo",
//       "dark-mode",
//       "accessibility",
//       "responsive",
//     ],
//     skills: ["html-email", "klaviyo", "copywriting"],
//     status: "completed",
//     featured: true,
//     liveUrl: "https://yourportfolio.dev",
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "n8n-lead-pipeline",
//     title: "N8N Lead Generation & Nurture Pipeline",
//     description:
//       "End-to-end lead capture → CRM enrich → email sequence automation built in N8N, processing 500+ leads/day with zero manual touch.",
//     longDesc:
//       "Built a fully automated lead pipeline in self-hosted N8N: form submissions hit a webhook, a GPT-4o node qualifies and scores the lead, Hunter.io enriches the contact, the record is pushed to HubSpot with tags, a personalised 5-email welcome sequence triggers via Klaviyo, and a Slack notification fires for high-score leads. Handles 500+ leads per day. Includes retry logic, error routing to a Telegram alert channel, and a Looker Studio dashboard tracking conversion at every stage.",
//     image: "https://picsum.photos/seed/n8n-pipeline-mktg/800/500",
//     tags: [
//       "n8n",
//       "hubspot",
//       "klaviyo",
//       "openai",
//       "webhooks",
//       "automation",
//       "lead-gen",
//     ],
//     skills: ["n8n", "ai-workflows", "hubspot", "klaviyo", "looker"],
//     status: "completed",
//     featured: true,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "ai-content-pipeline",
//     title: "AI Content Generation Pipeline",
//     description:
//       "N8N + OpenAI pipeline that drafts SEO blog posts from a keyword list, runs a readability pass, inserts internal links, and publishes to WordPress — fully hands-off.",
//     longDesc:
//       "Designed an AI content workflow in N8N triggered by a Google Sheets keyword list: GPT-4o generates a structured outline, a second pass writes the full post with keyword density controls, a Hemingway-style readability agent rewrites complex sentences, an internal link injector queries existing posts via the WordPress REST API and inserts contextual anchors, and the final post is scheduled via WP-JSON. Achieves a consistent Yoast SEO score of 85+ without human editing. Reduced content production cost by 70%.",
//     image: "https://picsum.photos/seed/ai-content-mktg/800/500",
//     tags: [
//       "n8n",
//       "openai",
//       "wordpress",
//       "seo",
//       "ai-workflows",
//       "content",
//       "automation",
//     ],
//     skills: ["n8n", "ai-workflows", "technical-seo", "copywriting"],
//     status: "completed",
//     featured: true,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "ga4-looker-dashboard",
//     title: "GA4 + Looker Studio Marketing Dashboard",
//     description:
//       "Executive-ready marketing dashboard blending GA4, Search Console, and ad platform data into a single Looker Studio report with automated weekly email delivery.",
//     longDesc:
//       "Built a multi-source Looker Studio dashboard that blends GA4 event data, Google Search Console impressions/clicks, Google Ads performance, and Klaviyo email metrics. Custom calculated fields surface ROAS, email-attributed revenue, top organic landing pages, and conversion funnel drop-off. Scheduled weekly PDF snapshots email to stakeholders automatically via the Looker Studio scheduling API. Reduced reporting time from 3 hours/week to fully automated.",
//     image: "https://picsum.photos/seed/looker-dashboard-mktg/800/500",
//     tags: [
//       "ga4",
//       "looker-studio",
//       "google-ads",
//       "search-console",
//       "reporting",
//       "analytics",
//     ],
//     skills: ["ga4", "looker", "ahrefs"],
//     status: "completed",
//     featured: false,
//     liveUrl: "https://yourportfolio.dev",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "abandoned-cart-automation",
//     title: "Abandoned Cart Recovery Automation",
//     description:
//       "Zapier + Klaviyo flow recovering abandoned Shopify carts with a 3-email sequence personalised by product category, cart value, and prior purchase history.",
//     longDesc:
//       "Configured a Zapier trigger on Shopify abandoned_checkout events that pushes customer + cart data to Klaviyo and fires a three-email sequence: 1hr reminder with product images, 24hr social-proof email with reviews, 72hr discount code for first-time buyers only (suppressed for repeat purchasers). Personalisation tokens pull product category, cart value tier, and prior order count from Klaviyo profiles. Achieved a 22% cart recovery rate — double the industry average. All emails pass Litmus spam testing and render correctly in dark mode.",
//     image: "https://picsum.photos/seed/abandoned-cart-mktg/800/500",
//     tags: [
//       "zapier",
//       "klaviyo",
//       "shopify",
//       "email",
//       "automation",
//       "ecommerce",
//       "personalization",
//     ],
//     skills: ["zapier", "klaviyo", "html-email", "copywriting"],
//     status: "completed",
//     featured: false,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "seo-audit-system",
//     title: "Automated Technical SEO Audit System",
//     description:
//       "Python + N8N pipeline that crawls a site weekly, scores 40 technical SEO factors, and delivers a prioritised Notion report with fix instructions.",
//     longDesc:
//       "Built a weekly SEO health system using Screaming Frog CLI triggered by an N8N cron, combined with Google Search Console API and PageSpeed Insights API data. A Python script scores 40 factors (Core Web Vitals, canonical errors, missing meta, broken internal links, structured data validity, hreflang mismatches). Results are pushed to a Notion database with priority scores and templated fix instructions. A Slack summary posts the top 5 issues every Monday morning. Reduced time-to-fix critical SEO errors from weeks to days.",
//     image: "https://picsum.photos/seed/seo-audit-mktg/800/500",
//     tags: [
//       "n8n",
//       "python",
//       "seo",
//       "search-console",
//       "core-web-vitals",
//       "notion",
//       "automation",
//     ],
//     skills: ["n8n", "technical-seo", "ahrefs", "ai-workflows"],
//     status: "completed",
//     featured: true,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "drip-campaign-system",
//     title: "Multi-Channel Drip Campaign System",
//     description:
//       "HubSpot + Klaviyo + SMS drip system segmenting leads across 6 lifecycle stages, with conditional branching based on engagement scores and product interest.",
//     longDesc:
//       "Architected a 6-stage lifecycle email + SMS system across HubSpot and Klaviyo: Awareness (3 emails), Consideration (5 emails + retargeting audience sync to Meta), Decision (3 emails with case studies), Onboarding (7-email sequence with conditional logic by product tier), Retention (monthly digest + NPS survey), and Win-back (dormant re-engagement with progressive discounts). Conditional branches fire based on HubSpot lead score, email engagement rate, and product interest tags. Total sequence: 22 touchpoints, 0 manual sends.",
//     image: "https://picsum.photos/seed/drip-campaign-mktg/800/500",
//     tags: [
//       "hubspot",
//       "klaviyo",
//       "email",
//       "sms",
//       "drip",
//       "segmentation",
//       "lifecycle",
//     ],
//     skills: ["hubspot", "klaviyo", "copywriting", "html-email"],
//     status: "completed",
//     featured: false,
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "zapier-social-automation",
//     title: "AI Social Media Content Automation",
//     description:
//       "Make.com + OpenAI pipeline that repurposes blog posts into platform-native social content for LinkedIn, X, and Instagram — scheduled and posted automatically.",
//     longDesc:
//       "Built a Make.com scenario that monitors an RSS feed for new blog posts, sends the content to GPT-4o with platform-specific system prompts (LinkedIn thought-leadership, X thread format, Instagram caption + hashtags), generates a matching hero image via DALL-E 3, schedules posts via Buffer API, and logs every piece of content to an Airtable content calendar. Produces 12–18 social posts per blog article. Reduced social content production time by 85% while maintaining a consistent brand voice defined in system prompt guidelines.",
//     image: "https://picsum.photos/seed/social-automation-mktg/800/500",
//     tags: [
//       "make.com",
//       "openai",
//       "social-media",
//       "automation",
//       "buffer",
//       "airtable",
//       "ai-workflows",
//     ],
//     skills: ["zapier", "ai-workflows", "copywriting", "n8n"],
//     status: "in-progress",
//     featured: true,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
// ];

// export const Hardware: Project[] = [
//   {
//     id: "smart-irrigation",
//     title: "Smart Irrigation Controller",
//     description:
//       "ESP32-based system with soil moisture sensors, weather API integration, and MQTT-driven automation.",
//     longDesc:
//       "Built a fully autonomous garden irrigation system using an ESP32 microcontroller with capacitive soil moisture sensors. Integrates real-time weather data to skip watering on rainy days and uses MQTT to push telemetry to an AWS IoT Core dashboard. Firmware written in C++ with FreeRTOS task scheduling for sensor polling, network sync, and valve actuation.",
//     image: "https://picsum.photos/seed/irrigation-hw/800/500",
//     tags: ["esp32", "freertos", "mqtt", "aws-iot", "c++", "sensors"],
//     skills: ["esp32", "rtos", "mqtt", "awsiot", "cpp"],
//     status: "completed",
//     featured: true,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "embedded-motor-ctrl",
//     title: "Brushless Motor Controller",
//     description:
//       "Custom STM32-based BLDC motor controller with FOC algorithm and real-time telemetry over UART.",
//     longDesc:
//       "Designed and implemented a field-oriented control (FOC) algorithm on an STM32F4 for a brushless DC motor. Custom PCB designed in KiCad featuring gate driver ICs, current sensing shunts, and isolated UART for PC-side telemetry logging. Achieved sub-millisecond loop times using DMA-based ADC sampling.",
//     image: "https://picsum.photos/seed/motorctrl-hw/800/500",
//     tags: ["stm32", "bldc", "foc", "kicad", "pcb", "c++", "uart"],
//     skills: ["stm32", "pcb", "i2c", "cpp", "kicad"],
//     status: "completed",
//     featured: true,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "homelab-cluster",
//     title: "Raspberry Pi Kubernetes Cluster",
//     description:
//       "4-node ARM cluster running K3s, Prometheus, and Grafana — full homelab CI/CD testbed.",
//     longDesc:
//       "Built a 4-node Raspberry Pi 4 cluster running K3s (lightweight Kubernetes). Custom 3D-printed rack, PoE HATs for clean power, and a managed switch for inter-node networking. Hosts a self-contained CI/CD environment with Gitea, Drone CI, Prometheus, and Grafana dashboards for cluster metrics.",
//     image: "https://picsum.photos/seed/rpicluster-hw/800/500",
//     tags: [
//       "raspberry-pi",
//       "kubernetes",
//       "k3s",
//       "linux",
//       "devops",
//       "networking",
//     ],
//     skills: ["rpi", "python", "mqtt"],
//     status: "completed",
//     featured: false,
//     githubUrl: "https://github.com",
//     liveUrl: "https://yourportfolio.dev",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "iot-weather",
//     title: "IoT Environmental Monitor",
//     description:
//       "Multi-sensor ESP32 node network posting temperature, humidity, CO₂ and AQI data to InfluxDB.",
//     longDesc:
//       "Deployed a mesh of 6 ESP32 nodes around a building collecting temperature, humidity, CO₂ (SCD40), and particulate matter (PMS5003) data. Nodes communicate over MQTT, data is ingested by an InfluxDB instance on a Raspberry Pi, and visualised in Grafana. PCBs designed in KiCad with LiPo charging circuits for portability.",
//     image: "https://picsum.photos/seed/envmonitor-hw/800/500",
//     tags: ["esp32", "sensors", "mqtt", "influxdb", "grafana", "pcb"],
//     skills: ["esp32", "mqtt", "pcb", "i2c", "cpp"],
//     status: "completed",
//     featured: false,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "keyboard-firmware",
//     title: "Custom Keyboard Firmware (QMK)",
//     description:
//       "Hand-wired 65% keyboard with custom QMK firmware, RGB per-key lighting, and macro layers.",
//     longDesc:
//       "Hand-wired a 65% mechanical keyboard on a custom PCB using Pro Micro controllers. Wrote and extended QMK firmware in C for tap-dance keys, leader sequences, RGB Matrix animations, and OLED secondary display support. Designed the PCB in KiCad and had it fabricated at JLCPCB.",
//     image: "https://picsum.photos/seed/keyboard-hw/800/500",
//     tags: ["qmk", "avr", "arduino", "c", "pcb", "kicad", "rgb"],
//     skills: ["arduino", "cpp", "pcb", "kicad"],
//     status: "completed",
//     featured: false,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "rtos-drone-fc",
//     title: "FreeRTOS Drone Flight Controller",
//     description:
//       "STM32-based flight controller with IMU fusion, PID attitude control, and RC receiver decoding.",
//     longDesc:
//       "Developed a bare-metal drone flight controller on an STM32F7 running FreeRTOS. IMU data (MPU-6050) is fused using a complementary filter at 1kHz. PID attitude loops run in high-priority tasks. RC PWM input is decoded via TIM input capture, and ESC signals are output via DMA-driven TIM PWM channels.",
//     image: "https://picsum.photos/seed/dronefc-hw/800/500",
//     tags: ["stm32", "freertos", "imu", "pid", "pwm", "c++", "drone"],
//     skills: ["stm32", "rtos", "cpp", "i2c"],
//     status: "in-progress",
//     featured: true,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "embedded-linux-gateway",
//     title: "Industrial IoT Gateway",
//     description:
//       "Embedded Linux gateway on Yocto-built image bridging Modbus RTU devices to AWS IoT Core.",
//     longDesc:
//       "Designed an industrial IoT gateway running a minimal Yocto Linux image on a custom SOM. The gateway reads Modbus RTU data from factory sensors via RS-485, translates to MQTT JSON payloads, and forwards to AWS IoT Core with X.509 certificate-based authentication. Manages OTA firmware updates via a custom update agent.",
//     image: "https://picsum.photos/seed/iotgateway-hw/800/500",
//     tags: ["embedded-linux", "yocto", "modbus", "mqtt", "aws-iot", "rs485"],
//     skills: ["awsiot", "mqtt", "cpp", "python", "i2c"],
//     status: "completed",
//     featured: false,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
//   {
//     id: "homelab-sensors",
//     title: "Homelab Infrastructure Monitor",
//     description:
//       "Arduino-based rack monitor with temp sensors, relay-controlled fans, and web dashboard.",
//     longDesc:
//       "Built a rack-mounted Arduino Mega system that monitors ambient temperature in a server cabinet using DS18B20 sensors on a 1-Wire bus. Relay module controls cabinet fans based on configurable thresholds. An ESP32 bridge publishes metrics to an MQTT broker consumed by a Node-RED dashboard with alert notifications via Telegram.",
//     image: "https://picsum.photos/seed/hlabimon-hw/800/500",
//     tags: ["arduino", "1-wire", "relay", "mqtt", "node-red", "telegram"],
//     skills: ["arduino", "esp32", "mqtt", "i2c", "cpp"],
//     status: "completed",
//     featured: false,
//     githubUrl: "https://github.com",
//     timeline: {
//       endDate: "2025",
//     },
//   },
// ];
