import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative pt-0 pb-0 bg-black overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none" />
            <div className="relative z-20 max-w-7xl mx-auto px-6 pt-12 pb-12">
                <div className="text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center"
                    >
                        <p className="text-gray-400 text-sm">
                            Built with {' '}
                            <span className="text-cyan-500">Next.js</span>, {' '}
                            <span className="text-cyan-500">Tailwind CSS</span>, {' '}
                            <span className="text-cyan-500">Framer Motion</span>, {' '}
                            <span className="text-cyan-500">GSAP</span>, and {' '}
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="inline-flex items-center gap-1 text-red-500">
                                <Heart className="w-4 h-4" />
                                Love
                            </motion.span>
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-center"
                    >
                        <p className="text-gray-500 text-sm">
                            © {currentYear} Ravi Kumar. All rights reserved.
                        </p>
                    </motion.div>
                </div>
            </div>
        </footer>
    )
}