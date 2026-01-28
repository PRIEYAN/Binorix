// CRITICAL: Import this FIRST to block localStorage on server before any dependencies load
// This MUST run before Next.js or any dependencies are loaded
require("./src/server/noLocalStorage.js");

import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode:true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack:(config)=>{
    config.resolve.fallback={fs:false,net:false,tls:false};
    config.externals.push("piano-prety","lokijs","encoding");
    return config;
  }
};

export default nextConfig;
