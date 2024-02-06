"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from "react";

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
  return (
    <section id="career" className="hero min-h-screen relative">
      <div
        className="transparent_text_work hidden sm:hidden md:block "
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
          <li className="mt-2 bg-base-300 bg-opacity-[0.6] p-4">
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
            <div className="timeline-end leading-6">
              <time className="italic">Sept 2021 - May 2023</time>
              <div className="text-base md:text-lg font-bold text-primary-blue">
                Northeastern University, Boston
              </div>
              <p className="italic font-extralight">
                Master of Science in Information Systems
              </p>
              <p className="font-extralight">CGPA - 3.85 on a scale of 4</p>
            </div>
            <hr />
          </li>
          <li className="mt-2 bg-base-300 bg-opacity-[0.6] p-4">
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
            <div className="timeline-end leading-6">
              <time className="italic text-white">Aug 2016 - May 2020</time>
              <div className="text-base md:text-lg font-bold text-primary-blue">
                Gujarat Technological University, India
              </div>

              <p className="italic font-extralight">
                Bachelor of Engineering in Computer Engineering
              </p>
              <p className="font-extralight">CGPA - 8.11 on a scale of 10</p>
            </div>
            <hr />
          </li>
          <div className="divider"></div>
          <header className="font-mono text-white font-bold text-[24px] md:text-[32px] mb-5">
            Work Experience
            <img src="/assets/undeline.svg" alt="underline" />
          </header>
          <li className="bg-base-300 bg-opacity-[0.6] p-4">
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
            <div className="timeline-end">
              <time className="italic text-white">Sept 2021 - May 2023</time>
              <div className="text-base md:text-lg font-bold text-primary-blue">
                Silver Webbuzz Private Limited
              </div>
              <p className="italic font-extralight">Software Developer</p>
              <ul className="pl-0 md:pl-10 list-disc list-inside text-white leading-8">
                <li>
                  The Apple Macintosh—later rebranded as the Macintosh 128K—is
                  the original Apple Macintosh personal computer
                </li>
                <li>
                  The Apple Macintosh—later rebranded as the Macintosh 128K—is
                  the original Apple Macintosh personal computer
                </li>
              </ul>
              <div className="mt-4 flex flex-row flex-wrap gap-6">
                <div className="badge badge-success text-white bg-[#3178c6]">
                  Typescript
                </div>
                <div className="badge badge-success bg-green-600">Nodejs</div>
                <div className="badge badge-info bg-[#61DBFB]">React</div>
                <div className="badge badge-info bg-black text-white">
                  Nextjs
                </div>
                <div className="badge badge-info bg-green-400">MongoDB</div>
                <div className="badge badge-info bg-[#f29111]">MySQL</div>
                <div className="badge badge-info bg-[#1D63ED] text-white">
                  Docker
                </div>
                <div className="badge badge-info bg-[#E10098] text-white">
                  GraphQL
                </div>
              </div>
            </div>
            <hr />
          </li>
          <li className="mt-2 bg-base-300 bg-opacity-[0.6] p-4">
            <hr />
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
            <div className="timeline-end">
              <time className="italic text-white">Dec 2019 - Apr 2020</time>
              <div className="text-base md:text-lg font-bold text-primary-blue">
                Shinestar Web Solutions
              </div>
              <p className="italic font-extralight">
                Software Developer Intern
              </p>
              <ul className="pl-0 md:pl-10 list-disc list-inside text-white leading-8">
                <li>
                  The Apple Macintosh—later rebranded as the Macintosh 128K—is
                  the original Apple Macintosh personal computer
                </li>
                <li>
                  The Apple Macintosh—later rebranded as the Macintosh 128K—is
                  the original Apple Macintosh personal computer
                </li>
              </ul>
              <div className=" mt-4 flex flex-row flex-wrap gap-6">
                <div className="badge badge-success bg-[#f7df1e]">
                  Javascript
                </div>
                <div className="badge badge-success bg-green-600">Nodejs</div>
                <div className="badge badge-info bg-[#61DBFB]">React</div>
                <div className="badge badge-info bg-black text-white">
                  Express
                </div>
                <div className="badge badge-info bg-green-400">MongoDB</div>
              </div>
            </div>
            <hr />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Experience;
