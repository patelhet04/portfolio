import { categories } from "@/utils/skills";
import React from "react";

const Skills = () => {
  return (
    <section className="hero min-h-screen relative">
      <div
        className="transparent_text_about hidden sm:hidden md:block"
        style={{ color: "transparent", WebkitTextStroke: "2px white" }}
      >
        &lt;Skill /&gt;
      </div>

      <div className="hero-content flex flex-col items-baseline">
        <header className="font-mono text-white font-bold text-[40px] px-10 lg:px-20 pt-10">
          Skills
          <img src="/assets/undeline.svg" alt="underline" />
        </header>
        <div className="flex justify-center flex-wrap">
          {categories.map((category, index) => (
            <div
              key={index}
              className="card w-full lg:w-[40%] bg-base-100 bg-opacity-[0.6] shadow-xl mx-10 my-4 border-l border-r border-white font-mono"
            >
              <div className="card-body">
                <h2 className="card-title text-white">{category.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="text-white font-semibold text-sm">
                        {skill.name}
                      </div>
                      <progress
                        className={`progress progress-info w-full`}
                        value={skill.level}
                        max="100"
                      ></progress>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
