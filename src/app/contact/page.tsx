'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { contactSchema, ContactData } from '@/lib/validations';
import { getBreadcrumbListSchema, getWebPageSchema, getVideoObjectSchema } from '@/lib/schema';
import { PHONE_NUMBER, getWhatsAppUrl } from '@/lib/contact';
import { trackLeadFormConversion } from '@/lib/gtag';

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmitContact = (data: ContactData) => {
    console.log('Sushi Travels Contact Inquiry:', data);
    
    // Google Ads: Event snippet for Submit lead form conversion
    trackLeadFormConversion({
      lead_step: 'contact_form_submitted',
      subject: data.subject,
    });

    // Construct WhatsApp message text
    const text = `Hello Sushi Travels, I would like to make an inquiry:\n- *Name:* ${data.name}\n- *Email:* ${data.email}\n- *Phone:* ${data.phone}\n- *Subject:* ${data.subject}\n- *Message:* ${data.message}`;
    
    // Redirect/Open WhatsApp in a new tab
    const waUrl = getWhatsAppUrl(text);
    window.open(waUrl, '_blank');
    
    reset();
  };

  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Contact Us', item: '/contact' },
  ];

  return (
    <div className="bg-cream min-h-screen pb-16">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbListSchema(breadcrumbItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageSchema({
              name: 'Contact Sushi Travels — Rental Office, Phone & WhatsApp Support',
              description: 'Contact Sushi Travels in Bangalore for Tempo Traveller, Force Urbania, and bus rentals. 24/7 phone and WhatsApp support.',
              url: 'https://www.sushitravels.com/contact',
              datePublished: '2024-01-15',
              dateModified: '2026-10-05',
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getVideoObjectSchema({
              name: 'Sushi Travels — Outstation Destinations & Coastline Route Showcase Video',
              description: 'Drone footage of scenic road trip destinations, coastal highways, and holiday locations served by Sushi Travels round-trip chauffeur service from Bangalore.',
              thumbnailUrl: '/videos/goa-beach-drone-poster.webp',
              uploadDate: '2024-01-15T08:00:00+05:30',
              duration: 'PT15S',
              contentUrl: '/videos/goa-beach-drone.mp4',
            })
          ),
        }}
      />

      {/* Contact Hero Banner — pulled up under the fixed transparent header, same pattern as the Fleet/Home/About pages */}
      <div className="relative -mt-[72px] md:-mt-[80px] min-h-screen flex items-center justify-center px-4 text-center text-white overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          src="/videos/goa-beach-drone.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/goa-beach-drone-poster.webp"
          title="Sushi Travels Outstation Destinations Showcase Video"
        />
        <div className="absolute inset-0 bg-navy-dark/75 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">
            Contact Sushi Travels
          </h1>
          <p className="text-sm md:text-base text-cream-warm/95 max-w-2xl mx-auto">
            Have questions about regional state permits, routing, or specialized rental packages? Get in touch with our desk.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Contact Cards & Info */}
          <div className="space-y-8 text-navy">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-dark">Office Details</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mt-1.5 mb-4">Get In Touch</h2>
              <p className="text-xs text-navy leading-relaxed">
                Contact our customer support desks or drop by our regional travel office located in central Bangalore.
              </p>
            </div>

            {/* Cards List */}
            <div className="space-y-4">
              
              {/* Address */}
              <a
                href="https://maps.google.com/?cid=15212322609133405823"
                target="_blank"
                rel="noopener noreferrer"
                title="View Sushi Travels Bangalore Office Location on Google Maps"
                className="bg-white rounded-2xl border border-navy-light/10 p-5 flex items-start space-x-4 shadow-sm hover:border-primary/30 hover:shadow-md transition duration-200 group cursor-pointer"
              >
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition duration-200" />
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-navy">Main Office</h3>
                  <p className="text-sm font-semibold mt-1 text-navy group-hover:text-primary transition duration-150">
                    No 272, corner shop, G/F, 8th cross,
                    <br />
                    Opposite to BBMP office Bhuvaneshwari Nagara
                    <br />
                    Dodda Basti Main Road, post, Nagadevana Halli,
                    <br />
                    Bengaluru, Karnataka - 560056
                  </p>
                </div>
              </a>

              {/* Phone / Whatsapp */}
              <div className="bg-white rounded-2xl border border-navy-light/10 p-5 flex items-start space-x-4 shadow-sm">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-navy">Call & WhatsApp</h3>
                  <p className="text-sm font-semibold mt-1">
                    <a href={`tel:${PHONE_NUMBER}`} title="Call Sushi Travels 24/7 Helpline" className="hover:text-primary transition">
                      +91 90716 60099
                    </a>
                  </p>
                  <p className="text-xs text-teal-600 font-medium mt-0.5">Helpline available 24/7</p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl border border-navy-light/10 p-5 flex items-start space-x-4 shadow-sm">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-navy">Inquiries Email</h3>
                  <p className="text-sm font-semibold mt-1">
                    <a href="mailto:sushitravels11@gmail.com" title="Send Email Inquiry to Sushi Travels" className="hover:text-primary transition">
                      sushitravels11@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white rounded-2xl border border-navy-light/10 p-5 flex items-start space-x-4 shadow-sm">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-navy">Business Hours</h3>
                  <p className="text-sm font-semibold mt-1">
                    Monday - Sunday: 24 Hours Operation
                  </p>
                  <p className="text-xs text-navy mt-0.5">Office Visits: 9:00 AM - 7:00 PM</p>
                </div>
              </div>

            </div>
          </div>

          {/* Middle Column: Validated Contact Form */}
          <div className="bg-white rounded-3xl border border-navy-light/10 p-6 sm:p-8 shadow-sm lg:col-span-2 space-y-6">
            <div className="border-b border-navy-light/10 pb-4 text-navy">
              <h2 className="font-serif font-bold text-xl sm:text-2xl">Send An Inquiry</h2>
              <p className="text-xs text-navy mt-1">Fill out the form below and our dispatcher will reply within 30 minutes.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmitContact)} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Name */}
              <div className="relative">
                <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  {...register('name')}
                  placeholder="Rahul Sharma"
                  className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-3 text-sm text-navy outline-none focus:border-primary transition"
                />
                {errors.name && (
                  <span className="text-xs text-primary-dark font-medium mt-1 block">{errors.name.message}</span>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  {...register('email')}
                  placeholder="rahul@example.com"
                  className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-3 text-sm text-navy outline-none focus:border-primary transition"
                />
                {errors.email && (
                  <span className="text-xs text-primary-dark font-medium mt-1 block">{errors.email.message}</span>
                )}
              </div>

              {/* Phone */}
              <div className="relative">
                <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">Phone Number</label>
                <input
                  id="contact-phone"
                  type="text"
                  {...register('phone')}
                  placeholder="9876543210"
                  className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-3 text-sm text-navy outline-none focus:border-primary transition"
                />
                {errors.phone && (
                  <span className="text-xs text-primary-dark font-medium mt-1 block">{errors.phone.message}</span>
                )}
              </div>

              {/* Subject */}
              <div className="relative">
                <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  {...register('subject')}
                  placeholder="e.g. Wedding Event Booking"
                  className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-3 text-sm text-navy outline-none focus:border-primary transition"
                />
                {errors.subject && (
                  <span className="text-xs text-primary-dark font-medium mt-1 block">{errors.subject.message}</span>
                )}
              </div>

              {/* Message */}
              <div className="sm:col-span-2 relative">
                <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">Message Details</label>
                <textarea
                  id="contact-message"
                  {...register('message')}
                  rows={4}
                  placeholder="Tell us about your trip plans, stops, duration..."
                  className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-3 text-sm text-navy outline-none focus:border-primary transition"
                />
                {errors.message && (
                  <span className="text-xs text-primary-dark font-medium mt-1 block">{errors.message.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-2 pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center bg-navy hover:bg-primary active:scale-[0.98] text-white font-bold rounded-full px-8 py-3 transition-all duration-200 shadow-md disabled:opacity-55 disabled:active:scale-100"
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span>Send Message</span>
                </button>
              </div>

            </form>
          </div>

        </div>

        {/* Map Embed Section */}
        <section className="mt-16 bg-white rounded-3xl border border-navy-light/10 p-6 sm:p-8 shadow-sm">
          <h2 className="font-serif font-bold text-xl text-navy mb-4">Our Location Map</h2>
          {/* Beautiful maps iframe mock with local details */}
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-cream-warm border border-navy-light/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.458059695387!2d77.4864930750759!3d12.942514787370245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3fffcac47a89%3A0xd31d06d08e0a467f!2sSushi%20Travels!5e0!3m2!1sen!2sin!4v1787215021327!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Google Maps showing Sushi Travels office at No 272, corner shop, G/F, 8th cross, Opposite to BBMP office Bhuvaneshwari Nagara Dodda Basti Main Road, post, Nagadevana Halli, Bengaluru, Karnataka 560056"
            />
            {/* Clickable Overlay */}
            <a
              href="https://maps.google.com/?cid=15212322609133405823"
              target="_blank"
              rel="noopener noreferrer"
              title="Open Sushi Travels Headquarters on Google Maps"
              className="absolute top-4 left-4 bg-navy-dark hover:bg-navy text-white p-3.5 rounded-xl border border-white/10 shadow text-xs space-y-1 transition duration-150 cursor-pointer z-10"
            >
              <div className="font-bold flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary mr-1.5 animate-pulse" />
                Sushi Travels HQ
              </div>
              <p className="text-cream-warm">No 272, G/F, 8th cross, Bhuvaneshwari Nagara, Bengaluru</p>
              <span className="text-[10px] text-primary-light block mt-1 hover:underline">Click to view on Google Maps ↗</span>
            </a>
            {/* Direct Link Overlay Button */}
            <div className="absolute bottom-4 right-4 z-10">
              <a
                href="https://maps.google.com/?cid=15212322609133405823"
                target="_blank"
                rel="noopener noreferrer"
                title="Open Route Navigation in Google Maps"
                className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full text-xs shadow-md flex items-center space-x-1.5 transition duration-150"
              >
                <span>Open in Google Maps</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <a
              href="https://share.google/St55UlsbDobuLv9jP"
              target="_blank"
              rel="noopener noreferrer"
              title="Read Sushi Travels Verified Google Business Reviews"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-dark hover:text-navy transition-colors duration-150"
            >
              <span>Read our reviews on Google</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        {/* Internal links to the new service/location page network */}
        <section className="mt-16 bg-white rounded-3xl border border-navy-light/10 p-6 sm:p-8 text-center space-y-4">
          <h2 className="font-serif font-bold text-xl text-navy">Looking for Something Specific?</h2>
          <p className="text-sm text-navy-light max-w-2xl mx-auto">
            See our{' '}
            <Link href="/services" title="Browse All Sushi Travels Chauffeur Rental Services" className="text-primary font-semibold hover:text-primary-dark">
              full list of rental services
            </Link>
            , browse{' '}
            <Link href="/vehicles" title="View Rental Fleet Pricing and Capacity" className="text-primary font-semibold hover:text-primary-dark">
              vehicle pricing by category
            </Link>
            , or check whether we serve your{' '}
            <Link href="/locations" title="Explore Sushi Travels Service Areas Across Bangalore" className="text-primary font-semibold hover:text-primary-dark">
              area of Bangalore
            </Link>
            .
          </p>
        </section>

      </div>
    </div>
  );
}
