'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eye, X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '@/lib/types';

interface GalleryClientProps {
  items: GalleryItem[];
}

export default function GalleryClient({ items }: GalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'Food and Grills',
    'Cocktails',
    'Interior',
    'VIP Booths',
    'Outdoor Terrace',
    'Events and Nightlife',
  ];

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const openLightbox = (index: number) => {
    setActiveIndex(index);
  };

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const nextImage = () => {
    if (activeIndex !== null) {
      setActiveIndex((activeIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (activeIndex !== null) {
      setActiveIndex((activeIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const activeImage = activeIndex !== null ? filteredItems[activeIndex] : null;

  return (
    <div className="space-y-12">
      {/* Category Filter Pills */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setActiveIndex(null);
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${selectedCategory === cat
                ? 'bg-bronze text-dark-950 shadow-bronze-sm'
                : 'bg-espresso-900 text-cream-300 hover:text-champagne border border-white/5'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item, idx) => {
          const isSpan = idx % 5 === 0;
          return (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className={`group relative rounded-3xl overflow-hidden bg-espresso-950 border border-white/10 hover:border-bronze/40 transition-all duration-300 cursor-pointer shadow-elevated ${isSpan ? 'sm:col-span-2 lg:col-span-2 h-96' : 'h-80 sm:h-96'
                }`}
            >
              <Image
                src={item.imageUrl}
                alt={`${item.title} - ${item.category} at Barracuda Resto Pub Abuja`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

              {/* Tag and Title */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase font-bold tracking-widest text-bronze-light mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif font-bold text-xl text-cream-50 group-hover:text-champagne transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-cream-300 text-xs mt-1 leading-relaxed max-w-md line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>

              {/* View Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-950/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-cream-200 group-hover:text-champagne group-hover:border-bronze/40 transition-all opacity-0 group-hover:opacity-100">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal with Next/Prev Controls */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-dark-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full bg-espresso-950 border border-bronze/40 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-dark-950/80 text-cream-100 hover:text-champagne border border-white/20 flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Prev Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-dark-950/80 text-cream-100 hover:text-champagne border border-white/20 flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-dark-950/80 text-cream-100 hover:text-champagne border border-white/20 flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="relative h-[55vh] sm:h-[65vh] w-full bg-dark-950">
              <Image
                src={activeImage.imageUrl}
                alt={`${activeImage.title} at Barracuda Resto Pub`}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain object-center"
              />
            </div>

            <div className="p-6 bg-espresso-900 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-bronze-light flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{activeImage.category}</span>
                </span>
                <h4 className="font-serif text-xl font-bold text-cream-50">
                  {activeImage.title}
                </h4>
                {activeImage.description && (
                  <p className="text-cream-300 text-xs mt-1 max-w-xl leading-relaxed">
                    {activeImage.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-cream-400">
                  {activeIndex !== null ? activeIndex + 1 : 1} of {filteredItems.length}
                </span>
                <button
                  onClick={closeLightbox}
                  className="px-4 py-2 rounded-full bg-dark-900 hover:bg-dark-850 text-cream-200 border border-white/10 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
