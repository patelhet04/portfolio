import Hero from "./components/Hero";
import Trace from "./components/Trace";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Outputs from "./components/Outputs";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="block" id="experience">
        <div className="wrap">
          <div className="head">
            <h2 className="h2">Career, read as a trace.</h2>
            <p className="lede">Every role is a span on one timeline, work above and education below. Hover to scrub through time, and open a span to see what happened inside it.</p>
          </div>
          <Trace />
        </div>
      </section>
      <About />
      <Testimonials />
      <Outputs />
      <Contact />
    </>
  );
}
