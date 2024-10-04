"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocation,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MapPage from "../components/DynamicMap";
import Toaster from "../components/Toaster";
import emailjs from "@emailjs/browser";
export type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
const Contact: React.FC = () => {
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const form = useRef<HTMLFormElement>(null);
  const showToast = (message: string, type: string) => {
    setToast({ show: true, message, type });

    // Automatically hide the toast after a delay
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000); // Adjust time as needed
  };
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormData>();
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

  async function onSubmit(formData: FormData) {
    try {
      await emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
          form.current as HTMLFormElement,
          { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string }
        )
        .then(() => {
          showToast("Message sent successfully!", "success");
        })
        .catch((error) => {
          showToast(`Error: ${error}`, "info");
          console.log("FAILED...", error);
        });
    } catch (error) {
      showToast(`Error: ${error}`, "info");
    } finally {
      reset();
    }
  }

  // Function to show toast notifications

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="text-white min-h-screen lg:grid lg:grid-cols-2 font-mono relative px:0 md:px-10"
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
              11 CAMELOT CT, Boston, MA 02135.
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
      <div className="flex flex-col justify-center mt-0 lg:mt-36 xl:w-[80%] md:w-full z-10">
        <form
          ref={form} // Attach the form reference here
          className="py-6 px-10 rounded-lg bg-base-300"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="font-bold text-[24px] mb-10">Say Something</h2>
          <div className="grid grid-cols-1 gap-6 2xl:gap-14">
            {/* Additional hidden field for `to_name` */}
            <input type="hidden" name="to_name" value="Het Patel" />

            <input
              type="text"
              placeholder="Name *"
              className="input input-bordered w-full"
              required
              {...register("name")}
              name="from_name"
            />
            <input
              type="email"
              placeholder="Email *"
              className="input input-bordered w-full"
              required
              {...register("email")}
              name="from_email"
            />
            <input
              type="text"
              placeholder="Subject *"
              className="input input-bordered w-full"
              required
              {...register("subject")}
              name="subject"
            />
            <textarea
              placeholder="Your message *"
              className="textarea textarea-bordered h-48"
              required
              {...register("message")}
              name="message"
            ></textarea>
          </div>
          <button className="primary-btn btn btn-outline font-mono w-full mt-10">
            Send Message
          </button>
        </form>
      </div>
      {toast.show && <Toaster message={toast.message} type={toast.type} />}
    </section>
  );
};

export default Contact;
