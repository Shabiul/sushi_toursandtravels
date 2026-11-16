import React from 'react';
import Link from 'next/link';
import type { Vehicle } from '@/lib/vehicles';
import { getSampleFares } from '@/lib/sampleFares';

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

/**
 * "What a real trip costs" — worked examples from the vehicle's own confirmed
 * rate (see src/lib/sampleFares.ts). Renders nothing for vehicles without a
 * confirmed per-km rate (Price on Request).
 */
export default function SampleFareTable({ vehicle, vehicleName }: { vehicle: Vehicle; vehicleName: string }) {
  const data = getSampleFares(vehicle);
  if (!data) return null;
  const showPerPerson = data.rows.some((r) => r.perPerson !== null);

  return (
    <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4">
      <div className="space-y-1">
        <h2 className="font-serif font-bold text-xl text-navy">{vehicleName} Trip Cost Examples</h2>
        <p className="text-xs text-navy-light">
          Worked out from our rate of {inr(data.rate)}/km, a {data.minKm} km/day minimum and {inr(data.bata)}/day driver bata.
        </p>
      </div>
      <div className="overflow-x-auto -mx-2 px-2">
        <table className="w-full text-sm border-collapse min-w-[520px]">
          <thead>
            <tr className="border-b-2 border-navy-light/15 text-left text-[11px] uppercase tracking-wider text-navy-light">
              <th className="py-2 pr-3 font-bold">Round trip</th>
              <th className="py-2 px-3 font-bold">Days</th>
              <th className="py-2 px-3 font-bold">Billed km</th>
              <th className="py-2 px-3 font-bold">Estimated total</th>
              {showPerPerson && <th className="py-2 pl-3 font-bold">Per person</th>}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r) => (
              <tr key={r.trip} className="border-b border-navy-light/10 last:border-0">
                <td className="py-3 pr-3 font-semibold text-navy">{r.trip}</td>
                <td className="py-3 px-3 text-navy-light">{r.days}</td>
                <td className="py-3 px-3 text-navy-light">{r.billedKm} km</td>
                <td className="py-3 px-3 font-bold text-navy whitespace-nowrap">{inr(r.total)}</td>
                {showPerPerson && (
                  <td className="py-3 pl-3 text-navy-light whitespace-nowrap">
                    {r.perPerson !== null ? `about ${inr(r.perPerson)}` : '—'}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-navy-light leading-relaxed">
        Estimates only. Billed km is the larger of the round-trip distance and the daily minimum. Tolls, parking, state permit and entry fees, night allowance and 5% GST are extra and billed at actuals — see our{' '}
        <Link href="/terms-and-conditions" title="Read our rental terms" className="underline decoration-navy-light/40 hover:text-primary">
          terms
        </Link>
        . Call or WhatsApp for a confirmed quote for your dates.
      </p>
    </section>
  );
}
