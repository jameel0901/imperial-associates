import Animate from "./Animate";

const reasons = [
  "Multi-discipline clarity—civil, geomatics, MEP, and interiors described in one coherent scope of work",
  "DGPS and drone workflows paired with road design and layout surveys so field data matches drawing intent",
  "MEP and interior coordination that respects structure, services routing, and buildability on site",
  "Deliverables you can use: survey sheets, design drawings, coordination sets, and documentation for approvals",
];

export default function WhyUs() {
  return (
    <section id="why-us" className="px-3 py-16 md:py-24">
      <div className="section-shell why-grid gap-8">
        <Animate className="why-panel p-8 md:p-10" delay={90}>
          <p className="section-kicker">Why Imperial Associates</p>
          <h2 className="section-title mt-5 max-w-xl">
            Why teams <span className="section-title-em">choose us</span> for civil through interiors
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-8 text-[var(--muted)]">
            We combine road and corridor geomatics with structural civil delivery, building services, and
            interior design—so consultants, contractors, and owners get aligned outputs without juggling
            disconnected vendors.
          </p>
        </Animate>

        <div className="grid gap-4">
          {reasons.map((reason, index) => (
            <Animate key={reason} delay={170 + index * 90}>
              <div className="survey-point flex items-start gap-5 p-6 md:p-7">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[var(--teal-soft)] text-sm font-bold text-[var(--primary-dark)]">
                  {index + 1}
                </span>
                <p className="text-[1.05rem] leading-7 text-[var(--secondary)] sm:text-xl sm:leading-8">
                  {reason}
                </p>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}
