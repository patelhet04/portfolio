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
