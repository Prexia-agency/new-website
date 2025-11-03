import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Allow scripts from self, Google domains, and CDNs for Rive/Spline
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://unpkg.com https://cdn.jsdelivr.net",
              // Allow styles
              "style-src 'self' 'unsafe-inline'",
              // Allow images from self, data URIs, Google domains, and CDNs
              "img-src 'self' data: https: https://www.googletagmanager.com https://www.google-analytics.com https://stats.g.doubleclick.net",
              // Allow fonts
              "font-src 'self' data:",
              // Allow connections to Google Analytics, Ads endpoints, and CDNs for WASM files
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://region1.google-analytics.com https://region1.analytics.google.com https://www.googleadservices.com https://unpkg.com https://cdn.jsdelivr.net",
              // Allow frames from trusted sources
              "frame-src 'self'",
              // Allow objects
              "object-src 'none'",
              // Base URI
              "base-uri 'self'",
              // Form actions
              "form-action 'self'",
              // Frame ancestors
              "frame-ancestors 'self'",
            ].join('; '),
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
