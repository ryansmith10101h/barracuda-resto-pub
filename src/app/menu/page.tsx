import type { Metadata } from 'next';
import MenuClient from '@/components/menu/MenuClient';
import { getMenuItems } from '@/lib/store';
import { Sparkles, UtensilsCrossed } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Digital Menu & Prices | Charcoal Grills, Cocktails & Tapas Abuja',
  description:
    'Explore the official culinary and cocktail menu of Barracuda Resto Pub in Wuse 2, Abuja. 23 signature charcoal-grilled dishes, prime suya, oxtail jollof, and craft cocktails with transparent ₦ pricing.',
  openGraph: {
    title: 'Barracuda Resto Pub Digital Menu & Prices | Wuse 2, Abuja',
    description: 'Charcoal grills, prime suya, signature cocktails, and elevated gastropub dining in Wuse 2 with transparent Nigerian Naira pricing.',
    images: ['https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80'],
  },
  alternates: {
    canonical: '/menu',
  },
};

export const revalidate = 60;

export default function MenuPage() {
  const menuItems = getMenuItems();

  const menuSchema = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'Barracuda Resto Pub Digital Menu',
    description: 'Charcoal-grilled Nigerian specialties, prime suya, tapas, and craft mixology in Wuse 2, Abuja.',
    hasMenuSection: [
      'Grills & Suya',
      'Small Plates',
      'Main Meals',
      'Signature Cocktails',
      'Spirits & Champagne',
      'Beer & Refreshments',
    ].map((cat) => ({
      '@type': 'MenuSection',
      name: cat,
      hasMenuItem: menuItems
        .filter((i) => i.category === cat)
        .map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          description: item.description,
          offers: {
            '@type': 'Offer',
            price: item.price,
            priceCurrency: 'NGN',
          },
        })),
    })),
  };

  return (
    <div className="py-16 sm:py-24 bg-dark-950 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-espresso-900 border border-bronze/40 text-champagne text-xs uppercase font-bold tracking-widest shadow-bronze-sm">
            <UtensilsCrossed className="w-3.5 h-3.5 text-bronze" />
            <span>23 CURATED CULINARY & BAR SPECIALTIES</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-cream-50 leading-tight">
            The Digital Menu
          </h1>

          <p className="text-cream-300 text-sm sm:text-base leading-relaxed">
            Every dish is made fresh to order on live hardwood charcoal. Transparent pricing in Nigerian Naira (₦),
            curated for an unforgettable evening in Wuse 2, Abuja.
          </p>
        </div>

        {/* Client Interactive Menu */}
        <MenuClient initialItems={menuItems} />
      </div>
    </div>
  );
}
