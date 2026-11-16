import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Flame, GlassWater, Shield, Music2, Sparkles, ArrowRight, Calendar, MessageCircle, Phone } from 'lucide-react';
import { getWhatsAppUrl, getTelUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Dining & Nightlife Experiences | VIP Lounges, Grills & Bar',
  description:
    'Discover the five distinct dining and nightlife spaces at Barracuda Resto Pub in Wuse 2, Abuja. Charcoal grill kitchen, illuminated cocktail bar, outdoor breeze terrace, and VIP velvet booths.',
  openGraph: {
    title: 'Barracuda Resto Pub Dining & Nightlife Spaces | Abuja',
    description: 'Explore our VIP velvet booths, cocktail mixology bar, outdoor terrace, and charcoal flame grill sanctuary.',
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'],
  },
  alternates: {
    canonical: '/experiences',
  },
};

export default function ExperiencesPage() {
  const whatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '2349122356336';
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+2349122356336';

  const experiences = [
    {
      title: 'Charcoal Grills & Kitchen',
      subtitle: 'Hardwood coals & authentic Nigerian grill mastery',
      description:
        'At the heart of Barracuda is our live charcoal grill station. Our pitmasters grill seasoned tiger prawns, tender goat asun, and whole wood-smoked croaker fish over glowing hardwood embers, locking in authentic woodsmoke flavor and aromatic spices.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      icon: Flame,
      features: ['Live hardwood charcoal flame', 'Whole smoked croaker & tiger prawns', 'Traditional northern yaji & pepper sauces'],
    },
    {
      title: 'The Backlit Mixology Bar',
      subtitle: 'Artisanal cocktails & premium international spirits',
      description:
        'A glowing centerpiece designed for conversation and craft mixology. Our senior bar team fuses organic Nigerian botanicals—such as slow-reduced zobo hibiscus, local ginger, and garden lemongrass—with premium single malts, aged rums, and champagne.',
      image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=80',
      icon: GlassWater,
      features: ['Handcrafted signature infusions', 'Extensive single malt & cognac selection', 'Interactive bar seating with sommelier service'],
    },
    {
      title: 'The Outdoor Breeze Terrace',
      subtitle: 'Al-fresco dining capturing the nighttime Abuja breeze',
      description:
        'Perched along the vibrant corridor of Adetokunbo Ademola Crescent, the terrace offers comfortable lounge seating with open air. Perfect for casual evening tapas, chilled draught beer, and our signature Sunday acoustic sessions.',
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80',
      icon: Sparkles,
      features: ['Panoramic view of Wuse 2 nightlife', 'Open-air ventilation and mood lanterns', 'Ideal for group platters & Sunday relaxation'],
    },
    {
      title: 'VIP Velvet Booths',
      subtitle: 'Intimate, elevated, and discreet bottle hospitality',
      description:
        'Tailored for birthday celebrations, high-profile Abuja gatherings, and executive entertaining. Each velvet-lined booth provides secluded group seating, personal bottle sparkler service, and dedicated attendant hospitality.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      icon: Shield,
      features: ['Discreet bottle hospitality & champagne service', 'Plush velvet banquette seating', 'Custom celebratory presentations upon request'],
    },
    {
      title: 'Soundstage & Dancefloor',
      subtitle: 'Tuned acoustics for late-night weekend revelry',
      description:
        'From 9:00 PM on Friday and Saturday, Barracuda transforms. Resident and guest DJs take over our acoustically engineered soundstage, delivering the latest Afrobeats, Amapiano, and global rhythms until 4:00 AM.',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
      icon: Music2,
      features: ['High-definition acoustic treatment', 'Top resident Afrobeats & Amapiano DJs', 'Late-night kitchen service until 2:30 AM'],
    },
  ];

  return (
    <div className="py-16 sm:py-24 bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-espresso-900 border border-bronze/40 text-champagne text-xs uppercase font-bold tracking-widest shadow-bronze-sm">
            <Sparkles className="w-3.5 h-3.5 text-bronze" />
            <span>VENUE EXPERIENCES</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-cream-50 leading-tight">
            Curated Dining & Nightlife Spaces
          </h1>

          <p className="text-cream-300 text-sm sm:text-base leading-relaxed">
            From the sizzling warmth of our charcoal flame kitchen to the vibrant pulse of our weekend dancefloor,
            Barracuda Resto Pub offers distinct atmospheres designed for every Abuja evening.
          </p>
        </div>

        {/* Experiences Stack */}
        <div className="space-y-16">
          {experiences.map((exp, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={exp.title}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-12 rounded-3xl bg-espresso-950 border border-white/10 shadow-elevated`}
              >
                {/* Visual */}
                <div
                  className={`lg:col-span-6 relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-espresso-900 ${
                    isReversed ? 'lg:order-2' : ''
                  }`}
                >
                  <Image
                    src={exp.image}
                    alt={`${exp.title} at Barracuda Resto Pub`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center filter brightness-90 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-dark-950/80 backdrop-blur-md border border-bronze/40 text-champagne">
                    <exp.icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-6 space-y-5 ${isReversed ? 'lg:order-1' : ''}`}>
                  <span className="text-[11px] font-bold tracking-widest text-bronze uppercase block">
                    {exp.subtitle}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-4xl font-bold text-cream-50">
                    {exp.title}
                  </h2>
                  <p className="text-cream-300 text-sm leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-2 pt-1 text-xs text-cream-200">
                    {exp.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/reservations?area=${encodeURIComponent(exp.title)}`}
                      className="px-6 py-3 rounded-full bg-bronze hover:bg-bronze-light text-dark-950 font-black uppercase tracking-wider text-xs shadow-bronze-sm flex items-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Reserve This Space</span>
                    </Link>

                    <a
                      href={getWhatsAppUrl(whatsapp, `Hello Barracuda, I would like to enquire about reserving ${exp.title}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-full bg-espresso-900 border border-white/10 hover:border-bronze text-cream-200 text-xs font-semibold flex items-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Enquire via WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Private Buyout & Corporate Section */}
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-espresso-900 via-espresso-850 to-espresso-900 border border-bronze/30 text-center space-y-6 shadow-elevated">
          <span className="text-[11px] font-bold tracking-widest text-bronze uppercase block">
            EXCLUSIVE BUYOUTS & PRIVATE GATHERINGS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-cream-50 max-w-2xl mx-auto">
            Host Your Private Event at Barracuda
          </h2>
          <p className="text-cream-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Looking to host an exclusive brand launch, corporate banquet, birthday celebration, or private dinner?
            We provide full venue or semi-private section buyouts with customized set menus and dedicated security.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-bronze hover:bg-bronze-light text-dark-950 font-black uppercase tracking-wider text-xs shadow-bronze-sm"
            >
              Contact Event Concierge
            </Link>
            <a
              href={getTelUrl(phone)}
              className="px-8 py-4 rounded-full bg-dark-950 border border-white/10 hover:border-bronze text-cream-100 font-bold uppercase tracking-wider text-xs flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-bronze" />
              <span>Call +234 912 235 6336</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
