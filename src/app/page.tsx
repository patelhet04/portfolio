"use client";
import About from "./about/page";
import Skills from "./skills/page";
import Experience from "./experience/page";
import Contact from "./contact/page";
import React, { Suspense, lazy, useEffect, useRef } from "react";
const Home = lazy(() => import("./home/page"));
const Projects = lazy(() => import("./projects/page"));

const Main: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </Suspense>
  );
};

export default Main;
