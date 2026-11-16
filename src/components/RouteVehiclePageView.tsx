import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Route as RouteIcon, Clock } from 'lucide-react';
import { getBreadcrumbListSchema, getFAQSchema, getWebPageSchema } from '@/lib/schema';
import { routePages } from '@/lib/routes';
import { locationPages } from '@/lib/locations';
import { vehiclePages } from '@/lib/vehiclePages';
import {
  FARE_GROUPS,
  routeVehiclePages,
  routeVehiclePagesForGroup,
  type RouteVehiclePage,
} from '@/lib/routeVehiclePages';
import { reviewsForVehicle } from '@/lib/reviews';
import LandingHero from '@/components/LandingHero';
import FaqAccordion from '@/components/FaqAccordion';
import CTABand from '@/components/CTABand';
import RelatedLinks from '@/components/RelatedLinks';
import GoogleReviewsSection from '@/components/GoogleReviewsSection';

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export default function RouteVehiclePageView({ page }: { page: RouteVehiclePage }) {
  const url = `/routes/${page.slug}`;
  const route = routePages.find((r) => r.slug === page.routeSlug)!;
  const group = FARE_GROUPS.find((g) => g.key === page.groupKey)!;
  const otherGroup = FARE_GROUPS.find((g) => g.key !== page.groupKey)!;
  const otherPage = routeVehiclePages.find((p) => p.routeSlug === page.routeSlug && p.groupKey === otherGroup.key);
  const sameGroupOtherRoutes = routeVehiclePagesForGroup(page.groupKey).filter((p) => p.slug !== page.slug);
  const showPerPerson = page.rows.some((r) => r.perPerson !== null);
  const pageIndex = routeVehiclePages.findIndex((p) => p.slug === page.slug);

  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Routes', item: '/routes' },
    { name: page.h1, item: url },
  ];
  const whatsappMessage = `Hello Sushi Tours & Travels, I would like a ${group.label} quote for Bangalore to ${page.destination}. Please confirm availability and the final price.`;

  return (
    <div className="bg-cream min-h-screen pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbListSchema(breadcrumbItems)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(page.faqs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageSchema({
              name: `${page.h1} — Fares and Cost Examples`,
              description: page.metaDescription,
              url,
              datePublished: '2026-11-16T08:00:00+05:30',
              dateModified: new Date().toISOString(),
            }),
          ),
        }}
      />

      <LandingHero
        h1={page.h1}
        subtitle={page.heroSubtitle}
        crumbs={[
          { name: 'Routes', href: '/routes' },
          { name: page.h1, href: url },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="flex items-center gap-2 text-xs text-primary font-semibold border-b border-navy-light/10 pb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Fares worked out from Sushi Travels&apos; published per-km rates</span>
        </div>

        {/* Answer-first summary */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-3">
          <p className="text-sm sm:text-base text-navy leading-relaxed">{page.summary}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-navy-light font-semibold">
            <span className="inline-flex items-center gap-1.5"><RouteIcon className="w-3.5 h-3.5 text-primary" />About {page.oneWay} km each way</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary" />Priced as a {page.days}-day round trip</span>
          </div>
        </section>

        {/* Fare table */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4">
          <h2 className="font-serif font-bold text-xl text-navy">
            {group.label} Fare: Bangalore to {page.destination} and Back
          </h2>
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full text-sm border-collapse min-w-[560px]">
              <thead>
                <tr className="border-b-2 border-navy-light/15 text-left text-[11px] uppercase tracking-wider text-navy-light">
                  <th className="py-2 pr-3 font-bold">Vehicle</th>
                  <th className="py-2 px-3 font-bold">Rate</th>
                  <th className="py-2 px-3 font-bold">Billed km</th>
                  <th className="py-2 px-3 font-bold">Estimated total</th>
                  {showPerPerson && <th className="py-2 pl-3 font-bold">Per person</th>}
                </tr>
              </thead>
              <tbody>
                {page.rows.map((r) => (
                  <tr key={r.vehicleName} className="border-b border-navy-light/10 last:border-0">
                    <td className="py-3 pr-3 font-semibold text-navy">
                      <Link href={`/vehicles/${r.pageSlug}`} title={`View ${r.vehicleName} rates and details`} className="hover:text-primary transition-colors duration-150">
                        {r.vehicleName}
                      </Link>
                      <span className="block text-[11px] font-normal text-navy-light">{r.seatsDisplay}</span>
                    </td>
                    <td className="py-3 px-3 text-navy-light">{r.rateLabel}</td>
                    <td className="py-3 px-3 text-navy-light">{r.billedKm} km</td>
                    <td className="py-3 px-3 font-bold text-navy whitespace-nowrap">{inr(r.total)}</td>
                    {showPerPerson && (
                      <td className="py-3 pl-3 text-navy-light whitespace-nowrap">{r.perPerson !== null ? `about ${inr(r.perPerson)}` : '—'}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-navy-light leading-relaxed">
            Estimates for a {page.days}-day round trip: billed km × rate + {inr(page.bata)} driver bata per day. Tolls, parking, state permit and entry fees, night allowance and 5% GST are extra and billed at actuals (see our{' '}
            <Link href="/terms-and-conditions" title="Read our rental terms" className="underline decoration-navy-light/40 hover:text-primary">terms</Link>
            ). Call or WhatsApp for a confirmed quote for your dates.
          </p>
        </section>

        {/* Cost by trip length */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4">
          <h2 className="font-serif font-bold text-xl text-navy">
            How Trip Length Changes the Cost ({page.lengthVehicleName})
          </h2>
          <p className="text-sm text-navy leading-relaxed">
            The round trip to {page.destination} is about {page.roundTripKm} km. Because every day bills at least {page.minKm} km, a longer stay costs more even if you drive the same distance:
          </p>
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full text-sm border-collapse min-w-[420px]">
              <thead>
                <tr className="border-b-2 border-navy-light/15 text-left text-[11px] uppercase tracking-wider text-navy-light">
                  <th className="py-2 pr-3 font-bold">Trip length</th>
                  <th className="py-2 px-3 font-bold">Billed km</th>
                  <th className="py-2 pl-3 font-bold">Estimated total</th>
                </tr>
              </thead>
              <tbody>
                {page.byLength.map((l) => (
                  <tr key={l.days} className="border-b border-navy-light/10 last:border-0">
                    <td className="py-3 pr-3 font-semibold text-navy">{l.days} day{l.days > 1 ? 's' : ''}</td>
                    <td className="py-3 px-3 text-navy-light">{l.billedKm} km</td>
                    <td className="py-3 pl-3 font-bold text-navy whitespace-nowrap">{inr(l.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <GoogleReviewsSection reviews={reviewsForVehicle(pageIndex % vehiclePages.length, vehiclePages.length, [])} />

        <FaqAccordion faqs={page.faqs} />

        <CTABand
          heading={`Book a ${group.label} to ${page.destination}`}
          subheading="Call, WhatsApp, or submit a quick enquiry — our dispatch team will confirm availability and the final price."
          whatsappMessage={whatsappMessage}
        />

        <RelatedLinks
          groups={[
            {
              heading: `Bangalore to ${page.destination}`,
              links: [
                { label: route.h1, href: `/routes/${route.slug}`, title: `${route.h1}: route guide, distance and fares` },
                ...(otherPage
                  ? [{ label: otherPage.h1, href: `/routes/${otherPage.slug}`, title: `${otherPage.h1}: fares and cost examples` }]
                  : []),
              ],
            },
            {
              heading: `${group.label} Rental Sizes`,
              links: group.vehiclePageSlugs.map((s) => {
                const vp = vehiclePages.find((p) => p.slug === s);
                return { label: vp?.h1 ?? s, href: `/vehicles/${s}`, title: `View ${vp?.h1 ?? s} rates and photos` };
              }),
            },
            {
              heading: `${group.label} Fares to Other Destinations`,
              links: sameGroupOtherRoutes.map((p) => ({ label: p.h1, href: `/routes/${p.slug}`, title: `${p.h1}: fares and cost examples` })),
            },
            {
              heading: 'Hire By Area in Bangalore',
              links: locationPages.map((p) => ({ label: p.h1, href: `/locations/${p.slug}`, title: `${p.h1} — pickup, drop and outstation` })),
            },
            {
              heading: 'Plan Your Trip',
              links: [
                { label: 'Book online', href: '/booking', title: 'Book a Chauffeur-Driven Vehicle Online' },
                { label: 'Customer reviews', href: '/reviews', title: 'Read Real Customer Reviews' },
                { label: 'Contact Sushi Travels', href: '/contact', title: 'Contact Sushi Travels' },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}
