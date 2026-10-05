import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ShieldCheck, Calendar } from 'lucide-react';
import { servicePages, getServicePage } from '@/lib/services';
import { vehiclePages } from '@/lib/vehiclePages';
import { routePages } from '@/lib/routes';
import { locationPages } from '@/lib/locations';
import { getBreadcrumbListSchema, getFAQSchema, getServiceLandingSchema, getWebPageSchema } from '@/lib/schema';
import LandingHero from '@/components/LandingHero';
import FaqAccordion from '@/components/FaqAccordion';
import CTABand from '@/components/CTABand';
import RelatedLinks from '@/components/RelatedLinks';

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  const url = `/services/${page.slug}`;
  const brandedTitle = `${page.title} | Sushi Travels`;
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: brandedTitle,
      description: page.metaDescription,
      url,
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

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const url = `/services/${page.slug}`;
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Services', item: '/services' },
    { name: page.h1, item: url },
  ];

  const relatedVehicles = page.relatedVehicleSlugs
    .map((s) => vehiclePages.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => !!p);
  const relatedServices = page.relatedServiceSlugs
    .map((s) => servicePages.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => !!p);
  const relatedRoutes = (page.relatedRouteSlugs ?? [])
    .map((s) => routePages.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => !!p);
  const relatedLocations = (page.relatedLocationSlugs ?? [])
    .map((s) => locationPages.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const whatsappMessage = `Hello Sushi Tours & Travels, I would like to enquire about your ${page.h1}. Please share availability and a quotation.`;

  return (
    <div className="bg-cream min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbListSchema(breadcrumbItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getServiceLandingSchema({ name: page.h1, description: page.metaDescription, url })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageSchema({
              name: `${page.h1} - Sushi Travels Bangalore`,
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

      <LandingHero
        h1={page.h1}
        subtitle={page.heroSubtitle}
        crumbs={[
          { name: 'Services', href: '/services' },
          { name: page.h1, href: url },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        {/* Verification and freshness bar */}
        <div className="flex items-center justify-between text-xs text-navy-light border-b border-navy-light/10 pb-3">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Commercial Passenger Chauffeur Service — Verified Operations</span>
          </div>
          <div className="flex items-center gap-1.5 text-navy-light">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>Updated: <time dateTime="2026-10-05">October 5, 2026</time></span>
          </div>
        </div>

        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8">
          <p className="text-sm sm:text-base text-navy leading-relaxed">{page.geoSummary}</p>
        </section>

        <section className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-navy-light/10 shadow-sm">
          <Image
            src={page.heroImage}
            alt={page.h1}
            title={`${page.h1} — Chauffeur Service in Bangalore`}
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

        <FaqAccordion faqs={page.faqs} />

        <CTABand
          heading={`Book ${page.h1}`}
          subheading="Call, WhatsApp, or submit a quick enquiry — our dispatch team will confirm availability and pricing."
          whatsappMessage={whatsappMessage}
        />

        <RelatedLinks
          groups={[
            {
              heading: 'Recommended Vehicles',
              links: relatedVehicles.map((p) => ({
                label: p.h1,
                href: `/vehicles/${p.slug}`,
                title: `View ${p.h1} specifications and pricing`,
              })),
            },
            {
              heading: 'Related Services',
              links: relatedServices.map((p) => ({
                label: p.h1,
                href: `/services/${p.slug}`,
                title: `View ${p.h1} service details`,
              })),
            },
            {
              heading: 'Popular Routes',
              links: relatedRoutes.map((p) => ({
                label: p.h1,
                href: `/routes/${p.slug}`,
                title: `View ${p.h1} route guide`,
              })),
            },
            {
              heading: 'Areas We Serve',
              links: relatedLocations.map((p) => ({
                label: p.h1,
                href: `/locations/${p.slug}`,
                title: `View ${p.h1} cab coverage`,
              })),
            },
            {
              heading: 'Plan Your Trip',
              links: [
                { label: 'Book online', href: '/booking', title: 'Book Chauffeur Online' },
                { label: 'Contact Sushi Travels', href: '/contact', title: 'Contact Sushi Travels Office' },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}
