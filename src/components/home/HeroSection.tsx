'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, MapPin, Clock, Sparkles } from 'lucide-react';
import { getIsOpenNow, VenueStatus } from '@/lib/utils';

interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
}

export default function HeroSection({
  headline = 'Good Food. Great Drinks. Better Nights.',
  subheadline = 'A casual, welcoming rooftop restaurant and pub in Wuse 2, Abuja with seafood, grills and cocktails, plus salsa and karaoke nights.',
}: HeroSectionProps) {
  const [status, setStatus] = useState<VenueStatus>({
    isOpen: false,
    statusText: 'Mon–Sat: 10:00 AM–12:00 AM • Sun: 12:00 PM–12:00 AM',
    badgeLabel: 'Wuse 2, Abuja',
    currentDayName: 'Abuja',
  });

  useEffect(() => {
    setStatus(getIsOpenNow());
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-dark-950 pt-10 pb-20 sm:pb-24">
      {/* Background Photography with Sophisticated Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
          alt="Barracuda Resto Pub Rooftop Atmosphere in Wuse 2 Abuja"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.32] contrast-110"
        />
        {/* Controlled espresso & charcoal vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-espresso-950/50 to-dark-950" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-dark-950/70 to-dark-950" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Live Operating Status & Verified Location Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-espresso-900/90 border border-bronze/30 backdrop-blur-md mb-8 shadow-bronze-sm">
          <span
            className={`w-2 h-2 rounded-full ${
              status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-500'
            }`}
          />
          <span className="text-[11px] font-bold tracking-wider uppercase text-champagne">
            {status.badgeLabel}
          </span>
          <span className="text-white/20">•</span>
          <span className="text-xs text-cream-200">{status.statusText}</span>
        </div>

        {/* Brand Tagline */}
        <p className="text-[11px] sm:text-xs font-semibold tracking-[0.32em] uppercase text-bronze-light mb-4 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-bronze" />
          <span>ROOFTOP RESTAURANT & PUB • SEAFOOD, GRILLS & COCKTAILS</span>
          <Sparkles className="w-3.5 h-3.5 text-bronze" />
        </p>

        {/* Editorial Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-cream-50 leading-[1.08] max-w-4xl mb-6">
          Good Food.{' '}
          <span className="text-champagne-gradient block sm:inline">Great Drinks.</span>
          <br className="hidden sm:inline" /> Better Nights.
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-base md:text-lg text-cream-200/90 max-w-2xl font-normal leading-relaxed mb-10 text-balance">
          {subheadline}
        </p>

        {/* Primary and Secondary Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/menu"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-bronze hover:bg-bronze-light text-dark-950 font-black uppercase tracking-widest text-xs sm:text-sm shadow-bronze-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group"
          >
            <span>VIEW DIGITAL MENU</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/reservations"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-espresso-900/90 hover:bg-espresso-850 text-cream-50 border border-bronze/40 hover:border-bronze font-bold uppercase tracking-widest text-xs sm:text-sm backdrop-blur-sm transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-bronze" />
            <span>RESERVE A TABLE</span>
          </Link>
        </div>

        {/* Trust & Location Footnotes */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-cream-300 text-xs w-full max-w-3xl">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-bronze shrink-0" />
            <span>111 Adetokunbo Ademola Crescent (Rooftop, Yelwa Plaza)</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-bronze shrink-0" />
            <span>Mon–Sat 10:00 AM–12:00 AM • Sun 12:00 PM–12:00 AM</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-bronze" />
            <span>Rooftop Terrace • Salsa & Karaoke</span>
          </div>
        </div>
      </div>
    </section>
  );
}
