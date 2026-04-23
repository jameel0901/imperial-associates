import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { MEP_DESIGN_SUBSERVICES, mepDesignSubImageSrc } from "@/lib/mep-design-subservices";
import {
  SERVICE_SLUGS,
  type ServiceSlug,
  getServiceBySlug,
  isServiceSlug,
} from "@/lib/services-detail";

type Props = { params: Promise<{ slug: string }> };

function trailingSerial(name: string): number | null {
  const withoutExt = name.replace(/\.[^.]+$/, "");
  const m = withoutExt.match(/(?:^|[^\d])(\d+)\s*$/);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : null;
}

function getBimProjectImagePaths(): string[] {
  const dir = path.join(process.cwd(), "public", "images", "BIMprojects");
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => /\.(png|jpe?g|webp|gif|avif)$/i.test(name))
      .sort((a, b) => {
        const an = trailingSerial(a);
        const bn = trailingSerial(b);
        if (an !== null && bn !== null && an !== bn) return an - bn;
        if (an !== null && bn === null) return -1;
        if (an === null && bn !== null) return 1;
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
      });

    return files.map((file) => encodeURI(`/images/BIMprojects/${file}`));
  } catch {
    return [];
  }
}

function imageAltFromPath(path: string) {
  const base = decodeURIComponent(path.split("/").pop() ?? path);
  const withoutExt = base.replace(/\.[^.]+$/, "");
  const cleaned = withoutExt.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  return cleaned.replace(/\s*\d+\s*$/, "").trim();
}

function imageTitleFromPath(path: string) {
  return imageAltFromPath(path);
}

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

        {isMepDesignPage && (
          <section className="glass-panel rounded-[1.75rem] p-6 md:p-8 lg:p-10">
            <header className="max-w-3xl">
              <h2 className={mepH2Class}>Our Projects</h2>
              <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                Recent BIM deliverables across residential, hospitality, infrastructure, and island
                development packages.
              </p>
            </header>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {getBimProjectImagePaths().map((src) => (
                <div
                  key={src}
                  className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white/70 shadow-[var(--shadow)]"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={src}
                      alt={imageAltFromPath(src)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="px-4 py-4">
                    <p className="display-font text-[1.05rem] leading-snug text-[var(--primary)]">
                      {imageTitleFromPath(src)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

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
