import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import FoodDrinksShowcase from '@/components/home/FoodDrinksShowcase';
import AtmosphereSection from '@/components/home/AtmosphereSection';
import EventsPreviewSection from '@/components/home/EventsPreviewSection';
import GalleryPreviewSection from '@/components/home/GalleryPreviewSection';
import FaqSection from '@/components/home/FaqSection';
import ReservationCTASection from '@/components/home/ReservationCTASection';
import LocationSection from '@/components/home/LocationSection';
import { getBusinessInfo, getMenuItems, getEvents, getGalleryItems } from '@/lib/store';

export const revalidate = 60; // ISR revalidation

export default function HomePage() {
  const businessInfo = getBusinessInfo();
  const menuItems = getMenuItems();
  const events = getEvents();
  const galleryItems = getGalleryItems();

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero */}
      <HeroSection
        headline={businessInfo.headline}
        subheadline={businessInfo.subheadline}
      />

      {/* 2. About Barracuda & 4 Pillars (id="story") */}
      <AboutSection />

      {/* 3. Food & Drinks Showcase */}
      <FoodDrinksShowcase items={menuItems} />

      {/* 4. Dining Experiences & Spaces (id="experiences") */}
      <AtmosphereSection />

      {/* 5. Events & Nightlife Preview */}
      <EventsPreviewSection events={events} />

      {/* 6. Gallery Preview */}
      <GalleryPreviewSection items={galleryItems} />

      {/* 7. Frequently Asked Questions (with FAQPage schema) */}
      <FaqSection />

      {/* 8. Reservations CTA */}
      <ReservationCTASection />

      {/* 9. Location & Hours */}
      <LocationSection />
    </div>
  );
}
