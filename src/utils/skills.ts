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
      { id: 1, name: "C++", level: 80 },
      { id: 2, name: "Python", level: 90 },
      { id: 3, name: "JavaScript", level: 80 },
      { id: 4, name: "Typescript", level: 80 },
      { id: 5, name: "Java", level: 60 },
      { id: 6, name: "SQL", level: 75 },
    ],
  },
  {
    icon: faCode,
    title: "Web Technologies",
    skills: [
      { id: 7, name: "HTML/CSS/SCSS", level: 90 },
      { id: 8, name: "TailwindCSS", level: 70 },
      { id: 9, name: "React/Next.js", level: 75 },
      { id: 10, name: "Redux", level: 70 },
      { id: 11, name: "Node/Express", level: 85 },
      { id: 12, name: "RestAPI", level: 85 },
    ],
  },
  {
    icon: faDatabase,
    title: "Database and Cloud",
    skills: [
      { id: 13, name: "MySQL", level: 80 },
      { id: 14, name: "MongoDB", level: 75 },
      { id: 15, name: "PostgreSQL", level: 80 },
      { id: 16, name: "AWS S3", level: 70 },
      { id: 17, name: "Docker", level: 75 },
      { id: 18, name: "Redis", level: 70 },
    ],
  },
  {
    icon: faTools,
    title: "Other Tools/Software",
    skills: [
      { id: 19, name: "Git/Github", level: 90 },
      { id: 20, name: "Swagger UI", level: 70 },
      { id: 21, name: "Postman", level: 90 },
      { id: 22, name: "Selenium", level: 70 },
      { id: 23, name: "Mocha", level: 60 },
    ],
  },
];
