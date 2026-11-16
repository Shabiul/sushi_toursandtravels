/**
 * Real Google Business Profile reviews, copied word for word from the owner's
 * profile (typos kept; only line breaks and spacing normalised). All are
 * 5-star. Reviewers are shown as first name + last initial.
 *
 * Left out on purpose: reviews with no text (star-only), and one that names a
 * different business. Reviews that Google itself cut off ("View full review")
 * are shown as far as they were visible and end in "…" (`partial: true`).
 *
 * `tags` is set ONLY when the review itself clearly refers to that kind of
 * vehicle. Everything else is about Sushi Travels in general, and is shown on
 * vehicle pages under a "what customers say about Sushi Travels" heading — never
 * as a claim about a specific vehicle.
 */
export type ReviewTag = 'bus' | 'tempo-traveller' | 'coorg';

export interface GoogleReview {
  name: string;
  text: string;
  tags?: ReviewTag[];
  partial?: boolean;
}

export const GOOGLE_PROFILE_URL = 'https://maps.google.com/?cid=15212322609133405823';

/**
 * Owner says the Google profile has "around 59" reviews (2026-11-16). Shown as
 * "50+" so it stays true as the count moves; update to the exact figure if you
 * want a precise number. Only the reviews in `googleReviews` below are shown here.
 */
export const GOOGLE_REVIEW_COUNT_LABEL = '50+';

export const googleReviews: GoogleReview[] = [
  { name: 'Shanthappa', text: 'Shushi Travels provided a completely hassle-free, safe, and spiritually fulfilling Sabarimala yatra, taking exceptional care of our comfort and schedule every step of the way.' },
  { name: 'Sharath G.', text: 'Excellent service drivery punctual polite and the vehicle was clean and comfortable highly recommended and staff was very friendly best travels to have a great journey' },
  { name: 'Ishaan M.', text: 'Nice and fantastic staffs and Buses are too GOOD. The dinner and refreshment halts were at very decent places, which we never experienced in this route.', tags: ['bus'] },
  { name: 'Manya', text: 'Pleasure to meet sushi travel! We had a smooth, comfortable and safe journey allover. Best experience, friendly driver. Thankyou for giving such a memorable and comfortable drive ✨' },
  { name: 'Nandisha', text: 'We had good journey, driver was so friendly and calmly Vechile was so hygienic and well maintained' },
  { name: 'Ramesh P.', text: 'Very Good experience and well maintained vehicles. Experienced drivers. Best travels to book a trips.' },
  { name: 'Praveenkumar R.', text: "I'd highly recommend the traveller driver (Mr. Aadarsha) for anyone visiting Coorg: he knew the winding roads well,…", tags: ['tempo-traveller', 'coorg'], partial: true },
  { name: 'Ravindran J.', text: 'Absolutely flawless execution! Every detail of our trip was perfectly organized. 10/10 recommendation….', partial: true },
  { name: 'Reshma L.', text: "It's was amazing experience good driver Driver was so friendly and they suggest many places to see and the vehicle was well maintained i suggest everyone for sushi travels" },
  { name: 'Sanju', text: 'Very good service and excellent vehicle condition. Also special mention for Mr lohith for his patience and driving skills. Everything went almost perfect. Thank you. ✨🥰' },
  { name: 'Rohan K.', text: 'Excellent service, well-organised trip and great travel experience' },
  { name: 'Dhanu A.', text: 'The vehicle is excellent; there is a TV for entertainment, and it is very clean. The driver is friendly and provides helpful information.', partial: true },
  { name: 'Krishna G.', text: 'I had a good experience with sushi trave.. well maintained vechile Driver was to friendly 👌👌' },
  { name: 'Ranjitha G.', text: 'I had good experience in sushi travels. Well maintained vechile and the driver he was also so friendly i suggest everyone' },
  { name: 'Lavanya', text: 'This driver was driving is safe and secure and driver was very friendly and comedy and this travels was very safe this vechile was clean This driving was good drive contact to sushi travels' },
  { name: 'Shahrukh K.', text: "It's was good experience with this travels Vehicle was so hygienic well maintained…", partial: true },
  { name: 'Darshan D.', text: 'Good service neat and clean vehicle driver friendly comfortable journey excellent service Sushi Travels' },
  { name: 'Gunashekar G.', text: 'Nice experience in travel driver neat and clean good condition vehicle' },
  { name: 'Devaraja', text: 'Excellent service, vehicle maintained well, good driver.....' },
  { name: 'Girish G.', text: 'Good service neet neat and clean vehicle good response in travels I am suggest by my Colleagues nice sushi travels' },
  { name: 'Yoghi K.', text: 'Excellent service and communication with Travels excellent driver Neet and clean and services very good i suggest everyone for sushi travels' },
  { name: 'Ranjan J.', text: 'Excellent service, good communication with travels. Excellent driver, I suggest sushi travels' },
  { name: 'Madesh M.', text: 'Excellent service good communication with Travels excellent driver and services very good everyone for' },
  { name: 'Suhas A.', text: 'Good service good vehicle neat and clean comfortable vehicle next suggest driver and Travels sushi trivals' },
  { name: 'Kishor K.', text: "Nice service good driver's, matured behaviour on duty, happy to journey with Sushi travels" },
  { name: 'Charan B.', text: 'Fanastic service ❤️' },
  { name: 'Suresha G.', text: 'It was incredible expiriance With sushi travels thank you sushi travels' },
  { name: 'Sanika', text: 'Great experience and customer service ✨🤌' },
  { name: 'Shashidhar L.', text: 'It was very good drive and vehicle was very good too.' },
  { name: 'Nagaraj N.', text: 'Nice travels and nice driver Net clean vehicle express driver' },
  { name: 'Shobha R.', text: 'Best service in Sushi travels neat and clean vehicle best service driver' },
  { name: 'Ram N.', text: 'Good service Good driver neat and clean vehicle' },
  { name: 'Syed I.', text: 'Good service nice driver neet vehicle good travels' },
  { name: 'Anju S.', text: 'Very friendly kind person and he drives safety he good person' },
  { name: 'Ravi G.', text: 'Best driver and nice vichel and good service' },
  { name: 'Vinay N.', text: 'Good service and vehicles well maintained' },
  { name: 'Bhabani Shankar B.', text: 'Good driving good service Sushi tours and travels bitter 🥰🥰🥰' },
  { name: 'Chandru H.', text: 'Good driving safe person good' },
  { name: 'Anjan A.', text: 'Good travelling good driving' },
  { name: 'Chethan K.', text: 'Nice travels good experience' },
  { name: 'Karthik M.', text: 'Neat and clean' },
  { name: 'Shivaraju S.', text: 'Good service' },
  { name: 'Chethan T.', text: 'Good service' },
];

/**
 * Reviews to show on one vehicle page. Reviews that name this kind of vehicle
 * come first (they are not tied to one page). Every other review is a general
 * review of Sushi Travels and is given exactly one "home" vehicle page by
 * position (index % number of pages), so across all vehicle pages together every
 * review is used, no two pages show the same general reviews, and each page gets
 * a handful instead of a wall of text. Longer reviews are listed first.
 */
export function reviewsForVehicle(pageIndex: number, totalPages: number, kinds: ReviewTag[]): GoogleReview[] {
  const tagged = googleReviews.filter((r) => r.tags?.some((t) => kinds.includes(t))).slice(0, 2);
  const general = googleReviews
    .filter((r) => !r.tags)
    .filter((_, idx) => idx % totalPages === pageIndex)
    .sort((a, b) => b.text.length - a.text.length);
  return [...tagged, ...general];
}

/**
 * Which review kinds apply to a vehicle page. Matched on the vehicle's NAME for
 * Tempo Travellers (Force Urbania vans share the "Tempo Traveller" type in the
 * data, but a review that says "traveller" is not shown as if it were about them).
 */
export function reviewKindsFor(vehicles: { name: string; type: string }[]): ReviewTag[] {
  const kinds: ReviewTag[] = [];
  if (vehicles.some((v) => v.type === 'Bus')) kinds.push('bus');
  if (vehicles.some((v) => /tempo traveller/i.test(v.name))) kinds.push('tempo-traveller');
  return kinds;
}

/**
 * Reviews for one blog post, split into a mid-article group and an end-of-article
 * group. Same one-home-per-review rule as vehicle pages (index % number of posts),
 * so across all posts every general review is used once. Reviews that name a
 * place or vehicle type go only on the matching post and lead the mid-article group.
 */
export function reviewsForBlog(
  postIndex: number,
  totalPosts: number,
  kinds: ReviewTag[],
): { mid: GoogleReview[]; end: GoogleReview[] } {
  const tagged = googleReviews.filter((r) => r.tags?.some((t) => kinds.includes(t))).slice(0, 2);
  const general = googleReviews
    .filter((r) => !r.tags)
    .filter((_, idx) => idx % totalPosts === postIndex)
    .sort((a, b) => b.text.length - a.text.length);
  const all = [...tagged, ...general];
  return { mid: all.slice(0, 3), end: all.slice(3) };
}

/** Which review kinds a blog post can show, from its slug (place / vehicle type it is about). */
export function blogReviewKinds(slug: string): ReviewTag[] {
  const kinds: ReviewTag[] = [];
  if (slug.includes('coorg')) kinds.push('coorg');
  if (slug.includes('tempo-traveller')) kinds.push('tempo-traveller');
  return kinds;
}
