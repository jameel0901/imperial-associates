import Link from "next/link";
import type { ReactNode } from "react";

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[50vh] px-3 py-10 md:py-14">
      <div className="section-shell">
        <nav className="mb-8" aria-label="Breadcrumb">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-dark)] transition hover:text-[var(--primary)]"
          >
            <span aria-hidden>←</span> Back to services
          </Link>
        </nav>
        {children}
      </div>
    </div>
  );
}
