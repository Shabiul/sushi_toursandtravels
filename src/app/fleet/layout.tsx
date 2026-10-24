import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '9/12/17-Seater Tempo Traveller, Bangalore',
  description:
    'Book 9, 12 & 17-seater Tempo Travellers in Bangalore with Sushi Tours & Travels, plus sedans, SUVs & mini buses — all with verified drivers.',
  alternates: {
    canonical: '/fleet',
  },
  openGraph: {
    title: '9/12/17-Seater Tempo Traveller, Bangalore | Sushi Travels',
    description:
      'Browse the full Sushi Tours & Travels fleet: 9/12/17 seater Tempo Travellers, sedans, SUVs, and a mini coach — all with verified drivers.',
    url: '/fleet',
  },
};

export default function FleetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
