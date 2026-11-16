import React from 'react';
import { Star } from 'lucide-react';
import type { GoogleReview } from '@/lib/reviews';

/**
 * Mid-article pull-quotes: real Google reviews dropped between sections of a
 * blog post. Marked as an aside so it reads as customer proof, not as part of
 * the author's own text.
 */
export default function InlineReviewQuotes({ reviews }: { reviews: GoogleReview[] }) {
  if (reviews.length === 0) return null;
  return (
    <aside aria-label="Customer reviews from Google" className="my-2 space-y-4 rounded-2xl bg-primary/5 border border-primary/15 p-5 sm:p-7">
      <p className="text-[11px] font-bold uppercase tracking-widest text-primary-dark">What travellers say on Google</p>
      {reviews.map((r) => (
        <figure key={r.name + r.text.slice(0, 12)} className="border-l-4 border-primary pl-4">
          <div className="flex items-center gap-0.5 mb-1.5" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary" />
            ))}
          </div>
          <blockquote className="text-sm sm:text-base text-navy italic leading-relaxed">&ldquo;{r.text}&rdquo;</blockquote>
          <figcaption className="mt-1.5 text-xs font-bold uppercase tracking-wider text-navy-light">{r.name} · Google review</figcaption>
        </figure>
      ))}
    </aside>
  );
}
