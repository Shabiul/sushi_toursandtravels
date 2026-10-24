import { Faq } from '@/components/FaqAccordion';

export interface RoutePage {
  slug: string;
  destination: string;
  h1: string;
  title: string;
  metaDescription: string;
  heroSubtitle: string;
  heroImage: string;
  distance: string;
  duration: string;
  geoSummary: string;
  bodyParagraphs: string[];
  vehicleSuggestion: string;
  faqs: Faq[];
  relatedVehicleSlugs: string[];
  /** slug in src/lib/packages.ts if this destination also has a commercial package */
  packageSlug?: string;
}

export const routePages: RoutePage[] = [
  {
    slug: 'bangalore-to-mysore-cab',
    destination: 'Mysore',
    h1: 'Bangalore to Mysore Cab Service',
    title: 'Bangalore to Mysore Cab | Fare & Distance',
    metaDescription:
      'Bangalore to Mysore cab service — approx. 143 km, 2.5–3 hrs one way. Sedans, SUVs & Tempo Travellers with verified drivers. Get a fare quote today.',
    heroSubtitle: 'Approx. 143 km, 2.5–3 hours one way — one of our most-booked South India routes.',
    heroImage: '/mysuru.webp',
    distance: 'Approx. 143 km',
    duration: 'Approx. 2.5–3 hours one way',
    geoSummary:
      'Sushi Travels operates chauffeur-driven cab service on the Bangalore to Mysore route, approximately 143 km and 2.5–3 hours one way on the highway. It is one of the most popular same-day round-trip routes we run, suited to sedans, SUVs and Tempo Travellers depending on group size.',
    bodyParagraphs: [
      'Mysore is close enough to Bangalore for a comfortable same-day round trip, which makes it one of our most-booked routes — families doing a single-day heritage visit, and groups combining it with a stop at Chamundi Hills or the local markets.',
      'Smaller families typically book a sedan or Innova for this route; groups of friends or larger families often prefer a Tempo Traveller so everyone can travel together and still make it back to Bangalore comfortably the same evening.',
      'This route is also covered as a ready-made day-trip package on our Tours & Packages page, if you\'d prefer a pre-planned itinerary rather than a custom cab booking.',
    ],
    vehicleSuggestion: 'Sedan or Innova for small families; Tempo Traveller for groups of 8+.',
    faqs: [
      {
        question: 'What is the distance from Bangalore to Mysore?',
        answer: 'The Bangalore to Mysore route is approximately 143 km one way, taking roughly 2.5–3 hours by road under normal traffic conditions.',
      },
      {
        question: 'Can I do a same-day round trip to Mysore?',
        answer: 'Yes — Mysore is one of the most common same-day round trips we run from Bangalore, comfortably doable within a single day.',
      },
      {
        question: 'What is the fare for a Bangalore to Mysore cab?',
        answer: 'Exact route fares depend on the vehicle chosen, trip duration and applicable tolls/permits — call or WhatsApp us with your travel date and group size for an accurate quote.',
      },
      {
        question: 'Which vehicle is best for a Mysore day trip?',
        answer: 'A sedan or Innova suits smaller families; for larger groups, a Tempo Traveller keeps everyone together and is one of our most-booked options for this route.',
      },
    ],
    relatedVehicleSlugs: ['sedan-rental-bangalore', 'innova-rental-bangalore', 'tempo-traveller-rental-bangalore'],
    packageSlug: 'bangalore-to-mysore',
  },
  {
    slug: 'bangalore-to-coorg-cab',
    destination: 'Coorg',
    h1: 'Bangalore to Coorg Cab Service',
    title: 'Bangalore to Coorg Cab | Fare & Distance',
    metaDescription:
      'Bangalore to Coorg cab service — approx. 250 km, 5.5–6 hrs one way through ghat roads. SUVs & Tempo Travellers with experienced drivers.',
    heroSubtitle: 'Approx. 250 km, 5.5–6 hours one way through the Western Ghats coffee country.',
    heroImage: '/coorg.webp',
    distance: 'Approx. 250 km',
    duration: 'Approx. 5.5–6 hours one way',
    geoSummary:
      'Sushi Travels operates chauffeur-driven cab service on the Bangalore to Coorg route, approximately 250 km and 5.5–6 hours one way through ghat roads and coffee estate country. This route is typically booked as a 2-day/1-night round trip, best suited to SUVs and Tempo Travellers.',
    bodyParagraphs: [
      'Coorg\'s ghat-road drive is one of the more scenic but demanding routes we run, and we recommend an SUV or Tempo Traveller over a sedan for the winding sections, especially for a group.',
      'Most Coorg bookings are structured as a two-day round trip with an overnight stay, though a longer multi-day itinerary can be arranged if you want to cover more of the region\'s waterfalls and viewpoints.',
      'This destination is also available as a ready-made two-day package on our Tours & Packages page if you\'d prefer a pre-planned itinerary.',
    ],
    vehicleSuggestion: 'SUV for small groups; Tempo Traveller for 8+ passengers on the ghat-road sections.',
    faqs: [
      {
        question: 'What is the distance from Bangalore to Coorg?',
        answer: 'The Bangalore to Coorg route is approximately 250 km one way, taking roughly 5.5–6 hours by road, including the ghat-road stretch.',
      },
      {
        question: 'Is Coorg a one-way or round-trip booking?',
        answer: 'Coorg is most commonly booked as a round trip, typically a 2-day/1-night itinerary, though longer stays and one-way drops can be arranged.',
      },
      {
        question: 'What is the fare for a Bangalore to Coorg cab?',
        answer: 'Fares depend on vehicle type, trip duration and number of days — call or WhatsApp us with your dates and group size for an accurate quote.',
      },
      {
        question: 'Which vehicle handles the Coorg ghat roads best?',
        answer: 'An SUV like the Innova or Innova Crysta is comfortable for smaller groups; for larger groups, a Tempo Traveller with an experienced ghat-road driver is a popular choice.',
      },
    ],
    relatedVehicleSlugs: ['innova-crysta-rental-bangalore', 'tempo-traveller-rental-bangalore', '9-seater-luxury-tempo-traveller-bangalore'],
    packageSlug: 'bangalore-to-coorg',
  },
  {
    slug: 'bangalore-to-ooty-cab',
    destination: 'Ooty',
    h1: 'Bangalore to Ooty Cab Service',
    title: 'Bangalore to Ooty Cab | Fare & Distance',
    metaDescription:
      'Bangalore to Ooty cab service — approx. 270 km, 6–7 hrs one way via Bandipur. SUVs & Tempo Travellers with experienced hill-road drivers.',
    heroSubtitle: 'Approx. 270 km, 6–7 hours one way through the Bandipur forest corridor and Nilgiri hairpin bends.',
    heroImage: '/ooty.webp',
    distance: 'Approx. 270 km',
    duration: 'Approx. 6–7 hours one way',
    geoSummary:
      'Sushi Travels operates chauffeur-driven cab service on the Bangalore to Ooty route, approximately 270 km and 6–7 hours one way via the Bandipur forest corridor and the Nilgiri hairpin bends. This route is typically booked as a 2-day/1-night round trip with an experienced hill-road driver.',
    bodyParagraphs: [
      'The classic Nilgiri hill-station run passes through the Bandipur forest corridor before climbing the well-known sequence of hairpin bends into Ooty — a route best handled by a driver experienced with hill roads, which all our chauffeurs are.',
      'Most Ooty trips are booked as a 2-day/1-night round trip, giving enough time for tea garden visits, the Botanical Garden, and a stop at Ooty Lake, though longer multi-day itineraries are common for families wanting a more relaxed pace.',
      'This destination is also available as a ready-made package on our Tours & Packages page if you\'d prefer a pre-planned itinerary rather than a custom cab booking.',
    ],
    vehicleSuggestion: 'SUV for small families; 12 or 16-seater Tempo Traveller/Force Urbania for larger groups.',
    faqs: [
      {
        question: 'What is the distance from Bangalore to Ooty?',
        answer: 'The Bangalore to Ooty route is approximately 270 km one way, taking roughly 6–7 hours by road via the Bandipur forest corridor and Nilgiri hairpin bends.',
      },
      {
        question: 'Does the route pass through a forest reserve?',
        answer: 'Yes, the drive passes through the Bandipur forest corridor — our drivers are familiar with the timing and driving conditions of this stretch.',
      },
      {
        question: 'What is the fare for a Bangalore to Ooty cab?',
        answer: 'Fares depend on vehicle type, trip duration and number of days — call or WhatsApp us with your dates and group size for an accurate quote.',
      },
      {
        question: 'Which vehicle is best for the Ooty hairpin bends?',
        answer: 'An SUV suits smaller families comfortably; for larger groups, our 12 or 16-seater Tempo Traveller/Force Urbania tiers handle the hairpin sections well with an experienced driver.',
      },
    ],
    relatedVehicleSlugs: ['innova-crysta-rental-bangalore', 'force-urbania-12-seater-maharaja-bangalore', 'tempo-traveller-rental-bangalore'],
    packageSlug: 'bangalore-to-ooty',
  },
  {
    slug: 'bangalore-to-chikmagalur-cab',
    destination: 'Chikmagalur',
    h1: 'Bangalore to Chikmagalur Cab Service',
    title: 'Bangalore to Chikmagalur Cab | Fare & Distance',
    metaDescription:
      'Bangalore to Chikmagalur cab service — approx. 245 km, 5–5.5 hrs one way through Karnataka\'s coffee hill country. SUVs & Tempo Travellers available.',
    heroSubtitle: 'Approx. 245 km, 5–5.5 hours one way into Karnataka\'s coffee-growing hill country.',
    heroImage: '/coorg.webp',
    distance: 'Approx. 245 km',
    duration: 'Approx. 5–5.5 hours one way',
    geoSummary:
      'Sushi Travels operates chauffeur-driven cab service on the Bangalore to Chikmagalur route, approximately 245 km and 5–5.5 hours one way into Karnataka\'s coffee-growing hill country. This route is generally booked as a weekend round trip, suited to SUVs and Tempo Travellers.',
    bodyParagraphs: [
      'Chikmagalur is a popular weekend getaway for its coffee estates, cooler climate and trekking spots in the surrounding hills — a favourite for the same Bangalore weekend-trip crowd that also books Coorg.',
      'The route includes stretches of hill road similar in character to Coorg, so we recommend an SUV for smaller groups and a Tempo Traveller for larger groups of friends or family.',
      'Chikmagalur isn\'t currently one of our pre-built Tours & Packages itineraries, but a custom round-trip quote is easy to arrange — share your travel dates and group size when enquiring.',
    ],
    vehicleSuggestion: 'SUV for small groups; Tempo Traveller for larger weekend group trips.',
    faqs: [
      {
        question: 'What is the distance from Bangalore to Chikmagalur?',
        answer: 'The Bangalore to Chikmagalur route is approximately 245 km one way, taking roughly 5–5.5 hours by road.',
      },
      {
        question: 'Is Chikmagalur a good weekend trip from Bangalore?',
        answer: 'Yes, it\'s one of the most popular weekend getaways from Bangalore given the manageable one-way distance and its coffee-estate hill scenery.',
      },
      {
        question: 'What is the fare for a Bangalore to Chikmagalur cab?',
        answer: 'Fares depend on vehicle type and trip duration — call or WhatsApp us with your dates and group size for an accurate quote.',
      },
      {
        question: 'Which vehicle suits the Chikmagalur hill roads?',
        answer: 'An SUV works well for smaller groups; a Tempo Traveller is a comfortable choice for larger weekend groups on the hill-road sections.',
      },
    ],
    relatedVehicleSlugs: ['innova-crysta-rental-bangalore', 'tempo-traveller-rental-bangalore', 'sedan-rental-bangalore'],
  },
  {
    slug: 'bangalore-to-hampi-cab',
    destination: 'Hampi',
    h1: 'Bangalore to Hampi Cab Service',
    title: 'Bangalore to Hampi Cab | Fare & Distance',
    metaDescription:
      'Bangalore to Hampi cab service — approx. 340 km, 6–7 hrs one way to the UNESCO ruins. SUVs, Tempo Travellers & buses for overnight trips.',
    heroSubtitle: 'Approx. 340 km, 6–7 hours one way to the UNESCO World Heritage ruins of Hampi.',
    heroImage: '/hampi.webp',
    distance: 'Approx. 340 km',
    duration: 'Approx. 6–7 hours one way',
    geoSummary:
      'Sushi Travels operates chauffeur-driven cab service on the Bangalore to Hampi route, approximately 340 km and 6–7 hours one way to the UNESCO World Heritage ruins of the former Vijayanagara Empire. This route is best booked as a 2-day/1-night overnight round trip.',
    bodyParagraphs: [
      'Hampi\'s distance from Bangalore makes it a longer drive than most of our other popular routes, so we recommend an overnight round trip rather than attempting it same-day — most visitors also want the time to properly explore the boulder-strewn temple complexes and riverside sites.',
      'The route suits SUVs for smaller groups and Tempo Travellers or Force Urbania vans for larger groups, including history/heritage tour groups and school or college trips, which occasionally use our larger bus tiers.',
      'Hampi is also available as a ready-made two-day heritage package on our Tours & Packages page.',
    ],
    vehicleSuggestion: 'SUV or Tempo Traveller for families/groups; bus tiers available for large heritage tour groups.',
    faqs: [
      {
        question: 'What is the distance from Bangalore to Hampi?',
        answer: 'The Bangalore to Hampi route is approximately 340 km one way, taking roughly 6–7 hours by road.',
      },
      {
        question: 'Can I do a same-day trip to Hampi?',
        answer: 'It\'s possible but not recommended given the distance — we suggest a 2-day/1-night overnight round trip to comfortably see the ruins.',
      },
      {
        question: 'What is the fare for a Bangalore to Hampi cab?',
        answer: 'Fares depend on vehicle type and trip duration — call or WhatsApp us with your dates and group size for an accurate quote.',
      },
      {
        question: 'Can I book a bus for a large Hampi tour group?',
        answer: 'Yes — our 25-seater and 50-seater bus tiers are available on a per-trip quote for larger heritage tour groups or school/college trips.',
      },
    ],
    relatedVehicleSlugs: ['innova-crysta-rental-bangalore', 'tempo-traveller-rental-bangalore', 'bus-rental-bangalore'],
    packageSlug: 'bangalore-to-hampi',
  },
  {
    slug: 'bangalore-to-tirupati-cab',
    destination: 'Tirupati',
    h1: 'Bangalore to Tirupati Cab Service',
    title: 'Bangalore to Tirupati Cab | Fare & Distance',
    metaDescription:
      'Bangalore to Tirupati cab service — approx. 250 km, 5–5.5 hrs one way. Early darshan-timed pickups, sedans to Tempo Travellers with waiting driver.',
    heroSubtitle: 'Approx. 250 km, 5–5.5 hours one way — timed for darshan queues, with waiting-driver options for same-day return.',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200',
    distance: 'Approx. 250 km',
    duration: 'Approx. 5–5.5 hours one way',
    geoSummary:
      'Sushi Travels operates chauffeur-driven cab service on the Bangalore to Tirupati pilgrimage route, approximately 250 km and 5–5.5 hours one way. Trips are typically timed for an early-morning departure ahead of darshan queues, with waiting-driver options for same-day return.',
    bodyParagraphs: [
      'Tirupati is one of our most-booked pilgrimage routes, and most families departing Bangalore prefer an early-morning start to reach the temple in good time for darshan queues.',
      'For a same-day return, we can arrange a waiting driver who stays in Tirupati through the day; for extended families or larger pilgrimage groups, an overnight stay itinerary can also be arranged.',
      'This destination is also listed on our Tours & Packages page with more detail on trip structuring for extended families.',
    ],
    vehicleSuggestion: 'Sedan or SUV for small families; Tempo Traveller for extended-family pilgrimage groups.',
    faqs: [
      {
        question: 'What is the distance from Bangalore to Tirupati?',
        answer: 'The Bangalore to Tirupati route is approximately 250 km one way, taking roughly 5–5.5 hours by road.',
      },
      {
        question: 'Can I do a same-day Tirupati darshan trip?',
        answer: 'Yes — an early-morning departure with a waiting driver in Tirupati is our standard arrangement for same-day return pilgrimage trips.',
      },
      {
        question: 'What is the fare for a Bangalore to Tirupati cab?',
        answer: 'Fares depend on vehicle type and whether it\'s a same-day or overnight trip — call or WhatsApp us with your dates and group size for an accurate quote.',
      },
      {
        question: 'Which vehicle suits an extended-family pilgrimage trip?',
        answer: 'A sedan or SUV works for a small family; for extended families travelling together, our Tempo Traveller tiers are a popular choice.',
      },
    ],
    relatedVehicleSlugs: ['sedan-rental-bangalore', 'innova-rental-bangalore', 'tempo-traveller-rental-bangalore'],
    packageSlug: 'bangalore-to-tirupati',
  },
  {
    slug: 'bangalore-to-pondicherry-cab',
    destination: 'Pondicherry',
    h1: 'Bangalore to Pondicherry Cab Service',
    title: 'Bangalore to Pondicherry Cab | Fare & Distance',
    metaDescription:
      'Bangalore to Pondicherry cab service — approx. 310 km, 6–7 hrs one way to the French Quarter & beaches. Sedans to Tempo Travellers available.',
    heroSubtitle: 'Approx. 310 km, 6–7 hours one way to Pondicherry\'s French Quarter and beaches.',
    heroImage: 'https://images.unsplash.com/photo-1569157087866-f4a8e9250605?auto=format&fit=crop&q=80&w=1200',
    distance: 'Approx. 310 km',
    duration: 'Approx. 6–7 hours one way',
    geoSummary:
      'Sushi Travels operates chauffeur-driven cab service on the Bangalore to Pondicherry route, approximately 310 km and 6–7 hours one way, popular for a coastal weekend getaway to the French Quarter and Promenade Beach. Typically booked as a 2-day/1-night round trip.',
    bodyParagraphs: [
      'Pondicherry is a common weekend coastal escape for couples and friend groups, usually structured as a 2-day/1-night round trip with drop-off within walking distance of the French Quarter where possible.',
      'The highway drive is generally straightforward compared to our ghat-road routes, making a sedan or SUV a comfortable choice for smaller groups, while larger friend circles often book a Tempo Traveller.',
      'This destination is also available as a ready-made package on our Tours & Packages page.',
    ],
    vehicleSuggestion: 'Sedan or SUV for couples/small groups; Tempo Traveller for larger friend circles.',
    faqs: [
      {
        question: 'What is the distance from Bangalore to Pondicherry?',
        answer: 'The Bangalore to Pondicherry route is approximately 310 km one way, taking roughly 6–7 hours by road.',
      },
      {
        question: 'Is Pondicherry a good weekend trip from Bangalore?',
        answer: 'Yes, it\'s a popular 2-day/1-night weekend getaway for couples and friend groups given the mostly highway drive.',
      },
      {
        question: 'What is the fare for a Bangalore to Pondicherry cab?',
        answer: 'Fares depend on vehicle type and trip duration — call or WhatsApp us with your dates and group size for an accurate quote.',
      },
      {
        question: 'Which vehicle suits a Pondicherry weekend trip?',
        answer: 'A sedan or SUV is comfortable for couples and small groups; a Tempo Traveller works well for larger friend circles travelling together.',
      },
    ],
    relatedVehicleSlugs: ['sedan-rental-bangalore', 'innova-rental-bangalore', 'tempo-traveller-rental-bangalore'],
    packageSlug: 'bangalore-to-pondicherry',
  },
  {
    slug: 'bangalore-to-chennai-cab',
    destination: 'Chennai',
    h1: 'Bangalore to Chennai Cab Service',
    title: 'Bangalore to Chennai Cab | Fare & Distance',
    metaDescription:
      'Bangalore to Chennai cab service — approx. 350 km, 6–6.5 hrs one way via NH44. Sedans, SUVs & Tempo Travellers for business & family travel.',
    heroSubtitle: 'Approx. 350 km, 6–6.5 hours one way via NH44 — a straightforward highway drive.',
    heroImage: '/fleet/innova-crysta-front-01.webp',
    distance: 'Approx. 350 km',
    duration: 'Approx. 6–6.5 hours one way',
    geoSummary:
      'Sushi Travels operates chauffeur-driven cab service on the Bangalore to Chennai route, approximately 350 km and 6–6.5 hours one way via the NH44 highway. This route is used for both business travel and family trips, available as one-way drop or round trip.',
    bodyParagraphs: [
      'The Bangalore to Chennai route runs largely along NH44, one of the more well-maintained national highways connecting the two cities, making it a comparatively fast and predictable drive.',
      'We see a mix of business travellers booking one-way drops and families booking round trips for visiting relatives or events — a sedan or Innova generally suits both use cases well.',
      'Chennai isn\'t currently one of our pre-built Tours & Packages itineraries, but a custom one-way or round-trip quote is easy to arrange.',
    ],
    vehicleSuggestion: 'Sedan for business travel; Innova/Innova Crysta for family trips with luggage.',
    faqs: [
      {
        question: 'What is the distance from Bangalore to Chennai?',
        answer: 'The Bangalore to Chennai route is approximately 350 km one way, taking roughly 6–6.5 hours by road via NH44.',
      },
      {
        question: 'Can I book a one-way drop to Chennai?',
        answer: 'Yes, one-way drops are available on this route in addition to round trips — mention your requirement when enquiring.',
      },
      {
        question: 'What is the fare for a Bangalore to Chennai cab?',
        answer: 'Fares depend on vehicle type and whether it\'s one-way or round trip — call or WhatsApp us with your dates for an accurate quote.',
      },
      {
        question: 'Which vehicle suits a Bangalore to Chennai business trip?',
        answer: 'A sedan is a practical, economical choice for a single business traveller; families or those with more luggage often prefer an Innova.',
      },
    ],
    relatedVehicleSlugs: ['sedan-rental-bangalore', 'innova-rental-bangalore', 'innova-crysta-rental-bangalore'],
  },
  {
    slug: 'bangalore-to-hyderabad-cab',
    destination: 'Hyderabad',
    h1: 'Bangalore to Hyderabad Cab Service',
    title: 'Bangalore to Hyderabad Cab | Fare & Distance',
    metaDescription:
      'Bangalore to Hyderabad cab service — approx. 570 km, 9–10 hrs one way. SUVs & Tempo Travellers for long-distance business & family travel.',
    heroSubtitle: 'Approx. 570 km, 9–10 hours one way — our longest regular outstation route.',
    heroImage: '/fleet/innova-2011-front-02.webp',
    distance: 'Approx. 570 km',
    duration: 'Approx. 9–10 hours one way',
    geoSummary:
      'Sushi Travels operates chauffeur-driven cab service on the Bangalore to Hyderabad route, approximately 570 km and 9–10 hours one way, one of the longer routes we regularly run. Suited to SUVs and Tempo Travellers for the long highway stretch, available as one-way or round trip.',
    bodyParagraphs: [
      'At roughly 570 km, Bangalore to Hyderabad is one of the longest routes we run regularly, and we recommend an SUV over a sedan for the extra comfort on a full day of highway driving.',
      'Bookings on this route are a mix of business travel (one-way drops) and family trips, with some groups choosing to break the drive with a stop rather than doing it in a single stretch — this can be arranged as part of your itinerary.',
      'Hyderabad isn\'t currently one of our pre-built Tours & Packages itineraries, but a custom quote for this longer route is easy to arrange.',
    ],
    vehicleSuggestion: 'SUV (Innova/Innova Crysta) recommended for this longer highway route; Tempo Traveller for larger groups.',
    faqs: [
      {
        question: 'What is the distance from Bangalore to Hyderabad?',
        answer: 'The Bangalore to Hyderabad route is approximately 570 km one way, taking roughly 9–10 hours by road.',
      },
      {
        question: 'Is this a one-day drive?',
        answer: 'It can be done in a single long day, though some travellers prefer to break the journey — this can be arranged as part of your itinerary.',
      },
      {
        question: 'What is the fare for a Bangalore to Hyderabad cab?',
        answer: 'Fares depend on vehicle type and whether it\'s one-way or round trip — call or WhatsApp us with your dates for an accurate quote.',
      },
      {
        question: 'Which vehicle is recommended for this route?',
        answer: 'Given the distance, an SUV like the Innova or Innova Crysta is recommended over a sedan for extra comfort; larger groups can book a Tempo Traveller.',
      },
    ],
    relatedVehicleSlugs: ['innova-rental-bangalore', 'innova-crysta-rental-bangalore', 'tempo-traveller-rental-bangalore'],
  },
  {
    slug: 'bangalore-to-mangalore-cab',
    destination: 'Mangalore',
    h1: 'Bangalore to Mangalore Cab Service',
    title: 'Bangalore to Mangalore Cab | Fare & Distance',
    metaDescription:
      'Bangalore to Mangalore cab service — approx. 350 km, 7–8 hrs one way via the Western Ghats. SUVs & Tempo Travellers with experienced ghat-road drivers.',
    heroSubtitle: 'Approx. 350 km, 7–8 hours one way via the Western Ghats to the coast.',
    heroImage: '/fleet/innova-crysta-dashboard-01.webp',
    distance: 'Approx. 350 km',
    duration: 'Approx. 7–8 hours one way',
    geoSummary:
      'Sushi Travels operates chauffeur-driven cab service on the Bangalore to Mangalore route, approximately 350 km and 7–8 hours one way, crossing the Western Ghats to reach the coast. Best suited to SUVs and Tempo Travellers given the ghat-road driving.',
    bodyParagraphs: [
      'The Bangalore to Mangalore drive crosses the Western Ghats, which typically adds more travel time than the raw distance would suggest — our drivers are experienced with this stretch and the ghat-road driving it involves.',
      'This route is booked for both family coastal holidays and business travel to Mangalore, with an SUV generally preferred over a sedan for the ghat sections.',
      'Mangalore isn\'t currently one of our pre-built Tours & Packages itineraries, but a custom one-way or round-trip quote is easy to arrange.',
    ],
    vehicleSuggestion: 'SUV recommended for the ghat-road sections; Tempo Traveller for larger family/group trips.',
    faqs: [
      {
        question: 'What is the distance from Bangalore to Mangalore?',
        answer: 'The Bangalore to Mangalore route is approximately 350 km one way, taking roughly 7–8 hours by road via the Western Ghats.',
      },
      {
        question: 'Does this route cross the Western Ghats?',
        answer: 'Yes, the drive crosses the Western Ghats before descending to the coast, which is why travel time runs a bit longer than the distance alone would suggest.',
      },
      {
        question: 'What is the fare for a Bangalore to Mangalore cab?',
        answer: 'Fares depend on vehicle type and whether it\'s one-way or round trip — call or WhatsApp us with your dates for an accurate quote.',
      },
      {
        question: 'Which vehicle suits the Western Ghats crossing?',
        answer: 'An SUV like the Innova or Innova Crysta is recommended for the ghat-road sections; larger groups can book a Tempo Traveller.',
      },
    ],
    relatedVehicleSlugs: ['innova-crysta-rental-bangalore', 'tempo-traveller-rental-bangalore', 'innova-rental-bangalore'],
  },
];

export function getRoutePage(slug: string): RoutePage | undefined {
  return routePages.find((p) => p.slug === slug);
}
