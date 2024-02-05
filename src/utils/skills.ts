import { icon } from "@fortawesome/fontawesome-svg-core";
import {
  faCode,
  faDatabase,
  faLaptopCode,
  faNetworkWired,
  faTools,
} from "@fortawesome/free-solid-svg-icons";

export const categories = [
  {
    icon: faLaptopCode,
    title: "Programming Languages",
    skills: [
      { name: "C++", level: 80 },
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 80 },
      { name: "Typescript", level: 80 },
      { name: "Java", level: 60 },
      { name: "SQL", level: 75 },
    ],
  },
  {
    icon: faCode,
    title: "Web Technologies",
    skills: [
      { name: "HTML/CSS/SCSS", level: 90 },
      { name: "TailwindCSS", level: 70 },
      { name: "React/Next.js", level: 75 },
      { name: "Redux", level: 70 },
      { name: "Node/Express", level: 85 },
      { name: "RestAPI", level: 85 },
    ],
  },
  {
    icon: faDatabase,
    title: "Database and Cloud",
    skills: [
      { name: "MySQL", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "PostgreSQL", level: 80 },
      { name: "AWS S3", level: 70 },
      { name: "Docker", level: 75 },
      { name: "Redis", level: 70 },
    ],
  },
  {
    icon: faTools,
    title: "Other Tools/Software",
    skills: [
      { name: "Git/Github", level: 90 },
      { name: "Swagger UI", level: 70 },
      { name: "Postman", level: 90 },
      { name: "Selenium", level: 70 },
      { name: "Mocha", level: 60 },
    ],
  },
];
