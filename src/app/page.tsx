"use client";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const lenisRef = useRef<Lenis | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Only initialize Lenis on desktop for better mobile performance
    if (!isMobile) {
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 0, // Disable touch scrolling to prevent conflicts
      })
      window.lenis = lenisRef.current;

      function raf(time: number) {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      lenisRef?.current?.destroy();
    };
  }, [isMobile])


  return (
    <>
      <main className="relative z-10">
        <section id="hero"><HeroSection /></section>
        <section id="about"><AboutSection /></section>
        <section id="projects"><ProjectsSection /></section>
        <section id="experience"><ExperienceSection /></section>
        <section id="contact"><ContactSection /></section>
        <Footer />
      </main>
    </>
  );
}
