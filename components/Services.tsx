import Link from "next/link";
import Animate from "./Animate";
import { SERVICES } from "@/lib/services-detail";

export default function Services() {
  return (
    <section id="services" className="px-3 py-16 md:py-24" aria-label="Services">
      <div className="section-shell">
        <Animate className="max-w-4xl" delay={80}>
          <p className="section-kicker">Services</p>
        </Animate>

        <ul className="services-index-list mt-16 md:mt-24" role="list">
          {SERVICES.map((service, index) => (
            <li key={service.slug}>
              <Animate delay={120 + index * 70}>
                <Link
                  href={`/services/${service.slug}`}
                  className="services-index-item group"
                >
                  <span className="services-index-label">{service.listLabel}</span>
                  <span className="services-index-arrow" aria-hidden>
                    →
                  </span>
                </Link>
              </Animate>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
