import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'stimg.cardekho.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    const scriptSrc = isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com;"
      : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com;";
    const connectSrc = isDev
      ? "connect-src 'self' ws://localhost:3000 ws://localhost:3001 ws://127.0.0.1:3000 ws://127.0.0.1:3001 https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://stats.g.doubleclick.net;"
      : "connect-src 'self' https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://stats.g.doubleclick.net;";

    const csp = [
      "default-src 'self';",
      scriptSrc,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
      "img-src 'self' data: blob: https://images.unsplash.com https://stimg.cardekho.com https://www.google.com https://www.google.co.in https://www.googleadservices.com https://googleads.g.doubleclick.net;",
      "font-src 'self' data: https://fonts.gstatic.com;",
      "frame-src 'self' https://www.google.com https://www.google.co.in;",
      connectSrc
    ].join(' ');

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      // Long-lived browser caching for static media in public/. Filenames
      // here are stable between deploys (no content hash), so if a file is
      // ever replaced in place it needs a new filename to bust this cache —
      // that's already the convention used throughout this project (e.g.
      // hero-mountains.mp4 vs a hypothetical hero-mountains-v2.mp4).
      {
        source: '/videos/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/fleet/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*.(jpg|jpeg|png|webp|avif|svg|ico)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.website.xml',
        destination: '/sitemap.xml',
      },
    ];
  },
};

export default nextConfig;
