import Image from 'next/image';
import Link from 'next/link';
import { Flame, Wine, Users, Sparkles, ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      icon: Flame,
      title: 'Charcoal Flame Mastery',
      description:
        'Slow-roasted Nigerian goat asun, prime suya fillets, and whole smoked croaker fish seasoned with authentic regional spices and charred to perfection.',
    },
    {
      icon: Wine,
      title: 'Bespoke Mixology Lab',
      description:
        'Craft cocktails balancing indigenous botanicals like zobo reductions and local ginger with premium international spirits and 24k gold shimmer.',
    },
    {
      icon: Users,
      title: 'Elevated VIP Hospitality',
      description:
        'Plush velvet booths, discreet bottle service, and private sections designed for corporate dinners, birthdays, and high-profile Abuja gatherings.',
    },
    {
      icon: Sparkles,
      title: 'Unrivaled Urban Rhythm',
      description:
        'A carefully tuned acoustic soundstage where mellow evening vibes seamlessly transition into pulsating late-night Afro-groove sets.',
    },
  ];

  return (
    <section id="story" className="py-24 bg-dark-900 border-t border-b border-white/5 relative overflow-hidden scroll-mt-20">
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-bronze/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Visual Stack */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[480px] sm:h-[560px] rounded-3xl overflow-hidden border border-white/10 shadow-elevated bg-espresso-950">
              <Image
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                alt="Charcoal grilling of fresh meats and suya spices at Barracuda Resto Pub"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center filter brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-80" />
            </div>

            {/* Overlapping Floating Atmosphere Card */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 bg-espresso-950/95 border border-bronze/30 rounded-2xl p-6 shadow-bronze-sm backdrop-blur-md max-w-xs">
              <p className="text-champagne font-serif text-2xl font-bold">Wuse 2, Abuja</p>
              <p className="text-[10px] uppercase tracking-widest text-bronze-light font-semibold mt-1">
                Adetokunbo Ademola Crescent
              </p>
              <p className="text-cream-300 text-xs mt-2 leading-relaxed">
                Abuja’s prime nightlife corridor, elevated with culinary finesse and genuine Nigerian hospitality.
              </p>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-[11px] font-bold tracking-[0.25em] text-bronze uppercase block mb-3">
                OUR CULINARY & NIGHTLIFE STORY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-cream-50 leading-tight">
                Where Charcoal Grill Mastery Meets Abuja’s Nightlife Soul.
              </h2>
            </div>

            <div className="space-y-4 text-cream-300 text-sm sm:text-base leading-relaxed">
              <p>
                Barracuda Resto Pub was conceived for those who demand more from their evening in Abuja.
                Too often, one has to choose between a sterile fine-dining restaurant and a noisy,
                chaotic club. We unified both into an atmospheric sanctuary.
              </p>
              <p>
                From the crackle of hardwood charcoal in our kitchen to the crisp pour of craft
                libations at our backlit bar, every detail is engineered to honor Nigerian palate
                richness while embracing cosmopolitan nightlife standards.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-espresso-900/60 border border-white/5 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-bronze/10 text-bronze flex items-center justify-center">
                    <pillar.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif font-bold text-cream-100 text-sm">{pillar.title}</h3>
                  <p className="text-cream-400 text-xs leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-champagne hover:text-white transition-colors group"
              >
                <span>EXPLORE OUR COMPLETE DIGITAL MENU</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
