"use client";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import TypeIt from "typeit-react";

export default function Home() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
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
    });

    return () => ctx.revert(); // Cleanup animations when component unmounts
  }, []);

  return (
    <section id="home" className="hero min-h-screen relative">
      <div
        className="transparent_text_home hidden sm:hidden md:block"
        style={{ color: "transparent", WebkitTextStroke: "2px white" }}
      >
        &lt;Home /&gt;
      </div>
      <div className="hero-content mt-20 lg:mt-0 flex_col gap-20 lg:gap-4 lg:flex-row">
        <div className="max-w-md">
          <p className="font-nothingDisplay text-white transform text-[24px] sm:text-[32px] duration-300 ease-i tracking-wider py-6">
            Hi, I'm
          </p>
          <h1
            ref={headingRef}
            className="flex flex-col transform gap-4 sm:gap-10 text-5xl sm:text-7xl duration-300 ease-in leading-snug font-bold text-primary-blue font-oswald"
          >
            <span>Het</span>
            <span>Ashwinbhai</span>
            <span>Patel.</span>
          </h1>
          <p className="py-8 font-nothingDisplay transform text-white text-[24px] sm:text-[32px] duration-300 ease-in tracking-wider">
            <TypeIt
              options={{ loop: true }}
              getBeforeInit={(instance) => {
                instance
                  .type("Software", { delay: 300 })
                  .pause(300)
                  .move(-8)
                  .delete(1)
                  .type("D")
                  .move(null, { to: "END" })
                  .type("eveloper")
                  .pause(500)
                  .delete(9)
                  .type("Engineer")
                  .pause(500)
                  .delete(8)
                  .type("Architect")
                  .pause(500)
                  .delete(9)
                  .type("Data Scientist")
                  .pause(500)
                  .go();

                return instance;
              }}
            />
          </p>
          <a href="#about">
            <button className="primary-btn btn btn-outline font-mono btn-wide md:btn-md lg:btn-lg">
              Explore More
            </button>
          </a>
        </div>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full lg:w-2/3 object-cover"
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
      </div>
    </section>
  );
}
