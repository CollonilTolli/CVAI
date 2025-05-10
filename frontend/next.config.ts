import type { NextConfig } from "next";
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const nextConfig: NextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    config.experiments = {
      topLevelAwait: true,
    };
    config.plugins.push(
      new NextFederationPlugin({
        name: "cvai-frontend",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          template: `template@http://localhost:3001/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
        },
        exposes: {},
      })
    );
  },
};

export default nextConfig;

