import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { blogPosts } from '@/lib/blog';
import { getBreadcrumbListSchema, getWebPageSchema } from '@/lib/schema';
import LandingHero from '@/components/LandingHero';

export const metadata: Metadata = {
  title: 'Travel Stories & Destination Guides',
  description:
    'Travel diaries, route notes, and destination guides from Sushi Travels — honest notes on places worth visiting, written for travellers planning their own trip.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Travel Stories & Destination Guides | Sushi Travels',
    description:
      'Travel diaries, route notes, and destination guides from Sushi Travels — honest notes on places worth visiting, written for travellers planning their own trip.',
    url: '/blog',
    images: [{ url: blogPosts[0]?.coverImage ?? '/logo-light-v3.png', width: 800, height: 600, alt: 'Sushi Travels blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Stories & Destination Guides | Sushi Travels',
    description:
      'Travel diaries, route notes, and destination guides from Sushi Travels — honest notes on places worth visiting, written for travellers planning their own trip.',
    images: [blogPosts[0]?.coverImage ?? '/logo-light-v3.png'],
  },
};

export default function BlogIndexPage() {
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Blog', item: '/blog' },
  ];

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
            getWebPageSchema({
              name: 'Travel Stories & Destination Guides - Sushi Travels',
              description: 'Travel diaries, route notes, and destination guides from Sushi Travels.',
              url: '/blog',
              datePublished: '2024-01-15T08:00:00+05:30',
              dateModified: '2026-10-05T08:00:00+05:30',
            })
          ),
        }}
      />

      <LandingHero
        h1="Travel Stories from Sushi Travels"
        subtitle="Honest travel diaries and destination notes — written by seasoned route specialists for people planning their own trip."
        crumbs={[{ name: 'Blog', href: '/blog' }]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {blogPosts.length === 0 ? (
          <p className="text-center text-navy-light">More stories are on the way — check back soon.</p>
        ) : (
          <div className="space-y-10">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                title={`Read ${post.title} — Sushi Travels Field Diary`}
                className="group block bg-white rounded-2xl border border-navy-light/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Cover image "holding" the story */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-cream-warm/30">
                  <Image
                    src={post.coverImage}
                    alt={`Sushi Travels blog — ${post.title}`}
                    title={`Cover photo for ${post.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover object-center"
                    priority
                  />
                  <span className="absolute top-4 left-4 bg-primary text-white font-sans text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                    Travel Diary &amp; Guide
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-navy-light mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <time dateTime={post.publishDate}>
                        {new Date(post.publishDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </time>
                    </span>
                    <span className="text-navy-light/30">•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>Updated <time dateTime={post.dateModified}>{new Date(post.dateModified).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</time></span>
                    </span>
                    <span className="text-navy-light/30">•</span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-primary" />
                      <span>By {post.author}</span>
                    </span>
                  </div>
                  <h2 className="font-serif font-bold text-2xl text-navy group-hover:text-primary transition-colors duration-200 mb-3 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-navy leading-relaxed mb-5">{post.excerpt}</p>
                  <span className="inline-flex items-center text-sm font-bold text-primary">
                    Read the full story &amp; view photo gallery
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
