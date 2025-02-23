"use client";
import { portfolio } from "@/utils/portfolio";
import gsap from "gsap";
import React, { useState, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const Projects = () => {
  type ActiveTab = "all" | "project" | "post" | "article" | "documentation";
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const animationStateRef = useRef({ hasAnimated: false });

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
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

    return () => ctx.revert(); // Cleanup animations
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gsap.utils.toArray<HTMLDivElement>(
        gridRef.current.querySelectorAll(".card")
      );

      // Apply hover effects using GSAP
      cards.forEach((card) => {
        gsap.set(card, { scale: 1 });

        gsap.to(card, {
          scale: 1.05,
          duration: 0.3,
          paused: true,
          id: `hover-${card.id}`,
        });

        card.addEventListener("mouseenter", () =>
          gsap.getById(`hover-${card.id}`)?.play()
        );
        card.addEventListener("mouseleave", () =>
          gsap.getById(`hover-${card.id}`)?.reverse()
        );
      });
    }
  }, [activeTab]);

  return (
    <section
      id="portfolio"
      className="hero min-h-screen relative mt-10 font-mono px-0 md:px-10"
    >
      <div
        className="transparent_text_about hidden sm:hidden md:block mt-10 lg:mt-0 2xl:-mt-14"
        style={{ color: "transparent", WebkitTextStroke: "2px white" }}
      >
        &lt;Projects /&gt;
      </div>
      <div className="hero-content mx-0">
        <div className="w-full">
          <header className="font-mono text-white font-bold text-[24px] md:text-[32px] py-10">
            My Portfolio
            <Image
              src="/assets/undeline.svg"
              alt="underline"
              width={200}
              height={20}
            />
          </header>
          <div className="flex justify-start gap-0 md:gap-4 mb-8 font-mono text-white">
            <div role="tablist" className="tabs tabs-bordered">
              {["all", "project", "post", "article", "documentation"].map(
                (tab) => (
                  <a
                    key={tab}
                    role="tab"
                    className={`tab ${
                      activeTab === tab ? "tab-active text-white" : ""
                    }`}
                    onClick={() => handleTabClick(tab as ActiveTab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </a>
                )
              )}
            </div>
          </div>
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-max min-h-[1200px]"
          >
            {portfolio
              .filter(
                (project) => activeTab === "all" || project.tag === activeTab
              )
              .map((project) => (
                <div
                  key={project.id}
                  className="card h-full w-80 md:w-72 bg-base-300 shadow-xl border-l border-b"
                >
                  {project.tag !== "documentation" && (
                    <figure className="h-40 w-full overflow-hidden">
                      <Image
                        src={
                          project.projectImage ||
                          "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        }
                        alt={project.title}
                        width={288}
                        height={160}
                        className="h-full w-full object-cover"
                      />
                    </figure>
                  )}
                  <div className="card-body text-white">
                    <p className="card-title text-[18px]">{project.title}</p>
                    <p className="font-firaCode text-[14px] font-thin text-justify">
                      {project.description}
                    </p>
                    {project.tag === "documentation" ? (
                      <div className="mt-4">
                        <iframe
                          src={project.link}
                          className="w-full h-[300px] border"
                          title={project.title}
                        ></iframe>
                        <div className="mt-2 text-center">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline primary-btn font-mono"
                          >
                            Open in New Tab
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="card-actions justify-center">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="primary-btn btn btn-outline font-mono btn-wide md:btn-md ">
                            View Project
                          </button>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
