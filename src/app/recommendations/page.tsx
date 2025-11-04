"use client";
import React, { useEffect, useRef, useState } from "react";
import { recommendationsData } from "@/utils/recommendations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tilt from "react-parallax-tilt";
import Image from "next/image";

const Recommendations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<{
    [key: number]: number;
  }>({});
  const [activeCard, setActiveCard] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize image carousel for cards with images
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => {
        const newState = { ...prev };
        recommendationsData.forEach((rec) => {
          if (rec.hasImages && rec.images) {
            const currentIndex = prev[rec.id] || 0;
            newState[rec.id] = (currentIndex + 1) % rec.images.length;
          }
        });
        return newState;
      });
    }, 4000);

    // Card entrance animations
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current.querySelectorAll(".recommendation-card"),
          {
            y: 50,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top center+=100",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  // Auto-rotate cards every 3 seconds when not hovered
  useEffect(() => {
    if (isHovered) return;

    const autoRotateInterval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % recommendationsData.length);
    }, 3000);

    return () => {
      clearInterval(autoRotateInterval);
    };
  }, [isHovered]);

  const nextCard = () => {
    setActiveCard((prev) => (prev + 1) % recommendationsData.length);
  };

  const prevCard = () => {
    setActiveCard(
      (prev) =>
        (prev - 1 + recommendationsData.length) % recommendationsData.length
    );
  };

  return (
    <section
      id="recommendations"
      ref={containerRef}
      className="hero min-h-screen relative px-0 md:px-10 pb-20"
    >
      <div
        className="transparent_text_about hidden sm:hidden md:block"
        style={{ color: "transparent", WebkitTextStroke: "2px white" }}
      >
        &lt;Testimonials /&gt;
      </div>

      <div className="hero-content gap-4 px-4 sm:px-8 md:px-14 lg:px-20 flex-col">
        <div className="w-full flex flex-col gap-4 text-base-content">
          <header className="font-sora text-base-content font-bold text-[24px] md:text-[32px] py-6">
            Testimonials
            <div className="w-48 h-1 bg-primary rounded-full mt-2"></div>
            <p className="text-sm font-normal opacity-60 mt-2">
              What colleagues and mentors say about my work
            </p>
          </header>

          {/* Featured Testimonial - Large Card */}
          <div 
            className="recommendation-card relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                {recommendationsData.map((rec, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCard(index)}
                    aria-label={`View testimonial from ${rec.name}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeCard === index
                        ? "w-8 bg-primary"
                        : "w-2 bg-base-content bg-opacity-20 hover:bg-opacity-40"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prevCard}
                  aria-label="Previous testimonial"
                  className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:bg-opacity-20"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextCard}
                  aria-label="Next testimonial"
                  className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:bg-opacity-20"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {recommendationsData.map((recommendation, index) => (
              <div
                key={recommendation.id}
                className={`transition-all duration-500 ${
                  activeCard === index
                    ? "opacity-100 block"
                    : "opacity-0 hidden"
                }`}
              >
                <Tilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  perspective={1200}
                  transitionSpeed={600}
                  scale={1.01}
                  gyroscope={false}
                  className="w-full"
                >
                  {/* Unified Card Layout */}
                  <div className="relative h-[715px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-base-content border-opacity-20 group flex flex-col lg:flex-row">
                    {/* Image Section - Always Present */}
                    <div className="relative lg:w-2/5 h-72 lg:h-auto flex-shrink-0 bg-base-300">
                      {recommendation.hasImages && recommendation.images ? (
                        <>
                          {recommendation.images.map((image, imgIndex) => (
                            <Image
                              key={imgIndex}
                              src={image}
                              alt={`${recommendation.name} background ${imgIndex + 1}`}
                              fill
                              className={`object-cover transition-opacity duration-1000 ${
                                (activeImageIndex[recommendation.id] || 0) ===
                                imgIndex
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                          ))}
                          {/* Image Indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {recommendation.images.map((_, imgIndex) => (
                              <div
                                key={imgIndex}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  (activeImageIndex[recommendation.id] || 0) ===
                                  imgIndex
                                    ? "w-8 bg-white"
                                    : "w-1.5 bg-white/40"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      ) : (
                        // Empty image placeholder with decorative element
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="w-20 h-20 text-base-content opacity-10"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-3/5 bg-base-200 p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto scrollbar-hide">
                      <div>
                        {/* Quote Icon */}
                        <div className="mb-6 opacity-20">
                          <svg
                            className="w-12 h-12 text-primary"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                          </svg>
                        </div>

                        {/* Recommendation Content */}
                        <p className="font-sora text-sm sm:text-base leading-relaxed mb-6 text-base-content">
                          {recommendation.content}
                        </p>

                        {recommendation.nickname && (
                          <div className="bg-primary bg-opacity-10 border-l-4 border-primary px-4 py-3 rounded-xl mb-6">
                            <p className="font-sora italic text-sm text-primary font-medium">
                              {recommendation.nickname}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Author Info */}
                      <div className="border-t border-base-content border-opacity-20 pt-6">
                        <h3 className="font-sora font-bold text-xl mb-2 text-base-content">
                          {recommendation.name}
                        </h3>
                        <p className="font-sora text-sm text-base-content opacity-80 mb-1">
                          {recommendation.title}
                        </p>
                        <p className="font-sora text-sm text-base-content opacity-70 mb-3">
                          {recommendation.company}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="badge badge-primary badge-sm">
                            {recommendation.date}
                          </div>
                          <span className="text-xs text-base-content opacity-60">
                            {recommendation.relationship}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
