import Image from "next/image";

export default function AllServicesImage() {
  return (
    <section id="all-services" className="px-3 py-16 md:py-24">
      <div className="section-shell">
        <p className="section-kicker">All services</p>
        <h2 className="section-title mt-5 max-w-4xl">
          Civil, survey, MEP, and interiors—one integrated scope.
        </h2>
        <div className="mt-10 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface-strong)] shadow-[var(--deep-shadow)]">
          <Image
            src="/images/allSerivces.png"
            alt="Overview of Imperial Associates services: civil construction, DGPS and drone survey, MEP design, architecture and interiors"
            width={1600}
            height={900}
            className="h-auto w-full object-contain"
            sizes="(max-width: 1240px) 100vw, 1240px"
          />
        </div>
      </div>
    </section>
  );
}
