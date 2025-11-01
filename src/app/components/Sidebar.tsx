// components/Sidebar.tsx
"use client";
import { useEffect, useState, memo } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithub,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { navLinks } from "@/utils/navlinks";

const Sidebar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Check if we're at the very top (home section)
      if (scrollPosition < window.innerHeight * 0.8) {
        if (activePath !== "#home") {
          setActivePath("#home");
        }
        return;
      }

      let newActivePath = "#home";

      navLinks.forEach((link) => {
        if (link.path === "#home") return; // Skip home as we handled it above
        
        const section = document.querySelector(link.path) as HTMLElement;
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + scrollPosition;
          const sectionHeight = section.offsetHeight;
          
          if (
            scrollPosition >= sectionTop - 300 &&
            scrollPosition < sectionTop + sectionHeight - 300
          ) {
            newActivePath = link.path;
          }
        }
      });

      if (newActivePath !== activePath) {
        setActivePath(newActivePath);
      }
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activePath]);

  // Smooth scroll function
  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Special handling for home
    if (path === "#home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setIsOpen(false);
      return;
    }
    
    const target = document.querySelector(path) as HTMLElement;
    if (target) {
      // Get the actual position of the element relative to the document
      const rect = target.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = rect.top + scrollTop - 80;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close sidebar on mobile after navigation
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-5 left-5 z-[100] w-12 h-12 bg-base-300 bg-opacity-80 backdrop-blur-sm rounded-2xl border border-base-content border-opacity-20 flex items-center justify-center hover:bg-opacity-100 transition-all duration-300 hover:scale-105"
      >
        <FontAwesomeIcon
          icon={isOpen ? faTimes : faBars}
          className="text-white text-lg transition-transform duration-300"
        />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[90] transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 w-64 h-screen pt-8 pb-8 
          bg-base-200 bg-opacity-95 backdrop-blur-md 
          flex flex-col justify-between overflow-auto 
          border-r border-base-content border-opacity-10 z-[95]
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Profile Section */}
        <div className="flex flex-col justify-center items-center mb-8">
          <div className="avatar pb-6 w-28 transition-transform duration-300 hover:scale-105">
            <div className="rounded-full ring ring-primary ring-opacity-20 ring-offset-base-100 ring-offset-2">
              <Image
                src="/assets/Memoji.png"
                alt="Profile Picture"
                width={112}
                height={112}
                priority
                quality={90}
              />
            </div>
          </div>
          <a
            href="https://hetpatel.dev/"
            target="_blank"
            className="sidebar-name text-white transform font-sora tracking-wide text-xl shadow-text-shadow border-b-2 border-primary hover:border-opacity-80 transition-all duration-300 px-4 py-2 rounded-2xl hover:bg-primary hover:bg-opacity-10"
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
                className="text-white tracking-wide transition-all duration-300"
              >
                <a
                  href={link.path}
                  onClick={(e) => handleNavClick(link.path, e)}
                  className={`flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all duration-300 group hover:bg-primary hover:bg-opacity-20 hover:translate-x-1 ${
                    link.path === activePath
                      ? "active font-bold bg-primary bg-opacity-30 border-l-4 border-primary text-primary shadow-lg"
                      : "hover:text-primary"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={link.icon}
                    className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${
                      link.path === activePath
                        ? "text-primary"
                        : "text-white group-hover:text-primary"
                    }`}
                  />
                  <span className="font-sora text-sm font-medium">
                    {link.title}
                  </span>
                  {link.path === activePath && (
                    <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Media Section */}
        <div className="mt-8 px-4">
          <div className="border-t border-base-content border-opacity-20 pt-6">
            <h4 className="text-white font-sora text-xs uppercase tracking-wider mb-4 opacity-60 text-center">
              Connect With Me
            </h4>
            <div className="flex justify-center space-x-2 social_icon_list">
              <a
                href="https://www.linkedin.com/in/het1074/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-base-300 bg-opacity-60 rounded-2xl flex items-center justify-center hover:bg-primary hover:bg-opacity-20 transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
              >
                <FontAwesomeIcon
                  className="social_icon text-primary text-lg group-hover:scale-110 transition-transform duration-300"
                  icon={faLinkedin}
                />
              </a>
              <a
                href="https://github.com/patelhet04"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-base-300 bg-opacity-60 rounded-2xl flex items-center justify-center hover:bg-primary hover:bg-opacity-20 transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
              >
                <FontAwesomeIcon
                  className="social_icon text-primary text-lg group-hover:scale-110 transition-transform duration-300"
                  icon={faGithub}
                />
              </a>
              <a
                href="mailto:hetpatel0499@gmail.com"
                className="w-10 h-10 bg-base-300 bg-opacity-60 rounded-2xl flex items-center justify-center hover:bg-primary hover:bg-opacity-20 transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
              >
                <FontAwesomeIcon
                  className="social_icon text-primary text-lg group-hover:scale-110 transition-transform duration-300"
                  icon={faEnvelope}
                />
              </a>
              <a
                href="https://www.instagram.com/_hetpatel_4199"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-base-300 bg-opacity-60 rounded-2xl flex items-center justify-center hover:bg-primary hover:bg-opacity-20 transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
              >
                <FontAwesomeIcon
                  className="social_icon text-primary text-lg group-hover:scale-110 transition-transform duration-300"
                  icon={faInstagram}
                />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-base-300 bg-opacity-60 rounded-2xl flex items-center justify-center hover:bg-primary hover:bg-opacity-20 transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
              >
                <FontAwesomeIcon
                  className="social_icon text-primary text-lg group-hover:scale-110 transition-transform duration-300"
                  icon={faFacebook}
                />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
