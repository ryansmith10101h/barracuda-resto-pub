import type { Metadata } from 'next';
import MenuClient from '@/components/menu/MenuClient';
import { getMenuItems } from '@/lib/store';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Digital Menu & Prices | Charcoal Grills, Cocktails & Tapas',
  description:
    'Explore the official culinary and cocktail menu of Barracuda Resto Pub in Wuse 2, Abuja. Signature charcoal-grilled jumbo prawns, prime suya, oxtail jollof, and bespoke mixology.',
  openGraph: {
    title: 'Barracuda Resto Pub Digital Menu | Abuja, Nigeria',
    description: 'Charcoal grills, prime suya, signature cocktails, and elevated gastropub dining in Wuse 2.',
    images: ['https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80'],
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-900 border border-gold/40 text-gold text-xs uppercase font-bold tracking-widest shadow-gold-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Culinary & Bar Menu</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-cream-50 leading-tight">
            The Digital Menu
          </h1>

          <p className="text-cream-300 text-sm sm:text-base leading-relaxed">
            Every dish is made fresh to order on charcoal flame. Transparent pricing in Nigerian Naira (₦),
            curated for an unforgettable evening in Wuse 2, Abuja.
          </p>
        </div>

        {/* Client Interactive Menu */}
        <MenuClient initialItems={menuItems} />
      </div>
    </div>
  );
}
