"use client"; // ✅ Required for useState and useRef

import "./globals.css";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";
import { useRef, useState } from "react";
import DownloadButton from "./components/DownloadBtn";
import AboutRefContext from "./context/AboutRefContext";
import ThemeController from "./components/ThemeController";
import { ThemeProvider } from "./context/ThemeContext";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const aboutRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState("sunset");

  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <AboutRefContext.Provider value={aboutRef}>
        <html lang="en" data-theme={theme}>
          <body>
            <Loader />
            <div className="grid_layout" data-theme={theme}>
              <Sidebar />
              <DownloadButton aboutRef={aboutRef} />
              <ThemeController theme={theme} setTheme={setTheme} />
              <main className="main">{children}</main>
            </div>
            <Script
              strategy="afterInteractive"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.js"
            />
          </body>
        </html>
      </AboutRefContext.Provider>
    </ThemeProvider>
  );
}
