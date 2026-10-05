import React from 'react';
import Link from 'next/link';
import { Vehicle } from '@/lib/vehicles';
import { getVehicleDetailHref } from '@/lib/vehiclePages';

/**
 * Compact side-by-side comparison of every vehicle in a category (e.g. all
 * Tempo Traveller seat sizes), so a visitor can pick a size without leaving
 * the page. Every cell reads straight from vehicles.ts — no invented "best
 * for" copy, no numbers that aren't already the confirmed pricing sheet.
 */
export default function GroupSizeComparisonTable({
  heading,
  vehicles,
}: {
  heading: string;
  vehicles: Vehicle[];
}) {
  if (vehicles.length === 0) return null;

  return (
    <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4">
      <h2 className="font-serif font-bold text-xl text-navy">{heading}</h2>
      <div className="overflow-x-auto -mx-2 px-2">
        <table className="w-full text-sm border-collapse min-w-[560px]">
          <thead>
            <tr className="border-b-2 border-navy-light/15 text-left text-[11px] uppercase tracking-wider text-navy-light">
              <th className="py-2 pr-3 font-bold">Vehicle</th>
              <th className="py-2 px-3 font-bold">Seats</th>
              <th className="py-2 px-3 font-bold">AC / Non-AC</th>
              <th className="py-2 px-3 font-bold">Rate</th>
              <th className="py-2 px-3 font-bold">Driver Bata</th>
              <th className="py-2 pl-3 font-bold">Luggage</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => {
              const href = getVehicleDetailHref(vehicle.id);
              const rate = vehicle.priceDisplay
                ? vehicle.priceDisplay
                : vehicle.hasNonAcOption && vehicle.ratePerKmAc && vehicle.ratePerKmNonAc
                  ? `₹${vehicle.ratePerKmNonAc}–₹${vehicle.ratePerKmAc}/km`
                  : `₹${vehicle.ratePerKm}/km`;
              const acLabel = vehicle.hasNonAcOption
                ? 'AC & Non-AC'
                : vehicle.ac === false
                  ? 'Non-AC'
                  : 'AC only';
              return (
                <tr key={vehicle.id} className="border-b border-navy-light/10 last:border-0">
                  <td className="py-3 pr-3 font-semibold text-navy">
                    {href ? (
                      <Link
                        href={href}
                        title={`View ${vehicle.name} specifications and rental pricing`}
                        className="hover:text-primary transition-colors"
                      >
                        {vehicle.name}
                      </Link>
                    ) : (
                      vehicle.name
                    )}
                  </td>
                  <td className="py-3 px-3 text-navy">{vehicle.seatsDisplay ?? `${vehicle.seats} Seater`}</td>
                  <td className="py-3 px-3 text-navy-light">{acLabel}</td>
                  <td className="py-3 px-3 font-semibold text-navy whitespace-nowrap">{rate}</td>
                  <td className="py-3 px-3 text-navy-light whitespace-nowrap">
                    {vehicle.driverBata ? `₹${vehicle.driverBata}/day` : 'On request'}
                  </td>
                  <td className="py-3 pl-3 text-navy-light">{vehicle.luggage} bags</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-navy-light">
        Rates shown are per km with a 300 km/day minimum unless marked &quot;Price on Request&quot;. Toll, parking, permit
        and state taxes are additional on every tier.
      </p>
    </section>
  );
}
