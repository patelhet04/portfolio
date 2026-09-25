export type OutputTag = "article" | "project" | "post" | "doc";

export interface Output {
  id: number;
  title: string;
  description: string;
  tag: OutputTag;
  link: string;
  image?: string;
}

export const outputTags: { tag: OutputTag | "all"; label: string }[] = [
  { tag: "all", label: "All" },
  { tag: "article", label: "Articles" },
  { tag: "project", label: "Projects" },
  { tag: "post", label: "Posts" },
  { tag: "doc", label: "Docs" },
];

export const portfolio: Output[] = [
  {
    id: 1,
    title: "vLLM vs Ollama benchmarking",
    description: "Benchmarking two LLM runtimes for production, with a 7x speed-up from vLLM.",
    tag: "article",
    image: "/assets/opt/vllm.webp",
    link: "https://www.linkedin.com/posts/het1074_ai-machinelearning-gpucomputing-share-7385761843883200513-50D3?utm_source=share&utm_medium=member_desktop&rcm=ACoAACJsiJ4Buk5-zE3Ed9YwwUa8n21r2r_-ymw",
  },
  {
    id: 14,
    title: "Scalable backends with Encore.ts",
    description: "A TypeScript framework for microservices, auto-scaling and observability.",
    tag: "article",
    image: "/assets/opt/EncoreArticle.webp",
    link: "https://medium.com/@patelhet04/building-scalable-backends-with-encore-ts-f8d7b03a4596",
  },
  {
    id: 11,
    title: "Full-stack developer roadmap 2024",
    description: "The essential technologies and frameworks for building dynamic applications.",
    tag: "article",
    image: "/assets/opt/Fullstack_Article.webp",
    link: "https://www.linkedin.com/pulse/beginners-guide-full-stack-development-2024-het-patel-c51ce/?trackingId=SVdwv%2FdnQBaZ1e1a6cZa%2Bg%3D%3D",
  },
  {
    id: 10,
    title: "JavaScript vs TypeScript for beginners",
    description: "Where the two languages differ, and when each one is the right call.",
    tag: "article",
    image: "/assets/opt/JS_vs_TS.webp",
    link: "https://www.linkedin.com/pulse/understanding-differences-javascript-vs-typescript-beginners-patel-pqahe%3FtrackingId=9JwFIQkNRKC%252Fi5%252Fb1cy5UQ%253D%253D/?trackingId=9JwFIQkNRKC%2Fi5%2Fb1cy5UQ%3D%3D",
  },
  {
    id: 15,
    title: "Brevity",
    description:
      "A news summarizer with a self-RAG chatbot on LlamaIndex and ChromaDB that cut hallucinations by 85%. Next.js, FastAPI, AWS Lambda and Terraform.",
    tag: "project",
    link: "https://github.com/patelhet04/Brevity-UI",
  },
  {
    id: 7,
    title: "Prodly",
    description: "An all-in-one productivity app with focus-enhancing content and tools. Figma design.",
    tag: "project",
    image: "/assets/opt/Prodly.webp",
    link: "https://www.figma.com/design/727hMXAUMNn3bJ7AWEso1J/HetAshwinbhaiPatel_Fall_23?node-id=335-936&t=jt1FJC5jmvMvGtgZ-0",
  },
  {
    id: 6,
    title: "Amazon Social",
    description: "A prototype adding Twitter-style social features to Amazon. Figma design.",
    tag: "project",
    image: "/assets/opt/AmazonSocial.webp",
    link: "https://www.figma.com/file/727hMXAUMNn3bJ7AWEso1J/HetAshwinbhaiPatel_Fall_23?type=design&node-id=612%3A2&mode=design&t=Km8QQdHWI3uhHXCN-1",
  },
  {
    id: 3,
    title: "Airplane Management System",
    description: "A desktop management system built with Java Swing and MongoDB.",
    tag: "project",
    image: "/assets/opt/javaSwing.webp",
    link: "https://github.com/patelhet04/Airplane-Management-System/",
  },
  {
    id: 4,
    title: "React Flash Cards",
    description: "An interactive flash card app for learning and review.",
    tag: "project",
    image: "/assets/opt/flashcard.webp",
    link: "https://react-flashcards-demo-project.netlify.app/",
  },
  {
    id: 5,
    title: "Node Passport Login",
    description: "Secure session authentication with Passport.js.",
    tag: "project",
    image: "/assets/opt/node_passport.webp",
    link: "https://github.com/patelhet04/Node-Passport-Login",
  },
  {
    id: 2,
    title: "This portfolio",
    description: "The site you're reading, streamed one token at a time.",
    tag: "project",
    image: "/assets/opt/portfolio.webp",
    link: "https://hetpatel.dev/",
  },
  {
    id: 8,
    title: "Node framework guide for beginners",
    description: "A tour of Node.js frameworks and how to choose between them.",
    tag: "post",
    image: "/assets/opt/node_frameworks.webp",
    link: "https://www.linkedin.com/posts/het1074_javascript-typescript-nodejs-activity-7153517505376915456-w_vs?utm_source=share&utm_medium=member_desktop",
  },
  {
    id: 9,
    title: "daisyUI with Next.js 14 and Tailwind",
    description: "Exploring a component layer on top of Tailwind in the App Router.",
    tag: "post",
    image: "/assets/opt/nextjs_daisyui.webp",
    link: "https://www.linkedin.com/posts/het1074_reactjs-react-nextjs-activity-7151295582022578176-iEFy?utm_source=share&utm_medium=member_desktop",
  },
  {
    id: 13,
    title: "ATS-Buddy ideation",
    description: "A GPT-4 tool that writes ATS-optimized resume points.",
    tag: "doc",
    link: "/assets/ATS-Buddy Project Ideation.pdf",
  },
  {
    id: 12,
    title: "LLM tool integration ideation",
    description: "Automated data entry from unstructured PDFs with GPT-4.",
    tag: "doc",
    link: "/assets/Ideation - Automated Data Entry.pdf",
  },
];
