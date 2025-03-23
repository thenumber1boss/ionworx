import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@app": path.resolve(__dirname, "src/app"),
      "@src": path.resolve(__dirname, "src"),
    };

    config.module.rules = config.module.rules ?? [];
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
