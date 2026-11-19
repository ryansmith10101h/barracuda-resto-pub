import type { Metadata } from 'next';
import GalleryClient from '@/components/gallery/GalleryClient';
import { getGalleryItems } from '@/lib/store';
import { Camera } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Atmosphere & Venue Gallery | Wuse 2, Abuja',
  description:
    'Browse photos of Barracuda Resto Pub in Wuse 2, Abuja. Highlighting our rooftop setting, charcoal grills, cocktail presentations, and salsa and karaoke evenings.',
  robots: {
    index: false,
    follow: false,
  },
};

export const revalidate = 60;

export default function GalleryPage() {
  const galleryItems = getGalleryItems();

  return (
    <div className="py-16 sm:py-24 bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-espresso-900 border border-bronze/40 text-champagne text-xs uppercase font-bold tracking-widest shadow-bronze-sm">
            <Camera className="w-3.5 h-3.5 text-bronze" />
            <span>VISUAL CHRONICLES & ATMOSPHERE</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-cream-50 leading-tight">
            The Venue Gallery
          </h1>

          <p className="text-cream-300 text-sm sm:text-base leading-relaxed">
            Step into Barracuda. An inside look into our rooftop pub, fresh grills, craft cocktails,
            and weekly social dance and karaoke evenings.
          </p>
        </div>

        {/* Gallery Interactive Component */}
        <GalleryClient items={galleryItems} />
      </div>
    </div>
  );
}
