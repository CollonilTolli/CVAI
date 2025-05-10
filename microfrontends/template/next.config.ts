const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
import type { NextConfig } from "next";

const nextConfig: NextConfig  = {
  webpack: (config, options) => {
    const { isServer } = options;
    //config.experiments = { topLevelAwait: true, layers: false };
    config.plugins.push(
      new NextFederationPlugin({
        name: 'template',
        remotes: {
          frontend: `frontend@http://localhost:3000/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        },
        filename: 'static/chunks/remoteEntry.js',
        exposes:{
          './template': "./src/components/Template.tsx"
        },
        extraOptions: {
          exposePages: true
        }
      })
    );
    return config;
  }
}

module.exports = nextConfig