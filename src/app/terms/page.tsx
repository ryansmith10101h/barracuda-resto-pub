import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Barracuda Resto Pub Abuja',
  description:
    'Terms of service, table reservation hold policies, arrival grace periods, and event admission guidelines for Barracuda Resto Pub, Wuse 2, Abuja.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-24 bg-dark-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-bronze hover:text-champagne transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-espresso-900 border border-bronze/40 text-champagne text-xs uppercase font-bold tracking-widest">
            <FileText className="w-3.5 h-3.5 text-bronze" />
            <span>Venue Guidelines & Conditions</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-cream-50">
            Terms of Service
          </h1>

          <p className="text-xs text-cream-400">
            Last Updated: November 2026 • Barracuda Resto Pub, Wuse 2, Abuja, Nigeria
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-espresso-950 border border-white/10 space-y-8 text-cream-300 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-cream-50">1. Table Reservation & Hold Policy</h2>
            <p>
              Submitting a reservation request via our online form registers your booking inquiry with our concierge.
              A reservation is confirmed once reviewed by our floor team. We hold reserved tables for a grace period of
              <strong> 20 minutes</strong> past the scheduled booking time. If your party anticipates a delay, please contact
              our reception desk via phone or WhatsApp to extend your hold.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-cream-50">2. VIP Booths & Minimum Spend</h2>
            <p>
              VIP velvet booth allocations during peak weekend shifts (Friday and Saturday nights after 10:00 PM) may carry bottle
              minimums depending on party size. These details are communicated transparently by our floor management during confirmation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-cream-50">3. Dress Code & Admission</h2>
            <p>
              Barracuda Resto Pub maintains a smart casual and nightlife chic dress standard. Management reserves the right to refuse
              admission to individuals not complying with standard hospitality etiquette or causing disturbance to fellow patrons.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-cream-50">4. Age Restrictions & Nightlife Hours</h2>
            <p>
              While our restaurant welcomes dining guests during early evening dinner service, patrons accessing the bar, soundstage,
              and nightlife lounge areas after 9:00 PM must be at least 18 years of age. Valid identification may be requested.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-cream-50">5. Menu Pricing & Availability</h2>
            <p>
              All prices listed on our digital menu are stated in Nigerian Naira (₦). While we make every effort to ensure real-time accuracy,
              items are subject to seasonal market availability of fresh ingredients and seafood.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
