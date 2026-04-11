import Animate from "./Animate";

const services = [
  {
    title: "Road Alignment Design",
    text: "Horizontal and vertical alignment studies, profile development, design checks, and corridor planning.",
  },
  {
    title: "Highway Geometric Design",
    text: "Junction improvements, widening proposals, shoulder planning, curve design, and safe traffic movement layouts.",
  },
  {
    title: "Topographic Survey",
    text: "Ground features, levels, contours, structures, and utilities captured for accurate planning and drafting.",
  },
  {
    title: "Route and Corridor Survey",
    text: "Centerline fixing, chainage referencing, cross-sections, and existing condition mapping for roadway packages.",
  },
  {
    title: "Layout Survey",
    text: "Site boundary verification, plot layout marking, road network setting-out, and development block demarcation.",
  },
  {
    title: "DPR and Drawing Support",
    text: "Survey drawings, quantity support inputs, plan-profile sheets, and technical presentation documents for approvals.",
  },
];

export default function Services() {
  return (
    <section id="services" className="px-3 py-12 md:py-18">
      <div className="section-shell">
        <Animate className="max-w-4xl">
          <p className="section-kicker">Services</p>
          <h2 className="section-title mt-3">
            Designing and survey categories built for roads, highways, and layout development.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            The service mix reflects your company with categories around road
            design, highway engineering, corridor surveys, topographic work,
            and layout marking support.
          </p>
        </Animate>

        <div className="service-grid mt-10 gap-5">
          {services.map((service, index) => (
            <Animate key={service.title} delay={index * 100}>
              <article className="glass-panel h-full rounded-[2rem] p-7">
                <span className="inline-flex rounded-full bg-[var(--teal-tint-strong)] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
                  0{index + 1}
                </span>
                <h3 className="mt-6 display-font text-3xl">{service.title}</h3>
                <p className="mt-4 text-base leading-8 text-[var(--muted)]">{service.text}</p>
              </article>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}
