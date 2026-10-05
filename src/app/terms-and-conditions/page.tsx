import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale, CheckCircle2, AlertCircle, Clock, ShieldAlert, Phone, Mail, MapPin } from 'lucide-react';
import { getBreadcrumbListSchema } from '@/lib/schema';
import { PHONE_NUMBER } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Sushi Travels Bangalore',
  description: 'Read the booking terms, kilometer billing guidelines, cancellation policies, and rental conditions for Sushi Tours & Travels Bangalore.',
  alternates: {
    canonical: '/terms-and-conditions',
  },
  openGraph: {
    title: 'Terms and Conditions | Sushi Travels Bangalore',
    description: 'Transparent booking terms, driver allowance rules, toll policies, and cancellation guarantees.',
    url: '/terms-and-conditions',
    type: 'website',
  },
};

export default function TermsAndConditionsPage() {
  const publishDate = '2024-01-15T08:00:00+05:30';
  const modifiedDate = '2026-10-05T08:00:00+05:30';

  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Terms and Conditions', item: '/terms-and-conditions' },
  ];

  const termsSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms and Conditions - Sushi Travels',
    url: 'https://www.sushitravels.com/terms-and-conditions',
    description: 'Commercial booking terms and conditions for chauffeur-driven vehicle rentals with Sushi Tours and Travels.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }}
      />

      {/* Header Banner */}
      <div className="bg-navy-dark text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-navy-light/10">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-light px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Fair &amp; Transparent Rental Agreements</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white">
            Terms &amp; Conditions
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
            Welcome to <strong>Sushi Tours &amp; Travels</strong> (&ldquo;Sushi Travels&rdquo;). By confirming a vehicle reservation, paying an advance deposit, or boarding any vehicle operated by Sushi Travels, you agree to comply with and be bound by the following Terms and Conditions. Please review them carefully prior to confirming your itinerary.
          </p>
          <p className="text-sm text-navy-light leading-relaxed">
            These terms are formulated in alignment with the Indian Motor Vehicles Act, 1988, Central Motor Vehicles Rules, and Karnataka Commercial Tourist Vehicle operating guidelines.
          </p>
        </section>

        {/* 1. Booking Confirmation & Payment Terms */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-3 text-primary-dark">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-serif font-bold text-navy">1. Booking Confirmation &amp; Advances</h2>
          </div>
          <ul className="list-disc list-inside space-y-2 text-sm text-navy/90 pl-2">
            <li>A booking is considered confirmed only upon receipt of the agreed initial booking deposit or formal corporate purchase order.</li>
            <li>Vehicle allocation details, including driver name, contact phone number, and vehicle registration number, will be sent via SMS/WhatsApp at least 2 to 3 hours prior to the scheduled pickup time.</li>
            <li>The remaining balance is payable directly to the chauffeur or via digital bank transfer during the journey or prior to trip completion.</li>
          </ul>
        </section>

        {/* 2. Billing & Kilometer Calculation Policy */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-3 text-primary-dark">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-serif font-bold text-navy">2. Kilometer &amp; Hours Billing Policy</h2>
          </div>
          <ul className="list-disc list-inside space-y-2 text-sm text-navy/90 pl-2">
            <li><strong>Outstation Journeys:</strong> Outstation trips are calculated on a minimum billing threshold of 250 km or 300 km per calendar day (midnight to midnight basis), depending on the vehicle category selected. Excess kilometers driven beyond the cumulative daily limit are billed at the agreed per-kilometer rate.</li>
            <li><strong>Local Bangalore Rentals:</strong> City packages are calculated on 4 Hours / 40 km, 8 Hours / 80 km, or 12 Hours / 120 km slabs. Kilometers or hours exceeding the slab are charged as per the standard extra-km and extra-hour tariff.</li>
            <li><strong>Odometer Reference:</strong> Starting and ending odometer readings are noted by the chauffeur and verified with the passenger at pickup and drop points.</li>
          </ul>
        </section>

        {/* 3. Driver Allowances, Tolls & State Taxes */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-3 text-primary-dark">
            <Scale className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-serif font-bold text-navy">3. Tolls, Parking &amp; Driver Allowances</h2>
          </div>
          <ul className="list-disc list-inside space-y-2 text-sm text-navy/90 pl-2">
            <li><strong>Driver Daily Bata:</strong> A standard driver daily allowance (₹400 to ₹600 depending on vehicle size) covers food and incidental expenses for the chauffeur.</li>
            <li><strong>Night Driving Charges:</strong> Trips involving driving between 10:00 PM and 6:00 AM incur an additional night allowance to ensure driver rest and road safety vigilance.</li>
            <li><strong>Tolls &amp; Parking Fees:</strong> Toll gate charges (FASTag) and parking tickets at tourist monuments, airports, or hotels are to be paid on actuals by the guest.</li>
            <li><strong>Interstate Permits:</strong> When crossing state borders (e.g. Karnataka into Tamil Nadu, Kerala, Andhra Pradesh, or Goa), state passenger entry taxes and RTO permit fees are charged on actuals as levied by the respective transport departments.</li>
            <li><strong>Goods and Services Tax (GST):</strong> 5% GST is applicable on all commercial passenger transport invoices in accordance with Government of India regulations.</li>
          </ul>
        </section>

        {/* 4. Cancellation & Refund Policy */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-3 text-primary-dark">
            <AlertCircle className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-serif font-bold text-navy">4. Cancellation &amp; Refund Guarantee</h2>
          </div>
          <div className="space-y-3 text-sm text-navy/90">
            <p>We believe in straightforward, stress-free cancellation terms:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Cancellation &gt; 24 hours prior:</strong> 100% refund of the advance booking deposit.</li>
              <li><strong>Cancellation between 12 and 24 hours prior:</strong> 50% refund of the advance deposit.</li>
              <li><strong>Cancellation &lt; 12 hours prior or No-Show:</strong> Advance deposit is retained to compensate driver mobilization and reserved fleet staging.</li>
              <li><strong>Force Majeure:</strong> In the event of government road closures, natural disasters, or severe landslides in mountain ghats (e.g., Nilgiris or Western Ghats), deposits can be transferred to any future date without penalty.</li>
            </ul>
          </div>
        </section>

        {/* 5. Mechanical Breakdown Guarantee */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-navy">5. Breakdown &amp; Replacement Assurance</h2>
          <p className="text-sm leading-relaxed text-navy">
            All vehicles in the Sushi Travels fleet undergo multi-point safety inspections prior to departure. In the rare event of an unexpected mechanical breakdown during transit, Sushi Travels will arrange an equivalent replacement vehicle or coordinate prompt authorized roadside assistance at no extra rental charge to the customer.
          </p>
        </section>

        {/* 6. Passenger Safety & Prohibited Conduct */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-3 text-amber-600">
            <ShieldAlert className="w-5 h-5" />
            <h2 className="text-xl font-serif font-bold text-navy">6. Safety Rules &amp; Prohibited Conduct</h2>
          </div>
          <ul className="list-disc list-inside space-y-2 text-sm text-navy/90 pl-2">
            <li><strong>Zero Alcohol &amp; Smoking Policy:</strong> Consumption of alcohol, narcotics, smoking, or tobacco inside commercial tourist vehicles is strictly prohibited under Indian law.</li>
            <li><strong>Speed Limitations:</strong> Chauffeurs are instructed to observe commercial speed limiters (80 km/h) mandated by the Ministry of Road Transport and Highways (MoRTH) and will not breach speed limits under customer request.</li>
            <li><strong>Luggage Safety:</strong> While drivers assist with luggage loading and securing, guests are responsible for personal valuables, electronics, and jewelry.</li>
          </ul>
        </section>

        {/* Contact Info */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-navy">7. Questions &amp; Dispute Resolution</h2>
          <p className="text-sm leading-relaxed text-navy">
            Any questions regarding these terms or travel agreements should be directed to our Bangalore office:
          </p>
          <div className="pt-2 space-y-2 text-sm text-navy/90">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span><strong>Sushi Tours &amp; Travels</strong>: No 272, Corner Shop, G/F, 8th Cross, Opposite BBMP Office, Bhuvaneshwari Nagara, Dodda Basti Main Road, Nagadevana Halli, Bengaluru 560056</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>Phone: <a href={`tel:${PHONE_NUMBER}`} title="Call Sushi Travels Helpline" className="text-primary hover:underline font-semibold">+91 90716 60099</a></span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span>Email: <a href="mailto:sushitravels11@gmail.com" title="Email Sushi Travels Operations" className="text-primary hover:underline font-semibold">sushitravels11@gmail.com</a></span>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            title="Return to Sushi Travels Home Page"
            className="text-sm font-bold text-primary hover:text-primary-dark transition-colors duration-150"
          >
            ← Return to Home Page
          </Link>
          <Link
            href="/privacy-policy"
            title="Read Sushi Travels Privacy Policy"
            className="text-sm font-medium text-navy-light hover:text-primary transition-colors duration-150"
          >
            View Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
