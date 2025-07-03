// components/Sidebar.tsx
"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithub,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { navLinks } from "@/utils/navlinks";

const Sidebar = () => {
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

  // Smooth scroll function
  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(path) as HTMLElement;
    if (target) {
      const targetPosition = target.offsetTop - 80;

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
        className="lg:hidden fixed top-5 left-5 z-[100] w-12 h-12 bg-base-300 bg-opacity-80 backdrop-blur-sm rounded-lg border border-base-content border-opacity-20 flex items-center justify-center hover:bg-opacity-100 transition-all duration-300 hover:scale-105"
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
            <div className="rounded-full ring ring-primary-blue ring-opacity-20 ring-offset-base-100 ring-offset-2">
              <img src="/assets/Memoji.png" alt="Profile Picture" />
            </div>
          </div>
          <a
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
