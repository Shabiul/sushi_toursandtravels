import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.sushitravels.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin'],
      },
      {
        userAgent: ['Googlebot', 'Googlebot-Image', 'Googlebot-Video', 'Bingbot'],
        allow: '/',
        disallow: ['/api/', '/admin'],
      },
      {
        userAgent: ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'anthropic-ai', 'Google-Extended', 'Applebot'],
        allow: '/',
        disallow: ['/api/', '/admin'],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-pages.xml`,
      `${baseUrl}/sitemap-images.xml`,
      `${baseUrl}/sitemap-videos.xml`,
    ],
  };
}
