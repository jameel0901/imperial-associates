import Animate from "./Animate";

const testimonials = [
  {
    quote:
      "The survey sheets, levels, and alignment references were clear enough for our design review and site teams to move quickly.",
    name: "Regional Infrastructure Client",
    role: "Roadway Planning Package",
  },
  {
    quote:
      "They understood both field conditions and drawing requirements, which made the layout survey outputs far more usable.",
    name: "Private Layout Developer",
    role: "Survey and Marking Assignment",
  },
  {
    quote:
      "From topographic capture to profile support, the documentation was practical, organized, and easy to coordinate with contractors.",
    name: "Engineering Consultant",
    role: "Highway Design Support",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="px-3 py-12 md:py-18">
      <div className="section-shell">
        <Animate className="max-w-2xl">
          <p className="section-kicker">Testimonials</p>
          <h2 className="section-title mt-3">
            Clients value clarity in the field and in the drawings.
          </h2>
        </Animate>

        <div className="testimonial-grid mt-10 gap-5">
          {testimonials.map((item, index) => (
            <Animate key={item.name} delay={index * 100}>
              <figure className="glass-panel h-full rounded-[2rem] p-7">
                <blockquote className="text-lg leading-9 text-[var(--foreground)]">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-[var(--line)] pt-5">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
                    {item.role}
                  </p>
                </figcaption>
              </figure>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}
