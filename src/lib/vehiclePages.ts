import { vehicles, Vehicle } from './vehicles';
import { Faq } from '@/components/FaqAccordion';

export interface VehiclePage {
  slug: string;
  h1: string;
  title: string;
  metaDescription: string;
  heroSubtitle: string;
  /** ids from vehicles.ts this page covers pricing/photos for */
  vehicleIds: string[];
  geoSummary: string;
  bodyParagraphs: string[];
  faqs: Faq[];
  /** vehicles.ts slugs of other /vehicles pages to cross-link */
  relatedVehicleSlugs: string[];
  relatedServiceSlugs: string[];
  relatedRouteSlugs: string[];
  relatedLocationSlugs?: string[];
  isHub?: boolean;
  /**
   * When set, renders a side-by-side comparison table of every vehicle.ts
   * entry matching this type on this page — lets a visitor pick a seat
   * size without leaving the page (the single highest-value keyword URL
   * for that category is the right place for this, not a thin one-vehicle
   * page). Every cell reads from real vehicles.ts data, never invented.
   */
  compareVehicleType?: Vehicle['type'];
  video?: {
    src: string;
    poster: string;
    title: string;
    description: string;
    duration?: string;
  };
}

function v(id: string): Vehicle {
  const found = vehicles.find((x) => x.id === id);
  if (!found) throw new Error(`vehiclePages.ts: unknown vehicle id "${id}"`);
  return found;
}

export const vehiclePages: VehiclePage[] = [
  {
    slug: 'sedan-rental-bangalore',
    h1: 'Sedan Rental in Bangalore with Driver',
    title: 'Sedan Rental Bangalore with Driver',
    metaDescription:
      'Book a chauffeur-driven sedan (Toyota Etios / Maruti Suzuki Dzire) in Bangalore at ₹13/km. Airport transfers, local drops & outstation trips.',
    heroSubtitle:
      'Toyota Etios & Maruti Suzuki Dzire — chauffeur-driven AC sedans for airport transfers, local city travel and outstation trips out of Bangalore.',
    vehicleIds: ['toyota-etios', 'maruti-dzire'],
    geoSummary:
      'Sushi Travels provides chauffeur-driven sedan rental in Bangalore using the Toyota Etios and Maruti Suzuki Dzire, both priced at ₹13/km with a 300 km/day minimum billing and standard 6:00 AM–10:00 PM duty. Sedans are best suited to solo travellers, couples and small families needing airport pickup/drop, local city travel, or a lighter outstation vehicle.',
    bodyParagraphs: [
      'A sedan is the practical choice when you don\'t need the extra seating of an SUV or Tempo Traveller — quick airport runs, single-day local sightseeing, or a two-to-four passenger outstation trip where fuel efficiency and manoeuvrability matter more than cabin space.',
      'Both the Etios and the Dzire in our fleet are air-conditioned, well-maintained, and driven by verified chauffeurs familiar with Bangalore traffic patterns and the major outstation highways toward Mysore, Tirupati and the Nilgiris. Boot space comfortably fits two to three medium suitcases, which is enough for a short business trip or a weekend getaway for a couple.',
      'If your group is larger than four passengers, or you need more luggage room for a multi-day trip, our Toyota Innova and Innova Crysta SUVs are a natural upgrade — see the links below.',
    ],
    faqs: [
      {
        question: 'What is the per-km rate for sedan rental in Bangalore?',
        answer:
          'Both the Toyota Etios and Maruti Suzuki Dzire are priced at ₹13/km, with a 300 km/day minimum billing distance. This is the confirmed rate for both sedans in our fleet — there is no separate "starting from" figure.',
      },
      {
        question: 'Is driver bata included in the sedan rate?',
        answer:
          'Driver bata (₹400/day) is charged separately from the per-km rate, along with tolls, parking, permits and state taxes at actuals. Standard duty hours are 6:00 AM–10:00 PM; driving after 10:00 PM attracts extra driver bata.',
      },
      {
        question: 'Can I book a sedan for outstation travel?',
        answer:
          'Yes. The Etios and Dzire are both used for outstation round trips to nearby destinations such as Mysore and Tirupati, subject to the 300 km/day minimum billing. For longer or larger-group outstation trips, an SUV or Tempo Traveller is usually more comfortable.',
      },
      {
        question: 'Can I book airport pickup with a sedan?',
        answer:
          'Yes, sedan airport pickup and drop is one of the most common bookings we take — both cars are well suited to solo travellers, couples, and small families with standard luggage.',
      },
    ],
    relatedVehicleSlugs: ['innova-rental-bangalore', 'innova-crysta-rental-bangalore'],
    relatedServiceSlugs: ['bangalore-airport-taxi', 'local-taxi-bangalore', 'outstation-cab-bangalore'],
    relatedRouteSlugs: ['bangalore-to-mysore-cab', 'bangalore-to-tirupati-cab'],
  },
  {
    slug: 'innova-rental-bangalore',
    h1: 'Toyota Innova Rental in Bangalore',
    title: 'Toyota Innova Rental Bangalore with Driver',
    metaDescription:
      'Chauffeur-driven Toyota Innova rental in Bangalore at ₹17/km. Spacious 7-seater SUV for family outstation trips, pilgrimages & airport transfers.',
    heroSubtitle:
      'A dependable, spacious 7-seater Toyota Innova for family outstation trips, pilgrimages, and highway journeys, at ₹17/km.',
    vehicleIds: ['toyota-innova-2011'],
    geoSummary:
      'Sushi Travels provides chauffeur-driven Innova rental in Bangalore for airport transfers, local travel and outstation trips. The service includes a 300 km minimum billing condition and separate driver bata, with the Toyota Innova priced at ₹17/km.',
    bodyParagraphs: [
      'The Toyota Innova is one of the most trusted SUVs on Indian highways, and our 2011-model Innova offers spacious 3-row, 7-seat comfort for family groups who need more room than a sedan but don\'t require a full Tempo Traveller.',
      'It\'s a popular pick for pilgrimage trips (Tirupati, Mysore, and other South Indian temple towns), multi-day family holidays into the Western Ghats, and airport transfers for larger families with extra luggage. The rugged build and AC across all rows make it well suited to long highway stretches and hill roads alike.',
      'If your group is closer to 9–12 passengers, our Tempo Traveller or Innova Crysta pages below cover higher-comfort and higher-capacity alternatives.',
    ],
    faqs: [
      {
        question: 'What is the per-km rate for the Toyota Innova?',
        answer:
          'The Toyota Innova is priced at ₹17/km with a 300 km/day minimum billing distance, driven by a verified chauffeur.',
      },
      {
        question: 'Is driver bata included?',
        answer:
          'No — driver bata is ₹400/day, charged separately from the per-km fare, along with tolls, parking, permits and state taxes at actuals. Standard duty is 6:00 AM–10:00 PM, with extra bata for driving after 10:00 PM.',
      },
      {
        question: 'Can I book the Innova for outstation travel?',
        answer:
          'Yes — the Innova is one of our most-booked vehicles for outstation family trips and pilgrimages, given its spacious 7-seat layout and highway-tested reliability.',
      },
      {
        question: 'Can I book airport pickup with this vehicle?',
        answer:
          'Yes, airport pickup and drop is available with the Innova — a good option when your group has more passengers or luggage than a sedan can comfortably carry.',
      },
    ],
    relatedVehicleSlugs: ['innova-crysta-rental-bangalore', 'sedan-rental-bangalore', 'tempo-traveller-rental-bangalore'],
    relatedServiceSlugs: ['outstation-cab-bangalore', 'bangalore-airport-taxi', 'bangalore-sightseeing-cab'],
    relatedRouteSlugs: ['bangalore-to-tirupati-cab', 'bangalore-to-mysore-cab'],
  },
  {
    slug: 'innova-crysta-rental-bangalore',
    h1: 'Toyota Innova Crysta Rental in Bangalore',
    title: 'Innova Crysta Rental Bangalore with Driver',
    metaDescription:
      'Book a chauffeur-driven Toyota Innova Crysta in Bangalore at ₹19/km. Premium 7-seater SUV for family holidays, corporate travel & outstation road trips.',
    heroSubtitle:
      'Premium 7-seater SUV comfort with plush captain seats — ideal for family holidays, corporate travel and outstation road trips, at ₹19/km.',
    vehicleIds: ['toyota-innova-crysta'],
    geoSummary:
      'Sushi Travels offers chauffeur-driven Toyota Innova Crysta rental in Bangalore for outstation road trips, corporate travel and airport transfers. The Innova Crysta is priced at ₹19/km with a 300 km/day minimum billing and standard 6:00 AM–10:00 PM duty.',
    bodyParagraphs: [
      'The Innova Crysta is the premium step up from the standard Innova — plush captain seating, individual AC vents for rear passengers, and a noticeably smoother ride, which makes it a favourite for corporate travel and family holidays where comfort matters as much as capacity.',
      'It handles ghat roads to Coorg, Ooty and Chikmagalur comfortably, and the extra boot space means a full family\'s luggage fits without a roof carrier. Corporate clients frequently book the Crysta for executive airport transfers and multi-day outstation work trips.',
      'For premium buyers who want the newest generation Innova, ask about the Innova Hycross (Price on Request) when you enquire — it isn\'t a separately priced tier yet but our team can quote it directly.',
    ],
    faqs: [
      {
        question: 'What is the per-km rate for the Innova Crysta?',
        answer:
          'The Toyota Innova Crysta is priced at ₹19/km with a 300 km/day minimum billing distance and a verified professional driver.',
      },
      {
        question: 'Is driver bata included?',
        answer:
          'Driver bata is ₹400/day, billed separately from the per-km rate. Tolls, parking, permits and state taxes are additional. Standard duty hours are 6:00 AM–10:00 PM, with extra bata after 10:00 PM.',
      },
      {
        question: 'Can I book the Innova Crysta for outstation travel?',
        answer:
          'Yes — the Crysta is a popular choice for outstation family holidays and corporate trips into the Western Ghats and other South Indian destinations, given its comfort on long drives.',
      },
      {
        question: 'Can I book airport pickup with this vehicle?',
        answer:
          'Yes, the Innova Crysta is frequently booked for premium airport pickup and drop, especially by corporate clients and families travelling with more luggage.',
      },
    ],
    relatedVehicleSlugs: ['innova-rental-bangalore', 'tempo-traveller-rental-bangalore', 'sedan-rental-bangalore'],
    relatedServiceSlugs: ['corporate-transport-bangalore', 'bangalore-airport-taxi', 'outstation-cab-bangalore'],
    relatedRouteSlugs: ['bangalore-to-coorg-cab', 'bangalore-to-chikmagalur-cab'],
  },
  {
    slug: 'tempo-traveller-rental-bangalore',
    h1: '12-Seater Tempo Traveller Rental in Bangalore',
    title: 'Tempo Traveller Rental Bangalore (AC & Non-AC)',
    metaDescription:
      'Hire a 12-seater Tempo Traveller in Bangalore — AC (₹22/km) or Non-AC (₹20/km). Pushback seats, dedicated luggage boot. Ideal for group outstation trips.',
    heroSubtitle:
      '12-seater Tempo Traveller, available in AC (₹22/km) and Non-AC (₹20/km) — pushback seating and a dedicated luggage boot for group trips out of Bangalore.',
    vehicleIds: ['tempo-traveller'],
    compareVehicleType: 'Tempo Traveller',
    geoSummary:
      'Sushi Travels provides the 12 seater tempo traveller in Bangalore for outstation group trips, weekend getaways and pilgrimages, available in AC (₹22/km) and Non-AC (₹20/km) tiers, both with a 300 km/day minimum billing and a dedicated rear luggage boot.',
    bodyParagraphs: [
      'The Tempo Traveller is the go-to vehicle for small family groups and close-friend circles who want to travel together rather than split across multiple cars. Pushback reclining seats, extra legroom, and a proper luggage boot make it far more comfortable than a minivan for multi-hour drives.',
      'The AC tier runs dual roof-mounted AC across all rows, suited to summer travel and longer routes; the Non-AC tier is a practical, budget-friendly option for shorter trips or cooler-weather travel. Both come with USB charging points, reading lights and a music system.',
      'For mid-size groups of 9–10 passengers who want an executive-seat upgrade, see our 9 Seater Tempo Traveller page below; for 12–16 passenger premium vans, see the Force Urbania pages.',
    ],
    faqs: [
      {
        question: 'What is the per-km rate for the Tempo Traveller?',
        answer:
          'The AC Tempo Traveller is ₹22/km and the Non-AC Tempo Traveller is ₹20/km, both with a 300 km/day minimum billing distance.',
      },
      {
        question: 'Is driver bata included?',
        answer:
          'Driver bata is ₹700/day for both tiers, billed separately from the per-km rate. Tolls, parking, permits and state taxes are additional. Standard duty is 6:00 AM–10:00 PM, with extra bata after 10:00 PM.',
      },
      {
        question: 'Can I book this for outstation travel?',
        answer:
          'Yes — the Tempo Traveller is our most-booked vehicle for outstation group trips such as Coorg, Ooty and Mysore, comfortably seating up to 12 with luggage.',
      },
      {
        question: 'Can I book airport pickup with this vehicle?',
        answer:
          'Yes, group airport pickup/drop is available — useful when a family or group is arriving together and wants to travel from the airport in one vehicle.',
      },
      {
        question: 'Which Tempo Traveller size should I choose?',
        answer:
          'We run three Tempo Traveller sizes: 9-seater (executive seating, ₹28/km), 12-seater (AC/Non-AC, ₹20–22/km), and 17-seater (AC/Non-AC, ₹28–30/km). For 12–16 passengers or a more premium cabin, the Force Urbania range is also worth comparing — see the table above.',
      },
      {
        question: 'What is the difference between AC and Non-AC?',
        answer:
          'Both run the same pushback seating, luggage boot, USB points and music system. AC adds dual roof-mounted cooling across every row, better suited to summer travel and longer routes; Non-AC is a practical option for shorter or cooler-weather trips at a slightly lower per-km rate.',
      },
      {
        question: 'Do you provide a driver with the Tempo Traveller?',
        answer:
          'Yes — every Tempo Traveller booking includes a verified chauffeur. Self-drive is not offered.',
      },
    ],
    relatedVehicleSlugs: [
      '9-seater-luxury-tempo-traveller-bangalore',
      'force-urbania-12-seater-maharaja-bangalore',
      'innova-crysta-rental-bangalore',
    ],
    relatedServiceSlugs: ['outstation-cab-bangalore', 'wedding-vehicle-rental-bangalore', 'bangalore-sightseeing-cab'],
    relatedRouteSlugs: ['bangalore-to-coorg-cab', 'bangalore-to-ooty-cab'],
  },
  {
    slug: '9-seater-luxury-tempo-traveller-bangalore',
    h1: '9 Seater Tempo Traveller Rental in Bangalore',
    title: '9 Seater Tempo Traveller Bangalore',
    metaDescription:
      'Book a 9 seater tempo traveller in Bangalore at ₹28/km — executive pushback seats for corporate teams, pilgrimages & mid-size family trips.',
    heroSubtitle:
      '9+1 seater with executive pushback seats and individual AC vents, at ₹28/km — built for mid-size groups on longer outstation drives.',
    vehicleIds: ['luxury-tempo-traveller-9-plus-1'],
    geoSummary:
      'Sushi Travels offers the 9 seater tempo traveller (9+1) in Bangalore for corporate offsites, pilgrimages and mid-size family group travel. Priced at ₹28/km with a 300 km/day minimum billing, it upgrades the standard Tempo Traveller with executive seating and individual AC vents.',
    bodyParagraphs: [
      'Our 9 seater Tempo Traveller — nine-plus-one executive pushback seats, ambient cabin lighting, individual AC vents, and large tinted windows that make the ghat-road drive to Coorg, Ooty or Munnar noticeably more comfortable for every passenger, not just the front row.',
      'It suits corporate teams heading to an offsite, extended families on a pilgrimage trip, or any group of 9–10 that wants more legroom and a quieter cabin than the standard 12-seater tier.',
      'For groups of 12 or more, see the Urbania 12 Seater Maharaja and Force Urbania Luxury 16-Seater pages below, which carry more passengers in a similarly premium cabin.',
    ],
    faqs: [
      {
        question: 'What is the per-km rate for this vehicle?',
        answer:
          'The 9 Seater Tempo Traveller is priced at ₹28/km with a 300 km/day minimum billing distance.',
      },
      {
        question: 'Is driver bata included?',
        answer:
          'Driver bata is ₹500/day, charged separately from the per-km rate, along with tolls, parking, permits and state taxes at actuals. Standard duty is 6:00 AM–10:00 PM, with extra bata after 10:00 PM.',
      },
      {
        question: 'Can I book this for outstation travel?',
        answer:
          'Yes — this tier is specifically built for outstation group travel, corporate offsites and pilgrimage trips where comfort over a long drive matters.',
      },
      {
        question: 'Can I book airport pickup with this vehicle?',
        answer:
          'Yes, airport pickup for a corporate team or extended family group is available with this vehicle.',
      },
    ],
    relatedVehicleSlugs: [
      'tempo-traveller-rental-bangalore',
      '17-seater-tempo-traveller-bangalore',
      'force-urbania-12-seater-maharaja-bangalore',
    ],
    relatedServiceSlugs: ['corporate-transport-bangalore', 'outstation-cab-bangalore', 'wedding-vehicle-rental-bangalore'],
    relatedRouteSlugs: ['bangalore-to-coorg-cab', 'bangalore-to-tirupati-cab'],
  },
  {
    slug: '17-seater-tempo-traveller-bangalore',
    h1: '17-Seater Force Tempo Traveller Rental in Bangalore',
    title: '17 Seater Tempo Traveller Rental Bangalore',
    metaDescription:
      'Hire a 17 seater tempo traveller in Bangalore — AC (₹30/km) or Non-AC (₹28/km) — for large group outstation trips, corporate offsites & pilgrimages.',
    heroSubtitle:
      'Our largest Force Tempo Traveller — available in AC (₹30/km) and Non-AC (₹28/km) — built for big groups on outstation trips, corporate offsites and pilgrimages.',
    vehicleIds: ['force-tempo-traveller-17-seater'],
    geoSummary:
      'Sushi Travels offers a 17 seater tempo traveller in Bangalore for large groups needing extra capacity on outstation trips, corporate offsites and pilgrimages, available in AC (₹30/km) and Non-AC (₹28/km) tiers, both with a ₹700/day driver bata and a 300 km/day minimum.',
    bodyParagraphs: [
      'When a 12-seater Tempo Traveller isn\'t quite enough room, our 17-seater Force Tempo Traveller steps up to carry a larger group in one vehicle — pushback reclining seats, an AC or Non-AC configuration, and a dedicated rear luggage boot sized for a full group\'s bags.',
      'It suits large family gatherings, corporate offsites where an entire team travels together, and pilgrimage groups heading to South Indian temple towns who want everyone in a single vehicle rather than splitting across two smaller ones.',
      'AC is ₹30/km and Non-AC is ₹28/km, both with a 300 km/day minimum and ₹700/day driver bata, plus toll, parking, permit and state taxes as applicable. Call or WhatsApp us with your route and group size for an exact quote — for a similarly sized premium option, see the Urbania 12 Seater Maharaja and Force Urbania pages below.',
    ],
    faqs: [
      {
        question: 'What is the per-km rate for the 17-seater tempo traveller?',
        answer:
          'The 17-seater Force Tempo Traveller is ₹30/km for AC or ₹28/km for Non-AC, both with a 300 km/day minimum and ₹700/day driver bata. Toll, parking, permit and state taxes are additional. Call or WhatsApp us with your route and group size for an exact quote.',
      },
      {
        question: 'Is this a real vehicle in the Sushi Travels fleet?',
        answer:
          'Yes — the 17-seater Force Tempo Traveller is a confirmed, real vehicle in our fleet, in service today.',
      },
      {
        question: 'Can I book this for outstation travel?',
        answer:
          'Yes — this is one of our larger-capacity vehicles, well suited to outstation group trips, corporate offsites and pilgrimages where 13-17 passengers want to travel together.',
      },
      {
        question: 'Can I book airport pickup with this vehicle?',
        answer:
          'Yes, group airport pickup/drop can be arranged for large families or teams arriving together — mention your group size when enquiring.',
      },
    ],
    relatedVehicleSlugs: [
      'tempo-traveller-rental-bangalore',
      '9-seater-luxury-tempo-traveller-bangalore',
      'force-urbania-12-seater-maharaja-bangalore',
    ],
    relatedServiceSlugs: ['outstation-cab-bangalore', 'corporate-transport-bangalore', 'wedding-vehicle-rental-bangalore'],
    relatedRouteSlugs: ['bangalore-to-coorg-cab', 'bangalore-to-tirupati-cab'],
    video: {
      src: '/videos/force-tempo-traveller-17-seater.mp4',
      poster: '/videos/force-tempo-traveller-17-seater-poster.webp',
      title: '17-Seater Force Tempo Traveller Cabin Walkthrough Video',
      description:
        'Exclusive interior video walkthrough of the 17-Seater Force Tempo Traveller showing luxury Maharaja pushback seats, ceiling LED lighting, individual AC vents, and entertainment screen.',
      duration: 'PT37S',
    },
  },
  {
    slug: 'force-urbania-12-seater-maharaja-bangalore',
    h1: 'Urbania 12 Seater Maharaja Rental in Bangalore',
    title: 'Urbania 12 Seater Maharaja Rental Bangalore',
    metaDescription:
      'Hire the Urbania 12 Seater Maharaja in Bangalore. High-roof premium van with captain seats for family holidays & corporate group travel. Call or WhatsApp for a quote.',
    heroSubtitle:
      'High-roof, premium 12-seater van with captain-style seating and strong AC — for mid-size groups who want extra comfort. Price on request.',
    vehicleIds: ['force-urbania-maharaja-12-seater'],
    geoSummary:
      'Sushi Travels provides Urbania 12 Seater Maharaja rental in Bangalore for family holidays and corporate group travel across South India, offering a high-roof cabin with stand-up walking space, uncommon in this seating class. Pricing is available on request.',
    bodyParagraphs: [
      'The Urbania 12 Seater Maharaja is the 12-seater trim of our flagship Urbania — a modern, high-roof van built for mid-size groups who want more headroom and a car-like ride than a traditional Tempo Traveller offers, without stepping up to the full 16-seater.',
      'Captain-style seats, powerful roof AC with individual vents, and a large rear cargo hold make it well suited to family holidays, corporate offsites and pilgrimage groups travelling with substantial luggage.',
      'If your group is closer to 16 passengers, see the Force Urbania Luxury 16-Seater page below; for a lighter 9-seat option, see the 9 Seater Tempo Traveller.',
    ],
    faqs: [
      {
        question: 'What is the per-km rate for the Urbania 12 Seater Maharaja?',
        answer: 'Pricing is available on request — call or WhatsApp us with your route and group size for a custom quote.',
      },
      {
        question: 'Is driver bata included?',
        answer:
          'Driver bata is billed separately from the per-km rate, along with tolls, parking, permits and state taxes at actuals. Standard duty is 6:00 AM–10:00 PM, with extra bata after 10:00 PM.',
      },
      {
        question: 'Can I book this for outstation travel?',
        answer:
          'Yes — this is one of our most-requested vehicles for outstation family and corporate group trips given its high-roof comfort and luggage capacity.',
      },
      {
        question: 'Can I book airport pickup with this vehicle?',
        answer: 'Yes, group airport pickup/drop is available for families and corporate teams arriving together.',
      },
    ],
    relatedVehicleSlugs: [
      'force-urbania-16-seater-luxury-bangalore',
      '9-seater-luxury-tempo-traveller-bangalore',
      'tempo-traveller-rental-bangalore',
    ],
    relatedServiceSlugs: ['corporate-transport-bangalore', 'wedding-vehicle-rental-bangalore', 'outstation-cab-bangalore'],
    relatedRouteSlugs: ['bangalore-to-ooty-cab', 'bangalore-to-coorg-cab'],
  },
  {
    slug: 'force-urbania-16-seater-luxury-bangalore',
    h1: 'Force Urbania Luxury 16-Seater Rental in Bangalore',
    title: 'Force Urbania 16-Seater Rental Bangalore',
    metaDescription:
      'Book the Force Urbania Luxury 16-Seater in Bangalore at ₹38/km. Our largest premium van — ideal for weddings, big families & corporate offsites.',
    heroSubtitle:
      'Our flagship 16-seater — high-roof cabin, captain seats and strong AC, at ₹38/km, built for big groups who refuse to compromise on comfort.',
    vehicleIds: ['force-urbania-luxury-16-seater'],
    geoSummary:
      'Sushi Travels offers the Force Urbania Luxury 16-Seater in Bangalore for large family holidays, wedding transportation and corporate group travel. Priced at ₹38/km with a 300 km/day minimum billing, it is the largest and most premium van in our fleet.',
    bodyParagraphs: [
      'When a 12-seater isn\'t enough, the Force Urbania Luxury 16-Seater carries a larger group in one vehicle without dropping to bus-level seating density — captain-style seats, high-roof stand-up space, and a big rear cargo hold that handles wedding luggage or extended-family holiday bags without a roof carrier.',
      'It\'s a common choice for wedding guest transportation between venues, large joint-family holidays, and corporate offsites where the whole team wants to travel together.',
      'For groups larger than 16, see our 25 Seater Mini Bus and 50-Seater Bus pages, or the general Bus Rental hub page below.',
    ],
    faqs: [
      {
        question: 'What is the per-km rate for the Force Urbania Luxury 16-Seater?',
        answer: 'It is priced at ₹38/km with a 300 km/day minimum billing distance.',
      },
      {
        question: 'Is driver bata included?',
        answer:
          'Driver bata is ₹700/day, billed separately, along with tolls, parking, permits and state taxes at actuals. Standard duty is 6:00 AM–10:00 PM, with extra bata after 10:00 PM.',
      },
      {
        question: 'Can I book this for outstation travel?',
        answer: 'Yes — this is a popular pick for large-group outstation holidays and multi-day wedding transportation itineraries.',
      },
      {
        question: 'Can I book airport pickup with this vehicle?',
        answer: 'Yes, group airport pickup/drop for large families or wedding parties is available.',
      },
    ],
    relatedVehicleSlugs: [
      'force-urbania-12-seater-maharaja-bangalore',
      '25-seater-mini-bus-rental-bangalore',
      'tempo-traveller-rental-bangalore',
    ],
    relatedServiceSlugs: ['wedding-vehicle-rental-bangalore', 'corporate-transport-bangalore', 'outstation-cab-bangalore'],
    relatedRouteSlugs: ['bangalore-to-coorg-cab', 'bangalore-to-hampi-cab'],
  },
  {
    slug: '25-seater-mini-bus-rental-bangalore',
    h1: '25 Seater Mini Bus Rental in Bangalore',
    title: '25 Seater Mini Bus Rental Bangalore',
    metaDescription:
      '25-seater AC mini bus rental in Bangalore for corporate offsites, school trips & pilgrimage groups. Price on request — call or WhatsApp for a custom quote.',
    heroSubtitle:
      'AC pushback seating for 25 passengers — built for mid-size groups that have outgrown a Tempo Traveller. Pricing on request.',
    vehicleIds: ['sushi-travels-25-seater-mini-bus'],
    geoSummary:
      'Sushi Travels provides 25-seater mini bus rental in Bangalore for corporate offsites, school and college trips, and pilgrimage groups. This tier does not have a fixed confirmed per-km rate — pricing is quoted per trip based on route, duration and group size.',
    bodyParagraphs: [
      'The 25-seater mini bus fills the gap between our largest van (the 16-seater Force Urbania) and full-size coaches — a genuine mid-size AC bus with overhead luggage racks, a rear cargo hold, and a PA/music system for group announcements on longer trips.',
      'It works well for school and college outings, corporate offsites where a whole department is travelling together, and pilgrimage groups that need everyone in one vehicle rather than splitting across two smaller ones.',
      'Because pricing depends on route, trip duration and total distance, we quote this vehicle individually rather than listing a per-km figure here — call or WhatsApp with your itinerary for a fast quote. If you\'re not sure which bus size fits your group, our Bus Rental hub page below compares all three larger options.',
    ],
    faqs: [
      {
        question: 'What is the per-km rate for the 25-seater mini bus?',
        answer:
          'This tier is priced per trip rather than a flat confirmed per-km rate, based on route, duration and group size. Call or WhatsApp us with your itinerary for a quote.',
      },
      {
        question: 'Is driver bata included?',
        answer:
          'Driver bata, tolls, parking, permits and state taxes are quoted as part of the custom trip quote for this vehicle.',
      },
      {
        question: 'Can I book this for outstation travel?',
        answer: 'Yes — the 25-seater mini bus is commonly booked for outstation group trips, pilgrimages and multi-day school/college tours.',
      },
      {
        question: 'Can I book airport pickup with this vehicle?',
        answer: 'Yes, group airport pickup/drop for a large team or tour group can be arranged — mention your group size when enquiring.',
      },
    ],
    relatedVehicleSlugs: ['bus-rental-bangalore', 'force-urbania-16-seater-luxury-bangalore', '50-seater-bus-rental-bangalore'],
    relatedServiceSlugs: ['corporate-transport-bangalore', 'outstation-cab-bangalore', 'bangalore-sightseeing-cab'],
    relatedRouteSlugs: ['bangalore-to-hampi-cab', 'bangalore-to-tirupati-cab'],
  },
  {
    slug: '50-seater-bus-rental-bangalore',
    h1: '50-Seater Bus Rental in Bangalore',
    title: '50 Seater Bus Rental Bangalore',
    metaDescription:
      '50-seater AC bus rental in Bangalore for large corporate events, weddings & big pilgrimage groups. Price on request — call or WhatsApp for a custom quote.',
    heroSubtitle:
      'Full-size AC pushback seating for 50 passengers — our largest-capacity vehicle, for big events, weddings and large group tours. Pricing on request.',
    vehicleIds: ['bus-50-seater'],
    geoSummary:
      'Sushi Travels provides 50-seater bus rental in Bangalore for large corporate events, weddings and big pilgrimage or group tours. This tier does not have a fixed confirmed per-km rate — pricing is quoted per trip based on route, duration and group size.',
    bodyParagraphs: [
      'When an entire company, wedding party or large tour group needs to travel together, the 50-seater is our largest-capacity vehicle — full-size AC pushback seating, large overhead luggage racks, a rear cargo hold, and a PA/music system.',
      'It is most often booked for corporate events with staff transport requirements, wedding guest transportation, and large pilgrimage or school/college group tours where splitting the group across multiple smaller vehicles isn\'t practical.',
      'As with the 21-seater, pricing is quoted per trip based on route, duration and group size — call or WhatsApp with your itinerary. See our Bus Rental hub page below if you\'re comparing bus sizes for your group.',
    ],
    faqs: [
      {
        question: 'What is the per-km rate for the 50-seater bus?',
        answer:
          'This tier is priced per trip rather than a flat confirmed per-km rate, based on route, duration and group size. Call or WhatsApp us with your itinerary for a quote.',
      },
      {
        question: 'Is driver bata included?',
        answer: 'Driver bata, tolls, parking, permits and state taxes are quoted as part of the custom trip quote for this vehicle.',
      },
      {
        question: 'Can I book this for outstation travel?',
        answer: 'Yes — the 50-seater is commonly booked for large outstation group tours, weddings and pilgrimage trips.',
      },
      {
        question: 'Can I book airport pickup with this vehicle?',
        answer: 'Yes, large-group airport pickup/drop can be arranged — mention your group size and flight details when enquiring.',
      },
    ],
    relatedVehicleSlugs: ['bus-rental-bangalore', '25-seater-mini-bus-rental-bangalore', 'force-urbania-16-seater-luxury-bangalore'],
    relatedServiceSlugs: ['wedding-vehicle-rental-bangalore', 'corporate-transport-bangalore', 'outstation-cab-bangalore'],
    relatedRouteSlugs: ['bangalore-to-hampi-cab', 'bangalore-to-pondicherry-cab'],
  },
  {
    slug: 'bus-rental-bangalore',
    h1: 'Bus & Mini Coach Rental in Bangalore',
    title: 'Bus & Mini Coach Rental Bangalore',
    metaDescription:
      'Compare our Bangalore bus rental options: 25 to 50-seater AC coaches, including 33-seater and Volvo 45-seater luxury buses, for group travel & events.',
    heroSubtitle:
      'From a 25-seater mini bus to a full-size Volvo luxury coach — compare our AC bus fleet for corporate events, weddings, school trips and pilgrimage groups.',
    vehicleIds: ['sushi-travels-25-seater-mini-bus', 'sushi-travels-33-seater-bus-luxury', 'volvo-bus-45-seater-luxury', 'bus-50-seater'],
    geoSummary:
      'Sushi Travels operates four larger-capacity AC vehicles for group bus rental in Bangalore: a 25-seater mini bus, a 33 Seater Bus Luxury, a Volvo Bus 45 Seater Luxury coach, and a 50-seater bus. None of these tiers carry a fixed confirmed per-km rate — each is quoted per trip based on route, duration and group size.',
    bodyParagraphs: [
      'Not every large-group search is specific to a seat count — this page is a quick comparison hub for anyone deciding between our bigger vehicles before requesting a quote.',
      'The 25-seater mini bus seats 25 with AC pushback seating and a rear cargo hold, suited to large corporate offsites, school and college outings, and big pilgrimage or wedding parties. The 33 Seater Bus Luxury and the Volvo Bus 45 Seater Luxury are both full-size premium coaches with reclining seats and curtained windows, and the 50-seater is our largest-capacity vehicle for full corporate events, weddings and large tour groups.',
      'All four include overhead luggage racks, a PA/music system, and pushback AC seating. Because pricing depends heavily on route, trip duration and total distance, none of these tiers publish a per-km rate — call or WhatsApp with your group size and itinerary and we\'ll get back with a quote quickly.',
    ],
    faqs: [
      {
        question: 'Which bus size should I book for my group?',
        answer:
          'The 25-seater mini bus suits mid-size groups, the 33 Seater Bus Luxury and Volvo Bus 45 Seater Luxury suit larger groups wanting a premium coach, and the 50-seater is for full corporate events, weddings or large tour groups. Tell us your headcount and we\'ll recommend the right fit.',
      },
      {
        question: 'What is the per-km rate for these buses?',
        answer:
          'None of the bus tiers has a fixed confirmed per-km rate — each is quoted per trip based on route, duration and group size. Call or WhatsApp us with your itinerary for a quote.',
      },
      {
        question: 'Can I book a bus for outstation travel?',
        answer: 'Yes — all four tiers are commonly booked for outstation group trips, pilgrimages, weddings and multi-day tours.',
      },
      {
        question: 'Can I book airport pickup with a bus?',
        answer: 'Yes, large-group airport pickup/drop can be arranged for any of the four bus tiers — mention your group size when enquiring.',
      },
    ],
    relatedVehicleSlugs: ['25-seater-mini-bus-rental-bangalore', '50-seater-bus-rental-bangalore', 'force-urbania-16-seater-luxury-bangalore'],
    relatedServiceSlugs: ['corporate-transport-bangalore', 'wedding-vehicle-rental-bangalore', 'outstation-cab-bangalore'],
    relatedRouteSlugs: ['bangalore-to-hampi-cab', 'bangalore-to-tirupati-cab'],
    isHub: true,
  },
];

export function getVehiclePage(slug: string): VehiclePage | undefined {
  return vehiclePages.find((p) => p.slug === slug);
}

/**
 * Given a vehicles.ts vehicle id, returns the URL of its dedicated
 * /vehicles/[slug] landing page, if one exists. Used by VehicleCard to
 * deep-link fleet/home cards into the new SEO landing pages (in addition
 * to, not instead of, the existing Call/WhatsApp/Book CTAs). Prefers a
 * non-hub page match first (a vehicle like the Volvo Bus 45 Seater Luxury
 * only exists on the hub page, so that's returned as a fallback).
 */
export function getVehicleDetailHref(vehicleId: string): string | undefined {
  const dedicated = vehiclePages.find((p) => !p.isHub && p.vehicleIds.includes(vehicleId));
  if (dedicated) return `/vehicles/${dedicated.slug}`;
  const hub = vehiclePages.find((p) => p.isHub && p.vehicleIds.includes(vehicleId));
  return hub ? `/vehicles/${hub.slug}` : undefined;
}

export function getVehiclesForPage(page: VehiclePage): Vehicle[] {
  return page.vehicleIds.map(v);
}

/** Primary photo for a page = first listed vehicle's confirmed fleet photo. */
export function getPagePrimaryImage(page: VehiclePage): string {
  return v(page.vehicleIds[0]).image;
}
