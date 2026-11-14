import Link from 'next/link';
import { MapPin, Phone, MessageCircle, Instagram, Clock, ArrowUpRight, Shield } from 'lucide-react';
import { getTelUrl, getWhatsAppUrl } from '@/lib/utils';

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+2349122356336';
  const whatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '2349122356336';
  const address = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || 'Adetokunbo Ademola Crescent, Wuse 2, Abuja, Nigeria';
  const instagram = process.env.NEXT_PUBLIC_BUSINESS_INSTAGRAM || 'barracuda_restpub';

  return (
    <footer className="bg-dark-950 border-t border-white/5 text-cream-200 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          {/* Brand & Editorial Manifesto */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-extrabold text-cream-50 block">
                BARRACUDA
              </span>
              <span className="text-[10px] tracking-[0.35em] text-gold uppercase font-semibold">
                RESTO PUB • WUSE 2, ABUJA
              </span>
            </div>

            <p className="text-cream-300 text-sm leading-relaxed max-w-md">
              An elevated dining sanctuary and vibrant nightlife destination in the heart of Abuja.
              Renowned for charcoal-grilled delicacies, bespoke cocktail mixology, VIP hospitality,
              and an atmosphere designed for memorable evenings.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-850 border border-white/10 flex items-center justify-center text-cream-200 hover:text-gold hover:border-gold/40 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppUrl(whatsapp, 'Hello Barracuda Resto Pub, I would like to make an enquiry.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-850 border border-white/10 flex items-center justify-center text-cream-200 hover:text-emerald-400 hover:border-emerald-500/40 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={getTelUrl(phone)}
                className="w-10 h-10 rounded-full bg-dark-850 border border-white/10 flex items-center justify-center text-cream-200 hover:text-gold hover:border-gold/40 transition-all"
                aria-label="Direct Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/menu" className="text-cream-300 hover:text-gold transition-colors">
                  Digital Menu
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-cream-300 hover:text-gold transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-cream-300 hover:text-gold transition-colors">
                  Atmosphere Gallery
                </Link>
              </li>
              <li>
                <Link href="/reservations" className="text-cream-300 hover:text-gold transition-colors">
                  Table Reservations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream-300 hover:text-gold transition-colors">
                  Location & Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours & Schedule */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Hours</span>
            </h3>
            <div className="space-y-3 text-xs text-cream-300">
              <div>
                <p className="font-semibold text-cream-100">Tue – Thu</p>
                <p className="text-cream-400">4:00 PM – 2:00 AM</p>
              </div>
              <div>
                <p className="font-semibold text-cream-100">Fri & Sat</p>
                <p className="text-cream-400">4:00 PM – 4:00 AM (Late)</p>
              </div>
              <div>
                <p className="font-semibold text-cream-100">Sunday Sessions</p>
                <p className="text-cream-400">3:00 PM – 2:00 AM</p>
              </div>
              <div>
                <p className="font-semibold text-cream-100">Monday</p>
                <p className="text-cream-400">5:00 PM – 12:00 AM</p>
              </div>
            </div>
          </div>

          {/* Abuja Location & Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Find Us</h3>
            <div className="space-y-3 text-xs text-cream-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href={getTelUrl(phone)} className="hover:text-gold transition-colors">
                  +234 912 235 6336
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-gold shrink-0" />
                <a
                  href={`https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  @{instagram}
                </a>
              </p>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Adetokunbo+Ademola+Crescent+Wuse+Abuja+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-dark-850 hover:bg-dark-800 text-gold border border-gold/20 text-xs font-semibold transition-all"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-400 gap-4">
          <p>© {new Date().getFullYear()} Barracuda Resto Pub. All rights reserved. Abuja, Nigeria.</p>
          
          <div className="flex items-center space-x-6">
            <Link href="/admin/login" className="flex items-center gap-1 hover:text-gold transition-colors">
              <Shield className="w-3.5 h-3.5" />
              <span>Staff / Admin</span>
            </Link>
            <span className="text-white/20">•</span>
            <span>Wuse 2 • Abuja Nightlife</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
