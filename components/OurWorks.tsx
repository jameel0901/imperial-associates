"use client";

import { useEffect, useRef, useState } from "react";
import Animate from "./Animate";

type StatConfig = {
  target: number;
  suffix: string;
  label: string;
  icon: "projects" | "years" | "team" | "satisfaction";
};

const stats: StatConfig[] = [
  {
    target: 150,
    suffix: "+",
    label: "Projects & studies delivered",
    icon: "projects",
  },
  {
    target: 18,
    suffix: "+",
    label: "Years of integrated practice",
    icon: "years",
  },
  {
    target: 45,
    suffix: "+",
    label: "Engineers & survey specialists",
    icon: "team",
  },
  {
    target: 100,
    suffix: "%",
    label: "Coordination-first delivery",
    icon: "satisfaction",
  },
];

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function StatCounter({
  target,
  suffix,
  isActive,
  reducedMotion,
}: {
  target: number;
  suffix: string;
  isActive: boolean;
  reducedMotion: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    if (reducedMotion) {
      setDisplay(target);
      return;
    }
    const duration = 2200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(t);
      setDisplay(eased * target);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isActive, target, reducedMotion]);

  return (
    <span className="our-works-stat-value">
      {Math.round(display)}
      {suffix}
    </span>
  );
}

function StatIcon({ type }: { type: StatConfig["icon"] }) {
  const stroke = "currentColor";
  const common = { fill: "none", stroke, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (type) {
    case "projects":
      return (
        <svg viewBox="0 0 48 48" className="our-works-icon-svg" aria-hidden>
          <path {...common} d="M10 38V14l14-8 14 8v24" />
          <path {...common} d="M10 14l14 8 14-8M24 22v16" />
          <circle {...common} cx="24" cy="30" r="3" />
        </svg>
      );
    case "years":
      return (
        <svg viewBox="0 0 48 48" className="our-works-icon-svg" aria-hidden>
          <path {...common} d="M24 8l3 8 8 1-6 6 1 8-6-4-6 4 1-8-6-6 8-1 3-8z" />
          <path {...common} d="M16 40h16" />
        </svg>
      );
    case "team":
      return (
        <svg viewBox="0 0 48 48" className="our-works-icon-svg" aria-hidden>
          <circle {...common} cx="18" cy="16" r="5" />
          <circle {...common} cx="32" cy="16" r="5" />
          <path {...common} d="M8 40c2-8 8-12 10-12h4c2 0 8 4 10 12M28 28c4 0 8 4 10 12" />
        </svg>
      );
    case "satisfaction":
      return (
        <svg viewBox="0 0 48 48" className="our-works-icon-svg" aria-hidden>
          <path {...common} d="M24 4L8 12v12c0 10 6 18 16 22 10-4 16-12 16-22V12L24 4z" />
          <path {...common} d="M16 24l5 5 11-12" />
        </svg>
      );
    default:
      return null;
  }
}

const STAT_LINE_COUNT = 6;

export default function OurWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="our-works" ref={sectionRef} className="our-works-section relative overflow-hidden px-3 py-16 md:py-24">
      <div className="our-works-sky pointer-events-none" aria-hidden>
        <div className="our-works-orbs" />
        <div className="our-works-grid-pattern" />
      </div>

      <div className="section-shell relative z-[1]">
        <Animate delay={80}>
          <p className="section-kicker">Our Works</p>
          <h2 className="section-title mt-5 max-w-4xl">
            Comfortable, coordinated workspaces for infrastructure and the built environment.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            From civil packages and corridor surveys to MEP coordination and interiors—we deliver
            integrated outcomes you can build on.
          </p>
        </Animate>

        <div className="our-works-stats mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, cardIndex) => (
            <div
              key={stat.label}
              className="our-works-stat-card glass-panel relative flex flex-col items-center overflow-hidden rounded-[1.75rem] px-6 py-8 text-center"
            >
              <div className="our-works-stat-lines" aria-hidden>
                {Array.from({ length: STAT_LINE_COUNT }).map((_, i) => (
                  <span
                    key={i}
                    className="our-works-stat-line our-works-stat-line-h"
                    style={{
                      animationDelay: `${(i * 0.28 + cardIndex * 0.12) % 2}s`,
                      animationDuration: `${2.6 + (i % 3) * 0.35}s`,
                    }}
                  />
                ))}
                <span className="our-works-stat-line our-works-stat-line--v1" />
                <span className="our-works-stat-line our-works-stat-line--v2" />
              </div>
              <div className="relative z-[1] flex flex-col items-center">
                <div className="our-works-icon-wrap text-[var(--primary)]">
                  <StatIcon type={stat.icon} />
                </div>
                <p className="our-works-stat-number mt-5">
                  <StatCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    isActive={inView}
                    reducedMotion={reducedMotion}
                  />
                </p>
                <p className="our-works-stat-label mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
