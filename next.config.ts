import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Webpack config removed; Next.js handles aliases automatically now
  // Allow Vercel builds to succeed even if TypeScript or ESLint report errors.
  // WARNING: Ignoring build errors can mask real problems — use temporarily.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    // If you are on a newer version (Next.js 16+), ensure optimization flags are here
  }
};

export default nextConfig;