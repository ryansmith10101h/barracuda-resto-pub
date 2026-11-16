import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import { MapPin, Phone, MessageCircle, Instagram, Clock, Navigation } from 'lucide-react';
import { getTelUrl, getWhatsAppUrl, OFFICIAL_OPERATING_HOURS } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Location, Contact & Directions | Adetokunbo Ademola Crescent, Wuse 2 Abuja',
  description:
    'Find Barracuda Resto Pub on Adetokunbo Ademola Crescent in Wuse 2, Abuja. Directions on Google Maps, phone contact, WhatsApp concierge, and verified operating hours.',
  openGraph: {
    title: 'Find Barracuda Resto Pub in Wuse 2, Abuja',
    description: 'Adetokunbo Ademola Crescent, Wuse 2. Direct directions, telephone numbers, and operating hours.',
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'],
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+2349122356336';
  const whatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '2349122356336';
  const address = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || 'Adetokunbo Ademola Crescent, Wuse 2, Abuja, Nigeria';
  const instagram = process.env.NEXT_PUBLIC_BUSINESS_INSTAGRAM || 'barracuda_restpub';

  return (
    <div className="py-16 sm:py-24 bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-espresso-900 border border-bronze/40 text-champagne text-xs uppercase font-bold tracking-widest shadow-bronze-sm">
            <MapPin className="w-3.5 h-3.5 text-bronze" />
            <span>ABUJA LOCATION & CONCIERGE</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-cream-50 leading-tight">
            Location & Contact
          </h1>

          <p className="text-cream-300 text-sm sm:text-base leading-relaxed">
            Conveniently positioned on the lively Adetokunbo Ademola strip in Wuse 2.
            Reach our concierge team via WhatsApp, phone, or direct enquiry form.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & Opening Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-espresso-950 border border-white/10 space-y-6 shadow-elevated">
              <h2 className="font-serif text-2xl font-bold text-cream-50">
                Direct Channels
              </h2>

              <div className="space-y-4 text-xs text-cream-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream-100 block">Address:</strong>
                    <span>{address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream-100 block">Telephone:</strong>
                    <a href={getTelUrl(phone)} className="hover:text-champagne transition-colors font-medium">
                      +234 912 235 6336
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream-100 block">WhatsApp Concierge:</strong>
                    <a
                      href={getWhatsAppUrl(whatsapp, 'Hello Barracuda, I have an inquiry.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline font-medium"
                    >
                      Chat with Floor Desk
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Instagram className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream-100 block">Instagram:</strong>
                    <a
                      href={`https://instagram.com/${instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-champagne transition-colors font-medium"
                    >
                      @{instagram}
                    </a>
                  </div>
                </div>
              </div>

              {/* Operating Hours Box from Single Trusted Source */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-bronze font-bold text-xs uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Operating Schedule (WAT)</span>
                </div>
                <div className="text-xs text-cream-300 space-y-1.5">
                  {OFFICIAL_OPERATING_HOURS.map((h, i) => (
                    <div key={i} className="flex justify-between border-b border-white/5 pb-1 last:border-b-0">
                      <span className="font-semibold text-cream-100">{h.day}:</span>
                      <span className="text-cream-300">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Maps Button */}
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Adetokunbo+Ademola+Crescent+Wuse+Abuja+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-bronze hover:bg-bronze-light text-dark-950 font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-bronze-sm hover:scale-[1.02] transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Navigate in Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
