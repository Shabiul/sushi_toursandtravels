'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Shield, UserCheck, Headset, BadgePercent, ArrowRight, Star, MapPin, MessageSquare, AlertCircle, X } from 'lucide-react';
import { getLocalBusinessSchema, getFAQSchema, getWebPageSchema, getVideoObjectSchema } from '@/lib/schema';
import { motion } from 'framer-motion';
import VehicleCard from '@/components/VehicleCard';
import { sortVehiclesForDisplay, Vehicle } from '@/lib/vehicles';
import PackageCard from '@/components/PackageCard';
import { packages } from '@/lib/packages';
import RouteCard, { RouteInfo } from '@/components/RouteCard';
import TestimonialCard, { Testimonial } from '@/components/TestimonialCard';
import { getWhatsAppUrl } from '@/lib/contact';

const faqs = [
  {
    question: "What vehicle types are available in your fleet?",
    answer: "We specialize exclusively in spacious, premium group travel vehicles: Luxury Tempo Travellers (ranging from 9-seater to 17-seater configurations), Force Urbania luxury vans (10-seater to 17-seater), and large air-conditioned Tourist Buses or luxury coaches (22-seater up to 50-seater). All our vehicles are equipped with AC, pushback seats, and GPS monitoring."
  },
  {
    question: "What types of trips do you support?",
    answer: "We focus on dedicated round-trip outstation journeys, group holidays, family tours, pilgrimages, and inter-state travel. Whether it's a weekend road trip to Coorg, Ooty, Chikmagalur, or a longer tour across South India, we plan the route guidelines, calculate pricing transparently, and handle tourist permits."
  },
  {
    question: "Are your drivers trained for outstation trips?",
    answer: "Yes, absolutely. All our chauffeurs are highly experienced in long-distance travel, highway driving, and handling steep ghat roads. Furthermore, they are police-verified, background-checked, and familiar with tourist routes and checkposts throughout South India."
  },
  {
    question: "How are round-trip rental prices calculated?",
    answer: "Our prices are transparently calculated per kilometer based on the vehicle selected (Tempo Traveller, Force Urbania, or Bus). The quote includes driver allowances (bata) and a standard minimum daily running distance. Tolls, state entry permits, and parking charges are billed at actuals or as detailed in your booking confirmation."
  },
  {
    question: "What is your cancellation and booking modification policy?",
    answer: "We offer free cancellation up to 24 hours before your scheduled trip departure. If you need to postpone, change travel dates, or modify the passenger size (e.g., upgrading from a Tempo Traveller to an Urbania or Bus), please reach out to our 24/7 customer support desk via call or WhatsApp."
  }
];

export type HomeVehicle = Vehicle & { homeCategory?: string; categoryOrder?: number; showOnHome?: boolean };

interface HomeClientProps {
  initialVehicles: HomeVehicle[];
  initialRoutes: RouteInfo[];
  initialReviews: Testimonial[];
  hasDataError: boolean;
}

export default function HomeClient({ initialVehicles, initialRoutes, initialReviews, hasDataError }: HomeClientProps) {
  const router = useRouter();

  // Search Bar State
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchVehicle, setSearchVehicle] = useState('');

  // Fleet/routes/testimonials are now fetched server-side (see src/app/page.tsx)
  // and passed in as props, so this component no longer owns any loading state
  // — the data is already present in the first render, including for crawlers
  // that don't execute JavaScript.
  const vehiclesList = initialVehicles;
  const popularRoutesList = initialRoutes;
  const testimonialsList = initialReviews;
  const homeDataError = hasDataError;

  const [showCustomRouteModal, setShowCustomRouteModal] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the route exists case-insensitively in popularRoutesList
    const pickupNorm = searchFrom.trim().toLowerCase();
    const dropNorm = searchTo.trim().toLowerCase();

    const matchedRoute = popularRoutesList.find((r) => {
      const routeFrom = r.from.trim().toLowerCase();
      const routeTo = r.to.trim().toLowerCase();

      const matchFrom = pickupNorm === routeFrom || pickupNorm.includes(routeFrom) || routeFrom.includes(pickupNorm);
      const matchTo = dropNorm === routeTo || dropNorm.includes(routeTo) || routeTo.includes(dropNorm);

      return matchFrom && matchTo;
    });

    if (matchedRoute) {
      const query = new URLSearchParams({
        pickup: searchFrom,
        drop: searchTo,
        date: searchDate,
        vehicle: searchVehicle,
        type: matchedRoute.tripType || 'Round Trip',
        compulsory: 'true',
      }).toString();
      router.push(`/booking?${query}`);
    } else {
      setShowCustomRouteModal(true);
    }
  };

  const getCustomRouteWhatsAppUrl = () => {
    const text = `Hello Sushi Travels,\n\nI would like to request a custom route quote:\n- *From:* ${searchFrom}\n- *To:* ${searchTo}\n- *Travel Date:* ${searchDate || 'Not selected'}\n- *Vehicle Class:* ${searchVehicle || 'Choose Class'}\n\nPlease provide a rate quote. Thank you!`;
    return getWhatsAppUrl(text);
  };

  const handleProceedToCustomBooking = () => {
    const query = new URLSearchParams({
      pickup: searchFrom,
      drop: searchTo,
      date: searchDate,
      vehicle: searchVehicle,
      customRoute: 'true',
    }).toString();
    setShowCustomRouteModal(false);
    router.push(`/booking?${query}`);
  };

  return (
    <div className="relative">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageSchema({
              name: 'Sushi Travels — Car & Tempo Traveller Rental Bangalore',
              description: 'Chauffeur-driven car, SUV and Tempo Traveller rentals in Bangalore for outstation road trips, airport transfers, and group holidays.',
              url: '/',
              datePublished: '2024-01-15T08:00:00+05:30',
              dateModified: '2026-10-05T08:00:00+05:30',
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getVideoObjectSchema({
              name: 'Sushi Travels — Outstation Mountain Highway Travel & Group Rental Video',
              description: 'Watch Sushi Travels Tempo Travellers and luxury fleet navigating scenic South India ghat roads and outstation highways with verified chauffeurs.',
              thumbnailUrl: '/videos/hero-mountains-poster.webp',
              uploadDate: '2024-01-15T08:00:00+05:30',
              duration: 'PT24S',
              contentUrl: '/videos/hero-mountains.mp4',
            })
          ),
        }}
      />

      {/* Hero Section — pulled up under the fixed transparent header, same pattern as the Fleet page */}
      <section
        className="relative -mt-[72px] md:-mt-[80px] min-h-screen flex items-center justify-center pt-32 pb-20 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 text-white"
      >
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          src="/videos/hero-mountains.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/hero-mountains-poster.webp"
          title="Sushi Travels Outstation Mountain Highway Travel Video"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-navy-dark/55 z-0 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full text-center space-y-8">
          <div className="space-y-4 max-w-3xl mx-auto">
            {/* Freshness & Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs text-cream-warm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Season 2026 Verified Rates</span>
              <span className="text-white/40">•</span>
              <span>Updated <time dateTime="2026-10-05">October 5, 2026</time></span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight">
              Your Trusted Travel Partner Across India
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-cream-warm font-medium">
              Rent 9, 12 &amp; 17-seater Tempo Travellers, sedans, and SUVs with verified professional drivers. Safe, comfortable, and reliable rides for outstation travel, group transportation, local travel, and airport transfers.
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              href="/booking"
              title="Book Your Ride with Sushi Travels"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark active:scale-[0.98] text-white text-base font-bold rounded-full px-8 py-3.5 shadow-sm transition-all duration-200"
            >
              <span>Book Your Ride</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          {/* Quick Search Bar Form */}
          <div className="max-w-5xl mx-auto bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-navy-light/10 text-navy">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end text-left">

              {/* From Location */}
              <div>
                <label htmlFor="search-from" className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-2">From Location</label>
                <input
                  id="search-from"
                  type="text"
                  required
                  placeholder="e.g. Bangalore"
                  value={searchFrom}
                  onChange={(e) => setSearchFrom(e.target.value)}
                  className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs text-navy outline-none focus:border-primary transition"
                />
              </div>

              {/* To Location */}
              <div>
                <label htmlFor="search-to" className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-2">To Location</label>
                <input
                  id="search-to"
                  type="text"
                  required
                  placeholder="e.g. Mysore or Coorg"
                  value={searchTo}
                  onChange={(e) => setSearchTo(e.target.value)}
                  className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs text-navy outline-none focus:border-primary transition"
                />
              </div>

              {/* Date */}
              <div>
                <label htmlFor="search-date" className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-2">Travel Date</label>
                <input
                  id="search-date"
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs text-navy outline-none focus:border-primary transition"
                />
              </div>

              {/* Vehicle Type */}
              <div>
                <label htmlFor="search-vehicle" className="block text-[11px] font-bold uppercase tracking-wider text-navy mb-2">Vehicle Type</label>
                <select
                  id="search-vehicle"
                  required
                  value={searchVehicle}
                  onChange={(e) => setSearchVehicle(e.target.value)}
                  className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs text-navy outline-none focus:border-primary transition"
                >
                  <option value="">Choose Class</option>
                  {vehiclesList.length > 0 ? (
                    Array.from(new Set(vehiclesList.map((v) => v.type).filter(Boolean))).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Tempo Traveller">Tempo Traveller</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Bus">Bus</option>
                    </>
                  )}
                </select>
              </div>

              {/* Search button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-navy hover:bg-primary active:scale-[0.98] text-white text-xs font-bold rounded-xl py-3.5 shadow transition-all duration-200"
                >
                  Search Ride
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>


      {/* About Sushi Travels Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-sm aspect-[4/3]">
                <Image
                  src="/mysuru.webp"
                  alt="Mysuru Palace — one of Karnataka's most iconic destinations, reachable on a Sushi Travels round trip"
                  title="Mysuru Palace — South India Tour Destination by Sushi Travels"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs uppercase tracking-widest text-primary-light font-bold mb-1">Group Journeys Made Easy</p>
                  <p className="text-lg font-serif font-bold">Unforgettable Round Trips</p>
                </div>
              </div>
              <div className="bg-cream-warm/40 rounded-2xl p-6 border border-navy-light/5 flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="text-sm font-serif font-bold text-navy">Specialized Round-Trip Expertise</p>
                  <p className="text-xs text-navy-light mt-1">From custom stopovers to handling dynamic tourist permits, we curate the perfect outstation itinerary for your family or friends.</p>
                </div>
              </div>
            </div>

            {/* Text column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-dark">About Sushi Travels</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy leading-tight">
                  Specializing in Premium Group Round Trips Across India
                </h2>
              </div>
              <div className="text-sm text-navy-light space-y-4 leading-relaxed font-sans">
                <p>
                  Welcome to <strong>Sushi Travels</strong>, your trusted partner for premium group travel and long-distance outstation round trips. Our fleet is built entirely around group comfort: <strong>Tempo Travellers (9-seater to 17-seater)</strong> with pushback seats, individual AC vents and infotainment; <strong>Force Urbania</strong> vans (10-seater to 17-seater); and air-conditioned <strong>tourist buses and luxury coaches (22-seater to 50-seater)</strong> for larger groups.
                </p>
                <p>
                  Our entire service is optimized around <strong>round-trip journeys</strong> — hill-station holidays to Ooty, Coorg or Chikmagalur, pilgrimages to Tirupati, coastal drives to Goa and Pondicherry — with flexible routing for stopovers along the way. Every vehicle gets a multi-point mechanical inspection and sanitization before each trip, and every driver is police-verified, background-checked, and experienced on ghat roads and highways across South India. Pricing is billed transparently per kilometer, with no hidden fees.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/booking"
                  title="Plan Your Group Trip with Sushi Travels"
                  className="inline-flex items-center justify-center bg-navy hover:bg-primary active:scale-[0.98] text-white text-xs font-bold rounded-full px-6 py-3 shadow transition-all duration-200"
                >
                  <span>Plan Your Group Trip</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy">Why Ride With Sushi Travels?</h2>
            <p className="text-sm text-navy">We aim to deliver comfort, safety, and transparency with every single kilometer driven.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Safety First */}
            <div className="bg-white p-8 rounded-2xl border border-navy-light/10 shadow-sm hover:shadow-md transition duration-200 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-navy">Safety First</h3>
              <p className="text-xs text-navy leading-relaxed">
                All vehicles are GPS monitored. Driver fatigue logs and speed trackers ensure a secure, hazard-free travel experience.
              </p>
            </div>

            {/* Verified Drivers */}
            <div className="bg-white p-8 rounded-2xl border border-navy-light/10 shadow-sm hover:shadow-md transition duration-200 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-navy">Verified Chauffeurs</h3>
              <p className="text-xs text-navy leading-relaxed">
                Police-verified, background-checked professional drivers with expertise on mountain ghat roads and local South Indian routes.
              </p>
            </div>

            {/* 24/7 Support */}
            <div className="bg-white p-8 rounded-2xl border border-navy-light/10 shadow-sm hover:shadow-md transition duration-200 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
                <Headset className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-navy">24/7 Support Desk</h3>
              <p className="text-xs text-navy leading-relaxed">
                Dedicated call and WhatsApp support helpline ready to assist with live rerouting, pickups, and emergency road assistance.
              </p>
            </div>

            {/* Best Prices */}
            <div className="bg-white p-8 rounded-2xl border border-navy-light/10 shadow-sm hover:shadow-md transition duration-200 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
                <BadgePercent className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-navy">Best Price Guarantee</h3>
              <p className="text-xs text-navy leading-relaxed">
                Fully transparent pricing per kilometer with no hidden fees. Get competitive rates for round-trips and airport drops.
              </p>
            </div>
          </div>

          {/* Statutory Compliance & Regulatory Citations */}
          <div className="mt-12 bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 text-left shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy-light/10 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary-dark">Official Compliance &amp; Citations</span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-navy">
                  Adherence to National &amp; Karnataka Transport Regulations
                </h3>
              </div>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
                ✓ 100% Commercial Tourist Permit Compliant
              </span>
            </div>
            <p className="text-xs sm:text-sm text-navy-light leading-relaxed mb-4">
              Sushi Travels operates strictly under the guidelines defined by the{' '}
              <a
                href="https://morth.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                title="Ministry of Road Transport and Highways (MoRTH) Official Portal"
                className="text-primary font-semibold underline decoration-primary/40 hover:decoration-primary"
              >
                Ministry of Road Transport and Highways (MoRTH)
              </a>{' '}
              and the{' '}
              <a
                href="https://transport.karnataka.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                title="Karnataka Transport Department &amp; RTO Official Portal"
                className="text-primary font-semibold underline decoration-primary/40 hover:decoration-primary"
              >
                Karnataka Transport Department
              </a>
              . All Tempo Travellers, Force Urbanias, and luxury coaches carry valid All India Tourist Permits (AITP), AIS-140 GPS tracking devices, emergency panic buttons, and fitness certifications as mandated by the Motor Vehicles Act.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-navy">
              <div className="bg-cream/60 rounded-xl p-3 border border-navy-light/5">
                <p className="font-bold text-navy">AIS-140 Certified GPS</p>
                <p className="text-navy-light mt-0.5">Real-time vehicle location &amp; emergency alert system linked to state command centers.</p>
              </div>
              <div className="bg-cream/60 rounded-xl p-3 border border-navy-light/5">
                <p className="font-bold text-navy">Driver Duty &amp; Rest Logs</p>
                <p className="text-navy-light mt-0.5">MoRTH-compliant shift caps to prevent driver fatigue during long-distance night drives.</p>
              </div>
              <div className="bg-cream/60 rounded-xl p-3 border border-navy-light/5">
                <p className="font-bold text-navy">Interstate Border Clearances</p>
                <p className="text-navy-light mt-0.5">Seamless e-permit border taxes paid for Tamil Nadu, Kerala, Andhra Pradesh &amp; Goa.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Fleet Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy">Our Featured Rental Fleet</h2>
              <p className="text-sm text-navy">Find the perfect group vehicle option matching your trip requirements.</p>
            </div>
            <Link
              href="/fleet"
              title="Explore Full Vehicle Rental Fleet in Bangalore"
              className="inline-flex items-center space-x-1.5 text-sm font-bold text-primary hover:text-primary-dark transition duration-150 mt-4 md:mt-0"
            >
              <span>View All Fleet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Dynamic Category Rows — sorted by categoryOrder */}
          {(() => {
            // Filter only vehicles marked showOnHome (default true if field missing)
            const homeVehicles = vehiclesList.filter((v) => v.showOnHome !== false);
            // Get unique categories with their categoryOrder, sorted by categoryOrder then first seen
            const categoryMap = new Map<string, number>();
            homeVehicles.forEach((v) => {
              if (v.type && !categoryMap.has(v.type)) {
                categoryMap.set(v.type, v.categoryOrder ?? 0);
              }
            });
            const categories = Array.from(categoryMap.entries())
              .sort((a, b) => a[1] - b[1])
              .map(([cat]) => cat);
            if (categories.length === 0) {
              return (
                <div className="text-center text-navy-light py-16">
                  {homeDataError
                    ? "Couldn't load the fleet right now — please refresh, or call/WhatsApp us directly."
                    : 'No vehicles available to display.'}
                </div>
              );
            }
            return categories.map((cat: string, catIdx: number) => {
              const catVehicles = sortVehiclesForDisplay(
                homeVehicles.filter((v) => v.type === cat)
              );
              if (catVehicles.length === 0) return null;
              // Use homeCategory label from first vehicle of this type if set, else fallback to type name
              const rowLabel = catVehicles[0].homeCategory?.trim() || cat;
              return (
                <div key={cat} className="mb-14">
                  <div className="border-b border-navy-light/10 pb-3 mb-6">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-navy flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-primary rounded-full inline-block" />
                      {rowLabel}
                    </h3>
                  </div>
                  <div className={`flex overflow-x-auto pb-6 space-x-6 md:space-x-0 md:grid md:grid-cols-3 md:gap-8 scrollbar-thin snap-x snap-mandatory scroll-smooth ${catVehicles.length === 1 ? 'justify-center md:justify-start' : ''}`}>
                    {catVehicles.map((vehicle, idx) => (
                      <div key={vehicle.id} className="w-80 flex-shrink-0 md:w-auto md:flex-shrink-1 snap-center">
                        <VehicleCard vehicle={vehicle} priority={catIdx === 0 && idx === 0} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </section>


      {/* Popular Routes Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-16 text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy">Explore Popular Holiday Routes</h2>
            <p className="text-sm text-navy">Pre-calculated round-trip route guidelines from Bangalore to top holiday destinations.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularRoutesList.length > 0 ? (
              popularRoutesList.map((route, idx) => (
                <RouteCard key={idx} route={route} />
              ))
            ) : (
              <div className="col-span-full text-center text-navy-light py-16">
                Route guides are temporarily unavailable. Please check our{' '}
                <Link href="/routes" title="Explore Popular Outstation Routes from Bangalore" className="text-primary font-semibold hover:text-primary-dark">
                  full routes page
                </Link>{' '}
                or contact us directly.
              </div>
            )}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/routes"
              title="View All Route Guides and Fare Enquiries"
              className="inline-flex items-center space-x-1.5 text-sm font-bold text-primary hover:text-primary-dark transition duration-150"
            >
              <span>View All Route Guides &amp; Fare Enquiries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Explore by Service & Area Section — compact links into the new
          /services and /locations page networks, subset + "view all"
          rather than every individual link, to avoid a spammy homepage. */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Services */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy">Our Services</h2>
                <Link href="/services" title="View All Chauffeur Rental Services in Bangalore" className="inline-flex items-center space-x-1 text-xs font-bold text-primary-dark hover:text-navy transition">
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Airport Taxi', href: '/services/bangalore-airport-taxi' },
                  { label: 'Outstation Cabs', href: '/services/outstation-cab-bangalore' },
                  { label: 'Local Taxi', href: '/services/local-taxi-bangalore' },
                  { label: 'Bus & Group Travel', href: '/vehicles/bus-rental-bangalore' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={`Explore ${item.label} services in Bangalore`}
                    className="bg-cream rounded-xl border border-navy-light/10 px-4 py-3 text-sm font-semibold text-navy hover:text-primary hover:border-primary/30 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Areas We Serve */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy">Popular Areas We Serve</h2>
                <Link href="/locations" title="View All Service Locations in Bangalore" className="inline-flex items-center space-x-1 text-xs font-bold text-primary-dark hover:text-navy transition">
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Whitefield', href: '/locations/car-rental-whitefield' },
                  { label: 'Koramangala', href: '/locations/car-rental-koramangala' },
                  { label: 'Indiranagar', href: '/locations/car-rental-indiranagar' },
                  { label: 'Electronic City', href: '/locations/car-rental-electronic-city' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={`Car and Tempo Traveller rental in ${item.label}, Bangalore`}
                    className="bg-cream rounded-xl border border-navy-light/10 px-4 py-3 text-sm font-semibold text-navy hover:text-primary hover:border-primary/30 transition-colors"
                  >
                    Car Rental in {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-16 text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy">How Booking Works</h2>
            <p className="text-sm text-navy">Get your chauffeured ride confirmed in 3 simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center relative">

            {/* Step 1 */}
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-serif font-bold text-navy">Choose Vehicle</h3>
              <p className="text-xs text-navy leading-relaxed max-w-xs">
                Select from luxury tempo travellers, premium passenger vans, and high-capacity buses depending on your group size.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-serif font-bold text-navy">Book & Pay</h3>
              <p className="text-xs text-navy leading-relaxed max-w-xs">
                Provide trip parameters and contact details. Preview fares with transparent mileage estimates. Confirm on site or WhatsApp.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-serif font-bold text-navy">Travel Safe</h3>
              <p className="text-xs text-navy leading-relaxed max-w-xs">
                Chauffeur details will be messaged to you. Sit back and enjoy a smooth, air-conditioned ride as our verified driver handles the roads.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-16 text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy">Reviewed By Our Travelers</h2>
            <p className="text-sm text-navy">Read honest reviews from families, tourists, and business executives across India.</p>
          </div>

          <div className={`flex overflow-x-auto pb-6 space-x-6 md:space-x-0 md:grid md:grid-cols-3 md:gap-8 scrollbar-thin snap-x snap-mandatory scroll-smooth ${testimonialsList.length === 1 ? 'justify-center md:justify-start' : ''}`}>
            {testimonialsList.length > 0 ? (
              testimonialsList.map((test) => (
                <div key={test._id || test.id} className="w-80 flex-shrink-0 md:w-auto md:flex-shrink-1 snap-center">
                  <TestimonialCard testimonial={test} />
                </div>
              ))
            ) : (
              <div className="w-full text-center text-navy-light py-8">
                Reviews are temporarily unavailable — please check back shortly.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tours & Packages Highlights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy">Popular Tours &amp; Packages</h2>
              <p className="text-sm text-navy">Ready-made round trips from Bangalore, matched to the right vehicle for your group.</p>
            </div>
            <Link
              href="/tours-and-packages"
              title="View All South India Tours and Holiday Packages"
              className="inline-flex items-center space-x-1.5 text-sm font-bold text-primary hover:text-primary-dark transition duration-150 mt-4 md:mt-0"
            >
              <span>View All Tours &amp; Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.slice(0, 3).map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-dark">Frequently Asked Questions</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy">Got Questions? We Have Answers</h2>
            <p className="text-sm text-navy-light">Everything you need to know about our premium Tempo Traveller, Force Urbania, and tourist bus rentals for round trips.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-navy-light/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 text-navy hover:text-primary transition-colors focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif font-bold text-base sm:text-lg leading-snug">
                      {faq.question}
                    </span>
                    <span className={`w-8 h-8 rounded-full bg-cream flex items-center justify-center shrink-0 text-navy-light transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary bg-primary/10' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </button>

                  {/* Answer stays mounted in the DOM (never conditionally rendered) so the
                      FAQPage JSON-LD below always matches the server-rendered HTML — only
                      visibility/height is animated, not presence. */}
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-navy-light leading-relaxed border-t border-navy-light/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom Route Modal */}
      {showCustomRouteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-navy-dark/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowCustomRouteModal(false)}
          />

          {/* Modal Card */}
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-navy-light/10 text-navy z-10 overflow-hidden transform transition-all duration-300 scale-100 flex flex-col space-y-6">

            {/* Close Button */}
            <button
              onClick={() => setShowCustomRouteModal(false)}
              className="absolute top-4 right-4 text-navy-light/75 hover:text-navy hover:bg-cream p-1.5 rounded-full transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy mt-2">
                Custom Route Inquiry
              </h3>
              <p className="text-xs text-navy-light">
                The route you searched is not a pre-calculated holiday route. You can submit a custom query directly to our agency.
              </p>
            </div>

            {/* Route Summary Box */}
            <div className="bg-cream-warm/40 border border-navy-light/5 rounded-2xl p-4 space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-navy-light uppercase font-bold tracking-wider block">Requested Journey</span>
                  <p className="font-serif font-bold text-navy flex items-center flex-wrap gap-x-2 text-sm sm:text-base">
                    <span>{searchFrom}</span>
                    <span className="text-primary text-xs">➔</span>
                    <span>{searchTo}</span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-navy-light/5 pt-3 text-xs">
                <div>
                  <span className="text-[10px] text-navy-light/90 uppercase font-semibold block">Travel Date</span>
                  <span className="font-bold">{searchDate || 'Not selected'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-navy-light/90 uppercase font-semibold block">Vehicle Type</span>
                  <span className="font-bold">{searchVehicle || 'Choose Class'}</span>
                </div>
              </div>
            </div>

            {/* Options Description */}
            <p className="text-xs text-navy-light leading-relaxed">
              We offer two quick ways to request your custom rate quote. Pick your preferred channel below:
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={getCustomRouteWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                title="Request Custom Route Quote on WhatsApp"
                onClick={() => setShowCustomRouteModal(false)}
                className="flex-1 inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full py-3.5 px-6 shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition duration-200 text-xs sm:text-sm"
              >
                <MessageSquare className="w-4 h-4 mr-2 fill-current" />
                <span>Request on WhatsApp</span>
              </a>
              <button
                onClick={handleProceedToCustomBooking}
                className="flex-1 inline-flex items-center justify-center bg-navy hover:bg-primary text-white font-bold rounded-full py-3.5 px-6 shadow-md transition duration-200 hover:scale-[1.02] active:scale-[0.98] text-xs sm:text-sm"
              >
                <span>Submit Online Form</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
