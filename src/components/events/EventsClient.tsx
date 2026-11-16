'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Sparkles, MessageCircle, ArrowRight, ShieldCheck, Repeat } from 'lucide-react';
import { EventItem } from '@/lib/types';
import { getWhatsAppUrl, formatNaira } from '@/lib/utils';

interface EventsClientProps {
  events: EventItem[];
}

export default function EventsClient({ events }: EventsClientProps) {
  const [filter, setFilter] = useState<'all' | 'recurring' | 'special'>('all');

  const whatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '2349122356336';

  const filteredEvents = events.filter((evt) => {
    if (evt.status !== 'upcoming') return false;
    if (filter === 'recurring') return evt.isRecurring;
    if (filter === 'special') return !evt.isRecurring;
    return true;
  });

  return (
    <div className="space-y-12">
      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            filter === 'all'
              ? 'bg-bronze text-dark-950 shadow-bronze-sm'
              : 'bg-espresso-900 text-cream-300 hover:text-champagne border border-white/5'
          }`}
        >
          All Programs ({events.filter((e) => e.status === 'upcoming').length})
        </button>
        <button
          onClick={() => setFilter('recurring')}
          className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            filter === 'recurring'
              ? 'bg-bronze text-dark-950 shadow-bronze-sm'
              : 'bg-espresso-900 text-cream-300 hover:text-champagne border border-white/5'
          }`}
        >
          Weekly Residencies
        </button>
        <button
          onClick={() => setFilter('special')}
          className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            filter === 'special'
              ? 'bg-bronze text-dark-950 shadow-bronze-sm'
              : 'bg-espresso-900 text-cream-300 hover:text-champagne border border-white/5'
          }`}
        >
          Special Dated Events
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="group bg-espresso-900/80 rounded-3xl overflow-hidden border border-white/10 hover:border-bronze/40 transition-all duration-300 flex flex-col justify-between hover:shadow-elevated"
          >
            <div>
              {/* Event Cover Image */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-espresso-950">
                <Image
                  src={evt.coverImage}
                  alt={`${evt.title} event at Barracuda Resto Pub Abuja`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/40 to-transparent" />

                {/* Day Badge */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-espresso-950/95 backdrop-blur-md border border-bronze/40 text-champagne font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  {evt.isRecurring ? <Repeat className="w-3.5 h-3.5 text-bronze" /> : <Calendar className="w-3.5 h-3.5 text-bronze" />}
                  <span>{evt.dayOfWeek}</span>
                </div>

                {/* Entry Type */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-md bg-dark-950/80 backdrop-blur-sm text-[10px] uppercase font-bold text-cream-200 border border-white/10">
                  {evt.entryType}
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <span className="text-[11px] font-semibold text-bronze-light tracking-widest uppercase block">
                    {evt.subtitle}
                  </span>
                  <h3 className="font-serif font-black text-2xl sm:text-3xl text-cream-50 leading-tight">
                    {evt.title}
                  </h3>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6 sm:p-8 space-y-5">
                <p className="text-cream-300 text-sm leading-relaxed">
                  {evt.description}
                </p>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 text-xs text-cream-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-bronze shrink-0" />
                    <div>
                      <p className="text-[10px] text-cream-400 uppercase font-semibold">Time</p>
                      <p className="font-medium text-cream-100">{evt.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-bronze shrink-0" />
                    <div>
                      <p className="text-[10px] text-cream-400 uppercase font-semibold">Dress Code</p>
                      <p className="font-medium text-cream-100">{evt.dressCode || 'Smart Casual'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-bronze shrink-0" />
                    <div>
                      <p className="text-[10px] text-cream-400 uppercase font-semibold">Access</p>
                      <p className="font-medium text-cream-100">
                        {evt.entryType}
                        {evt.ticketPrice && evt.ticketPrice > 0 ? ` (${formatNaira(evt.ticketPrice)})` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-bronze shrink-0" />
                    <div>
                      <p className="text-[10px] text-cream-400 uppercase font-semibold">Location</p>
                      <p className="font-medium text-cream-100">Wuse 2, Abuja</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href={`/reservations?event=${encodeURIComponent(evt.title)}`}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-bronze hover:bg-bronze-light text-dark-950 font-black uppercase tracking-wider text-xs shadow-bronze-sm hover:scale-[1.02] active:scale-[0.98] transition-all text-center flex items-center justify-center gap-2"
              >
                <span>RESERVE TABLE / RSVP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={getWhatsAppUrl(
                  whatsapp,
                  `Hello Barracuda Resto Pub, I would like to RSVP for "${evt.title}".`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-emerald-950/60 hover:bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp RSVP</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
