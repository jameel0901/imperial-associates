export const SERVICE_SLUGS = [
  "civil-construction",
  "dgps-drone-survey",
  "mep-design",
  "civil-architecture-design",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export type ServiceSection = {
  heading: string;
  paragraphs: string[];
};

export type ServiceDetail = {
  slug: ServiceSlug;
  title: string;
  listLabel: string;
  summary: string;
  sections: ServiceSection[];
};

export const SERVICES: ServiceDetail[] = [
  {
    slug: "civil-construction",
    title: "Civil construction",
    listLabel: "Civil construction",
    summary:
      "Earthworks, structures, and site execution aligned to drawings, logistics, and quality checks for infrastructure and building shells.",
    sections: [
      {
        heading: "Infrastructure and earthworks",
        paragraphs: [
          "Cut-fill, grading, retaining works, and durable concrete packages aligned to drawings and site logistics.",
        ],
      },
      {
        heading: "Structural and site execution",
        paragraphs: [
          "Foundations, building shell coordination, and field support so civil scope stays tied to schedule and quality checks.",
        ],
      },
    ],
  },
  {
    slug: "dgps-drone-survey",
    title: "DGPS and drone survey",
    listLabel: "DGPS and drone survey",
    summary:
      "Control networks, aerial capture, and corridor mapping for roads and highways—with repeatable accuracy from field to drawing.",
    sections: [
      {
        heading: "DGPS and drone survey",
        paragraphs: [
          "Control networks, UAV orthophotos, contours, and corridor mapping for road and highway packages with repeatable accuracy.",
        ],
      },
      {
        heading: "Highway and alignment design",
        paragraphs: [
          "Horizontal and vertical geometry, junction treatments, widening studies, and DPR-oriented drawing support.",
        ],
      },
      {
        heading: "Topographic, route, and layout survey",
        paragraphs: [
          "Centerline fixing, cross-sections, plot and road network setting-out, and as-built friendly documentation.",
        ],
      },
    ],
  },
  {
    slug: "mep-design",
    title: "BIM MEP Services",
    listLabel: "BIM MEP Services",
    summary:
      "BIM-led modelling, coordination, and documentation for building services—clash-ready packages, disciplined sheets, and interfaces contractors can build from.",
    sections: [
      {
        heading: "Building services engineering",
        paragraphs: [
          "Mechanical, electrical, and plumbing layouts with load assumptions, routing, and coordination across disciplines.",
        ],
      },
      {
        heading: "Coordination and documentation",
        paragraphs: [
          "Services clash reduction, installation-ready sheets, and clear interfaces for contractors and site teams.",
        ],
      },
    ],
  },
  {
    slug: "civil-architecture-design",
    title: "Architecture & Interior design",
    listLabel: "Architecture & Interior design",
    summary:
      "Spatial planning, architectural coordination, and interior intent aligned with structure and services for buildable outcomes.",
    sections: [
      {
        heading: "Spatial planning and finishes",
        paragraphs: [
          "Layouts, circulation, materials, and lighting intent coordinated with structure and services for practical interiors and coordinated shells.",
        ],
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function isServiceSlug(s: string): s is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(s);
}
