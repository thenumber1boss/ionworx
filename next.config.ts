import type { NextConfig } from "next";
import path from "path";

// Default Next.js config
const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

// Adding Webpack aliases and Dart Sass fix
const customConfig = {
  webpack(config: import("webpack").Configuration) {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@app": path.resolve(__dirname, "src/app"),
      "@src": path.resolve(__dirname, "src"),
    };
    config.module = config.module ?? {};
    config.module.rules = config.module.rules ?? [];
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

  

    return config;
  },
};

module.exports = {
  ...nextConfig,
  ...customConfig,
};