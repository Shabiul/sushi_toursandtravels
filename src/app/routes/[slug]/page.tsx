import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Route as RouteIcon, Clock, ArrowUpRight, ShieldCheck, ExternalLink, Calendar } from 'lucide-react';
import { routePages, getRoutePage } from '@/lib/routes';
import { vehiclePages } from '@/lib/vehiclePages';
import { packages } from '@/lib/packages';
import { getBreadcrumbListSchema, getFAQSchema, getRouteTouristTripSchema, getWebPageSchema } from '@/lib/schema';
import LandingHero from '@/components/LandingHero';
import FaqAccordion from '@/components/FaqAccordion';
import CTABand from '@/components/CTABand';
import RelatedLinks from '@/components/RelatedLinks';

export function generateStaticParams() {
  return routePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getRoutePage(slug);
  if (!page) return {};
  const url = `/routes/${page.slug}`;
  const brandedTitle = `${page.title} | Sushi Travels`;
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: brandedTitle,
      description: page.metaDescription,
      url,
      type: 'website',
      images: [{ url: page.heroImage, width: 800, height: 600, alt: page.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: brandedTitle,
      description: page.metaDescription,
      images: [page.heroImage],
    },
  };
}

export default async function RouteLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getRoutePage(slug);
  if (!page) notFound();

  const url = `/routes/${page.slug}`;
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Routes', item: '/routes' },
    { name: page.h1, item: url },
  ];

  const relatedVehicles = page.relatedVehicleSlugs
    .map((s) => vehiclePages.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => !!p);
  const matchingPackage = page.packageSlug ? packages.find((p) => p.slug === page.packageSlug) : undefined;

  const whatsappMessage = `Hello Sushi Tours & Travels, I would like a fare quote for a Bangalore to ${page.destination} cab. Please share vehicle options and pricing.`;

  return (
    <div className="bg-cream min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbListSchema(breadcrumbItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(page.faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getRouteTouristTripSchema({
              name: page.h1,
              description: page.metaDescription,
              url,
              origin: 'Bengaluru (Bangalore)',
              destination: page.destination,
              distance: page.distance,
              duration: page.duration,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageSchema({
              name: `${page.h1} — Sushi Travels Route Guide`,
              description: page.metaDescription,
              url,
              datePublished: '2024-01-15T08:00:00+05:30',
              dateModified: '2026-10-05T08:00:00+05:30',
            })
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
        {/* Verification and freshness badge */}
        <div className="flex items-center justify-between text-xs text-navy-light border-b border-navy-light/10 pb-3">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Route Guide by Sushi Travels Operations Desk</span>
          </div>
          <div className="flex items-center gap-1.5 text-navy-light">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>Updated: <time dateTime="2026-10-05">October 5, 2026</time></span>
          </div>
        </div>

        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8">
          <p className="text-sm sm:text-base text-navy leading-relaxed">{page.geoSummary}</p>
        </section>

        {/* Distance / duration stat row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-navy-light/10 p-6 flex items-center gap-4 shadow-sm">
            <RouteIcon className="w-8 h-8 text-primary shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-navy-light font-bold">Total Highway Distance</div>
              <div className="text-lg font-serif font-bold text-navy">{page.distance}</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-navy-light/10 p-6 flex items-center gap-4 shadow-sm">
            <Clock className="w-8 h-8 text-primary shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-navy-light font-bold">Estimated Travel Time</div>
              <div className="text-lg font-serif font-bold text-navy">{page.duration}</div>
            </div>
          </div>
        </section>

        <section className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-navy-light/10 shadow-sm">
          <Image
            src={page.heroImage}
            alt={`Bangalore to ${page.destination} cab route scenic panorama`}
            title={`Bangalore to ${page.destination} scenic highway and route view`}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </section>

        <section className="space-y-4 text-sm sm:text-base text-navy-light leading-relaxed">
          {page.bodyParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </section>

        {/* Authority Advisory & Statutory Citations (Content & Citability) */}
        <section className="bg-cream/60 rounded-2xl border border-navy-light/15 p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Highway Authority Advisory &amp; Safe Transit Norms</span>
          </div>
          <p className="text-xs sm:text-sm text-navy leading-relaxed">
            In accordance with advisory standards issued by the{' '}
            <a
              href="https://nhai.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              title="National Highways Authority of India (NHAI) Official Portal"
              className="font-bold text-primary hover:underline inline-flex items-center gap-0.5"
            >
              National Highways Authority of India (NHAI)
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>{' '}
            and state forest transit regulations, commercial vehicles on this route operate with compulsory electronic FASTag lane clearance and mandatory 80 km/h speed limiters. For routes through wildlife corridors (such as Bandipur on the Nilgiri corridor), night traffic restrictions apply between 9:00 PM and 6:00 AM as enforced by the{' '}
            <a
              href="https://aranya.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              title="Karnataka Forest Department Official Portal"
              className="font-bold text-primary hover:underline inline-flex items-center gap-0.5"
            >
              Karnataka Forest Department
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>.
          </p>
        </section>

        {/* Vehicle suggestion + pricing enquiry note */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="font-serif font-bold text-xl text-navy">Vehicle &amp; Fare Guidance</h2>
          <p className="text-sm text-navy-light leading-relaxed">
            <strong className="text-navy">Suggested vehicle:</strong> {page.vehicleSuggestion}
          </p>
          <p className="text-sm text-navy-light leading-relaxed">
            Exact route fares depend on the vehicle selected, one-way vs. round-trip requirement, trip duration and
            applicable tolls/permits, so we don&apos;t publish a fixed fare for this route. Call or WhatsApp us with your
            travel dates and group size and our team will confirm an accurate quote.
          </p>
          {matchingPackage && (
            <p className="text-sm text-navy-light leading-relaxed pt-2 border-t border-navy-light/10">
              Prefer a ready-made itinerary?{' '}
              <Link
                href="/tours-and-packages"
                title={`Explore ${matchingPackage.title} package on Tours & Packages`}
                className="text-primary font-semibold hover:text-primary-dark inline-flex items-center"
              >
                See our {matchingPackage.title} package on Tours &amp; Packages
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Link>
              .
            </p>
          )}
        </section>

        <FaqAccordion faqs={page.faqs} />

        <CTABand
          heading={`Get a Bangalore to ${page.destination} Fare Quote`}
          subheading="Call, WhatsApp, or submit a quick enquiry — our dispatch team will confirm vehicle options and pricing."
          whatsappMessage={whatsappMessage}
        />

        <RelatedLinks
          groups={[
            {
              heading: 'Recommended Vehicles',
              links: relatedVehicles.map((p) => ({
                label: p.h1,
                href: `/vehicles/${p.slug}`,
                title: `View ${p.h1} pricing and specifications`,
              })),
            },
            {
              heading: 'Related Services',
              links: [
                {
                  label: 'Outstation Cab Service from Bangalore',
                  href: '/services/outstation-cab-bangalore',
                  title: 'Book Outstation Cab Service from Bangalore',
                },
                {
                  label: 'Bangalore Sightseeing Cab',
                  href: '/services/bangalore-sightseeing-cab',
                  title: 'Book Bangalore Local Sightseeing Cab',
                },
              ],
            },
            {
              heading: 'Plan Your Trip',
              links: [
                {
                  label: 'Browse Tours & Packages',
                  href: '/tours-and-packages',
                  title: 'Browse South India Tours and Holiday Packages',
                },
                {
                  label: 'Book online',
                  href: '/booking',
                  title: 'Book Chauffeur-Driven Vehicle Online',
                },
                {
                  label: 'Contact Sushi Travels',
                  href: '/contact',
                  title: 'Contact Sushi Travels Bangalore Support',
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}
