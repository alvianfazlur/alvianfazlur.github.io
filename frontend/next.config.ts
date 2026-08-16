import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

if (process.env.NEXT_STATIC) {
  // Static export for GitHub Pages (no server / rewrites / API routes).
  nextConfig.output = "export";
  nextConfig.images = { unoptimized: true };
  nextConfig.trailingSlash = true;
} else {
  // Dev/prod server mode: proxy /api to the FastAPI backend.
  nextConfig.rewrites = async () => [
    {
      source: "/api/:path*",
      destination: `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/:path*`,
    },
  ];
}

export default nextConfig;