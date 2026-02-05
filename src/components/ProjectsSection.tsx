import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/project";

// Move projects data outside component to prevent recreation
const projects: Project[] = [
    {
        id: 1,
        title: "Maqsad App (Android)",
        description: "With over 1M+ downloads, the Maqsad Android app offers a mobile-first learning experience for exam prep, featuring interactive content and AI-powered doubt resolution.",
        image: "/images/maqsad-app.png",
        tech: ["Kotlin", "Jetpack Compose", "Retrofit", "Socket.io", "Node.js (Backend)", "OpenAI"],
        github: null,
        demo: "https://play.google.com/store/apps/details?id=io.maqsad&hl=en",
        featured: true,
        category: "Mobile"
    },
    {
        id: 2,
        title: "Maqsad Website",
        description: "Engineered a high-performance educational storefront serving 1M+ active users with optimized page load times. Led a comprehensive migration to a utility-first Tailwind architecture, reducing CSS bundle size by 65% and significantly increasing developer velocity.",
        image: "/images/maqsad-website.png",
        tech: ["React", "TypeScript", "Tailwind CSS", "NestJS", "WebSocket", "OpenAI"],
        github: null,
        demo: "https://maqsad.io/app/mdcat",
        featured: true,
        category: "Full-Stack"
    },
    {
        id: 3,
        title: "Artifex Studio",
        description: "An advanced AI-powered content creation platform featuring reusable, accessible UI components with 100% visual fidelity to Figma prototypes. Includes production-grade authentication with JWT-based security and optimized LLM prompt engineering workflows for multi-step content generation.",
        image: "/images/artifex-studio.png",
        tech: ["Next.js",
            "Express.js",
            "Supabase",
            "TypeScript",
            "OpenAI API",
            "Tailwind CSS"],
        github: null,
        demo: "https://artifex-studio.ravikumaroad.com",
        featured: false,
        category: "Web"
    },
    // {
    //     id: 4,
    //     title: "Personal Portfolio",
    //     description: "A modern, responsive portfolio website built with Next.js, featuring smooth animations, interactive components, and a clean design showcasing my projects and skills.",
    //     image: "/images/portfolio.png",
    //     tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Lucide Icons"],
    //     github: "https://github.com/ravioad/my-portfolio",
    //     demo: "https://www.ravikumaroad.com",
    //     featured: false,
    //     category: "Web"
    // },
];

export default function ProjectsSection() {

    const sectionRef = useRef<HTMLElement>(null);
    const [reduceMotion, setReduceMotion] = useState(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReduceMotion(mediaQuery.matches);

        const handleChange = () => setReduceMotion(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Container animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: reduceMotion ? 0 : 0.2,
                duration: reduceMotion ? 0.3 : 0.6
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: reduceMotion ? 0 : 50,
            scale: reduceMotion ? 1 : 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: reduceMotion ? 0.2 : 0.6,
                ease: [0.25, 0.1, 0.25, 1] as const
            }
        }
    };

    return (
        <section ref={sectionRef} className="relative min-h-screen py-20 bg-black overflow-hidden">
            <motion.div
                style={{ y }}
                className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-3xl"></div>
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                <motion.div
                    style={{ opacity }}
                    className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="gradient-text">Featured Projects</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        A collection of my recent work showcasing full-stack development, AI integration, and creative coding
                    </p>

                </motion.div>

                <motion.div
                    className="projects-container"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                        {projects.map((project) => (
                            <motion.div key={project.id} variants={itemVariants}>
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
