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

// Real Google Business Profile reviews, copied word for word (typos included;
// only line breaks/spacing normalised). All are 5-star. Reviewers are shown by
// first name + last initial. Incomplete ("View full review") reviews and any
// that name another business were left out on purpose.
export const popularReviews = [
  {
    name: 'Shanthappa',
    location: 'Google review',
    rating: 5,
    text: 'Shushi Travels provided a completely hassle-free, safe, and spiritually fulfilling Sabarimala yatra, taking exceptional care of our comfort and schedule every step of the way.',
  },
  {
    name: 'Sharath G.',
    location: 'Google review',
    rating: 5,
    text: 'Excellent service drivery punctual polite and the vehicle was clean and comfortable highly recommended and staff was very friendly best travels to have a great journey',
  },
  {
    name: 'Ishaan M.',
    location: 'Google review',
    rating: 5,
    text: 'Nice and fantastic staffs and Buses are too GOOD. The dinner and refreshment halts were at very decent places, which we never experienced in this route.',
  },
  {
    name: 'Manya',
    location: 'Google review',
    rating: 5,
    text: 'Pleasure to meet sushi travel! We had a smooth, comfortable and safe journey allover. Best experience, friendly driver. Thankyou for giving such a memorable and comfortable drive ✨',
  },
  {
    name: 'Nandisha',
    location: 'Google review',
    rating: 5,
    text: 'We had good journey, driver was so friendly and calmly Vechile was so hygienic and well maintained',
  },
  {
    name: 'Ramesh P.',
    location: 'Google review',
    rating: 5,
    text: 'Very Good experience and well maintained vehicles. Experienced drivers. Best travels to book a trips.',
  },
];
