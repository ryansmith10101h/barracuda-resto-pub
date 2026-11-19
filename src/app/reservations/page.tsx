import { Suspense } from 'react';
import type { Metadata } from 'next';
import ReservationForm from '@/components/reservations/ReservationForm';
import { Calendar, Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Table Reservations | Wuse 2, Abuja',
  description:
    'Book your table at Barracuda Resto Pub on 111 Adetokunbo Ademola Crescent, Wuse 2, Abuja. Instant booking request submission and WhatsApp concierge.',
  robots: {
    index: false,
    follow: false,
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
            <span>TABLE RESERVATIONS</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-cream-50 leading-tight">
            Reserve Your Table
          </h1>

          <p className="text-cream-300 text-sm sm:text-base leading-relaxed">
            Reserve your spot in advance. Whether you prefer open-air rooftop terrace dining, comfortable indoor tables,
            or bar seating, we look forward to welcoming you.
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
