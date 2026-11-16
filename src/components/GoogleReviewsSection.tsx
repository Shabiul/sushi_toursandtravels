import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import TestimonialCard from '@/components/TestimonialCard';
import { GOOGLE_PROFILE_URL, GOOGLE_REVIEW_COUNT_LABEL, googleReviews, type GoogleReview } from '@/lib/reviews';

/**
 * A short strip of real Google reviews. The heading says these are reviews of
 * Sushi Travels as a whole, so a general review is never presented as a claim
 * about one specific vehicle.
 */
export default function GoogleReviewsSection({ reviews }: { reviews: GoogleReview[] }) {
  if (reviews.length === 0) return null;
  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <h2 className="font-serif font-bold text-xl text-navy">What Customers Say About Sushi Travels</h2>
        <p className="text-xs text-navy-light">{GOOGLE_REVIEW_COUNT_LABEL} Google reviews — a selection shown here exactly as written.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reviews.map((r) => (
          <TestimonialCard
            key={r.name + r.text.slice(0, 12)}
            testimonial={{ name: r.name, location: 'Google review', rating: 5, text: r.text }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
        <Link href="/reviews" title={`Read all ${googleReviews.length} customer reviews`} className="inline-flex items-center text-primary hover:text-primary-dark transition-colors duration-150">
          <span>Read all {googleReviews.length} reviews</span>
          <ArrowUpRight className="w-4 h-4 ml-1" />
        </Link>
        <a
          href={GOOGLE_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="See Sushi Travels on Google"
          className="inline-flex items-center text-navy hover:text-primary transition-colors duration-150"
        >
          <span>See us on Google</span>
          <ArrowUpRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </section>
  );
}
