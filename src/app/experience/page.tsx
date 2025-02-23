"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { educationData, experienceData } from "@/utils/experience";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";

const Experience = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const timelineItemsRef = useRef<HTMLLIElement[]>([]);
  const hrRefs = useRef<HTMLHRElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      gsap.fromTo(
        "#career",
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#career",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate timeline horizontal rules (hr elements)
      hrRefs.current.forEach((hr) => {
        gsap.fromTo(
          hr,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: hr.parentElement,
              start: "top center+=200",
              end: "bottom center",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup animations when component unmounts
  }, []);

  type BadgeColors = {
    [skill: string]: string;
  };

  const badgeColors: BadgeColors = {
    Typescript: "bg-[#3178c6] text-white",
    Nodejs: "bg-green-600",
    React: "bg-[#61DBFB]",
    Nextjs: `${theme === "retro" ? "bg-white text-black" : "bg-black text-white"}`,
    MongoDB: "bg-green-400",
    MySQL: "bg-[#f29111]",
    Docker: "bg-[#1D63ED] text-white",
    GraphQL: "bg-[#E10098] text-white",
    Javascript: "bg-[#f7df1e]",
    Express:
      theme === "retro" ? "bg-white text-gray-700 " : "bg-gray-700 text-white",
    GenAI: "bg-[#10B981] text-white",
    RAG: "bg-[#6366F1] text-white",
    "Amazon Web Services": "bg-[#FF9900] text-black",
    "Python (Programming Language)": "bg-[#3776AB] text-white",
    "Prompt Engineering": "bg-[#8B5CF6] text-white",
    "AI Agents": "bg-[#14B8A6] text-white",
    "Vector Databases": "bg-[#0EA5E9] text-white",
  };

  const getBadgeClasses = (skill: string): string => {
    return badgeColors[skill] || "bg-gray-400 text-white";
  };

  return (
    <section
      ref={sectionRef}
      id="career"
      className="hero min-h-screen relative px-0 md:px-10"
    >
      <div
        className="transparent_text_work text-[15vw] hidden sm:hidden md:block"
        style={{ color: "transparent", WebkitTextStroke: "2px white" }}
      >
        &lt;Career /&gt;
      </div>
      <div className="hero-content flex flex-col gap-20 mx-10 mt-20 md:mt-0 text-white">
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical font-mono rounded-[1rem] text-[12px] md:text-[14px]">
          <header className="font-mono text-white font-bold text-[24px] md:text-[32px] mb-5">
            Work Experience
            <Image
              src="/assets/undeline.svg"
              alt="underline"
              width={200}
              height={20}
            />
          </header>
          {experienceData.map((exp, expIndex) => (
            <li
              key={exp.id}
              ref={(el) => (timelineItemsRef.current[expIndex] = el!)}
              className="bg-base-300 bg-opacity-[0.5] rounded-lg p-4 text-[16px] mb-5"
            >
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end leading-10">
                <time className="italic text-white">{exp.dates}</time>
                <div className="text-lg md:text-xl font-bold text-primary-blue">
                  {exp.company}
                </div>
                <p className="italic font-extralight">{exp.role}</p>
                <ul className="pl-0 md:pl-10 list-disc list-inside text-white leading-8 max-h-[200px] overflow-y-auto">
                  {exp.tasks.map((task, index) => (
                    <li
                      key={index}
                      className="text-justify font-firaCode font-extralight"
                    >
                      {task}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-row flex-wrap gap-6">
                  {exp.skills.map((skill, index) => (
                    <div
                      key={index}
                      className={`badge badge-info ${getBadgeClasses(skill)} border border-white`}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <hr
                ref={(el) => (hrRefs.current[expIndex] = el!)}
                className={`${theme === "retro" ? "bg-[#2e282a]" : "bg-white"}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Experience;
