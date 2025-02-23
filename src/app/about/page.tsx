"use client";
import React, { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutRefContext from "../context/AboutRefContext";
import Image from "next/image";

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

  return (
    <section ref={aboutRef} id="about" className="hero min-h-screen relative">
      <div
        className="transparent_text_about hidden sm:hidden md:block"
        style={{ color: "transparent", WebkitTextStroke: "2px white" }}
      >
        &lt;About /&gt;
      </div>

      <div className="hero-content gap-20 px-14 md:px-20 flex_col flex-col-reverse lg:flex-row">
        <div className="max-w-md flex_col">
          <div className="avatar">
            <div className="w-72 md:w-96 mask mask-squircle">
              <Image
                ref={profilePicRef}
                src="/assets/het-patel-software-engineer.jpg"
                alt="Het Patel - Software Engineer"
                width={250}
                height={250}
                priority
              />
            </div>
          </div>
          <div className="stats stats-vertical lg:stats-horizontal shadow mt-20 font-mono">
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

        <div className="flex_center_col gap-10 font-mono">
          <header
            ref={headerRef}
            className="font-mono text-white font-bold text-[24px] md:text-[32px]"
          >
            About Me
            <Image
              src="/assets/undeline.svg"
              alt="underline"
              width={200}
              height={20}
            />
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
              className="text-primary-blue text-2xl md:text-3xl font-caveat tracking-normal md:tracking-wider"
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
              <button className="primary-btn btn btn-outline font-mono md:btn-md lg:btn-lg">
                Contact Me
              </button>
            </a>
            <button
              className="primary-btn btn btn-outline font-mono md:btn-md lg:btn-lg"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/assets/HetPatel_Resume.pdf";
                link.setAttribute("download", "Het_Patel_Resume.pdf");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
