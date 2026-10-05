import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { servicePages } from '@/lib/services';
import { getBreadcrumbListSchema, getWebPageSchema } from '@/lib/schema';
import LandingHero from '@/components/LandingHero';

export const metadata: Metadata = {
  title: 'Car & Van Rental Services in Bangalore',
  description:
    'Explore Sushi Travels services in Bangalore: airport taxi, outstation cabs, local taxi, corporate transport, wedding vehicle rental, and sightseeing cabs.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Car & Van Rental Services in Bangalore | Sushi Travels',
    description:
      'Explore Sushi Travels services in Bangalore: airport taxi, outstation cabs, local taxi, corporate transport, wedding vehicle rental, and sightseeing cabs.',
    url: '/services',
    images: [{ url: '/fortuner-front-view.webp', width: 800, height: 600, alt: 'Sushi Travels car and van rental services in Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car & Van Rental Services in Bangalore | Sushi Travels',
    description:
      'Explore Sushi Travels services in Bangalore: airport taxi, outstation cabs, local taxi, corporate transport, wedding vehicle rental, and sightseeing cabs.',
    images: ['/fortuner-front-view.webp'],
  },
};

export default function ServicesHubPage() {
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Services', item: '/services' },
  ];

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
            getWebPageSchema({
              name: 'Car & Van Rental Services in Bangalore - Sushi Travels',
              description: 'Chauffeur-driven rental services: airport taxi, outstation cabs, local rentals, corporate and wedding transportation.',
              url: '/services',
              datePublished: '2024-01-15T08:00:00+05:30',
              dateModified: '2026-10-05T08:00:00+05:30',
            })
          ),
        }}
      />

      <LandingHero
        h1="Car & Van Rental Services in Bangalore"
        subtitle="Chauffeur-driven rental for every use-case — airport transfers, outstation trips, local travel, corporate transport, weddings and sightseeing."
        crumbs={[{ name: 'Services', href: '/services' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicePages.map((page) => (
            <Link
              key={page.slug}
              href={`/services/${page.slug}`}
              title={`View ${page.h1} features, pricing, and options`}
              className="group bg-white rounded-2xl border border-navy-light/10 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-cream-warm/30">
                <Image
                  src={page.heroImage}
                  alt={page.h1}
                  title={`${page.h1} — Sushi Travels Bangalore`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="font-serif font-bold text-lg text-navy group-hover:text-primary transition-colors mb-2">
                  {page.h1}
                </h2>
                <p className="text-xs text-navy-light mb-4 line-clamp-2 flex-1">{page.heroSubtitle}</p>
                <span className="inline-flex items-center text-sm font-bold text-primary">
                  View details
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
