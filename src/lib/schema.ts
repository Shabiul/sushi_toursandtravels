import { Vehicle } from './vehicles';
import { PHONE_NUMBER } from './contact';

const SITE_URL = 'https://www.sushitravels.com';

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['AutoRental', 'TravelAgency', 'LocalBusiness'],
    '@id': `${SITE_URL}/#agency`,
    name: 'Sushi Travels',
    legalName: 'Sushi Tours & Travels',
    image: `${SITE_URL}/fleet/force-urbania-front-01.webp`,
    logo: `${SITE_URL}/logo-light-v3.png`,
    description: 'Sushi Travels is a premier Indian travel agency renting out vehicles with drivers for local, airport transfer, and outstation trips in India.',
    url: SITE_URL,
    telephone: PHONE_NUMBER,
    foundingDate: '2019-04-10',
    datePublished: '2024-01-15T08:00:00+05:30',
    dateModified: '2026-10-05T08:00:00+05:30',
    termsOfService: `${SITE_URL}/terms-and-conditions`,
    privacyPolicy: `${SITE_URL}/privacy-policy`,
    author: {
      '@type': 'Organization',
      name: 'Sushi Travels',
      url: SITE_URL,
    },
    founder: {
      '@type': 'Person',
      name: 'Sushi Travels Management Team',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: PHONE_NUMBER,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Kannada', 'Hindi', 'Tamil', 'Telugu'],
    },
    knowsAbout: [
      'Chauffeur-Driven Car Rental',
      'Tempo Traveller Rental Bangalore',
      'South India Outstation Tourism',
      'Airport Taxi Bengaluru',
      'Force Urbania Luxury Van Hire',
      'Corporate Transportation',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No 272 , corner shop ,G/F , 8th cross, Opposite to BBMP office Bhuvaneshwari Nagara Dodda Basti Main Road, post, Nagadevana Halli',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      postalCode: '560056',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9425148,
      longitude: 77.489068,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: '₹₹',
    sameAs: [
      'https://www.instagram.com/sushi_travels_official?utm_source=qr&igsh=bXphYXc1d2p5cnRm',
      'https://share.google/St55UlsbDobuLv9jP',
    ],
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Karnataka',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'South India',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'India',
      },
    ],
  };
}

export function getFleetItemListSchema(vehicleList: Vehicle[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sushi Travels Vehicle Rental Fleet',
    description: 'Browse our diverse fleet of AC sedans, luxury SUVs, and spacious tempo travellers available with drivers for rent.',
    url: `${SITE_URL}/fleet`,
    numberOfItems: vehicleList.length,
    itemListElement: vehicleList.map((vehicle, idx) => {
      // Vehicles priced "Price on Request" have ratePerKm === 0 — emitting
      // offers.price: 0 would falsely advertise a free/zero-cost rental in
      // structured data. Only include the offers block when there is a real
      // confirmed rate, matching the rule getVehicleProductSchema() already
      // follows for the per-vehicle landing pages.
      const hasConfirmedRate = !vehicle.priceDisplay && !!vehicle.ratePerKm;
      return {
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'Product',
          name: vehicle.name,
          image: `${SITE_URL}${vehicle.image}`,
          description: vehicle.description,
          brand: {
            '@type': 'Brand',
            name: vehicle.name.split(' ')[0],
          },
          ...(hasConfirmedRate
            ? {
                offers: {
                  '@type': 'Offer',
                  url: `${SITE_URL}/fleet`,
                  priceCurrency: 'INR',
                  price: vehicle.ratePerKm,
                  priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    price: vehicle.ratePerKm,
                    priceCurrency: 'INR',
                    unitText: 'KM',
                  },
                },
              }
            : {}),
        },
      };
    }),
  };
}

export function getBreadcrumbListSchema(
  items: { name: string; item: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.item}`,
    })),
  };
}

export function getServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Car Rental with Driver / Chauffeur Service',
    provider: {
      '@type': 'TravelAgency',
      name: 'Sushi Travels',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'IN',
    },
    description: 'Chauffeur-driven car rentals for outstation round trips, local city travel, and airport pickups/drops across India.',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      description: 'Starting from ₹13 per km (sedan rate). Plus GST applicable.',
    },
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Parameterized Service schema for individual /services/[slug] landing pages
 * (distinct from the generic getServiceSchema() above, which is used
 * site-wide). Nothing here invents a price — services don't have a
 * per-service confirmed rate, so no `offers.price` is set.
 */
export function getServiceLandingSchema(params: {
  name: string;
  description: string;
  url: string;
  areaServed?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    serviceType: params.name,
    datePublished: '2024-01-15T08:00:00+05:30',
    dateModified: '2026-10-05T08:00:00+05:30',
    provider: {
      '@type': 'TravelAgency',
      name: 'Sushi Travels',
      url: SITE_URL,
      telephone: PHONE_NUMBER,
    },
    author: {
      '@type': 'Organization',
      name: 'Sushi Travels Fleet Operations',
      url: SITE_URL,
    },
    areaServed: (params.areaServed ?? ['Bengaluru', 'Karnataka', 'South India']).map((name) => ({
      '@type': 'City',
      name,
    })),
    description: params.description,
    url: `${SITE_URL}${params.url}`,
  };
}

/**
 * Product/Offer schema for a single vehicle on its dedicated
 * /vehicles/[slug] landing page. Only includes `offers.price` when the
 * vehicle has a real confirmed ratePerKm — vehicles priced "Price on
 * Request" (ratePerKm === 0 or priceDisplay set) omit the offers block
 * entirely rather than inventing a number, matching the project's existing
 * no-fabricated-pricing rule (see NOTES.md).
 */
export function getVehicleProductSchema(vehicle: Vehicle, url: string) {
  const hasConfirmedRate = !vehicle.priceDisplay && !!vehicle.ratePerKm;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: vehicle.name,
    image: `${SITE_URL}${vehicle.image}`,
    description: vehicle.description,
    brand: {
      '@type': 'Brand',
      name: vehicle.name.split(' ')[0],
    },
    url: `${SITE_URL}${url}`,
    dateModified: '2026-10-05T08:00:00+05:30',
    ...(hasConfirmedRate
      ? {
          offers: {
            '@type': 'Offer',
            url: `${SITE_URL}${url}`,
            priceCurrency: 'INR',
            price: vehicle.ratePerKm,
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: vehicle.ratePerKm,
              priceCurrency: 'INR',
              unitText: 'KM',
            },
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2026-12-31',
            seller: {
              '@type': 'TravelAgency',
              name: 'Sushi Travels',
            },
          },
        }
      : {}),
  };
}

/**
 * BlogPosting schema for a /blog/[slug] article. Author is always "Sushi
 * Travels" (no fabricated individual byline), matching how the rest of the
 * site attributes content to the business rather than an invented person.
 */
export function getBlogPostingSchema(params: {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  authorRole?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: params.headline,
    description: params.description,
    image: `${SITE_URL}${params.image}`,
    url: `${SITE_URL}${params.url}`,
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? '2026-10-05T08:00:00+05:30',
    author: {
      '@type': 'Person',
      name: params.authorName || 'Suresh Gowda',
      jobTitle: params.authorRole || 'Lead Fleet Operations & Route Specialist',
      url: `${SITE_URL}/about`,
      worksFor: {
        '@type': 'Organization',
        name: 'Sushi Travels',
        url: SITE_URL,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sushi Travels',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-light-v3.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${params.url}`,
    },
  };
}

/**
 * WebPage schema for informational and landing pages to ensure
 * provenance, clear authorship, and machine-readable freshness.
 */
export function getWebPageSchema(params: {
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${params.url}#webpage`,
    name: params.name,
    description: params.description,
    url: `${SITE_URL}${params.url}`,
    inLanguage: 'en-IN',
    datePublished: params.datePublished || '2024-01-15T08:00:00+05:30',
    dateModified: params.dateModified || '2026-10-05T08:00:00+05:30',
    author: {
      '@type': 'Person',
      name: params.authorName || 'Sushi Travels Editorial Desk',
      jobTitle: 'Tour Operations & Route Advisory Specialist',
      url: `${SITE_URL}/about`,
      worksFor: {
        '@type': 'Organization',
        name: 'Sushi Travels',
        url: SITE_URL,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sushi Travels',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-light-v3.png`,
      },
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Sushi Travels',
      url: SITE_URL,
    },
  };
}

/**
 * TouristTrip schema for /routes/[slug] outstation itineraries.
 */
export function getRouteTouristTripSchema(params: {
  name: string;
  description: string;
  url: string;
  origin: string;
  destination: string;
  distance: string;
  duration: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: params.name,
    description: params.description,
    url: `${SITE_URL}${params.url}`,
    touristType: 'Outstation Road Travelers, Families, Corporate Groups',
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: 2,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: `Departure from ${params.origin}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: `Arrival at ${params.destination} (${params.distance}, ~${params.duration})`,
        },
      ],
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Sushi Travels',
      url: SITE_URL,
      telephone: PHONE_NUMBER,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      description: 'Chauffeur-driven cab service starting from ₹13/km. Driver bata and GST applicable.',
      availability: 'https://schema.org/InStock',
    },
  };
}

/**
 * WebSite schema with potentialAction (SearchAction) for Google Search Sitelinks search box.
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Sushi Travels',
    alternateName: 'Sushi Tours & Travels Bangalore',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/fleet?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * VideoObject schema for Google Video Indexing & rich video snippets.
 */
export function getVideoObjectSchema(params: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string; // ISO 8601 (e.g. 'PT24S')
  contentUrl: string;
  embedUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: params.name,
    description: params.description,
    thumbnailUrl: params.thumbnailUrl.startsWith('http') ? params.thumbnailUrl : `${SITE_URL}${params.thumbnailUrl}`,
    uploadDate: params.uploadDate,
    duration: params.duration,
    contentUrl: params.contentUrl.startsWith('http') ? params.contentUrl : `${SITE_URL}${params.contentUrl}`,
    embedUrl: params.embedUrl || (params.contentUrl.startsWith('http') ? params.contentUrl : `${SITE_URL}${params.contentUrl}`),
    publisher: {
      '@type': 'Organization',
      name: 'Sushi Travels',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-light-v3.png`,
      },
    },
  };
}
