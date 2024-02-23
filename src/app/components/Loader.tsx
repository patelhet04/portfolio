// components/Loader.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { quotes } from "@/utils/quotes";

const Loader: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const loadingTextRef = useRef(null); // Ref for the loading text
  // const [currentQuote, setCurrentQuote] = useState("");

  useEffect(() => {
    // const randomQuote = Math.floor(Math.random() * quotes.length);
    // setCurrentQuote(quotes[randomQuote]);
    // Animate the loader container
    gsap.to("#loader", {
      duration: 4,
      scaleX: 0,
      transformOrigin: "right",
      ease: "back.inOut",
      delay: 1,
      onComplete: () => setIsLoaded(true),
    });
    /**
     * bounce.inOut
     * elastic.inOut
     * back.inOut
     * expo.inOut
     */
    // Animate the loading text
    gsap.fromTo(
      loadingTextRef.current,
      { autoAlpha: 0, y: 10 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power1.inOut",
        repeat: -1, // Repeat the animation indefinitely
        yoyo: true, // Make the animation go back and forth
      }
    );
  }, []);

  return (
    <div
      id="loader"
      className={`fixed top-0 left-0 w-full h-full bg-white z-50 transform ${
        isLoaded ? "hidden" : "scale-x-100"
      }`}
    >
      <div className="flex font-oswald flex-col justify-center items-center w-full h-full gap-6">
        <h1 className="text-primary-blue text-4xl" ref={loadingTextRef}>
          Loading
        </h1>
        {/* <p className="text-primary-blue text-center mx-10">{currentQuote}</p> */}
        <div className="text-primary-blue">
          <progress className="progress  bg-primary-blue w-56"></progress>
        </div>
      </div>
    </div>
  );
};

export default Loader;
