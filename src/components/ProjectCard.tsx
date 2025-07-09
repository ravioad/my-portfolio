import { Project } from "@/types/project";
import { motion } from "framer-motion";
import { image } from "framer-motion/client";
import { ExternalLink, Github, Star } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = () => {
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
                        {/* Main Project Image */}
                        {!imageError && (
                            <img src={project.image}
                                alt={project.title}
                                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110`}
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                            />
                        )}

                        {/* Fallback Content */}
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
                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-teal-500/20 text-teal-400 text-xs font-medium rounded-full border border-teal-500/30 backdrop-blur-sm">
                            {project.category}
                        </span>
                    </div>
                </div>

                {/* Project Content */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                    </p>
                    {/* Tech Stack */}

                    <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-cyan-400/20 text-cyan-300 text-xs rounded-md border border-teal-700/50 hover:border-cyan-500/50 transition-colors duration-300">
                                {tech}
                            </span>
                        ))}
                        {project.tech.length > 4 && (
                            <span className="px-2 py-1  bg-gray-800/70 text-gray-400 text-xs rounded-md">
                                {`+${project.tech.length - 4} more`}
                            </span>
                        )}
                    </div>
                    {/* Project Links */}
                    <div className="flex gap-3 pt-4">
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

                        <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
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