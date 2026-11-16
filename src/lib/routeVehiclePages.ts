import { vehicles, type Vehicle } from './vehicles';
import { routePages, type RoutePage } from './routes';
import { tripFare, oneWayKm } from './sampleFares';
import type { Faq } from '@/components/FaqAccordion';

/**
 * "Bangalore to <place> <vehicle> price" pages: one per route × vehicle family.
 *
 * Each page's content is COMPUTED from the same data the rest of the site uses
 * (per-km rate, minimum km/day, driver bata, route distance) — the fare table,
 * per-person cost, cost-by-trip-length table and the FAQ answers all differ for
 * every route and every vehicle family because the numbers do. There is no
 * hand-written template paragraph with a place name swapped in.
 */
export type FareGroupKey = 'tempo-traveller' | 'urbania';

export interface FareGroup {
  key: FareGroupKey;
  /** Used in H1 / body copy. */
  label: string;
  vehicleIds: string[];
  /** Matching /vehicles/[slug] pages, same order as vehicleIds. */
  vehiclePageSlugs: string[];
}

export const FARE_GROUPS: FareGroup[] = [
  {
    key: 'tempo-traveller',
    label: 'Tempo Traveller',
    vehicleIds: ['luxury-tempo-traveller-9-plus-1', 'tempo-traveller', 'force-tempo-traveller-17-seater'],
    vehiclePageSlugs: ['9-seater-luxury-tempo-traveller-bangalore', 'tempo-traveller-rental-bangalore', '17-seater-tempo-traveller-bangalore'],
  },
  {
    key: 'urbania',
    label: 'Force Urbania',
    vehicleIds: ['force-urbania-9-seater', 'force-urbania-maharaja-12-seater', 'force-urbania-luxury-16-seater'],
    vehiclePageSlugs: ['force-urbania-9-seater-bangalore', 'force-urbania-12-seater-maharaja-bangalore', 'force-urbania-16-seater-luxury-bangalore'],
  },
];

/** Typical trip length used to price each route (days). Stated on the page as an assumption. */
const ROUTE_DAYS: Record<string, number> = {
  'bangalore-to-mysore-cab': 1,
  'bangalore-to-coorg-cab': 2,
  'bangalore-to-ooty-cab': 2,
  'bangalore-to-chikmagalur-cab': 2,
  'bangalore-to-hampi-cab': 3,
  'bangalore-to-tirupati-cab': 2,
  'bangalore-to-pondicherry-cab': 2,
  'bangalore-to-chennai-cab': 2,
  'bangalore-to-hyderabad-cab': 3,
  'bangalore-to-mangalore-cab': 3,
};

export interface FareRow {
  vehicleName: string;
  seats: number;
  seatsDisplay: string;
  rateLabel: string;
  billedKm: number;
  total: number;
  perPerson: number | null;
  pageSlug: string;
}

export interface RouteVehiclePage {
  slug: string;
  routeSlug: string;
  groupKey: FareGroupKey;
  destination: string;
  h1: string;
  title: string;
  metaDescription: string;
  heroSubtitle: string;
  summary: string;
  days: number;
  oneWay: number;
  roundTripKm: number;
  minKm: number;
  bata: number;
  minTotal: number;
  rows: FareRow[];
  /** Cost by trip length for the middle vehicle of the family. */
  lengthVehicleName: string;
  byLength: { days: number; billedKm: number; total: number }[];
  faqs: Faq[];
}

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

function rateLabel(v: Vehicle): string {
  const ac = v.ratePerKmAc ?? v.ratePerKm;
  return v.ratePerKmNonAc ? `${inr(ac)} AC / ${inr(v.ratePerKmNonAc)} non-AC per km` : `${inr(ac)} per km`;
}

function build(route: RoutePage, group: FareGroup): RouteVehiclePage | null {
  const days = ROUTE_DAYS[route.slug] ?? 2;
  const oneWay = oneWayKm(route);
  const vs = group.vehicleIds.map((id) => vehicles.find((v) => v.id === id));
  if (vs.some((v) => !v) || !Number.isFinite(oneWay)) return null;

  const rows: FareRow[] = [];
  let roundTripKm = 0;
  let minKm = 0;
  let bata = 0;
  group.vehicleIds.forEach((id, i) => {
    const v = vs[i] as Vehicle;
    const f = tripFare(v, oneWay, days);
    if (!f) return;
    roundTripKm = f.roundTripKm;
    if (i === 1) {
      minKm = f.minKm;
      bata = f.bata;
    }
    rows.push({
      vehicleName: v.name,
      seats: v.seats,
      seatsDisplay: v.seatsDisplay ?? `${v.seats} Seater`,
      rateLabel: rateLabel(v),
      billedKm: f.billedKm,
      total: f.total,
      perPerson: f.perPerson,
      pageSlug: group.vehiclePageSlugs[i],
    });
  });
  if (rows.length !== group.vehicleIds.length) return null;

  const d = route.destination;
  const shortLabel = group.key === 'tempo-traveller' ? 'Tempo Traveller' : 'Urbania';
  const base = `Bangalore to ${d} ${shortLabel}`;
  const title = base.length + 6 <= 44 ? `${base} Price` : base;
  const minTotal = Math.min(...rows.map((r) => r.total));
  const slug = `${route.slug.replace(/-cab$/, '')}-${group.key}`;

  const mid = vs[1] as Vehicle;
  const byLength = [1, 2, 3].map((n) => {
    const f = tripFare(mid, oneWay, n)!;
    return { days: n, billedKm: f.billedKm, total: f.total };
  });

  const sizes = rows.map((r) => `${r.seatsDisplay.toLowerCase()} about ${inr(r.total)}`);
  const durationLc = route.duration.replace(/^Approx\.\s*/i, 'about ');

  const faqs: Faq[] = [
    {
      question: `How much does a ${group.label} cost from Bangalore to ${d}?`,
      answer: `For a ${days}-day round trip of about ${roundTripKm} km, the ${sizes.join(', the ')}. These exclude tolls, parking, permits and GST.`,
    },
    {
      question: `How is the Bangalore to ${d} fare calculated?`,
      answer: `Billed distance is the larger of the round trip (${roundTripKm} km) and ${minKm} km per day for ${days} day${days > 1 ? 's' : ''}, which is ${rows[1].billedKm} km for the ${rows[1].seatsDisplay.toLowerCase()}. That is multiplied by the per-km rate, and the driver bata of ${inr(bata)} per day is added.`,
    },
    {
      question: `Which ${group.label} size is the best value for ${d}?`,
      answer: `Per person, a well-filled vehicle costs least: ${rows
        .filter((r) => r.perPerson !== null)
        .map((r) => `about ${inr(r.perPerson as number)} each in the ${r.seatsDisplay.toLowerCase()}`)
        .join(', ')} if every seat is taken. Choose the smallest size that seats your group with luggage.`,
    },
    {
      question: `How many days should I plan for ${d}?`,
      answer: `We priced a ${days}-day trip. ${d} is about ${oneWay} km each way (${durationLc}). A shorter plan still bills ${minKm} km per day, and each extra day adds ${minKm} km plus the daily bata — see the cost-by-trip-length table above.`,
    },
  ];

  return {
    slug,
    routeSlug: route.slug,
    groupKey: group.key,
    destination: d,
    h1: `Bangalore to ${d} ${group.label} on Rent`,
    title,
    metaDescription: `Bangalore to ${d} ${shortLabel} from ${inr(minTotal)} for a ${days}-day round trip (${oneWay} km each way). Rates for 3 sizes with per-person cost.`,
    heroSubtitle: `Round-trip ${group.label} fares from Bangalore to ${d}, worked out from our per-km rates — from ${inr(minTotal)} for a ${days}-day trip.`,
    summary: `Bangalore to ${d} is about ${oneWay} km each way (${durationLc}). The fares below assume a ${days}-day round trip and are worked out from our published per-km rates, the ${minKm} km-per-day minimum and the daily driver bata, so you can see the cost before you call.`,
    days,
    oneWay,
    roundTripKm,
    minKm,
    bata,
    minTotal,
    rows,
    lengthVehicleName: (vs[1] as Vehicle).name,
    byLength,
    faqs,
  };
}

export const routeVehiclePages: RouteVehiclePage[] = routePages.flatMap((r) =>
  FARE_GROUPS.map((g) => build(r, g)).filter((p): p is RouteVehiclePage => p !== null),
);

export function getRouteVehiclePage(slug: string): RouteVehiclePage | undefined {
  return routeVehiclePages.find((p) => p.slug === slug);
}

export function routeVehiclePagesFor(routeSlug: string): RouteVehiclePage[] {
  return routeVehiclePages.filter((p) => p.routeSlug === routeSlug);
}

/** Which fare family a vehicle page belongs to, from its vehicle ids. */
export function fareGroupForVehicleIds(ids: string[]): FareGroup | undefined {
  return FARE_GROUPS.find((g) => g.vehicleIds.some((id) => ids.includes(id)));
}

export function routeVehiclePagesForGroup(groupKey: FareGroupKey): RouteVehiclePage[] {
  return routeVehiclePages.filter((p) => p.groupKey === groupKey);
}
