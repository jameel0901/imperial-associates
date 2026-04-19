/**
 * BIM Services page discipline blocks (single-page content; images in /images/design-services/).
 */

export type MepDesignSubservice = {
  id: string;
  imageFile: string;
  title: string;
  summary: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const MEP_DESIGN_SUBSERVICES: MepDesignSubservice[] = [
  {
    id: "mep-services",
    imageFile: "MEPservices.png",
    title: "MEP services",
    summary:
      "Integrated mechanical, electrical, and plumbing design with coordinated routing, load calculations, and drawing sets ready for site and approvals.",
    sections: [
      {
        heading: "Mechanical",
        paragraphs: [
          "HVAC concepts, air distribution, equipment schedules, and duct routing coordinated with architecture and structure for comfort, energy intent, and maintainable layouts.",
        ],
      },
      {
        heading: "Electrical",
        paragraphs: [
          "Power distribution, lighting, earthing, and panel schedules with clear circuiting assumptions, cable routing zones, and interfaces for ELV and life-safety coordination.",
        ],
      },
      {
        heading: "Plumbing and fire fighting",
        paragraphs: [
          "Water supply, drainage, risers, and pump head assumptions with coordinated sleeves, shaft fit, and schematic-to-layout alignment for installation teams.",
        ],
      },
    ],
  },
  {
    id: "structural-services",
    imageFile: "Structuralservices.png",
    title: "Structural services",
    summary:
      "Structural modelling and documentation aligned with architectural grids and MEP penetrations—supporting coordination before concrete and steel hit site.",
    sections: [
      {
        heading: "Modelling and detailing",
        paragraphs: [
          "RCC and steel models with consistent grids, levels, and load paths that feed clash checks and contractor take-offs without disconnecting from the architectural shell.",
        ],
      },
      {
        heading: "Coordination with services",
        paragraphs: [
          "Opening schedules, embed layouts, and sleeve strategies coordinated with MEP routes so ducts, trays, and risers do not compromise structural intent.",
        ],
      },
    ],
  },
  {
    id: "architectural-service-bim",
    imageFile: "ArchitecturalserviceBIM.png",
    title: "Architectural service & BIM",
    summary:
      "Architecture-led BIM production with disciplined families, templates, and sheets so the model stays authoritative from concept to construction issue.",
    sections: [
      {
        heading: "BIM execution",
        paragraphs: [
          "Model organisation, naming, and LOD expectations agreed up front so structure and services plug into a single coordinated environment.",
        ],
      },
      {
        heading: "Deliverables",
        paragraphs: [
          "Plans, elevations, sections, and details issued from the model with revision control and clear GFC / tender packages for stakeholders.",
        ],
      },
    ],
  },
  {
    id: "interior-designing",
    imageFile: "Interiordesigning.png",
    title: "Interior designing",
    summary:
      "Interior layouts, finishes, and ceiling coordination aligned with MEP terminals—keeping sight lines, lighting, and AC delivery consistent with the design intent.",
    sections: [
      {
        heading: "Spatial and finish intent",
        paragraphs: [
          "Layouts, material palettes, and joinery coordination that respect HVAC grilles, lighting positions, and access panels without crowding the architectural story.",
        ],
      },
      {
        heading: "Ceiling and services integration",
        paragraphs: [
          "Reflected ceiling plans coordinated with duct levels, sprinkler zones, and light fixtures so site teams receive one clear composite picture.",
        ],
      },
    ],
  },
  {
    id: "clash-detection",
    imageFile: "ClashDetection.png",
    title: "Clash detection",
    summary:
      "Multi-discipline clash reviews and clearance checks before site lock-in—reducing rework when structure, architecture, and MEP compete for the same space.",
    sections: [
      {
        heading: "Clash workflows",
        paragraphs: [
          "Hard and soft clash tests between structure, architecture, and MEP with prioritised issue lists, viewpoints, and follow-up rounds until critical zones are clean.",
        ],
      },
      {
        heading: "Reporting",
        paragraphs: [
          "Traceable clash reports with screenshots and model states so designers and site engineers can close loops with minimal ambiguity.",
        ],
      },
    ],
  },
  {
    id: "scan-to-bim",
    imageFile: "ScantoBIM.png",
    title: "Scan to BIM",
    summary:
      "Laser scan and point-cloud workflows converted into accurate as-built BIM—ideal for retrofits, renovations, and verifying what was built against design.",
    sections: [
      {
        heading: "Capture to model",
        paragraphs: [
          "Point cloud registration, cleanup, and modelling in Revit (or agreed platform) with tolerances suited to renovation and services rerouting work.",
        ],
      },
      {
        heading: "Use cases",
        paragraphs: [
          "As-built documentation for plant rooms, façades, and complex intersections where manual surveys are slow or error-prone.",
        ],
      },
    ],
  },
];

export function mepDesignSubImageSrc(imageFile: string): string {
  return `/images/design-services/${imageFile}`;
}
