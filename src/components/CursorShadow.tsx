'use client'; // This component needs to run on the client to access window/mouse events

import React, { useState, useEffect, useRef, useCallback } from 'react';

const CursorShadow: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 }); // Initialize off-screen
    const [isMobile, setIsMobile] = useState(false);
    const rafRef = useRef<number | undefined>(undefined);

    // Detect mobile devices
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Debounced mouse position update using RAF
    const updateMousePosition = useCallback((e: MouseEvent) => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }
        rafRef.current = requestAnimationFrame(() => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        });
    }, []);

    useEffect(() => {
        // Don't render cursor shadow on mobile devices
        if (isMobile) return;

        // Add event listener to the window to track mouse movement
        window.addEventListener('mousemove', updateMousePosition, { passive: true });

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [updateMousePosition, isMobile]); // Empty dependency array means this effect runs once on mount and cleans up on unmount

    // Don't render on mobile
    if (isMobile) return null;

    return (
    <div
      className={`
        fixed
        pointer-events-none
        z-[9999]
        transition-opacity duration-100 ease-out
        w-[var(--glow-size)]        
        h-[var(--glow-size)]        
        opacity-[var(--glow-opacity)]
        blur-[var(--glow-blur)]    
        bg-[radial-gradient(circle_at_center,var(--color-cyan-800)_5%,var(--color-purple-800)_10%,transparent_60%)]
        animate-pulse-shadow       
      `}
      style={{
        // Use arbitrary values for left and top, which are dynamic
        left: mousePosition.x,
        top: mousePosition.y,
        transform: 'translate(-50%, -50%)', // This transform remains here for centering
      }}
    />
  );
};

export default CursorShadow;