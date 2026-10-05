import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CheckCircle2, ShieldCheck, Calendar, Video } from 'lucide-react';
import { vehiclePages, getVehiclePage, getVehiclesForPage, getPagePrimaryImage } from '@/lib/vehiclePages';
import { servicePages } from '@/lib/services';
import { routePages } from '@/lib/routes';
import { getBreadcrumbListSchema, getFAQSchema, getVehicleProductSchema, getWebPageSchema, getVideoObjectSchema } from '@/lib/schema';
import LandingHero from '@/components/LandingHero';
import FaqAccordion from '@/components/FaqAccordion';
import CTABand from '@/components/CTABand';
import RelatedLinks from '@/components/RelatedLinks';
import VehiclePricingTable from '@/components/VehiclePricingTable';
import GroupSizeComparisonTable from '@/components/GroupSizeComparisonTable';
import { vehicles as allVehicles } from '@/lib/vehicles';

export function generateStaticParams() {
  return vehiclePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getVehiclePage(slug);
  if (!page) return {};
  const url = `/vehicles/${page.slug}`;
  const image = getPagePrimaryImage(page);
  const brandedTitle = `${page.title} | Sushi Travels`;
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: brandedTitle,
      description: page.metaDescription,
      url,
      images: [{ url: image, width: 800, height: 600, alt: page.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: brandedTitle,
      description: page.metaDescription,
      images: [image],
    },
  };
}

export default async function VehiclePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getVehiclePage(slug);
  if (!page) notFound();

  const pageVehicles = getVehiclesForPage(page);
  const url = `/vehicles/${page.slug}`;

  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Vehicles', item: '/vehicles' },
    { name: page.h1, item: url },
  ];

  const relatedVehicles = page.relatedVehicleSlugs
    .map((s) => vehiclePages.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => !!p);
  const relatedServices = page.relatedServiceSlugs
    .map((s) => servicePages.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => !!p);
  const relatedRoutes = page.relatedRouteSlugs
    .map((s) => routePages.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const whatsappMessage = `Hello Sushi Tours & Travels, I would like to enquire about the ${page.h1}. Please share availability and a quotation.`;

  return (
    <div className="bg-cream min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbListSchema(breadcrumbItems)) }}
      />
      {pageVehicles.map((vehicle) => (
        <script
          key={vehicle.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getVehicleProductSchema(vehicle, url)) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageSchema({
              name: `${page.h1} — Sushi Travels Bangalore`,
              description: page.metaDescription,
              url,
              datePublished: '2024-01-15T08:00:00+05:30',
              dateModified: '2026-10-05T08:00:00+05:30',
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(page.faqs)) }}
      />
      {page.video && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              getVideoObjectSchema({
                name: page.video.title,
                description: page.video.description,
                thumbnailUrl: page.video.poster,
                uploadDate: '2026-10-05T08:00:00+05:30',
                duration: page.video.duration || 'PT37S',
                contentUrl: page.video.src,
              })
            ),
          }}
        />
      )}

      <LandingHero
        h1={page.h1}
        subtitle={page.heroSubtitle}
        crumbs={[
          { name: 'Vehicles', href: '/vehicles' },
          { name: page.h1, href: url },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        {/* Verification and freshness badge */}
        <div className="flex items-center justify-between text-xs text-navy-light border-b border-navy-light/10 pb-3">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Commercial Tourist Permit Fleet — Inspected &amp; GPS Monitored</span>
          </div>
          <div className="flex items-center gap-1.5 text-navy-light">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>Pricing Verified: <time dateTime="2026-10-05">October 5, 2026</time></span>
          </div>
        </div>

        {/* GEO-style factual summary */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8">
          <p className="text-sm sm:text-base text-navy leading-relaxed">{page.geoSummary}</p>
        </section>

        {/* Full photo gallery — every image for each vehicle on this page */}
        {pageVehicles.map((vehicle) => {
          const galleryImages = vehicle.images && vehicle.images.length > 0 ? vehicle.images : [vehicle.image];
          const isFourImages = galleryImages.length >= 4;
          return (
            <section key={vehicle.id} className="space-y-4">
              {pageVehicles.length > 1 && (
                <h2 className="font-serif font-bold text-xl text-navy">{vehicle.name} — Photos</h2>
              )}
              <div className={`grid grid-cols-2 ${isFourImages ? 'sm:grid-cols-2 md:grid-cols-4' : 'sm:grid-cols-3'} gap-4`}>
                {galleryImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-navy-light/10 shadow-sm bg-cream-warm/30">
                    <Image
                      src={img}
                      alt={`Sushi Travels ${vehicle.name} — photo ${idx + 1} of ${galleryImages.length}`}
                      title={`Sushi Travels ${vehicle.name} — photo ${idx + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                      loading={idx < 3 ? undefined : 'lazy'}
                    />
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Real Cabin Video Walkthrough (when configured for this vehicle) */}
        {page.video && (
          <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-primary">
                  <Video className="w-4 h-4 text-primary" />
                  Real Fleet Video Walkthrough
                </span>
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-navy mt-1">
                  {page.video.title}
                </h2>
              </div>
              <span className="self-start sm:self-auto text-xs text-navy-light bg-cream px-3 py-1.5 rounded-full border border-navy-light/10 font-medium">
                Verified Cabin Tour
              </span>
            </div>
            <p className="text-sm text-navy-light leading-relaxed">{page.video.description}</p>
            <div className="relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden bg-navy-dark border border-navy-light/10 shadow-md">
              <video
                className="w-full h-full object-cover"
                src={page.video.src}
                poster={page.video.poster}
                controls
                playsInline
                preload="metadata"
                title={page.video.title}
              />
            </div>
          </section>
        )}

        {/* Body copy */}
        <section className="space-y-4 text-sm sm:text-base text-navy-light leading-relaxed">
          {page.bodyParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </section>

        {/* Compare every seat size in this category, when configured */}
        {page.compareVehicleType && (
          <GroupSizeComparisonTable
            heading={`Compare ${page.compareVehicleType} Sizes`}
            vehicles={allVehicles
              .filter((v) => v.type === page.compareVehicleType)
              .sort((a, b) => a.seats - b.seats)}
          />
        )}

        {/* Pricing */}
        <VehiclePricingTable vehicles={pageVehicles} />

        {/* Feature highlights */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="font-serif font-bold text-xl text-navy">What&apos;s Included</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from(new Set(pageVehicles.flatMap((v) => v.features))).slice(0, 8).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-navy">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <FaqAccordion faqs={page.faqs} />

        {/* CTA */}
        <CTABand
          heading={`Book the ${page.h1.replace(' in Bangalore', '')}`}
          subheading="Call, WhatsApp, or submit a quick enquiry — our dispatch team will confirm availability and pricing."
          whatsappMessage={whatsappMessage}
        />

        {/* Internal links */}
        <RelatedLinks
          groups={[
            {
              heading: 'Related Vehicles',
              links: relatedVehicles.map((p) => ({
                label: p.h1,
                href: `/vehicles/${p.slug}`,
                title: `View ${p.h1} pricing and details`,
              })),
            },
            {
              heading: 'Related Services',
              links: relatedServices.map((p) => ({
                label: p.h1,
                href: `/services/${p.slug}`,
                title: `View ${p.h1} service options`,
              })),
            },
            {
              heading: 'Popular Routes',
              links: relatedRoutes.map((p) => ({
                label: p.h1,
                href: `/routes/${p.slug}`,
                title: `View ${p.h1} route travel guide`,
              })),
            },
            {
              heading: 'Plan Your Trip',
              links: [
                { label: 'Book this vehicle online', href: '/booking', title: 'Book This Vehicle Online' },
                { label: 'Contact Sushi Travels', href: '/contact', title: 'Contact Sushi Travels Support' },
                { label: 'View the full rental fleet', href: '/fleet', title: 'View All Fleet Vehicles' },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}
