'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldAlert, Award, Compass } from 'lucide-react';
import { PHONE_NUMBER } from '@/lib/contact';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-white pt-16 pb-8 border-t border-navy-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" title="Sushi Travels Home Page" className="flex flex-col group">
              <span className="flex items-baseline">
                <span className="font-serif font-bold text-2xl text-primary group-hover:text-primary-light transition-colors duration-200">
                  Sushi
                </span>
                <span className="font-sans font-semibold text-lg text-white ml-1">
                  Travels
                </span>
              </span>
              <span className="text-[10px] text-cream-warm tracking-wider font-light mt-[-2px] uppercase">
                Every Road, A New Story
              </span>
            </Link>
            <p className="text-sm text-cream-warm leading-relaxed">
              Premium chauffeur-driven car rentals in India. Experience reliable local drops, outstation packages, and airport transfers with premium hospitality.
            </p>
            {/* Trust Badges */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2 text-xs text-primary-light">
                <Award className="w-4 h-4 flex-shrink-0" />
                <span>Registered in Karnataka</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-teal-400">
                <Compass className="w-4 h-4 flex-shrink-0" />
                <span>GPS Enabled & Monitored Fleet</span>
              </div>
            </div>
            {/* Social Links */}
            <div className="flex space-x-4 pt-3">
              <a 
                href="https://www.instagram.com/sushi_travels_official?utm_source=qr&igsh=bXphYXc1d2p5cnRm" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-navy-light/35 flex items-center justify-center text-cream-warm hover:text-white hover:bg-primary transition-colors duration-200"
                aria-label="Instagram"
                title="Follow Sushi Travels on Instagram"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Sitemap & Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-cream-warm">
              <li>
                <Link href="/" title="Go to Sushi Travels Home Page" className="hover:text-primary transition-colors duration-150">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/fleet" prefetch={false} title="Explore Sushi Travels Vehicle Fleet" className="hover:text-primary transition-colors duration-150">
                  Explore Our Fleet
                </Link>
              </li>
              <li>
                <Link href="/booking" title="Book a Chauffeur Driven Vehicle in Bangalore" className="hover:text-primary transition-colors duration-150">
                  Book A Chauffeur
                </Link>
              </li>
              <li>
                <Link href="/services" title="View Chauffeur and Rental Services" className="hover:text-primary transition-colors duration-150">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/tours-and-packages" title="Explore South India Tour Packages" className="hover:text-primary transition-colors duration-150">
                  Tours & Packages
                </Link>
              </li>
              <li>
                <Link href="/blog" title="Read Travel Guides and Trip Diaries" className="hover:text-primary transition-colors duration-150">
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link href="/routes" title="Explore Outstation Cab Routes from Bangalore" className="hover:text-primary transition-colors duration-150">
                  Popular Routes
                </Link>
              </li>
              <li>
                <Link href="/locations" title="View Operating Areas and Service Locations" className="hover:text-primary transition-colors duration-150">
                  Areas We Serve
                </Link>
              </li>
              <li>
                <Link href="/about" title="Learn About Sushi Travels History and Team" className="hover:text-primary transition-colors duration-150">
                  Our Story & Team
                </Link>
              </li>
              <li>
                <Link href="/contact" title="Contact Sushi Travels Bangalore Office" className="hover:text-primary transition-colors duration-150">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white mb-4 tracking-wider uppercase">
              Contact Details
            </h3>
            <ul className="space-y-3.5 text-sm text-cream-warm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="https://maps.google.com/?cid=15212322609133405823"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-150"
                  title="View Sushi Travels Bangalore Office Location on Google Maps"
                >
                  No 272, corner shop, G/F, 8th cross, Opposite to BBMP office Bhuvaneshwari Nagara Dodda Basti Main Road, post, Nagadevana Halli, Bengaluru, Karnataka 560056
                </a>
              </li>
              <li className="flex items-center space-x-3 pl-8">
                <a
                  href="https://share.google/St55UlsbDobuLv9jP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-primary-light hover:text-white transition-colors duration-150"
                  title="Read Verified Customer Reviews for Sushi Travels on Google"
                >
                  Read our reviews on Google ↗
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href={`tel:${PHONE_NUMBER}`} title="Call Sushi Travels 24/7 Helpline" className="hover:text-primary transition-colors">
                  +91 90716 60099
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:sushitravels11@gmail.com" title="Send Email Inquiry to Sushi Travels" className="hover:text-primary transition-colors">
                  sushitravels11@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3 pt-2 text-xs text-cream-warm border-t border-navy-light/20">
                <ShieldAlert className="w-4 h-4 text-primary-light flex-shrink-0 mt-0.5" />
                <span>
                  All bookings are subject to our terms. 5% GST and interstate toll taxes applicable on actuals.
                </span>
              </li>
            </ul>
          </div>



        </div>

        {/* Bottom Banner */}
        <div className="pt-8 border-t border-navy-light/10 flex flex-col md:flex-row items-center justify-between text-xs text-cream-warm space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-center sm:text-left">
            <p>
              &copy; {currentYear} Sushi Travels India. All rights reserved. Registered under Karnataka Tourism Board.
            </p>
            <span className="hidden sm:inline text-cream-warm/30" aria-hidden="true">|</span>
            <p>
              Developed by{' '}
              <a
                href="https://cortinex-webstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors duration-150"
                title="Visit Cortinex Webstudio Website"
              >
                Cortinex Webstudio
              </a>{' '}
              &amp;{' '}
              <a
                href="https://www.naazailabs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors duration-150"
                title="Visit Naaz AI Labs Website"
              >
                Naaz AI Labs
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/privacy-policy" title="Read Sushi Travels Privacy Policy" className="hover:text-primary transition-colors duration-150">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" title="Read Sushi Travels Terms & Conditions" className="hover:text-primary transition-colors duration-150">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" title="Contact Sushi Travels Office" className="hover:text-primary transition-colors duration-150">
              Contact
            </Link>
            <a href="/sitemap.xml" title="View XML Sitemap" className="hover:text-primary transition-colors duration-150">
              Sitemap
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
