import type { Metadata } from 'next';
import EventsClient from '@/components/events/EventsClient';
import { getEvents } from '@/lib/store';
import { PartyPopper } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nightlife & Events Schedule | Afrobeats, Acoustic & DJ Sessions',
  description:
    'Discover upcoming nightlife events, DJ line-ups, live sax sessions, and ladies nights at Barracuda Resto Pub in Wuse 2, Abuja. Reserve your VIP table online.',
  openGraph: {
    title: 'Barracuda Resto Pub Events & Nightlife | Wuse 2, Abuja',
    description: 'Upcoming Afrobeats DJ nights, Acoustic Sunday Chill, and weekend celebrations.',
    images: ['https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80'],
  },
};

export const revalidate = 60;

export default function EventsPage() {
  const events = getEvents();

  return (
    <div className="py-16 sm:py-24 bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-900 border border-gold/40 text-gold text-xs uppercase font-bold tracking-widest shadow-gold-sm">
            <PartyPopper className="w-3.5 h-3.5" />
            <span>Abuja Nightlife & Weekly Programs</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-cream-50 leading-tight">
            Upcoming Events
          </h1>

          <p className="text-cream-300 text-sm sm:text-base leading-relaxed">
            Experience the heartbeat of Abuja after dark. From soulful live acoustic sessions to
            pulsating weekend DJ shifts, reserve your table to guarantee entry.
          </p>
        </div>

        {/* Client Events Interactive */}
        <EventsClient events={events} />
      </div>
    </div>
  );
}
