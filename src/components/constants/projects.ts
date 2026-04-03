// src/constants/projects.ts

export interface Project {
  id: string; 
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;

}

export const PROJECTS: Project[] = [

  {
    id: "ecommerce",
    title: "Full-Stack E-Commerce Platform",
    description:
      "A scalable e-commerce platform with secure authentication, product management, and Stripe payments. Built with a modern full-stack architecture focused on performance and user experience.",
    tags: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    image: "/projects/ecommerce.png",
    liveUrl: "https://ecommerce-frontend-alpha-gray.vercel.app/",
    githubUrl: "https://github.com/Mohamed-Gamal-code/ecommerce-frontend"
  },

  {
    id: "medicare",
    title: "DocConnect – Healthcare Booking Platform",
    description:
      "A full-stack healthcare appointment system with secure authentication and real-time booking. Designed with a clean UI and optimized for performance and accessibility.",
    tags: ["Next.js", "TypeScript", "Clerk", "MongoDB", "Tailwind CSS", "REST API"],
    image: "/projects/medicare.png",
    liveUrl: "https://medicare-platform-gamma.vercel.app/",
    githubUrl: "https://github.com/Mohamed-Gamal-code/doc-connect"
  },

  {
    id: "luxestay",
    title: "Luxestay – Hotel Booking Experience",
    description:
      "A modern hotel booking platform delivering a seamless reservation experience with dynamic data handling and optimized performance using server-side features.",
    tags: ["Next.js", "TypeScript", "Supabase", "Server Actions", "Tailwind CSS"],
    image: "/projects/luxestay.png",
    liveUrl: "https://luxestay-guest-platform.vercel.app/",
    githubUrl: "https://github.com/Mohamed-Gamal-code/luxestay-guest-experience"
  },

  {
    id: "portfolio",
    title: "Personal Portfolio v1",
    description:
      "My first portfolio showcasing projects and frontend skills, built with a focus on animations, responsiveness, and clean UI design.",
    tags: ["React.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    image: "/projects/portfolio.png",
    liveUrl: "https://mohamed-gamal-space.vercel.app/",
    githubUrl: "https://github.com/Mohamed-Gamal-code/my-portfolio"
  }

];