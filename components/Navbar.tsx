const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Surveys", href: "#why-us" },
  { label: "Clients", href: "#testimonials" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <div className="section-shell glass-panel flex items-center justify-between rounded-full px-5 py-4">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold tracking-[0.22em] text-[var(--secondary)]">
            IA
          </span>
          <div>
            <p className="display-font text-xl leading-none">Imperial Associates</p>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
              Design and Survey Consultants
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-[var(--muted)] md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-[var(--foreground)]">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--secondary)] transition hover:bg-[var(--accent)]"
        >
          Contact Us
        </a>
      </div>
    </header>
  );
}
