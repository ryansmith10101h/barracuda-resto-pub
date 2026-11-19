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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://barracuda-resto-pub.vercel.app'),
  title: {
    default: 'Barracuda Resto Pub | Rooftop Restaurant & Pub in Wuse 2, Abuja',
    template: '%s | Barracuda Resto Pub Abuja',
  },
  description:
    'Casual rooftop restaurant and pub on 111 Adetokunbo Ademola Crescent, Wuse 2, Abuja. Charcoal grills, seafood, cocktails, salsa nights, and karaoke in a welcoming atmosphere.',
  keywords: [
    'Restaurant in Wuse 2 Abuja',
    'Rooftop restaurant Abuja',
    'Pub in Wuse 2 Abuja',
    'Cocktail bar in Wuse 2',
    'Salsa night Abuja',
    'Karaoke Abuja',
    'Charcoal grilled food in Abuja',
    'barracuda resto pub',
    'adetokunbo ademola crescent restaurants',
  ],
  authors: [{ name: 'Barracuda Resto Pub' }],
  creator: 'Barracuda Resto Pub',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://barracuda-resto-pub.vercel.app',
    siteName: 'Barracuda Resto Pub Abuja',
    title: 'Barracuda Resto Pub | Good Food. Great Drinks. Better Nights.',
    description:
      'Casual rooftop restaurant and pub in Wuse 2, Abuja. Charcoal grills, seafood, cocktails, salsa and karaoke nights, and table reservations.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Barracuda Resto Pub rooftop restaurant in Wuse 2, Abuja',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barracuda Resto Pub | Rooftop Dining & Pub in Abuja',
    description: 'Good Food. Great Drinks. Better Nights in Wuse 2, Abuja.',
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
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
        '@id': 'https://barracuda-resto-pub.vercel.app/#website',
        url: 'https://barracuda-resto-pub.vercel.app',
        name: 'Barracuda Resto Pub Abuja',
        description: 'Casual rooftop restaurant and pub in Wuse 2, Abuja.',
        publisher: {
          '@id': 'https://barracuda-resto-pub.vercel.app/#organization',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://barracuda-resto-pub.vercel.app/#organization',
        name: 'Barracuda Resto Pub',
        url: 'https://barracuda-resto-pub.vercel.app',
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
        '@id': 'https://barracuda-resto-pub.vercel.app/#restaurant',
        name: 'Barracuda Resto Pub',
        image: [
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
        ],
        url: 'https://barracuda-resto-pub.vercel.app',
        telephone: '+2349122356336',
        priceRange: '₦₦',
        menu: 'https://barracuda-resto-pub.vercel.app/menu',
        servesCuisine: ['Nigerian', 'Seafood', 'Charcoal Grills', 'Cocktails'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: '111 Adetokunbo Ademola Crescent (rooftop, Yelwa Plaza)',
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
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '10:00',
            closes: '00:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Sunday'],
            opens: '12:00',
            closes: '00:00',
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
