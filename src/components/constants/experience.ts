/** @format */

export type ExperienceType = "Full-time" | "Freelance" | "Contract";

export interface Experience {
  id: string; 
  type: ExperienceType;
  tech: string[];
  current?: boolean;
  company: string;
  role: string;
  location: string;
  from: string;
  to: string;
  description: string;
  tasks: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    id: "freelancer", 
    company: "Independent Freelancer",
    role: "Full Stack Engineer",
    type: "Freelance",
    location: "Remote (Global)",
    from: "Jan 2024",
    to: "Present",
    current: true,
    description:
      "Working with international clients to design and deliver scalable, production-ready web applications with a strong focus on performance, SEO, and user experience.",
    tasks: [
      "Built and deployed full-stack applications using Next.js, Node.js, and TypeScript.",
      "Designed scalable RESTful APIs and backend architectures for high-performance systems.",
      "Optimized frontend performance, achieving 90+ Lighthouse scores across multiple projects.",
      "Integrated third-party services such as Stripe (payments) and AWS (storage & deployment).",
      "Collaborated directly with clients to translate business requirements into technical solutions.",
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "agency", 
    company: "Remote Digital Agency",
    role: "Backend Engineer",
    type: "Contract",
    location: "Remote",
    from: "Mar 2023",
    to: "Dec 2023",
    description:
      "Contributed to building scalable backend systems for SaaS products in a fully remote, asynchronous environment.",
    tasks: [
      "Developed and maintained backend services using Node.js and TypeScript.",
      "Designed optimized database schemas for high concurrency and performance.",
      "Implemented secure authentication systems using JWT and RBAC.",
      "Refactored legacy codebases into clean, maintainable TypeScript architectures.",
      "Participated in code reviews and improved overall code quality and best practices.",
    ],
    tech: ["Node.js", "TypeScript", "MongoDB", "Prisma", "Docker", "Git"],
  },
  {
    id: "solutions", 
    company: "Software Solutions Co.",
    role: "Frontend Engineer",
    type: "Full-time",
    location: "Cairo, Egypt",
    from: "Jan 2022",
    to: "Feb 2023",
    description:
      "Built modern, responsive, and user-friendly interfaces while collaborating closely with design and product teams.",
    tasks: [
      "Developed reusable and scalable React components with clean architecture.",
      "Implemented responsive UI designs with a focus on accessibility and usability.",
      "Managed application state using Redux and Zustand.",
      "Improved performance through lazy loading and code splitting techniques.",
      "Worked closely with designers and product managers in agile workflows.",
    ],
    tech: ["React", "JavaScript", "Redux", "Sass", "Figma"],
  },
];

export const TYPE_STYLES: Record<ExperienceType, string> = {
  "Full-time": "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/8",
  Freelance: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/8",
  Contract: "border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/8",
};