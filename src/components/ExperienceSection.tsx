import { useRef } from "react";



export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

    return (
         <section ref={sectionRef} className="relative min-h-screen py-20 bg-gradient-to-b from-black to-gray-900 overflow-hidden">

         </section>
    );
}