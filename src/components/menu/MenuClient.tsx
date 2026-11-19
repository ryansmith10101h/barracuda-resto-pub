'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Flame, Sparkles, MessageCircle, Calendar } from 'lucide-react';
import { MenuItem } from '@/lib/types';
import { formatNaira, getWhatsAppUrl } from '@/lib/utils';

interface MenuClientProps {
  initialItems: MenuItem[];
}

export default function MenuClient({ initialItems }: MenuClientProps) {
  const [items] = useState<MenuItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Grills & Suya',
    'Small Plates',
    'Main Meals',
    'Signature Cocktails',
    'Spirits & Champagne',
    'Beer & Refreshments',
  ];

  const whatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '2349122356336';

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Search and Filters Bar */}
      <div className="bg-espresso-950/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 shadow-elevated space-y-6">
        {/* Search Input */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cream-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish, cocktail, or ingredient (e.g. croaker, prawns, asun, oxtail, mezcal)..."
            className="w-full pl-12 pr-12 py-3.5 rounded-full bg-espresso-900 border border-white/10 text-cream-100 placeholder:text-cream-400 text-sm focus:outline-none focus:border-bronze transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-cream-400 hover:text-champagne"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-bronze text-dark-950 shadow-bronze-sm scale-105'
                  : 'bg-espresso-900 text-cream-300 hover:text-champagne border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Results Count & Disclaimer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-cream-400 px-2 gap-2">
        <span>
          Showing <strong className="text-champagne">{filteredItems.length}</strong> culinary & bar items{' '}
          {selectedCategory !== 'All' && `in ${selectedCategory}`}
        </span>
        <span className="text-[11px] text-cream-400">
          All prices in Nigerian Naira (₦) • Charcoal-grilled fresh to order
        </span>
      </div>

      {/* Menu Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-espresso-900/80 rounded-3xl overflow-hidden border border-white/10 hover:border-bronze/40 transition-all duration-300 flex flex-col justify-between hover:shadow-elevated"
            >
              <div>
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-espresso-950">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={`${item.name} - ${item.category} at Barracuda Resto Pub`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-espresso-950 text-cream-400">
                      <Flame className="w-8 h-8 text-bronze" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-transparent to-transparent opacity-85" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.isSpecial && (
                      <span className="px-2.5 py-1 rounded-full bg-bronze text-dark-950 font-black text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        <span>Signature</span>
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-accent/90 text-white font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        <span>Spicy</span>
                      </span>
                    )}
                  </div>

                  <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md bg-dark-950/90 backdrop-blur-sm border border-white/10 text-[10px] uppercase font-semibold text-cream-300">
                    {item.subCategory || item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="font-serif font-bold text-lg text-cream-50 group-hover:text-champagne transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-cream-400 text-xs leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded text-[10px] bg-dark-900 text-cream-300 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Price and Actions Bottom */}
              <div className="p-6 pt-0 space-y-3">
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-serif text-base font-semibold text-champagne">
                    Price on request
                  </span>

                  <span
                    className={`text-[11px] font-semibold uppercase ${
                      item.isAvailable ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {item.isAvailable ? 'Available' : 'Sold Out'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href={`/reservations?item=${encodeURIComponent(item.name)}`}
                    className="py-2.5 px-3 rounded-xl bg-espresso-950 hover:bg-espresso-900 border border-white/10 text-cream-200 hover:text-champagne text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-bronze" />
                    <span>Reserve</span>
                  </Link>

                  <a
                    href={getWhatsAppUrl(
                      whatsapp,
                      `Hello Barracuda Resto Pub, I would like to enquire about ordering "${item.name}" (Price on request).`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-espresso-900/60 rounded-3xl border border-white/5 space-y-4">
          <Flame className="w-12 h-12 text-bronze mx-auto opacity-50" />
          <h3 className="font-serif text-xl font-bold text-cream-100">No items match your filter</h3>
          <p className="text-cream-400 text-xs max-w-sm mx-auto">
            Try adjusting your search query or select another menu category above.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 rounded-full bg-bronze text-dark-950 text-xs font-bold uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
