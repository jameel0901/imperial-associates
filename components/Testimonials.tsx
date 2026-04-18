import Animate from "./Animate";

const testimonials = [
  {
    quote:
      "Their DGPS and drone deliverables lined up cleanly with our alignment sheets—less rework between survey and design teams.",
    name: "Transportation Consultant",
    role: "Road corridor package",
  },
  {
    quote:
      "MEP routing and interior layouts arrived coordinated with the shell structure, which saved time during site execution.",
    name: "Commercial Developer",
    role: "MEP and interior coordination",
  },
  {
    quote:
      "From civil cut-fill to layout marking, the documentation was practical and easy to hand off to contractors.",
    name: "Infrastructure Contractor",
    role: "Civil and layout support",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="px-3 py-16 md:py-24">
      <div className="section-shell">
        <Animate className="max-w-3xl" delay={100}>
          <p className="section-kicker">Testimonials</p>
          <h2 className="section-title mt-5">
            Clients value coordination across survey, design, MEP, and interiors.
          </h2>
        </Animate>

        <div className="testimonial-grid mt-12 gap-6">
          {testimonials.map((item, index) => (
            <Animate key={item.name} className="testimonial-card p-7 md:p-8" delay={180 + index * 100}>
              <blockquote className="display-font text-[2rem] leading-[1.14] text-[var(--secondary)]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-10 border-t border-[var(--line)] pt-6">
                <p className="text-2xl font-semibold text-[var(--secondary)]">{item.name}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                  {item.role}
                </p>
              </figcaption>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}
