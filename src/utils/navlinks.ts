import {
  faHome,
  faUser,
  faStar,
  faBriefcase,
  faProjectDiagram,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

export const navLinks = [
  { title: "Home", path: "#home", icon: faHome, isActive: true },
  { title: "About Me", path: "#about", icon: faUser, isActive: false },
  { title: "Skills", path: "#skills", icon: faStar, isActive: false },
  {
    title: "Career",
    path: "#career",
    icon: faBriefcase,
    isActive: false,
  },
  {
    title: "Projects",
    path: "#projects",
    icon: faProjectDiagram,
    isActive: false,
  },
  { title: "Contact Me", path: "#contact", icon: faEnvelope, isActive: false },
];
