// components/Sidebar.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { navLinks } from "@/utils/navlinks";
import {
  faFacebook,
  faGithub,
  faGithubAlt,
  faGooglePlusG,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import gsap from "gsap";
const Sidebar = () => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState(
    typeof window !== "undefined" ? window.location.hash : ""
  );

  useEffect(() => {
    const handleScroll = () => {
      let newActivePath = "";
      let sectionFound = false;

      navLinks.forEach((link) => {
        const section = document.querySelector(link.path) as HTMLElement; // Type assertion here
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (
            window.scrollY >= sectionTop - sectionHeight / 4 &&
            window.scrollY < sectionTop + sectionHeight - sectionHeight / 4
          ) {
            newActivePath = link.path;
            sectionFound = true;
          }
        }
      });

      if (sectionFound && newActivePath !== activePath) {
        setActivePath(newActivePath);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activePath]);

  useEffect(() => {
    const parallaxEffect = (e: MouseEvent) => {
      if (!linkRef.current) return;

      const rect = linkRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Adjust these factors to control the intensity and direction of the movement
      const intensityX = -0.4; // Negative value for inverse direction
      const intensityY = -0.4;

      const moveX = deltaX * intensityX;
      const moveY = deltaY * intensityY;

      gsap.to(linkRef.current, {
        x: moveX,
        y: moveY,
        rotation: deltaX * intensityX * 0.1,
        ease: "none",
      });
    };

    // Listen to mousemove events on the element itself for a localized effect
    if (linkRef.current) {
      linkRef.current.addEventListener("mousemove", parallaxEffect);
    }
    // Cleanup function to remove the event listener
    return () => {
      if (linkRef.current) {
        linkRef.current.removeEventListener("mousemove", parallaxEffect);
      }
    };
  }, []);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* Bars Icon - Visible only on smaller screens */}
      <div className="fixed top-5 left-5 z-50 xl:hidden">
        <FontAwesomeIcon
          icon={faBars}
          className="text-white cursor-pointer text-2xl hover:text-gray-400"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        />
      </div>
      <aside
        className={`sidebar transform w-64 pt-14 pb-14 bg-base-200 h-screen flex_col overflow-auto transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0`}
      >
        {/* Image Section */}
        <div className="flex_col">
          <div className="avatar pb-5 w-32">
            <img src="/assets/Memoji.png" alt="Profile Picture" />
          </div>
          <a
            ref={linkRef}
            href="https://hetpatel.dev/"
            target="_blank"
            className="text-white transform font-oswald tracking-wide text-2xl shadow-text-shadow border-b-2  border-primary-blue"
          >
            hetpatel.dev
          </a>
        </div>

        <nav className="">
          <ul className="menu bg-base-200 w-56 rounded-box">
            {navLinks.map((link) => {
              return (
                <li
                  key={link.path}
                  className="text-white tracking-wide hover:text-primary-blue pb-6"
                >
                  {/* <FontAwesomeIcon icon={link.icon} className="mr-4 w-5 h-5" /> */}
                  <a
                    href={link.path}
                    className={`${
                      link.path === activePath ? "active font-bold" : ""
                    }`}
                  >
                    {link.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex_center_row social_icon_list w-full cursor-pointer">
          <a
            href="https://www.linkedin.com/in/het1074/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon className="social_icon" icon={faLinkedin} />
          </a>
          <a
            href="https://github.com/patelhet04"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon className="social_icon" icon={faGithub} />
          </a>
          <a href="mailto:hetpatel0499@gmail.com">
            <FontAwesomeIcon className="social_icon" icon={faEnvelope} />
          </a>
          <a
            href="https://www.instagram.com/_hetpatel_4199"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon className="social_icon" icon={faInstagram} />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon className="social_icon" icon={faFacebook} />
          </a>
        </div>

        {/* Sidebar Content - Links, Navigation, etc. */}
      </aside>
    </>
  );
};

export default Sidebar;
