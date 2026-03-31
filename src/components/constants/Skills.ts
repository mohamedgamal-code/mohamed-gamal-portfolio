/** @format */

export type SkillCategory = "frontend" | "backend" | "tools";

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: string;
}

export const SKILLS: Skill[] = [
  // ── Frontend ──────────────────────────
  { name: "HTML5", category: "frontend", icon: "SiHtml5" },
  { name: "CSS3", category: "frontend", icon: "SiCss3" },
  { name: "JavaScript", category: "frontend", icon: "SiJavascript" },
  { name: "TypeScript", category: "frontend", icon: "SiTypescript" },
  { name: "React", category: "frontend", icon: "SiReact" },
  { name: "Next.js", category: "frontend", icon: "SiNextdotjs" },
  { name: "Tailwind CSS", category: "frontend", icon: "SiTailwindcss" },
  { name: "Framer Motion", category: "frontend", icon: "SiFramer" },
  { name: "shadcn/ui", category: "frontend", icon: "SiShadcnui" },

  // ── Backend ───────────────────────────
  { name: "Node.js", category: "backend", icon: "SiNodedotjs" },
  { name: "Express", category: "backend", icon: "SiExpress" },
  { name: "GraphQL", category: "backend", icon: "SiGraphql" },
  { name: "MongoDB", category: "backend", icon: "SiMongodb" },
  { name: "PostgreSQL", category: "backend", icon: "SiPostgresql" },
  { name: "Prisma", category: "backend", icon: "SiPrisma" },
  { name: "Redis", category: "backend", icon: "SiRedis" },
  { name: "Supabase", category: "backend", icon: "SiSupabase" },

  // ── Tools ─────────────────────────────
  { name: "Git", category: "tools", icon: "SiGit" },
  { name: "GitHub", category: "tools", icon: "SiGithub" },
  { name: "Docker", category: "tools", icon: "SiDocker" },
  { name: "Figma", category: "tools", icon: "SiFigma" },
  { name: "VS Code", category: "tools", icon: "SiVisualstudiocode" },
  { name: "Postman", category: "tools", icon: "SiPostman" },
  { name: "Vercel", category: "tools", icon: "SiVercel" },
  { name: "Linux", category: "tools", icon: "SiLinux" },
];

export const getSkillsByCategory = (category: SkillCategory): Skill[] =>
  SKILLS.filter((s) => s.category === category);

export const SKILL_CATEGORIES = [
  {
    key: "frontend" as SkillCategory,
    label: "Frontend",
    subtitle: "UI & Client-side",
    description:
      "// crafting high-performance and interactive user experiences",
  },
  {
    key: "backend" as SkillCategory,
    label: "Backend",
    subtitle: "Server & Databases",
    description: "// designing scalable architectures and efficient APIs",
  },
  {
    key: "tools" as SkillCategory,
    label: "Tools",
    subtitle: "Dev Workflow",
    description:
      "// tools that streamline development and deployment workflows",
  },
] as const;
