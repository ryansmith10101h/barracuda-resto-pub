import { Suspense } from 'react';
import type { Metadata } from 'next';
import ReservationForm from '@/components/reservations/ReservationForm';
import { Calendar, Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Table Reservations & VIP Booth Booking | Wuse 2, Abuja',
  description:
    'Book your table or VIP booth at Barracuda Resto Pub on Adetokunbo Ademola Crescent, Wuse 2, Abuja. Instant booking request submission and WhatsApp concierge.',
  openGraph: {
    title: 'Reserve a Table at Barracuda Resto Pub Abuja',
    description: 'Table reservations for dining, birthdays, and VIP bottle service in Wuse 2, Abuja.',
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'],
  },
  alternates: {
    canonical: '/reservations',
  },
};

export default function ReservationsPage() {
  return (
    <div className="py-16 sm:py-24 bg-dark-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-espresso-900 border border-bronze/40 text-champagne text-xs uppercase font-bold tracking-widest shadow-bronze-sm">
            <Calendar className="w-3.5 h-3.5 text-bronze" />
            <span>TABLE & BOOTH SEATING</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-cream-50 leading-tight">
            Table Reservations
          </h1>

          <p className="text-cream-300 text-sm sm:text-base leading-relaxed">
            Reserve your spot in advance. Whether you prefer an intimate velvet booth, open-air terrace dining,
            or high-energy bar seating, we guarantee an exceptional dining and nightlife experience.
          </p>
        </div>

        {/* Client Reservation Form wrapped in Suspense for useSearchParams */}
        <Suspense
          fallback={
            <div className="text-center py-24 text-champagne flex items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-bronze" />
              <span className="text-sm">Loading reservation concierge...</span>
            </div>
          }
        >
          <ReservationForm />
        </Suspense>
      </div>
    </div>
  );
}
