export interface Recommendation {
  id: number;
  name: string;
  title: string;
  company: string;
  date: string;
  relationship: string;
  /** Verbatim text. Phrases wrapped in [brackets] get the highlighter. */
  content: string;
  nickname?: string;
  avatar: string;
}

export const recommendationsData: Recommendation[] = [
  {
    id: 1,
    name: "Kwong Chan",
    title: "Executive Director, DMSB AI Strategic Hub",
    company: "Northeastern University",
    date: "Oct 2025",
    relationship: "Managed Het directly",
    content:
      "A [sublime problem-solver] who works across deep technical domains to create high-impact solutions. Het understands the importance of the end-user and can coordinate cross-functional teams to create products that people actually want to use. People seek Het out for help and he [elevates any project he touches]. He has my highest recommendation for any position that needs fresh and rigorous insight into AI and Human interaction in a tech environment.",
    nickname: "He is the Dash of DMSB AI Strategic Hub (DASH)",
    avatar: "/assets/opt/dash1-thumb.webp",
  },
  {
    id: 2,
    name: "Christoph Riedl",
    title: "Full Professor",
    company: "Northeastern University",
    date: "Jul 2025",
    relationship: "Worked with Het on the same team",
    content:
      "Het is one of those rare developers who can [take complex problems and turn them into clean, scalable solutions]. Building experimental platforms for human-AI studies and designing smart agents, he brings both deep technical skill and real creativity to the table. He's especially strong with AWS, and his ability to handle real-time data and cloud infrastructure has been a huge asset. Het is curious, thoughtful, and a great teammate, helping us push the boundaries of how AI can be used in research, teaching, and business.",
    avatar: "/assets/opt/profchris-thumb.webp",
  },
  {
    id: 3,
    name: "Bhavik Koradiya",
    title: "CEO, Silver WebBuzz",
    company: "Silver WebBuzz",
    date: "Apr 2024",
    relationship: "Managed Het directly",
    content:
      "I personally selected Het for our internship program, and he rapidly advanced to a Software Developer role due to his [exceptional learning capabilities]. Over nearly two years, Het mastered a broad spectrum of technologies including the MERN stack, PostgreSQL, MongoDB, Docker, and AWS. His responsibilities covered the entire Software Development Life Cycle, and his work has consistently earned top reviews for [flawless execution and proactive communication]. Het's technical prowess, innovative coding, and strategic planning skills have greatly enhanced our operations, proving himself as an invaluable asset to any team.",
    avatar: "/assets/opt/silver-thumb.webp",
  },
];

export const getRecommendation = (id?: number) => recommendationsData.find((r) => r.id === id);

/** Plain text with the highlight brackets removed. */
export const plainText = (content: string) => content.replace(/[[\]]/g, "");
