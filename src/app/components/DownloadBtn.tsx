"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { debounce } from "lodash";
import { useTheme } from "../context/ThemeContext";

const DownloadButton: React.FC<{
  aboutRef: React.RefObject<HTMLElement>;
}> = ({ aboutRef }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isInAboutSection, setIsInAboutSection] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    // Show button after loader completes
    const handleLoaderComplete = () => {
      setShowButton(true);
    };
    
    window.addEventListener('loaderComplete', handleLoaderComplete);
    
    return () => {
      window.removeEventListener('loaderComplete', handleLoaderComplete);
    };
  }, []);

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
    let scrollTimeout: ReturnType<typeof setTimeout>; // Use ReturnType<typeof setTimeout> if NodeJS.Timeout does not work

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

  if (!showButton) return null;

  return (
    <div className="indicator">
      <a
        href="https://docs.google.com/document/d/1o-yUJEaBgF6yATc7LSCH2HWCTxTil09D/edit?usp=sharing&ouid=112724013765530570552&rtpof=true&sd=true"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          className={`z-30 fixed bottom-5 right-5 md:right-10 flex items-center justify-center  ${
            theme === "lemonade"
              ? "btn btn-neutral"
              : "btn btn-neutral bg-primary hover:bg-primary"
          }  gap-3 rounded-2xl font-sora transition ease-in-out duration-300 transform hover:scale-110 shadow-lg`}
        >
          <span className="indicator-item indicator-start badge badge-success bg-white font-bold text-base-300">
            View Resume
          </span>
          <FontAwesomeIcon
            icon={faDownload}
            className="text-lg md:text-xl text-white"
          />
          <p
            className="md:text-lg font-bold text-white"
          >
            Resume
          </p>
        </button>
      </a>
    </div>
  );
};

export default DownloadButton;
