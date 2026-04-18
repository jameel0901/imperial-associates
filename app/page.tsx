import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Services from "../components/Services";
import Projects from "../components/Projects";
import OurWorks from "../components/OurWorks";
import WhyUs from "../components/WhyUs";
import AllServicesImage from "../components/AllServicesImage";
import CTA from "../components/CTA";
import ServiceCarousel from "@/components/ServiceCarousel";
import { SliderNavProvider } from "@/components/SliderNavContext";

export default function Home() {
  return (
    <SliderNavProvider>
      <Navbar />
      <main>
        <ServiceCarousel />
        <Hero />
        <Stats />
        <Services />
        <Projects />
        <OurWorks />
        <WhyUs />
        <AllServicesImage />
        <CTA />
      </main>
    </SliderNavProvider>
  );
}
