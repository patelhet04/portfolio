"use client";
import About from "./about/page";
import Skills from "./skills/page";
import Experience from "./experience/page";
import Contact from "./contact/page";
import React, { Suspense, lazy, useEffect, useRef } from "react";
const Home = lazy(() => import("./home/page"));
const Projects = lazy(() => import("./projects/page"));

const Main: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log(entry);
          if (entry.isIntersecting) {
            const currentId = entry.target.id;
            window.history.replaceState(null, "", `#${currentId}`);
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.5, // Adjust this value based on your needs
      }
    );

    // Target sections to observe
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div id="home">
        <Home />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </Suspense>
  );
};

export default Main;
