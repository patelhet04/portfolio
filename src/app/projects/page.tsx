"use client";
import { portfolio } from "@/utils/portfolio";
import gsap from "gsap";
import React, { useState, useEffect, useRef } from "react";

const Projects = () => {
  type ActiveTab = "all" | "project" | "post" | "article";
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const triggerAnimations = () => {
      if (gridRef.current && !animationTriggered) {
        const gridElements = Array.from(gridRef.current.children);
        gsap.fromTo(
          gridElements,
          { x: -100, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, stagger: 0.1, ease: "power2.out", delay: 0.5 }
        );
        setAnimationTriggered(true); // Set flag to true after animation
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === "#portfolio") {
        triggerAnimations();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerAnimations();
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Also check on initial load

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, [animationTriggered]); // Depend on the animationTriggered state

  useEffect(() => {
    // Reset the animation flag when the component is re-mounted (e.g., navigating away and back)
    setAnimationTriggered(false);
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
      <div className="hero-content mx-20">
        <div className="w-full">
          <header className="font-mono text-white font-bold text-[24px] md:text-[32px] py-10">
            My Portfolio
            <img src="/assets/undeline.svg" alt="underline" />
          </header>
          <div className="flex justify-start gap-4 mb-8 font-mono text-white">
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {/* Replace with your project items */}
            {portfolio
              .filter(
                (project) => activeTab === "all" || project.tag === activeTab
              )
              .map((project, index) => (
                <div
                  key={project.id}
                  className="card w-80 bg-base-100 shadow-xl"
                >
                  <figure>
                    <img
                      src={
                        project.projectImage ||
                        "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                      } // Fallback image if projectImage is empty
                      alt={project.title}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{project.title}</h2>
                    <p>{project.description}</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">View Project</button>
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
