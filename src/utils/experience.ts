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
  summary: string;
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
    role: "AI Software Engineer | Lead GenAI Research Assistant",
    location: "Boston, MA",
    summary:
      "Built production GenAI solutions for education—designing LangGraph agent systems, optimizing GPU infrastructure, and deploying fault-tolerant applications serving 100+ concurrent users.",
    skills: [
      "GenAI",
      "Python",
      "Flask",
      "RAG",
      "LlamaIndex",
      "LangGraph",
      "vLLM",
      "Ollama",
      "Docker",
      "Next.js",
      "CI/CD",
      "FAISS",
      "MinIO",
      "AI Agents",
      "Vector Databases",
    ],
  },
  {
    id: "exp-2",
    dates: "Sep 2020 - Aug 2021",
    company: "Silver Webbuzz Private Limited",
    role: "Software Developer II",
    summary:
      "Developed full-stack systems and AWS cloud infrastructure—automating business workflows with AI, optimizing costs, and leading microservices migration with CI/CD pipelines.",
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
];
