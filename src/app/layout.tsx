import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import LoadingScreen from '@/components/LoadingScreen';
import LayoutWrapper from '@/components/LayoutWrapper';

import { getLocalBusinessSchema, getWebSiteSchema } from '@/lib/schema';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

// Global SEO Metadata configurations
export const metadata: Metadata = {
  metadataBase: new URL('https://www.sushitravels.com'),
  title: {
    default: 'Sushi Travels | Car & Tempo Traveller Rental Bangalore',
    template: '%s | Sushi Travels'
  },
  description: 'Sushi Tours & Travels — chauffeur-driven car & Tempo Traveller rental in Bangalore. 9/12/17-seater vans, outstation cabs, airport transfers, local drops.',
  publisher: 'Sushi Travels',
  keywords: [
    'Sushi Tours & Travels',
    'Sushi Tours and Travels Bangalore',
    'Sushi Travels Bangalore',
    '9 seater tempo traveller Bangalore',
    '12 seater tempo traveller Bangalore',
    '17 seater tempo traveller Bangalore',
    'tempo traveller rental Bangalore',
    'tempo traveller hire Bangalore',
    'outstation cab service Bangalore',
    'outstation taxi Bangalore',
    'Car hire with driver Bangalore',
    'Airport taxi Bangalore',
    'Rent vehicle with driver'
  ],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Sushi Travels | Car Rental & Chauffeur Services India',
    description: 'Rent premium vehicles with professional drivers for outstation road trips and local travel in India. Transparent rates, GPS enabled fleet, and warm hospitality.',
    url: 'https://www.sushitravels.com',
    siteName: 'Sushi Travels',
    images: [
      {
        url: 'https://www.sushitravels.com/fleet/force-urbania-front-01.webp',
        width: 800,
        height: 600,
        alt: 'Sushi Travels Chauffeur Services India'
      }
    ],
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sushi Travels | Car Rental with Driver India',
    description: 'Book verified drivers and premium vehicles across South India. Safe, transparent pricing, and 24/7 service.',
    images: ['https://www.sushitravels.com/fleet/force-urbania-front-01.webp']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = getLocalBusinessSchema();
  const webSiteJsonLd = getWebSiteSchema();

  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream font-sans text-navy">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-51P2C6Y9D7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-51P2C6Y9D7');
          `}
        </Script>

        {/* Pre-rendered Noscript Snapshot for Non-JS AI Crawlers & GSC Indexation */}
        <noscript>
          <div style={{ display: 'none' }}>
            <h2>Sushi Travels — Chauffeur-Driven Car &amp; Tempo Traveller Rental Bangalore</h2>
            <p>
              Sushi Tours &amp; Travels (Sushi Travels) provides premium chauffeur-driven Tempo Travellers (9-seater, 12-seater, 17-seater),
              Force Urbania luxury vans, Innova Crysta, and 22-seater to 50-seater tourist buses with police-verified commercial chauffeurs.
              Registered office: No 272, corner shop, G/F, 8th cross, Opposite to BBMP office Bhuvaneshwari Nagara Dodda Basti Main Road, Nagadevana Halli, Bengaluru, Karnataka 560056. Phone: +91 90716 60099.
            </p>
            <nav aria-label="Noscript Directory Navigation">
              <ul>
                <li><a href="/fleet" title="Explore Fleet">Rental Fleet</a></li>
                <li><a href="/services" title="Chauffeur Services">Chauffeur Services</a></li>
                <li><a href="/routes" title="Outstation Routes">Outstation Cab Routes</a></li>
                <li><a href="/locations" title="Areas Served in Bangalore">Areas We Serve</a></li>
                <li><a href="/tours-and-packages" title="Tours and Packages">Tours &amp; Packages</a></li>
                <li><a href="/blog" title="Travel Blog and Guides">Travel Blog</a></li>
                <li><a href="/booking" title="Online Booking">Book a Vehicle</a></li>
                <li><a href="/contact" title="Contact Desk">Contact Us</a></li>
                <li><a href="/privacy-policy" title="Privacy Policy">Privacy Policy</a></li>
                <li><a href="/terms-and-conditions" title="Terms and Conditions">Terms &amp; Conditions</a></li>
              </ul>
            </nav>
          </div>
        </noscript>

        {/* Premium Loading Screen Overlay */}
        <LoadingScreen />
        
        {/* Route dependent header/footer wrapper */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
