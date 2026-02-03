import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.prexia.com'
  const isProduction = process.env.NODE_ENV === 'production'
  
  // Block everything in development/staging
  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      sitemap: `${baseUrl}/sitemap.xml`,
    }
  }

  // Production rules
  return {
    rules: [
      // General rules for all search engines
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Block API endpoints
          '/_next/',         // Block Next.js internals
          '/admin/',         // Block admin areas (if any)
        ],
        crawlDelay: 1,       // Be respectful to server
      },
      
      // Give Google special treatment (no crawl delay)
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
        ],
      },
      
      // Block resource-draining bots (optional)
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'MJ12bot',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}

