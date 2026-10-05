import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, Clock, CheckCircle2, ExternalLink, ShieldCheck, Quote } from 'lucide-react';
import { blogPosts, getBlogPost } from '@/lib/blog';
import { getBreadcrumbListSchema, getFAQSchema, getBlogPostingSchema } from '@/lib/schema';
import FaqAccordion from '@/components/FaqAccordion';
import CTABand from '@/components/CTABand';
import RelatedLinks from '@/components/RelatedLinks';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  const brandedTitle = `${post.title} | Sushi Travels`;
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: brandedTitle,
      description: post.metaDescription,
      url,
      type: 'article',
      publishedTime: post.publishDate,
      modifiedTime: post.dateModified,
      authors: [post.author],
      images: [{ url: post.coverImage, width: 800, height: 600, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: brandedTitle,
      description: post.metaDescription,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = `/blog/${post.slug}`;
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Blog', item: '/blog' },
    { name: post.title, item: url },
  ];

  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedModifiedDate = new Date(post.dateModified).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-cream min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbListSchema(breadcrumbItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBlogPostingSchema({
              headline: post.title,
              description: post.metaDescription,
              url,
              image: post.coverImage,
              datePublished: post.publishDate,
              dateModified: post.dateModified,
              authorName: post.author,
              authorRole: post.authorRole,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(post.faqs)) }}
      />

      {/* Hero — cover photo with title, same flat-wash pattern as the rest of the site's heroes */}
      <div
        className="relative -mt-[72px] md:-mt-[80px] min-h-[70vh] flex items-end bg-cover bg-center px-4 text-white overflow-hidden"
        style={{ backgroundImage: `url('${post.coverImage}')` }}
      >
        <div className="absolute inset-0 bg-navy-dark/60 z-0" />
        <div className="relative z-10 max-w-4xl mx-auto pb-12 space-y-4 text-center">
          <span className="inline-block bg-primary text-white font-sans text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">
            Travel Diary &amp; Field Guide
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight">{post.title}</h1>
          
          {/* Metadata Byline in Hero */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-cream-warm">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary-light" />
              <span>Published: <time dateTime={post.publishDate}>{formattedDate}</time></span>
            </span>
            <span className="hidden sm:inline text-cream-warm/40" aria-hidden="true">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>Updated: <time dateTime={post.dateModified}>{formattedModifiedDate}</time></span>
            </span>
            <span className="hidden sm:inline text-cream-warm/40" aria-hidden="true">•</span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-primary-light" />
              <span>By {post.author}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        {/* Author Provenance & Freshness Card (E-E-A-T) */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-light/10 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-navy text-primary flex items-center justify-center font-serif font-bold text-lg border border-primary/20 shrink-0">
                SG
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-navy text-base">{post.author}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Specialist
                  </span>
                </div>
                <p className="text-xs text-navy-light">{post.authorRole}</p>
              </div>
            </div>
            <div className="text-xs text-navy-light space-y-1 text-left sm:text-right">
              <div>Fact-Checked &amp; Reviewed By: <strong className="text-navy">{post.reviewer}</strong></div>
              <div>Latest Verification: <time dateTime={post.dateModified} className="text-primary font-semibold">{formattedModifiedDate}</time></div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-navy/80 leading-relaxed">
            {post.authorBio}{' '}
            <Link href="/about" title="Read about Sushi Travels company standards and verified chauffeur roster" className="text-primary font-semibold hover:underline">
              Learn more about our safety standards →
            </Link>
          </p>
        </section>

        {/* GEO-style factual summary */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Key Travel Facts &amp; Geography</span>
          </div>
          <p className="text-sm sm:text-base text-navy leading-relaxed">{post.geoSummary}</p>
        </section>

        {/* Story content */}
        <section className="space-y-5 text-sm sm:text-base text-navy leading-relaxed">
          {post.bodyParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </section>

        {/* Official Citations & Authority Guidance (Content & Citability) */}
        {post.citations && post.citations.length > 0 && (
          <section className="bg-gradient-to-br from-cream to-white rounded-2xl border-2 border-primary/20 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Quote className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-navy">
                  Official Citations &amp; Authority Guidance
                </h2>
                <p className="text-xs text-navy-light">
                  Direct quotations and regulatory references from statutory tourism and infrastructure authorities.
                </p>
              </div>
            </div>

            <div className="space-y-5 divide-y divide-navy-light/10">
              {post.citations.map((cite, idx) => (
                <div key={idx} className={idx > 0 ? 'pt-5 space-y-2' : 'space-y-2'}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-sm text-navy">{cite.authority}</span>
                    <span className="text-[11px] font-medium text-primary uppercase tracking-wide bg-primary/5 px-2.5 py-0.5 rounded-full border border-primary/15">
                      {cite.role}
                    </span>
                  </div>
                  {cite.quote && (
                    <blockquote className="border-l-3 border-primary pl-4 text-xs sm:text-sm text-navy/90 italic leading-relaxed bg-white/60 py-2 rounded-r-lg">
                      &ldquo;{cite.quote}&rdquo;
                    </blockquote>
                  )}
                  <div className="pt-1">
                    <a
                      href={cite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={cite.title}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-dark hover:underline transition-colors"
                    >
                      <span>{cite.linkText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Video */}
        {post.video && (
          <section className="space-y-4">
            <h2 className="font-serif font-bold text-xl text-navy">A Look Around Kevadia</h2>
            <div className="relative rounded-2xl overflow-hidden border border-navy-light/10 shadow-sm bg-navy-dark">
              <video
                controls
                preload="metadata"
                poster={post.coverImage}
                className="w-full h-auto max-h-[560px] mx-auto"
                title="A Look Around Kevadia, Gujarat - Video Tour"
              >
                <source src={post.video} type="video/mp4" />
              </video>
            </div>
          </section>
        )}

        {/* Full photo gallery */}
        <section className="space-y-4">
          <h2 className="font-serif font-bold text-xl text-navy">Photo Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {post.images.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-2xl overflow-hidden border border-navy-light/10 shadow-sm bg-cream-warm/30"
              >
                <Image
                  src={img}
                  alt={`Statue of Unity, Kevadia, Gujarat — photo ${idx + 1} of ${post.images.length}`}
                  title={`Statue of Unity, Kevadia photo ${idx + 1} — Sushi Travels Field Diary`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                  loading={idx < 6 ? undefined : 'lazy'}
                />
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <FaqAccordion faqs={post.faqs} />

        {/* CTA back to the business */}
        <CTABand
          heading="Planning Your Own Outstation Trip?"
          subheading="Sushi Travels offers chauffeur-driven outstation and round-trip car rental for the destinations within driving range of Bangalore."
          whatsappMessage="Hello Sushi Tours & Travels, I read your Statue of Unity blog post and would like to enquire about an outstation trip."
        />

        {/* Internal links */}
        <RelatedLinks
          groups={[
            {
              heading: 'Plan Your Trip',
              links: [
                { label: 'Outstation cab service in Bangalore', href: '/services/outstation-cab-bangalore', title: 'Explore Outstation Cab Service in Bangalore' },
                { label: 'Browse popular outstation route guides', href: '/routes', title: 'Browse Outstation Road Route Guides from Bangalore' },
                { label: 'View the full rental fleet', href: '/vehicles', title: 'Explore Full Rental Vehicle Fleet and Capacity Options' },
              ],
            },
          ]}
        />

        {/* Back to blog index */}
        <div className="text-center">
          <Link
            href="/blog"
            title="Return to Sushi Travels Blog Index"
            className="text-sm font-bold text-primary hover:text-primary-dark transition-colors duration-150"
          >
            ← Back to all travel stories
          </Link>
        </div>
      </div>
    </div>
  );
}
