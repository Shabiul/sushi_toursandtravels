import { MetadataRoute } from 'next';
import { vehiclePages } from '@/lib/vehiclePages';
import { servicePages } from '@/lib/services';
import { locationPages } from '@/lib/locations';
import { routePages } from '@/lib/routes';
import { blogPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.sushitravels.com';
  const now = new Date().toISOString();

  const staticRoutes = [
    '',
    '/fleet',
    '/tours-and-packages',
    '/booking',
    '/about',
    '/contact',
    '/vehicles',
    '/services',
    '/locations',
    '/routes',
    '/blog',
    '/privacy-policy',
    '/terms-and-conditions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route === '/privacy-policy' || route === '/terms-and-conditions' ? 0.3 : 0.8,
  }));

  const vehicleRoutes = vehiclePages.map((p) => ({
    url: `${baseUrl}/vehicles/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const serviceRoutes = servicePages.map((p) => ({
    url: `${baseUrl}/services/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const locationRoutes = locationPages.map((p) => ({
    url: `${baseUrl}/locations/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const routeRoutes = routePages.map((p) => ({
    url: `${baseUrl}/routes/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.publishDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...vehicleRoutes, ...serviceRoutes, ...locationRoutes, ...routeRoutes, ...blogRoutes];
}
