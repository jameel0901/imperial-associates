"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { useSliderNav } from "./SliderNavContext";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Our Works", href: "#our-works" },
  { label: "Surveys", href: "#why-us" },
  { label: "All services", href: "#all-services" },
];

export default function Navbar() {
  const { sliderInView } = useSliderNav();
  const [menuOpen, setMenuOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  if (sliderInView) {
    return null;
  }

  return (
    <>
      <header className="site-header sticky top-0 z-50 px-3 pt-2 pb-1.5 sm:px-3 sm:pt-2.5 sm:pb-2">
        <div className="nav-shell section-shell flex items-center justify-between gap-3 rounded-2xl px-4 py-2 sm:rounded-full sm:px-5 sm:py-2.5 md:px-7">
          <a href="#top" className="flex min-w-0 items-center gap-0">
            <span className="relative inline-flex h-20 w-fit shrink-0 items-center sm:h-24">
              <Image
                src="/images/logo.png"
                alt="Imperial Associates"
                width={400}
                height={133}
                className="block h-20 w-auto max-w-none object-contain object-left sm:h-24"
                priority
                sizes="(max-width: 640px) 220px, 280px"
              />
            </span>
            <div className="min-w-0">
              <p className="display-font truncate text-[1.25rem] leading-none text-[var(--secondary)] sm:text-[1.45rem] lg:text-[1.7rem]">
                Imperial Associates
              </p>
              <p className="mt-1 hidden text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] sm:block sm:text-xs sm:tracking-[0.28em]">
                Civil · BIM · Survey · Interiors
              </p>
            </div>
          </a>

          <nav
            className="hidden items-center gap-6 text-sm font-medium text-[var(--muted)] lg:flex xl:gap-8"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-[var(--secondary)]">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              className="button-lift hidden rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white lg:inline-flex"
            >
              Book a Consultation
            </a>

            <button
              type="button"
              className="nav-hamburger flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-white/90 text-[var(--secondary)] shadow-sm transition hover:bg-white lg:hidden"
              aria-expanded={menuOpen}
              aria-controls={panelId}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <svg
                className="h-[22px] w-[22px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                {menuOpen ? (
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <>
                    <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden" role="dialog" aria-modal="true" aria-labelledby={`${panelId}-title`}>
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-[rgba(8,18,33,0.48)] backdrop-blur-[3px]"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <aside
            id={panelId}
            className="nav-mobile-panel absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-[var(--line)] bg-[var(--surface-strong)] shadow-[var(--deep-shadow)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
              <p id={`${panelId}-title`} className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Menu
              </p>
              <button
                type="button"
                className="rounded-full p-2 text-[var(--secondary)] transition hover:bg-[var(--teal-tint)]"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <span className="block text-xl leading-none" aria-hidden>
                  ×
                </span>
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3.5 text-base font-medium text-[var(--secondary)] transition hover:bg-[var(--teal-tint)]"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="border-t border-[var(--line)] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <a
                href="#contact"
                className="button-lift flex w-full justify-center rounded-full bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-white"
                onClick={() => setMenuOpen(false)}
              >
                Book a Consultation
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
