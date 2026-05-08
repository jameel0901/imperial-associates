import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import AppChrome from "@/components/AppChrome";
import Footer from "@/components/Footer";
import "./globals.css";

const siteUrl = "https://www.imperialassociates.co.in";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Imperial Associates | Survey, BIM & MEP Services in Raichur",
    template: "%s | Imperial Associates",
  },
  description:
    "Imperial Associates in Raichur delivers survey (DGPS & drone), BIM & MEP services, civil construction, and architecture & interior design—end to end.",
  keywords: [
    "Imperial Associates",
    "Raichur",
    "Survey",
    "DGPS survey",
    "Drone survey",
    "BIM",
    "MEP",
    "BIM MEP",
    "Civil construction",
    "Interior design",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/icon.png", rel: "shortcut icon", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Imperial Associates",
    title: "Imperial Associates | Survey, BIM & MEP Services in Raichur",
    description:
      "Survey (DGPS & drone), BIM & MEP services, civil construction, and interiors—based in Raichur.",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Imperial Associates" }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imperial Associates | Survey, BIM & MEP Services in Raichur",
    description:
      "Survey (DGPS & drone), BIM & MEP services, civil construction, and interiors—based in Raichur.",
    images: ["/twitter-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d9488",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: "Imperial Associates",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    image: [`${siteUrl}/opengraph-image.png`],
    slogan: "Civil · BIM · Survey · Interiors",
    address: {
      "@type": "PostalAddress",
      streetAddress: "12-11-109/13, Janta Press Colony",
      addressLocality: "Raichur",
      postalCode: "584101",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    areaServed: ["Raichur", "Karnataka", "India"],
    knowsAbout: ["Survey", "DGPS Survey", "Drone Survey", "BIM", "MEP", "BIM MEP"],
    email: "info@imperialassociates.co.in",
    sameAs: [],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91 99646 32271",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en"],
      },
    ],
    telephone: ["+91 77601 58960", "+91 99646 32271"],
  };

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfair.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <AppChrome>{children}</AppChrome>
        <Footer />
      </body>
    </html>
  );
}
