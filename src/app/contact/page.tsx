import React from "react";
import MapPage from "../components/Map";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="hero min-h-screen relative">
      <div
        className="transparent_text_about hidden sm:hidden md:block"
        style={{ color: "transparent", WebkitTextStroke: "2px white" }}
      >
        &lt;Contact /&gt;
      </div>
    </section>
  );
};

export default Contact;
