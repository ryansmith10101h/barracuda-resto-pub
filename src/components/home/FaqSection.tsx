'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Where is Barracuda Resto Pub located in Abuja?',
      a: 'Barracuda Resto Pub is situated on the rooftop of Yelwa Plaza along 111 Adetokunbo Ademola Crescent in Wuse 2, Abuja, Nigeria. The venue is easily accessible from Maitama, Central Business District, and Garki, with secure parking and elevator/stairs access.',
    },
    {
      q: 'What are the official operating hours?',
      a: 'Barracuda is open Monday through Saturday from 10:00 AM to 12:00 AM, and Sunday from 12:00 PM to 12:00 AM. We serve lunch, dinner, drinks, and late-evening bites throughout our operating hours.',
    },
    {
      q: 'Do I need a reservation or are walk-ins welcome?',
      a: 'Walk-in patrons are warmly welcomed subject to seating availability. However, table reservations are recommended for weekend evenings and weekly event nights (such as Salsa and Karaoke) to guarantee immediate seating.',
    },
    {
      q: 'What culinary style and specialties are offered?',
      a: 'Our menu combines authentic Nigerian charcoal grill mastery with fresh seafood and pub favorites. Specialties include Charcoal-Grilled Tiger Prawns, Goat Asun, Whole Smoked Croaker Fish with yam chips, Seafood Fried Rice, and refreshing cocktails and cold drinks.',
    },
    {
      q: 'What is the dress code at Barracuda?',
      a: 'We observe a casual and smart-casual dress standard. Come comfortable and ready to enjoy delicious food, great drinks, and a relaxed rooftop vibe.',
    },
    {
      q: 'Can I host a private celebration, birthday, or corporate dinner?',
      a: 'Yes. We cater to private group dinners, birthday gatherings, celebrations, and corporate meetups. Contact our concierge via WhatsApp or telephone at +234 912 235 6336 to discuss arrangements.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <section className="py-24 bg-dark-950 border-t border-white/5 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-espresso-900 border border-bronze/40 text-champagne text-xs uppercase font-bold tracking-widest shadow-bronze-sm">
            <HelpCircle className="w-3.5 h-3.5 text-bronze" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black text-cream-50">
            Everything You Need to Know
          </h2>

          <p className="text-cream-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Essential information regarding our dining, table reservations, opening hours, and rooftop experience in Wuse 2, Abuja.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-espresso-950 border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-cream-100">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-espresso-900 border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-champagne' : 'text-cream-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-cream-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
