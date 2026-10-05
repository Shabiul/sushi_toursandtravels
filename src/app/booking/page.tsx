import React, { Suspense } from 'react';
import { ShieldCheck, Clock, ShieldAlert } from 'lucide-react';
import { getServiceSchema, getBreadcrumbListSchema, getWebPageSchema } from '@/lib/schema';
import BookingForm from '@/components/BookingForm';

export const metadata = {
  title: 'Book a Car with Driver | Chauffeur Rental India',
  description: 'Book local drops, full-day packages, or outstation chauffeur services. Multi-step transparent booking with verified professional drivers.',
  alternates: {
    canonical: '/booking',
  },
  openGraph: {
    title: 'Book a Car with Driver | Chauffeur Rental India',
    description: 'Book local drops, full-day packages, or outstation chauffeur services. Multi-step transparent booking with verified professional drivers.',
    url: '/booking',
    images: [{ url: '/fleet/force-urbania-front-01.webp', width: 800, height: 600, alt: 'Book a Sushi Travels vehicle with driver online' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Car with Driver | Chauffeur Rental India',
    description: 'Book local drops, full-day packages, or outstation chauffeur services. Multi-step transparent booking with verified professional drivers.',
    images: ['/fleet/force-urbania-front-01.webp'],
  },
};

export default function BookingPage() {
  // Breadcrumbs config
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Booking', item: '/booking' },
  ];

  return (
    <div className="bg-cream min-h-screen pb-16">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbListSchema(breadcrumbItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageSchema({
              name: 'Book a Car with Driver in Bangalore | Sushi Travels',
              description: 'Book local drops, full-day packages, or outstation chauffeur services. Multi-step transparent booking with verified professional drivers.',
              url: 'https://www.sushitravels.com/booking',
              datePublished: '2024-01-15',
              dateModified: '2026-10-05',
            })
          ),
        }}
      />

      {/* Booking Hero Banner — pulled up under the fixed transparent header, same pattern as the Fleet page */}
      <div
        className="relative -mt-[72px] md:-mt-[80px] min-h-screen flex items-center justify-center bg-cover bg-center px-4 text-center text-white"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200')` }}
      >
        <div className="absolute inset-0 bg-navy-dark/80 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-cream-warm text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Season 2026 Verified Booking Rates</span>
            <span className="text-white/40">•</span>
            <span>Updated <time dateTime="2026-10-05">October 2026</time></span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white">
            Book a Vehicle with Driver in Bangalore
          </h1>
          <p className="text-sm text-cream-warm/95 max-w-xl mx-auto">
            Book verified drivers and air-conditioned vehicles in under 3 minutes. Secure booking, pay on trip completion.
          </p>
        </div>
      </div>

      {/* Main Form Area wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* BookingForm requires Suspense as it uses useSearchParams() */}
        <Suspense fallback={
          <div className="py-20 text-center font-bold text-navy animate-pulse">
            Loading booking options...
          </div>
        }>
          <BookingForm />
        </Suspense>

        {/* Small Trust Grid below Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-navy">
          <div className="bg-white p-6 rounded-2xl border border-navy-light/10 flex items-start space-x-4 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-sm text-navy">Verified Chauffeurs Only</h3>
              <p className="text-xs text-navy-light leading-relaxed mt-1">
                Every driver in our roster passes police records vetting and road safety tests on ghat curves.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-navy-light/10 flex items-start space-x-4 shadow-sm">
            <Clock className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-sm text-navy">No Cancellation Fee</h3>
              <p className="text-xs text-navy-light leading-relaxed mt-1">
                Change in plans? Cancel up to 12 hours before schedule without incurring any platform charges.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-navy-light/10 flex items-start space-x-4 shadow-sm">
            <ShieldAlert className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-sm text-navy">GPS Tracking & Security</h3>
              <p className="text-xs text-navy-light leading-relaxed mt-1">
                All vehicles carry emergency SOS buttons and live tracking links shareable with family members.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
