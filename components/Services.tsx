import Animate from "./Animate";

type ServiceLine = {
  pillar: string;
  title: string;
  text: string;
};

const serviceLines: ServiceLine[] = [
  {
    pillar: "Civil construction",
    title: "Infrastructure and earthworks",
    text: "Cut-fill, grading, retaining works, and durable concrete packages aligned to drawings and site logistics.",
  },
  {
    pillar: "Civil construction",
    title: "Structural and site execution",
    text: "Foundations, building shell coordination, and field support so civil scope stays tied to schedule and quality checks.",
  },
  {
    pillar: "Roads & geomatics",
    title: "DGPS and drone survey",
    text: "Control networks, UAV orthophotos, contours, and corridor mapping for road and highway packages with repeatable accuracy.",
  },
  {
    pillar: "Roads & geomatics",
    title: "Highway and alignment design",
    text: "Horizontal and vertical geometry, junction treatments, widening studies, and DPR-oriented drawing support.",
  },
  {
    pillar: "Roads & geomatics",
    title: "Topographic, route, and layout survey",
    text: "Centerline fixing, cross-sections, plot and road network setting-out, and as-built friendly documentation.",
  },
  {
    pillar: "MEP design",
    title: "Building services engineering",
    text: "Mechanical, electrical, and plumbing layouts with load assumptions, routing, and coordination across disciplines.",
  },
  {
    pillar: "MEP design",
    title: "Coordination and documentation",
    text: "Services clash reduction, installation-ready sheets, and clear interfaces for contractors and site teams.",
  },
  {
    pillar: "Interior design",
    title: "Spatial planning and finishes",
    text: "Layouts, circulation, materials, and lighting intent coordinated with structure and services for practical interiors.",
  },
];

const serviceLinesIndexed = (() => {
  let lastPillar = "";
  let n = 0;
  return serviceLines.map((service) => {
    if (service.pillar !== lastPillar) {
      lastPillar = service.pillar;
      n = 0;
    }
    n += 1;
    return {
      ...service,
      displayIndex: String(n).padStart(2, "0"),
    };
  });
})();

export default function Services() {
  return (
    <section id="services" className="px-3 py-16 md:py-24">
      <div className="section-shell service-layout gap-12">
        <Animate className="stack-note max-w-lg pt-4" delay={90}>
          <p className="section-kicker">Services</p>
          <h2 className="section-title mt-5">
            Four pillars—civil, roads and geomatics, MEP, and interiors—structured for real projects.
          </h2>
          <p className="mt-8 text-lg leading-8 text-[var(--muted)]">
            Browse by discipline: field surveys with DGPS and drones, transportation design,
            building services, civil execution, and interior design for a complete built-environment
            offering.
          </p>
        </Animate>

        <div className="service-list">
          {serviceLinesIndexed.map((service, index) => {
            const showPillar =
              index === 0 || service.pillar !== serviceLinesIndexed[index - 1].pillar;

            return (
              <div key={`${service.pillar}-${service.title}`}>
                {showPillar ? (
                  <Animate className="pt-6 first:pt-0" delay={150 + index * 70}>
                    <h3 className="display-font text-[1.35rem] leading-tight text-[var(--primary-dark)]">
                      {service.pillar}
                    </h3>
                  </Animate>
                ) : null}
                <Animate className="service-row" delay={150 + index * 80}>
                  <span className="service-index">{service.displayIndex}</span>
                  <div>
                    <h4 className="display-font text-[clamp(1.35rem,4vw,2.15rem)] leading-[1.08] text-[var(--secondary)]">
                      {service.title}
                    </h4>
                    <p className="mt-3 max-w-2xl text-base leading-8 text-[var(--muted)]">
                      {service.text}
                    </p>
                  </div>
                </Animate>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
