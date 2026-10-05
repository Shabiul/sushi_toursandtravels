'use client';

import React from 'react';
import { Phone } from 'lucide-react';
import { PHONE_NUMBER } from '@/lib/contact';

export default function CallFloat() {
  return (
    <a
      href={`tel:${PHONE_NUMBER}`}
      className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#0078FF] hover:bg-[#0060DF] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group"
      aria-label="Call Sushi Travels"
      title="Call Sushi Travels Helpline at +91 90716 60099"
    >
      {/* Pulsing ring indicator */}
      <span className="absolute inset-0 rounded-full bg-[#0078FF] opacity-40 animate-ping group-hover:animate-none"></span>

      {/* Phone Icon */}
      <Phone className="w-6 h-6 relative z-10 stroke-[2.5]" />
    </a>
  );
}
