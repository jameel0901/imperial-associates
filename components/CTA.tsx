import Animate from "./Animate";

export default function CTA() {
  return (
    <section id="contact" className="px-3 pb-12 pt-8 md:pb-20">
      <div className="section-shell">
        <Animate className="cta-surface overflow-hidden rounded-[2.4rem] p-8 text-white shadow-[var(--shadow)] md:p-12">
          <p className="section-kicker !text-white/80">Ready to Begin</p>
          <div className="mt-4 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className="section-title text-white">
                Let&apos;s support your next road, highway, or layout survey assignment.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/78">
                Share the location, project type, and survey scope. We can assist with
                designing, topographic inputs, route studies, layout surveys, and drawing support.
              </p>
            </div>
            <a
              href="mailto:hello@imperialassociates.com"
              className="rounded-full bg-[var(--accent)] px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-[var(--primary-dark)]"
            >
              hello@imperialassociates.com
            </a>
          </div>
        </Animate>
      </div>
    </section>
  );
}
