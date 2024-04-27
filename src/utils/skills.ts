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
      { id: 1, name: "C++" },
      { id: 2, name: "Python" },
      { id: 3, name: "JavaScript" },
      { id: 4, name: "Typescript" },
      { id: 5, name: "Java" },
      { id: 6, name: "SQL" },
    ],
  },
  {
    icon: faCode,
    title: "Web Technologies",
    skills: [
      { id: 7, name: "HTML/CSS/SCSS" },
      { id: 8, name: "TailwindCSS" },
      { id: 9, name: "React/Next.js" },
      { id: 10, name: "Redux" },
      { id: 11, name: "Node/Express" },
      { id: 12, name: "RestAPI" },
    ],
  },
  {
    icon: faDatabase,
    title: "Database and Cloud",
    skills: [
      { id: 13, name: "MySQL" },
      { id: 14, name: "MongoDB" },
      { id: 15, name: "PostgreSQL" },
      { id: 16, name: "AWS S3" },
      { id: 17, name: "Docker" },
      { id: 18, name: "Redis" },
    ],
  },
  {
    icon: faTools,
    title: "Other Tools/Software",
    skills: [
      { id: 19, name: "Git/Github" },
      { id: 20, name: "Swagger UI" },
      { id: 21, name: "Postman" },
      { id: 22, name: "Selenium" },
      { id: 23, name: "Mocha" },
    ],
  },
];
