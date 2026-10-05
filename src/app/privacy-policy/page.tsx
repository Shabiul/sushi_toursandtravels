import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, Phone, Mail, MapPin } from 'lucide-react';
import { getBreadcrumbListSchema } from '@/lib/schema';
import { PHONE_NUMBER } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sushi Travels Bangalore',
  description: 'Learn how Sushi Tours & Travels protects your privacy, handles booking details, and safeguards personal travel data in compliance with Indian privacy laws.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Sushi Travels Bangalore',
    description: 'Our commitment to data privacy, secure booking inquiries, and customer data safety.',
    url: '/privacy-policy',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  const publishDate = '2024-01-15T08:00:00+05:30';
  const modifiedDate = '2026-10-05T08:00:00+05:30';

  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Privacy Policy', item: '/privacy-policy' },
  ];

  const privacySchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy - Sushi Travels',
    url: 'https://www.sushitravels.com/privacy-policy',
    description: 'Privacy Policy and personal data protection principles for Sushi Tours and Travels.',
    datePublished: publishDate,
    dateModified: modifiedDate,
    author: {
      '@type': 'Organization',
      name: 'Sushi Travels',
      url: 'https://www.sushitravels.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sushi Travels',
      url: 'https://www.sushitravels.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.sushitravels.com/logo-light-v3.png',
      },
    },
  };

  return (
    <div className="bg-cream min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbListSchema(breadcrumbItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />

      {/* Header Banner */}
      <div className="bg-navy-dark text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-navy-light/10">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-light px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Transparency &amp; Trust</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-cream-warm leading-relaxed">
            Effective Date: <time dateTime={publishDate}>January 15, 2024</time> • Last Verified &amp; Updated: <time dateTime={modifiedDate}>October 5, 2026</time>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-navy">
        {/* Intro */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4 shadow-sm">
          <p className="text-sm sm:text-base leading-relaxed">
            At <strong>Sushi Tours &amp; Travels</strong> (&ldquo;Sushi Travels&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), we recognize that your privacy and personal data confidentiality are paramount. This Privacy Policy outlines the types of information we collect when you visit our website (<Link href="/" title="Sushi Travels Home Page" className="text-primary hover:underline font-medium">www.sushitravels.com</Link>), submit booking inquiries, speak with our travel desk, or utilize our chauffeur-driven rental services, and describes how that data is used, protected, and stored.
          </p>
          <p className="text-sm text-navy-light leading-relaxed">
            We adhere strictly to applicable Indian data protection frameworks, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act (DPDPA), 2023.
          </p>
        </section>

        {/* 1. Information We Collect */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-3 text-primary-dark">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-serif font-bold text-navy">1. Information We Collect</h2>
          </div>
          <p className="text-sm leading-relaxed text-navy">
            We only collect information directly necessary to process your travel itinerary, dispatch appropriate vehicles, and maintain safety standards:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-navy/90 pl-2">
            <li><strong>Personal Contact Details:</strong> Full name, mobile phone number, WhatsApp contact, and email address.</li>
            <li><strong>Travel Itinerary Specifics:</strong> Pickup location/address, destination, travel dates, requested pickup time, estimated passenger count, and preferred vehicle class (e.g. Tempo Traveller, Innova Crysta, or Urbania).</li>
            <li><strong>Billing &amp; Tax Information:</strong> GST identification number (if requesting corporate invoice), company legal entity name, and billing address.</li>
            <li><strong>Operational GPS Telematics:</strong> Real-time vehicle location telemetry transmitted by onboard GPS hardware to guarantee passenger safety and track trip completion.</li>
            <li><strong>Automated Website Data:</strong> Technical logs, IP addresses, browser types, and anonymous analytics via Google Analytics to diagnose server performance.</li>
          </ul>
        </section>

        {/* 2. How We Use Your Information */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-3 text-primary-dark">
            <Eye className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-serif font-bold text-navy">2. How We Use Your Information</h2>
          </div>
          <p className="text-sm leading-relaxed text-navy">
            Sushi Travels processes your data solely for lawful, service-oriented purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-navy/90 pl-2">
            <li>Confirming vehicle availability and issuing transparent fare estimates.</li>
            <li>Assigning and dispatching vetted chauffeurs and sharing vehicle registration numbers with the guest before pickup.</li>
            <li>Providing 24/7 customer assistance during long-distance outstation journeys.</li>
            <li>Processing digital invoices, tax receipts, and payment reconciliations.</li>
            <li>Ensuring vehicle safety, breakdown support, and compliance with statutory transport directives.</li>
          </ul>
        </section>

        {/* 3. Strict Non-Disclosure & Data Selling Prohibition */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-3 text-primary-dark">
            <Lock className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-serif font-bold text-navy">3. No Selling of Customer Data</h2>
          </div>
          <p className="text-sm leading-relaxed text-navy">
            <strong>We do not sell, rent, lease, or trade your personal data</strong> to third-party telemarketers, data brokers, or advertising networks under any circumstances. Information is shared only with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-navy/90 pl-2">
            <li><strong>Assigned Chauffeurs:</strong> Provided solely with passenger name, pickup address, and contact number for trip execution.</li>
            <li><strong>Statutory Authorities:</strong> Disclosed only if explicitly demanded under subpoena, court order, or official investigation by law enforcement agencies under the Indian Motor Vehicles Act.</li>
          </ul>
        </section>

        {/* 4. Data Security & Storage */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-navy">4. Security &amp; Storage Protocols</h2>
          <p className="text-sm leading-relaxed text-navy">
            All booking inquiries and communications transmitted through our digital platforms utilize Transport Layer Security (TLS 1.3) encryption. Booking databases are hosted behind access-restricted cloud firewalls with multi-factor authentication, accessible only to authorized fleet dispatch officers.
          </p>
        </section>

        {/* 5. Your Rights */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-navy">5. Your Privacy Rights</h2>
          <p className="text-sm leading-relaxed text-navy">
            You have the right to request access to the personal data we hold about you, request rectification of inaccurate records, or request complete deletion of your booking history from our active dispatch systems after completion of statutory tax accounting retention periods.
          </p>
        </section>

        {/* 6. Grievance Officer & Contact */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-navy">6. Grievance Redressal &amp; Privacy Desk</h2>
          <p className="text-sm leading-relaxed text-navy">
            For privacy inquiries, data deletion requests, or grievances regarding personal data handling, please contact our dedicated Data Privacy Desk:
          </p>
          <div className="pt-2 space-y-2 text-sm text-navy/90">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span><strong>Sushi Tours &amp; Travels</strong>: No 272, Corner Shop, G/F, 8th Cross, Opposite BBMP Office, Bhuvaneshwari Nagara, Dodda Basti Main Road, Nagadevana Halli, Bengaluru 560056</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>Phone: <a href={`tel:${PHONE_NUMBER}`} title="Call Sushi Travels Privacy Desk" className="text-primary hover:underline font-semibold">+91 90716 60099</a></span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span>Email: <a href="mailto:sushitravels11@gmail.com" title="Email Sushi Travels Data Privacy Officer" className="text-primary hover:underline font-semibold">sushitravels11@gmail.com</a></span>
            </div>
          </div>
        </section>

        {/* Back Link */}
        <div className="pt-4 text-center">
          <Link
            href="/"
            title="Return to Sushi Travels Home Page"
            className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-dark transition-colors duration-150"
          >
            ← Return to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
