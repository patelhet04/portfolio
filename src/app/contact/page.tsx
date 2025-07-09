"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocation,
  faPhone,
  faEnvelope,
  faPaperPlane,
  faUser,
  faAt,
  faTag,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MapPage from "../components/DynamicMap";
import Toaster from "../components/Toaster";
import emailjs from "@emailjs/browser";
import Image from "next/image";

export type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact: React.FC = () => {
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string, type: string) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: -50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Contact info animation
      if (contactInfoRef.current) {
        gsap.fromTo(
          contactInfoRef.current.querySelectorAll(".contact-item"),
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: contactInfoRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Form animation
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, x: 100, rotationY: 15 },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Map animation
      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  async function onSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
          form.current as HTMLFormElement,
          { publicKey: process.env.NEXT_PUBLIC_EMAILJS_USER_ID as string }
        )
        .then(() => {
          showToast("Message sent successfully! 🎉", "success");
          reset();
        })
        .catch((error) => {
          showToast(`Error: ${error}`, "error");
          console.log("FAILED...", error);
        });
    } catch (error) {
      showToast(`Error: ${error}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="hero min-h-screen relative"
    >
      {/* Background Text */}
      <div
        className="transparent_text_about hidden sm:hidden md:block"
        style={{ color: "transparent", WebkitTextStroke: "2px white" }}
      >
        &lt;Contact /&gt;
      </div>

      <div className="hero-content gap-7 px-14 md:px-20 flex-col">
        <div className="w-full text-white">
          {/* Header */}
          <div ref={headerRef} className="w-full">
            <h1 className="font-mono text-white font-bold text-[24px] md:text-[32px] text-left">
              Get In Touch
            </h1>
            <div className="flex justify-start">
              <Image
                src="/assets/undeline.svg"
                alt="underline"
                width={200}
                height={20}
              />
            </div>
            <p className="font-firaCode text-base-content text-opacity-80 mt-4 text-[14px] max-w-full">
              I'm always open to discussing new opportunities, interesting
              projects, or just having a friendly conversation about technology.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Left Column - Contact Info & Map */}
            <div className="flex flex-col space-y-7">
              {/* Contact Information Card - Single Container */}
              <div className="bg-base-300 bg-opacity-[0.8] backdrop-blur-sm rounded-lg p-6 border border-base-content border-opacity-10 shadow-xl flex-1">
                <h2 className="text-[20px] md:text-[22px] font-bold text-[#49C5B6] mb-5 font-mono">
                  Contact Information
                </h2>

                <div ref={contactInfoRef} className="space-y-5">
                  <div className="contact-item flex items-center space-x-4 group">
                    <div className="w-11 h-11 bg-[#49C5B6] bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                      <FontAwesomeIcon
                        icon={faMapLocation}
                        className="text-[#49C5B6] text-base"
                      />
                    </div>
                    <div>
                      <h3 className="font-mono font-semibold text-white mb-1 text-[15px]">
                        Location
                      </h3>
                      <p className="font-firaCode text-[13px] text-base-content text-opacity-80">
                        11 CAMELOT CT, Boston, MA 02135
                      </p>
                    </div>
                  </div>

                  <div className="contact-item flex items-center space-x-4 group">
                    <div className="w-11 h-11 bg-[#49C5B6] bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="text-[#49C5B6] text-base"
                      />
                    </div>
                    <div>
                      <h3 className="font-mono font-semibold text-white mb-1 text-[15px]">
                        Email
                      </h3>
                      <p className="font-firaCode text-[13px] text-base-content text-opacity-80">
                        hetpatel0499@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="contact-item flex items-center space-x-4 group">
                    <div className="w-11 h-11 bg-[#49C5B6] bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="text-[#49C5B6] text-base"
                      />
                    </div>
                    <div>
                      <h3 className="font-mono font-semibold text-white mb-1 text-[15px]">
                        Phone
                      </h3>
                      <p className="font-firaCode text-[13px] text-base-content text-opacity-80">
                        +1 (857) 544-9003
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div ref={mapRef} className="h-[240px] lg:h-[260px]">
                <div className="bg-base-300 bg-opacity-[0.8] backdrop-blur-sm rounded-lg p-4 border border-base-content border-opacity-10 h-full">
                  <h3 className="font-mono font-semibold text-white mb-3 text-[15px]">
                    Find Me Here
                  </h3>
                  <div className="h-[calc(100%-2rem)] rounded-lg overflow-hidden">
                    <MapPage />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div ref={formRef} className="flex">
              <div className="bg-base-300 bg-opacity-[0.8] backdrop-blur-sm rounded-lg p-7 border border-base-content border-opacity-10 shadow-xl flex-1 flex flex-col">
                <h2 className="font-mono font-bold text-[20px] md:text-[22px] text-white mb-2">
                  Send Me a Message
                </h2>
                <form
                  ref={form}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5 flex-1 flex flex-col"
                >
                  <input type="hidden" name="to_name" value="Het Patel" />

                  {/* Name Field */}
                  <div className="form-group">
                    <label className="label py-1">
                      <span className="label-text font-mono text-white flex items-center text-[15px]">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="mr-2 text-[#49C5B6]"
                        />
                        Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className={`input input-bordered w-full bg-base-100 bg-opacity-50 focus:bg-opacity-70 transition-all duration-300 ${
                        errors.name
                          ? "border-red-500"
                          : "focus:border-[#49C5B6]"
                      }`}
                      {...register("name", { required: "Name is required" })}
                      name="from_name"
                    />
                    {errors.name && (
                      <span className="text-red-400 text-[12px] font-firaCode mt-1">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="form-group">
                    <label className="label py-1">
                      <span className="label-text font-mono text-white flex items-center text-[15px]">
                        <FontAwesomeIcon
                          icon={faAt}
                          className="mr-2 text-[#49C5B6]"
                        />
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      className={`input input-bordered w-full bg-base-100 bg-opacity-50 focus:bg-opacity-70 transition-all duration-300 ${
                        errors.email
                          ? "border-red-500"
                          : "focus:border-[#49C5B6]"
                      }`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                      name="from_email"
                    />
                    {errors.email && (
                      <span className="text-red-400 text-[12px] font-firaCode mt-1">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div className="form-group">
                    <label className="label py-1">
                      <span className="label-text font-mono text-white flex items-center text-[15px]">
                        <FontAwesomeIcon
                          icon={faTag}
                          className="mr-2 text-[#49C5B6]"
                        />
                        Subject
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="What's this about?"
                      className={`input input-bordered w-full bg-base-100 bg-opacity-50 focus:bg-opacity-70 transition-all duration-300 ${
                        errors.subject
                          ? "border-red-500"
                          : "focus:border-[#49C5B6]"
                      }`}
                      {...register("subject", {
                        required: "Subject is required",
                      })}
                      name="subject"
                    />
                    {errors.subject && (
                      <span className="text-red-400 text-[12px] font-firaCode mt-1">
                        {errors.subject.message}
                      </span>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="form-group flex-1 flex flex-col">
                    <label className="label py-1">
                      <span className="label-text font-mono text-white flex items-center text-[15px]">
                        <FontAwesomeIcon
                          icon={faComment}
                          className="mr-2 text-[#49C5B6]"
                        />
                        Message
                      </span>
                    </label>
                    <textarea
                      placeholder="Tell me about your project, idea, or just say hello..."
                      className={`textarea textarea-bordered w-full bg-base-100 bg-opacity-50 focus:bg-opacity-70 transition-all duration-300 resize-none flex-1 ${
                        errors.message
                          ? "border-red-500"
                          : "focus:border-[#49C5B6]"
                      }`}
                      {...register("message", {
                        required: "Message is required",
                      })}
                      name="message"
                    />
                    {errors.message && (
                      <span className="text-red-400 text-[12px] font-firaCode mt-1">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn primary-btn btn-outline font-mono w-full flex items-center justify-center space-x-2 hover:scale-105 transition-transform duration-200 ${
                      isSubmitting ? "loading" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPaperPlane} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast.show && <Toaster message={toast.message} type={toast.type} />}
    </section>
  );
};

export default Contact;
