import type { NextConfig } from "next";
import brand from "./src/config/brand.json";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages. The sub-path comes from brand.json (projects.demoRestaurant.path),
  // so renaming the repo is a one-line change in jk/brand/brand.json + `python brand/sync.py`.
  output: "export",
  trailingSlash: true,
  basePath: brand.projects.demoRestaurant.path.replace(/\/$/, ""),
  // Photos are served straight from images.unsplash.com (Unsplash hotlinking rule), sized by URL params.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
