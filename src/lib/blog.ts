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
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
