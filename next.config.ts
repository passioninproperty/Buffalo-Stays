import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos"],
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^react$/,
        (resource: any) => {
          if (resource.context.includes('node_modules/sanity') || resource.context.includes('node_modules/@sanity')) {
            resource.request = path.resolve(__dirname, 'lib/react-polyfill.ts');
          }
        }
      )
    );
    return config;
  },
};

export default nextConfig;
