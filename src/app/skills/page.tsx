"use client";
import { categories } from "@/utils/skills";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";
const Skills = () => {
  const progressRefs = useRef<Map<string, HTMLProgressElement>>(new Map());
  const { theme } = useTheme();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger); // Ensure ScrollTrigger plugin is registered

    categories.forEach((category) => {
      category.skills.forEach((skill) => {
        const refKey = `${category.title}-${skill.name}`; // Unique identifier for each skill
        const progressElement = progressRefs.current.get(refKey);
        if (progressElement) {
          gsap.fromTo(
            progressElement,
            { value: 0, scaleX: 0 },
            {
              value: skill.level,
              scaleX: 1,
              duration: 1,
              ease: "power3.out",
              delay: skill.id * 0.1,
              transformOrigin: "left center",
              scrollTrigger: {
                trigger: progressElement, // This could also be a different element that makes sense as a trigger
                start: "top bottom", // Adjust start position as needed (when the top of the element hits the bottom of the viewport)
                toggleActions: "play none none none", // Play animation when scrolled into view and do nothing on scroll back
              },
            }
          );
        }
      });
    });
  }, []);
  useEffect(() => {
    gsap.fromTo(
      ".card",
      { y: 50, opacity: 0 }, // Starting from 50px below and fully transparent
      {
        y: 0,
        opacity: 1,
        stagger: 0.05, // Stagger the start times of each card's animation
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".card",
          start: "top 90%", // Start the animation when the top of the card is 90% from the top of the viewport
          toggleActions: "play none none none",
        },
      }
    );
    gsap.fromTo(
      ".text-white.font-thin.text-sm",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power3.inOut",
        stagger: 0.1, // Stagger the start times of each title's animation
        scrollTrigger: {
          trigger: ".text-white.font-thin.text-sm",
          start: "top 80%", // Start the animation when the top of the text is 80% from the top of the viewport
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section id="skills" className="hero min-h-screen relative">
      <div
        className="transparent_text_about hidden sm:hidden md:block"
        style={{ color: "transparent", WebkitTextStroke: "2px white" }}
      >
        &lt;Skill /&gt;
      </div>

      <div className="hero-content flex flex-col items-baseline ">
        <header className="font-mono text-white font-bold text-[24px] md:text-[32px] px-10 lg:px-20 ">
          Skills
          <img src="/assets/undeline.svg" alt="underline" />
        </header>
        <div className="flex justify-center flex-wrap">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`card w-full lg:w-[40%] bg-base-200 bg-opacity-[0.6] shadow-xl mx-10 my-4 border-l border-r ${
                theme === "retro" ? "border-[#2e282a]" : "border-white"
              }  font-firaCode`}
            >
              <div className="card-body">
                <div className="flex items-center text-white">
                  <FontAwesomeIcon
                    icon={category.icon}
                    className="skill-icon mr-2"
                  />
                  <h2 className="card-title">{category.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.skills.map((skill, skillIndex) => {
                    const refKey = `${category.title}-${skill.name}`;
                    return (
                      <div key={skillIndex} className=" space-y-2">
                        <div className="skill-name text-white font-thin text-sm">
                          {skill.name}
                        </div>

                        <div data-theme="mytheme" className="bg-transparent">
                          <progress
                            ref={(el) => {
                              if (el) progressRefs.current.set(refKey, el);
                            }}
                            className={`progress progress-primary w-full`}
                            value={skill.level}
                            max="100"
                          ></progress>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
