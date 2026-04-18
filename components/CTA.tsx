import Animate from "./Animate";

export default function CTA() {
  return (
    <section id="contact" className="px-3 pb-16 pt-10 md:pb-24">
      <div className="section-shell">
        <Animate className="cta-surface rounded-[2.6rem] p-8 text-white shadow-[var(--deep-shadow)] md:p-12" delay={120}>
          <p className="section-kicker !text-white/80">Ready to Begin</p>
          <div className="mt-6 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-4xl">
              <h2 className="section-title !text-white">
                Let&apos;s scope your next civil, survey, MEP, or interior assignment.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
                Share the location, discipline mix, and deliverables you need. We can support DGPS and
                drone road surveys, highway design, civil construction planning, MEP documentation, and
                interior coordination from early studies through execution-ready packages.
              </p>
            </div>
            <a
              href="mailto:hello@imperialassociates.com"
              className="button-lift rounded-full bg-[var(--accent)] px-7 py-4 text-center text-sm font-semibold text-white"
            >
              hello@imperialassociates.com
            </a>
          </div>
        </Animate>
      </div>
    </section>
  );
}
