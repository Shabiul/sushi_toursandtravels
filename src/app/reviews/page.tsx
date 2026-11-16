import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getBreadcrumbListSchema, getWebPageSchema } from '@/lib/schema';
import TestimonialCard from '@/components/TestimonialCard';
import CTABand from '@/components/CTABand';
import { GOOGLE_PROFILE_URL, GOOGLE_REVIEW_COUNT_LABEL, googleReviews } from '@/lib/reviews';

export const metadata = {
  title: 'Customer Reviews, Bangalore Car Rental',
  description:
    'Real Google reviews of Sushi Travels, Bangalore: drivers, clean vehicles and trips to Sabarimala, Coorg and more, shown exactly as customers wrote them.',
  alternates: { canonical: '/reviews' },
  openGraph: {
    title: 'Customer Reviews | Sushi Travels',
    description:
      'Real Google reviews of Sushi Travels, Bangalore: drivers, clean vehicles and trips to Sabarimala, Coorg and more, shown exactly as customers wrote them.',
    url: '/reviews',
    images: [{ url: '/fleet/force-urbania-16-seater-front-01.webp', width: 800, height: 600, alt: 'Sushi Travels customer reviews' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customer Reviews | Sushi Travels',
    description: 'Real Google reviews of Sushi Travels, Bangalore, shown exactly as customers wrote them.',
    images: ['/fleet/force-urbania-16-seater-front-01.webp'],
  },
};

export default function ReviewsPage() {
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Customer Reviews', item: '/reviews' },
  ];

  return (
    <div className="bg-cream min-h-screen pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbListSchema(breadcrumbItems)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageSchema({
              name: 'Sushi Travels Customer Reviews',
              description: 'Real Google reviews of Sushi Travels, Bangalore.',
              url: '/reviews',
            }),
          ),
        }}
      />

      <section className="bg-navy text-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold">Customer Reviews</h1>
          <p className="text-sm sm:text-base text-cream-warm">
            {GOOGLE_REVIEW_COUNT_LABEL} Google reviews from travellers — drivers, vehicles and trips. Here are {googleReviews.length} of them, copied exactly as written.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {googleReviews.map((r) => (
            <TestimonialCard
              key={r.name + r.text.slice(0, 12)}
              testimonial={{ name: r.name, location: 'Google review', rating: 5, text: r.text }}
            />
          ))}
        </div>

        <div className="text-center space-y-2">
          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Read more Sushi Travels reviews on Google"
            className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-dark transition-colors duration-150"
          >
            <span>Read more on Google, and leave your own review</span>
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </a>
          <p className="text-xs text-navy-light">
            Reviews are shown word for word, spelling included. Reviewers appear by first name and last initial.
          </p>
        </div>

        <CTABand
          heading="Plan Your Trip With Sushi Travels"
          subheading="Call, WhatsApp, or submit a quick enquiry — our dispatch team will confirm availability and pricing."
          whatsappMessage="Hello Sushi Tours & Travels, I read your customer reviews and would like to book a vehicle."
        />
      </div>
    </div>
  );
}
