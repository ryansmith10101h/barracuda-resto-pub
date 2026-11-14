import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Eye } from 'lucide-react';
import { GalleryItem } from '@/lib/types';

interface GalleryPreviewProps {
  items: GalleryItem[];
}

export default function GalleryPreviewSection({ items }: GalleryPreviewProps) {
  const displayItems = items.slice(0, 6);

  return (
    <section className="py-24 bg-dark-900 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] text-gold uppercase block">
              VISUAL CHRONICLES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-cream-50">
              The Barracuda Atmosphere.
            </h2>
            <p className="text-cream-400 text-sm max-w-xl">
              An intimate look inside our dining rooms, backlit cocktail counter, outdoor terrace,
              and electric weekend nightlife in Wuse 2, Abuja.
            </p>
          </div>

          <Link
            href="/gallery"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gold hover:text-gold-light transition-colors group"
          >
            <span>VIEW COMPLETE GALLERY</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Asymmetrical Editorial Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item, index) => {
            const isTall = index === 0 || index === 3;
            return (
              <div
                key={item.id}
                className={`group relative rounded-2xl overflow-hidden bg-dark-850 border border-white/10 hover:border-gold/40 transition-all duration-300 shadow-elevated ${
                  isTall ? 'h-96' : 'h-80'
                }`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-cream-50 group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-cream-300 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-dark-950/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-cream-300 group-hover:text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
