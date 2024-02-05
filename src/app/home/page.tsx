"use client";
import Image from "next/image";
import TypeIt from "typeit-react";
// import Animoji from '@/app/assets/'
export default function Home() {
  return (
    <section id="home" className="hero min-h-screen relative">
      <div
        className="transparent_text_home hidden sm:hidden md:block"
        style={{ color: "transparent", WebkitTextStroke: "2px white" }}
      >
        &lt;Home /&gt;
      </div>
      <div className="hero-content mt-20 lg:mt-0 flex_col gap-20 lg:gap-4 lg:flex-row">
        <div className="max-w-md">
          <p className="font-nothingDisplay text-white transform text-[24px] sm:text-[32px] duration-300 ease-i tracking-wider py-6">
            Hi, I'm
          </p>
          <h1 className="flex flex-col transform gap-4 sm:gap-10 text-5xl sm:text-7xl duration-300 ease-in leading-snug font-bold text-primary-blue font-oswald">
            <span>Het</span>
            <span>Ashwinbhai</span>
            <span>Patel.</span>
          </h1>
          <p className="py-8 font-nothingDisplay transform text-white text-[24px] sm:text-[32px] duration-300 ease-in tracking-wider">
            <TypeIt
              options={{ loop: true }}
              getBeforeInit={(instance) => {
                instance
                  .type("Sogtware", { delay: 300 })
                  .move(-5)
                  .delete(1)
                  .type("f")
                  .move(null, { to: "END" })
                  .type(" developer")
                  .pause(300)
                  .move(-8)
                  .delete(1)
                  .type("D")
                  .move(null, { to: "END" })
                  .go();

                // Remember to return it!
                return instance;
              }}
            />
          </p>
          <a href="#about">
            <button className="btn btn-outline font-mono btn-wide md:btn-md lg:btn-lg">
              Explore More
            </button>
          </a>
        </div>
        <video
          autoPlay
          muted
          loop
          className="w-full lg:w-2/3 flex justify-center items-center"
        >
          <source src="/assets/Animoji.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
