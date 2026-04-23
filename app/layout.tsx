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
    default: "Imperial Associates | Civil, BIM, Survey & Interior",
    template: "%s | Imperial Associates",
  },
  description:
    "From precision survey to built reality—civil construction, DGPS & drone survey, BIM MEP services, and architecture & interior design delivered end to end.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Imperial Associates",
    title: "Imperial Associates | Civil, BIM, Survey & Interior",
    description:
      "From precision survey to built reality—civil construction, DGPS & drone survey, BIM MEP services, and architecture & interior design delivered end to end.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imperial Associates | Civil, BIM, Survey & Interior",
    description:
      "From precision survey to built reality—civil construction, DGPS & drone survey, BIM MEP services, and architecture & interior design delivered end to end.",
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
    "@type": "Organization",
    name: "Imperial Associates",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.webp`,
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
