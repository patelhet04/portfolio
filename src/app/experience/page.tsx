"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from "react";
import { educationData, experienceData } from "@/utils/experience";
const Experience = () => {
  useEffect(() => {
    // Register the ScrollTrigger plugin with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Define the animation for the Education section
    gsap.fromTo(
      "#career",
      { opacity: 0, x: 100 }, // Start state: invisible and 100px to the right of its original position
      {
        opacity: 1, // End state: fully visible
        x: 0, // Move to original horizontal position
        duration: 2, // Animation duration
        ease: "power3.out", // Easing function for a smooth transition
        scrollTrigger: {
          trigger: "#career",
          start: "top 80%", // Trigger the animation when the top of the section is 80% from the top of the viewport
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  type BadgeColors = {
    [skill: string]: string;
  };

  const badgeColors: BadgeColors = {
    Typescript: "bg-[#3178c6] text-white",
    Nodejs: "bg-green-600",
    React: "bg-[#61DBFB]",
    Nextjs: "bg-black text-white",
    MongoDB: "bg-green-400",
    MySQL: "bg-[#f29111]",
    Docker: "bg-[#1D63ED] text-white",
    GraphQL: "bg-[#E10098] text-white",
    Javascript: "bg-[#f7df1e]",
    Express: "bg-gray-700 text-white",
    // Add more mappings as needed
  };

  const getBadgeClasses = (skill: string): string => {
    const defaultClasses = "bg-gray-400 text-white";
    return badgeColors[skill] || defaultClasses;
  };
  return (
    <section id="career" className="hero min-h-screen relative px-0 md:px-10">
      <div
        className="transparent_text_work text-[15vw] hidden sm:hidden md:block"
        style={{ color: "transparent", WebkitTextStroke: "2px white" }}
      >
        &lt;Career /&gt;
      </div>
      <div className="hero-content flex flex-col gap-20 mx-10 mt-20 md:mt-0 text-white">
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical font-mono rounded-[1rem] text-[12px] md:text-[14px]">
          <header className="font-mono font-bold text-[24px] md:text-[32px] mb-5">
            Education
            <img src="/assets/undeline.svg" alt="underline" />
          </header>
          {educationData.map((edu) => (
            <li
              key={edu.id}
              className="mt-2 bg-base-300 bg-opacity-[0.6] p-4 text-[16px]"
            >
              <div className="timeline-middle">
                {/* SVG icon can be extracted as a component if used multiple times */}
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
                <time className="italic">{edu.dates}</time>
                <div className="text-lg md:text-xl font-bold text-primary-blue">
                  {edu.institution}
                </div>
                <p className="italic">{edu.degree}</p>
                <p>{edu.cgpa}</p>
              </div>
              <hr />
            </li>
          ))}
          <div className="divider"></div>
          <header className="font-mono text-white font-bold text-[24px] md:text-[32px] mb-5">
            Work Experience
            <img src="/assets/undeline.svg" alt="underline" />
          </header>
          {experienceData.map((exp) => (
            <li
              key={exp.id}
              className="bg-base-300 bg-opacity-[0.6] p-4 text-[16px]"
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
                <ul className="pl-0 md:pl-10 list-disc list-inside text-white leading-8">
                  {exp.tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-row flex-wrap gap-6">
                  {exp.skills.map((skill, index) => (
                    <div
                      key={index}
                      className={`badge badge-info ${getBadgeClasses(skill)}`}
                    >
                      {/* TailwindCSS classes for styling badges can be applied here */}{" "}
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Experience;
