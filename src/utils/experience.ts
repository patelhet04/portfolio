export interface Project {
  name: string;
  description: string;
  tasks: string[];
}

export interface Education {
  id: string;
  dates: string;
  institution: string;
  degree: string;
  cgpa: string;
}

export interface Experience {
  id: string;
  dates: string;
  company: string;
  role: string;
  location?: string;
  projects?: Project[];
  tasks?: string[];
  skills: string[];
}

export const educationData: Education[] = [
  {
    id: "edu-1",
    dates: "Sept 2023 - Dec 2025",
    institution: "Northeastern University, Boston",
    degree: "Master of Science in Information Systems",
    cgpa: "CGPA - 3.61 on a scale of 4",
  },
  {
    id: "edu-2",
    dates: "Aug 2016 - May 2020",
    institution: "Gujarat Technological University, India",
    degree: "Bachelor of Engineering in Computer Engineering",
    cgpa: "CGPA - 8.11 on a scale of 10",
  },
];

export const experienceData: Experience[] = [
  {
    id: "exp-1",
    dates: "Jan 2025 - Present",
    company: "DMSB AI Strategic Hub (DASH), Boston, MA",
    role: "Human AI Interaction Engineer",
    location: "Boston, MA",
    projects: [
      {
        name: "LearnBot",
        description:
          "Full Stack Generative AI essay grading system to enhance student learning through personalized feedback",
        tasks: [
          "Engineered a Flask based LlamaIndex RAG pipeline with HuggingFace embeddings and FAISS indexing, supporting 2-100+ PDF documents per assignment with anti-gaming detection",
          "Optimized Docker-containerized Ollama models with GPU acceleration, achieving 3x faster inference latency",
          "Configured local MinIO storage on local Ubuntu server to comply with university data residency policies",
          "Reduced instructor grading time from 8+ hours to 30 minutes by automating rubric creation and batch processing using LangChain prompts",
          "Streamlined Next.js and FlaskAPI deployment with GitHub Actions CI/CD, Nginx, and PM2, achieving 95% uptime",
          "Coordinated with RAs and professors to conduct UAT and optimize grading accuracy via continuous feedback",
        ],
      },
      {
        name: "NeuroLoom",
        description:
          "Multi-Agent AI Chat Platform using Flask-SocketIO with Behavioral Profiling and Sentiment Analytics",
        tasks: [
          "Developed adaptive AI agents with 8+ personality traits using LangGraph and Ollama, serving 80+ daily users",
          "Pioneered AI agent networking module that analyzed conversation patterns and personality traits to recommend optimal agent pairings for collaborative projects and research",
          "Incorporated real-time sentiment analysis (VADER) to monitor emotional and social trends across interactions",
        ],
      },
    ],
    skills: [
      "GenAI",
      "Python",
      "Flask",
      "RAG",
      "LlamaIndex",
      "LangGraph",
      "Ollama",
      "Docker",
      "Next.js",
      "CI/CD",
      "FAISS",
      "MinIO",
      "Sentiment Analysis",
      "AI Agents",
      "Vector Databases",
    ],
  },
  {
    id: "exp-2",
    dates: "Sep 2021 - May 2023",
    company: "Silver Webbuzz Private Limited",
    role: "Software Developer",
    tasks: [
      "Proven proficiency in software development via the completion of successful projects, exhibiting strong debugging, coding, and problem-solving abilities.",
      "Actively promoted creativity and teamwork in cross-functional teams by often delivering excellent software solutions ahead of schedule.",
      "Contributed to the development of scalable solutions, enhancing team efficiency and exceeding client expectations.",
    ],
    skills: [
      "Typescript",
      "Nodejs",
      "React",
      "Nextjs",
      "MongoDB",
      "MySQL",
      "Docker",
      "GraphQL",
      "Amazon Web Services",
    ],
  },
  {
    id: "exp-3",
    dates: "Dec 2019 - Apr 2020",
    company: "Shinestar Web Solutions",
    role: "Software Developer Intern",
    tasks: [
      "Actively involved in practical software development projects, obtaining useful coding, testing, and troubleshooting expertise, and exhibiting a dedication to lifelong learning and development.",
      "Worked closely with senior developers to apply best practices and streamline development processes, which helped the project reach important milestones.",
    ],
    skills: ["Javascript", "Nodejs", "React", "Express", "MongoDB"],
  },
];
