import { Experience } from "@/types/experience";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, ExternalLink, MapPin } from "lucide-react";
import { use, useRef } from "react";

export default function ExperienceCard({ experience, index }: { experience: Experience, index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    })
    const parallaxRange = 24 + (index % 2 === 0 ? 0 : 12);
    const cardY = useTransform(scrollYProgress, [0, 1], [parallaxRange, -parallaxRange]);

    return (
        <div className="relative w-full flex flex-col items-center">
            <motion.div
                className="absolute left-1/2 top-0 h-10 w-10 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full border-4 border-gray-900 z-10 -translate-x-1/2 -translate-y-1/2 shadow-lg">
                <experience.icon className="h-5 w-5 text-white drop-shadow" />
            </motion.div>
            <div className="w-full flex justify-center">
                <motion.div
                    ref={cardRef}
                    style={{ y: cardY }}
                    className={`relative p-[2px] rounded-3xl bg-gradient-to-r from-cyan-400/40 to-blue-500/30 shadow-xl max-w-2xl w-full group`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                    whileHover={{ scale: 1.025, boxShadow: "0 8px 4px 0 rgba(0,255,247,0.08), 0 2px 8px 0 rgba(0,0,0,0.18)" }}
                >
                    {/* Glassmorphism card with darker bg */}
                    <div className="relative rounded-3xl bg-gray-900/80 backdrop-blur-lg p-8 border border-white/10 overflow-hidden transition-all duration-300 group-hover:shadow-cyan-400/10 group-hover:ring-2 group-hover:ring-cyan-400/10">
                        {/* Softer colored accent bar */}
                        <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-gradient-to-b from-cyan-400/40 via-blue-400/20 to-purple-400/20 opacity-60" />
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-6">
                            <div>
                                <h3 className="text-2xl font-extrabold text-white mb-1 tracking-tight">
                                    {experience.title}
                                </h3>

                                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        <span>{experience.company}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>{experience.period}</span>
                                    </div>
                                </div>
                            </div>

                            <motion.a
                                href="#"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-2 sm:mt-0 p-2 bg-cyan-500/10 text-cyan-300 rounded-lg hover:bg-cyan-500/20 transition-colors duration-300 border border-cyan-400/10"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </motion.a>
                        </div>
                        {/* Description */}
                        <p className="text-gray-200 mb-6 leading-relaxed text-base">
                            {experience.description}
                        </p>
                        {/* Technologies */}
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-cyan-200 mb-3 uppercase tracking-wider">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                                {experience.technologies.map((tech) => (
                                    <span key={tech} className="px-3 py-1 bg-gray-800/70 text-cyan-100 text-sm rounded-full border border-cyan-400/10 shadow-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* Achievements */}
                        <div>
                            <h4 className="text-sm font-semibold text-cyan-200 mb-3 uppercase tracking-wider">Key Achievements</h4>
                            <ul className="space-y-2">
                                {experience.achievements.map((achievement, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-cyan-100 text-sm">
                                        <div className="w-2 h-2 bg-cyan-400/80 rounded-full mt-2 flex-shrink-0 shadow"/>
                                        <span>{achievement}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );

}