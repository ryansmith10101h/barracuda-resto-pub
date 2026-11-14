import { MapPin, Phone, MessageCircle, Instagram, Clock, Navigation, ExternalLink } from 'lucide-react';
import { getTelUrl, getWhatsAppUrl } from '@/lib/utils';

export default function LocationSection() {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+2349122356336';
  const whatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '2349122356336';
  const address = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || 'Adetokunbo Ademola Crescent, Wuse 2, Abuja, Nigeria';
  const instagram = process.env.NEXT_PUBLIC_BUSINESS_INSTAGRAM || 'barracuda_restpub';

  return (
    <section className="py-24 bg-dark-900 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Location & Contact Information */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-bold tracking-[0.25em] text-gold uppercase block mb-3">
                FIND US IN ABUJA
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-cream-50 leading-tight">
                In the Epicenter of Wuse 2 Nightlife.
              </h2>
            </div>

            <p className="text-cream-300 text-sm sm:text-base leading-relaxed">
              Situated on the prestigious Adetokunbo Ademola Crescent, Barracuda Resto Pub is easily accessible
              from Maitama, Central Business District, and Garki. Ample dedicated parking and security personnel on site.
            </p>

            <div className="space-y-4">
              {/* Address Item */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-dark-850 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-cream-100 text-sm">Physical Address</h3>
                  <p className="text-cream-300 text-xs mt-1">{address}</p>
                  <p className="text-gold text-[11px] font-semibold mt-1">Federal Capital Territory, Nigeria</p>
                </div>
              </div>

              {/* Hours Item */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-dark-850 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-cream-100 text-sm">Operating Schedule</h3>
                  <div className="text-cream-300 text-xs mt-1 space-y-0.5">
                    <p>Tuesday – Thursday: 4:00 PM – 2:00 AM</p>
                    <p>Friday & Saturday: 4:00 PM – 4:00 AM (Late Shift)</p>
                    <p>Sunday Live Sessions: 3:00 PM – 2:00 AM</p>
                    <p>Monday: 5:00 PM – 12:00 AM</p>
                  </div>
                </div>
              </div>

              {/* Contact Item */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-dark-850 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-cream-100 text-sm">Reservations & Concierge</h3>
                  <p className="text-cream-300 text-xs mt-1">Phone: +234 912 235 6336</p>
                  <p className="text-cream-300 text-xs">Instagram: @{instagram}</p>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://maps.google.com/?q=Adetokunbo+Ademola+Crescent+Wuse+Abuja+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-gold text-dark-950 font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-gold-sm hover:scale-105 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>GET DIRECTIONS (GOOGLE MAPS)</span>
              </a>

              <a
                href={getTelUrl(phone)}
                className="px-6 py-3 rounded-xl bg-dark-850 border border-white/10 hover:border-gold/40 text-cream-200 hover:text-gold font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>CALL VENUE</span>
              </a>

              <a
                href={getWhatsAppUrl(whatsapp, 'Hello Barracuda, I am requesting directions / arriving shortly.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:text-white font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WHATSAPP CONCIERGE</span>
              </a>
            </div>
          </div>

          {/* Interactive Simulated Map / Visual Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[480px] rounded-3xl overflow-hidden bg-dark-850 border border-gold/30 shadow-elevated p-8 flex flex-col justify-between">
              {/* Abstract Map Grid Lines & Styling */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/80 to-transparent" />

              {/* Map Card Top */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="px-3 py-1.5 rounded-full bg-dark-950/90 border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Wuse 2 Hub</span>
                </div>

                <a
                  href="https://maps.google.com/?q=Adetokunbo+Ademola+Crescent+Wuse+Abuja+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-dark-900 border border-white/10 hover:border-gold text-cream-200 hover:text-gold transition-colors"
                  aria-label="Open Map in New Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Pin Center Graphic */}
              <div className="relative z-10 text-center py-12 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center text-gold shadow-gold-md animate-bounce">
                  <MapPin className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-black text-cream-50 mt-4">
                  BARRACUDA RESTO PUB
                </h4>
                <p className="text-xs text-gold uppercase tracking-widest font-semibold mt-1">
                  Adetokunbo Ademola Crescent • Wuse 2
                </p>
                <p className="text-xs text-cream-400 mt-2 max-w-xs">
                  Coordinates: 9.0765° N, 7.4764° E • Abuja FCT
                </p>
              </div>

              {/* Map Card Bottom Actions */}
              <div className="relative z-10 bg-dark-950/90 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-cream-100">Need immediate help finding us?</p>
                  <p className="text-[11px] text-cream-400">Our front desk can assist with landmarks and parking.</p>
                </div>
                <a
                  href={getTelUrl(phone)}
                  className="px-4 py-2 rounded-xl bg-gold text-dark-950 font-bold text-xs uppercase tracking-wider shrink-0 ml-3"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
