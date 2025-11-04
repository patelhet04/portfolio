"use client";
import About from "./about/page";
import Skills from "./components/Skills";
import Experience from "./experience/page";
import Contact from "./contact/page";
import React, { Suspense, lazy, useEffect, useRef } from "react";
const Home = lazy(() => import("./home/page"));
const Projects = lazy(() => import("./projects/page"));
const Recommendations = lazy(() => import("./recommendations/page"));

const Main: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
      {/* Add spacer for parallax effect */}
      <div style={{ height: "100vh" }} />
      {/* Content sections with higher z-index */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          background: "var(--fallback-b1, oklch(var(--b1)/1))",
        }}
      >
        <About />
        <Experience />
        <Skills />
        <Recommendations />
        <Projects />
        <Contact />
      </div>
    </Suspense>
  );
};

export default Main;
