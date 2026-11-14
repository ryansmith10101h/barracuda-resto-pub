'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { MenuItem } from '@/lib/types';
import { formatNaira } from '@/lib/utils';

interface FoodDrinksShowcaseProps {
  items: MenuItem[];
}

export default function FoodDrinksShowcase({ items }: FoodDrinksShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'grills' | 'cocktails' | 'mains'>('all');

  const filteredItems = items.filter((item) => {
    if (activeTab === 'grills') return item.category === 'Grills & Suya';
    if (activeTab === 'cocktails') return item.category === 'Signature Cocktails';
    if (activeTab === 'mains') return item.category === 'Main Meals' || item.category === 'Small Plates';
    return item.isSpecial || ['menu-1', 'menu-2', 'menu-14', 'menu-15', 'menu-10', 'menu-3'].includes(item.id);
  }).slice(0, 6);

  return (
    <section className="py-24 bg-dark-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] text-gold uppercase block">
              CULINARY & MIXOLOGY SELECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-cream-50">
              Signature Dishes & Handcrafted Drinks.
            </h2>
            <p className="text-cream-400 text-sm max-w-xl">
              Authentic African charcoal grilling infused with international gastropub artistry.
              Each dish is prepared fresh to order in Wuse 2.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-gold text-dark-950 shadow-gold-sm'
                  : 'bg-dark-850 text-cream-300 hover:text-gold border border-white/5'
              }`}
            >
              Signatures
            </button>
            <button
              onClick={() => setActiveTab('grills')}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === 'grills'
                  ? 'bg-gold text-dark-950 shadow-gold-sm'
                  : 'bg-dark-850 text-cream-300 hover:text-gold border border-white/5'
              }`}
            >
              Charcoal Grills
            </button>
            <button
              onClick={() => setActiveTab('cocktails')}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === 'cocktails'
                  ? 'bg-gold text-dark-950 shadow-gold-sm'
                  : 'bg-dark-850 text-cream-300 hover:text-gold border border-white/5'
              }`}
            >
              Cocktails
            </button>
            <button
              onClick={() => setActiveTab('mains')}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === 'mains'
                  ? 'bg-gold text-dark-950 shadow-gold-sm'
                  : 'bg-dark-850 text-cream-300 hover:text-gold border border-white/5'
              }`}
            >
              Mains & Tapas
            </button>
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-dark-900 rounded-2xl overflow-hidden border border-white/10 hover:border-gold/40 transition-all duration-300 flex flex-col hover:shadow-gold-sm"
            >
              {/* Image Container */}
              <div className="relative h-60 w-full overflow-hidden bg-dark-850">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-dark-800 text-cream-400">
                    <Flame className="w-8 h-8 text-gold" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />

                {/* Badge tags */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {item.isSpecial && (
                    <span className="px-2.5 py-1 rounded-full bg-gold text-dark-950 font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      <span>Special</span>
                    </span>
                  )}
                  {item.isSpicy && (
                    <span className="px-2.5 py-1 rounded-full bg-red-600/90 text-white font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      <span>Spicy</span>
                    </span>
                  )}
                </div>

                {/* Category tag */}
                <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md bg-dark-950/80 backdrop-blur-sm border border-white/10 text-[10px] uppercase font-semibold text-cream-300">
                  {item.category}
                </span>
              </div>

              {/* Item Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif font-bold text-lg text-cream-50 group-hover:text-gold transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-cream-400 text-xs leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-serif text-xl font-black text-gold">
                    {formatNaira(item.price)}
                  </span>

                  <Link
                    href={`/reservations?dish=${encodeURIComponent(item.name)}`}
                    className="text-xs uppercase font-bold tracking-wider text-cream-300 hover:text-gold transition-colors"
                  >
                    Reserve Table
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-dark-900 border border-gold/40 hover:border-gold text-gold hover:bg-dark-850 font-bold uppercase tracking-widest text-xs transition-all shadow-gold-sm"
          >
            <span>VIEW COMPLETE DIGITAL MENU (WITH PRICES)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
