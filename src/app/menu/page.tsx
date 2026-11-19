import type { Metadata } from 'next';
import MenuClient from '@/components/menu/MenuClient';
import { getMenuItems } from '@/lib/store';
import { Sparkles, UtensilsCrossed } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Digital Menu | Charcoal Grills, Seafood & Cocktails | Barracuda Resto Pub',
  description:
    'Explore the culinary and cocktail menu of Barracuda Resto Pub in Wuse 2, Abuja. Fresh seafood, charcoal-grilled suya, and craft cocktails.',
  robots: {
    index: false,
    follow: false,
  },
};

export const revalidate = 60;

export default function MenuPage() {
  const menuItems = getMenuItems();

  return (
    <div className="py-16 sm:py-24 bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-espresso-900 border border-bronze/40 text-champagne text-xs uppercase font-bold tracking-widest shadow-bronze-sm">
            <UtensilsCrossed className="w-3.5 h-3.5 text-bronze" />
            <span>ROOFTOP SEAFOOD, GRILLS & COCKTAILS</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-cream-50 leading-tight">
            The Digital Menu
          </h1>

          <p className="text-cream-300 text-sm sm:text-base leading-relaxed">
            Every dish is prepared fresh on live hardwood charcoal. Explore our seafood, grills, cocktails,
            and refreshments on the Wuse 2 rooftop. Price on request.
          </p>
        </div>

        {/* Client Interactive Menu */}
        <MenuClient initialItems={menuItems} />
      </div>
    </div>
  );
}
