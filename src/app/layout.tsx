"use client";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/Memoji.png" type="image/icon type" />
        <meta property="og:image" content="/assets/Memoji.png" />
      </head>
      <body>
        <Loader />
        <div className="flex" data-theme="sunset">
          <Sidebar />

          <main className="main">
            {/* Content goes here */}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
