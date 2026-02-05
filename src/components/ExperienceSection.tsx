import { motion, useScroll, useTransform } from "framer-motion";
import { Code, TrendingUp } from "lucide-react";
import { useRef } from "react";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "@/types/experience";


const experiences: Experience[] = [
    {
        id: 1,
        title: "Software Engineer",
        company: "Maqsad Pvt. Ltd.",
        location: "Karachi, Pakistan",
        period: "Aug 2021 – Oct 2025 (Remote)",
        description: "Owned backend and full-stack features for a large-scale educational platform with over 1M users, translating complex business and curriculum requirements into reliable production systems.",
        technologies: [
            "React",
            "TypeScript",
            "Node.js",
            "NestJS",
            "Express.js",
            "RESTful APIs",
            "Git",
            "PostgreSQL",
            "CI/CD",
            "GitHub Actions",
            "Docker"
        ],
        achievements: [
            "Owned backend and full-stack features for a large-scale educational platform with over 1M users, translating complex business and curriculum requirements into reliable production systems.",
            "Built and maintained internal web-based tools used daily by operations and content teams, improving workflow efficiency by approximately 40%.",
            "Designed and implemented APIs and backend logic supporting reporting, content management, and user-facing features.",
            "Worked closely with product, design, and QA to deliver high-impact features while maintaining system stability.",
            "Took responsibility for production issues, debugging data-related and backend problems under real-world constraints."
        ],
        icon: TrendingUp,
        color: "from-purple-500 to-pink-600"
    },
    {
        id: 2,
        title: "Mobile Developer",
        company: "Rove Apps",
        location: "Karachi, Pakistan",
        period: "Sep 2020 – July 2021",
        description: "Led Android development for client e-commerce and multi-domain projects, collaborating across the full development lifecycle.",
        technologies: [
            "Kotlin",
            "Java",
            "Android Studio",
            "RESTful APIs",
            "Git"
        ],
        achievements: [
            "Led Android development for a client e-commerce application, implementing business-critical features and integrating backend APIs.",
            "Delivered multiple client projects across different domains, collaborating across the full development lifecycle.",
            "Gained early experience working with complex state, user flows, and production deadlines."
        ],
        icon: Code,
        color: "from-orange-500 to-red-600"
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
                {/* <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mt-24">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            const link = document.createElement('a');
                            link.href = '/resume.pdf';
                            link.download = 'Ravi_Kumar_Resume.pdf';
                            link.target = '_blank';
                            
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }}
                        className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-2xl font-semibold glow hover:glow transition-all duration-300">
                        Download Full Resume
                    </motion.button>
                </motion.div> */}
            </div>

        </section>
    );
}