"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { educationData, experienceData } from "@/utils/experience";
import type { Experience, Project } from "@/utils/experience";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";

const Experience = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const workExperienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = React.useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: -50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Work experience cards animation
      if (workExperienceRef.current) {
        const workCards =
          workExperienceRef.current.querySelectorAll(".experience-card");
        gsap.fromTo(
          workCards,
          { opacity: 0, x: -100, rotationY: -15 },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: workExperienceRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Education cards animation
      if (educationRef.current) {
        const eduCards =
          educationRef.current.querySelectorAll(".education-card");
        gsap.fromTo(
          eduCards,
          { opacity: 0, x: 100, rotationY: 15 },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: educationRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  React.useEffect(() => {
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

  const badgeColors: { [skill: string]: string } = {
    Typescript: "bg-[#3178c6] text-white",
    Nodejs: "bg-green-600 text-white",
    React: "bg-[#61DBFB] text-black",
    Nextjs: `${theme === "lemonade" ? "bg-white text-black" : "bg-black text-white"}`,
    "Next.js": `${theme === "lemonade" ? "bg-white text-black" : "bg-black text-white"}`,
    MongoDB: "bg-green-400 text-black",
    MySQL: "bg-[#f29111] text-white",
    Docker: "bg-[#1D63ED] text-white",
    GraphQL: "bg-[#E10098] text-white",
    Javascript: "bg-[#f7df1e] text-black",
    Express:
      theme === "lemonade"
        ? "bg-white text-gray-700"
        : "bg-gray-700 text-white",
    GenAI: "bg-[#10B981] text-white",
    RAG: "bg-[#6366F1] text-white",
    "Amazon Web Services": "bg-[#FF9900] text-black",
    "Python (Programming Language)": "bg-[#3776AB] text-white",
    "Prompt Engineering": "bg-[#8B5CF6] text-white",
    "AI Agents": "bg-[#14B8A6] text-white",
    "Vector Databases": "bg-[#0EA5E9] text-white",
    Python: "bg-[#3776AB] text-white",
    Flask: theme === "lemonade" ? "bg-black text-white" : "bg-white text-black",
    LlamaIndex: "bg-[#FF6B35] text-white",
    LangGraph: "bg-[#FF4785] text-white",
    vLLM: "bg-[#00D9FF] text-black",
    Ollama: "bg-[#10B981] text-white",
    "CI/CD": "bg-[#326CE5] text-white",
    FAISS: "bg-[#FF6B6B] text-white",
    MinIO: "bg-[#C72E29] text-white",
    "Sentiment Analysis": "bg-[#9333EA] text-white",
  };

  const getBadgeClasses = (skill: string): string => {
    return badgeColors[skill] || "bg-gray-500 text-white";
  };

  return (
    <section
      ref={sectionRef}
      id="career"
      className="hero min-h-screen relative px-0 md:px-10"
    >
      {/* Background Text */}
      <div
        className="transparent_text_work text-[15vw] hidden sm:hidden md:block"
        style={{
          color: "transparent",
          WebkitTextStroke: "2px white",
          transform: `translateY(${scrollY * 0.1}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        &lt;Career /&gt;
      </div>

      <div className="hero-content gap-8 px-4 sm:px-8 md:px-14 lg:px-20 flex-col">
        <div className="w-full flex flex-col gap-8 text-base-content">
          {/* Header */}
          <div ref={headerRef} className="w-full">
            <h1 className="font-sora text-base-content font-bold text-[24px] md:text-[32px] text-left">
              Career Journey
            </h1>
            <div className="w-48 h-1 bg-primary rounded-full mt-2"></div>
          </div>

          {/* Work Experience First, then Education */}
          <div className="space-y-12">
            {/* Work Experience Section */}
            <div ref={workExperienceRef} className="space-y-8">
              <div className="text-left">
                <h2 className="text-[20px] md:text-[24px] font-bold text-primary mb-2 font-sora">
                  Work Experience
                </h2>
                <div className="w-24 h-1 bg-primary rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {experienceData.map((exp, index) => (
                  <div key={exp.id} className="experience-card group">
                    <div className="bg-base-200 border border-base-content border-opacity-20 rounded-3xl p-6 text-[16px] font-sora h-full flex flex-col shadow-lg">
                      {/* Company and Role Header */}
                      <div className="flex flex-col mb-6">
                        <div>
                          <h3 className="text-md md:text-lg font-bold text-primary font-sora mb-1">
                            {exp.company}
                          </h3>
                          <p className="italic font-extralight font-sora text-[15px]">
                            {exp.role}
                          </p>
                        </div>
                        <time className="italic text-base-content text-opacity-70 font-sora text-sm mt-3">
                          {exp.dates}
                        </time>
                      </div>

                      {/* Summary */}
                      <div className="mb-6 flex-grow">
                        <p className="text-base-content text-opacity-80 font-sora font-extralight text-sm leading-loose">
                          {exp.summary}
                        </p>
                      </div>

                      {/* Skills */}
                      <div className="mt-4 pt-4 border-t border-base-content border-opacity-10 flex flex-row flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <div
                            key={skillIndex}
                            className={`badge badge-sm ${getBadgeClasses(skill)} border border-white`}
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div ref={educationRef} className="space-y-8">
              <div className="text-left">
                <h2 className="text-[20px] md:text-[24px] font-bold text-primary mb-2 font-sora">
                  Education
                </h2>
                <div className="w-24 h-1 bg-primary rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {educationData.map((edu, index) => (
                  <div key={edu.id} className="education-card group">
                    <div className="bg-base-200 border border-base-content border-opacity-20 rounded-3xl p-6 text-[16px] font-sora h-full shadow-lg">
                      {/* Institution and Dates Header */}
                      <div className="flex flex-col mb-6">
                        <div>
                          <h3 className="text-md md:text-lg font-bold text-primary font-sora mb-1">
                            {edu.institution}
                          </h3>
                          <p className="italic font-extralight font-sora text-[15px]">
                            {edu.degree}
                          </p>
                        </div>
                        <time className="italic text-base-content text-opacity-70 font-sora text-sm mt-3">
                          {edu.dates}
                        </time>
                      </div>

                      {/* CGPA */}
                      <div className="mb-5">
                        <p className="text-base-content text-opacity-80 font-sora font-medium">
                          {edu.cgpa}
                        </p>
                      </div>

                      {/* Additional Education Details */}
                      {index === 0 && (
                        <ul className="list-disc list-inside text-base-content text-opacity-80 leading-7 font-sora font-extralight text-sm space-y-1">
                          <li>Graduate Research Assistant</li>
                          <li>Active in Tech Communities</li>
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
