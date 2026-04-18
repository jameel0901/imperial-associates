import Image from "next/image";
import Animate from "./Animate";

export default function Hero() {
  return (
    <section id="top" className="editorial-frame px-3 pb-18 pt-10 md:pb-24 md:pt-14">
      <div className="section-shell hero-grid items-end gap-10">
        <Animate className="soft-ring hero-card p-8 md:p-12" delay={60}>
          <p className="section-kicker">Civil · Survey · MEP · Interiors</p>
          <h1 className="section-title mt-6 max-w-4xl">
            Integrated <span className="text-[var(--primary)]">engineering</span> and design
            for roads, buildings, and spaces.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-9 text-[var(--muted)]">
            Imperial Associates brings together civil construction, DGPS and drone survey for
            road corridors, highway and alignment design, MEP systems, and interior design—so
            infrastructure and interiors move forward with one clear technical thread.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#services"
              className="button-lift rounded-full bg-[var(--accent)] px-7 py-4 text-center text-sm font-semibold text-white"
            >
              Explore Services
            </a>
            <a
              href="#contact"
              className="button-lift rounded-full border border-[var(--line)] bg-white px-7 py-4 text-center text-sm font-semibold text-[var(--secondary)]"
            >
              Get Proposal
            </a>
          </div>

          <div className="metrics-grid mt-14 gap-6">
            {[
              ["One team", "Civil, survey, MEP, and interior coordination"],
              ["DGPS · Drone", "Road corridor geomatics and mapping"],
              ["Integrated", "Drawings, surveys, and site-ready outputs"],
            ].map(([title, text], index) => (
              <Animate key={title} className="metric-item" delay={200 + index * 90}>
                <h3 className="display-font text-[clamp(1.65rem,3.2vw,2.35rem)] leading-tight text-[var(--secondary)]">
                  {title}
                </h3>
                <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                  {text}
                </p>
              </Animate>
            ))}
          </div>
        </Animate>

        <Animate className="hero-image-shell" delay={180}>
          <Image
            src="/images/hero.jpg"
            alt="Infrastructure and built environment representing civil and design work"
            width={1100}
            height={1400}
            className="h-full w-full object-cover"
            priority
          />
          <div className="hero-badge">Built environments</div>
          <div className="floating-note">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--primary)]">Core scope</p>
            <p className="display-font mt-3 text-[2rem] leading-[1.05] text-[var(--secondary)]">
              DGPS and UAV surveys, road design, MEP, civil works, and interior fit-outs.
            </p>
          </div>
        </Animate>
      </div>
    </section>
  );
}
