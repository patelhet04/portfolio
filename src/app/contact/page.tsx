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

      <div className="hero-content gap-8 px-14 md:px-20 flex-col w-full max-w-7xl">
        <div className="w-full text-white">
          {/* Header */}
          <div ref={headerRef} className="w-full mb-12">
            <h1 className="font-sora text-white font-bold text-[24px] md:text-[32px] text-left">
              Get In Touch
            </h1>
            <div className="w-48 h-1 bg-primary rounded-full mt-2"></div>
            <p className="font-sora text-base-content text-opacity-80 mt-6 text-[14px] md:text-[16px] max-w-3xl">
              I'm always open to discussing new opportunities, interesting
              projects, or just having a friendly conversation about technology.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Contact Info & Map */}
            <div className="flex flex-col space-y-8">
              {/* Contact Information Card - Single Container */}
              <div className="bg-base-200 backdrop-blur-sm rounded-3xl p-8 border border-base-content border-opacity-20 shadow-xl flex-1">
                <h2 className="text-[20px] md:text-[22px] font-bold text-primary mb-6 font-sora">
                  Contact Information
                </h2>

                <div ref={contactInfoRef} className="space-y-6">
                  <div className="contact-item flex items-center space-x-4 group">
                    <div className="w-11 h-11 bg-primary bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                      <FontAwesomeIcon
                        icon={faMapLocation}
                        className="text-primary text-base"
                      />
                    </div>
                    <div>
                      <h3 className="font-sora font-semibold text-white mb-1 text-[15px]">
                        Location
                      </h3>
                      <p className="font-sora text-[13px] text-base-content text-opacity-80">
                        11 CAMELOT CT, Boston, MA 02135
                      </p>
                    </div>
                  </div>

                  <div className="contact-item flex items-center space-x-4 group">
                    <div className="w-11 h-11 bg-primary bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="text-primary text-base"
                      />
                    </div>
                    <div>
                      <h3 className="font-sora font-semibold text-white mb-1 text-[15px]">
                        Email
                      </h3>
                      <p className="font-sora text-[13px] text-base-content text-opacity-80">
                        hetpatel0499@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="contact-item flex items-center space-x-4 group">
                    <div className="w-11 h-11 bg-primary bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="text-primary text-base"
                      />
                    </div>
                    <div>
                      <h3 className="font-sora font-semibold text-white mb-1 text-[15px]">
                        Phone
                      </h3>
                      <p className="font-sora text-[13px] text-base-content text-opacity-80">
                        +1 (857) 544-9003
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div ref={mapRef} className="h-[280px] lg:h-[300px]">
                <div className="bg-base-200 backdrop-blur-sm rounded-3xl p-6 border border-base-content border-opacity-20 h-full">
                  <h3 className="font-sora font-semibold text-white mb-4 text-[16px]">
                    Find Me Here
                  </h3>
                  <div className="h-[calc(100%-2.5rem)] rounded-3xl overflow-hidden">
                    <MapPage />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div ref={formRef} className="flex">
              <div className="bg-base-200 backdrop-blur-sm rounded-3xl p-8 border border-base-content border-opacity-20 shadow-xl flex-1 flex flex-col">
                <h2 className="font-sora font-bold text-[20px] md:text-[22px] text-white mb-6">
                  Send Me a Message
                </h2>
                <form
                  ref={form}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 flex-1 flex flex-col"
                >
                  <input type="hidden" name="to_name" value="Het Patel" />

                  {/* Name Field */}
                  <div className="form-group">
                    <label className="label py-1">
                      <span className="label-text font-sora text-white flex items-center text-[15px]">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="mr-2 text-primary"
                        />
                        Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className={`input input-bordered w-full bg-base-100 bg-opacity-50 focus:bg-opacity-70 transition-all duration-300 rounded-2xl ${
                        errors.name ? "border-red-500" : "focus:border-primary"
                      }`}
                      {...register("name", { required: "Name is required" })}
                      name="from_name"
                    />
                    {errors.name && (
                      <span className="text-red-400 text-[12px] font-sora mt-1">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="form-group">
                    <label className="label py-1">
                      <span className="label-text font-sora text-white flex items-center text-[15px]">
                        <FontAwesomeIcon
                          icon={faAt}
                          className="mr-2 text-primary"
                        />
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      className={`input input-bordered w-full bg-base-100 bg-opacity-50 focus:bg-opacity-70 transition-all duration-300 rounded-2xl ${
                        errors.email ? "border-red-500" : "focus:border-primary"
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
                      <span className="text-red-400 text-[12px] font-sora mt-1">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div className="form-group">
                    <label className="label py-1">
                      <span className="label-text font-sora text-white flex items-center text-[15px]">
                        <FontAwesomeIcon
                          icon={faTag}
                          className="mr-2 text-primary"
                        />
                        Subject
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="What's this about?"
                      className={`input input-bordered w-full bg-base-100 bg-opacity-50 focus:bg-opacity-70 transition-all duration-300 rounded-2xl ${
                        errors.subject
                          ? "border-red-500"
                          : "focus:border-primary"
                      }`}
                      {...register("subject", {
                        required: "Subject is required",
                      })}
                      name="subject"
                    />
                    {errors.subject && (
                      <span className="text-red-400 text-[12px] font-sora mt-1">
                        {errors.subject.message}
                      </span>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="form-group flex-1 flex flex-col">
                    <label className="label py-1">
                      <span className="label-text font-sora text-white flex items-center text-[15px]">
                        <FontAwesomeIcon
                          icon={faComment}
                          className="mr-2 text-primary"
                        />
                        Message
                      </span>
                    </label>
                    <textarea
                      placeholder="Tell me about your project, idea, or just say hello..."
                      className={`textarea textarea-bordered w-full bg-base-100 bg-opacity-50 focus:bg-opacity-70 transition-all duration-300 resize-none flex-1 rounded-2xl ${
                        errors.message
                          ? "border-red-500"
                          : "focus:border-primary"
                      }`}
                      {...register("message", {
                        required: "Message is required",
                      })}
                      name="message"
                    />
                    {errors.message && (
                      <span className="text-red-400 text-[12px] font-sora mt-1">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn primary-btn btn-outline font-sora w-full flex items-center justify-center space-x-2 hover:scale-105 transition-transform duration-200 rounded-2xl ${
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
