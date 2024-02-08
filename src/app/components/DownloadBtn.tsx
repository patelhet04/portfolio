"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { debounce } from "lodash";

const DownloadButton: React.FC<{
  aboutRef: React.RefObject<HTMLElement>;
}> = ({ aboutRef }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isInAboutSection, setIsInAboutSection] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (aboutRef?.current) {
        const aboutSectionTop = aboutRef.current.offsetTop;
        const aboutSectionBottom =
          aboutSectionTop + aboutRef.current.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;

        if (
          scrollPosition > aboutSectionTop &&
          scrollPosition < aboutSectionBottom
        ) {
          setIsInAboutSection(true);
        } else {
          setIsInAboutSection(false);
        }
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [aboutRef]);

  useEffect(() => {
    gsap.to(".indicator", {
      autoAlpha: isInAboutSection ? 0 : 1,
      duration: 0.5,
    });
  }, [isInAboutSection]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout; // Use ReturnType<typeof setTimeout> if NodeJS.Timeout does not work

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // Adjust the delay as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    // GSAP animation to show/hide the indicator item based on scrolling
    gsap.to(".indicator-item", {
      opacity: isScrolling ? 0 : 1,
      scale: isScrolling ? 0.5 : 1,
      duration: 0.5,
      ease: "power1.inOut",
    });
  }, [isScrolling]);

  return (
    <div className="indicator">
      <a
        href="/assets/HetPatel_Resume.pdf"
        download="Het_Patel_Resume.pdf"
        className="z-30 fixed bottom-5 right-5 md:right-14 flex items-center justify-center gap-2  bg-primary-blue px-3 md:px-5  py-2 md:py-3 rounded-[14px] font-mono border border-base-300 transition ease-in-out duration-300 transform hover:scale-110 shadow-lg"
      >
        <span className="indicator-item indicator-start badge badge-success bg-white font-bold">
          Download Here
        </span>
        <FontAwesomeIcon
          icon={faDownload}
          className="text-lg md:text-xl text-base-300"
        />
        <p className="text-base-300 text-base md:text-lg font-bold">Resume</p>
      </a>
    </div>
  );
};

export default DownloadButton;
