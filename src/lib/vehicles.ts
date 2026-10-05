export interface Vehicle {
  id: string;
  name: string;
  type: 'Sedan' | 'SUV' | 'Minivan' | 'Tempo Traveller' | 'Luxury' | 'Bus' | string;
  seats: number;
  ac: boolean;
  luggage: number;
  ratePerKm: number;
  features: string[];
  image: string;
  images?: string[];
  imageFit?: 'cover' | 'contain';
  imageFits?: ('cover' | 'contain')[];
  imagePositions?: string[];
  imageScales?: number[];
  video?: string;
  videoPoster?: string;
  description: string;
  sortOrder?: number;

  // Custom properties for group & luxury vehicles
  driverBata?: number;
  minKmPerDay?: number;
  ratePerKmAc?: number;
  ratePerKmNonAc?: number;
  acOnly?: boolean;
  hasNonAcOption?: boolean;
  drivingHours?: string;
  priceDisplay?: string;
  seatsDisplay?: string;
}

// ---------------------------------------------------------------------------
// Confirmed pricing sheet (owner-confirmed, 2026-08-16 pass — see NOTES.md
// section "Fleet pricing reconciliation" for the full per-vehicle mapping).
//
// Shared terms across every priced tier below:
//   - Minimum running: 300 km/day
//   - Standard duty timing: 6:00 AM - 10:00 PM (extra driver bata applies for
//     driving after 10:00 PM)
//   - Toll, parking, permit and state taxes are additional (not included in
//     the rate)
// ---------------------------------------------------------------------------
export const MIN_KM_PER_DAY = 300;
export const STANDARD_DUTY_HOURS = '6:00 AM – 10:00 PM';

// Per-tier rate/km and driver bata, exactly as confirmed by the owner.
// Nothing here is invented — a tier not in this sheet (Innova Hycross, the
// two bus entries) stays "Price on Request" with no ratePerKm.
//
// tempoTravellerAc / luxuryTempoTraveller9Plus1 / tempoTraveller17SeaterAc /
// tempoTraveller17SeaterNonAc bata & rates updated 2026-08-25 on the owner's
// explicit instruction to match published market rates from a reference
// competitor site (Yogi Tours & Travels) for the 9/12/17-seater Tempo
// Traveller tiers — a deliberate pricing-strategy decision, not a guess.
// The 17-seater Non-AC rate (₹28/km) was added later, directly from the
// owner rather than the competitor reference.
const PRICING = {
  sedan: { ratePerKm: 13, driverBata: 400 },
  innova: { ratePerKm: 17, driverBata: 400 },
  innovaCrysta: { ratePerKm: 19, driverBata: 400 },
  tempoTravellerAc: { ratePerKm: 22, driverBata: 700 },
  tempoTravellerNonAc: { ratePerKm: 20, driverBata: 700 },
  luxuryTempoTraveller9Plus1: { ratePerKm: 28, driverBata: 500 },
  tempoTraveller17SeaterAc: { ratePerKm: 30, driverBata: 700 },
  tempoTraveller17SeaterNonAc: { ratePerKm: 28, driverBata: 700 },
  forceUrbaniaLuxury16: { ratePerKm: 38, driverBata: 700 },
} as const;

/**
 * Computes the minimum estimated daily charge for a vehicle:
 *   ratePerKm * (minKmPerDay ?? 300) + (driverBata ?? 0)
 * Returns null when there is no confirmed rate to compute from (vehicle is
 * priced "Price on Request" or has ratePerKm of 0) — never invents a number.
 * This is the single source of truth for the computed total; nowhere in the
 * app should this total be hardcoded as a literal.
 */
export function getMinimumDailyTotal(vehicle: Vehicle): number | null {
  if (vehicle.priceDisplay || !vehicle.ratePerKm) return null;
  const km = vehicle.minKmPerDay ?? MIN_KM_PER_DAY;
  const bata = vehicle.driverBata ?? 0;
  return vehicle.ratePerKm * km + bata;
}

/**
 * Sorts vehicles alphabetically by their displayed `name`, case-insensitive
 * and locale-aware.
 */
export function sortVehiclesByName<T extends { name: string }>(list: T[]): T[] {
  return [...list].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  );
}

// Category display order: cars first, then group vehicles by rising capacity.
const CATEGORY_RANK: Record<string, number> = { Sedan: 0, SUV: 0, 'Tempo Traveller': 1, Bus: 2 };

/**
 * Fleet display order: cars (Sedan/SUV) first sorted A–Z, then Tempo
 * Travellers and Buses sorted by ascending seat count (ties broken A–Z).
 * Use this for the public Fleet grid; use sortVehiclesByName elsewhere.
 */
export function sortVehiclesForDisplay<T extends { name: string; type: string; seats: number }>(
  list: T[]
): T[] {
  return [...list].sort((a, b) => {
    const rankA = CATEGORY_RANK[a.type] ?? 3;
    const rankB = CATEGORY_RANK[b.type] ?? 3;
    if (rankA !== rankB) return rankA - rankB;
    if (rankA === 0) return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
    if (a.seats !== b.seats) return a.seats - b.seats;
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
  });
}

export const vehicles: Vehicle[] = [
  // ---------------------------------------------------------------------
  // Tempo Traveller — merged AC/Non-AC into a single card (was two nearly
  // identical listings sharing the same photos; hasNonAcOption + separate
  // ratePerKmAc/ratePerKmNonAc already exists on the Vehicle type and
  // VehicleCard for exactly this case, so both confirmed rates still show).
  // ---------------------------------------------------------------------
  {
    id: 'tempo-traveller',
    name: '12 Seater Tempo Traveller',
    type: 'Tempo Traveller',
    seats: 12,
    seatsDisplay: '12 Seater',
    ac: true,
    hasNonAcOption: true,
    luggage: 8,
    ratePerKm: PRICING.tempoTravellerAc.ratePerKm,
    ratePerKmAc: PRICING.tempoTravellerAc.ratePerKm,
    ratePerKmNonAc: PRICING.tempoTravellerNonAc.ratePerKm,
    driverBata: PRICING.tempoTravellerAc.driverBata,
    minKmPerDay: MIN_KM_PER_DAY,
    drivingHours: STANDARD_DUTY_HOURS,
    features: [
      'Pushback reclining seats with extra legroom',
      'Available in AC or Non-AC configuration',
      'USB charging points at every seat row',
      'Dedicated rear luggage boot for group baggage',
      'Reading lights, curtains & music system',
      'Best for small families and close friend groups',
    ],
    // Card front image: force-traveller-c-front-03.webp is a cropped version
    // of the Yaksha front-02 photo (owner-requested crop, 2026-08-25) — tight
    // on the van, no sky/ground. The old "-side-01" file was renamed to
    // "-interior-04" since it was actually an interior shot, not a side
    // view — that mislabel was why VehicleCard's side-view auto-pick was
    // showing an interior seat photo as the card thumbnail.
    image: '/fleet/force-traveller-c-front-03.webp',
    images: [
      '/fleet/force-traveller-c-front-03.webp',
      '/fleet/force-traveller-c-front-01.webp',
      '/fleet/force-traveller-c-front-02.webp',
      '/fleet/force-traveller-c-interior-01.webp',
      '/fleet/force-traveller-c-interior-02.webp',
      '/fleet/force-traveller-c-interior-03.webp',
      '/fleet/force-traveller-c-interior-04.webp',
      '/fleet/force-traveller-c-rear-02.webp',
    ],
    description:
      'Our Tempo Traveller is the ideal pick for small family holidays, weekend getaways, and close-friend group trips out of Bangalore — available in AC or Non-AC, with comfortable pushback seating and a dedicated luggage boot on both.',
    sortOrder: 1,
  },

  // ---------------------------------------------------------------------
  // 17-Seater Force Tempo Traveller — owner confirmed real (2026-08-20).
  // Real front photo (owner-provided, 2026-08-25) replaces the earlier
  // Yaksha placeholder. Rate/bata set 2026-08-25 per owner instruction to
  // match the reference competitor rate for this tier (see PRICING comment
  // above) — not an invented figure.
  // ---------------------------------------------------------------------
  {
    id: 'force-tempo-traveller-17-seater',
    name: '17-Seater Force Tempo Traveller',
    type: 'Tempo Traveller',
    seats: 17,
    seatsDisplay: '17 Seater',
    ac: true,
    hasNonAcOption: true,
    luggage: 14,
    ratePerKm: PRICING.tempoTraveller17SeaterAc.ratePerKm,
    ratePerKmAc: PRICING.tempoTraveller17SeaterAc.ratePerKm,
    ratePerKmNonAc: PRICING.tempoTraveller17SeaterNonAc.ratePerKm,
    driverBata: PRICING.tempoTraveller17SeaterAc.driverBata,
    minKmPerDay: MIN_KM_PER_DAY,
    drivingHours: STANDARD_DUTY_HOURS,
    features: [
      'Pushback reclining seats with extra legroom',
      'Available in AC or Non-AC configuration',
      'USB charging points at every seat row',
      'Dedicated rear luggage boot for group baggage',
      'Best for large family groups, corporate offsites & pilgrimages',
    ],
    image: '/fleet/force-tempo-traveller-17-seater-side-01.webp',
    images: [
       '/fleet/force-tempo-traveller-17-seater-side-01.webp',
       '/fleet/force-tempo-traveller-17-seater-front-01.webp',
       '/fleet/force-tempo-traveller-17-seater-interior-01.webp',
       '/fleet/force-tempo-traveller-17-seater-interior-02.webp',
    ],
    video: '/videos/force-tempo-traveller-17-seater.mp4',
    videoPoster: '/videos/force-tempo-traveller-17-seater-poster.webp',
    description:
      'Our 17-seater Force Tempo Traveller is built for large groups who need extra capacity for outstation trips, corporate offsites and pilgrimages out of Bangalore — available in AC or Non-AC. Pushback seating and a dedicated luggage boot make it a strong pick for bigger group travel.',
    sortOrder: 2,
  },

  // ---------------------------------------------------------------------
  // 9 Seater Tempo Traveller (9+1 = 10 total seats)
  // Renamed from "Luxury Tempo Traveller 9+1 Seater" on 2026-08-25 per owner
  // instruction. Only the real owner-provided photo (KA03AB2312 at Bengaluru
  // airport) is used — the Yaksha set was removed on 2026-08-25 because the
  // owner confirmed those photos are not this vehicle.
  // Portrait source, so imagePositions biases the crop down onto the van.
  // ---------------------------------------------------------------------
  {
    id: 'luxury-tempo-traveller-9-plus-1',
    name: '9 Seater Tempo Traveller',
    type: 'Tempo Traveller',
    seats: 10,
    seatsDisplay: '9+1 Seater',
    ac: true,
    luggage: 10,
    ratePerKm: PRICING.luxuryTempoTraveller9Plus1.ratePerKm,
    driverBata: PRICING.luxuryTempoTraveller9Plus1.driverBata,
    minKmPerDay: MIN_KM_PER_DAY,
    drivingHours: STANDARD_DUTY_HOURS,
    acOnly: true,
    features: [
      '9+1 premium pushback executive seats',
      'Individual AC vents with ambient cabin lighting',
      'Charging points and mobile holders at each seat',
      'Extra-wide rear boot for group luggage',
      'Large tinted windows for scenic ghat-road views',
      'Best for mid-size family groups, corporate teams & pilgrimage trips',
    ],
    // Added 2026-08-25: 6 real interior photos + 2 more exterior angles
    // (owner-provided) alongside the original airport front photo.
    image: '/fleet/tempo-traveller-9-seater-front-01.webp',
    images: [
      '/fleet/tempo-traveller-9-seater-front-01.webp',
      '/fleet/tempo-traveller-9-seater-front-02.webp',
      '/fleet/tempo-traveller-9-seater-side-01.webp',
      '/fleet/tempo-traveller-9-seater-interior-01.webp',
      '/fleet/tempo-traveller-9-seater-interior-02.webp',
      '/fleet/tempo-traveller-9-seater-interior-03.webp',
      '/fleet/tempo-traveller-9-seater-interior-04.webp',
      '/fleet/tempo-traveller-9-seater-interior-05.webp',
      '/fleet/tempo-traveller-9-seater-interior-06.webp',
    ],
    imagePositions: ['50% 55%', '50% 50%', '50% 50%', '50% 50%', '50% 50%', '50% 50%', '50% 50%', '50% 50%', '50% 50%'],
    description:
      'Our 9 Seater Tempo Traveller (9+1) is built for mid-size groups that want extra comfort on long outstation drives. Executive pushback seats, individual AC vents, and a spacious luggage boot make it a favourite for corporate offsites, pilgrimages, and multi-family trips to Coorg, Mysore, and Ooty.',
    sortOrder: 3,
  },

  // ---------------------------------------------------------------------
  // Urbania 12 Seater Maharaja
  // Renamed from "Force Urbania Maharaja 12-Seater" and switched to
  // "Price on Request" on 2026-08-25 per owner instruction — the confirmed
  // ₹45/km rate was removed rather than displayed alongside a "Price on
  // Request" label. Real owner-provided photos (front + interior) replace
  // the previously-shared force-urbania-* set (that set stays in use by
  // the Luxury 16-Seater entry below, so those shared files were not
  // deleted, only unlinked from this entry).
  // ---------------------------------------------------------------------
  {
    id: 'force-urbania-maharaja-12-seater',
    name: 'Urbania 12 Seater Maharaja',
    type: 'Tempo Traveller',
    seats: 12,
    seatsDisplay: '12 Seater',
    ac: true,
    luggage: 12,
    ratePerKm: 0,
    priceDisplay: 'Price on Request',
    acOnly: true,
    features: [
      '12 luxury captain-style pushback seats',
      'High-roof cabin with stand-up walking space',
      'Powerful roof AC with individual passenger vents',
      'Large rear cargo hold for group luggage',
      'Premium interior lighting & entertainment system',
      'Best for mid-size family groups, corporate offsites & pilgrimages',
    ],
    image: '/fleet/force-urbania-maharaja-12-seater-front-01.webp',
    images: [
      '/fleet/force-urbania-maharaja-12-seater-front-01.webp',
      '/fleet/force-urbania-maharaja-12-seater-interior-01.webp',
    ],
    description:
      'The Urbania 12 Seater Maharaja is the 12-seater trim of our flagship Force Urbania: a high-roof, premium van built for mid-size groups who want extra comfort. Captain seats, strong AC, and a spacious cabin make it a great choice for family holidays and corporate group travel across South India. Call or WhatsApp us for a custom quote.',
    sortOrder: 4,
  },
  {
    id: 'force-urbania-luxury-16-seater',
    name: 'Force Urbania',
    type: 'Tempo Traveller',
    seats: 16,
    seatsDisplay: '16 Seater',
    ac: true,
    luggage: 14,
    ratePerKm: PRICING.forceUrbaniaLuxury16.ratePerKm,
    driverBata: PRICING.forceUrbaniaLuxury16.driverBata,
    minKmPerDay: MIN_KM_PER_DAY,
    drivingHours: STANDARD_DUTY_HOURS,
    acOnly: true,
    features: [
      '16 luxury captain-style pushback seats',
      'High-roof cabin with stand-up walking space',
      'Powerful roof AC with individual passenger vents',
      'Large rear cargo hold for big group luggage',
      'Premium interior lighting & entertainment system',
      'Best for large families, wedding groups, corporate offsites & big pilgrimages',
    ],
    // Card front image is interior-02 (owner-requested, 2026-08-25) — despite
    // the filename it's actually a front exterior shot at a temple, not an
    // interior photo. Moved to the front of the gallery to become the
    // VehicleCard thumbnail (VehicleCard uses images[0], not the `image`
    // field, once a "side" match isn't found).
    image: '/fleet/force-urbania-interior-02.webp',
    images: [
      '/fleet/force-urbania-interior-02.webp',
      '/fleet/force-urbania-front-01.webp',
      '/fleet/force-urbania-front-02.webp',
      '/fleet/force-urbania-interior-01.webp',
      '/fleet/force-urbania-interior-03.webp',
      '/fleet/force-urbania-interior-04.webp',
      '/fleet/force-urbania-interior-05.webp',
      '/fleet/force-urbania-interior-06.webp',
      '/fleet/force-urbania-rear-01.webp',
      '/fleet/force-urbania-rear-02.webp',
    ],
    description:
      'Our flagship Force Urbania is the largest and most premium van in the fleet: a full 16-seater built for big groups who refuse to compromise on comfort. High-roof cabin space, captain seats, and strong AC make it the top choice for large family holidays, wedding transportation, and corporate group travel across South India.',
    sortOrder: 5,
  },

  // ---------------------------------------------------------------------
  // Sedans — both priced under the confirmed Sedan tier (₹13/km, ₹400 bata)
  // ---------------------------------------------------------------------
  {
    id: 'toyota-etios',
    name: 'Toyota Etios',
    type: 'Sedan',
    seats: 4,
    seatsDisplay: '4 Seater',
    ac: true,
    luggage: 3,
    ratePerKm: PRICING.sedan.ratePerKm,
    driverBata: PRICING.sedan.driverBata,
    minKmPerDay: MIN_KM_PER_DAY,
    drivingHours: STANDARD_DUTY_HOURS,
    acOnly: true,
    features: [
      'Compact AC sedan for city & local drops',
      'Comfortable seating for up to 4 passengers',
      'Boot space for 2-3 medium suitcases',
      'Fuel-efficient for short outstation runs',
      'Ideal for airport transfers & solo/couple travel',
    ],
    image: '/fleet/etios-front-01.webp',
    images: [
      '/fleet/etios-front-01.webp',
      '/fleet/etios-side-01.webp',
      '/fleet/etios-interior-01.webp',
      '/fleet/etios-interior-02.webp',
      '/fleet/etios-rear-01.webp',
    ],
    description:
      'The Toyota Etios is a reliable, air-conditioned sedan best suited for local city drops, airport pickups, and quick point-to-point trips around Bangalore. A practical, comfortable choice when you need a smaller car rather than a group vehicle.',
    sortOrder: 6,
  },
  {
    id: 'maruti-dzire',
    name: 'Maruti Suzuki Dzire',
    type: 'Sedan',
    seats: 4,
    seatsDisplay: '4 Seater',
    ac: true,
    luggage: 3,
    ratePerKm: PRICING.sedan.ratePerKm,
    driverBata: PRICING.sedan.driverBata,
    minKmPerDay: MIN_KM_PER_DAY,
    drivingHours: STANDARD_DUTY_HOURS,
    acOnly: true,
    features: [
      'Comfortable AC sedan with a smooth ride',
      'Spacious boot for luggage on short trips',
      'Great for solo travellers, couples & small families',
      'Well-maintained dashboard and interiors',
      'Ideal for local sightseeing & airport transfers',
    ],
    image: '/fleet/dzire-front-01.webp',
    images: [
      '/fleet/dzire-front-01.webp',
      '/fleet/dzire-dashboard-01.webp',
      '/fleet/dzire-interior-01.webp',
      '/fleet/dzire-interior-02.webp',
    ],
    description:
      'The Maruti Suzuki Dzire is a comfortable, fuel-efficient sedan ideal for local Bangalore drops, airport transfers, and short point-to-point journeys where a full group vehicle is not required.',
    sortOrder: 7,
  },

  // ---------------------------------------------------------------------
  // SUVs — Toyota Innova tier (₹17/km) and Toyota Innova Crysta tier
  // (₹19/km) now priced per the confirmed sheet. Innova Hycross has no
  // confirmed rate and stays "Price on Request".
  // ---------------------------------------------------------------------
  {
    id: 'toyota-innova-2011',
    name: 'Toyota Innova',
    type: 'SUV',
    seats: 7,
    seatsDisplay: '7 Seater',
    ac: true,
    luggage: 5,
    ratePerKm: PRICING.innova.ratePerKm,
    driverBata: PRICING.innova.driverBata,
    minKmPerDay: MIN_KM_PER_DAY,
    drivingHours: STANDARD_DUTY_HOURS,
    acOnly: true,
    features: [
      'Spacious 7-seater cabin with 3 rows',
      'Trusted, rugged SUV build for highway trips',
      'AC cooling across all rows',
      'Good luggage capacity for family trips',
      'Well suited for outstation road trips & pilgrimages',
    ],
    // "-front-01" was actually an interior seat-cover photo (mislabeled) —
    // renamed to "-interior-04" on 2026-08-25. Real front card image is
    // "-front-02" per owner confirmation (owner's own vehicle).
    image: '/fleet/innova-2011-front-02.webp',
    images: [
      '/fleet/innova-2011-front-02.webp',
      '/fleet/innova-2011-dashboard-01.webp',
      '/fleet/innova-2011-interior-01.webp',
      '/fleet/innova-2011-interior-02.webp',
      '/fleet/innova-2011-interior-03.webp',
      '/fleet/innova-2011-interior-04.webp',
      '/fleet/innova-2011-interior-08.webp',
    ],
    description:
      'A dependable, well-maintained Toyota Innova offering spacious 7-seater comfort for family outstation trips, pilgrimages, and highway journeys, at our standard Toyota Innova tier rate.',
    sortOrder: 8,
  },
  {
    id: 'toyota-innova-crysta',
    name: 'Toyota Innova Crysta',
    type: 'SUV',
    seats: 7,
    seatsDisplay: '7 Seater',
    ac: true,
    luggage: 5,
    ratePerKm: PRICING.innovaCrysta.ratePerKm,
    driverBata: PRICING.innovaCrysta.driverBata,
    minKmPerDay: MIN_KM_PER_DAY,
    drivingHours: STANDARD_DUTY_HOURS,
    acOnly: true,
    features: [
      'Premium 7-seater SUV with plush captain seats',
      'Superior ride quality on highways & ghat roads',
      'Individual AC vents for rear passengers',
      'Spacious boot for full family luggage',
      'Popular choice for family holidays & corporate travel',
    ],
    image: '/fleet/innova-crysta-front-01.webp',
    images: [
      '/fleet/innova-crysta-front-01.webp',
      '/fleet/innova-crysta-dashboard-01.webp',
      '/fleet/innova-crysta-rear-01.webp',
    ],
    description:
      'The Toyota Innova Crysta delivers a premium SUV experience with plush captain seating and a smooth ride, making it a favourite for family holidays, corporate travel, and comfortable outstation road trips to Coorg, Ooty, and beyond.',
    sortOrder: 9,
  },
  {
    id: 'toyota-innova-hycross',
    name: 'Toyota Innova Hycross',
    type: 'SUV',
    seats: 7,
    seatsDisplay: '7 Seater',
    ac: true,
    luggage: 5,
    ratePerKm: 0,
    priceDisplay: 'Price on Request',
    acOnly: true,
    features: [
      'Latest-generation Innova with modern interiors',
      'Comfortable captain seats with premium upholstery',
      'Strong AC performance for long summer drives',
      'Generous boot space for family luggage',
      'Top pick for premium family & corporate outstation trips',
    ],
    image: '/fleet/innova-hycross-front-01.webp',
    images: [
      '/fleet/innova-hycross-front-01.webp',
      '/fleet/innova-hycross-front-02.webp',
      '/fleet/innova-hycross-interior-01.webp',
      '/fleet/innova-hycross-interior-02.webp',
      '/fleet/innova-hycross-interior-03.webp',
    ],
    description:
      'Our newest SUV addition, the Toyota Innova Hycross combines modern styling with premium interior comfort, ideal for families and corporate clients who want the latest generation Innova experience on their outstation trip.',
    sortOrder: 10,
  },
  {
    id: 'toyota-fortuner',
    name: 'Toyota Fortuner',
    type: 'SUV',
    seats: 7,
    seatsDisplay: '7 Seater',
    ac: true,
    luggage: 5,
    ratePerKm: 0,
    priceDisplay: 'Price on Request',
    acOnly: true,
    features: [
      'Premium full-size SUV with commanding road presence',
      'Plush captain-style seating across 3 rows',
      'Strong AC performance for long highway drives',
      'Generous ground clearance for hill & ghat routes',
      'Top pick for premium family, corporate & VIP outstation trips',
    ],
    image: '/toyota-fortuner.webp',
    images: ['/toyota-fortuner.webp'],
    description:
      'The Toyota Fortuner is our premium full-size SUV option, offering a commanding ride and plush 7-seater comfort for clients who want an extra step up for family holidays, corporate travel, or VIP outstation trips.',
    sortOrder: 11,
  },

  // ---------------------------------------------------------------------
  // Buses / Coaches
  // ---------------------------------------------------------------------
  // 25 Seater Mini Bus — real owner-provided photos, 2026-08-25, replacing
  // both the former "Sushi Mini Bus" (sgr-mini-coach) and "21-Seater Bus"
  // entries, which were removed outright per owner instruction rather than
  // just re-photographed. The shared coach-sgr-* placeholder set those two
  // used is now unreferenced anywhere and was deleted from public/fleet.
  // Front card image has another operator's ("AADHYA") name blurred out
  // where it was painted across the windshield; interior/side shots carry
  // no readable branding and were left untouched.
  // ---------------------------------------------------------------------
  {
    id: 'sushi-travels-25-seater-mini-bus',
    name: '25 Seater Mini Bus',
    type: 'Bus',
    seats: 25,
    seatsDisplay: '25 Seater',
    ac: true,
    luggage: 22,
    ratePerKm: 0,
    priceDisplay: 'Price on Request',
    acOnly: true,
    features: [
      'AC pushback seating for 25 passengers',
      'Overhead luggage racks plus rear cargo hold',
      'PA/music system for group announcements',
      'Suited for corporate offsites, school/college trips & pilgrimage groups',
      'Custom quote based on route, duration & group size',
    ],
    image: '/fleet/sushi-travels-25-seater-mini-bus-front-01.webp',
    images: [
      '/fleet/sushi-travels-25-seater-mini-bus-front-01.webp',
      '/fleet/sushi-travels-25-seater-mini-bus-front-02.webp',
      '/fleet/sushi-travels-25-seater-mini-bus-side-01.webp',
      '/fleet/sushi-travels-25-seater-mini-bus-interior-01.webp',
      '/fleet/sushi-travels-25-seater-mini-bus-interior-02.webp',
      '/fleet/sushi-travels-25-seater-mini-bus-interior-03.webp',
    ],
    description:
      'Our 25-seater mini bus is built for mid-to-large groups — corporate offsites, school and college trips, and pilgrimage groups travelling together in one AC vehicle. Pricing is quoted per trip based on route, duration and group size.',
    sortOrder: 11,
  },
  // ---------------------------------------------------------------------
  // Sushi Travels - 50 Seater Bus — real owner-provided photos, 2026-08-25,
  // replacing the previously-shared coach-sgr-* placeholder set (that set
  // was also used by the Sushi Mini Bus / 21-Seater Bus entries, both since
  // removed — see the 25 Seater Mini Bus entry above). Interior shots were
  // initially blurred to hide another operator's "AADHYA" branding, then re-sent unblurred
  // and swapped in per owner instruction (2026-08-25) — filenames bumped
  // to "-v2" since these paths are served with an immutable cache header.
  // A front-fascia shot with the same branding painted directly on the
  // body was dropped rather than used — too much of the frame was
  // branding for a usable photo. The clean side-view shot carries no
  // visible branding and leads the gallery.
  // ---------------------------------------------------------------------
  {
    id: 'bus-50-seater',
    name: 'Sushi Travels - 50 Seater Bus',
    type: 'Bus',
    seats: 50,
    seatsDisplay: '50 Seater',
    ac: true,
    luggage: 40,
    ratePerKm: 0,
    priceDisplay: 'Price on Request',
    acOnly: true,
    features: [
      'Full-size AC pushback seating for 50 passengers',
      'Large overhead luggage racks plus rear cargo hold',
      'PA/music system for group announcements',
      'Suited for large corporate events, weddings & big pilgrimage groups',
      'Custom quote based on route, duration & group size',
    ],
    image: '/fleet/sushi-travels-50-seater-bus-side-01.webp',
    images: [
      '/fleet/sushi-travels-50-seater-bus-side-01.webp',
      '/fleet/sushi-travels-50-seater-bus-interior-01-v2.webp',
      '/fleet/sushi-travels-50-seater-bus-interior-02-v2.webp',
    ],
    description:
      'Our largest-capacity vehicle, the Sushi Travels 50 Seater Bus is built for large corporate events, weddings, and big pilgrimage or group tours that need everyone travelling together in one AC vehicle. Pricing is quoted per trip based on route, duration and group size.',
    sortOrder: 13,
  },

  // ---------------------------------------------------------------------
  // Volvo Bus 45 Seater Luxury — owner-provided photos, 2026-08-25.
  // Interior photos have another operator's seat-cover branding blurred out
  // per owner instruction (the exterior body carries no readable text, so
  // those 4 shots were left untouched). No confirmed rate — Price on Request.
  // ---------------------------------------------------------------------
  {
    id: 'volvo-bus-45-seater-luxury',
    name: 'Volvo Bus 45 Seater Luxury',
    type: 'Bus',
    seats: 45,
    seatsDisplay: '45 Seater',
    ac: true,
    luggage: 45,
    ratePerKm: 0,
    priceDisplay: 'Price on Request',
    acOnly: true,
    features: [
      'Full-size Volvo luxury coach for large groups',
      'Pushback reclining seats with curtains at every window',
      'Roof-mounted AC across the full cabin',
      'Large underbelly luggage hold for group baggage',
      'Suited for large corporate events, weddings & big pilgrimage groups',
      'Custom quote based on route, duration & group size',
    ],
    image: '/fleet/volvo-bus-45-seater-front-01.webp',
    images: [
      '/fleet/volvo-bus-45-seater-front-01.webp',
      '/fleet/volvo-bus-45-seater-front-02.webp',
      '/fleet/volvo-bus-45-seater-side-01.webp',
      '/fleet/volvo-bus-45-seater-side-02.webp',
      '/fleet/volvo-bus-45-seater-interior-01-v2.webp',
      '/fleet/volvo-bus-45-seater-interior-02-v2.webp',
      '/fleet/volvo-bus-45-seater-interior-03-v2.webp',
      '/fleet/volvo-bus-45-seater-interior-04-v2.webp',
    ],
    description:
      'Our Volvo Bus 45 Seater Luxury is a full-size Volvo coach built for large corporate events, weddings, and big pilgrimage or group tours that need everyone travelling together in one premium AC vehicle. Pricing is quoted per trip based on route, duration and group size.',
    sortOrder: 14,
  },

  // ---------------------------------------------------------------------
  // Sushi Travels - 33 Seater Bus Luxury — owner-provided photos,
  // 2026-08-25. Front exterior shots have another operator's ("SHANVI")
  // name blurred out where it was painted across the windshield; interior
  // shots carry no readable branding and were left untouched. No confirmed
  // rate — Price on Request.
  // ---------------------------------------------------------------------
  {
    id: 'sushi-travels-33-seater-bus-luxury',
    name: '33 Seater Bus Luxury',
    type: 'Bus',
    seats: 33,
    seatsDisplay: '33 Seater',
    ac: true,
    luggage: 30,
    ratePerKm: 0,
    priceDisplay: 'Price on Request',
    acOnly: true,
    features: [
      'Full-size luxury coach for large groups',
      'Pushback reclining seats with curtains at every window',
      'Roof-mounted AC across the full cabin',
      'Large underbelly luggage hold for group baggage',
      'Suited for large corporate events, weddings & big pilgrimage groups',
      'Custom quote based on route, duration & group size',
    ],
    image: '/fleet/sushi-travels-33-seater-bus-luxury-front-01.webp',
    images: [
      '/fleet/sushi-travels-33-seater-bus-luxury-front-01.webp',
      '/fleet/sushi-travels-33-seater-bus-luxury-front-02.webp',
      '/fleet/sushi-travels-33-seater-bus-luxury-interior-01.webp',
      '/fleet/sushi-travels-33-seater-bus-luxury-interior-02.webp',
    ],
    description:
      'Our 33 Seater Bus Luxury is a full-size luxury coach built for large corporate events, weddings, and big pilgrimage or group tours that need everyone travelling together in one premium AC vehicle. Pricing is quoted per trip based on route, duration and group size.',
    sortOrder: 15,
  },
];
