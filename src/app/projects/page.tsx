"use client";
import { portfolio } from "@/utils/portfolio";
import gsap from "gsap";
import React, { useState, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Tilt from "react-parallax-tilt";

const Projects = () => {
  type ActiveTab = "project" | "post" | "article" | "documentation";
  const [activeTab, setActiveTab] = useState<ActiveTab>("project");
  const gridRef = useRef<HTMLDivElement>(null);
  const animationStateRef = useRef({ hasAnimated: false });

  const handleTabClick = (tab: ActiveTab) => {
    if (tab === activeTab) return;

    // Animate current content out to the left
    if (gridRef.current) {
      gsap.to(gridRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          setActiveTab(tab);
          // Immediately position new content off-screen to the right
          gsap.set(gridRef.current, { x: "100%", opacity: 0 });
          // Then animate it in from the right
          gsap.to(gridRef.current, {
            x: "0%",
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.1,
          });
        },
      });
    } else {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      if (gridRef.current && !animationStateRef.current.hasAnimated) {
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
              toggleActions: "play none none none",
              onEnter: () => (animationStateRef.current.hasAnimated = true),
            },
          }
        );
      }
    }, gridRef);

    return () => ctx.revert();
  }, []);

  // Removed GSAP hover animations - letting Tilt handle all card interactions

  const filteredProjects = portfolio.filter(
    (project) => project.tag === activeTab
  );

  const getTabCount = (tab: ActiveTab) => {
    return portfolio.filter((project) => project.tag === tab).length;
  };

  return (
    <section
      id="portfolio"
      className="hero min-h-screen relative px-0 md:px-10 pb-20"
    >
      <div
        className="transparent_text_about hidden sm:hidden md:block"
        style={{ color: "transparent", WebkitTextStroke: "2px white" }}
      >
        &lt;Projects /&gt;
      </div>
      <div className="hero-content gap-8 px-4 sm:px-8 md:px-14 lg:px-20 flex-col">
        <div className="w-full flex flex-col gap-8 text-base-content">
          <div className="w-full">
            <header className="font-sora text-base-content font-bold text-[24px] md:text-[32px] py-10">
              My Portfolio
              <div className="w-48 h-1 bg-primary rounded-full mt-2"></div>
            </header>

            {/* Enhanced Tab Navigation */}
            <div className="flex justify-start gap-0 md:gap-4 mb-8 font-sora text-base-content">
              <div role="tablist" className="tabs tabs-bordered">
                {(
                  ["project", "post", "article", "documentation"] as ActiveTab[]
                ).map((tab) => (
                  <a
                    key={tab}
                    role="tab"
                    className={`tab relative transition-all duration-300 ${
                      activeTab === tab
                        ? "tab-active text-base-content"
                        : "hover:text-opacity-80"
                    }`}
                    onClick={() => handleTabClick(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    <span className="ml-2 text-xs opacity-60">
                      ({getTabCount(tab)})
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Enhanced Grid */}
            <div
              ref={gridRef}
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max min-h-[600px]`}
            >
              {filteredProjects.map((project, index) => (
                <Tilt
                  key={project.id}
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  perspective={1000}
                  transitionSpeed={400}
                  scale={1.03}
                  gyroscope={false}
                  className="project-card h-full w-full"
                >
                  <div className="h-full w-full bg-base-200 shadow-xl border border-base-content border-opacity-20 rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                  >
                  {project.tag !== "documentation" && (
                    <figure className="h-48 w-full overflow-hidden relative flex-shrink-0">
                      <Image
                        src={
                          project.projectImage ||
                          "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        }
                        alt={project.title}
                        width={400}
                        height={192}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        <div className="badge badge-primary badge-sm font-sora">
                          {project.tag}
                        </div>
                      </div>
                    </figure>
                  )}

                  <div className="card-body text-base-content p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="card-title text-[18px] font-sora leading-tight">
                        {project.title}
                      </h3>
                      {project.tag === "documentation" && (
                        <div className="badge badge-primary badge-sm font-sora">
                          {project.tag}
                        </div>
                      )}
                    </div>

                    <p className="font-sora text-[14px] font-thin text-justify leading-relaxed mb-4 text-base-content text-opacity-90 flex-grow">
                      {project.description}
                    </p>

                    {project.tag === "documentation" ? (
                      <div className="mt-auto">
                        <div className="bg-base-100 bg-opacity-50 rounded-2xl p-4 mb-4">
                          <iframe
                            src={project.link}
                            className="w-full h-[250px] border-0 rounded-xl"
                            title={project.title}
                          ></iframe>
                        </div>
                        <div className="text-center">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline primary-btn font-sora w-full rounded-2xl"
                          >
                            Open in New Tab
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="card-actions justify-center mt-auto">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline primary-btn font-sora btn-wide hover:scale-105 transition-transform duration-200 rounded-2xl"
                        >
                          View{" "}
                          {project.tag === "project"
                            ? "Project"
                            : project.tag.charAt(0).toUpperCase() +
                              project.tag.slice(1)}
                        </a>
                      </div>
                    )}
                  </div>
                  </div>
                </Tilt>
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-base-content text-opacity-60 font-sora">
                  No {activeTab}s available yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
