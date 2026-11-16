import type { Metadata } from 'next';
import EventsClient from '@/components/events/EventsClient';
import { getEvents } from '@/lib/store';
import { PartyPopper } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nightlife & Events Schedule | Afrobeats, Acoustic & DJ Sessions Abuja',
  description:
    'Discover upcoming nightlife residencies, resident DJ shifts, live sax sessions, and ladies nights at Barracuda Resto Pub in Wuse 2, Abuja. Reserve your VIP table online.',
  openGraph: {
    title: 'Barracuda Resto Pub Events & Nightlife | Wuse 2, Abuja',
    description: 'Upcoming Afrobeats DJ nights, Acoustic Sunday Chill, and weekend VIP celebrations in Abuja.',
    images: ['https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80'],
  },
  alternates: {
    canonical: '/events',
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
      startDate: `${evt.date}T${evt.startTime ? '20:00:00+01:00' : '21:00:00+01:00'}`,
      endDate: `${evt.date}T04:00:00+01:00`,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: 'Barracuda Resto Pub',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Adetokunbo Ademola Crescent',
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
      performer: {
        '@type': 'PerformingGroup',
        name: 'Barracuda Resident Artists & Guest DJs',
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
            <PartyPopper className="w-3.5 h-3.5 text-bronze" />
            <span>ABUJA NIGHTLIFE & WEEKLY RESIDENCIES</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-cream-50 leading-tight">
            Upcoming Events & Residencies
          </h1>

          <p className="text-cream-300 text-sm sm:text-base leading-relaxed">
            Experience the heartbeat of Abuja nightlife. From soulful live acoustic saxophone sessions to
            pulsating weekend DJ shifts, reserve your table to guarantee admission and seating.
          </p>
        </div>

        {/* Client Events Interactive */}
        <EventsClient events={events} />
      </div>
    </div>
  );
}
