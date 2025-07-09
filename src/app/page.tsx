"use client";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

export default function Home() {

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    window.lenis = lenisRef.current;

    function raf(time: number) {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenisRef?.current?.destroy();
    };
  }, [])


  return (
    <>
      <main className="relative z-10">
        <section id="hero"><HeroSection /></section>
        <section id="about"><AboutSection /></section>
        <section id="projects"><ProjectsSection/></section>
        <section id="experience"><ExperienceSection/></section>
      </main>
    </>
  );
}
