import {
  faHome,
  faUser,
  faStar,
  faBriefcase,
  faProjectDiagram,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

export const navLinks = [
  { title: "Home", path: "#home", icon: faHome },
  { title: "About Me", path: "#about", icon: faUser },
  { title: "Skills", path: "#skills", icon: faStar },
  {
    title: "Career",
    path: "#career",
    icon: faBriefcase,
  },
  {
    title: "Projects",
    path: "#projects",
    icon: faProjectDiagram,
  },
  { title: "Contact Me", path: "#contact", icon: faEnvelope },
];
