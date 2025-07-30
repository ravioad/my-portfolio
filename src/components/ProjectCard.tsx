import { Project } from "@/types/project";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = () => {
        console.log("imageLoaded", imageLoaded)
        setImageLoaded(true);
    }
    const handleImageError = () => {
        setImageError(true);
    }

    return (
        <motion.div
            className="project-card group relative"
        >
            <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-500/50 rounded-3xl p-6 h-full hover:border-cyan-500/30 transition-all duration-500">

                {
                    project.featured && (
                        <div className="absolute top-4 right-4 z-10">
                            <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-bold rounded-full">
                                <Star className="h-3 w-3" />
                                Featured
                            </div>
                        </div>
                    )
                }
                {/* Project Image */}
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <div className="w-full h-48 bg-gradient-to-br from-gray-900 to-gray-800 group-hover:scale-105 transition-transform duration-500 relative">
                        {!imageError && (
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-all duration-700 group-hover:scale-110"
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        )}

                        {imageError && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center hover-group:scale-110 transition-transform duration-300">
                                        <span className="text-2xl">🚀</span>
                                    </div>
                                    <p className="text-sm text-gray-400">Project Preview</p>
                                </div>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-teal-500/20 text-teal-400 text-xs font-medium rounded-full border border-teal-500/30 backdrop-blur-sm">
                            {project.category}
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {project.title}
                    </h3>
                    <div className="relative group/description">
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 cursor-help">
                            {project.description}
                        </p>
                        <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-black/90 backdrop-blur-lg rounded-lg shadow-2xl opacity-0 group-hover/description:opacity-100 transition-opacity duration-200 pointer-events-none z-20 max-w-xs border border-gray-800/30">
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {project.description}
                            </p>
                            <div className="absolute top-full left-6 -mt-px">
                                <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 8L0 0L16 0L8 8Z" fill="rgb(0 0 0 / 0.9)"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-cyan-400/20 text-cyan-300 text-xs rounded-md border border-teal-700/50 hover:border-cyan-500/50 transition-colors duration-300">
                                {tech}
                            </span>
                        ))}
                        {project.tech.length > 4 && (
                            <div className="relative group/tooltip">
                                <span className="px-2 py-1 bg-gray-800/70 text-gray-400 text-xs rounded-md cursor-help hover:bg-gray-700/70 transition-colors duration-300">
                                    {`+${project.tech.length - 4} more`}
                                </span>
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 backdrop-blur-lg rounded-lg shadow-2xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-20 min-w-max border border-gray-800/30">
                                    <div className="flex flex-wrap gap-1 max-w-xs">
                                        {project.tech.slice(4).map((tech) => (
                                            <span key={tech} className="px-2 py-1 bg-cyan-400/20 text-cyan-300 text-xs rounded-md border border-teal-700/50">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    {/* Tooltip arrow */}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                                        <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 8L0 0L16 0L8 8Z" fill="rgb(0 0 0 / 0.9)"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Project Links */}
                    <div className="flex gap-3 pt-4">
                        {project.github && (
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/50 text-gray-300 rounded-xl hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300 border border-gray-700/50 hover:border-cyan-500/50"
                            >
                                <Github className="h-4 w-4" />
                                Code
                            </motion.a>
                        )}

                        <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 ${project.github ? 'flex-1' : 'w-full'}`}
                        >
                            <ExternalLink className="h-4 w-4" />
                            Demo
                        </motion.a>
                    </div>
                </div>
                 {/* Hover Glow Effect */}
                 <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>

        </motion.div>
    );
}