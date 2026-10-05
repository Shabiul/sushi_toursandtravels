import fs from 'fs';
import path from 'path';
import { vehiclePages } from '../src/lib/vehiclePages';
import { vehicles } from '../src/lib/vehicles';
import { servicePages } from '../src/lib/services';
import { locationPages } from '../src/lib/locations';
import { routePages } from '../src/lib/routes';
import { blogPosts } from '../src/lib/blog';
import { packages } from '../src/lib/packages';

const BASE_URL = 'https://www.sushitravels.com';
const NOW = new Date().toISOString().split('T')[0];
const PUBLIC_DIR = path.join(__dirname, '../public');

const esc = (s: string) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

interface PageMeta {
  url: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: number;
  images?: { loc: string; title: string; caption?: string }[];
}

const pages: PageMeta[] = [
  {
    url: `${BASE_URL}/`,
    lastmod: NOW,
    changefreq: 'weekly',
    priority: 1.0,
    images: [
      {
        loc: `${BASE_URL}/mysuru.webp`,
        title: 'Mysuru Palace — South India Tour Destination by Sushi Travels',
        caption: 'Mysuru Palace round-trip tour destination from Bangalore with verified chauffeur.',
      },
      {
        loc: `${BASE_URL}/fleet/force-urbania-front-01.webp`,
        title: 'Force Urbania Luxury Van Rental Bangalore',
        caption: 'Luxury Force Urbania van rental for outstation and airport travel in Bangalore.',
      },
      {
        loc: `${BASE_URL}/logo-light-v3.png`,
        title: 'Sushi Tours & Travels Official Logo',
        caption: 'Sushi Travels Bangalore logo.',
      },
    ],
  },
  {
    url: `${BASE_URL}/about`,
    lastmod: NOW,
    changefreq: 'monthly',
    priority: 0.8,
    images: [
      {
        loc: `${BASE_URL}/fleet/force-traveller-yaksha-front-01.webp`,
        title: 'Sushi Travels Fleet and Operations Center',
        caption: 'Sanitized vehicles and verified drivers at Sushi Travels Bangalore depot.',
      },
    ],
  },
  {
    url: `${BASE_URL}/fleet`,
    lastmod: NOW,
    changefreq: 'weekly',
    priority: 0.9,
    images: vehicles
      .filter((v) => v.image || (v.images && v.images.length > 0))
      .map((v) => ({
        loc: `${BASE_URL}${v.images?.[0] || v.image}`,
        title: `${v.name} Rental in Bangalore`,
        caption: `${v.name} (${v.seatsDisplay || v.seats + ' Seater'}) for outstation and local travel in Bangalore.`,
      })),
  },
  {
    url: `${BASE_URL}/booking`,
    lastmod: NOW,
    changefreq: 'weekly',
    priority: 0.8,
    images: [
      {
        loc: `${BASE_URL}/fleet/force-urbania-front-01.webp`,
        title: 'Book a Car with Driver in Bangalore',
        caption: 'Online booking for chauffeur-driven cars and tempo travellers in Bangalore.',
      },
    ],
  },
  {
    url: `${BASE_URL}/contact`,
    lastmod: NOW,
    changefreq: 'monthly',
    priority: 0.8,
    images: [
      {
        loc: `${BASE_URL}/fleet/force-traveller-yaksha-front-01.webp`,
        title: 'Sushi Travels Bangalore Main Office',
        caption: 'Sushi Travels office located in Nagadevana Halli, Bangalore.',
      },
    ],
  },
  {
    url: `${BASE_URL}/tours-and-packages`,
    lastmod: NOW,
    changefreq: 'weekly',
    priority: 0.8,
    images: packages.map((pkg) => ({
      loc: `${BASE_URL}${pkg.image}`,
      title: `${pkg.title} Tour Package from Bangalore`,
      caption: `${pkg.title} (${pkg.duration}) outstation tour package by Sushi Travels.`,
    })),
  },
  {
    url: `${BASE_URL}/vehicles`,
    lastmod: NOW,
    changefreq: 'weekly',
    priority: 0.8,
    images: vehicles.map((v) => ({
      loc: `${BASE_URL}${v.images?.[0] || v.image}`,
      title: `${v.name} Fleet Specifications and Pricing`,
      caption: `Book ${v.name} with verified driver from Sushi Travels Bangalore.`,
    })),
  },
  {
    url: `${BASE_URL}/services`,
    lastmod: NOW,
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/locations`,
    lastmod: NOW,
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/routes`,
    lastmod: NOW,
    changefreq: 'weekly',
    priority: 0.8,
    images: routePages.map((r) => ({
      loc: `${BASE_URL}${r.heroImage}`,
      title: `${r.h1}`,
      caption: `Chauffeur cab route from Bangalore to ${r.destination}.`,
    })),
  },
  {
    url: `${BASE_URL}/blog`,
    lastmod: NOW,
    changefreq: 'weekly',
    priority: 0.8,
    images: blogPosts.map((b) => ({
      loc: `${BASE_URL}${b.coverImage}`,
      title: b.title,
      caption: b.excerpt,
    })),
  },
  {
    url: `${BASE_URL}/privacy-policy`,
    lastmod: NOW,
    changefreq: 'monthly',
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/terms-and-conditions`,
    lastmod: NOW,
    changefreq: 'monthly',
    priority: 0.3,
  },
];

// Add Vehicle Pages
vehiclePages.forEach((vp) => {
  const matchingVehicles = vehicles.filter((v) => vp.vehicleIds.includes(v.id));
  const images = matchingVehicles.flatMap((v) => {
    const list = v.images && v.images.length > 0 ? v.images : [v.image];
    return list.map((img, i) => ({
      loc: `${BASE_URL}${img}`,
      title: `${v.name} Photo ${i + 1} - Bangalore Rental Fleet`,
      caption: vp.metaDescription,
    }));
  });
  pages.push({
    url: `${BASE_URL}/vehicles/${vp.slug}`,
    lastmod: NOW,
    changefreq: 'weekly',
    priority: 0.8,
    images,
  });
});

// Add Service Pages
servicePages.forEach((sp) => {
  pages.push({
    url: `${BASE_URL}/services/${sp.slug}`,
    lastmod: NOW,
    changefreq: 'weekly',
    priority: 0.8,
    images: [
      {
        loc: `${BASE_URL}/fleet/force-urbania-front-01.webp`,
        title: sp.h1,
        caption: sp.metaDescription,
      },
    ],
  });
});

// Add Location Pages
locationPages.forEach((lp) => {
  pages.push({
    url: `${BASE_URL}/locations/${lp.slug}`,
    lastmod: NOW,
    changefreq: 'monthly',
    priority: 0.7,
    images: [
      {
        loc: `${BASE_URL}/fleet/force-urbania-front-01.webp`,
        title: `Car Rental in ${lp.name}, Bangalore`,
        caption: lp.metaDescription,
      },
    ],
  });
});

// Add Route Pages
routePages.forEach((rp) => {
  pages.push({
    url: `${BASE_URL}/routes/${rp.slug}`,
    lastmod: NOW,
    changefreq: 'weekly',
    priority: 0.8,
    images: [
      {
        loc: `${BASE_URL}${rp.heroImage}`,
        title: rp.h1,
        caption: `${rp.from} to ${rp.to} (${rp.distance}) outstation cab service.`,
      },
    ],
  });
});

// Add Blog Posts
blogPosts.forEach((bp) => {
  const images = [{ loc: `${BASE_URL}${bp.coverImage}`, title: bp.title, caption: bp.excerpt }];
  if (bp.gallery) {
    bp.gallery.forEach((g) => {
      images.push({ loc: `${BASE_URL}${g.url}`, title: g.alt, caption: g.caption });
    });
  }
  pages.push({
    url: `${BASE_URL}/blog/${bp.slug}`,
    lastmod: bp.dateModified || bp.publishDate,
    changefreq: 'monthly',
    priority: 0.7,
    images,
  });
});

console.log(`Aggregated ${pages.length} public indexable routes.`);

// 1. Generate sitemap-pages.xml
const sitemapPagesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${esc(p.url)}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-pages.xml'), sitemapPagesXml, 'utf8');
console.log('✓ Generated public/sitemap-pages.xml');

// 2. Generate sitemap-images.xml
const imagePages = pages.filter((p) => p.images && p.images.length > 0);
const sitemapImagesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imagePages
  .map(
    (p) => `  <url>
    <loc>${esc(p.url)}</loc>
${p.images!
  .map(
    (img) => `    <image:image>
      <image:loc>${esc(img.loc)}</image:loc>
      <image:title>${esc(img.title)}</image:title>
      ${img.caption ? `<image:caption>${esc(img.caption)}</image:caption>` : ''}
      <image:geo_location>Bangalore, Karnataka, India</image:geo_location>
    </image:image>`
  )
  .join('\n')}
  </url>`
  )
  .join('\n')}
</urlset>`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-images.xml'), sitemapImagesXml, 'utf8');
console.log('✓ Generated public/sitemap-images.xml');

// 3. Generate sitemap-videos.xml
const videos = [
  {
    pageUrl: `${BASE_URL}/`,
    contentUrl: `${BASE_URL}/videos/hero-mountains.mp4`,
    thumbnailUrl: `${BASE_URL}/videos/hero-mountains-poster.webp`,
    title: 'Sushi Travels — Outstation Mountain Highway Travel & Group Rental Video',
    description:
      'Watch Sushi Travels Tempo Travellers and luxury fleet navigating scenic South India ghat roads and outstation highways with verified chauffeurs.',
    duration: 24,
    uploadDate: '2024-01-15',
  },
  {
    pageUrl: `${BASE_URL}/fleet`,
    contentUrl: `${BASE_URL}/videos/fleet-scene-12.mp4`,
    thumbnailUrl: `${BASE_URL}/videos/fleet-scene-12-poster.webp`,
    title: 'Sushi Travels — Tempo Traveller and Luxury Fleet Showcase Video',
    description:
      'Detailed video showcase of Sushi Travels Tempo Traveller interior seating, Force Urbania luxury vans, pushback recliners, and executive passenger buses.',
    duration: 30,
    uploadDate: '2024-01-15',
  },
  {
    pageUrl: `${BASE_URL}/about`,
    contentUrl: `${BASE_URL}/videos/about-scene-13.mp4`,
    thumbnailUrl: `${BASE_URL}/videos/about-scene-13-poster.webp`,
    title: 'About Sushi Travels — Chauffeur Fleet Operations & Company Story Video',
    description:
      'Behind the scenes at Sushi Travels garage operations, mechanical safety inspections, sanitized vehicle handovers, and chauffeur briefings in Bangalore.',
    duration: 18,
    uploadDate: '2024-01-15',
  },
  {
    pageUrl: `${BASE_URL}/contact`,
    contentUrl: `${BASE_URL}/videos/goa-beach-drone.mp4`,
    thumbnailUrl: `${BASE_URL}/videos/goa-beach-drone-poster.webp`,
    title: 'Sushi Travels — Outstation Destinations & Coastline Route Showcase Video',
    description:
      'Drone footage of scenic road trip destinations, coastal highways, and holiday locations served by Sushi Travels round-trip chauffeur service from Bangalore.',
    duration: 15,
    uploadDate: '2024-01-15',
  },
  {
    pageUrl: `${BASE_URL}/vehicles/17-seater-tempo-traveller-bangalore`,
    contentUrl: `${BASE_URL}/videos/force-tempo-traveller-17-seater.mp4`,
    thumbnailUrl: `${BASE_URL}/videos/force-tempo-traveller-17-seater-poster.webp`,
    title: '17-Seater Force Tempo Traveller Cabin Walkthrough Video Bangalore',
    description:
      'Exclusive interior video walkthrough of the 17-Seater Force Tempo Traveller showing luxury Maharaja pushback seats, ceiling LED lighting, individual AC vents, and entertainment screen.',
    duration: 37,
    uploadDate: '2026-10-05',
  },
];

const sitemapVideosXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videos
  .map(
    (v) => `  <url>
    <loc>${esc(v.pageUrl)}</loc>
    <video:video>
      <video:thumbnail_loc>${esc(v.thumbnailUrl)}</video:thumbnail_loc>
      <video:title>${esc(v.title)}</video:title>
      <video:description>${esc(v.description)}</video:description>
      <video:content_loc>${esc(v.contentUrl)}</video:content_loc>
      <video:duration>${v.duration}</video:duration>
      <video:publication_date>${v.uploadDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
    </video:video>
  </url>`
  )
  .join('\n')}
</urlset>`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-videos.xml'), sitemapVideosXml, 'utf8');
console.log('✓ Generated public/sitemap-videos.xml');

// 4. Generate master sitemap.xml index
const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-pages.xml</loc>
    <lastmod>${NOW}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-images.xml</loc>
    <lastmod>${NOW}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-videos.xml</loc>
    <lastmod>${NOW}</lastmod>
  </sitemap>
</sitemapindex>`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapIndexXml, 'utf8');
console.log('✓ Generated public/sitemap.xml (Sitemap Index)');

// 5. Generate public/robots.txt
const robotsTxt = `# ========================================================
# Sushi Tours & Travels (Sushi Travels) — Official robots.txt
# Domain: https://www.sushitravels.com
# ========================================================

User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

# Explicit Allow for Major Search Engines
User-agent: Googlebot
Allow: /
Disallow: /admin
Disallow: /api/

User-agent: Googlebot-Image
Allow: /
Allow: /fleet/
Allow: /videos/
Disallow: /admin
Disallow: /api/

User-agent: Googlebot-Video
Allow: /
Allow: /videos/
Disallow: /admin
Disallow: /api/

User-agent: Bingbot
Allow: /
Disallow: /admin
Disallow: /api/

# Generative Engine Optimization (GEO) & AI Search Engines
User-agent: GPTBot
Allow: /
Disallow: /admin
Disallow: /api/

User-agent: PerplexityBot
Allow: /
Disallow: /admin
Disallow: /api/

User-agent: ClaudeBot
Allow: /
Disallow: /admin
Disallow: /api/

User-agent: anthropic-ai
Allow: /
Disallow: /admin
Disallow: /api/

User-agent: Google-Extended
Allow: /
Disallow: /admin
Disallow: /api/

User-agent: Applebot
Allow: /
Disallow: /admin
Disallow: /api/

User-agent: Applebot-Extended
Allow: /
Disallow: /admin
Disallow: /api/

# Google Search Console Multi-Asset Sitemaps
Sitemap: ${BASE_URL}/sitemap.xml
Sitemap: ${BASE_URL}/sitemap-pages.xml
Sitemap: ${BASE_URL}/sitemap-images.xml
Sitemap: ${BASE_URL}/sitemap-videos.xml
`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf8');
console.log('✓ Generated public/robots.txt');
