'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Navigation } from 'lucide-react';

export interface RouteInfo {
  from: string;
  to: string;
  distance: string;
  duration: string;
  estimatedPrice: string;
  imageUrl: string;
  tripType?: string;
}

interface RouteCardProps {
  route: RouteInfo;
}

export default function RouteCard({ route }: RouteCardProps) {
  return (
    <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-navy-light/10 shadow-sm hover:shadow-md transition-shadow duration-300">

      {/* Background Image with Dark Overlay */}
      <Image
        src={route.imageUrl}
        alt={`Popular holiday route from ${route.from} to ${route.to}`}
        title={`Cab route from ${route.from} to ${route.to}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 to-transparent z-0 pointer-events-none" />

      {/* Content Area */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
        
        {/* Route Icons */}
        <div className="flex items-center space-x-2 text-primary-light text-xs font-semibold uppercase tracking-wider mb-2">
          <Navigation className="w-3.5 h-3.5 fill-current" />
          <span>Popular South India Route</span>
        </div>

        {/* Origin and Destination Pair */}
        <h3 className="font-serif font-bold text-xl mb-1.5 flex items-center flex-wrap leading-tight text-white">
          <span>{route.from}</span>
          <span className="mx-2 text-primary">↔</span>
          <span>{route.to}</span>
        </h3>

        {/* Distance & Duration Row */}
        <div className="flex items-center space-x-4 text-xs text-cream-warm mb-4 font-sans">
          <span className="flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>{route.distance}</span>
          </span>
          <span>•</span>
          <span>{route.duration}</span>
        </div>

        {/* Price & CTA Row */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-cream-warm uppercase block">Fare Type</span>
            <div className="flex items-baseline text-white">
              <span className="font-bold text-base md:text-lg text-primary-light">Get Best Quote</span>
              <span className="text-[10px] text-cream-warm ml-2">round-trip</span>
            </div>
          </div>

          <Link
            href={`/booking?pickup=${encodeURIComponent(route.from)}&drop=${encodeURIComponent(route.to)}&type=${encodeURIComponent(route.tripType || 'Round Trip')}&compulsory=true`}
            title={`Book round-trip cab from ${route.from} to ${route.to}`}
            className="inline-flex items-center justify-center bg-white/15 hover:bg-primary text-white text-xs font-bold rounded-full px-4 py-2 border border-white/10 hover:border-transparent transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Book Now</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
