export type SpanKind = "work" | "education";

/** Year and month (1-12). */
export type YearMonth = [number, number];

/**
 * A measured change. When `from` and `to` are both given the detail page draws
 * a bar that shrinks (or grows) from the old value to the new one; `ratio` is
 * to / from on a common unit.
 */
export interface Measurement {
  label: string;
  from?: string;
  to: string;
  ratio?: number;
}

export interface CareerSpan {
  slug: string;
  kind: SpanKind;
  /** Full organisation name, used on the detail page. */
  name: string;
  /** Compact name for the trace rows. */
  short: string;
  /** One-line role or degree for the trace rows. */
  sub: string;
  role: string;
  where: string;
  start: YearMonth;
  /** `null` while the span is still running. */
  end: YearMonth | null;
  summary: string;
  events: string[];
  measurements?: Measurement[];
  stack: string[];
  recommendationId?: number;
  relatedOutputIds?: number[];
}

export const careerSpans: CareerSpan[] = [
  {
    slug: "fuzionx",
    kind: "work",
    name: "FuzionX",
    short: "FuzionX",
    sub: "Team Lead, Innovation",
    role: "Team Lead, Innovation",
    where: "Boston, MA",
    start: [2026, 2],
    end: null,
    summary:
      "Helping early-stage founders take their products from idea to production and first pilots. Most recently: a HIPAA-compliant healthcare AI platform that went from the first infrastructure commit to a pilot launch with zero critical incidents.",
    events: [
      "Ran the full SDLC and standardized Git branching",
      "Decoupled releases from deploys with Datadog feature flags",
      "Architected HIPAA-compliant infrastructure on Aptible with Cognito, CloudFront and Route 53, including PHI isolation",
      "Load-tested auth, database and LLM workflows at 100 concurrent users with k6 and Datadog, automated in CI",
    ],
    measurements: [
      { label: "Critical incidents at pilot launch", to: "0" },
      { label: "Concurrent users load-tested before launch", to: "100" },
    ],
    stack: ["AI Agents", "Python", "Next.js", "AWS", "Cognito", "CloudFront", "Route 53", "Aptible", "Datadog", "k6", "GitHub Actions", "Terraform"],
  },
  {
    slug: "dash",
    kind: "work",
    name: "DMSB AI Strategic Hub (DASH)",
    short: "DASH",
    sub: "AI Software Engineer",
    role: "AI Software Engineer",
    where: "Boston, MA",
    start: [2025, 1],
    end: [2025, 12],
    summary:
      "A year of shipping GenAI that people actually used: an AI grading platform faculty adopted, a voice coach with 500+ daily users, and the GPU infrastructure and observability underneath both.",
    events: [
      "Built an AI grading platform with LangGraph agents, adopted by 67% of 200+ faculty",
      "Found the I/O bottleneck and rebuilt grading as queue-based microservices on Amazon MQ, ElastiCache and ECS",
      "Engineered a RAG pipeline on LlamaIndex, Qdrant and BGE-large with metadata filtering and drift detection",
      "Built an AI voice coach with real-time speech analysis and parallel multi-agent workflows",
      "Extracted Whisper into a shared GPU microservice, taking memory from linear to O(1) and workers from 3 to 40",
      "Deployed FERPA-compliant AWS infrastructure and self-hosted vLLM, with a Grafana, Loki and Promtail observability stack",
    ],
    measurements: [
      { label: "Grading API response time", from: "30–60s", to: "100ms", ratio: 0.1 / 45 },
      { label: "Faculty grading time", from: "8h+", to: "30 min", ratio: 0.5 / 8 },
      { label: "Voice coach response latency", from: "90s", to: "40s", ratio: 40 / 90 },
      { label: "Mean time to recovery", from: "2h", to: "30 min", ratio: 0.25 },
      { label: "Deploy time", from: "30 min", to: "3 min", ratio: 0.1 },
      { label: "Infrastructure cost saved per year", to: "$30K" },
      { label: "Grading capacity", to: "20x" },
      { label: "RAG accuracy, A/B tested on 500+ essays", to: "90%" },
      { label: "Voice coach daily active users", to: "500+" },
    ],
    stack: [
      "Python",
      "Next.js",
      "Flask",
      "FastAPI",
      "LangGraph",
      "LlamaIndex",
      "Qdrant",
      "RAG",
      "vLLM",
      "Whisper",
      "PyTorch",
      "Amazon MQ",
      "ElastiCache",
      "ECS",
      "Docker",
      "Grafana",
      "GitHub Actions",
    ],
    recommendationId: 1,
    relatedOutputIds: [1],
  },
  {
    slug: "silver-webbuzz",
    kind: "work",
    name: "Silver WebBuzz",
    short: "Silver WebBuzz",
    sub: "Software Engineer I → II",
    role: "Software Engineer I, then Software Engineer II",
    where: "Ahmedabad, India",
    start: [2020, 9],
    end: [2023, 8],
    summary:
      "Three years that started with an internship and ended with running migrations: containerized microservices, a GPT-4 pipeline that read 200+ PDFs so people didn't have to, and a video pipeline that cut the AWS bill.",
    events: [
      "Promoted from Software Engineer I to II",
      "Migrated Node.js services to containerized microservices with Docker, Jenkins and Jest/Supertest",
      "Built a Python and GPT-4 batch pipeline that normalized 200+ unstructured PDFs into Postgres",
      "Led a Node.js video pipeline on Lambda, SQS and EC2 with FFmpeg compression and S3 lifecycle rules",
      "Built reusable React and TypeScript components with UX designers, using lazy loading and debouncing",
    ],
    measurements: [
      { label: "Deploy time", from: "4h", to: "15 min", ratio: 0.25 / 4 },
      { label: "Pharmacy onboarding", from: "3 weeks", to: "2 days", ratio: 2 / 21 },
      { label: "Page load time", from: "4s", to: "<1s", ratio: 0.25 },
      { label: "Video storage cost", from: "100%", to: "61%", ratio: 0.61 },
    ],
    stack: ["TypeScript", "JavaScript", "Node.js", "React", "Python", "GPT-4", "PostgreSQL", "MongoDB", "Docker", "Jenkins", "AWS", "Lambda", "SQS", "FFmpeg"],
    recommendationId: 3,
  },
  {
    slug: "northeastern",
    kind: "education",
    name: "Northeastern University",
    short: "Northeastern",
    sub: "M.S. Information Systems",
    role: "Master of Science in Information Systems",
    where: "Boston, MA",
    start: [2023, 9],
    end: [2025, 12],
    summary:
      "Graduate study in information systems, with the second year spent building production AI at the DMSB AI Strategic Hub.",
    events: ["CGPA 3.61 / 4", "AI Software Engineer at DASH alongside the degree", "Active in Boston's tech community"],
    stack: ["Python", "AWS", "Distributed Systems", "Machine Learning"],
    recommendationId: 2,
  },
  {
    slug: "laurentian",
    kind: "education",
    name: "Laurentian University",
    short: "Laurentian",
    sub: "Exchange, Computer Eng.",
    role: "International Exchange Program, Computer Engineering",
    where: "Sudbury, Canada",
    start: [2019, 6],
    end: [2019, 7],
    summary: "A summer exchange in computer engineering at Laurentian University in Canada.",
    events: ["International Exchange Program"],
    stack: [],
  },
  {
    slug: "gtu",
    kind: "education",
    name: "Gujarat Technological University",
    short: "GTU",
    sub: "B.E. Computer Engineering",
    role: "Bachelor of Engineering in Computer Engineering",
    where: "Ahmedabad, India",
    start: [2016, 8],
    end: [2020, 5],
    summary: "Four years of computer engineering fundamentals: algorithms, data structures, systems and databases.",
    events: ["CGPA 8.11 / 10"],
    stack: ["C++", "Java", "SQL"],
  },
];

export const spanGroups: { kind: SpanKind; label: string }[] = [
  { kind: "work", label: "Work" },
  { kind: "education", label: "Education" },
];

/** The stack, grouped the way the resume groups it. */
export const vocabulary: { group: string; tokens: string[] }[] = [
  { group: "Generative AI", tokens: ["AI Agents", "LangGraph", "LlamaIndex", "RAG", "vLLM", "PyTorch", "Transformers", "Hugging Face", "MLflow", "Whisper", "MCP"] },
  { group: "Languages and web", tokens: ["TypeScript", "JavaScript", "Python", "React", "Next.js", "Node.js", "Flask", "FastAPI", "Shell"] },
  { group: "Cloud", tokens: ["AWS", "Bedrock", "Lambda", "EC2", "S3", "Route 53", "CloudFront", "Cognito", "ECS", "Docker", "Terraform", "Aptible"] },
  { group: "Ops", tokens: ["GitHub Actions", "Jenkins", "RabbitMQ", "Amazon MQ", "Grafana", "Datadog", "CloudWatch", "k6", "Git"] },
  { group: "Data", tokens: ["Qdrant", "FAISS", "Chroma", "DynamoDB", "PostgreSQL", "MongoDB", "MySQL", "Redis", "ElastiCache", "GraphQL", "REST"] },
];

export const toDate = ([y, m]: YearMonth) => new Date(y, m - 1, 1);

export const formatMonth = (d: Date) => d.toLocaleDateString("en-US", { month: "short", year: "numeric" });

/** Inclusive month count, rendered as "1y 9m". */
export function formatDuration(start: Date, end: Date) {
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y ? `${y}y` : "", m ? `${m}m` : ""].filter(Boolean).join(" ") || "1m";
}

export const getSpan = (slug: string) => careerSpans.find((s) => s.slug === slug);

/** Spans in page order: work first, newest first, then education. */
export const orderedSpans = spanGroups.flatMap((g) => careerSpans.filter((s) => s.kind === g.kind));
