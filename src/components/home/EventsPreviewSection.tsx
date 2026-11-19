import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Repeat, Info, Instagram } from 'lucide-react';
import { EventItem } from '@/lib/types';

interface EventsPreviewProps {
  events: EventItem[];
}

export default function EventsPreviewSection({ events }: EventsPreviewProps) {
  // Show all 4 weekly events
  const activeEvents = events.filter((e) => e.status === 'upcoming').slice(0, 4);

  return (
    <section className="py-24 bg-dark-950 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subheading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-espresso-900 border border-bronze/30 text-[10px] font-bold tracking-widest text-bronze uppercase">
              <span>Sample schedule, to be confirmed.</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-cream-50">
              Weekly Nights at Barracuda
            </h2>
            <p className="text-cream-300 text-sm max-w-xl leading-relaxed">
              Salsa, karaoke and good vibes on the Wuse 2 rooftop. Reserve a table and join the fun.
            </p>
          </div>

          <Link
            href="/events"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-champagne hover:text-white transition-colors group"
          >
            <span>VIEW ALL WEEKLY NIGHTS</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeEvents.map((evt) => (
            <div
              key={evt.id}
              className="group bg-espresso-900/80 rounded-3xl overflow-hidden border border-white/10 hover:border-bronze/40 transition-all duration-300 flex flex-col justify-between hover:shadow-elevated"
            >
              <div>
                {/* Event Image Banner */}
                <div className="relative h-56 w-full overflow-hidden bg-espresso-950">
                  <Image
                    src={evt.coverImage}
                    alt={`${evt.title} at Barracuda Resto Pub rooftop`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-transparent to-transparent opacity-85" />

                  {/* Day Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-espresso-950/95 backdrop-blur-md border border-bronze/40 text-champagne font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    <Repeat className="w-3 h-3 text-bronze" />
                    <span>{evt.dayOfWeek}</span>
                  </div>

                  {/* Entry / Ticket Price */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-dark-950/85 backdrop-blur-sm text-[10px] uppercase font-bold text-cream-200 border border-white/10">
                    {evt.ticketPrice && evt.ticketPrice > 0 ? `₦${evt.ticketPrice.toLocaleString()}` : evt.entryType}
                  </div>
                </div>

                {/* Event Info */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-bronze-light text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-bronze shrink-0" />
                    <span>{evt.time}</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-cream-50 group-hover:text-champagne transition-colors">
                    {evt.title}
                  </h3>

                  <p className="text-cream-400 text-xs leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-white/5">
                  <Link
                    href={`/reservations?event=${encodeURIComponent(evt.title)}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-bronze hover:bg-bronze-light text-dark-950 font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <span>Reserve a Table</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small Note Under Section */}
        <div className="mt-12 text-center">
          <p className="inline-flex items-center gap-2 text-xs text-cream-400 bg-espresso-900/60 px-4 py-2 rounded-full border border-white/5">
            <Instagram className="w-3.5 h-3.5 text-bronze shrink-0" />
            <span>Schedule may change. Follow <a href="https://instagram.com/barracuda_restpub" target="_blank" rel="noopener noreferrer" className="text-champagne hover:underline font-medium">@barracuda_restpub</a> on Instagram for updates.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
