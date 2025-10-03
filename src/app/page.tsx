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
  const animationFrameRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || "ontouchstart" in window;
      setIsMobile(isMobileDevice);
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    return () => {
      window.removeEventListener("resize", updateIsMobile);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (isMobile) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      window.lenis = undefined;
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 0,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };

    animationFrameRef.current = requestAnimationFrame(raf);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      lenis.destroy();
      lenisRef.current = null;
      window.lenis = undefined;
    };
  }, [isMobile]);


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
