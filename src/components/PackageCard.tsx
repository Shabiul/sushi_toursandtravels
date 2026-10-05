'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { TourPackage } from '@/lib/packages';
import { PHONE_NUMBER, getWhatsAppUrl } from '@/lib/contact';

interface PackageCardProps {
  pkg: TourPackage;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const whatsappMessage = `Hello Sushi Tours & Travels, I would like to enquire about the ${pkg.title} package (${pkg.destination}). Please share availability and a quotation.`;
  const whatsappUrl = getWhatsAppUrl(whatsappMessage);

  return (
    <article className="group bg-white rounded-2xl border border-navy-light/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-warm/30">
        <Image
          src={pkg.image}
          alt={`Sushi Travels tour package - ${pkg.title}`}
          title={`${pkg.title} Tour Package — Sushi Travels`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center"
        />
        <span className="absolute top-4 left-4 bg-primary text-white font-sans text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
          {pkg.tripType}
        </span>
        <span className="absolute top-4 right-4 bg-navy text-white font-sans text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
          {pkg.duration}
        </span>
      </div>

      {/* Details */}
      <div className="p-6 flex flex-col flex-1">
        {/* Duration isn't repeated here — it's already shown as a badge on the photo above */}
        <div className="flex items-center space-x-4 text-xs text-navy-light mb-3">
          <div className="flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>{pkg.destination}</span>
          </div>
        </div>

        <h3 className="font-serif font-bold text-lg text-navy group-hover:text-primary transition-colors duration-200 mb-2 leading-snug">
          {pkg.title}
        </h3>

        <p className="text-sm text-navy mb-4 line-clamp-2 leading-relaxed">
          {pkg.description}
        </p>

        <ul className="space-y-1.5 mb-4 text-xs text-navy-light flex-1">
          {pkg.highlights.slice(0, 3).map((h, idx) => (
            <li key={idx} className="flex items-start space-x-1.5">
              <span className="text-primary mt-0.5">•</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <p className="text-[11px] text-navy-light mb-4">
          <span className="font-semibold text-navy">Best suited for:</span> {pkg.suitedFor}
        </p>

        {/* CTAs */}
        <div className="pt-4 border-t border-navy-light/10 flex items-center justify-between mt-auto">
          <span className="text-xs font-semibold text-primary-dark">Get Quote / Call for Pricing</span>
          <div className="flex items-center space-x-2 shrink-0">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center justify-center w-11 h-11 bg-cream border border-navy-light/15 hover:bg-[#0078FF] hover:border-[#0078FF] text-navy hover:text-white rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm shrink-0"
              aria-label={`Call Sushi Tours & Travels about ${pkg.title}`}
              title={`Call Sushi Travels about ${pkg.title}`}
            >
              <Phone className="w-4.5 h-4.5" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-11 h-11 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm shrink-0"
              aria-label={`Enquire about ${pkg.title} on WhatsApp`}
              title={`Enquire about ${pkg.title} on WhatsApp`}
            >
              <MessageCircle className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
