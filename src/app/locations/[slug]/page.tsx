import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin, Car } from 'lucide-react';
import { locationPages, getLocationPage } from '@/lib/locations';
import { vehiclePages } from '@/lib/vehiclePages';
import { getBreadcrumbListSchema, getFAQSchema, getServiceLandingSchema, getWebPageSchema } from '@/lib/schema';
import LandingHero from '@/components/LandingHero';
import FaqAccordion from '@/components/FaqAccordion';
import CTABand from '@/components/CTABand';
import RelatedLinks from '@/components/RelatedLinks';

const HERO_IMAGE = '/fleet/force-urbania-front-01.webp';

export function generateStaticParams() {
  return locationPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocationPage(slug);
  if (!page) return {};
  const url = `/locations/${page.slug}`;
  // The root layout's title template auto-appends "| Sushi Travels" to the
  // plain `title`, but NOT to openGraph/twitter titles (those don't inherit
  // the template) — so those need the suffix built explicitly here.
  const brandedTitle = `${page.title} | Sushi Travels`;
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: brandedTitle,
      description: page.metaDescription,
      url,
      images: [{ url: HERO_IMAGE, width: 800, height: 600, alt: page.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: brandedTitle,
      description: page.metaDescription,
      images: [HERO_IMAGE],
    },
  };
}

export default async function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLocationPage(slug);
  if (!page) notFound();

  const url = `/locations/${page.slug}`;
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Areas We Serve', item: '/locations' },
    { name: page.name, item: url },
  ];

  const relatedVehicles = page.relatedVehicleSlugs
    .map((s) => vehiclePages.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => !!p);
  const nearbyLocations = page.nearbyLocationSlugs
    .map((s) => locationPages.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const whatsappMessage = `Hello Sushi Tours & Travels, I would like to book a car with driver for pickup in ${page.name}, Bangalore. Please share availability and a quotation.`;

  return (
    <div className="bg-cream min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbListSchema(breadcrumbItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getServiceLandingSchema({
              name: `Car Rental in ${page.name}, Bangalore`,
              description: page.metaDescription,
              url,
              areaServed: [page.name, 'Bengaluru'],
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageSchema({
              name: `${page.title} | Sushi Travels`,
              description: page.metaDescription,
              url,
              datePublished: '2024-01-15',
              dateModified: '2026-10-05',
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(page.faqs)) }}
      />

      <LandingHero
        h1={page.h1}
        subtitle={page.heroSubtitle}
        crumbs={[
          { name: 'Areas We Serve', href: '/locations' },
          { name: page.name, href: url },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-navy-light px-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-navy-light/10 text-navy font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Season 2026 Verified Pickup Availability</span>
            <span>•</span>
            <span>Updated <time dateTime="2026-10-05">October 2026</time></span>
          </div>
          <span className="text-[11px] text-navy-light">Bangalore RTO &amp; Police Verified Chauffeurs</span>
        </div>

        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8">
          <p className="text-sm sm:text-base text-navy leading-relaxed">{page.geoSummary}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            About {page.name}
          </h2>
          <p className="text-sm sm:text-base text-navy-light leading-relaxed">{page.areaDescription}</p>
          {page.bodyParagraphs.map((para, idx) => (
            <p key={idx} className="text-sm sm:text-base text-navy-light leading-relaxed">
              {para}
            </p>
          ))}
        </section>

        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4">
          <h2 className="font-serif font-bold text-xl text-navy flex items-center gap-2">
            <Car className="w-5 h-5 text-primary" />
            Commonly Booked Vehicles from {page.name}
          </h2>
          <ul className="space-y-2">
            {page.commonVehicles.map((item, idx) => (
              <li key={idx} className="text-sm text-navy flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <FaqAccordion faqs={page.faqs} />

        <CTABand
          heading={`Book a Car in ${page.name}`}
          subheading="Call, WhatsApp, or submit a quick enquiry — our dispatch team will confirm availability and pricing for your pickup point."
          whatsappMessage={whatsappMessage}
        />

        <RelatedLinks
          groups={[
            {
              heading: 'Recommended Vehicles',
              links: relatedVehicles.map((p) => ({ label: p.h1, href: `/vehicles/${p.slug}` })),
            },
            {
              heading: 'Nearby Areas',
              links: nearbyLocations.map((p) => ({ label: `Car Rental in ${p.name}`, href: `/locations/${p.slug}` })),
            },
            {
              heading: 'Services',
              links: [
                { label: 'Bangalore Airport Taxi', href: '/services/bangalore-airport-taxi' },
                { label: 'Outstation Cab Service from Bangalore', href: '/services/outstation-cab-bangalore' },
              ],
            },
            {
              heading: 'Plan Your Trip',
              links: [
                { label: 'Book online', href: '/booking' },
                { label: 'Contact Sushi Travels', href: '/contact' },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}
