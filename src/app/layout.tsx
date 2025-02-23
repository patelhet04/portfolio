"use client";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";
import { useRef, useState } from "react";
import DownloadButton from "./components/DownloadBtn";
import AboutRefContext from "./context/AboutRefContext";
import ThemeController from "./components/ThemeController";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const aboutRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState("sunset");
  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <AboutRefContext.Provider value={aboutRef}>
        <html lang="en" data-theme={theme}>
          <head>
            <title>Het Patel - Software Engineer</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="canonical" href="https://hetpatel.dev" />
            <meta
              name="description"
              content="Hello, I'm Het Patel, a dedicated software engineer and a graduate student at Northeastern University."
            />
            <meta name="robots" content="index, follow" />

            <meta property="og:title" content="Het Patel - Software Engineer" />
            <meta
              property="og:description"
              content="Hello, I'm Het Patel, a dedicated software engineer and a graduate student at Northeastern University."
            />
            <meta property="og:image" content="/assets/profile_pic.jpg" />
            <meta property="og:url" content="https://hetpatel.dev" />
            <meta property="og:type" content="website" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:title"
              content="Het Patel - Software Engineer"
            />
            <meta
              name="twitter:description"
              content="Hello, I'm Het Patel, a dedicated software engineer and a graduate student at Northeastern University."
            />
            <meta name="twitter:image" content="/assets/profile_pic.jpg" />

            <link rel="icon" href="/assets/Memoji.png" type="image/png" />

            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
            />

            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Person",
                  name: "Het Patel",
                  jobTitle: "Software Engineer",
                  url: "https://hetpatel.dev",
                  image: "https://hetpatel.dev/assets/profile_pic.jpg",
                  description:
                    "Hello, I'm Het Patel, a dedicated software engineer and a graduate student at Northeastern University.",
                }),
              }}
            />
          </head>
          <body>
            <Loader />
            <div className="grid_layout" data-theme={theme}>
              <Sidebar />
              <DownloadButton aboutRef={aboutRef} />
              <ThemeController theme={theme} setTheme={setTheme} />
              <main className="main">
                {/* Content goes here */}
                {children}
              </main>
            </div>
          </body>
        </html>
      </AboutRefContext.Provider>
    </ThemeProvider>
  );
}
