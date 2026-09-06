import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        '*.ngrok-free.dev',
        '*.ngrok-free.app',
        '*.ngrok.dev',
        'procentralization-chaya-uredial.ngrok-free.dev',
        'localhost:3000',
        '127.0.0.1:3000',
      ],
    },
  },

};

export default nextConfig;

