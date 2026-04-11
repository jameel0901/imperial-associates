import Image from "next/image";
import Animate from "./Animate";

export default function Hero() {
  return (
    <section id="top" className="px-3 pb-10 pt-8 md:pb-16 md:pt-10">
      <div className="section-shell hero-grid items-stretch gap-6">
        <Animate className="soft-ring glass-panel flex flex-col justify-between rounded-[2rem] p-7 md:p-10">
          <div className="space-y-6">
            <p className="section-kicker">Roads and Highways</p>
            <h1 className="section-title max-w-3xl text-[var(--foreground)]">
              Smart <span className="text-[var(--primary)]">designing</span> and dependable survey
              solutions.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Imperial Associates supports road and highway development with
              alignment planning, detailed surveying, layout marking, corridor
              studies, and field-ready engineering documentation.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#services"
              className="rounded-full bg-[var(--primary)] px-6 py-4 text-center text-sm font-bold text-[var(--secondary)] transition hover:bg-[var(--accent)]"
            >
              Explore Services
            </a>
            <a
              href="#contact"
              className="rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-6 py-4 text-center text-sm font-bold text-[var(--text)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              Get Proposal
            </a>
          </div>

          <div className="mt-10 grid gap-4 border-t border-[var(--line)] pt-6 sm:grid-cols-3">
            {[
              ["125+", "Survey Assignments"],
              ["60+", "Road and Layout Plans"],
              ["18+", "Districts Covered"],
            ].map(([title, text]) => (
              <div key={title}>
                <h3 className="display-font text-4xl text-[var(--foreground)]">{title}</h3>
                <p className="mt-2 text-sm leading-7 uppercase tracking-[0.16em] text-[var(--muted)]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </Animate>

        <Animate className="relative overflow-hidden rounded-[2rem] bg-[var(--hero-panel)] p-4 md:p-5" delay={140}>
          <Image
            src="/images/hero.jpg"
            alt="Roadside infrastructure and modern engineering landscape"
            width={900}
            height={1100}
            className="h-full min-h-[520px] w-full rounded-[1.6rem] object-cover"
            priority
          />
          <div className="absolute left-7 top-7 rounded-full bg-[var(--accent)] px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--secondary)] shadow-sm">
            Highway Planning
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="glass-panel max-w-sm rounded-[1.5rem] p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--primary)]">
                Core scope
              </p>
              <p className="mt-2 display-font text-2xl">
                Alignment design, DPR support, topographic surveys, and layout setting-out.
              </p>
            </div>
          </div>
        </Animate>
      </div>
    </section>
  );
}
