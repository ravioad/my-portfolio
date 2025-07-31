import { useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/project";

gsap.registerPlugin(ScrollTrigger);
const projects: Project[] = [
    {
        id: 1,
        title: "Maqsad App (Android)",
        description: "With over 1M+ downloads, the Maqsad Android app offers a mobile-first learning experience for exam prep, featuring interactive content and AI-powered doubt resolution.",
        image: "/images/maqsad-app.png",
        tech: ["Kotlin","Jetpack Compose", "Retrofit", "Socket.io", "Node.js (Backend)", "OpenAI"],
        github: null,
        demo: "https://play.google.com/store/apps/details?id=io.maqsad&hl=en",
        featured: true,
        category: "Mobile"
    },
    {
        id: 2,
        title: "Online E-learning Website (Maqsad.io)",
        description: "Maqsad.io is an online learning platform for university entrance exam prep. It offers live classes, video lectures, and a vast MCQ bank, providing an accessible and personalized educational experience.",
        image: "/images/maqsad-website.png",
        tech: ["Next.js","React", "Node.js", "OpenAI", "Socket.io"],
        github: null,
        demo: "https://maqsad.io/app/mdcat",
        featured: false,
        category: "Full-Stack"
    },
    {
        id: 3,
        title: "Artifex Studio",
        description: "An advanced AI-powered content creation platform built for efficiency. Generate unique articles, marketing copy, and creative content with intelligent AI models, backed by secure authentication and a robust backend.",
        image: "/images/artifex-studio.png",
        tech: ["Next.js",
            "React",
            "TypeScript",
            "Express.js",
            "Supabase",
            "OAuth 2.0",
            "Tailwind CSS",
            "Generative AI"],
        github: "https://github.com/ravioad/artifex-studio",
        demo: "https://artifex-studio.ravikumaroad.com",
        featured: false,
        category: "Web"
    },
    {
        id: 4,
        title: "Personal Portfolio",
        description: "A modern, responsive portfolio website built with Next.js, featuring smooth animations, interactive components, and a clean design showcasing my projects and skills.",
        image: "/images/portfolio.png",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Lucide Icons"],
        github: "https://github.com/ravioad/my-portfolio",
        demo: "https://www.ravikumaroad.com",
        featured: false,
        category: "Web"
    },
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
            gsap.utils.toArray(".project-card").forEach((card: unknown) => {
                if (card instanceof Element) {
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
                    );
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

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

                <div ref={containerRef} className="projects-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                        {projects.map((project) => (
                            <ProjectCard project={project} key={project.id} />
                        ))}
                    </div>
                
                </div>
                {/* View All Projects Button */}
                {/* <motion.div
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
                </motion.div> */}
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