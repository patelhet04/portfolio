export interface Recommendation {
  id: number;
  name: string;
  title: string;
  company: string;
  date: string;
  relationship: string;
  content: string;
  nickname?: string;
  hasImages: boolean;
  images?: string[];
}

export const recommendationsData: Recommendation[] = [
  {
    id: 1,
    name: "Kwong Chan",
    title: "Executive Director at DMSB AI Strategic Hub",
    company: "Northeastern University",
    date: "October 15, 2025",
    relationship: "Kwong managed Het directly",
    content:
      "A sublime problem-solver who works across deep technical domains to create high-impact solutions. Het understands the importance of the end-user and can coordinate cross-functional teams to create products that people actually want to use. People seek Het out for help and he elevates any project he touches. He has my highest recommendation for any position that needs fresh and rigorous insight into AI and Human interaction in a tech environment.",
    nickname: "He is the Dash of DMSB AI Strategic Hub (DASH)",
    hasImages: true,
    images: ["/assets/dash1.jpg", "/assets/dash2.jpg", "/assets/dash3.jpg"],
  },
  {
    id: 2,
    name: "Christoph Riedl",
    title: "Full Professor",
    company: "Northeastern University",
    date: "July 2, 2025",
    relationship: "Christoph worked with Het on the same team",
    content:
      "Het is one of those rare developers who can take complex problems and turn them into clean, scalable solutions. Building experimental platforms for human-AI studies and designing smart agents, he brings both deep technical skill and real creativity to the table. He's especially strong with AWS, and his ability to handle real-time data and cloud infrastructure has been a huge asset. Het is curious, thoughtful, and a great teammate, helping us push the boundaries of how AI can be used in research, teaching, and business.",
    hasImages: true,
    images: ["/assets/profchris.jpeg"],
  },
  {
    id: 3,
    name: "Bhavik Koradiya",
    title: "CEO Silver WebBuzz | AI Alchemist",
    company: "Silver WebBuzz",
    date: "April 29, 2024",
    relationship: "Bhavik managed Het directly",
    content:
      "I personally selected Het for our internship program, and he rapidly advanced to a Software Developer role due to his exceptional learning capabilities. Over nearly two years, Het mastered a broad spectrum of technologies including the MERN stack, PostgreSQL, MongoDB, Docker, and AWS. His responsibilities covered the entire Software Development Life Cycle, and his work has consistently earned top reviews for flawless execution and proactive communication. Het's technical prowess, innovative coding, and strategic planning skills have greatly enhanced our operations, proving himself as an invaluable asset to any team.",
    hasImages: true,
    images: ["/assets/silver.png"],
  },
];
