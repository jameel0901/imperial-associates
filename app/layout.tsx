import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import AppChrome from "@/components/AppChrome";
import Footer from "@/components/Footer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Imperial Associates | Civil, BIM, Survey & Interior",
  description:
    "Civil construction, road and highway design, DGPS and drone survey, BIM services, and interior design—integrated delivery for infrastructure and built environments.",
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
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfair.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full">
        <AppChrome>{children}</AppChrome>
        <Footer />
      </body>
    </html>
  );
}
