import Image from "next/image";
import Animate from "./Animate";

const projects = [
  {
    title: "State Highway Improvement Study",
    category: "Highway Corridor Design",
    image: "/images/project-highway.jpg",
  },
  {
    title: "Township Access Road Network",
    category: "Layout Planning Survey",
    image: "/images/project-layout.jpg",
  },
  {
    title: "Industrial Link Road Package",
    category: "Topographic and Route Survey",
    image: "/images/project-industrial.jpg",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="px-3 py-12 md:py-18">
      <div className="section-shell">
        <Animate className="max-w-3xl">
          <p className="section-kicker">Latest Projects</p>
          <h2 className="section-title mt-3">
            Recent assignments in roadway planning and field surveys.
          </h2>
        </Animate>

        <div className="project-grid mt-10 gap-5">
          {projects.map((project, index) => (
            <Animate key={project.title} delay={index * 110}>
              <article className="overflow-hidden rounded-[1.6rem] border border-[var(--line)] bg-[var(--surface-strong)] shadow-[var(--shadow)]">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={900}
                    height={720}
                    unoptimized
                    className="h-72 w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.24em]">
                    <span className="rounded-full bg-[var(--teal-tint-strong)] px-3 py-2 text-[var(--primary)]">
                      {project.category}
                    </span>
                  </p>
                  <h3 className="mt-4 text-2xl font-extrabold text-[var(--foreground)]">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    Survey control, alignment review, and drawing support delivered for
                    planning teams, contractors, and approval-stage documentation.
                  </p>
                  <a
                    href="#contact"
                    className="mt-4 inline-block text-sm font-bold text-[var(--primary-dark)] transition hover:text-[var(--primary)]"
                  >
                    View Details
                  </a>
                </div>
              </article>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}
