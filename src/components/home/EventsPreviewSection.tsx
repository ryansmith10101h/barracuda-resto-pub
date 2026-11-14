import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { EventItem } from '@/lib/types';

interface EventsPreviewProps {
  events: EventItem[];
}

export default function EventsPreviewSection({ events }: EventsPreviewProps) {
  const upcomingEvents = events.filter((e) => e.status === 'upcoming').slice(0, 3);

  return (
    <section className="py-24 bg-dark-950 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] text-gold uppercase block">
              NIGHTLIFE & EXPERIENCES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-cream-50">
              Upcoming Events in Abuja.
            </h2>
            <p className="text-cream-400 text-sm max-w-xl">
              From high-voltage weekend DJ sets to soulful Sunday acoustic sax sessions.
              Secure your table in advance.
            </p>
          </div>

          <Link
            href="/events"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gold hover:text-gold-light transition-colors group"
          >
            <span>VIEW ALL EVENTS</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Events Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((evt) => (
            <div
              key={evt.id}
              className="group bg-dark-900 rounded-3xl overflow-hidden border border-white/10 hover:border-gold/40 transition-all duration-300 flex flex-col hover:shadow-gold-sm"
            >
              {/* Event Image Banner */}
              <div className="relative h-64 w-full overflow-hidden bg-dark-850">
                <Image
                  src={evt.coverImage}
                  alt={evt.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-85" />

                {/* Day Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-dark-950/90 backdrop-blur-md border border-gold/30 text-gold font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{evt.dayOfWeek}</span>
                </div>

                {/* Entry Type */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-dark-950/80 backdrop-blur-sm text-[10px] uppercase font-bold text-cream-200 border border-white/10">
                  {evt.entryType}
                </div>
              </div>

              {/* Event Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gold text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{evt.time}</span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-cream-50 group-hover:text-gold transition-colors">
                    {evt.title}
                  </h3>
                  <p className="text-cream-400 text-xs leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-cream-400 font-medium">
                    {evt.dressCode || 'Smart Casual'}
                  </span>

                  <Link
                    href={`/reservations?event=${encodeURIComponent(evt.title)}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold/15 hover:bg-gold text-gold hover:text-dark-950 text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>RSVP / Table</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
