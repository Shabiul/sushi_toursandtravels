import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { vehiclePages, getPagePrimaryImage } from '@/lib/vehiclePages';
import { getBreadcrumbListSchema, getWebPageSchema } from '@/lib/schema';
import LandingHero from '@/components/LandingHero';

export const metadata: Metadata = {
  title: 'Vehicle Rental Options in Bangalore',
  description:
    'Browse Sushi Travels vehicle rental pages by category — sedans, Innova SUVs, Tempo Travellers, Force Urbania vans and buses, each with real pricing and rental terms.',
  alternates: { canonical: '/vehicles' },
  openGraph: {
    title: 'Vehicle Rental Options in Bangalore | Sushi Travels',
    description:
      'Browse Sushi Travels vehicle rental pages by category — sedans, Innova SUVs, Tempo Travellers, Force Urbania vans and buses, each with real pricing and rental terms.',
    url: '/vehicles',
    images: [{ url: '/fleet/force-urbania-front-01.webp', width: 800, height: 600, alt: 'Sushi Travels vehicle rental fleet in Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vehicle Rental Options in Bangalore | Sushi Travels',
    description:
      'Browse Sushi Travels vehicle rental pages by category — sedans, Innova SUVs, Tempo Travellers, Force Urbania vans and buses, each with real pricing and rental terms.',
    images: ['/fleet/force-urbania-front-01.webp'],
  },
};

export default function VehiclesHubPage() {
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Vehicles', item: '/vehicles' },
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
              name: 'Vehicle Rental Options in Bangalore - Sushi Travels',
              description: 'Browse Sushi Travels vehicle rental categories with transparent pricing and seating specifications.',
              url: '/vehicles',
              datePublished: '2024-01-15T08:00:00+05:30',
              dateModified: '2026-10-05T08:00:00+05:30',
            })
          ),
        }}
      />

      <LandingHero
        h1="Vehicle Rental Options in Bangalore"
        subtitle="Compare each vehicle category by seating, pricing and best use-case before you book — from sedans to full-size buses."
        crumbs={[{ name: 'Vehicles', href: '/vehicles' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehiclePages.map((page) => (
            <Link
              key={page.slug}
              href={`/vehicles/${page.slug}`}
              title={`View ${page.h1} specifications, seating, and rental rates`}
              className="group bg-white rounded-2xl border border-navy-light/10 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-cream-warm/30">
                <Image
                  src={getPagePrimaryImage(page)}
                  alt={page.h1}
                  title={`${page.h1} — Sushi Travels Fleet Bangalore`}
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
