"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const mosaic = [
  {
    src: "/images/civil-constructions.png",
    label: "Civil",
    alt: "Civil construction and site works",
  },
  {
    src: "/images/DGPS%26Drone-survey.png",
    label: "Survey",
    alt: "DGPS and drone survey for corridors and roads",
  },
  {
    src: "/images/MEP-services.png",
    label: "MEP",
    alt: "Mechanical, electrical, and plumbing design",
  },
  {
    src: "/images/architecture.png",
    label: "Architecture",
    alt: "Architecture and spatial planning",
  },
] as const;

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

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  /** True while hero is on screen — drives continuous ambient animation */
  const [alive, setAlive] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setEntered(true);
      setAlive(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;

    const reveal = () => setEntered(true);

    const obsEnter = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          reveal();
          obsEnter.disconnect();
        }
      },
      { threshold: 0, rootMargin: "120px 0px 120px 0px" }
    );
    obsEnter.observe(el);

    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.top < vh * 0.92 && rect.bottom > -rect.height * 0.35) {
          reveal();
        }
      });
    });

    const obsAlive = new IntersectionObserver(
      ([e]) => {
        setAlive(e.isIntersecting);
      },
      { threshold: 0, rootMargin: "80px 0px 80px 0px" }
    );
    obsAlive.observe(el);

    return () => {
      cancelAnimationFrame(rafId);
      obsEnter.disconnect();
      obsAlive.disconnect();
    };
  }, [reducedMotion]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className={`hero-v2 relative overflow-x-clip px-3 py-12 sm:py-14 md:py-20 ${entered ? "hero-v2--visible" : ""} ${alive ? "hero-v2--alive" : ""}`}
    >
      <div className="hero-v2-bg" aria-hidden />
      <div className="hero-v2-blob hero-v2-blob--a" aria-hidden />
      <div className="hero-v2-blob hero-v2-blob--b" aria-hidden />
      <div className="hero-v2-blob hero-v2-blob--c" aria-hidden />
      <div className="hero-v2-noise" aria-hidden />
      <div className="hero-v2-shine" aria-hidden />

      <div className="section-shell relative z-[1] max-w-full">
        <div className="hero-v2-layout">
          <div className="hero-v2-copy min-w-0">
            <p className="hero-v2-eyebrow">Imperial Associates</p>

            <h1 className="hero-v2-title display-font">
              <span className="hero-v2-line">From precision survey</span>
              <span className="hero-v2-line">
                to <span className="section-title-em">built reality</span>
              </span>
              <span className="hero-v2-line hero-v2-line--sub">
                Civil, geomatics, MEP &amp; interiors—one accountable thread.
              </span>
            </h1>

            <p className="hero-v2-lede">
              Road corridors, structures, building services, and interior coordination—documented
              and delivered so field, design, and approvals stay aligned.
            </p>

            <div className="hero-v2-actions">
              <a
                href="#services"
                className="button-lift inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white"
              >
                View capabilities
              </a>
              <a
                href="#contact"
                className="button-lift inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--line)] bg-white/90 px-7 py-3.5 text-sm font-semibold text-[var(--secondary)] shadow-sm"
              >
                Start a project
              </a>
            </div>

            <ul className="hero-v2-chips" aria-label="Core disciplines">
              {["Civil & structures", "Geomatics & roads", "MEP & interiors"].map((t) => (
                <li key={t} className="hero-v2-chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-v2-mosaic min-w-0" aria-label="Service imagery">
            {mosaic.map((item, i) => (
              <figure key={item.src} className={`hero-v2-card hero-v2-card--${i + 1}`}>
                <div className="hero-v2-card-frame">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 720px) 42vw, (max-width: 1100px) 26vw, 20vw"
                    className="hero-v2-card-img object-cover"
                    priority={i < 2}
                  />
                  <div className="hero-v2-card-scrim" aria-hidden />
                </div>
                <figcaption className="hero-v2-card-cap">{item.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
