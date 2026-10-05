'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import { getFleetItemListSchema, getBreadcrumbListSchema, getWebPageSchema, getVideoObjectSchema } from '@/lib/schema';
import { sortVehiclesForDisplay, Vehicle } from '@/lib/vehicles';
import VehicleCard from '@/components/VehicleCard';

/**
 * Picks up to 6 alternative vehicles for the "You May Also Like" section,
 * and assigns each of up to 3 of them one merchandising badge. Deterministic
 * from real vehicle data (price, sort order, type) — never random, so the
 * same selection always produces the same suggestions.
 */
function getSuggestions(selected: Vehicle, all: Vehicle[]) {
  const others = sortVehiclesForDisplay(all.filter((v) => v.id !== selected.id));
  const sameType = others.filter((v) => v.type === selected.type);
  const differentType = others.filter((v) => v.type !== selected.type);
  const shortlist = [...sameType, ...differentType].slice(0, 6);

  const badges = new Map<string, string>();

  const priced = shortlist.filter((v) => !v.priceDisplay && v.ratePerKm > 0);
  if (priced.length > 0) {
    const cheapest = priced.reduce((a, b) => (a.ratePerKm < b.ratePerKm ? a : b));
    badges.set(cheapest.id, 'Best Price');
  }

  const popular = shortlist.find((v) => v.sortOrder === 1 && !badges.has(v.id))
    ?? shortlist.find((v) => !badges.has(v.id));
  if (popular) badges.set(popular.id, 'Popular Choice');

  const recommended = shortlist.find((v) => v.type === selected.type && !badges.has(v.id))
    ?? shortlist.find((v) => !badges.has(v.id));
  if (recommended) badges.set(recommended.id, 'Recommended');

  return { shortlist, badges };
}

interface FleetClientProps {
  initialVehicles: Vehicle[];
  hasDataError: boolean;
}

export default function FleetClient({ initialVehicles, hasDataError }: FleetClientProps) {
  // Vehicles are now fetched server-side (see src/app/fleet/page.tsx) and
  // passed in as props, already sorted, so this component no longer owns any
  // fetch/loading state — the data is present in the first render.
  const vehiclesList = initialVehicles;
  const fetchError = hasDataError;
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Filter chips are per-vehicle (exact selection), not per broad type —
  // clicking "9 Seater Tempo Traveller" must show only that vehicle, not
  // every Tempo Traveller variant. Keyed by vehicle id (name isn't
  // guaranteed unique); "All" resets to the full grid.
  const filterOptions = [{ id: 'All', name: 'All' }, ...vehiclesList.map((v) => ({ id: v.id, name: v.name }))];

  const selectedVehicle = activeFilter === 'All' ? null : vehiclesList.find((v) => v.id === activeFilter) ?? null;
  const filteredVehicles = activeFilter === 'All' ? vehiclesList : selectedVehicle ? [selectedVehicle] : [];
  const { shortlist: suggestedVehicles, badges: suggestionBadges } = selectedVehicle
    ? getSuggestions(selectedVehicle, vehiclesList)
    : { shortlist: [], badges: new Map<string, string>() };

  // Breadcrumbs config
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Our Fleet', item: '/fleet' },
  ];

  return (
    <div className="bg-cream min-h-screen">
      {/* SEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFleetItemListSchema(vehiclesList)) }}
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
              name: 'Tempo Traveller Rental Fleet in Bangalore — Sushi Travels',
              description: '9-seater, 12-seater & 17-seater Tempo Traveller rentals in Bangalore, Force Urbania, sedans, SUVs, and mini coaches with verified professional drivers.',
              url: 'https://www.sushitravels.com/fleet',
              datePublished: '2024-01-15',
              dateModified: '2026-10-05',
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getVideoObjectSchema({
              name: 'Sushi Travels — Tempo Traveller and Luxury Fleet Showcase Video',
              description: 'Detailed video showcase of Sushi Travels Tempo Traveller interior seating, Force Urbania luxury vans, pushback recliners, and executive passenger buses.',
              thumbnailUrl: '/videos/fleet-scene-12-poster.webp',
              uploadDate: '2024-01-15T08:00:00+05:30',
              duration: 'PT30S',
              contentUrl: '/videos/fleet-scene-12.mp4',
            })
          ),
        }}
      />

      {/* Fleet Hero Banner — pulled up under the fixed header (-mt cancels out main's pt-[72px]/[80px] offset) so the transparent header shows this video, not empty page background. Extra top padding keeps the breadcrumb/heading clear of the header bar. */}
      <div className="relative -mt-[72px] md:-mt-[80px] min-h-screen flex items-center justify-center px-4 text-center text-white overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          src="/videos/fleet-scene-12.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/fleet-scene-12-poster.webp"
          title="Sushi Travels Tempo Traveller and Luxury Fleet Showcase Video"
        />
        {/* Flat wash — matched to the home hero's 55% strength for reliable text contrast against bright video frames, while the fleet video itself stays visible */}
        <div className="absolute inset-0 bg-navy-dark/55 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-cream-warm text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Season 2026 Verified Fleet Rates</span>
            <span className="text-white/40">•</span>
            <span>Updated <time dateTime="2026-10-05">October 2026</time></span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold">
            Tempo Traveller Rental Fleet in Bangalore
          </h1>
          <p className="text-sm md:text-base text-cream-warm max-w-2xl mx-auto">
            9-seater, 12-seater &amp; 17-seater Tempo Traveller rentals in Bangalore, plus sedans, SUVs, and mini coaches — all with verified professional drivers for local, outstation, and group travel.
          </p>
        </div>
      </div>

      {/* SEO intro copy targeting general tempo traveller rental Bangalore terms */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy">
            9, 12 & 17 Seater Tempo Traveller Rental in Bangalore
          </h2>
          <p className="text-sm text-navy-light leading-relaxed">
            Sushi Tours &amp; Travels (Sushi Travels) offers 9 seater, 12 seater and 17 seater Tempo Traveller hire in Bangalore for outstation trips, corporate travel, weddings, and pilgrimages. Every Tempo Traveller booking includes a verified driver, and our sedans, SUVs, and mini coach round out the fleet for smaller or larger groups. See our{' '}
            <Link href="/vehicles" title="View Dedicated Vehicle Pricing and Details" className="text-primary font-semibold hover:text-primary-dark">
              dedicated vehicle pricing &amp; details pages
            </Link>{' '}
            for a full breakdown by category, or browse{' '}
            <Link href="/services" title="Explore Chauffeur Rental Services in Bangalore" className="text-primary font-semibold hover:text-primary-dark">
              our rental services
            </Link>{' '}
            for airport, outstation, local and corporate travel.
          </p>
        </div>
      </div>

      {/* Interactive Category Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col space-y-6">

          {/* Filters List — one chip per exact vehicle, not per broad type */}
          <div className="flex items-center justify-center overflow-x-auto py-2.5 space-x-3 scrollbar-thin">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                aria-pressed={activeFilter === option.id}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border shrink-0 ${
                  activeFilter === option.id
                    ? 'bg-primary border-primary text-white shadow-md'
                    : 'bg-white border-navy-light/10 text-navy hover:bg-cream-warm hover:border-navy-light/20'
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>

          {/* Results */}
          {filteredVehicles.length > 0 ? (
            <div key={activeFilter} className="animate-fade-in">
              {selectedVehicle ? (
                // Exact-selection view: one featured vehicle, centered and prominent.
                <div className="max-w-md mx-auto pt-6">
                  <VehicleCard vehicle={selectedVehicle} priority />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-6 justify-items-center">
                  {filteredVehicles.map((vehicle) => (
                    <div key={vehicle.id} className="h-full w-full max-w-md mx-auto sm:max-w-none">
                      <VehicleCard vehicle={vehicle} />
                    </div>
                  ))}
                </div>
              )}

              {/* You May Also Like — only in exact-selection view */}
              {selectedVehicle && suggestedVehicles.length > 0 && (
                <div className="pt-14">
                  <div className="text-center mb-8">
                    <h2 className="font-serif font-bold text-2xl text-navy">You May Also Like</h2>
                    <p className="text-xs text-navy-light mt-1">Other vehicles worth a look for your trip</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {suggestedVehicles.map((vehicle) => (
                      <div key={vehicle.id} className="relative h-full w-full max-w-md mx-auto sm:max-w-none">
                        {suggestionBadges.has(vehicle.id) && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-navy text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md whitespace-nowrap">
                            {suggestionBadges.get(vehicle.id)}
                          </span>
                        )}
                        <VehicleCard vehicle={vehicle} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : fetchError ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-navy-light/10 flex flex-col items-center justify-center space-y-3">
              <HelpCircle className="w-12 h-12 text-primary" />
              <h2 className="font-serif font-bold text-xl text-navy">Couldn&apos;t Load the Fleet</h2>
              <p className="text-xs text-navy max-w-sm">
                Something went wrong loading our vehicles. Please refresh the page, or call/WhatsApp us directly and we&apos;ll help you right away.
              </p>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-navy-light/10 flex flex-col items-center justify-center space-y-3">
              <HelpCircle className="w-12 h-12 text-primary animate-bounce" />
              <h2 className="font-serif font-bold text-xl text-navy">No Vehicles Available</h2>
              <p className="text-xs text-navy">We currently do not have vehicles listed in this category. Check back soon!</p>
            </div>
          )}

          {/* Core Rental Terms Disclaimer — combines the fare-variance note and the specific billing rules in one place instead of two stacked boxes */}
          <div className="mt-12 bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4 text-navy">
            <div className="border-b border-navy-light/10 pb-3 space-y-1">
              <h2 className="font-serif font-bold text-lg">
                Core Car Rental Information
              </h2>
              <p className="text-xs text-navy-light">Final fare may vary depending on vehicle type, route, trip duration, tolls, parking, permits and other applicable charges.</p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-navy">
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold text-sm">✓</span>
                <span><strong>Mileage calculation:</strong> Trip mileage is counted depot-to-depot (from our garage coordinates back to garage).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold text-sm">✓</span>
                <span><strong>Chauffeur food & lodging:</strong> Included in the outstation package rate per kilometer. No extra charge.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold text-sm">✓</span>
                <span><strong>Interstate permit taxes:</strong> Charged extra based on border state check-posts receipts (e.g. crossing Karnataka to Tamil Nadu/Kerala).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold text-sm">✓</span>
                <span><strong>Airport Tolls:</strong> Included or charged on actual fastag logs. GST (5%) is added to the finalized invoice.</span>
              </li>
            </ul>
            <div className="pt-3 border-t border-navy-light/10 text-xs text-navy-light flex items-center justify-between flex-wrap gap-2">
              <span>
                All commercial tourist operations adhere to the{' '}
                <a
                  href="https://morth.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Ministry of Road Transport and Highways (MoRTH) Motor Vehicles Guidelines"
                  className="text-primary font-semibold underline decoration-primary/40 hover:decoration-primary"
                >
                  Motor Vehicles Act (MoRTH)
                </a>{' '}
                and Karnataka State Transport Department standards.
              </span>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-semibold">
                ✓ AIS-140 GPS &amp; Tourist Permit Certified
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
