import { motion, useScroll, useTransform } from "framer-motion";
import { Code, TrendingUp } from "lucide-react";
import { useRef } from "react";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "@/types/experience";


const experiences: Experience[] = [
    {
        id: 1,
        title: "Senior Software Engineer",
        company: "Maqsad Pvt. Ltd.",
        location: "Karachi, Pakistan (Remote)",
        period: "Aug 2021 – Oct 2025",
        description: "Developed and maintained the Maqsad web platform, ensuring 100% visual consistency with Figma designs and high performance for over 1 million users. Partnered with Product and Marketing teams to translate curriculum requirements into functional, accessible web features.",
        technologies: [
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Next.js",
            "NestJS",
            "Node.js",
            "Express.js",
            "HTML",
            "CSS",
            "Git",
            "CI/CD",
            "GitHub Actions",
            "Docker",
            "RESTful APIs",
            "Postman"],
        achievements: [
            "Developed and maintained the Maqsad web platform using Tailwind CSS, ensuring 100% visual consistency with Figma designs and high performance for over 1 million users.",
            "Partnered closely with Product and Marketing teams to translate curriculum requirements into functional, accessible web features, contributing to a 30% improvement in UX metrics.",
            "Designed and deployed custom internal React portals, streamlining content management workflows by 40% through reusable component architecture.",
            "Ensured cross-browser compatibility and optimized asset delivery for mobile-first users in low-bandwidth environments."
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
        description: "Led frontend development for diverse client projects, focusing on responsive layouts and fine-tuning spacing/typography to ensure a premium feel across desktop and mobile. Collaborated in cross-functional teams across the full SDLC for 5+ custom applications.",
        technologies: [
            "JavaScript",
            "HTML",
            "CSS",
            "React",
            "Git",
            "RESTful APIs"
        ],
        achievements: [
            "Led the frontend development for diverse client projects, focusing on responsive layouts and fine-tuning spacing/typography to ensure a premium feel across desktop and mobile.",
            "Implemented naming conventions and modular CSS/JS patterns to ensure long-term maintainability of client codebases.",
            "Collaborated in a cross-functional team across the full SDLC for 5+ custom applications, delivering high-quality UI details under tight scale-up deadlines."
        ],
        icon: Code,
        color: "from-orange-500 to-red-600"
    },
    // {
    //     id: 4,
    //     title: "Android Engineer Intern",
    //     company: "Rove Apps Pvt. Ltd.",
    //     location: "Karachi, Pakistan",
    //     period: "Sep 2020 - Dec 2020",
    //     description: "Contributed to the end-to-end development of Android applications, working across diverse product domains to deliver robust and user-centric mobile solutions.",
    //     technologies: ["Kotlin", "Java", "Android Studio", "Jetpack Compose", "Firebase", "Git", "RESTful APIs", "Retrofit"],
    //     achievements: [
    //         "Led Android development for a client’s e-commerce platform, integrating advanced features that increased user engagement.",
    //         "Developed and deployed a personalized mobile health app, highlighting versatility in domain-specific mobile development.",
    //         "Delivered 5+ custom Android apps in collaboration with cross-functional teams, ensuring timely releases and full SDLC coverage."
    //     ],
    //     icon: Award,
    //     color: "from-cyan-500 to-blue-600"
    // }
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