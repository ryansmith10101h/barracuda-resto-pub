'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Sparkles, MapPin, Clock } from 'lucide-react';
import { getIsOpenNow } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
}

export default function HeroSection({
  headline = 'Good Food. Great Drinks. Better Nights.',
  subheadline = 'An elevated resto-pub experience in the heart of Wuse, Abuja. Where authentic charcoal-grilled flavors, bespoke craft cocktails, and pulsating urban nightlife converge.',
}: HeroSectionProps) {
  const [status, setStatus] = useState({ isOpen: true, statusText: 'Open Now — Wuse 2' });

  useEffect(() => {
    setStatus(getIsOpenNow());
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-dark-950 pt-12 pb-24">
      {/* Background Photography with Sophisticated Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
          alt="Barracuda Resto Pub Interior Atmosphere and Dining Bar"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 filter brightness-[0.38] contrast-110"
        />
        {/* Subtle radial and linear overlays for editorial readability */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-dark-950/60 to-dark-950" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-dark-950/80" />
        <div className="absolute inset-0 bg-subtle-glow opacity-80" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Live Status & Location Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-900/80 border border-gold/30 backdrop-blur-md mb-8 shadow-gold-sm">
          <span
            className={`w-2 h-2 rounded-full ${
              status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
            }`}
          />
          <span className="text-xs font-semibold tracking-wider uppercase text-gold">
            Wuse 2, Abuja
          </span>
          <span className="text-white/20">•</span>
          <span className="text-xs text-cream-200">{status.statusText}</span>
        </div>

        {/* Editorial Subtitle / Tagline */}
        <p className="text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-cream-300 mb-4 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Abuja’s Premier Gastropub & Nightlife Sanctuary</span>
          <Sparkles className="w-3.5 h-3.5 text-gold" />
        </p>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-cream-50 leading-[1.08] max-w-5xl mb-6">
          Good Food.{' '}
          <span className="text-gold-gradient block sm:inline">Great Drinks.</span>
          <br className="hidden sm:inline" /> Better Nights.
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-cream-200/90 max-w-2xl font-normal leading-relaxed mb-10 text-balance">
          {subheadline}
        </p>

        {/* Primary & Secondary High-Converting CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/menu"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold via-gold-hover to-gold text-dark-950 font-bold uppercase tracking-widest text-xs sm:text-sm shadow-gold-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <span>VIEW DIGITAL MENU</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/reservations"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-dark-900/80 hover:bg-dark-800 text-cream-50 border border-gold/40 hover:border-gold font-bold uppercase tracking-widest text-xs sm:text-sm backdrop-blur-sm transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-gold" />
            <span>RESERVE A TABLE</span>
          </Link>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12 text-cream-300 text-xs sm:text-sm">
          <div className="flex items-center justify-center gap-2.5">
            <MapPin className="w-4 h-4 text-gold" />
            <span>Adetokunbo Ademola Crescent</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <Clock className="w-4 h-4 text-gold" />
            <span>Tuesday – Sunday from 4:00 PM</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span>VIP Booths & Outdoor Terrace</span>
          </div>
        </div>
      </div>
    </section>
  );
}
