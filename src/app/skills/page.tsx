"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { techIcons } from "@/utils/icons";

const Skills: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;

    if (marquee) {
      // Render icons twice to fill the marquee for a complete loop
      const totalIcons = [...techIcons, ...techIcons];
      marquee.innerHTML = totalIcons
        .map(
          (icon, index) =>
            `<div class="inline-block p-10" key=${index}>
          <i class="${icon}" style="font-size: 100px;"></i>
        </div>`
        )
        .join("");

      // Wait until the next frame to ensure all elements are properly rendered
      requestAnimationFrame(() => {
        const totalWidth = Array.from(marquee.children).reduce(
          (acc, child) => acc + child.clientWidth,
          0
        );

        gsap.to(marquee, {
          x: () => -totalWidth + window.innerWidth, // End animation when the last icon is out of view
          ease: "none",
          duration: 100, // Duration can be adjusted based on desired speed
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth), // Create an infinite smooth loop
          },
        });
      });
    }
  }, []);

  return (
    <section
      id="skills"
      className="hero relative min-h-96 w-full overflow-hidden mt-10 bg-base-200"
    >
      <div
        className="transparent_text_about hidden sm:hidden md:block mt-0 md:mt-24 lg:mt-10"
        style={{ color: "transparent", WebkitTextStroke: "2px white" }}
      >
        &lt;Skill /&gt;
      </div>
      <div className="flex whitespace-nowrap" ref={marqueeRef}>
        {/* Icons will be populated dynamically */}
      </div>
    </section>
  );
};

export default Skills;
