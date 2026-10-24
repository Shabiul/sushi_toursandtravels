import { Faq } from '@/components/FaqAccordion';

export interface ServicePage {
  slug: string;
  h1: string;
  title: string;
  metaDescription: string;
  heroSubtitle: string;
  heroImage: string;
  geoSummary: string;
  bodyParagraphs: string[];
  faqs: Faq[];
  relatedVehicleSlugs: string[];
  relatedServiceSlugs: string[];
  relatedRouteSlugs?: string[];
  relatedLocationSlugs?: string[];
}

export const servicePages: ServicePage[] = [
  {
    slug: 'bangalore-airport-taxi',
    h1: 'Bangalore Airport Taxi Service',
    title: 'Bangalore Airport Taxi Service',
    metaDescription:
      'Chauffeur-driven airport taxi in Bangalore for Kempegowda International Airport (BLR) pickup & drop. Sedans, SUVs & group vehicles. Flight-time tracking on request.',
    heroSubtitle:
      'Reliable pickup and drop to and from Kempegowda International Airport (BLR), in a vehicle sized to your group.',
    heroImage: '/fleet/etios-front-01.webp',
    geoSummary:
      'Sushi Travels provides chauffeur-driven airport taxi service in Bangalore, covering pickup and drop to Kempegowda International Airport (BLR) for solo travellers, families and groups. Vehicle options range from AC sedans to Tempo Travellers and Force Urbania vans, each with its own confirmed per-km rate and a 300 km/day minimum billing where applicable.',
    bodyParagraphs: [
      'Airport transfers are one of our most frequent bookings — early-morning and late-night flights, business travellers who need a punctual pickup, and families arriving with a full set of luggage who want one vehicle instead of splitting into two cabs.',
      'For solo travellers or couples, a sedan (Toyota Etios or Maruti Suzuki Dzire) is the most economical option. Families of five to seven usually prefer the Toyota Innova or Innova Crysta for extra luggage room. Larger groups arriving together — extended families, wedding parties, or corporate teams — can book a Tempo Traveller or Force Urbania van and travel from the airport in one vehicle.',
      'Because Kempegowda Airport is well outside the city core, we recommend booking in advance and sharing your flight number so pickup timing can be adjusted for early landings or delays. Toll charges on the airport road are billed at actuals as per our standard terms.',
    ],
    faqs: [
      {
        question: 'Which vehicle should I book for airport pickup?',
        answer:
          'A sedan works well for one or two passengers with standard luggage. Families of five or more, or anyone with extra bags, are usually better off with an Innova or Innova Crysta. Groups of eight or more should book a Tempo Traveller or Force Urbania.',
      },
      {
        question: 'Do you track flight delays for pickup?',
        answer:
          'Yes — share your flight number when booking and our dispatch team will adjust the pickup timing for early or delayed landings on request.',
      },
      {
        question: 'Are tolls included in the airport taxi fare?',
        answer:
          'No, tolls, parking and permit charges are additional and billed at actuals, in line with our standard rental terms across the fleet.',
      },
      {
        question: 'Can I book a one-way airport drop only?',
        answer:
          'Yes, one-way airport drop and pickup are both available — you don\'t need to book a round trip for an airport transfer.',
      },
    ],
    relatedVehicleSlugs: ['sedan-rental-bangalore', 'innova-rental-bangalore', 'tempo-traveller-rental-bangalore'],
    relatedServiceSlugs: ['local-taxi-bangalore', 'outstation-cab-bangalore', 'corporate-transport-bangalore'],
  },
  {
    slug: 'outstation-cab-bangalore',
    h1: 'Outstation Cab Service from Bangalore',
    title: 'Outstation Cab Service Bangalore',
    metaDescription:
      'Book an outstation cab from Bangalore with a verified chauffeur — sedans, SUVs, Tempo Travellers & buses for round trips to Mysore, Coorg, Ooty and beyond.',
    heroSubtitle:
      'Round-trip outstation cab rental from Bangalore with a verified chauffeur — every vehicle class, every South India route.',
    heroImage: '/fleet/innova-crysta-front-01.webp',
    geoSummary:
      'Sushi Travels operates outstation cab service from Bangalore for round-trip travel across South India, with a fleet ranging from sedans to Tempo Travellers, Force Urbania vans and buses. Every confirmed vehicle tier has a 300 km/day minimum billing and standard 6:00 AM–10:00 PM duty, with driver food/lodging built into the per-km rate.',
    bodyParagraphs: [
      'Most of our outstation bookings are round trips to well-known South India getaways — hill stations like Coorg, Ooty and Chikmagalur, heritage destinations like Mysore and Hampi, pilgrimage routes to Tirupati, and coastal escapes to Pondicherry.',
      'The right vehicle depends on group size and route: sedans and Innovas suit smaller families on shorter routes, while Tempo Travellers and Force Urbania vans are better for larger groups covering longer ghat-road distances comfortably. For very large groups (school trips, corporate offsites, big pilgrimage parties), our bus tiers are available on a per-trip quote.',
      'Every outstation booking includes a verified, experienced driver familiar with highway and hill-road conditions, and mileage is calculated depot-to-depot per our standard terms. See our dedicated route pages below for distance, duration and vehicle guidance on specific destinations.',
    ],
    faqs: [
      {
        question: 'Is outstation pricing per km or a fixed package?',
        answer:
          'Pricing is per km based on the vehicle you choose, with a 300 km/day minimum billing distance for confirmed-rate vehicles, plus driver bata, tolls, parking and permits at actuals.',
      },
      {
        question: 'Do you offer one-way outstation trips or only round trips?',
        answer:
          'We primarily operate round-trip outstation bookings, though one-way and multi-day itineraries can be arranged — mention your exact plan when enquiring.',
      },
      {
        question: 'Which vehicle is best for hill-station routes like Coorg or Ooty?',
        answer:
          'An SUV (Innova/Innova Crysta) suits smaller families, while a Tempo Traveller or Force Urbania is more comfortable for groups of 8 or more on longer ghat-road drives.',
      },
      {
        question: 'Are driver food and lodging charged separately?',
        answer:
          'No — driver food and lodging are included within the outstation per-km rate. Only driver bata, tolls, parking, permits and state taxes are additional.',
      },
    ],
    relatedVehicleSlugs: ['tempo-traveller-rental-bangalore', 'innova-crysta-rental-bangalore', 'force-urbania-12-seater-maharaja-bangalore'],
    relatedServiceSlugs: ['bangalore-sightseeing-cab', 'bangalore-airport-taxi', 'corporate-transport-bangalore'],
    relatedRouteSlugs: ['bangalore-to-coorg-cab', 'bangalore-to-ooty-cab', 'bangalore-to-mysore-cab'],
  },
  {
    slug: 'local-taxi-bangalore',
    h1: 'Local Taxi Service in Bangalore',
    title: 'Local Taxi Service Bangalore',
    metaDescription:
      'Book a local taxi in Bangalore for point-to-point drops, hourly city travel and errands — chauffeur-driven sedans and SUVs with transparent per-km rates.',
    heroSubtitle:
      'Chauffeur-driven local taxi in Bangalore for point-to-point drops, city errands and half-day/full-day hire.',
    heroImage: '/fleet/dzire-front-01.webp',
    geoSummary:
      'Sushi Travels offers local taxi service within Bangalore city for point-to-point drops and city travel, using our sedan and SUV fleet at their confirmed per-km rates. This is distinct from outstation round trips and airport transfers, aimed at short in-city journeys and half-day/full-day local hire.',
    bodyParagraphs: [
      'Local taxi bookings cover the everyday needs a full outstation package doesn\'t — a client meeting across town, a hospital visit, a shopping trip, or a half-day city hire where you need the driver to wait between stops.',
      'A sedan (Etios or Dzire) is the standard choice for local travel, offering AC comfort at the most economical per-km rate in our fleet. For larger local trips — say, a family outing across the city, or a small group heading to a local event — the Innova gives extra seating without the cost of a group vehicle.',
      'Local trips still follow our standard rental terms: driver bata, tolls and parking are billed separately from the per-km fare, and minimum billing conditions apply as with any confirmed-rate vehicle.',
    ],
    faqs: [
      {
        question: 'Can I book a taxi for just a few hours within Bangalore?',
        answer:
          'Yes — local hourly and point-to-point bookings are available. Share your planned stops and approximate duration when enquiring so we can quote accurately.',
      },
      {
        question: 'What is the cheapest local taxi option?',
        answer:
          'Our sedans (Toyota Etios / Maruti Suzuki Dzire) at ₹13/km are the most economical option in the fleet for local city travel.',
      },
      {
        question: 'Can the driver wait between multiple stops?',
        answer:
          'Yes, waiting time between stops on a local hire can be arranged — mention your itinerary when booking so it can be quoted correctly.',
      },
      {
        question: 'Is airport pickup counted as a local taxi booking?',
        answer:
          'Airport transfers are handled as a separate service category — see our Bangalore Airport Taxi page for pickup/drop specific to Kempegowda International Airport.',
      },
    ],
    relatedVehicleSlugs: ['sedan-rental-bangalore', 'innova-rental-bangalore'],
    relatedServiceSlugs: ['bangalore-airport-taxi', 'bangalore-sightseeing-cab', 'corporate-transport-bangalore'],
    relatedLocationSlugs: ['car-rental-koramangala', 'car-rental-indiranagar', 'car-rental-whitefield'],
  },
  {
    slug: 'corporate-transport-bangalore',
    h1: 'Corporate Transport Service in Bangalore',
    title: 'Corporate Transport Bangalore',
    metaDescription:
      'Corporate car and van rental in Bangalore for executive travel, employee transport and offsites. Sedans to Tempo Travellers with verified chauffeurs.',
    heroSubtitle:
      'Chauffeur-driven corporate transport in Bangalore — executive travel, employee transport and offsite logistics.',
    heroImage: '/fleet/innova-crysta-dashboard-01.webp',
    geoSummary:
      'Sushi Travels provides corporate transport service in Bangalore covering executive point-to-point travel, employee group transport, and offsite/team-outing logistics. The fleet spans sedans for individual executives to Tempo Traveller and Force Urbania vans for full teams, each with verified, professionally presented chauffeurs.',
    bodyParagraphs: [
      'Corporate bookings range from a single executive airport transfer to coordinating transport for an entire department heading to an offsite. We work with IT parks and business corridors across Bangalore (Whitefield, Electronic City, and the central business areas) for both scheduled and on-demand pickups.',
      'For individual executive travel, the Innova Crysta is a common choice for its comfort and presentation. For team transport — offsites, conference logistics, or moving a department to a corporate event — our Tempo Traveller and Force Urbania tiers keep everyone travelling together in one vehicle rather than splitting across multiple cars.',
      'We can also support recurring corporate travel arrangements; get in touch with your regular pickup locations and frequency and our team will work out a straightforward booking process for your office.',
    ],
    faqs: [
      {
        question: 'Do you support recurring corporate bookings?',
        answer:
          'Yes — for regular employee or executive transport, contact us with your pickup locations and frequency and we\'ll set up a straightforward recurring booking process.',
      },
      {
        question: 'Which vehicle suits a corporate offsite for 15 employees?',
        answer:
          'The Force Urbania Luxury 16-Seater comfortably covers a group of that size in one vehicle; for slightly smaller teams, the 12-seater Maharaja or a Tempo Traveller also work well.',
      },
      {
        question: 'Can you handle executive airport pickup with flight tracking?',
        answer:
          'Yes — share the executive\'s flight number and our dispatch team will adjust pickup timing for early landings or delays.',
      },
      {
        question: 'Is invoicing available for corporate clients?',
        answer:
          'Yes, get in touch through our contact page or WhatsApp to discuss invoicing and billing requirements for corporate accounts.',
      },
    ],
    relatedVehicleSlugs: ['innova-crysta-rental-bangalore', 'force-urbania-16-seater-luxury-bangalore', '9-seater-luxury-tempo-traveller-bangalore'],
    relatedServiceSlugs: ['bangalore-airport-taxi', 'outstation-cab-bangalore', 'local-taxi-bangalore'],
    relatedLocationSlugs: ['car-rental-whitefield', 'car-rental-electronic-city', 'car-rental-marathahalli'],
  },
  {
    slug: 'wedding-vehicle-rental-bangalore',
    h1: 'Wedding Vehicle Rental in Bangalore',
    title: 'Wedding Vehicle Rental Bangalore',
    metaDescription:
      'Wedding car and van rental in Bangalore for guest transport between venues, family pickups & multi-day wedding events. Tempo Travellers to buses.',
    heroSubtitle:
      'Guest and family transportation for Bangalore weddings — coordinated pickups, venue-to-venue transfers, and vehicles sized to your event.',
    heroImage: '/fleet/force-urbania-front-01.webp',
    geoSummary:
      'Sushi Travels provides wedding vehicle rental in Bangalore for guest transportation between venues, family pickups, and multi-day wedding event logistics. Vehicle options range from sedans for close family to Tempo Travellers, Force Urbania vans and buses for large guest groups.',
    bodyParagraphs: [
      'Weddings often need more than one vehicle type across a single event — a sedan for the couple or immediate family, Tempo Travellers or Force Urbania vans for extended family and close guests, and a bus for large-scale guest transport between the ceremony venue, reception and accommodation.',
      'We can coordinate multiple vehicles for a single wedding booking, including multi-day hire if your event spans more than one function (mehendi, sangeet, ceremony, reception), and can plan pickup schedules around your venue timings.',
      'Because wedding logistics vary widely by guest count and number of venues, we recommend sharing your full itinerary (dates, venues, approximate guest numbers per leg) when enquiring so we can put together an accurate multi-vehicle quote.',
    ],
    faqs: [
      {
        question: 'Can you provide multiple vehicles for one wedding?',
        answer:
          'Yes — we regularly coordinate a mix of sedans, Tempo Travellers, Force Urbania vans and buses for a single wedding event, sized to each leg of guest transport.',
      },
      {
        question: 'Do you support multi-day wedding event bookings?',
        answer:
          'Yes, if your wedding spans multiple functions across several days, we can arrange multi-day vehicle hire — share your full event schedule when enquiring.',
      },
      {
        question: 'Which vehicle works best for large guest transport?',
        answer:
          'For large guest counts, our Force Urbania 16-Seater, 25-seater and 50-seater bus tiers are the most efficient way to move groups between venues.',
      },
      {
        question: 'How far in advance should I book for a wedding?',
        answer:
          'We recommend booking wedding transport as early as possible, especially during peak wedding season, so we can confirm the right number and type of vehicles for your event.',
      },
    ],
    relatedVehicleSlugs: ['force-urbania-16-seater-luxury-bangalore', '25-seater-mini-bus-rental-bangalore', 'tempo-traveller-rental-bangalore'],
    relatedServiceSlugs: ['corporate-transport-bangalore', 'outstation-cab-bangalore', 'bangalore-sightseeing-cab'],
  },
  {
    slug: 'bangalore-sightseeing-cab',
    h1: 'Bangalore Sightseeing Cab Service',
    title: 'Bangalore Sightseeing Cab | City Tour Rental',
    metaDescription:
      'Half-day and full-day Bangalore sightseeing cab rental with a local driver — sedans, SUVs and group vehicles for city tours and day trips.',
    heroSubtitle:
      'Half-day and full-day Bangalore sightseeing rental with a local driver — city tours, day trips and group outings.',
    heroImage: '/fleet/innova-2011-front-02.webp',
    geoSummary:
      'Sushi Travels offers Bangalore sightseeing cab service for half-day and full-day city tours, using sedans, SUVs and group vehicles with local drivers. This service also covers same-day round trips to nearby destinations such as Mysore for visitors with limited time.',
    bodyParagraphs: [
      'Visitors and locals alike book sightseeing cabs for a relaxed, driver-led tour of Bangalore\'s attractions, or as a base for a single-day trip out of the city when a multi-day outstation booking isn\'t needed.',
      'A sedan or Innova works well for a family sightseeing day within the city; groups wanting to cover more ground together — or planning a same-day round trip to Mysore or another nearby destination — often prefer a Tempo Traveller so everyone travels together with luggage and shopping bags in one boot.',
      'Sightseeing bookings can be arranged as a fixed half-day/full-day local hire or, for out-of-city day trips, under our standard outstation per-km terms with the 300 km/day minimum where applicable.',
    ],
    faqs: [
      {
        question: 'Do you offer half-day and full-day sightseeing packages?',
        answer:
          'Yes — local sightseeing can be booked as half-day or full-day hire within Bangalore. Share your planned stops when enquiring so we can quote correctly.',
      },
      {
        question: 'Can I book a same-day trip to Mysore as sightseeing?',
        answer:
          'Yes — a same-day Mysore round trip is one of our most common sightseeing bookings. See our Bangalore to Mysore route page for distance and duration details.',
      },
      {
        question: 'Which vehicle is best for a family sightseeing day?',
        answer:
          'A sedan suits a small family, while an Innova or Innova Crysta gives extra room for a larger family or a day with more luggage/shopping.',
      },
      {
        question: 'Does the driver know the local attractions?',
        answer:
          'Our chauffeurs are experienced with Bangalore routes and common visitor stops, and can suggest a sensible order of stops based on your itinerary.',
      },
    ],
    relatedVehicleSlugs: ['sedan-rental-bangalore', 'innova-rental-bangalore', 'tempo-traveller-rental-bangalore'],
    relatedServiceSlugs: ['local-taxi-bangalore', 'outstation-cab-bangalore', 'bangalore-airport-taxi'],
    relatedRouteSlugs: ['bangalore-to-mysore-cab'],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((p) => p.slug === slug);
}
