"use client";
import { portfolio } from "@/utils/portfolio";
import gsap from "gsap";
import React, { useState, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Projects = () => {
  type ActiveTab = "all" | "project" | "post" | "article";
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const gridRef = useRef<HTMLDivElement>(null);

  const animationStateRef = useRef({ hasAnimated: false });

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerAnimations = () => {
      if (gridRef.current && animationStateRef.current.hasAnimated == false) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 100, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.1,
            ease: "power2.out",
            duration: 1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top center+=100",
              end: "bottom center",
              toggleActions: "play none none reverse",
              onEnter: () => {
                animationStateRef.current.hasAnimated = true;
              },
            },
          }
        );
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === "#portfolio") {
        triggerAnimations();
      }
    };

    // Listen to hash changes for direct navigation
    window.addEventListener("hashchange", handleHashChange);
    // Trigger on initial load in case of direct navigation to the hash
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    // Ensure gridRef.current is not null before proceeding with the animation
    if (gridRef.current) {
      // Safe to use gridRef.current here as it's confirmed to be non-null
      const gridElements = gridRef.current.children;

      // Fade out all grid items
      // You may need to use SVGs or pseudo-elements for the borders
      gsap.fromTo(
        gridElements,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  return (
    // <section id="projects" className="hero min-h-screen relative">
    <section
      id="portfolio"
      className="hero min-h-screen relative mt-20 md:mt-10 font-mono"
    >
      <div
        className="transparent_text_about w-[100vh] text-[10vw] hidden sm:hidden md:block -rotate-90 -translate-x-1/2 top-1/4"
        style={{ color: "transparent", WebkitTextStroke: "2px white" }}
      >
        &lt;Projects /&gt;
      </div>
      <div className="hero-content mx-0">
        <div className="w-[100%]">
          <header className="font-mono text-white font-bold text-[24px] md:text-[32px] py-10">
            My Portfolio
            <img src="/assets/undeline.svg" alt="underline" />
          </header>
          <div className="flex justify-start gap-0 md:gap-4 mb-8 font-mono text-white">
            <div role="tablist" className="tabs tabs-bordered">
              <a
                role="tab"
                className={`tab ${
                  activeTab === "all" ? "tab-active text-white" : ""
                }`}
                onClick={() => handleTabClick("all")}
              >
                All
              </a>
              <a
                role="tab"
                className={`tab ${
                  activeTab === "project" ? "tab-active text-white" : ""
                }`}
                onClick={() => handleTabClick("project")}
              >
                Projects
              </a>
              <a
                role="tab"
                className={`tab ${
                  activeTab === "post" ? "tab-active text-white" : ""
                }`}
                onClick={() => handleTabClick("post")}
              >
                Posts
              </a>
              <a
                role="tab"
                className={`tab ${
                  activeTab === "article" ? "tab-active text-white" : ""
                }`}
                onClick={() => handleTabClick("article")}
              >
                Articles
              </a>
            </div>
          </div>
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 auto-rows-max"
          >
            {/* Replace with your project items */}
            {portfolio
              .filter(
                (project) => activeTab === "all" || project.tag === activeTab
              )
              .map((project, index) => (
                <div
                  key={project.id}
                  className="card w-80 md:w-72 bg-base-300 shadow-xl"
                >
                  <figure className="h-40 w-full overflow-hidden">
                    <img
                      src={
                        project.projectImage ||
                        "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                      } // Fallback image if projectImage is empty
                      alt={project.title}
                      className="h-full w-full object-fill"
                    />
                  </figure>
                  <div className="card-body text-white">
                    <p className="card-title text-[18px]">{project.title}</p>
                    <p className="font-firaCode text-[14px] font-thin text-justify">
                      {project.description}
                    </p>
                    <div className="card-actions justify-center">
                      <a href={project.link} target="_blank">
                        <button className="btn btn-outline font-mono btn-wide md:btn-md">
                          View Project
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
    // </section>
  );
};

export default Projects;
