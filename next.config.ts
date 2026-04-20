import type { NextConfig } from "next";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim().replace(/\/+$/, "");
const assetPrefix = basePath ? `${basePath}/` : undefined;

const nextConfig: NextConfig = {
  /**
   * GitHub Pages deployment (static export).
   * Repo: https://github.com/jameel0901/imperial-associates
   * Pages URL (no custom domain): https://jameel0901.github.io/imperial-associates/
   * Custom domain (recommended): https://www.imperialassociates.co.in/
   */
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix,
  images: { unoptimized: true },
};

export default nextConfig;
