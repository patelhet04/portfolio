import React from "react";
import Image from "next/image";
const About = () => {
  return (
    <section className="hero min-h-screen relative">
      <div
        className="transparent_text_about hidden sm:hidden md:block"
        style={{ color: "transparent", WebkitTextStroke: "2px white" }}
      >
        &lt;About /&gt;
      </div>

      <div className="hero-content gap-20 px-14 md:px-20 flex_col flex-col-reverse lg:flex-row">
        <div className="max-w-md">
          <div className="avatar">
            <div className=" w-72 md:w-96 mask mask-squircle">
              <Image
                src="/assets/profile_pic.jpg"
                alt="profile"
                width={244}
                height={244}
              ></Image>
            </div>
          </div>
          <div className="stats shadow mt-10">
            <div className="stat place-items-center">
              <div className="stat-title">Downloads</div>
              <div className="stat-value">31K</div>
              <div className="stat-desc">From January 1st to February 1st</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">New Registers</div>
              <div className="stat-value">1,200</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </div>
        </div>

        <div className="flex_center_col gap-10 font-mono">
          <header className="font-mono text-white font-bold ease-in duration-300 text-[36px] lg:text-[50px]">
            About Me
            <img src="/assets/undeline.svg" alt="underline" />
          </header>
          <p className="font-bold text-white text-xl lg:text-2xl">
            Hello, I'm Het Patel, a dedicated software developer and a graduate
            student
          </p>
          <ol className=" list-disc list-inside leading-8">
            <li>
              In my software development career, I've consistently demonstrated
              a commitment to innovation, problem-solving, and leadership. My
              approach is analytical, allowing me to identify challenges and
              devise effective solutions quickly.
            </li>
            <li>
              I value contributing to a collaborative and progressive work
              culture. I am always open to engaging in projects that push the
              boundaries of technology and creativity.
            </li>
          </ol>
          <div className="flex flex-row justify-baseline items-center gap-10">
            <button className="btn btn-outline font-mono md:btn-md lg:btn-lg">
              Contact Me
            </button>
            <button className="btn btn-outline font-mono md:btn-md lg:btn-lg">
              Explore More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
