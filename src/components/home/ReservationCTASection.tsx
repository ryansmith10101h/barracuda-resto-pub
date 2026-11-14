import Link from 'next/link';
import { Calendar, Phone, MessageCircle, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { getTelUrl, getWhatsAppUrl } from '@/lib/utils';

export default function ReservationCTASection() {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+2349122356336';
  const whatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '2349122356336';

  return (
    <section className="py-24 bg-dark-950 border-t border-white/5 relative overflow-hidden">
      {/* Background glow and subtle noise */}
      <div className="absolute inset-0 bg-subtle-glow opacity-60 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-dark-850 to-dark-900 border border-gold/30 shadow-elevated text-center relative overflow-hidden">
          {/* Decorative Corner Shimmers */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-950 border border-gold/40 text-gold text-xs uppercase font-bold tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guaranteed Table Seating</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black text-cream-50 leading-tight max-w-3xl mx-auto mb-6">
            Secure Your Table for Tonight or Upcoming Weekends.
          </h2>

          <p className="text-cream-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10">
            Due to high demand during prime nightlife hours and weekend sessions in Wuse 2,
            we strongly advise booking in advance. VIP booths and terrace dining fill quickly.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <Link
              href="/reservations"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold via-gold-hover to-gold text-dark-950 font-bold uppercase tracking-widest text-xs sm:text-sm shadow-gold-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK A TABLE ONLINE</span>
            </Link>

            <a
              href={getWhatsAppUrl(whatsapp, 'Hello Barracuda Resto Pub, I would like to book a table for tonight.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-950/80 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-white font-bold uppercase tracking-widest text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>INSTANT WHATSAPP RSVP</span>
            </a>
          </div>

          {/* Direct Phone Assistance */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 text-xs text-cream-400">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>Telephone: </span>
              <a href={getTelUrl(phone)} className="text-cream-200 font-semibold hover:text-gold">
                +234 912 235 6336
              </a>
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span>Table hold grace period: 20 minutes</span>
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>Zero reservation fee</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
