"use client";
import React, { FormEvent, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocation,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MapPage from "../components/DynamicMap";
const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { y: 50, autoAlpha: 0 }, // Starting from slightly below and faded out
        {
          y: 0, // Ending at its natural position
          autoAlpha: 1, // Fully visible
          duration: 1, // Animation duration
          ease: "expo.out", // An easing function for a smooth effect
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center+=100", // Animation starts when the top of the section is a little below the center of the viewport
            end: "bottom center", // Animation ends when the bottom of the section reaches the center of the viewport
            toggleActions: "play none none none", // Defines how the animation behaves on scroll in and out
          },
        }
      );
    }
  }, []);
  return (
    <section
      ref={sectionRef}
      id="contact"
      className="text-white min-h-screen lg:grid lg:grid-cols-2 font-mono relative"
    >
      <div
        className="transparent_text_about hidden sm:hidden md:block"
        style={{ color: "transparent", WebkitTextStroke: "2px white" }}
      >
        &lt;Contact /&gt;
      </div>

      <div className="flex flex-col justify-between p-12 md:p-20">
        <div>
          <header className="font-mono text-white font-bold text-[24px] md:text-[32px] py-10">
            Get In Touch.
            <img src="/assets/undeline.svg" alt="underline" />
          </header>

          <div className="space-y-3 mb-6 bg-base-300 p-5 rounded-lg">
            <p className="flex items-center">
              <FontAwesomeIcon
                icon={faMapLocation}
                className="mr-2 text-primary-blue"
              />
              1575 Tremont Street, Boston, MA 02120.
            </p>
            <p className="flex items-center">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="mr-2 text-primary-blue"
              />
              hetpatel0499@gmail.com
            </p>
            <p className="flex items-center">
              <FontAwesomeIcon
                icon={faPhone}
                className="mr-2 text-primary-blue"
              />
              +1(857)544-9003
            </p>
          </div>
        </div>
        <div className="h-[50vh]">
          <MapPage />
        </div>
      </div>
      <div className="flex flex-col justify-center mt-0 lg:mt-32 xl:w-[80%] md:w-full z-10">
        <form className="py-6 px-10 rounded-lg bg-base-300">
          <h2 className="font-bold text-[24px] mb-10">Say Something</h2>
          <div className="grid grid-cols-1 gap-6 2xl:gap-14">
            <input
              name="name"
              type="text"
              placeholder="Name *"
              className="input input-bordered w-full"
              required
            />
            <input
              name="from_email"
              type="email"
              placeholder="Email *"
              className="input input-bordered w-full"
              required
            />
            <input
              name="subject"
              type="text"
              placeholder="Subject *"
              className="input input-bordered w-full"
              required
            />
            <textarea
              name="message"
              placeholder="Your message *"
              className="textarea textarea-bordered h-48"
              required
            ></textarea>
          </div>
          <button className="btn btn-outline font-mono w-full mt-10">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
