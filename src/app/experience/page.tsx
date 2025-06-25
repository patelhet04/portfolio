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
  const workExperienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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

  const badgeColors: { [skill: string]: string } = {
    Typescript: "bg-[#3178c6] text-white",
    Nodejs: "bg-green-600 text-white",
    React: "bg-[#61DBFB] text-black",
    Nextjs: `${theme === "retro" ? "bg-white text-black" : "bg-black text-white"}`,
    MongoDB: "bg-green-400 text-black",
    MySQL: "bg-[#f29111] text-white",
    Docker: "bg-[#1D63ED] text-white",
    GraphQL: "bg-[#E10098] text-white",
    Javascript: "bg-[#f7df1e] text-black",
    Express:
      theme === "retro" ? "bg-white text-gray-700" : "bg-gray-700 text-white",
    GenAI: "bg-[#10B981] text-white",
    RAG: "bg-[#6366F1] text-white",
    "Amazon Web Services": "bg-[#FF9900] text-black",
    "Python (Programming Language)": "bg-[#3776AB] text-white",
    "Prompt Engineering": "bg-[#8B5CF6] text-white",
    "AI Agents": "bg-[#14B8A6] text-white",
    "Vector Databases": "bg-[#0EA5E9] text-white",
    Python: "bg-[#3776AB] text-white",
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
        style={{ color: "transparent", WebkitTextStroke: "2px white" }}
      >
        &lt;Career /&gt;
      </div>

      <div className="flex flex-col gap-8 mx-10 mt-20 md:mt-0 text-white">
        {/* Header */}
        <div ref={headerRef} className="w-full">
          <h1 className="font-mono text-white font-bold text-[24px] md:text-[32px] text-left">
            Career Journey
          </h1>
          <div className="flex justify-start">
            <Image
              src="/assets/undeline.svg"
              alt="underline"
              width={200}
              height={20}
            />
          </div>
        </div>

        {/* Single Column Layout - Education First, then Work Experience */}
        <div className="space-y-12">
          {/* Education Section */}
          <div ref={educationRef} className="space-y-8">
            <div className="text-left">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#49C5B6] mb-2 font-mono">
                Education
              </h2>
              <div className="w-24 h-1 bg-[#49C5B6] rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {educationData.map((edu, index) => (
                <div key={edu.id} className="education-card group">
                  <div className="bg-base-300 bg-opacity-[0.5] rounded-lg p-4 text-[16px] font-mono h-full">
                    {/* Institution and Dates Header */}
                    <div className="flex flex-col mb-4">
                      <div>
                        <h3 className="text-md md:text-lg font-bold text-primary-blue font-mono">
                          {edu.institution}
                        </h3>
                        <p className="italic font-extralight font-mono">
                          {edu.degree}
                        </p>
                      </div>
                      <time className="italic text-white font-mono text-sm mt-2">
                        {edu.dates}
                      </time>
                    </div>

                    {/* CGPA */}
                    <div className="mb-4">
                      <p className="text-white font-mono">{edu.cgpa}</p>
                    </div>

                    {/* Additional Education Details */}
                    {index === 0 && (
                      <ul className="list-disc list-inside text-white leading-6 font-firaCode font-extralight text-sm">
                        <li>Graduate Research Assistant</li>
                        <li>Active in Tech Communities</li>
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience Section */}
          <div ref={workExperienceRef} className="space-y-8">
            <div className="text-left">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#49C5B6] mb-2 font-mono">
                Work Experience
              </h2>
              <div className="w-24 h-1 bg-[#49C5B6] rounded-full"></div>
            </div>

            {experienceData.map((exp, index) => (
              <div key={exp.id} className="experience-card group">
                <div className="bg-base-300 bg-opacity-[0.5] rounded-lg p-4 text-[16px] mb-5 font-mono">
                  {/* Company and Role Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-md md:text-lg font-bold text-primary-blue font-mono">
                        {exp.company}
                      </h3>
                      <p className="italic font-extralight font-mono">
                        {exp.role}
                      </p>
                    </div>
                    <time className="italic text-white font-mono text-sm">
                      {exp.dates}
                    </time>
                  </div>

                  {/* Tasks */}
                  {exp.tasks.length > 0 && (
                    <div className="mb-6">
                      <ul className="pl-0 list-disc list-inside text-white leading-8 max-h-[200px] overflow-y-auto">
                        {exp.tasks.map((task, taskIndex) => (
                          <li
                            key={taskIndex}
                            className="text-left font-firaCode font-extralight mb-2 text-sm"
                          >
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills */}
                  <div className="mt-4 flex flex-row flex-wrap gap-6">
                    {exp.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className={`badge badge-info ${getBadgeClasses(skill)} border border-white`}
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
      </div>
    </section>
  );
};

export default Experience;
