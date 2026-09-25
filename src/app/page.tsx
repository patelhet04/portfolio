import Hero from "./components/Hero";
import Trace from "./components/Trace";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Outputs from "./components/Outputs";
import Contact from "./components/Contact";
import RevealText from "./components/RevealText";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="block" id="experience">
        <div className="wrap">
          <div className="head">
            <RevealText className="h2" runs={["Career, read as a trace."]} />
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
