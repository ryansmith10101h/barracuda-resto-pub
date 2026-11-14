import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Shield, Sparkles, Music2, GlassWater } from 'lucide-react';

export default function AtmosphereSection() {
  const spaces = [
    {
      title: 'The VIP Velvet Booths',
      subtitle: 'Intimate, elevated, and discreet bottle hospitality',
      description:
        'Designed for high-profile celebrations, birthdays, and executive unwinding with dedicated personal service and premium bottle displays.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      icon: Shield,
    },
    {
      title: 'The Backlit Mixology Bar',
      subtitle: 'Where artisanal botanicals meet vibrant conversations',
      description:
        'A glowing centerpiece staffed by senior mixologists crafting bespoke cocktails, pouring single malts, and sparking connection.',
      image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1000&q=80',
      icon: GlassWater,
    },
    {
      title: 'The Breeze Terrace',
      subtitle: 'Al-fresco dining catching the nighttime Abuja breeze',
      description:
        'Open-air lounge overlooking the vibrant Wuse 2 avenue. Ideal for Sunday grills, suya sharing platters, and relaxed evening chatter.',
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1000&q=80',
      icon: Sparkles,
    },
    {
      title: 'The Soundstage & Dancefloor',
      subtitle: 'High-definition acoustic tuning for weekend nightlife',
      description:
        'Precision acoustic treatment hosting guest Afrobeats, Amapiano, and house DJs every Friday and Saturday from 9:00 PM till 4:00 AM.',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
      icon: Music2,
    },
  ];

  return (
    <section className="py-24 bg-dark-900 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.25em] text-gold uppercase block">
            EXPERIENCE THE VENUE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-cream-50 leading-tight">
            Sophisticated Spaces Curated for Every Abuja Night.
          </h2>
          <p className="text-cream-400 text-sm sm:text-base leading-relaxed">
            From relaxed after-work conversations over craft beer to unforgettable VIP bottle celebrations,
            Barracuda Resto Pub adapts effortlessly to your mood.
          </p>
        </div>

        {/* 4 Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {spaces.map((space, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl overflow-hidden bg-dark-850 border border-white/10 hover:border-gold/40 transition-all duration-300 shadow-elevated flex flex-col justify-end min-h-[380px] p-8"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={space.image}
                  alt={space.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.4] group-hover:brightness-[0.48]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />
              </div>

              {/* Space Details */}
              <div className="relative z-10 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold mb-2">
                  <space.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-cream-50 group-hover:text-gold transition-colors">
                  {space.title}
                </h3>
                <p className="text-xs font-semibold text-gold tracking-wider uppercase">
                  {space.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-cream-300 leading-relaxed max-w-lg">
                  {space.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-dark-850 via-dark-800 to-dark-850 border border-gold/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-xl font-bold text-cream-50">
              Planning a VIP Birthday, Corporate Night, or Group Gathering?
            </h4>
            <p className="text-cream-300 text-xs">
              We offer bespoke booth reservations, custom set menus, and dedicated hospitality attendants.
            </p>
          </div>

          <Link
            href="/reservations"
            className="px-6 py-3.5 rounded-full bg-gold text-dark-950 font-bold uppercase tracking-wider text-xs whitespace-nowrap shadow-gold-sm hover:scale-105 transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book VIP Table</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
