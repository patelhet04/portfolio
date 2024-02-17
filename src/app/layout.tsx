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
            <link rel="icon" href="/assets/Memoji.png" type="image/icon type" />
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
