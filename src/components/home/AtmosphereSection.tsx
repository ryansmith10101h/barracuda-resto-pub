import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Shield, Sparkles, Music2, GlassWater, Flame } from 'lucide-react';

export default function AtmosphereSection() {
  const spaces = [
    {
      title: 'Charcoal Grills & Kitchen',
      subtitle: 'Hardwood coals & authentic Nigerian spice mastery',
      description:
        'Watch whole croaker fish, tiger prawns, and tender goat asun sear to perfection over open coals, delivering rich aromas and authentic woodsmoke flavor.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
      icon: Flame,
    },
    {
      title: 'The Backlit Mixology Bar',
      subtitle: 'Where artisanal botanicals meet vibrant conversations',
      description:
        'A glowing architectural centerpiece staffed by senior mixologists crafting bespoke cocktails, pouring single malts, and sparking connection.',
      image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1000&q=80',
      icon: GlassWater,
    },
    {
      title: 'The Breeze Terrace',
      subtitle: 'Al-fresco dining catching the nighttime Abuja breeze',
      description:
        'Open-air lounge overlooking the vibrant Wuse 2 avenue. Ideal for Sunday grills, suya sharing platters, and relaxed evening conversations.',
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1000&q=80',
      icon: Sparkles,
    },
    {
      title: 'The VIP Velvet Booths',
      subtitle: 'Intimate, elevated, and discreet bottle hospitality',
      description:
        'Designed for high-profile celebrations, birthdays, and executive unwinding with dedicated personal service and premium bottle displays.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      icon: Shield,
    },
    {
      title: 'Soundstage & Dancefloor',
      subtitle: 'High-definition acoustic tuning for weekend nightlife',
      description:
        'Precision acoustic treatment hosting guest Afrobeats, Amapiano, and house DJs every Friday and Saturday from 9:00 PM till 4:00 AM.',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
      icon: Music2,
    },
  ];

  return (
    <section id="experiences" className="py-24 bg-espresso-950 border-t border-white/5 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] font-bold tracking-[0.25em] text-bronze uppercase block">
            EXPERIENCE THE VENUE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-cream-50 leading-tight">
            Sophisticated Spaces Curated for Every Abuja Night.
          </h2>
          <p className="text-cream-300 text-sm sm:text-base leading-relaxed">
            From relaxed after-work conversations over craft cocktails to unforgettable VIP bottle celebrations,
            Barracuda Resto Pub adapts effortlessly to your mood.
          </p>
        </div>

        {/* 5 Spaces Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spaces.map((space, idx) => {
            const isLarge = idx === 0 || idx === 3;
            return (
              <div
                key={idx}
                className={`group relative rounded-3xl overflow-hidden bg-espresso-900 border border-white/10 hover:border-bronze/40 transition-all duration-300 shadow-elevated flex flex-col justify-end p-8 ${
                  isLarge ? 'lg:col-span-2 min-h-[420px]' : 'min-h-[380px]'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={space.image}
                    alt={`${space.title} at Barracuda Resto Pub Abuja`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.38] group-hover:brightness-[0.45]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />
                </div>

                {/* Space Details */}
                <div className="relative z-10 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-bronze/20 border border-bronze/40 flex items-center justify-center text-champagne mb-2">
                    <space.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-cream-50 group-hover:text-champagne transition-colors">
                    {space.title}
                  </h3>
                  <p className="text-xs font-semibold text-bronze-light tracking-wider uppercase">
                    {space.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-cream-300 leading-relaxed max-w-lg">
                    {space.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-espresso-900/90 border border-bronze/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-elevated">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-cream-50">
              Planning a VIP Celebration or Corporate Buyout?
            </h4>
            <p className="text-cream-300 text-xs sm:text-sm max-w-xl">
              We offer bespoke booth reservations, custom set menus, dedicated hospitality attendants, and private event bookings.
            </p>
          </div>

          <Link
            href="/reservations"
            className="px-8 py-4 rounded-full bg-bronze hover:bg-bronze-light text-dark-950 font-black uppercase tracking-wider text-xs whitespace-nowrap shadow-bronze-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book VIP Table</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
