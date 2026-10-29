/**
 * Generates public/llms.txt and public/llms-full.txt from the same data files
 * that render the site, so AI engines never read a price, policy or URL that
 * the website itself doesn't state. Only facts backed by a data file or the
 * published Terms page are included — no superlatives, no unverified promises.
 *
 * Run: npx tsx scripts/generate-llms.ts   (also invoked by generate-gsc-suite)
 */
import fs from 'fs';
import path from 'path';
import { vehicles } from '../src/lib/vehicles';
import { vehiclePages } from '../src/lib/vehiclePages';
import { servicePages } from '../src/lib/services';
import { locationPages } from '../src/lib/locations';
import { routePages } from '../src/lib/routes';
import { blogPosts } from '../src/lib/blog';
import { PHONE_NUMBER } from '../src/lib/contact';

const BASE = 'https://www.sushitravels.com';
const PUBLIC_DIR = path.join(__dirname, '../public');
const TODAY = new Date().toISOString().split('T')[0];
const WA = 'https://wa.me/919071660099';

const rateOf = (v: (typeof vehicles)[number]) => {
  if (v.priceDisplay) return v.priceDisplay;
  const ac = v.ratePerKmAc ?? v.ratePerKm;
  return v.ratePerKmNonAc ? `₹${ac}/km AC, ₹${v.ratePerKmNonAc}/km Non-AC` : `₹${ac}/km`;
};
const termsOf = (v: (typeof vehicles)[number]) =>
  v.priceDisplay
    ? 'quoted per trip'
    : `${v.minKmPerDay ?? 300} km/day minimum, driver bata ₹${v.driverBata ?? '—'}/day`;

const pageFor = (vehicleId: string) => vehiclePages.find((p) => p.vehicleIds.includes(vehicleId));

const header = `# Sushi Tours & Travels (Sushi Travels)

> Chauffeur-driven car, SUV, Tempo Traveller, Force Urbania and bus rental in Bengaluru (Bangalore), Karnataka, India — for outstation round trips, airport transfers (Kempegowda International Airport, BLR), local city use, corporate transport and weddings.

Last generated: ${TODAY}. Source of truth for every price and policy below is the website; if anything here disagrees with a page, the page wins.
`;

const business = `## Business details
- Name: Sushi Tours & Travels (brand: Sushi Travels)
- Address: No 272, Corner Shop, G/F, 8th Cross, Opposite BBMP Office, Bhuvaneshwari Nagara, Dodda Basti Main Road, Nagadevana Halli, Bengaluru, Karnataka 560056, India
- Phone / WhatsApp: ${PHONE_NUMBER} (${WA})
- Email: sushitravels11@gmail.com
- Website: ${BASE}
- Hours: open 24 hours, 7 days a week
- Founded: 2011 (operating in Bengaluru for 15+ years)
- Service area: Bengaluru and outstation routes across South India
`;

const fleetRows = vehicles
  .map((v) => {
    const page = pageFor(v.id);
    const link = page ? `${BASE}/vehicles/${page.slug}` : `${BASE}/fleet`;
    return `- ${v.name} (${v.seatsDisplay ?? `${v.seats} seats`}${v.ac ? ', AC' : ''}): ${rateOf(v)}; ${termsOf(v)}. ${link}`;
  })
  .join('\n');

const pricingTerms = `## Pricing & booking terms (from ${BASE}/terms-and-conditions)
- Outstation billing: minimum 250 km or 300 km per calendar day depending on vehicle category; standard duty 6:00 AM–10:00 PM for vehicles with a published rate.
- Driver bata (daily allowance) varies by vehicle and by route; the per-day figure for each vehicle is listed above and your quote confirms the exact amount. Night driving between 10:00 PM and 6:00 AM adds a night allowance.
- Tolls (FASTag), parking, interstate permits and entry fees are paid at actuals.
- GST: 5% on commercial passenger transport invoices.
- Cancellation: more than 24 hours before departure — 100% advance refunded; 12–24 hours — 50%; under 12 hours or no-show — advance retained.
- Fuel, vehicle insurance and routine maintenance are covered by Sushi Travels; no surge pricing is applied for peak hours, festivals or high-demand dates.
- Airport pickups include a complimentary 45-minute wait for flight delays, with flight tracking on request.
- Punctuality is guaranteed: your chauffeur arrives at the confirmed pickup time.
- Chauffeurs are police-verified and have a minimum of 5 years of commercial highway and mountain-ghat driving experience.
- Force Urbania per-km rates are outstation rates; for local (within-city) rentals, call or WhatsApp for an enquiry.
- Vehicles marked "Price on Request" have no fixed per-km rate; call or WhatsApp with your route, dates and group size for a quote.
`;

const estimates = vehiclePages
  .filter((p) => p.tripEstimates?.length)
  .map(
    (p) =>
      `### ${p.h1}\n` +
      (p.tripEstimates ?? []).map((e) => `- ${e.trip}: ${e.range} (${e.basis})`).join('\n') +
      `\n${p.tripEstimateNote ?? ''}\n`,
  )
  .join('\n');

const links = (title: string, items: { label: string; url: string; note?: string }[]) =>
  `## ${title}\n` + items.map((i) => `- [${i.label}](${i.url})${i.note ? `: ${i.note}` : ''}`).join('\n') + '\n';

const sections = [
  links('Core pages', [
    { label: 'Fleet', url: `${BASE}/fleet`, note: 'Tempo Travellers (9, 12, 17 seater) and the full vehicle list' },
    { label: 'Vehicle categories', url: `${BASE}/vehicles` },
    { label: 'Services', url: `${BASE}/services` },
    { label: 'Outstation routes', url: `${BASE}/routes` },
    { label: 'Areas served in Bangalore', url: `${BASE}/locations` },
    { label: 'Tours & packages', url: `${BASE}/tours-and-packages` },
    { label: 'Book online', url: `${BASE}/booking` },
    { label: 'Contact', url: `${BASE}/contact` },
    { label: 'About', url: `${BASE}/about` },
    { label: 'Travel guides', url: `${BASE}/blog` },
  ]),
  links(
    'Vehicles',
    vehiclePages.map((p) => ({ label: p.h1, url: `${BASE}/vehicles/${p.slug}` })),
  ),
  links(
    'Services',
    servicePages.map((p) => ({ label: p.h1, url: `${BASE}/services/${p.slug}` })),
  ),
  links(
    'Outstation routes from Bangalore',
    routePages.map((p) => ({
      label: p.h1,
      url: `${BASE}/routes/${p.slug}`,
      note: `${p.distance}, ${p.duration}`,
    })),
  ),
  links(
    'Bangalore areas served',
    locationPages.map((p) => ({ label: p.h1, url: `${BASE}/locations/${p.slug}` })),
  ),
  links(
    'Travel guides',
    blogPosts.map((p) => ({ label: p.title, url: `${BASE}/blog/${p.slug}` })),
  ),
  links('Policies', [
    { label: 'Terms & conditions', url: `${BASE}/terms-and-conditions` },
    { label: 'Privacy policy', url: `${BASE}/privacy-policy` },
    { label: 'Sitemap', url: `${BASE}/sitemap.xml` },
  ]),
];

fs.writeFileSync(
  path.join(PUBLIC_DIR, 'llms.txt'),
  [
    header,
    business,
    `## Fleet and published rates\n${fleetRows}\n`,
    pricingTerms,
    estimates ? `## Indicative trip estimates\n${estimates}` : '',
    ...sections,
  ].join('\n'),
  'utf8',
);

// ---- llms-full.txt: adds the questions customers ask, answered from page FAQs ----
const faqBlock = (title: string, pages: { h1: string; slug: string; faqs: { question: string; answer: string }[] }[], dir: string) =>
  `## ${title}\n` +
  pages
    .map(
      (p) =>
        `### ${p.h1}\nSource: ${BASE}/${dir}/${p.slug}\n` +
        p.faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n'),
    )
    .join('\n\n') +
  '\n';

fs.writeFileSync(
  path.join(PUBLIC_DIR, 'llms-full.txt'),
  [
    header,
    business,
    `## Fleet and published rates\n${fleetRows}\n`,
    pricingTerms,
    estimates ? `## Indicative trip estimates\n${estimates}` : '',
    faqBlock('Questions and answers: vehicles', vehiclePages, 'vehicles'),
    faqBlock('Questions and answers: services', servicePages, 'services'),
    faqBlock('Questions and answers: routes', routePages, 'routes'),
    faqBlock('Questions and answers: Bangalore areas', locationPages, 'locations'),
    ...sections,
  ].join('\n'),
  'utf8',
);

console.log('✓ Generated public/llms.txt and public/llms-full.txt');
