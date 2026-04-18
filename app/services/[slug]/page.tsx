import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SERVICE_SLUGS,
  type ServiceSlug,
  getServiceBySlug,
  isServiceSlug,
} from "@/lib/services-detail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams(): { slug: ServiceSlug }[] {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = isServiceSlug(slug) ? getServiceBySlug(slug) : undefined;
  if (!service) {
    return { title: "Service | Imperial Associates" };
  }
  const title = `${service.title} | Imperial Associates`;
  return {
    title,
    description: service.summary,
    openGraph: {
      title,
      description: service.summary,
    },
  };
}

function ServicePageHeading({ title }: { title: string }) {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return (
      <h1 className="section-title mt-4">
        <span className="section-title-em">Services</span>
      </h1>
    );
  }
  if (words.length === 1) {
    return (
      <h1 className="section-title mt-4">
        <span className="section-title-em">{words[0]}</span>
      </h1>
    );
  }
  const last = words[words.length - 1]!;
  const before = words.slice(0, -1).join(" ");
  return (
    <h1 className="section-title mt-4">
      {before} <span className="section-title-em">{last}</span>
    </h1>
  );
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) {
    notFound();
  }
  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  return (
    <article>
      <header className="max-w-3xl">
        <p className="section-kicker">Services</p>
        <ServicePageHeading title={service.title} />
        <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{service.summary}</p>
      </header>

      <div className="mt-12 space-y-10">
        {service.sections.map((section) => (
          <section key={section.heading} className="glass-panel rounded-[1.75rem] p-6 md:p-8">
            <h2 className="display-font text-[1.5rem] leading-tight text-[var(--secondary)] md:text-[1.75rem]">
              {section.heading}
            </h2>
            {section.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 text-base leading-8 text-[var(--muted)]">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

      <p className="mt-12 text-center">
        <Link
          href="/#contact"
          className="button-lift inline-flex rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white"
        >
          Discuss this scope
        </Link>
      </p>
    </article>
  );
}
