import Animate from "./Animate";

const reasons = [
  "Road and highway work shaped by design logic, survey accuracy, and field practicality",
  "Layout survey support that helps sites move from planning drawings to execution marking",
  "Topographic and corridor surveys structured for consultants, contractors, and approvals",
  "Clear outputs including drawings, profiles, sections, and technical support documentation",
];

export default function WhyUs() {
  return (
    <section id="why-us" className="px-3 py-12 md:py-18">
      <div className="section-shell why-grid gap-6">
        <Animate className="rounded-[2rem] bg-[var(--surface-strong)] p-8 md:p-10">
          <p className="section-kicker">Survey Strength</p>
          <h2 className="section-title mt-3 max-w-lg">
            Why teams choose us for <span className="text-[var(--primary)]">designing and surveys</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)]">
            Your current content stays focused on roadway design, field surveys,
            and layout support while returning to the previous visual style.
          </p>
        </Animate>

        <div className="grid gap-4">
          {reasons.map((reason, index) => (
            <Animate key={reason} delay={index * 90}>
              <div className="glass-panel flex items-start gap-4 rounded-[1.6rem] p-6">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold text-[var(--secondary)]">
                  {index + 1}
                </span>
                <p className="text-lg leading-8 text-[var(--foreground)]">{reason}</p>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}
