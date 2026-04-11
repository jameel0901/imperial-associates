import Animate from "./Animate";

const stats = [
  {
    value: "Road Design",
    label: "Geometric design, carriageway planning, junction treatment, and corridor development.",
  },
  {
    value: "Highway Surveys",
    label: "Topographic, route, cross-section, and centerline surveys for field and design teams.",
  },
  {
    value: "Layout Survey",
    label: "Plot demarcation, site layout marking, and engineering setting-out for execution.",
  },
  {
    value: "Documentation",
    label: "Profiles, quantity inputs, survey drawings, and design-ready technical outputs.",
  },
];

export default function Stats() {
  return (
    <section id="about" className="px-3 py-8 md:py-14">
      <div className="section-shell grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Animate key={stat.value} delay={index * 80}>
            <div className="glass-panel h-full rounded-[1.75rem] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                {stat.value}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{stat.label}</p>
            </div>
          </Animate>
        ))}
      </div>
    </section>
  );
}
