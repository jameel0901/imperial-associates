const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Surveys", href: "#why-us" },
  { label: "Clients", href: "#testimonials" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 px-3 pt-4">
      <div className="nav-shell section-shell glass-panel flex items-center justify-between rounded-full px-5 py-4 md:px-7">
        <a href="#top" className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--teal-soft)] text-sm font-bold tracking-[0.22em] text-[var(--secondary)]">
            IA
          </span>
          <div>
            <p className="display-font text-[1.7rem] leading-none text-[var(--secondary)]">
              Imperial Associates
            </p>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
              Civil · MEP · Survey · Interiors
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--muted)] lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-[var(--secondary)]">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="button-lift rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white"
        >
          Book a Consultation
        </a>
      </div>
    </header>
  );
}
