import Hero from "./components/Hero";
import Trace from "./components/Trace";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Outputs from "./components/Outputs";
import Contact from "./components/Contact";
import RevealText from "./components/RevealText";
import { careerSpans } from "@/utils/experience";
import { site } from "@/utils/site";

// Who this is, for search engines: built from the same data as the page, so it stays in step
const current = careerSpans.find((s) => s.kind === "work" && !s.end);
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}/assets/opt/profile.webp`,
  email: `mailto:${site.email}`,
  jobTitle: current?.role ?? "AI Software Engineer",
  ...(current && { worksFor: { "@type": "Organization", name: current.name } }),
  alumniOf: careerSpans.filter((s) => s.kind === "education").map((s) => ({ "@type": "CollegeOrUniversity", name: s.name })),
  address: { "@type": "PostalAddress", addressLocality: "Boston", addressRegion: "MA", addressCountry: "US" },
  knowsAbout: ["Agentic AI", "Python", "AWS", "Terraform", "Distributed systems", "Retrieval-augmented generation", "LLM inference"],
  sameAs: site.socials.map((s) => s.href),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
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
