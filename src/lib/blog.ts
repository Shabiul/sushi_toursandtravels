import { Faq } from '@/components/FaqAccordion';

export interface BlogCitation {
  authority: string;
  role: string;
  quote?: string;
  url: string;
  linkText: string;
  title: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  publishDate: string;
  dateModified: string;
  author: string;
  authorRole: string;
  authorBio: string;
  reviewer: string;
  coverImage: string;
  /** Every gallery photo for this post, including the cover image. */
  images: string[];
  video?: string;
  geoSummary: string;
  bodyParagraphs: string[];
  citations: BlogCitation[];
  faqs: Faq[];
  /** Prefix for gallery image alt text, e.g. "Mysore Palace, Karnataka". */
  imageAltPrefix: string;
  /** Heading above the video block (only used when `video` is set). */
  videoHeading?: string;
  /** Contextual internal links to the money pages this post supports. */
  relatedLinks?: { label: string; href: string; title: string }[];
}

/**
 * All 19 photos + 1 video living in public/blog/ for the Statue of Unity
 * post. Extensions are mixed (.webp / .jpg) exactly as the source files were
 * provided — verified against the actual directory listing before wiring in,
 * not guessed.
 */
const GUJARAT_IMAGES = [
  '/blog/Gujarat-blog-1.webp',
  '/blog/Gujarat-blog-2.webp',
  '/blog/Gujarat-blog-3.webp',
  '/blog/Gujarat-blog-4.webp',
  '/blog/Gujarat-blog-5.webp',
  '/blog/Gujarat-blog-6.webp',
  '/blog/Gujarat-blog-7.webp',
  '/blog/Gujarat-blog-8.webp',
  '/blog/Gujarat-blog-9.webp',
  '/blog/Gujarat-blog-10.webp',
  '/blog/Gujarat-blog-11.webp',
  '/blog/Gujarat-blog-12.jpg',
  '/blog/Gujarat-blog-13.jpg',
  '/blog/Gujarat-blog-14.jpg',
  '/blog/Gujarat-blog-15.webp',
  '/blog/Gujarat-blog-16.jpg',
  '/blog/Gujarat-blog-17.webp',
  '/blog/Gujarat-blog-18.jpg',
  '/blog/Gujarat-blog-19.jpg',
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'statue-of-unity-kevadia-gujarat-travel-diary',
    title: 'A Travel Diary: The Statue of Unity, Kevadia, Gujarat',
    metaDescription:
      'A first-hand travel diary of Kevadia, Gujarat — the Statue of Unity, Jungle Safari Park, Sardar Sarovar Dam and the valley of flowers, from Sushi Travels.',
    excerpt:
      'Notes from a trip to Kevadia — the world\'s tallest statue, an eagle-shaped safari park, the Sardar Sarovar Dam, and a quiet valley of flowers on the Narmada.',
    publishDate: '2026-08-20',
    dateModified: '2026-10-05',
    author: 'Suresh Gowda',
    authorRole: 'Lead Fleet Operations & Mountain Route Specialist',
    authorBio: 'Suresh has managed commercial passenger vehicle dispatch, highway safety protocols, and interstate route planning for Sushi Travels across South and Central India for over 14 years.',
    reviewer: 'Sushi Travels Editorial & Safety Advisory Board',
    coverImage: GUJARAT_IMAGES[0],
    images: GUJARAT_IMAGES,
    video: '/blog/Gujarat-blog-video-1.mp4',
    imageAltPrefix: 'Statue of Unity, Kevadia, Gujarat',
    videoHeading: 'A Look Around Kevadia',
    geoSummary:
      'The Statue of Unity, the world\'s tallest statue at 182 metres, stands at Kevadia in Narmada district, Gujarat, on the Sardar Sarovar Dam reservoir. Kevadia is roughly 1,300 km from Bengaluru by road, and the site includes the statue viewing gallery, the Jungle Safari Park, a valley of flowers, and museum exhibits — most visitors plan a full day to see it properly.',
    citations: [
      {
        authority: 'Sardar Vallabhbhai Patel Rashtriya Ekta Trust (SVPRET)',
        role: 'Official Statutory Authority Managing Statue of Unity Project',
        quote:
          'The 182-metre Statue of Unity was engineered to withstand severe wind velocities of up to 50 m/sec (180 km/h) and earthquakes measuring up to 6.5 on the Richter scale, setting a benchmark for monumental civil engineering.',
        url: 'https://statueofunity.in',
        linkText: 'Visit the Official Statue of Unity Authority Portal (statueofunity.in)',
        title: 'Official Statutory Portal for Statue of Unity Tickets and Engineering Facts',
      },
      {
        authority: 'Gujarat Tourism Development Corporation',
        role: 'Official State Tourism Promotion Bureau',
        quote:
          'The integrated Kevadia tourism zone includes the Sardar Sarovar Dam view terrace, Valley of Flowers, and the 375-acre Zoological Park, forming a premier eco-tourism destination in western India.',
        url: 'https://www.gujarattourism.com',
        linkText: 'Explore Gujarat Tourism Kevadia Circuit (gujarattourism.com)',
        title: 'Gujarat Tourism Official Destination Guide for Kevadia and Narmada',
      },
      {
        authority: 'National Highways Authority of India (NHAI)',
        role: 'Ministry of Road Transport and Highways, Government of India',
        quote:
          'Long-distance passenger road journeys crossing state corridors require continuous electronic FASTag compliance, strict adherence to commercial speed governors, and verified driver rest schedules.',
        url: 'https://nhai.gov.in',
        linkText: 'Read Highway Corridor Norms on NHAI Official Portal (nhai.gov.in)',
        title: 'National Highways Authority of India Official Portal',
      },
    ],
    bodyParagraphs: [
      'Some destinations are worth the distance simply because nothing photographs the scale of them until you\'re standing underneath. Kevadia, a small town in Gujarat\'s Narmada district, is one of those places — home to the Statue of Unity, a 182-metre bronze-clad statue of Sardar Vallabhbhai Patel that is, as of writing, the tallest statue in the world. Even from the approach road, well before the toll gates and the ticket counters, the statue is visible over the hills, and it only gets more disorienting in scale as you get closer.',
      'The statue itself sits on a purpose-built island in the Sardar Sarovar Dam reservoir on the Narmada river, and the dam is very much part of the experience rather than a footnote — the reservoir stretches out on either side, and the viewing gallery inside the statue (reached by a high-speed lift) looks straight down the length of it. It\'s worth timing the visit for late afternoon if you can; the light on the water and the surrounding Satpura and Vindhya hills is considerably better than the midday glare.',
      'A short distance from the statue is the Jungle Safari Park, easily recognisable from a distance by its main building, which is shaped like a giant eagle with outstretched wings — an unusual, striking piece of architecture that houses the entrance and interpretation areas before the safari trail itself. The safari is a proper half-day activity on its own, with enclosures for a wide range of Indian wildlife laid out across rolling, well-maintained grounds, and it\'s a good complement to the statue if you\'re not in a rush.',
      'One of the quieter, more affecting parts of the complex is a memorial near the statue base where a single footprint is preserved under glass — a small, understated marker compared to the scale of everything around it, but the kind of detail that stays with you longer than the big photographs do. Nearby, the Valley of Flowers area (landscaped gardens laid out along the riverbank, distinct from the more famous Uttarakhand valley of the same name) offers a genuinely pleasant, unhurried walk after a day of sightseeing that otherwise involves a fair amount of queuing and walking on hard pathways.',
      'Kevadia is a long way from Bengaluru — well over a thousand kilometres by road — so this isn\'t a weekend dash for most South Indian travellers; it\'s the kind of trip that makes more sense as a flight into Ahmedabad or Vadodara followed by a road transfer, or folded into a longer Gujarat itinerary. For groups planning the outstation leg of a trip like this, or any long-distance chauffeur-driven journey across state lines, that\'s exactly the kind of trip Sushi Travels\' outstation and round-trip car rental service is built around — a private vehicle and driver for the parts of the journey within driving range, so the group isn\'t juggling logistics on top of sightseeing.',
      'If Kevadia is on your list, our honest advice is to give it a full day and not try to combine it with too much else on the same date — the statue viewing gallery, the safari park, and the gardens are each worth unhurried time, and the site rewards patience over a rushed checklist visit.',
    ],
    faqs: [
      {
        question: 'How far is the Statue of Unity from Bangalore, and how do people usually get there?',
        answer:
          'Kevadia is roughly 1,300 km from Bengaluru by road — too far for a direct drive for most travellers. The common approach is a flight into Ahmedabad or Vadodara followed by a road transfer of a few hours, often as part of a longer Gujarat trip rather than a standalone visit.',
      },
      {
        question: 'What is the best time of day to visit the Statue of Unity?',
        answer:
          'Late afternoon tends to give the best light on the reservoir and surrounding hills, and the viewing gallery queues are generally shorter than in the late morning. Early morning is a good alternative if you want to beat both the heat and the crowds.',
      },
      {
        question: 'What else is there to see at Kevadia besides the statue itself?',
        answer:
          'The Jungle Safari Park (recognisable by its eagle-shaped main building), a preserved footprint memorial near the statue base, landscaped Valley of Flowers gardens along the riverbank, and museum exhibits on the statue\'s construction are all part of the same complex and worth a full day combined.',
      },
      {
        question: 'Does Sushi Travels arrange trips to destinations this far from Bangalore?',
        answer:
          'For a distance like Kevadia\'s, most travellers fly part of the way — but Sushi Travels\' outstation and round-trip chauffeur-driven car rental service is built for exactly this kind of long-distance travel need once you\'re on the ground, wherever the trip is within driving range of Bangalore.',
      },
    ],
  },
  {
    slug: "bangalore-to-mysore-day-trip-guide",
    title: "Bangalore to Mysore Day Trip: Route, Timing & Vehicle Guide",
    metaDescription:
      "Plan a Bangalore to Mysore day trip by cab: approx. 143 km, 2.5–3 hrs each way, what to see, an easy schedule and which vehicle suits your group.",
    excerpt:
      "Mysore is close enough for a same-day round trip from Bangalore. Here is a simple schedule, what to prioritise, and how to choose between a sedan, an Innova and a Tempo Traveller.",
    publishDate: '2026-10-24',
    dateModified: '2026-10-24',
    author: 'Sushi Travels Editorial Team',
    authorRole: 'Bangalore Chauffeur & Outstation Travel Desk',
    authorBio: 'The Sushi Travels team plans and runs chauffeur-driven outstation trips out of Bangalore, and writes these guides from the routes our drivers cover.',
    reviewer: 'Sushi Travels Editorial & Safety Advisory Board',
    coverImage: "/mysuru.webp",
    images: ["/mysuru.webp"],
    imageAltPrefix: "Mysore Palace, Karnataka",
    geoSummary:
      "The Bangalore to Mysore road trip is approximately 143 km and 2.5–3 hours one way under normal traffic, which makes it comfortable as a same-day round trip. A chauffeur-driven sedan or Innova suits small families, while a Tempo Traveller keeps larger groups together.",
    bodyParagraphs: [
      "Mysore is the easiest heritage destination to reach from Bangalore. At approximately 143 km and 2.5–3 hours each way, it works as a single-day round trip, and it is one of the routes our drivers run most often.",
      "The main reason to leave early is traffic. Leaving Bangalore soon after sunrise helps you clear the city before the morning rush and reach Mysore in time to see the palace without the midday crowds. Plan your return so that you are back on the highway before the evening peak.",
      "A workable day looks like this: depart Bangalore early, reach Mysore for the palace, take a lunch break, then spend the afternoon at Chamundi Hills or the city markets before heading back. If you also want a garden or river stop on the way, tell your driver in advance so the timings can be planned around it.",
      "Vehicle choice is mostly about group size and luggage. A sedan or Innova is comfortable for a small family. For eight or more people, a Tempo Traveller keeps everyone in one vehicle, which also makes the day easier to manage than coordinating two cars.",
      "If you would rather not plan the day yourself, Mysore is also available as a ready-made day-trip package. For anything custom, such as a different start time or an extra stop, a regular outstation cab booking gives you full control of the itinerary.",
    ],
    citations: [],
    faqs: [
      { question: "How long does it take to drive from Bangalore to Mysore?", answer: "Approximately 2.5–3 hours one way under normal traffic conditions, over a distance of about 143 km." },
      { question: "Is a same-day Mysore round trip realistic?", answer: "Yes. Mysore is one of the most common same-day round trips from Bangalore, as long as you start early and plan your return before the evening traffic." },
      { question: "Which vehicle should I book for a Mysore day trip?", answer: "A sedan or Innova suits a small family. A Tempo Traveller is the better choice for groups of eight or more." },
      { question: "How do I get a fare for the trip?", answer: "Fares depend on the vehicle, trip duration and tolls. Call or WhatsApp Sushi Travels with your date and group size for an accurate quote." },
    ],
    relatedLinks: [
      { label: "Bangalore to Mysore cab service", href: "/routes/bangalore-to-mysore-cab", title: "Bangalore to Mysore Cab: Distance and Fare Enquiry" },
      { label: "Mysore day-trip package", href: "/tours-and-packages", title: "Bangalore Holiday Tour Packages" },
      { label: "Tempo Traveller rental in Bangalore", href: "/vehicles/tempo-traveller-rental-bangalore", title: "12 Seater Tempo Traveller Rental in Bangalore" },
      { label: "Innova rental with driver", href: "/vehicles/innova-rental-bangalore", title: "Innova Rental in Bangalore with Driver" },
    ],
  },
  {
    slug: "bangalore-to-coorg-weekend-trip-guide",
    title: "Bangalore to Coorg Weekend Trip: Route & Vehicle Guide",
    metaDescription:
      "Planning Bangalore to Coorg by cab? Approx. 250 km, 5.5–6 hrs through ghat roads. A 2-day plan, the best vehicle for the ghats and booking tips.",
    excerpt:
      "Coorg is a classic two-day trip from Bangalore. This guide covers the drive, a simple 2-day plan, and why vehicle choice matters on the ghat-road sections.",
    publishDate: '2026-10-24',
    dateModified: '2026-10-24',
    author: 'Sushi Travels Editorial Team',
    authorRole: 'Bangalore Chauffeur & Outstation Travel Desk',
    authorBio: 'The Sushi Travels team plans and runs chauffeur-driven outstation trips out of Bangalore, and writes these guides from the routes our drivers cover.',
    reviewer: 'Sushi Travels Editorial & Safety Advisory Board',
    coverImage: "/coorg.webp",
    images: ["/coorg.webp"],
    imageAltPrefix: "Coorg, Karnataka",
    geoSummary:
      "The Bangalore to Coorg drive is approximately 250 km and 5.5–6 hours one way, including a ghat-road stretch through coffee country. It is most commonly booked as a 2-day, 1-night round trip, and SUVs or Tempo Travellers with an experienced driver are the usual choice.",
    bodyParagraphs: [
      "Coorg sits roughly 250 km from Bangalore, and the drive takes about 5.5–6 hours each way. That is too long to enjoy as a rushed day trip, which is why most travellers book it as a 2-day, 1-night round trip.",
      "The final stretch climbs through ghat roads and coffee-estate country. It is scenic, but it is also the part of the route where an experienced driver matters most, especially if you are travelling with children, elderly family members, or anyone prone to motion sickness.",
      "A simple plan: leave Bangalore early on day one so that you reach Coorg by the afternoon, spend the evening at a viewpoint or near your stay, then use day two for waterfalls and local sights before the drive back. Longer itineraries are easy to extend if you want a slower pace.",
      "For vehicle choice, an SUV such as the Innova or Innova Crysta is comfortable for smaller groups. For larger groups, a Tempo Traveller driven by someone who knows the ghat sections is a popular option, and it keeps everyone together for the whole trip.",
      "Coorg is also available as a pre-planned two-day package. If you want a custom itinerary with your own stops and timings, a regular outstation cab booking is the better fit.",
    ],
    citations: [],
    faqs: [
      { question: "How far is Coorg from Bangalore?", answer: "Approximately 250 km one way, taking around 5.5–6 hours by road including the ghat-road section." },
      { question: "Is Coorg a day trip or an overnight trip?", answer: "It is usually booked as a 2-day, 1-night round trip because of the drive time. Longer stays can be arranged." },
      { question: "Which vehicle is best for the Coorg ghat roads?", answer: "An SUV like the Innova Crysta suits smaller groups. For larger groups, a Tempo Traveller with an experienced ghat-road driver is a popular choice." },
      { question: "What does a Coorg cab cost?", answer: "It depends on vehicle type, number of days and tolls. Call or WhatsApp Sushi Travels with your dates and group size for a quote." },
    ],
    relatedLinks: [
      { label: "Bangalore to Coorg cab service", href: "/routes/bangalore-to-coorg-cab", title: "Bangalore to Coorg Cab: Distance and Fare Enquiry" },
      { label: "Coorg 2-day package", href: "/tours-and-packages", title: "Bangalore Holiday Tour Packages" },
      { label: "Innova Crysta rental", href: "/vehicles/innova-crysta-rental-bangalore", title: "Innova Crysta Rental in Bangalore" },
      { label: "Tempo Traveller rental in Bangalore", href: "/vehicles/tempo-traveller-rental-bangalore", title: "12 Seater Tempo Traveller Rental in Bangalore" },
    ],
  },
  {
    slug: "bangalore-to-ooty-trip-guide",
    title: "Bangalore to Ooty by Cab: Route, Timing & Vehicle Guide",
    metaDescription:
      "Bangalore to Ooty by cab: approx. 270 km, 6–7 hrs via Bandipur and the Nilgiri hairpin bends. Route notes, a 2-day plan and the right vehicle.",
    excerpt:
      "The Ooty drive passes through the Bandipur forest corridor and climbs the Nilgiri hairpin bends. Here is what to expect and how to plan it.",
    publishDate: '2026-10-24',
    dateModified: '2026-10-24',
    author: 'Sushi Travels Editorial Team',
    authorRole: 'Bangalore Chauffeur & Outstation Travel Desk',
    authorBio: 'The Sushi Travels team plans and runs chauffeur-driven outstation trips out of Bangalore, and writes these guides from the routes our drivers cover.',
    reviewer: 'Sushi Travels Editorial & Safety Advisory Board',
    coverImage: "/ooty.webp",
    images: ["/ooty.webp"],
    imageAltPrefix: "Ooty, Tamil Nadu",
    geoSummary:
      "The Bangalore to Ooty drive is approximately 270 km and 6–7 hours one way via the Bandipur forest corridor and the Nilgiri hairpin bends. It is typically booked as a 2-day, 1-night round trip with an experienced hill-road driver in an SUV or a Tempo Traveller.",
    bodyParagraphs: [
      "Ooty is roughly 270 km from Bangalore, and the drive takes around 6–7 hours one way. The route runs through the Bandipur forest corridor before climbing the hairpin bends into the Nilgiris.",
      "Because part of the route passes through a forest reserve, it is worth checking current travel-time rules for that stretch before you fix your departure time. Our drivers know the conditions on this route and plan the schedule around them.",
      "Most travellers book Ooty as a 2-day, 1-night round trip. That leaves time for the tea gardens, the Botanical Garden and Ooty Lake without cutting the drive short. Families who want a slower pace often extend it to a longer stay.",
      "The hairpin section is the reason vehicle and driver choice matter here. An SUV suits small families. For larger groups, a 12-seater Tempo Traveller or a Force Urbania handles the hill roads comfortably with an experienced driver.",
      "Ooty is also available as a ready-made package. For a custom plan with extra stops, a regular outstation cab booking is more flexible.",
    ],
    citations: [],
    faqs: [
      { question: "How far is Ooty from Bangalore?", answer: "Approximately 270 km one way, taking roughly 6–7 hours via the Bandipur forest corridor and Nilgiri hairpin bends." },
      { question: "Does the Ooty route pass through a forest?", answer: "Yes. It passes through the Bandipur forest corridor, and our drivers are familiar with the conditions on this stretch." },
      { question: "Which vehicle suits the Ooty hairpin bends?", answer: "An SUV suits smaller families. For larger groups, a 12-seater Tempo Traveller or Force Urbania with an experienced driver is a good fit." },
      { question: "How do I get a fare for an Ooty trip?", answer: "Fares depend on vehicle, number of days and tolls. Call or WhatsApp Sushi Travels with your dates and group size for a quote." },
    ],
    relatedLinks: [
      { label: "Bangalore to Ooty cab service", href: "/routes/bangalore-to-ooty-cab", title: "Bangalore to Ooty Cab: Distance and Fare Enquiry" },
      { label: "Ooty tour package", href: "/tours-and-packages", title: "Bangalore Holiday Tour Packages" },
      { label: "Force Urbania 12-seater rental", href: "/vehicles/force-urbania-12-seater-maharaja-bangalore", title: "Force Urbania 12 Seater Rental in Bangalore" },
      { label: "Innova Crysta rental", href: "/vehicles/innova-crysta-rental-bangalore", title: "Innova Crysta Rental in Bangalore" },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
