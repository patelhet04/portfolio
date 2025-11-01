"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutRefContext from "../context/AboutRefContext";
import Image from "next/image";
import Tilt from "react-parallax-tilt";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useContext(AboutRefContext);
  const openSourceRef = useRef<HTMLDivElement>(null);
  const codingHoursRef = useRef<HTMLDivElement>(null);
  const profilePicRef = useRef<HTMLImageElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (profilePicRef.current) {
        gsap.from(profilePicRef.current, {
          scale: 0.8,
          opacity: 0,
          rotation: 10,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: profilePicRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      const contentRefs = [
        headerRef.current,
        paragraphRef.current,
        listRef.current,
        buttonsRef.current,
      ];
      gsap.from(contentRefs, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: contentRefs,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      const openSourceTarget = { value: 0 };
      gsap.to(openSourceTarget, {
        value: 3,
        duration: 4,
        onUpdate: () => {
          if (openSourceRef.current) {
            openSourceRef.current.textContent = `${Math.round(
              openSourceTarget.value
            )}+`;
          }
        },
      });

      const startDate = new Date("2017-09-01");
      const currentDate = new Date();
      const differenceInDays =
        (currentDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
      const averageDailyHours = 4;
      const additionalHours = !isNaN(differenceInDays)
        ? Math.round(differenceInDays * averageDailyHours)
        : 0;

      if (codingHoursRef.current) {
        const codingHoursTarget = { value: 0 };
        gsap.to(codingHoursTarget, {
          value: additionalHours,
          duration: 2,
          onUpdate: () => {
            if (codingHoursRef.current) {
              codingHoursRef.current.innerHTML = `${Math.round(
                codingHoursTarget.value
              )}<sup>*</sup>`;
            }
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={aboutRef} id="about" className="hero min-h-screen relative">
      <div
        className="transparent_text_about hidden sm:hidden md:block"
        style={{
          color: "transparent",
          WebkitTextStroke: "2px white",
          transform: `translateY(${scrollY * 0.15}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        &lt;About /&gt;
      </div>

      <div className="hero-content gap-20 px-4 sm:px-8 md:px-14 lg:px-20 flex_col flex-col-reverse lg:flex-row">
        <div className="max-w-md flex_col">
          <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            perspective={1000}
            transitionSpeed={1500}
            scale={1.02}
            gyroscope={true}
            className="avatar"
          >
            <div className="w-72 md:w-96 mask mask-squircle">
              <Image
                ref={profilePicRef}
                src="/assets/Profile1.jpg"
                alt="Het Patel - AI Software Engineer"
                width={250}
                height={250}
                priority
              />
            </div>
          </Tilt>
          <div className="stats stats-vertical lg:stats-horizontal shadow mt-20 font-sora">
            <div className="stat place-items-center">
              <div className="stat-title">Open Source</div>
              <div className="stat-value text-primary" ref={openSourceRef}>
                0+
              </div>
              <div className="stat-desc text-[14px]">
                Years of Contributions
              </div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Hours of Coding</div>
              <div className="stat-value text-secondary" ref={codingHoursRef}>
                0 <sup>*</sup>
              </div>
              <div className="stat-desc text-[14px]">
                Invested in self development
              </div>
            </div>
          </div>
        </div>

        <div className="flex_center_col gap-10 font-sora">
          <header
            ref={headerRef}
            className="font-sora text-white font-bold text-[24px] md:text-[32px]"
          >
            About Me
            <div className="w-48 h-1 bg-primary rounded-full mt-2"></div>
          </header>
          <p
            ref={paragraphRef}
            className="text-white text-lg lg:text-2xl text-justify"
          >
            Hello 👋, I'm <strong>Het Patel</strong>, a dedicated{" "}
            <strong>Software Engineer</strong> and a{" "}
            <strong>Graduate Student</strong> at{" "}
            <a
              href="https://www.northeastern.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-2xl md:text-3xl font-sora tracking-normal md:tracking-wider font-semibold"
            >
              Northeastern University
            </a>
            .
          </p>
          <ol ref={listRef} className="list-disc list-inside leading-8">
            <li>
              Throughout my software development career, I've shown a strong
              commitment to innovation and problem-solving.
            </li>
            <li>
              My analytical approach helps me quickly solve challenges, and I
              value a collaborative, progressive work culture.
            </li>
            <li>
              Apart from that, in my free time, I like to go to the gym,{" "}
              <a
                href="https://photos.app.goo.gl/BPvZmMAqwyuNguH58"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 hover:text-blue-800"
              >
                landscape photography
              </a>
              , hike, and cook food.
            </li>
          </ol>
          <div
            ref={buttonsRef}
            className="flex flex-row justify-baseline items-center gap-10"
          >
            <a href="#contact">
              <button className="primary-btn btn btn-outline font-sora md:btn-md lg:btn-lg rounded-2xl">
                Contact Me
              </button>
            </a>
            <a
              href="https://docs.google.com/document/d/1o-yUJEaBgF6yATc7LSCH2HWCTxTil09D/edit?usp=sharing&ouid=112724013765530570552&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="primary-btn btn btn-outline font-sora md:btn-md lg:btn-lg rounded-2xl">
                View Resume
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
