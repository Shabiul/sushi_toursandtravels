import { googleReviews } from './reviews';

// Homepage "popular routes" and sample testimonials. Pure data (no database
// access) so the public pages can import it directly; seed.ts also uses it to
// fill an empty database for the admin dashboard.
export const popularRoutes = [
  {
    from: 'Bangalore',
    to: 'Mysore',
    distance: '143 km',
    duration: '2.5 hrs',
    estimatedPrice: '1,850',
    imageUrl: '/mysuru.webp',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Coorg',
    distance: '250 km',
    duration: '5.5 hrs',
    estimatedPrice: '3,250',
    imageUrl: '/coorg.webp',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Ooty',
    distance: '270 km',
    duration: '6 hrs',
    estimatedPrice: '3,510',
    imageUrl: '/ooty.webp',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Goa',
    distance: '560 km',
    duration: '11 hrs',
    estimatedPrice: '7,280',
    imageUrl: '/goa.webp',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Tirupati',
    distance: '250 km',
    duration: '5.5 hrs',
    estimatedPrice: 'Negotiable',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Pondicherry',
    distance: '310 km',
    duration: '6.5 hrs',
    estimatedPrice: 'Negotiable',
    imageUrl: 'https://images.unsplash.com/photo-1569157087866-f4a8e9250605?auto=format&fit=crop&q=80&w=600',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Hampi',
    distance: '340 km',
    duration: '6 hrs',
    estimatedPrice: 'Negotiable',
    imageUrl: '/hampi.webp',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Kodaikanal',
    distance: '460 km',
    duration: '8.5 hrs',
    estimatedPrice: 'Negotiable',
    imageUrl: '/kodaikanal.webp',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Munnar',
    distance: '480 km',
    duration: '9 hrs',
    estimatedPrice: 'Negotiable',
    imageUrl: '/munnar.webp',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Wayanad',
    distance: '290 km',
    duration: '6.5 hrs',
    estimatedPrice: 'Negotiable',
    imageUrl: '/wayand.webp',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Coimbatore (Isha Yoga Center)',
    distance: '365 km',
    duration: '7 hrs',
    estimatedPrice: 'Negotiable',
    imageUrl: '/Isha-Temple.webp',
    tripType: 'Round Trip',
  },
];

// Homepage testimonials: six real Google reviews from the single source of truth
// in src/lib/reviews.ts (word for word; see the notes there).
const HOME_REVIEW_NAMES = ['Shanthappa', 'Sharath G.', 'Ishaan M.', 'Manya', 'Nandisha', 'Ramesh P.'];

export const popularReviews = HOME_REVIEW_NAMES.map((name) => {
  const r = googleReviews.find((x) => x.name === name);
  if (!r) throw new Error(`homeContent.ts: no review for ${name}`);
  return { name: r.name, location: 'Google review', rating: 5, text: r.text };
});
