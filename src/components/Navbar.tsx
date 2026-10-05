'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHONE_NUMBER } from '@/lib/contact';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close the mobile drawer whenever the route changes, without a
  // synchronous setState-in-effect (adjusting state during render instead,
  // per https://react.dev/learn/you-might-not-need-an-effect).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Our Fleet', href: '/fleet' },
    { name: 'Services', href: '/services' },
    { name: 'Tours & Packages', href: '/tours-and-packages' },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-navy-dark/95 backdrop-blur-md border-b border-navy-light/10 py-3 shadow-sm'
            : 'bg-navy-dark/30 border-b border-transparent py-5 [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 group"
              aria-label="Sushi Travels Home"
              title="Sushi Travels Home Page"
            >
              <Image
                src="/logo-light-v3.png"
                alt="Sushi Travels Logo — Car and Tempo Traveller Rental Bangalore"
                title="Sushi Travels Official Logo"
                width={56}
                height={56}
                className="object-contain"
                priority
              />
              <div className="flex flex-col">
                <span className="flex items-baseline leading-none">
                  <span className="font-serif italic font-bold text-2xl text-primary-light group-hover:text-white transition-colors duration-200">
                    Sushi
                  </span>
                  <span className="font-sans font-light text-xs text-white uppercase tracking-[0.25em] ml-2">
                    Travels
                  </span>
                </span>
                <span className="text-[8px] text-cream-warm tracking-[0.25em] font-light mt-1.5 uppercase">
                  Every Road, A New Story
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    title={`Navigate to ${link.name}`}
                    className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                      isActive ? 'text-white font-semibold' : 'text-cream-warm hover:text-primary'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right CTAs */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Booking CTA */}
              <Link
                href="/booking"
                title="Book a Chauffeur Driven Vehicle in Bangalore"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark active:scale-[0.98] text-white text-sm font-semibold rounded-full px-6 py-2.5 shadow-sm transition-all duration-200"
              >
                Book Your Ride
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center space-x-4 md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-full text-cream-warm hover:text-primary hover:bg-navy-light/20 transition-all duration-200"
                aria-expanded={isOpen}
                aria-label="Main menu"
                title="Toggle Main Navigation Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-45"
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-navy-dark text-white z-50 shadow-2xl flex flex-col p-6 border-l border-navy-light/10"
            >
              <div className="flex items-center justify-between pb-6 border-b border-navy-light/20">
                <Link
                  href="/"
                  title="Sushi Travels Home Page"
                  className="flex items-center space-x-3 group"
                  onClick={() => setIsOpen(false)}
                >
                  <Image
                    src="/logo-light-v3.png"
                    alt="Sushi Travels Logo"
                    title="Sushi Travels Official Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <div className="flex flex-col">
                    <span className="flex items-baseline leading-none">
                      <span className="font-serif italic font-bold text-xl text-primary">
                        Sushi
                      </span>
                      <span className="font-sans font-light text-[10px] text-white uppercase tracking-[0.22em] ml-1.5">
                        Travels
                      </span>
                    </span>
                    <span className="text-[7px] text-cream-warm tracking-[0.2em] uppercase mt-1">
                      Every Road, A New Story
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full text-cream-warm hover:text-primary hover:bg-navy-light/20"
                  aria-label="Close menu"
                  title="Close Navigation Drawer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links inside Drawer */}
              <nav className="flex-1 flex flex-col space-y-4 py-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      title={`Navigate to ${link.name}`}
                      className={`text-lg font-medium py-2 px-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-cream-warm hover:bg-navy-light/35 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Call and Book CTA inside Drawer */}
              <div className="pt-6 border-t border-navy-light/20 space-y-4">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  title="Call Sushi Travels Helpline at +91 90716 60099"
                  className="flex items-center justify-center space-x-2 w-full border border-primary/40 hover:border-primary text-cream-warm hover:text-white rounded-full py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] bg-navy/30"
                >
                  <PhoneCall className="w-4 h-4 text-primary" />
                  <span>Call: +91 90716 60099</span>
                </a>

                <Link
                  href="/booking"
                  title="Book Your Ride Online with Sushi Travels"
                  className="flex items-center justify-center w-full bg-primary hover:bg-primary-dark active:scale-[0.98] text-white rounded-full py-3 text-sm font-semibold shadow-sm transition-all duration-200"
                >
                  Book Your Ride Now
                </Link>

                <p className="text-[10px] text-center text-cream-warm">
                  Registered in Karnataka | GPS Enabled Vehicles
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
