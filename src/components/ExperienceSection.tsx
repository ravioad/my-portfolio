import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Code, TrendingUp } from "lucide-react";
import { useRef } from "react";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "@/types/experience";


const experiences: Experience[] = [
    {
        id: 1,
        title: "Senior Software Engineer",
        company: "Maqsad Pvt. Ltd.",
        location: "Karachi, Pakistan",
        period: "Aug 2021 - Present",
        description: "Leading development of AI-powered web applications, mentoring junior developers, and implementing best practices for scalable architecture.",
        technologies: ["React", "Node.js", "Python", "AWS", "Docker"],
        achievements: [
            "Reduced application load time by 40% through optimization",
            "Led a team of 5 developers on major client projects",
            "Implemented CI/CD pipeline reducing deployment time by 60%"
        ],
        icon: TrendingUp,
        color: "from-purple-500 to-pink-600"
    },
    {
        id: 2,
        title: "Android Engineer",
        company: "Rove Apps Pvt. Ltd.",
        location: "Karachi, Pakistan",
        period: "Jan 2021 - Sep 2021",
        description: "Developed machine learning models for natural language processing and computer vision applications.",
        technologies: ["Python", "TensorFlow", "PyTorch", "FastAPI", "PostgreSQL"],
        achievements: [
            "Built NLP model achieving 95% accuracy on sentiment analysis",
            "Deployed ML models serving 1M+ daily requests",
            "Published 2 research papers on AI applications"
        ],
        icon: Code,
        color: "from-orange-500 to-red-600"
    },
    // {
    //     id: 3,
    //     title: "Frontend Developer",
    //     company: "Creative Digital Agency",
    //     location: "Los Angeles, CA",
    //     period: "2020 - 2021",
    //     description: "Created interactive web experiences and animations for high-profile clients in entertainment and e-commerce.",
    //     technologies: ["React", "Three.js", "GSAP", "WebGL", "TypeScript"],
    //     achievements: [
    //         "Developed award-winning interactive website for major brand",
    //         "Improved user engagement by 150% through animations",
    //         "Mentored 3 junior developers in modern frontend practices"
    //     ],
    //     icon: TrendingUp,
    //     color: "from-green-500 to-emerald-600"
    // },
    {
        id: 4,
        title: "Android Engineer Intern",
        company: "Rove Apps Pvt. Ltd.",
        location: "Karachi, Pakistan",
        period: "Sep 2020 - Dec 2020",
        description: "Full-stack development focusing on building scalable web applications and APIs.",
        technologies: ["JavaScript", "Express.js", "MongoDB", "React", "Docker"],
        achievements: [
            "Built complete e-commerce platform from scratch",
            "Implemented real-time chat functionality",
            "Contributed to open-source projects with 100+ stars"
        ],
        icon: Award,
        color: "from-cyan-500 to-blue-600"
    }
];

export default function ExperienceSection() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

    return (
        <section ref={sectionRef} className="relative min-h-screen py-20 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
            {/* Background Elements */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 opacity-10"
            >
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-3xl" />
            </motion.div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    style={{ opacity }}
                    className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="gradient-text">Experience</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        My professional journey in software development and AI engineering
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative flex flex-col items-center">
                    <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-cyan-400/40 via-blue-500/30 to-purple-400/30 rounded-full -translate-x-1/2 z-0 origin-top shadow"
                    />
                    {/* Timeline Items */}
                    <div className="flex flex-col gap-24 w-full items-center">
                        {experiences.map((experience, index) => (
                            <ExperienceCard key={experience.id} experience={experience} index={index} />
                        ))}
                    </div>
                </div>
                {/* Download Resume Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mt-24">
                    <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-2xl font-semibold glow hover:glow transition-all duration-300">
                        Download Full Resume
                    </motion.button>
                </motion.div>
            </div>

        </section>
    );
}