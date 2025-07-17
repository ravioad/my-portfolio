'use client'; // This component needs to run on the client to access window/mouse events

import React, { useState, useEffect } from 'react';

const CursorShadow: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 }); // Initialize off-screen

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        // Add event listener to the window to track mouse movement
        window.addEventListener('mousemove', updateMousePosition);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

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