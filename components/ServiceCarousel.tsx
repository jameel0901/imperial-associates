"use client";

import { useState } from "react";
import Animate from "./Animate";

const slides = [
  {
    title: "Civil Construction",
    description:
      "Infrastructure and building civil works—earthworks, foundations, retaining structures, concrete packages, and site execution aligned to drawings and specifications.",
    highlight: "Dependable site delivery from groundworks to structure.",
  },
  {
    title: "DGPS & Drone Survey (Roads)",
    description:
      "DGPS control networks, aerial UAV mapping, orthophotos, contours, and corridor capture for road and highway packages—structured for design teams and approvals.",
    highlight: "Precision geomatics for every chainage and cross-section.",
  },
  {
    title: "Road & Highway Design",
    description:
      "Horizontal and vertical alignment, geometric design, junction improvements, corridor planning, and DPR-ready drawing support for transportation projects.",
    highlight: "Design logic that matches field conditions and standards.",
  },
  {
    title: "MEP Design",
    description:
      "Mechanical, electrical, and plumbing design with load planning, routing, coordination drawings, and installation-ready documentation for safer, efficient buildings.",
    highlight: "Integrated building services from concept to execution.",
  },
  {
    title: "Interior Design",
    description:
      "Space planning, layouts, finishes, and coordination with civil and MEP so interiors stay buildable, comfortable, and aligned with the overall project intent.",
    highlight: "Rooms and workflows that feel intentional on site.",
  },
];

export default function ServiceCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const setPrevious = () =>
    setActiveIndex((current) => (current + slides.length - 1) % slides.length);
  const setNext = () => setActiveIndex((current) => (current + 1) % slides.length);

  const slide = slides[activeIndex];

  return (
    <section id="home-carousel" className="px-3 py-16 md:py-24">
      <div className="section-shell">
        <Animate className="stack-note max-w-3xl" delay={90}>
          <p className="section-kicker">Featured services</p>
          <h2 className="section-title mt-5">
            Civil construction, road geomatics, MEP, and interiors—one coordinated practice.
          </h2>
          <p className="mt-8 text-lg leading-8 text-[var(--muted)]">
            Step through our delivery pillars: field surveys with DGPS and drones, highway
            design, building services, civil execution, and interior design for complete
            built-environment support.
          </p>
        </Animate>

        <div className="carousel-shell mt-12">
          <div className="carousel-card">
            <div className="carousel-card-head">
              <span className="carousel-label">{slide.title}</span>
              <p className="carousel-highlight mt-4">{slide.highlight}</p>
            </div>
            <p className="carousel-description mt-6">{slide.description}</p>
          </div>

          <div className="carousel-controls">
            <button type="button" onClick={setPrevious} className="carousel-button button-lift">
              Previous
            </button>

            <div className="carousel-dot-list" aria-label="Service carousel navigation">
              {slides.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={`carousel-dot${index === activeIndex ? " active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${item.title}`}
                />
              ))}
            </div>

            <button type="button" onClick={setNext} className="carousel-button button-lift">
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
