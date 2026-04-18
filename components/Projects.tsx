import Image from "next/image";
import Animate from "./Animate";

const projects = [
  {
    title: "State Highway Corridor Upgrade",
    category: "Road design & geomatics",
    image: "/images/project-highway.jpg",
    text: "DGPS control, aerial mapping support, alignment review, and drawing packages for planning teams, contractors, and approval-stage submissions.",
  },
  {
    title: "Mixed-Use Podium Services",
    category: "MEP coordination",
    image: "/images/project-industrial.jpg",
    text: "Mechanical, electrical, and plumbing routing with coordinated risers and plant areas for a multi-level commercial and retail shell.",
  },
  {
    title: "Residential Layout & Interior Package",
    category: "Civil & interior design",
    image: "/images/project-layout.jpg",
    text: "Road hierarchy and plot surveys paired with interior space planning and finish coordination for a cohesive handover story.",
  },
];

export default function Projects() {
  const [leadProject, ...sideProjects] = projects;

  return (
    <section id="projects" className="px-3 py-16 md:py-24">
      <div className="section-shell">
        <Animate className="max-w-4xl" delay={100}>
          <p className="section-kicker">Latest Projects</p>
          <h2 className="section-title mt-5">
            Representative work across infrastructure, building services, and interiors.
          </h2>
        </Animate>

        <div className="project-grid mt-14 gap-8">
          <Animate className="project-lead" delay={180}>
            <article className="project-feature">
              <div className="relative overflow-hidden">
                <Image
                  src={leadProject.image}
                  alt={leadProject.title}
                  width={1200}
                  height={900}
                  unoptimized
                  className="project-image h-[29rem] w-full object-cover"
                />
              </div>
              <div className="p-8 md:p-10">
                <span className="inline-flex rounded-full bg-[var(--teal-tint-strong)] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
                  {leadProject.category}
                </span>
                <h3 className="display-font mt-6 text-[3.2rem] leading-[0.96] text-[var(--secondary)]">
                  {leadProject.title}
                </h3>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                  {leadProject.text}
                </p>
                <a
                  href="#contact"
                  className="button-lift mt-6 inline-block text-sm font-semibold text-[var(--primary-dark)]"
                >
                  View Details
                </a>
              </div>
            </article>
          </Animate>

          <div className="project-side-list">
            {sideProjects.map((project, index) => (
              <Animate key={project.title} className="project-side-card" delay={240 + index * 110}>
                <div className="overflow-hidden rounded-[1.2rem]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    unoptimized
                    className="project-image h-full min-h-52 w-full object-cover"
                  />
                </div>
                <div className="self-center p-2">
                  <span className="inline-flex rounded-full bg-[var(--teal-tint-strong)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
                    {project.category}
                  </span>
                  <h3 className="display-font mt-5 text-[2.2rem] leading-[1] text-[var(--secondary)]">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-[var(--muted)]">{project.text}</p>
                  <a
                    href="#contact"
                    className="button-lift mt-5 inline-block text-sm font-semibold text-[var(--primary-dark)]"
                  >
                    View Details
                  </a>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
