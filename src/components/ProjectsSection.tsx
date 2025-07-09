import { useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { ArrowRight } from "lucide-react";
import { Project } from "@/types/project";

gsap.registerPlugin(ScrollTrigger);
const projects: Project[] = [
    {
        id: 1,
        title: "AI-Powered Chat Application",
        description: "A real-time chat application with AI-powered responses, sentiment analysis, and smart suggestions.",
        image: "/images/image-1.png",
        tech: ["React", "Node.js", "OpenAI", "Socket.io"],
        github: "https://github.com/ravioad/creator-pulse",
        demo: "https://creator-pulse.ravikumaroad.com",
        featured: true,
        category: "AI/ML"
    },
    {
        id: 2,
        title: "Creative Coding Platform",
        description: "An interactive platform for creating generative art and visual effects using WebGL and shaders.",
        image: "/api/placeholder/400/250",
        tech: ["Three.js", "WebGL", "TypeScript", "Vite"],
        github: "#",
        demo: "#",
        featured: false,
        category: "Web"
    },
    {
        id: 3,
        title: "E-Commerce Dashboard",
        description: "A comprehensive dashboard for managing e-commerce operations with real-time analytics.",
        image: "/api/placeholder/400/250",
        tech: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "React", "Framer Motion", "GSAP", "Tailwind"],
        github: "#",
        demo: "#",
        featured: false,
        category: "Full-Stack"
    },
    {
        id: 4,
        title: "Portfolio Website",
        description: "A modern, animated portfolio website with smooth scrolling and interactive elements.",
        image: "/api/placeholder/400/250",
        tech: ["React", "Framer Motion", "GSAP", "Tailwind"],
        github: "#",
        demo: "#",
        featured: false,
        category: "Web"
    },
    {
        id: 5,
        title: "Task Management API",
        description: "A RESTful API for task management with authentication, real-time updates, and file uploads.",
        image: "/api/placeholder/400/250",
        tech: ["Express.js", "MongoDB", "JWT", "Multer"],
        github: "#",
        featured: true,
        demo: "#",
        category: "Web"

    }
];

export default function ProjectsSection() {

    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".project-card",
                {
                    opacity: 0, y: 100, scale: 0.8
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: ".projects-container",
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            )
            gsap.utils.toArray(".project-card").forEach((card: any, i) => {
                gsap.to(card,
                    {
                        y: -30,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        }
                    }
                )
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-screen py-20 bg-black overflow-hidden">
            {/* Background Elements */}
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
                {/* Projects Container */}

                <div ref={containerRef} className="projects-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {projects.map((project) => (
                            <ProjectCard project={project} key={project.id} />
                        ))}
                    </div>
                
                </div>
                {/* View All Projects Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mt-16">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 border-2 border-cyan-500 text-cyan-500 rounded-2xl font-semibold hover:bg-cyan-500 hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
                        View All Projects
                    </motion.button>
                </motion.div>
            </div>

            <style jsx>{`
                        .scrollbar-hide {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }  
                        .scrollbar-hide::-webkit-scrollbar {
                            display: none;
                        }
        
                        .line-clamp-3 {
                            display: -webkit-box;
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                    }
                    `}
            </style>
        </section>
    );
}