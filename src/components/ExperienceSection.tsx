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
        description: "Developed Maqsad on Google Play and website, translating educational curriculum requirements into functional app features and ensuring high-quality releases. Collaborated to design, develop, and deploy custom internal tools (React website, portal).",
        technologies: [
            "Kotlin",
            "TypeScript",
            "Python",
            "React",
            "Next.js",
            "HTML",
            "CSS",
            "Firebase",
            "Google Cloud",
            "AWS",
            "DynamoDB",
            "Git",
            "CI/CD",
            "GitHub Actions",
            "Docker",
            "RESTful APIs",
            "GraphQL",
            "Postman"],
        achievements: [
            "Developed Maqsad on Google Play, reaching over a million downloads on Google Play Store by translating educational curriculum requirements into functional app features and ensuring high-quality releases.",
            "Developed the Maqsad website, ensuring high-quality releases and translating educational curriculum requirements into functional application features.",
            "Collaborated with internal stakeholders to design, develop, and deploy custom internal tools (React website, portal), significantly enhancing business process efficiency and streamlining content management workflows by 40%"
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
        description: "Led Android development for a client's e-commerce app and a personalized mobile health app. Collaborated on 5 custom mobile apps through the full software development lifecycle.",
        technologies: [  "Java",
            "Kotlin",
            "Android Studio",
            "Jetpack Compose",
            "Firebase",
            "Git",
            "RESTful APIs",
            "Postman"],
        achievements: [
            "Led Android development (Java/Kotlin) for a client's e-commerce application, implementing unique features that boosted user engagement and met client business needs.",
            "Designed and built a personalized mobile health application, showcasing versatility across diverse product domains.",
            "Collaborated effectively within cross-functional teams throughout the full software development lifecycle for 5 distinct custom mobile applications, ensuring successful delivery within project deadlines."
          ],
        icon: Code,
        color: "from-orange-500 to-red-600"
    },
    {
        id: 4,
        title: "Android Engineer Intern",
        company: "Rove Apps Pvt. Ltd.",
        location: "Karachi, Pakistan",
        period: "Sep 2020 - Dec 2020",
        description: "Contributed to the end-to-end development of Android applications, working across diverse product domains to deliver robust and user-centric mobile solutions.",
        technologies: ["Kotlin", "Java", "Android Studio", "Jetpack Compose", "Firebase", "Git", "RESTful APIs", "Retrofit"],
        achievements: [
            "Led Android development for a client’s e-commerce platform, integrating advanced features that increased user engagement.",
            "Developed and deployed a personalized mobile health app, highlighting versatility in domain-specific mobile development.",
            "Delivered 5+ custom Android apps in collaboration with cross-functional teams, ensuring timely releases and full SDLC coverage."
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