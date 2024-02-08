"use client";
import React, { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DownloadButton from "../components/DownloadBtn";
import AboutRefContext from "../context/AboutRefContext";
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useContext(AboutRefContext);
  const openSourceRef = useRef<HTMLDivElement>(null);
  const codingHoursRef = useRef<HTMLDivElement>(null);
  const profilePicRef = useRef<HTMLImageElement>(null); // Ref for the profile picture
  const headerRef = useRef<HTMLHeadingElement>(null); // Ref for the header
  const paragraphRef = useRef<HTMLParagraphElement>(null); // Ref for the paragraph
  const listRef = useRef<HTMLOListElement>(null); // Ref for the list
  const buttonsRef = useRef<HTMLDivElement>(null); // Ref for the buttons container
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start animations when About section comes into view
            if (profilePicRef.current) {
              gsap.from(profilePicRef.current, {
                scale: 0.8,
                opacity: 0,
                rotation: 10, // Rotate from -10 degrees to 0
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: profilePicRef.current,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              });
            }

            const contentRefs = [
              headerRef.current,
              paragraphRef.current,
              listRef.current,
              buttonsRef.current,
            ];
            contentRefs.forEach((ref) => {
              if (ref) {
                gsap.from(ref, {
                  y: 20,
                  opacity: 0,
                  duration: 1,
                  ease: "power3.out",
                  stagger: 0.2,
                  scrollTrigger: {
                    trigger: ref,
                    start: "top 80%",
                    toggleActions: "play none none none",
                  },
                });
              }
            });

            const openSourceTarget = { value: 0 };
            gsap.to(openSourceTarget, {
              value: 3,
              duration: 4, // Duration in seconds
              onUpdate: () => {
                if (openSourceRef.current) {
                  openSourceRef.current.textContent = `${Math.round(
                    openSourceTarget.value
                  )}+`;
                }
              },
            });

            const codingHoursTarget = { value: 0 };
            gsap.to(codingHoursTarget, {
              value: 8760,
              duration: 2, // Duration in seconds
              onUpdate: () => {
                if (codingHoursRef.current) {
                  // Use innerHTML to include the <sup> tag for the asterisk
                  codingHoursRef.current.innerHTML = `${Math.round(
                    codingHoursTarget.value
                  )}<sup>*</sup>`;
                }
              },
            });

            // Disconnect observer after animation starts
            observer.disconnect();
          }
        });
      },
      {
        root: null, // null means it observes changes in the viewport
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the element is in view
      }
    );

    if (aboutRef?.current) {
      observer.observe(aboutRef.current);
    }

    // Cleanup function to disconnect the observer
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={aboutRef} id="about" className="hero min-h-screen relative">
      <div
        className="transparent_text_about hidden sm:hidden md:block"
        style={{ color: "transparent", WebkitTextStroke: "2px white" }}
      >
        &lt;About /&gt;
      </div>

      <div className="hero-content gap-20 px-14 md:px-20 flex_col flex-col-reverse lg:flex-row">
        <div className="max-w-md flex_col">
          <div className="avatar">
            <div className=" w-72 md:w-96 mask mask-squircle">
              <img
                ref={profilePicRef}
                src="/assets/profile_pic.jpg"
                alt="profile"
              />
            </div>
          </div>
          <div className="stats stats-vertical lg:stats-horizontal shadow mt-20 font-mono">
            <div className="stat place-items-center">
              <div className="stat-title">Open Source</div>
              <div className="stat-value text-primary" ref={openSourceRef}>
                0+
              </div>
              <div className="stat-desc text-[14px]">
                Years of Contributions
              </div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Hours of Coding</div>
              <div className="stat-value text-secondary" ref={codingHoursRef}>
                0 <sup>*</sup>
              </div>
              <div className="stat-desc text-[14px]">
                Invested in self development
              </div>
            </div>
          </div>
        </div>

        <div className="flex_center_col gap-10 font-mono">
          <header
            ref={headerRef}
            className="font-mono text-white font-bold text-[24px] md:text-[32px]"
          >
            About Me
            <img src="/assets/undeline.svg" alt="underline" />
          </header>
          <p
            ref={paragraphRef}
            className="font-bold text-white text-xl lg:text-2xl"
          >
            Hello, I'm Het Patel, a dedicated software developer and a graduate
            student
          </p>
          <ol ref={listRef} className=" list-disc list-inside leading-8">
            <li>
              Throughout my software development career, I've shown a strong
              commitment to innovation and problem-solving.
            </li>
            <li>
              My approach is analytical, allowing me to identify challenges and
              devise effective solutions quickly.
            </li>

            <li>
              I value contributing to a collaborative and progressive work
              culture.
            </li>
          </ol>
          <div
            ref={buttonsRef}
            className="flex flex-row justify-baseline items-center gap-10"
          >
            <a href="#contact">
              <button className="btn btn-outline font-mono md:btn-md lg:btn-lg">
                Contact Me
              </button>
            </a>
            <a
              href="/assets/HetPatel_Resume.pdf"
              download="Het_Patel_Resume.pdf"
            >
              <button className="btn btn-outline font-mono md:btn-md lg:btn-lg">
                Download Resume
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
