import { useRef, useState } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle, Github, Linkedin, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const fieldName = e.target.name === 'user_name' ? 'name' : 
                         e.target.name === 'user_email' ? 'email' : 
                         e.target.name;
        setFormData({ ...formData, [fieldName]: e.target.value });
    };

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccess(false);
        
        try {
            const result = await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
                e.target as HTMLFormElement,
                process.env.NEXT_PUBLIC_EMAILJS_USER_ID || 'YOUR_USER_ID'
            );
            
            console.log('Email sent successfully:', result.text);
            setSuccess(true);
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Email send failed:', error);
            // You might want to show an error message here
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSuccess(false), 2500);
        }
    };

    return (
        <section ref={sectionRef} className="relative min-h-screen py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden flex items-center">

            <motion.div
                style={{ y }}
                className="absolute inset-0 pointer-events-none"
            >
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-40 left-24 w-48 h-48 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl" />
                <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-24 right-24 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl" />
            </motion.div>

            <div className="relative z-10 max-w-6xl mx-auto w-full px-4 md:px-8">

                <motion.div
                    style={{ opacity }}
                    className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="gradient-text">Get in Touch</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Let&apos;s collaborate on your next project. I&apos;m always excited to work on innovative ideas and creative solutions.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-10 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative p-[2px] rounded-3xl bg-gradient-to-br from-cyan-400/30 via-purple-400/20 to-blue-400/20 shadow-xl group h-full">

                        <div className="relative rounded-3xl bg-gray-900/80 backdrop:blur-lg p-8 border border-white/10 overflow-hidden h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-2">Contact Information</h3>
                                <p className="text-gray-300 mb-6 text-base">Let’s connect! I’m open to new opportunities and collaborations.</p>
                                <div className="space-y-5 mb-6">
                                    <div className="flex items-center gap-4">
                                        <span className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 shadow-md">
                                            <Mail className="h-5 w-5 text-white" />
                                        </span>
                                        <div>
                                            <h4 className="text-white font-semibold text-base">Email</h4>
                                            <p className="text-gray-400 select-all cursor-pointer text-sm" onClick={() => copyToClipboard('hello@ravidev.com')}>ravikumaroad08@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-md">
                                            <Phone className="h-5 w-5 text-white" />
                                        </span>
                                        <div>
                                            <h4 className="text-white font-semibold text-base">Phone</h4>
                                            <p className="text-gray-400 select-all cursor-pointer text-sm" onClick={() => copyToClipboard('+45 7168 0534')}>+45 7168 0534</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-md">
                                            <MapPin className="h-5 w-5 text-white" />
                                        </span>
                                        <div>
                                            <h4 className="text-white font-semibold text-base">Location</h4>
                                            <p className="text-gray-400 select-all cursor-pointer text-sm" onClick={() => copyToClipboard('Copenhagen, Denmark')}>Copenhagen, Denmark</p>
                                        </div>
                                    </div>
                                </div>

                                {/* vCard & QR */}
                                <div className="my-6">
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-gray-800/60 border border-cyan-400/10 rounded-2xl p-4 shadow-inner">
                                        <a
                                            href="/vcard.vcf"
                                            download
                                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow hover:from-cyan-600 hover:to-purple-600 transition-colors duration-200 whitespace-nowrap">
                                            Download vCard
                                        </a>
                                        <div className="flex flex-col items-center">
                                            <QRCodeCanvas value="https://drive.google.com/uc?export=download&id=1iM4mVCJU92M0_-j9vavUXoJ48hdKUcjg" size={64} bgColor="#18181b" fgColor="#00fff7" />
                                            <div className="text-xs mt-1 text-gray-400 text-center">Scan to add contact</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Social Links */}
                            <div className="mt-8">
                                <h4 className="text-white font-semibold mb-3">Contact with me</h4>
                                <div className="flex gap-3 justify-center">
                                    {[
                                        { icon: Github, href: "https://github.com/ravioad", label: "GitHub" },
                                        { icon: Linkedin, href: "https://www.linkedin.com/in/ravi-oad9/", label: "LinkedIn" },
                                        { icon: Mail, href: "mailto:ravikumaroad08@gmail.com", label: "Email" },
                                    ].map((social) => (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.2, y: -5 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="h-12 w-12 bg-gray-800/60 rounded-xl flex items-center justify-center hover:bg-gray-500/20 hover:text-cyan-400 transition-all duration-300 shadow-md text-gray-300"
                                        >
                                            <social.icon className="h-6 w-6" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/*Contact Form*/}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative p-[2px] rounded-3xl bg-gradient-to-br from-cyan-400/30 via-purple-400/20 to-blue-400/20 shadow-xl group h-full">
                        <div className="relative rounded-3xl bg-gray-900/80 backdrop-blur-lg p-8 border border-white/10 overflow-hidden h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-6">Send a message</h3>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="mb-6">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="user_name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Your Name"
                                            className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="user_email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="your.email@example.com"
                                            className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300" />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={6}
                                            placeholder="Write your message here..."
                                            className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300" />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-2xl font-semibold glow hover:glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </motion.button>
                                    <AnimatePresence>
                                        {success && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="flex items-center gap-2 text-green-400 mt-2 justify-center">
                                                <CheckCircle className="w-5 h-5" />
                                                Message sent successfully!
                                            </motion.div>
                                        )
                                        }
                                    </AnimatePresence>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

        </section>
    )
}