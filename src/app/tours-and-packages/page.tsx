import React from 'react';
import { getBreadcrumbListSchema, getWebPageSchema } from '@/lib/schema';
import { packages } from '@/lib/packages';
import PackageCard from '@/components/PackageCard';

export const metadata = {
  title: 'Tours & Packages | Sushi Travels Bangalore',
  description:
    'Explore Sushi Travels tour packages from Bangalore — Mysore, Coorg, Ooty, Goa, Tirupati and Pondicherry round trips with Tempo Travellers, sedans and SUVs.',
  alternates: {
    canonical: '/tours-and-packages',
  },
  openGraph: {
    title: 'Tours & Packages | Sushi Travels Bangalore',
    description:
      'Explore Sushi Travels tour packages from Bangalore — Mysore, Coorg, Ooty, Goa, Tirupati and Pondicherry round trips with Tempo Travellers, sedans and SUVs.',
    url: '/tours-and-packages',
    images: [{ url: '/Isha-Temple.webp', width: 800, height: 600, alt: 'Sushi Travels tour packages from Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tours & Packages | Sushi Travels Bangalore',
    description:
      'Explore Sushi Travels tour packages from Bangalore — Mysore, Coorg, Ooty, Goa, Tirupati and Pondicherry round trips with Tempo Travellers, sedans and SUVs.',
    images: ['/Isha-Temple.webp'],
  },
};

export default function ToursAndPackagesPage() {
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Tours & Packages', item: '/tours-and-packages' },
  ];

  return (
    <div className="bg-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbListSchema(breadcrumbItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageSchema({
              name: 'Tours & Packages | Sushi Travels Bangalore',
              description: 'Explore Sushi Travels tour packages from Bangalore — Mysore, Coorg, Ooty, Goa, Tirupati and Pondicherry round trips with Tempo Travellers, sedans and SUVs.',
              url: 'https://www.sushitravels.com/tours-and-packages',
              datePublished: '2024-01-15',
              dateModified: '2026-10-05',
            })
          ),
        }}
      />

      {/* Tours & Packages Hero Banner — pulled up under the fixed transparent header, same pattern as the Fleet page */}
      <div
        className="relative -mt-[72px] md:-mt-[80px] min-h-screen flex items-center justify-center bg-cover bg-center px-4 text-center text-white"
        style={{ backgroundImage: `url('/Isha-Temple.webp')` }}
      >
        <div className="absolute inset-0 bg-navy-dark/75 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-cream-warm text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Season 2026 Verified Tour Packages</span>
            <span className="text-white/40">•</span>
            <span>Updated <time dateTime="2026-10-05">October 2026</time></span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">
            Bangalore Holiday Tour Packages
          </h1>
          <p className="text-sm md:text-base text-cream-warm max-w-2xl mx-auto">
            Ready-made round trips from Bangalore to Mysore, Coorg, Ooty, Goa, Tirupati and Pondicherry — matched to the right vehicle for your group size.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>

        <div className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-5 sm:p-6 text-navy text-xs sm:text-sm leading-relaxed text-center">
          <strong>Don&apos;t see your destination?</strong> We run custom outstation trips across South and North India —{' '}
          <a
            href="tel:+919071660099"
            title="Call Sushi Travels for Custom Tour Quote"
            className="text-primary font-bold underline decoration-primary/40 hover:decoration-primary"
          >
            call +91 90716 60099
          </a>{' '}
          or{' '}
          <a
            href="https://wa.me/919071660099?text=Hello%20Sushi%20Travels%2C%20I%20would%20like%20a%20custom%20tour%20package%20quote"
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp Sushi Travels for Custom Tour Quote"
            className="text-emerald-700 font-bold underline decoration-emerald-700/40 hover:decoration-emerald-700"
          >
            WhatsApp us
          </a>{' '}
          with your route and we&apos;ll put together a customized itinerary and quote.
        </div>
      </div>
    </div>
  );
}
