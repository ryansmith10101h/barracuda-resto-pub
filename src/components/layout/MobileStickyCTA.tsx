'use client';

import Link from 'next/link';
import { Calendar, Phone, MessageCircle } from 'lucide-react';
import { getTelUrl, getWhatsAppUrl } from '@/lib/utils';

export default function MobileStickyCTA() {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+2349122356336';
  const whatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '2349122356336';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-dark-950/95 backdrop-blur-lg border-t border-bronze/20 p-2.5 px-3 xl:hidden shadow-[0_-5px_25px_rgba(0,0,0,0.8)]">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Reserve CTA */}
        <Link
          href="/reservations"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-bronze text-dark-950 font-black shadow-bronze-sm active:scale-95 transition-transform"
        >
          <Calendar className="w-4 h-4 mb-0.5 text-dark-950" />
          <span className="text-[10px] uppercase tracking-wider font-extrabold">RESERVE</span>
        </Link>

        {/* Call CTA */}
        <a
          href={getTelUrl(phone)}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-espresso-900 border border-white/10 text-cream-100 hover:text-champagne active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 mb-0.5 text-bronze" />
          <span className="text-[10px] uppercase tracking-wider font-bold">CALL NOW</span>
        </a>

        {/* WhatsApp CTA */}
        <a
          href={getWhatsAppUrl(whatsapp, 'Hello Barracuda Resto Pub, I would like to reserve a table / enquire about tonight.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 mb-0.5 text-emerald-400" />
          <span className="text-[10px] uppercase tracking-wider font-bold">WHATSAPP</span>
        </a>
      </div>
    </div>
  );
}
