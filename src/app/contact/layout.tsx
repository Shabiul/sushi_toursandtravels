import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Sushi Travels, Bangalore Car Rental',
  description:
    'Contact Sushi Tours & Travels (Sushi Travels Bangalore) for outstation cabs, tempo traveller hire and group travel quotes. Call or WhatsApp.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
