import Link from 'next/link';
import { MapPin, Phone, MessageCircle, Instagram, Clock, ArrowUpRight, Shield } from 'lucide-react';
import { getTelUrl, getWhatsAppUrl, OFFICIAL_OPERATING_HOURS } from '@/lib/utils';

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+2349122356336';
  const whatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '2349122356336';
  const address = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || '111 Adetokunbo Ademola Crescent, Wuse 2, Abuja (rooftop, Yelwa Plaza)';
  const instagram = process.env.NEXT_PUBLIC_BUSINESS_INSTAGRAM || 'barracuda_restpub';

  return (
    <footer className="bg-dark-950 border-t border-white/5 text-cream-200 pt-16 pb-24 xl:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          {/* Brand & Editorial Manifesto */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] font-black text-cream-50 block">
                BARRACUDA
              </span>
              <span className="text-[10px] tracking-[0.3em] text-bronze uppercase font-semibold">
                RESTO PUB • WUSE 2, ABUJA
              </span>
            </div>

            <p className="text-cream-300 text-sm leading-relaxed max-w-md">
              A casual, welcoming rooftop restaurant and pub in Wuse 2, Abuja.
              Serving fresh seafood, charcoal grills, and craft cocktails, with weekly salsa,
              bachata, kizomba, and karaoke nights.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-espresso-900 border border-white/10 flex items-center justify-center text-cream-300 hover:text-champagne hover:border-bronze/40 transition-all"
                aria-label="Instagram profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppUrl(whatsapp, 'Hello Barracuda Resto Pub, I would like to make an enquiry.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-espresso-900 border border-white/10 flex items-center justify-center text-cream-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-all"
                aria-label="WhatsApp Concierge"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={getTelUrl(phone)}
                className="w-10 h-10 rounded-full bg-espresso-900 border border-white/10 flex items-center justify-center text-cream-300 hover:text-champagne hover:border-bronze/40 transition-all"
                aria-label="Direct Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-champagne">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-cream-300 hover:text-champagne transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#story" className="text-cream-300 hover:text-champagne transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-cream-300 hover:text-champagne transition-colors">
                  Digital Menu
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="text-cream-300 hover:text-champagne transition-colors">
                  Dining Experiences
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-cream-300 hover:text-champagne transition-colors">
                  Events & Nightlife
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-cream-300 hover:text-champagne transition-colors">
                  Venue Gallery
                </Link>
              </li>
              <li>
                <Link href="/reservations" className="text-cream-300 hover:text-champagne transition-colors">
                  Table Reservations
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours & Schedule - Single Trusted Source */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-champagne flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-bronze" />
              <span>Hours (WAT)</span>
            </h3>
            <div className="space-y-3 text-xs text-cream-300">
              {OFFICIAL_OPERATING_HOURS.map((h, i) => (
                <div key={i}>
                  <p className="font-semibold text-cream-100">{h.day}</p>
                  <p className="text-cream-400">{h.hours}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Abuja Directions */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-champagne">Location</h3>
            <div className="space-y-3 text-xs text-cream-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                <span>{address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-bronze shrink-0" />
                <a href={getTelUrl(phone)} className="hover:text-champagne transition-colors">
                  +234 912 235 6336
                </a>
              </p>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=111+Adetokunbo+Ademola+Crescent+Wuse+2+Abuja+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-espresso-900 hover:bg-espresso-850 text-champagne border border-bronze/20 text-xs font-semibold transition-all"
                >
                  <span>Google Maps Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar with Privacy & Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-400 gap-4">
          <p>© {new Date().getFullYear()} Barracuda Resto Pub. All rights reserved. Rooftop, Yelwa Plaza, Wuse 2, Abuja.</p>

          <div className="flex items-center space-x-5">
            <Link href="/privacy" className="hover:text-champagne transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/terms" className="hover:text-champagne transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
