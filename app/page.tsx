import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Services from "../components/Services";
import Projects from "../components/Projects";
import WhyUs from "../components/WhyUs";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Projects />
        <WhyUs />
        <Testimonials />
        <CTA />
      </main>
    </>
  );
}
