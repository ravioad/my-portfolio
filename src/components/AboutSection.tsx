import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);


export default function AboutSection() {

    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".about-text",
                {
                    opacity: 0, x: -100
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: ".about-text",
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                })

            gsap.fromTo(".about-image",
                {
                    opacity: 0, scale: 0.8, rotation: -5
                },
                {
                    opacity: 1, scale: 1, rotation: 0, duration: 1.2,
                    scrollTrigger: {
                        trigger: ".about-image",
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            )



        }, sectionRef)

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef}  className="relative min-h-screen py-20 bg-black overflow-hidden">

            <motion.div style={{ y }}
                className="absolute inset-0 opacity-10" >
                <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-3xl"></div>
            </motion.div>
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
                        backgroundSize: `50px 50px`
                    }}>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div
                    style={{ opacity }}
                    className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="gradient-text">About Me</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Passionate about creating innovative digital solutions that bridge technology and creativity
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        ref={imageRef}
                        className="about-image relative">

                        <div className="relative">
                            {/* Main Image */}

                            <div className="h-80 w-80 mx-auto relative">

                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur-xl opacity-30" />


                                <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-2">
                                    <div className="w-full h-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="h-24 w-24 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                                <span className="text-2xl font-bold">👨‍💻</span>
                                            </div>
                                            <p className="text-sm text-gray-300">
                                                Your Photo Here
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/* Floating Elements */}


                            <motion.div
                                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-4 -right-4 w-16 h-16 bg-cyan-500/20 rounded-full blur-sm"
                            />
                            <motion.div
                                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-4 -left-4 w-12 h-12 bg-cyan-500/20 rounded-full blur-sm"
                            />
                        </div>
                    </motion.div>

                    <motion.div className="about-text space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-white">
                Full-Stack Engineer
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                With over 5 years of experience in software development, I specialize in building 
                modern web applications that combine cutting-edge technology with intuitive design. 
                My passion lies in creating seamless user experiences and pushing the boundaries 
                of what's possible on the web.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm particularly interested in generative AI, creative coding, and emerging 
                technologies that can enhance human creativity and productivity. When I'm not 
                coding, you'll find me exploring new frameworks, contributing to open-source 
                projects, or experimenting with AI-powered tools.
              </p>
            </div>
            </motion.div>
                </div>
            </div>

        </section>
    );
}