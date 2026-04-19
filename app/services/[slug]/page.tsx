import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MEP_DESIGN_SUBSERVICES, mepDesignSubImageSrc } from "@/lib/mep-design-subservices";
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

  const isMepDesignPage = service.slug === "mep-design";
  /** Match site emphasis: teal for titles (same family as .section-title-em) */
  const mepH2Class =
    "display-font text-[1.5rem] leading-tight text-[var(--primary)] md:text-[1.75rem]";
  const mepH3Class =
    "display-font text-[1.15rem] leading-snug text-[var(--primary-dark)] md:text-[1.25rem]";

  return (
    <article>
      <header className="max-w-3xl">
        <p className="section-kicker">Services</p>
        <ServicePageHeading title={service.title} />
        <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{service.summary}</p>
      </header>

      <div className="mt-12 space-y-10">
        {isMepDesignPage &&
          MEP_DESIGN_SUBSERVICES.map((sub, index) => (
            <section
              key={sub.id}
              className="glass-panel rounded-[1.75rem] p-6 md:p-8 lg:p-10"
            >
              <div
                className={`flex flex-col gap-8 lg:gap-12 xl:gap-14 lg:flex-row lg:items-start ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="relative w-full shrink-0 overflow-hidden rounded-2xl border border-[var(--line)] bg-gradient-to-br from-[var(--teal-tint)] via-white to-[var(--bg)] shadow-[var(--shadow)] ring-1 ring-inset ring-white/70 lg:w-[min(100%,540px)] xl:w-[min(100%,600px)]">
                  <div className="relative h-[280px] w-full sm:h-[320px] md:h-[360px] lg:h-[min(520px,55vh)] lg:min-h-[420px] xl:min-h-[480px]">
                    <Image
                      src={mepDesignSubImageSrc(sub.imageFile)}
                      alt={sub.title}
                      fill
                      className="object-contain object-center p-4 sm:p-5 lg:p-7"
                      sizes="(max-width: 1024px) 100vw, 600px"
                      priority={index < 2}
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1 pt-0 lg:pt-1">
                  <h2 className={mepH2Class}>{sub.title}</h2>
                  <p className="mt-4 text-base leading-8 text-[var(--muted)]">{sub.summary}</p>
                  {sub.sections.map((block) => (
                    <div key={block.heading} className="mt-6">
                      <h3 className={mepH3Class}>{block.heading}</h3>
                      {block.paragraphs.map((p, i) => (
                        <p key={i} className="mt-3 text-base leading-8 text-[var(--muted)]">
                          {p}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}

        {service.sections.map((section) => (
          <section key={section.heading} className="glass-panel rounded-[1.75rem] p-6 md:p-8">
            <h2
              className={
                isMepDesignPage
                  ? mepH2Class
                  : "display-font text-[1.5rem] leading-tight text-[var(--secondary)] md:text-[1.75rem]"
              }
            >
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
