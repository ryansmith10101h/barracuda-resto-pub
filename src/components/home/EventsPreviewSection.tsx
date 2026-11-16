import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Sparkles, Repeat } from 'lucide-react';
import { EventItem } from '@/lib/types';

interface EventsPreviewProps {
  events: EventItem[];
}

export default function EventsPreviewSection({ events }: EventsPreviewProps) {
  // Filter active events and take the top 3
  const activeEvents = events.filter((e) => e.status === 'upcoming').slice(0, 3);

  return (
    <section className="py-24 bg-dark-950 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="space-y-3">
            <span className="text-[11px] font-bold tracking-[0.25em] text-bronze uppercase block">
              NIGHTLIFE & ENTERTAINMENT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-cream-50">
              Weekly Residencies & Curated Nights.
            </h2>
            <p className="text-cream-400 text-sm max-w-xl leading-relaxed">
              From high-voltage weekend Afro-groove DJ sets to soulful Sunday acoustic sax sessions.
              Secure your table reservation in advance.
            </p>
          </div>

          <Link
            href="/events"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-champagne hover:text-white transition-colors group"
          >
            <span>VIEW ALL EVENTS & RESIDENCIES</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Events Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeEvents.map((evt) => (
            <div
              key={evt.id}
              className="group bg-espresso-900/80 rounded-3xl overflow-hidden border border-white/10 hover:border-bronze/40 transition-all duration-300 flex flex-col justify-between hover:shadow-elevated"
            >
              <div>
                {/* Event Image Banner */}
                <div className="relative h-64 w-full overflow-hidden bg-espresso-950">
                  <Image
                    src={evt.coverImage}
                    alt={`${evt.title} at Barracuda Resto Pub`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-transparent to-transparent opacity-85" />

                  {/* Day Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-espresso-950/95 backdrop-blur-md border border-bronze/40 text-champagne font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    {evt.isRecurring ? <Repeat className="w-3.5 h-3.5 text-bronze" /> : <Calendar className="w-3.5 h-3.5 text-bronze" />}
                    <span>{evt.dayOfWeek}</span>
                  </div>

                  {/* Entry Type */}
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-dark-950/80 backdrop-blur-sm text-[10px] uppercase font-bold text-cream-200 border border-white/10">
                    {evt.entryType}
                  </div>
                </div>

                {/* Event Info */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-bronze-light text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-bronze" />
                    <span>{evt.time}</span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-cream-50 group-hover:text-champagne transition-colors">
                    {evt.title}
                  </h3>
                  <p className="text-cream-400 text-xs leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-cream-400 font-medium">
                    {evt.dressCode || 'Smart Casual'}
                  </span>

                  <Link
                    href={`/reservations?event=${encodeURIComponent(evt.title)}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-bronze/15 hover:bg-bronze text-champagne hover:text-dark-950 text-xs font-bold uppercase tracking-wider transition-all"
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
