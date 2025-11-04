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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://unpkg.com https://cdn.jsdelivr.net",
              // Allow script elements specifically (required for Google Tag Manager/Analytics)
              "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://unpkg.com https://cdn.jsdelivr.net",
              // Allow styles (including Google Fonts stylesheets)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Allow images from self, data URIs, Google domains, and CDNs
              "img-src 'self' data: blob: https: https://www.googletagmanager.com https://www.google-analytics.com https://stats.g.doubleclick.net https://www.google.com https://www.googleadservices.com",
              // Allow fonts (including Google Fonts and CDN-hosted fonts)
              "font-src 'self' data: https://fonts.gstatic.com https://cdn.jsdelivr.net",
              // Allow connections to Google Analytics, Ads endpoints, and CDNs for WASM files
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://region1.google-analytics.com https://region1.analytics.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://unpkg.com https://cdn.jsdelivr.net https://fonts.gstatic.com",
              // Allow frames from trusted sources (GTM noscript)
              "frame-src 'self' https://www.googletagmanager.com",
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
