import type { Vehicle } from './vehicles';
import { MIN_KM_PER_DAY } from './vehicles';
import { routePages } from './routes';

/**
 * Worked trip-cost examples, computed from the SAME confirmed per-km rate,
 * minimum km/day and driver bata that the vehicle page already shows — nothing
 * is hand-typed, so it can never disagree with the rate table.
 *
 *   billed km = max(round-trip km, minimum km per day × days)
 *   total     = billed km × rate + driver bata × days
 *
 * Tolls, parking, permits/entry fees, night allowance and GST are NOT included
 * (they are billed at actuals — see the terms page), and the page says so.
 */
const SAMPLE_TRIPS: { routeSlug: string; days: number; label: string }[] = [
  { routeSlug: 'bangalore-to-mysore-cab', days: 1, label: 'Bangalore – Mysore – Bangalore' },
  { routeSlug: 'bangalore-to-coorg-cab', days: 2, label: 'Bangalore – Coorg – Bangalore' },
  { routeSlug: 'bangalore-to-ooty-cab', days: 2, label: 'Bangalore – Ooty – Bangalore' },
  { routeSlug: 'bangalore-to-chikmagalur-cab', days: 2, label: 'Bangalore – Chikmagalur – Bangalore' },
];

export interface SampleFareRow {
  trip: string;
  days: number;
  roundTripKm: number;
  billedKm: number;
  total: number;
  perPerson: number | null;
}

/** The per-km rate a vehicle is sold at (AC rate when it has both), or null if there is no confirmed rate. */
export function confirmedRate(v: Vehicle): number | null {
  if (v.priceDisplay) return null;
  const r = v.ratePerKmAc ?? v.ratePerKm;
  return r && r > 0 ? r : null;
}

export function getSampleFares(v: Vehicle): { rate: number; bata: number; minKm: number; rows: SampleFareRow[] } | null {
  const rate = confirmedRate(v);
  if (rate === null) return null;
  const bata = v.driverBata ?? 0;
  const minKm = v.minKmPerDay ?? MIN_KM_PER_DAY;
  const rows: SampleFareRow[] = [];
  for (const t of SAMPLE_TRIPS) {
    const route = routePages.find((r) => r.slug === t.routeSlug);
    const oneWay = route ? parseInt(route.distance.replace(/[^0-9]/g, ''), 10) : NaN;
    if (!Number.isFinite(oneWay)) continue;
    const roundTripKm = oneWay * 2;
    const billedKm = Math.max(roundTripKm, minKm * t.days);
    const total = billedKm * rate + bata * t.days;
    rows.push({
      trip: t.label,
      days: t.days,
      roundTripKm,
      billedKm,
      total,
      perPerson: v.seats >= 7 ? Math.round(total / v.seats) : null,
    });
  }
  return rows.length ? { rate, bata, minKm, rows } : null;
}
