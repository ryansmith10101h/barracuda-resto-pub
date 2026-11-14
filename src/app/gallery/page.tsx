import type { Metadata } from 'next';
import GalleryClient from '@/components/gallery/GalleryClient';
import { getGalleryItems } from '@/lib/store';
import { Camera } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Atmosphere & Gallery | Cocktails, Grills & Nightlife Vibes',
  description:
    'Browse photo chronicles of Barracuda Resto Pub in Wuse 2, Abuja. Highlighting our interior design, charcoal grills, cocktail presentations, and weekend crowd atmosphere.',
  openGraph: {
    title: 'Barracuda Resto Pub Gallery | Wuse 2, Abuja',
    description: 'Visual atmosphere of Abuja’s premier resto-pub: grills, cocktails, VIP lounges, and nightlife.',
    images: ['https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=80'],
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-900 border border-gold/40 text-gold text-xs uppercase font-bold tracking-widest shadow-gold-sm">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Atmosphere & Chronicles</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-cream-50 leading-tight">
            The Venue Gallery
          </h1>

          <p className="text-cream-300 text-sm sm:text-base leading-relaxed">
            Step into the Barracuda world. An immersive look into our culinary artistry, cocktail craftsmanship,
            and vibrant Abuja weekend energy.
          </p>
        </div>

        {/* Gallery Interactive Component */}
        <GalleryClient items={galleryItems} />
      </div>
    </div>
  );
}
