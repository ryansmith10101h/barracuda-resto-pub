import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import FoodDrinksShowcase from '@/components/home/FoodDrinksShowcase';
import AtmosphereSection from '@/components/home/AtmosphereSection';
import EventsPreviewSection from '@/components/home/EventsPreviewSection';
import GalleryPreviewSection from '@/components/home/GalleryPreviewSection';
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

      {/* 2. About Barracuda */}
      <AboutSection />

      {/* 3. Food & Drinks Showcase */}
      <FoodDrinksShowcase items={menuItems} />

      {/* 4. Atmosphere & Nightlife */}
      <AtmosphereSection />

      {/* 5. Events Preview */}
      <EventsPreviewSection events={events} />

      {/* 6. Gallery Preview */}
      <GalleryPreviewSection items={galleryItems} />

      {/* 7. Reservations CTA */}
      <ReservationCTASection />

      {/* 8. Location & Hours */}
      <LocationSection />
    </div>
  );
}
