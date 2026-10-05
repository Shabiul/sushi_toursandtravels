'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Briefcase, ArrowRight, ShieldCheck, Phone, MessageCircle } from 'lucide-react';
import { Vehicle, getMinimumDailyTotal } from '@/lib/vehicles';
import { getVehicleDetailHref } from '@/lib/vehiclePages';
import { PHONE_NUMBER, getWhatsAppUrl } from '@/lib/contact';

interface VehicleCardProps {
  vehicle: Vehicle;
  priority?: boolean;
}

export default function VehicleCard({ vehicle, priority = false }: VehicleCardProps) {
  const images = vehicle.images && vehicle.images.length > 0 ? vehicle.images : [vehicle.image];
  // Static thumbnail: prefer a side-view shot when one exists in the photo set, otherwise the primary/front image.
  const sideViewIndex = images.findIndex((img) => img.toLowerCase().includes('side'));
  const thumbnailIndex = sideViewIndex !== -1 ? sideViewIndex : 0;
  const thumbnail = images[thumbnailIndex];
  const thumbnailFit = vehicle.imageFits?.[thumbnailIndex] || vehicle.imageFit || 'cover';
  const thumbnailScale = vehicle.imageScales?.[thumbnailIndex] || 1;
  const thumbnailPosition = vehicle.imagePositions?.[thumbnailIndex] || '50% 50%';

  // Vehicle-specific prefilled WhatsApp enquiry message
  const whatsappMessage = `Hello Sushi Tours & Travels, I would like to enquire about the ${vehicle.name}. Please share the availability and quotation.`;
  const whatsappUrl = getWhatsAppUrl(whatsappMessage);

  const minimumDailyTotal = getMinimumDailyTotal(vehicle);
  const detailHref = getVehicleDetailHref(vehicle.id);
  const acLabel = vehicle.hasNonAcOption
    ? 'AC & Non-AC'
    : vehicle.ac === false
      ? 'Non-AC'
      : vehicle.acOnly
        ? 'Only AC'
        : 'AC';
  const imageContent = (
    <div className="relative aspect-video w-full overflow-hidden bg-cream-warm/30">
      {thumbnailFit === 'contain' ? (
        <>
          <Image
            src={thumbnail}
            alt=""
            title={`${vehicle.name} background`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover blur-lg opacity-30 scale-110 group-hover:scale-120 transition-transform duration-500 pointer-events-none"
            style={{ objectPosition: thumbnailPosition }}
            priority={priority}
          />
          <Image
            src={thumbnail}
            alt={`Sushi Travels rental vehicle - ${vehicle.name}`}
            title={`Sushi Travels ${vehicle.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain pointer-events-none z-10 p-1"
            style={{ transform: `scale(${thumbnailScale})`, transformOrigin: 'center' }}
            priority={priority}
          />
        </>
      ) : (
        <Image
          src={thumbnail}
          alt={`Sushi Travels rental vehicle - ${vehicle.name}`}
          title={`Sushi Travels ${vehicle.name} — Fleet Bangalore`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          style={{ objectPosition: thumbnailPosition, transform: `scale(${thumbnailScale})`, transformOrigin: 'center' }}
          priority={priority}
        />
      )}

      {/* Category Badge */}
      <span className="absolute top-4 left-4 bg-navy text-white font-sans text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
        {vehicle.type}
      </span>

      {/* AC / Non-AC Badge */}
      <span className="absolute top-4 right-4 bg-primary text-white font-sans text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
        {acLabel}
      </span>

      {images.length > 1 && (
        <span className="absolute bottom-4 right-4 bg-navy-dark/80 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
          View all {images.length} photos
        </span>
      )}
    </div>
  );

  return (
    <div className="group bg-white rounded-2xl border border-navy-light/10 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden h-full">
      {/* Card Image — static thumbnail; click through to the vehicle's detail page to see every photo + full info */}
      {detailHref ? (
        <Link
          href={detailHref}
          aria-label={`View all photos and details for ${vehicle.name}`}
          title={`View all photos and details for ${vehicle.name}`}
        >
          {imageContent}
        </Link>
      ) : (
        imageContent
      )}

      {/* Card Details */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-serif font-bold text-xl text-navy group-hover:text-primary transition-colors duration-200 mb-2">
          {vehicle.name}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-navy mb-4 line-clamp-2 min-h-[40px]">
          {vehicle.description}
        </p>

        {/* Deep link to the dedicated SEO landing page for this vehicle, when one exists */}
        {detailHref && (
          <Link
            href={detailHref}
            title={`View full pricing, specs and photos for ${vehicle.name}`}
            className="inline-flex items-center text-xs font-bold text-primary-dark hover:text-navy transition-colors -mt-2 mb-4 w-fit"
          >
            Full pricing &amp; details for {vehicle.name}
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        )}

        {/* Specs Grid — AC status isn't repeated here since the badge on the photo already shows it */}
        <div className="grid grid-cols-2 gap-2 py-3 px-4 bg-cream/80 rounded-xl mb-4 border border-navy-light/5 text-xs text-navy font-medium">
          <div className="flex flex-col items-center justify-center space-y-1">
            <Users className="w-4 h-4 text-primary" />
            <span>{vehicle.seatsDisplay || `${vehicle.seats} Seats`}</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1 border-l border-navy-light/10">
            <Briefcase className="w-4 h-4 text-primary" />
            <span>{vehicle.luggage} Bags</span>
          </div>
        </div>

        {/* Key Features Bullet List */}
        <ul className="space-y-1.5 mb-4 text-xs text-navy-light flex-1">
          {vehicle.features.slice(0, 4).map((feature, idx) => (
            <li key={idx} className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
              <span className="truncate">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Custom Group Rental Terms Box — shown for vehicles with a confirmed rate */}
        {vehicle.driverBata !== undefined && (
          <div className="mb-5 text-[11px] text-navy space-y-1.5 bg-cream-warm/40 p-3.5 rounded-xl border border-navy-light/5">
            <div className="flex justify-between">
              <span className="font-medium text-navy">Minimum:</span>
              <span className="font-bold text-navy">{vehicle.minKmPerDay || 300} km/day</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-navy">Driver Bata:</span>
              <span className="font-bold text-navy">₹{vehicle.driverBata}/day</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-navy">Duty Time:</span>
              <span className="font-bold text-navy">{vehicle.drivingHours || '6:00 AM – 10:00 PM'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-navy">Toll, Parking &amp; Permits:</span>
              <span className="font-bold text-primary-dark">Additional</span>
            </div>
            <div className="text-[10px] text-primary-dark/95 text-center font-medium border-t border-navy-light/5 pt-1.5 mt-1">
              Extra Bata after 10:00 PM &bull; Toll, parking, permit and state taxes are additional
            </div>
            {minimumDailyTotal !== null && (
              <div className="text-center font-bold text-navy border-t border-navy-light/5 pt-1.5 mt-1.5">
                Est. minimum daily charge: ₹{minimumDailyTotal.toLocaleString('en-IN')}*
              </div>
            )}
          </div>
        )}

        {/* Price-on-request CTA note (buses / vehicles with no confirmed rate) */}
        {vehicle.priceDisplay && (
          <div className="mb-5 text-[11px] text-center text-navy bg-cream-warm/40 p-3 rounded-xl border border-navy-light/5">
            Call or WhatsApp us for a custom quote &mdash; Get Quote / Call for Pricing
          </div>
        )}

        {/* Pricing and Action CTA */}
        <div className="pt-4 border-t border-navy-light/10 flex items-center justify-between mt-auto">
          <div className="flex-1 pr-2">
            {vehicle.priceDisplay ? (
              <div>
                <div className="text-[10px] text-navy font-bold uppercase tracking-wider">Pricing</div>
                <div className="flex items-baseline">
                  <span className="font-sans font-bold text-2xl text-navy">{vehicle.priceDisplay}</span>
                </div>
              </div>
            ) : vehicle.ratePerKmNonAc && vehicle.ratePerKmAc ? (
              <div>
                <div className="text-[10px] text-navy font-bold uppercase tracking-wider">Rates per Km</div>
                <div className="flex items-baseline flex-wrap gap-x-2">
                  <span className="font-sans font-bold text-lg text-navy">₹{vehicle.ratePerKmNonAc}</span>
                  <span className="text-[10px] text-navy font-semibold mr-1">Non-AC</span>
                  <span className="text-navy-light/30">|</span>
                  <span className="font-sans font-bold text-lg text-navy">₹{vehicle.ratePerKmAc}</span>
                  <span className="text-[10px] text-navy font-bold text-primary">AC</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-[10px] text-navy font-bold uppercase tracking-wider">Rates Start At</div>
                <div className="flex items-baseline">
                  <span className="font-sans font-bold text-2xl text-navy">₹{vehicle.ratePerKm}</span>
                  <span className="text-xs text-navy ml-1">/ km</span>
                </div>
              </div>
            )}
            
            {vehicle.driverBata !== undefined ? (
              <span className="text-[11px] text-primary font-bold block mt-0.5">
                + ₹{vehicle.driverBata}/day Driver Bata
              </span>
            ) : vehicle.priceDisplay ? (
              <span className="text-[10px] text-primary-dark font-medium leading-none block mt-0.5">
                Get Quote / Call for Pricing
              </span>
            ) : (
              <span className="text-[10px] text-primary-dark font-medium leading-none block mt-0.5">
                +GST applicable
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center justify-center w-11 h-11 bg-cream border border-navy-light/15 hover:bg-[#0078FF] hover:border-[#0078FF] text-navy hover:text-white rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm shrink-0"
              aria-label={`Call Sushi Tours & Travels about ${vehicle.name}`}
              title={`Call to enquire about ${vehicle.name}`}
            >
              <Phone className="w-4.5 h-4.5" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-11 h-11 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm shrink-0"
              aria-label={`Enquire about ${vehicle.name} on WhatsApp`}
              title={`Enquire about ${vehicle.name} on WhatsApp`}
            >
              <MessageCircle className="w-4.5 h-4.5" />
            </a>
            <Link
              href={`/booking?vehicle=${encodeURIComponent(vehicle.type)}`}
              className="inline-flex items-center justify-center w-11 h-11 bg-navy hover:bg-primary text-white rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm group/btn shrink-0"
              aria-label={`Enquire / Book ${vehicle.name}`}
              title={`Book ${vehicle.name} online with Sushi Travels`}
            >
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Primary Call CTA — full-width and clearly labeled */}
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="mt-3 inline-flex items-center justify-center space-x-2 w-full bg-primary hover:bg-primary-dark active:scale-[0.98] text-white text-sm font-bold rounded-xl py-3 shadow-sm transition-all duration-200"
          aria-label={`Call Sushi Tours & Travels now about ${vehicle.name}`}
          title={`Call Sushi Travels now for best ${vehicle.name} rental price`}
        >
          <Phone className="w-4 h-4" />
          <span>Call Now for Best Price</span>
        </a>
      </div>
    </div>
  );
}
