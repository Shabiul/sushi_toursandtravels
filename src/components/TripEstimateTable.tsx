import React from 'react';

export interface TripEstimate {
  trip: string;
  basis: string;
  range: string;
}

/**
 * Indicative per-trip price ranges for vehicles that are quoted per trip
 * rather than at a fixed per-km rate. Always labelled as an estimate with
 * the assumptions spelled out, so it never reads as a confirmed tariff.
 */
export default function TripEstimateTable({
  heading,
  estimates,
  note,
}: {
  heading: string;
  estimates: TripEstimate[];
  note: string;
}) {
  if (estimates.length === 0) return null;
  return (
    <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4">
      <h2 className="font-serif font-bold text-xl text-navy">{heading}</h2>
      <div className="overflow-x-auto -mx-2 px-2">
        <table className="w-full text-sm border-collapse min-w-[480px]">
          <thead>
            <tr className="border-b-2 border-navy-light/15 text-left text-[11px] uppercase tracking-wider text-navy-light">
              <th className="py-2 pr-3 font-bold">Trip</th>
              <th className="py-2 px-3 font-bold">Billing basis</th>
              <th className="py-2 pl-3 font-bold">Estimated total</th>
            </tr>
          </thead>
          <tbody>
            {estimates.map((e) => (
              <tr key={e.trip} className="border-b border-navy-light/10 last:border-0">
                <td className="py-3 pr-3 font-semibold text-navy">{e.trip}</td>
                <td className="py-3 px-3 text-navy-light">{e.basis}</td>
                <td className="py-3 pl-3 font-bold text-navy whitespace-nowrap">{e.range}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-navy-light leading-relaxed">{note}</p>
    </section>
  );
}
