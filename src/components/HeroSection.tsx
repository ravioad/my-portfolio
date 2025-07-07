import { motion } from "framer-motion";
import { p } from "framer-motion/client";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import { useEffect, useRef } from "react";

export default function HeroSection() {

    const particlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const particles = particlesRef.current;
        if (!particles) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement("div");
            particle.className = "float absolute w-1 h-1 bg-cyan-400/10 rounded-full";
            particle.style.left = Math.random() * 100 + "%";
            particle.style.top = Math.random() * 100 + "%";
            particle.style.animationDelay = Math.random() * 5 + "s";
            particle.style.animationDuration = (Math.random() * 3 + 2) + "s";
            particles.appendChild(particle);
        }
    })

    return (
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black  overflow-hidden">
            <motion.div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ zIndex: 0 }}
            >
                <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-3xl" />
            </motion.div>
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ zIndex: 0 }}>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>
            {/* Particles */}
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

            <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <h1 className="text-6xl md:text-8xl mb-4 font-extrabold font-space-grotesk">
                        <span className="gradient-text">Hi, I'm Ravi</span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
                        Full Stack Engineer
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Creating innovative digital experiences through code, creativity, and advanced AI. Specializing in modern web/mobile apps and generative technologies.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col md:flex-row gap-4 items-center justify-center mb-10"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-semibold glow hover:glow transition-all duration-300 "
                    >
                        View Projects
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-8 py-4 border-2 border-cyan-500 text-cyan-500 rounded-2xl font-semibold hover:bg-cyan-500 hover:text-black transition-all duration-300">
                        Contact Me
                    </motion.button>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex justify-center gap-6 mb-8"
                >

                    {[
                        { icon: Github, href: "#", label: "GitHub" },
                        { icon: Linkedin, href: "#", label: "LinkedIn" },
                        { icon: Twitter, href: "#", label: "Twitter" },
                    ].map((social) => (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            whileHover={{ scale: 1.2, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
                        >
                            <social.icon className="h-6 w-6" />
                        </motion.a>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2"
                >

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                    >
                        <ArrowDown className="h-6 w-6 text-gray-400" />
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}