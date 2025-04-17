import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'simg.marwin.kz',
      },
      {
        protocol: 'https',
        hostname: 'resources.cdn-kaspi.kz',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'static.insales-cdn.com',
      },
      {
        protocol: 'https',
        hostname: 'adebiportal.kz',
      },
      {
        protocol: 'https',
        hostname: 'tengrinews.kz',
      },
      {
        protocol: 'https',
        hostname: 'www.nlrk.kz',
      },
      {
        protocol: 'https',
        hostname: 'harpersbazaar.kz',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
