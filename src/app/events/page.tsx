import type { Metadata } from 'next';
import EventsClient from '@/components/events/EventsClient';
import { getEvents } from '@/lib/store';
import { PartyPopper } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Weekly Nights at Barracuda | Salsa, Karaoke & Rooftop Socials Abuja',
  description:
    'Salsa, karaoke and good vibes on the Wuse 2 rooftop at Barracuda Resto Pub. Cuban Salsa, Karaoke, Kizomba, and Bachata socials. Reserve a table online.',
  robots: {
    index: false,
    follow: false,
  },
};

export const revalidate = 60;

export default function EventsPage() {
  const events = getEvents();

  const eventsSchema = {
    '@context': 'https://schema.org',
    '@graph': events.map((evt) => ({
      '@type': 'Event',
      name: evt.title,
      description: evt.description,
      startDate: `${evt.date}T19:00:00+01:00`,
      endDate: `${evt.date}T23:30:00+01:00`,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: 'Barracuda Resto Pub',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '111 Adetokunbo Ademola Crescent (rooftop, Yelwa Plaza)',
          addressLocality: 'Wuse 2',
          addressRegion: 'Abuja (FCT)',
          addressCountry: 'NG',
        },
      },
      image: [evt.coverImage],
      offers: {
        '@type': 'Offer',
        price: evt.ticketPrice || 0,
        priceCurrency: 'NGN',
        availability: 'https://schema.org/InStock',
        url: 'https://barracudarestpub.ng/reservations',
      },
    })),
  };

  return (
    <div className="py-16 sm:py-24 bg-dark-950 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-espresso-900 border border-bronze/40 text-champagne text-xs uppercase font-bold tracking-widest shadow-bronze-sm">
            <span>Sample schedule, to be confirmed.</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-cream-50 leading-tight">
            Weekly Nights at Barracuda
          </h1>

          <p className="text-cream-300 text-sm sm:text-base leading-relaxed">
            Salsa, karaoke and good vibes on the Wuse 2 rooftop. Reserve a table and join the fun.
          </p>
        </div>

        {/* Client Events Interactive */}
        <EventsClient events={events} />
      </div>
    </div>
  );
}
