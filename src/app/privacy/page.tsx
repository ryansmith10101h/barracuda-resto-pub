import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Barracuda Resto Pub Abuja',
  description:
    'Privacy Policy of Barracuda Resto Pub, Wuse 2, Abuja. How we handle customer contact details, reservations, and WhatsApp communications.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
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
            <ShieldCheck className="w-3.5 h-3.5 text-bronze" />
            <span>Customer Privacy Standards</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-cream-50">
            Privacy Policy
          </h1>

          <p className="text-xs text-cream-400">
            Last Updated: November 2026 • Barracuda Resto Pub, Wuse 2, Abuja, Nigeria
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-espresso-950 border border-white/10 space-y-8 text-cream-300 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-cream-50">1. Information We Collect</h2>
            <p>
              When you submit a table reservation request or general inquiry through the Barracuda Resto Pub website,
              we collect basic contact information including your full name, phone number, email address, reservation date,
              preferred dining time, and any dietary or celebration notes you provide.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-cream-50">2. How We Use Your Information</h2>
            <p>
              We use your submitted details strictly to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-cream-300">
              <li>Process and confirm your table and VIP booth bookings.</li>
              <li>Communicate arrival status, table hold confirmations, and booking updates via phone or WhatsApp.</li>
              <li>Address custom inquiries regarding private events, group catering, or dietary requirements.</li>
              <li>Improve guest hospitality and operational floor management during operating hours.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-cream-50">3. WhatsApp Communications</h2>
            <p>
              Our website provides optional one-click WhatsApp redirection to expedite booking confirmations with our floor concierge.
              Any communication conducted over WhatsApp is subject to WhatsApp’s standard end-to-end encryption and terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-cream-50">4. Data Protection & Non-Disclosure</h2>
            <p>
              We treat guest confidentiality with utmost seriousness. We do not sell, rent, or trade your personal information to third-party marketers.
              Access to customer reservation logs is restricted to authorized floor managers and event coordinators.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-cream-50">5. Contact Our Concierge Desk</h2>
            <p>
              If you have any questions regarding your data or wish to have your contact details updated or removed from our reservation logs,
              please contact us directly at <strong className="text-cream-100">+234 912 235 6336</strong> or visit our venue at Adetokunbo Ademola Crescent, Wuse 2, Abuja.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
