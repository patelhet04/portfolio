// components/Sidebar.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEnvelope,
  faTimes,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
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
  const sidebarRef = useRef<HTMLElement>(null);
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState(
    typeof window !== "undefined" ? window.location.hash : ""
  );

  useEffect(() => {
    const handleScroll = () => {
      let newActivePath = "";
      let sectionFound = false;

      navLinks.forEach((link) => {
        const section = document.querySelector(link.path) as HTMLElement;
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

  // Enhanced parallax effect for profile link
  useEffect(() => {
    const parallaxEffect = (e: MouseEvent) => {
      if (!linkRef.current) return;

      const rect = linkRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const intensityX = -0.3;
      const intensityY = -0.3;

      const moveX = deltaX * intensityX;
      const moveY = deltaY * intensityY;

      gsap.to(linkRef.current, {
        x: moveX,
        y: moveY,
        rotation: deltaX * intensityX * 0.08,
        scale: 1.02,
        ease: "power2.out",
        duration: 0.3,
      });
    };

    const resetParallax = () => {
      if (!linkRef.current) return;
      gsap.to(linkRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        ease: "power2.out",
        duration: 0.5,
      });
    };

    if (linkRef.current) {
      linkRef.current.addEventListener("mousemove", parallaxEffect);
      linkRef.current.addEventListener("mouseleave", resetParallax);
    }

    return () => {
      if (linkRef.current) {
        linkRef.current.removeEventListener("mousemove", parallaxEffect);
        linkRef.current.removeEventListener("mouseleave", resetParallax);
      }
    };
  }, []);

  // Sidebar animation on mount
  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );

      // Animate navigation items
      gsap.fromTo(
        navItemsRef.current.filter(Boolean),
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.6,
        }
      );
    }
  }, []);

  // Smooth scroll function
  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(path) as HTMLElement;
    if (target) {
      const targetPosition = target.offsetTop - 80; // Offset for better positioning

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile sidebar automatically
      if (isOpen && window.innerWidth < 1280) {
        setIsOpen(false);
      }
    }
  };

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    console.log("🔄 Toggle button clicked! Current isOpen:", isOpen);
    console.log("🔄 About to set isOpen to:", !isOpen);

    // Use functional update to ensure we get the latest state
    setIsOpen((prev) => {
      console.log("🔄 State update - prev:", prev, "new:", !prev);
      return !prev;
    });
  };

  // Debug useEffect to track isOpen changes
  useEffect(() => {
    console.log("📱 isOpen state changed to:", isOpen);
    console.log(
      "📱 Window width:",
      typeof window !== "undefined" ? window.innerWidth : "N/A"
    );
  }, [isOpen]);

  // Close sidebar when clicking outside (mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const toggleButton = document.querySelector(
        '[aria-label="Toggle Sidebar"]'
      );

      // Only close on mobile (when sidebar is toggleable)
      if (
        isOpen &&
        window.innerWidth < 1280 && // xl breakpoint
        sidebarRef.current &&
        !sidebarRef.current.contains(target) &&
        toggleButton &&
        !toggleButton.contains(target)
      ) {
        console.log("🎯 Clicking outside - closing sidebar");
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Add a small delay to avoid immediate closing
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close sidebar on resize from mobile to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Toggle Button - Debug logging */}
      <div className="fixed top-5 left-5 z-[70] xl:hidden">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("🎯 Toggle button clicked directly");
            toggleSidebar();
          }}
          className="w-12 h-12 bg-base-300 bg-opacity-80 backdrop-blur-sm rounded-lg border border-base-content border-opacity-20 flex items-center justify-center hover:bg-opacity-100 transition-all duration-300 hover:scale-105"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6 text-white transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <FontAwesomeIcon
              icon={faBars}
              className="text-white text-lg transition-transform duration-300"
            />
          )}
        </button>
      </div>

      {/* Mobile Backdrop - Debug logging */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[45] xl:hidden transition-opacity duration-300"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("🎯 Backdrop clicked - closing sidebar");
            setIsOpen(false);
          }}
        />
      )}

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-64 pt-8 pb-8 bg-base-200 bg-opacity-95 backdrop-blur-md h-screen flex flex-col justify-between overflow-auto transition-all duration-500 ease-out border-r border-base-content border-opacity-10 xl:translate-x-0 xl:shadow-lg xl:z-[30] ${
          isOpen
            ? "translate-x-0 shadow-2xl z-[50] xl:translate-x-0"
            : "-translate-x-full z-[30] xl:translate-x-0"
        }`}
      >
        {/* Profile Section */}
        <div className="flex flex-col justify-center items-center mb-8">
          <div className="avatar pb-6 w-28 transition-transform duration-300 hover:scale-105">
            <div className="rounded-full ring ring-primary-blue ring-opacity-20 ring-offset-base-100 ring-offset-2">
              <img src="/assets/Memoji.png" alt="Profile Picture" />
            </div>
          </div>
          <a
            ref={linkRef}
            href="https://hetpatel.dev/"
            target="_blank"
            className="sidebar-name text-white transform font-oswald tracking-wide text-xl shadow-text-shadow border-b-2 border-primary-blue hover:border-opacity-80 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-primary-blue hover:bg-opacity-10"
          >
            hetpatel.dev
          </a>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 flex flex-col justify-center">
          <ul className="space-y-2">
            {navLinks.map((link, index) => (
              <li
                key={link.path}
                ref={(el) => (navItemsRef.current[index] = el)}
                className="text-white tracking-wide transition-all duration-300"
              >
                <a
                  href={link.path}
                  onClick={(e) => handleNavClick(link.path, e)}
                  className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-300 group hover:bg-primary-blue hover:bg-opacity-20 hover:translate-x-1 ${
                    link.path === activePath
                      ? "active font-bold bg-primary-blue bg-opacity-30 border-l-4 border-primary-blue text-primary-blue shadow-lg"
                      : "hover:text-primary-blue"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={link.icon}
                    className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${
                      link.path === activePath
                        ? "text-primary-blue"
                        : "text-white group-hover:text-primary-blue"
                    }`}
                  />
                  <span className="font-fira text-sm font-medium">
                    {link.title}
                  </span>
                  {link.path === activePath && (
                    <div className="ml-auto w-2 h-2 bg-primary-blue rounded-full animate-pulse" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Media Section */}
        <div className="mt-8 px-4">
          <div className="border-t border-base-content border-opacity-20 pt-6">
            <h4 className="text-white font-fira text-xs uppercase tracking-wider mb-4 opacity-60 text-center">
              Connect With Me
            </h4>
            <div className="flex justify-center space-x-2 social_icon_list">
              <a
                href="https://www.linkedin.com/in/het1074/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-base-300 bg-opacity-60 rounded-lg flex items-center justify-center hover:bg-primary-blue hover:bg-opacity-20 transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
              >
                <FontAwesomeIcon
                  className="social_icon text-primary-blue text-lg group-hover:scale-110 transition-transform duration-300"
                  icon={faLinkedin}
                />
              </a>
              <a
                href="https://github.com/patelhet04"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-base-300 bg-opacity-60 rounded-lg flex items-center justify-center hover:bg-primary-blue hover:bg-opacity-20 transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
              >
                <FontAwesomeIcon
                  className="social_icon text-primary-blue text-lg group-hover:scale-110 transition-transform duration-300"
                  icon={faGithub}
                />
              </a>
              <a
                href="mailto:hetpatel0499@gmail.com"
                className="w-10 h-10 bg-base-300 bg-opacity-60 rounded-lg flex items-center justify-center hover:bg-primary-blue hover:bg-opacity-20 transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
              >
                <FontAwesomeIcon
                  className="social_icon text-primary-blue text-lg group-hover:scale-110 transition-transform duration-300"
                  icon={faEnvelope}
                />
              </a>
              <a
                href="https://www.instagram.com/_hetpatel_4199"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-base-300 bg-opacity-60 rounded-lg flex items-center justify-center hover:bg-primary-blue hover:bg-opacity-20 transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
              >
                <FontAwesomeIcon
                  className="social_icon text-primary-blue text-lg group-hover:scale-110 transition-transform duration-300"
                  icon={faInstagram}
                />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-base-300 bg-opacity-60 rounded-lg flex items-center justify-center hover:bg-primary-blue hover:bg-opacity-20 transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
              >
                <FontAwesomeIcon
                  className="social_icon text-primary-blue text-lg group-hover:scale-110 transition-transform duration-300"
                  icon={faFacebook}
                />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
