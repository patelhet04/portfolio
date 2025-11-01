"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import TypeIt from "typeit-react";
import Tilt from "react-parallax-tilt";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (headingRef.current) {
      const spans = headingRef.current.children;
      gsap.fromTo(
        spans,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 2,
          stagger: 0.2,
          ease: "power2.out",
          delay: 3,
        }
      );
    }
    if (videoRef.current) {
      gsap.set(videoRef.current, { scale: 0.6, rotation: -20, autoAlpha: 0 });

      gsap.to(videoRef.current, {
        scale: 1,
        rotation: 0,
        autoAlpha: 1,
        duration: 4,
        ease: "elastic.out(1, 0.75)",
        delay: 4,
      });
    }

    // Parallax scroll effect with blur - using requestAnimationFrame for smoother updates
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const windowHeight = window.innerHeight;
          const progress = Math.min(scrolled / windowHeight, 1);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Subtle mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      
      setMousePosition({ x, y });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <section 
      ref={sectionRef} 
      id="home" 
      className="hero min-h-screen fixed top-0 left-0 right-0 w-full xl:ml-64"
      style={{
        filter: `blur(${scrollProgress * 10}px)`,
        opacity: 1 - scrollProgress * 0.3,
        transform: `scale(${1 - scrollProgress * 0.1})`,
        zIndex: 0,
      }}
    >
      <div
        className="transparent_text_home hidden sm:hidden md:block xl:-ml-64"
        style={{ 
          color: "transparent", 
          WebkitTextStroke: "2px white",
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          transition: "transform 0.3s ease-out"
        }}
      >
        &lt;Home /&gt;
      </div>
      <div className="hero-content mt-20 lg:mt-0 flex_col gap-20 lg:gap-4 lg:flex-row px-4 sm:px-8 md:px-12">
        <div 
          className="max-w-md"
          style={{
            transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`,
            transition: "transform 0.3s ease-out"
          }}
        >
          <p className="font-sora text-white transform text-[24px] sm:text-[32px] duration-300 ease-i tracking-wider py-6 font-light">
            Hi, I'm
          </p>
          <h1
            ref={headingRef}
            className="flex flex-col transform gap-4 sm:gap-10 text-5xl sm:text-7xl duration-300 ease-in leading-snug font-bold text-primary font-sora"
          >
            <span>Het</span>
            <span>Ashwinbhai</span>
            <span>Patel.</span>
          </h1>
          <p className="py-8 font-sora transform text-white text-[24px] sm:text-[32px] duration-300 ease-in tracking-wider font-light flex items-center gap-3">
            <span className="ai-drop inline-block opacity-0">AI</span>
            <span className="engineer-slide inline-block">
              <TypeIt
                options={{ loop: true, startDelay: 4000 }}
                getBeforeInit={(instance) => {
                  instance
                    .type("Sogtware", { delay: 300 })
                    .move(-5)
                    .delete(1)
                    .type("f")
                    .move(null, { to: "END" })
                    .type(" Engineer")
                    .pause(1000)
                    .go();

                  // Remember to return it!
                  return instance;
                }}
              />
            </span>
          </p>
          <a href="#about">
            <button className="primary-btn btn btn-outline font-sora btn-wide md:btn-md lg:btn-lg rounded-2xl">
              Explore More
            </button>
          </a>
        </div>
        <Tilt
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          perspective={1000}
          transitionSpeed={1500}
          scale={1.02}
          gyroscope={true}
          className="w-full h-full lg:w-2/3"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover rounded-3xl"
            poster="/assets/poster.png"
          >
            <source
              src="/assets/EmojiMovie725310219.mov"
              type='video/quicktime; codecs="hvc1"'
            />
            <source
              src="/assets/Animoji-vp9-chrome.webm"
              type='video/webm; codecs="vp9"'
            />
            Your browser does not support the video tag.
          </video>
        </Tilt>
      </div>
    </section>
  );
}

