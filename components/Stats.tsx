import Animate from "./Animate";

const stats = [
  {
    value: "Civil construction",
    label:
      "Earthworks, foundations, structural packages, and site execution for infrastructure and building shells.",
  },
  {
    value: "DGPS & Drone Survey",
    label:
      "DGPS and drone survey, topographic and corridor capture, alignment and highway design, layout and stakeout.",
  },
  {
    value: "BIM MEP Services",
    label:
      "BIM production, services coordination, clash workflows, and documentation packages aligned to how teams build on site.",
  },
  {
    value: "Architecture & Interior design",
    label:
      "Space planning, finishes, and coordination with structure and MEP so interiors are buildable and cohesive.",
  },
];

export default function Stats() {
  return (
    <section id="about" className="px-3 py-8 md:py-16">
      <div className="section-shell">
        <Animate className="max-w-3xl" delay={80}>
          <p className="section-kicker">About Us</p>
          <h2 className="section-title mt-5 max-w-4xl">
            From precision survey to built reality, we deliver accurate, end-to-end solutions that turn vision into lasting{" "}
            <span className="section-title-em">results</span>.
          </h2>
        </Animate>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <Animate key={stat.value} className="glass-panel rounded-[1.75rem] p-7" delay={120 + index * 90}>
              <p className="section-kicker">{stat.value}</p>
              <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{stat.label}</p>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}
