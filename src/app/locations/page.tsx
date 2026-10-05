import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { locationPages } from '@/lib/locations';
import { getBreadcrumbListSchema, getWebPageSchema } from '@/lib/schema';
import LandingHero from '@/components/LandingHero';

export const metadata: Metadata = {
  title: 'Areas We Serve in Bangalore',
  description:
    'Sushi Travels provides chauffeur-driven car rental pickup and drop across Whitefield, Koramangala, Indiranagar, Electronic City and more Bangalore areas.',
  alternates: { canonical: '/locations' },
  openGraph: {
    title: 'Areas We Serve in Bangalore | Sushi Travels',
    description:
      'Sushi Travels provides chauffeur-driven car rental pickup and drop across Whitefield, Koramangala, Indiranagar, Electronic City and more Bangalore areas.',
    url: '/locations',
    images: [{ url: '/fleet/force-traveller-yaksha-front-01.webp', width: 800, height: 600, alt: 'Sushi Travels car rental areas served across Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Areas We Serve in Bangalore | Sushi Travels',
    description:
      'Sushi Travels provides chauffeur-driven car rental pickup and drop across Whitefield, Koramangala, Indiranagar, Electronic City and more Bangalore areas.',
    images: ['/fleet/force-traveller-yaksha-front-01.webp'],
  },
};

export default function LocationsHubPage() {
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Areas We Serve', item: '/locations' },
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
              name: 'Areas We Serve in Bangalore | Sushi Travels',
              description: 'Sushi Travels provides chauffeur-driven car rental pickup and drop across Whitefield, Koramangala, Indiranagar, Electronic City and more Bangalore areas.',
              url: 'https://www.sushitravels.com/locations',
              datePublished: '2024-01-15',
              dateModified: '2026-10-05',
            })
          ),
        }}
      />

      <LandingHero
        h1="Areas We Serve Across Bangalore"
        subtitle="Chauffeur-driven pickup and drop across Bangalore's major residential and business neighbourhoods."
        crumbs={[{ name: 'Areas We Serve', href: '/locations' }]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {locationPages.map((page) => (
            <Link
              key={page.slug}
              href={`/locations/${page.slug}`}
              title={`Car and Tempo Traveller rental in ${page.name}, Bangalore`}
              className="group bg-white rounded-2xl border border-navy-light/10 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="font-serif font-bold text-navy group-hover:text-primary transition-colors">
                    Car Rental in {page.name}
                  </h2>
                  <p className="text-xs text-navy-light mt-0.5">Local, airport & outstation pickup</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-navy-light group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
