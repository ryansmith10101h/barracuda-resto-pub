import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileStickyCTA from '@/components/layout/MobileStickyCTA';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serifFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#070709',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://barracudarestpub.ng'),
  title: {
    default: 'Barracuda Resto Pub | Abuja’s Premier Gastropub & Nightlife Sanctuary',
    template: '%s | Barracuda Resto Pub Abuja',
  },
  description:
    'Experience Abuja’s premier gastropub on Adetokunbo Ademola Crescent, Wuse 2. Charcoal-grilled Nigerian cuisine, bespoke craft cocktails, VIP booths, and exclusive nightlife ambiance.',
  keywords: [
    'Restaurant in Wuse 2 Abuja',
    'Gastropub in Abuja',
    'Premium restaurant in Abuja',
    'Cocktail bar in Wuse 2',
    'Nightlife in Abuja',
    'VIP dining in Abuja',
    'Private event venue in Abuja',
    'Charcoal grilled food in Abuja',
    'barracuda resto pub',
    'adetokunbo ademola crescent restaurants',
  ],
  authors: [{ name: 'Barracuda Resto Pub' }],
  creator: 'Barracuda Resto Pub',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://barracudarestpub.ng',
    siteName: 'Barracuda Resto Pub Abuja',
    title: 'Barracuda Resto Pub | Good Food. Great Drinks. Better Nights.',
    description:
      'Abuja’s premier nightlife and dining destination in Wuse 2. Explore our charcoal grills, craft cocktails, upcoming events, and VIP table reservations.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Barracuda Resto Pub Atmosphere and VIP Lounge in Abuja',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barracuda Resto Pub | Abuja Nightlife & Dining',
    description: 'Good Food. Great Drinks. Better Nights in Wuse 2, Abuja.',
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'],
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
  verification: {
    google: 'google-site-verification-placeholder-barracuda',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Comprehensive Schema.org Graph (Restaurant, BarOrPub, FoodEstablishment, Organization, WebSite)
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://barracudarestpub.ng/#website',
        url: 'https://barracudarestpub.ng',
        name: 'Barracuda Resto Pub Abuja',
        description: 'Abuja’s Premier Gastropub, Dining & Nightlife Sanctuary in Wuse 2.',
        publisher: {
          '@id': 'https://barracudarestpub.ng/#organization',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://barracudarestpub.ng/#organization',
        name: 'Barracuda Resto Pub',
        url: 'https://barracudarestpub.ng',
        logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+2349122356336',
          contactType: 'reservations',
          areaServed: 'NG',
          availableLanguage: ['English'],
        },
        sameAs: ['https://instagram.com/barracuda_restpub'],
      },
      {
        '@type': ['Restaurant', 'BarOrPub', 'FoodEstablishment'],
        '@id': 'https://barracudarestpub.ng/#restaurant',
        name: 'Barracuda Resto Pub',
        image: [
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
        ],
        url: 'https://barracudarestpub.ng',
        telephone: '+2349122356336',
        priceRange: '₦₦₦',
        menu: 'https://barracudarestpub.ng/menu',
        servesCuisine: ['Nigerian Contemporary', 'Charcoal Grills', 'Gastropub', 'Craft Cocktails'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Adetokunbo Ademola Crescent',
          addressLocality: 'Wuse 2',
          addressRegion: 'Abuja (FCT)',
          postalCode: '900288',
          addressCountry: 'NG',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 9.0765,
          longitude: 7.4764,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday'],
            opens: '16:00',
            closes: '02:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Friday', 'Saturday'],
            opens: '16:00',
            closes: '04:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Sunday'],
            opens: '15:00',
            closes: '02:00',
          },
        ],
        acceptsReservations: 'True',
      },
    ],
  };

  return (
    <html lang="en" className={`${sansFont.variable} ${serifFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-dark-950 text-cream-100 selection:bg-bronze selection:text-dark-950 font-sans">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
