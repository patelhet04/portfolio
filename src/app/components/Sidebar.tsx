// components/Sidebar.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import Memoji from "@/app/assets/Memoji.png";
import { useState } from "react";
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
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* Bars Icon - Visible only on smaller screens */}
      <div className="fixed top-5 left-5 z-50 md:hidden">
        <FontAwesomeIcon
          icon={faBars}
          className="text-white cursor-pointer text-2xl hover:text-gray-400"
          onClick={toggleSidebar}
        />
      </div>

      {/* Sidebar - Hidden on smaller screens, shown on larger screens or when the icon is clicked */}
      <aside
        className={`transform w-64 h-screen shadow-right flex_col overflow-auto transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Close Icon for Sidebar - Consider adding a close icon inside the sidebar for better UX */}

        {/* Image Section */}
        <div className="flex_col">
          <div className="avatar p-5 ">
            <Image src={Memoji} alt="Profile Picture" width={96} height={96} />
          </div>
          <a
            href="#_"
            className="text-white font-bold text-lg shadow-text-shadow"
          >
            hetpatel.dev
          </a>
        </div>

        <nav className="mb-10">
          <ul className="flex_center_col">
            {navLinks.map((link) => {
              return (
                <li
                  key={link.path}
                  className="text-white hover:text-primary-blue pb-3"
                >
                  <FontAwesomeIcon icon={link.icon} className="mr-4 w-5 h-5" />
                  <a href={link.path}>{link.title}</a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex_center_row social_icon_list w-full mb-10">
          <FontAwesomeIcon className="social_icon" icon={faLinkedin} />
          <FontAwesomeIcon className="social_icon" icon={faGithub} />
          <FontAwesomeIcon className="social_icon" icon={faEnvelope} />
          <FontAwesomeIcon className="social_icon" icon={faInstagram} />
          <FontAwesomeIcon className="social_icon" icon={faFacebook} />
        </div>

        {/* Sidebar Content - Links, Navigation, etc. */}
      </aside>
    </>
  );
};

export default Sidebar;
