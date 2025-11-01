// components/Loader.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTheme } from "../context/ThemeContext";

const Loader: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();
  const loaderRef = useRef<HTMLDivElement>(null);
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Create particles
    if (particlesRef.current) {
      const particleCount = 40;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particlesRef.current.appendChild(particle);
      }

      // Animate particles forming a brain/neural pattern
      const particles = particlesRef.current.children;
      Array.from(particles).forEach((particle, i) => {
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 120;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        gsap.set(particle, {
          x: Math.random() * window.innerWidth - window.innerWidth / 2,
          y: Math.random() * window.innerHeight - window.innerHeight / 2,
          opacity: 0,
        });

        tl.to(particle, {
          x,
          y,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }, i * 0.015);
      });
    }

    // Code typing animation - faster
    const codeLines = [
      "import { neuralNetwork } from 'ai';",
      "const brain = new Brain();",
      "brain.initialize();",
      ">> Loading portfolio...",
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let exitTimerRef: NodeJS.Timeout | null = null;

    const typeCode = () => {
      if (lineIndex < codeLines.length && codeContainerRef.current) {
        const currentLine = codeLines[lineIndex];
        
        if (charIndex === 0) {
          const lineElement = document.createElement('div');
          lineElement.className = 'code-line opacity-0';
          lineElement.style.color = lineIndex >= 3 ? 'var(--fallback-s, oklch(var(--s)))' : 'var(--fallback-p, oklch(var(--p)))';
          codeContainerRef.current.appendChild(lineElement);
          gsap.to(lineElement, { opacity: 1, duration: 0.15 });
        }

        const lines = codeContainerRef.current.children;
        const currentLineElement = lines[lines.length - 1] as HTMLElement;
        
        if (currentLineElement && charIndex < currentLine.length) {
          currentLineElement.textContent = currentLine.slice(0, charIndex + 1);
          charIndex++;
          setTimeout(typeCode, 20);
        } else {
          charIndex = 0;
          lineIndex++;
          
          // Check if we just finished the last line
          if (lineIndex >= codeLines.length) {
            // Wait 300ms after typing completes, then exit
            exitTimerRef = setTimeout(() => {
              startExitAnimation();
            }, 300);
          } else {
            setTimeout(typeCode, 150);
          }
        }
      }
    };

    // Start animations sequence
    tl.call(typeCode, [], 0.5);

    // Pulse circle animation
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        scale: 1.2,
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Exit animation function - quick and smooth
    const startExitAnimation = () => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          setIsLoaded(true);
          window.dispatchEvent(new Event('loaderComplete'));
        },
      });

      exitTl
        // Everything fades together smoothly
        .to([codeContainerRef.current, particlesRef.current?.children || [], circleRef.current], {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        })
        .to(loaderRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        }, "-=0.2");
    };

    return () => {
      if (exitTimerRef) clearTimeout(exitTimerRef);
      tl.kill();
    };
  }, []);

  if (isLoaded) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed top-0 left-0 w-full h-full z-[200] overflow-hidden bg-base-100"
      data-theme={theme}
    >
      {/* Animated Particles */}
      <div
        ref={particlesRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Pulsing Circle */}
      <div
        ref={circleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, var(--fallback-p, oklch(var(--p))) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Code Container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-8">
        <div
          ref={codeContainerRef}
          className="font-mono text-sm md:text-base space-y-2 text-left backdrop-blur-sm bg-base-200/50 rounded-3xl p-8 md:p-12 border border-primary/20 shadow-2xl"
        />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
    </div>
  );
};

export default Loader;
