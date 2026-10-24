import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Sushi Travels, Bangalore Car Rental',
  description:
    'Contact Sushi Tours & Travels (Sushi Travels Bangalore) for outstation cab booking, tempo traveller hire, and group travel quotes. Call, WhatsApp, or send an enquiry.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
