"use client";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import TypeIt from "typeit-react";
// import Animoji from '@/app/assets/'
export default function Home() {
  const headingRef = useRef<HTMLHeadingElement>(null); // Reference to the heading container
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (headingRef.current) {
      const spans = headingRef.current.children; // Get all the span elements inside the heading
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
        } // Animate each span
      );
    }
    if (videoRef.current) {
      // Start with the video slightly rotated and scaled down
      gsap.set(videoRef.current, { scale: 0.6, rotation: -20, autoAlpha: 0 });

      // Animate to its final state
      gsap.to(videoRef.current, {
        scale: 1,
        rotation: 0,
        autoAlpha: 1,
        duration: 4, // Longer duration for a smoother effect
        ease: "elastic.out(1, 0.75)", // Elastic easing for a bounce effect
        delay: 4, // Start after a slight delay to ensure the loader has finished
      });
    }
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
                  .type("Sogtware", { delay: 300 })
                  .move(-5)
                  .delete(1)
                  .type("f")
                  .move(null, { to: "END" })
                  .type(" developer")
                  .pause(300)
                  .move(-8)
                  .delete(1)
                  .type("D")
                  .move(null, { to: "END" })
                  .go();

                // Remember to return it!
                return instance;
              }}
            />
          </p>
          <a href="#about">
            <button className="btn btn-outline font-mono btn-wide md:btn-md lg:btn-lg">
              Explore More
            </button>
          </a>
        </div>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          className="w-full lg:w-2/3 flex justify-center items-center"
        >
          <source src="/assets/Animoji.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
