"use client";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";
import { useRef, useState } from "react";
import DownloadButton from "./components/DownloadBtn";
import AboutRefContext from "./context/AboutRefContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const aboutRef = useRef<HTMLDivElement>(null);
  return (
    <AboutRefContext.Provider value={aboutRef}>
      <html lang="en">
        <head>
          <link rel="icon" href="/assets/Memoji.png" type="image/icon type" />
        </head>
        <body>
          <Loader />

          <div className="flex" data-theme="sunset">
            <Sidebar />
            <DownloadButton aboutRef={aboutRef} />
            <main className="main">
              {/* Content goes here */}
              {children}
            </main>
          </div>
        </body>
      </html>
    </AboutRefContext.Provider>
  );
}
