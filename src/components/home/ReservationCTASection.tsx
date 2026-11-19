import Link from 'next/link';
import { Calendar, Phone, MessageCircle, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { getTelUrl, getWhatsAppUrl } from '@/lib/utils';

export default function ReservationCTASection() {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+2349122356336';
  const whatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '2349122356336';

  return (
    <section className="py-24 bg-dark-950 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-espresso-900 to-espresso-950 border border-bronze/30 shadow-elevated text-center relative overflow-hidden">
          {/* Subtle Corner Vignette */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-bronze/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-bronze/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-950 border border-bronze/40 text-champagne text-xs uppercase font-bold tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-bronze" />
            <span>Table Reservations</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black text-cream-50 leading-tight max-w-3xl mx-auto mb-6">
            Reserve Your Table
          </h2>

          <p className="text-cream-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10">
            Joining us for dinner, drinks, or our weekly salsa and karaoke nights on the rooftop?
            Submit your table reservation in advance or connect with our WhatsApp concierge.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <Link
              href="/reservations"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-bronze hover:bg-bronze-light text-dark-950 font-black uppercase tracking-widest text-xs sm:text-sm shadow-bronze-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK A TABLE ONLINE</span>
            </Link>

            <a
              href={getWhatsAppUrl(whatsapp, 'Hello Barracuda Resto Pub, I would like to reserve a table / VIP booth for tonight.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-950/80 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-white font-bold uppercase tracking-widest text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>INSTANT WHATSAPP RSVP</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 text-xs text-cream-400">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-bronze" />
              <span>Direct Phone: </span>
              <a href={getTelUrl(phone)} className="text-cream-200 font-semibold hover:text-champagne">
                +234 912 235 6336
              </a>
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-bronze" />
              <span>20-minute arrival grace period</span>
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-bronze" />
              <span>Confirmation request workflow</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
