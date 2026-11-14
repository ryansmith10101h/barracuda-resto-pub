import Link from 'next/link';
import { Compass, Home, UtensilsCrossed, Calendar } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-dark-950 px-4 py-20 text-center">
      <div className="max-w-md w-full bg-dark-900 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-elevated space-y-6">
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 text-gold flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-gold">
            PAGE NOT FOUND • 404
          </span>
          <h1 className="font-serif text-3xl font-black text-cream-50">
            Lost in the Night?
          </h1>
          <p className="text-cream-400 text-xs sm:text-sm leading-relaxed">
            The page you are looking for has moved or does not exist. Let us guide you back to Barracuda Resto Pub.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Link
            href="/"
            className="w-full py-3.5 px-6 rounded-xl bg-gold text-dark-950 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-gold-sm hover:scale-[1.02] transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/menu"
            className="w-full py-3.5 px-6 rounded-xl bg-dark-850 hover:bg-dark-800 text-cream-200 border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <UtensilsCrossed className="w-4 h-4 text-gold" />
            <span>View Food & Drinks Menu</span>
          </Link>

          <Link
            href="/reservations"
            className="w-full py-3.5 px-6 rounded-xl bg-dark-850 hover:bg-dark-800 text-cream-200 border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Calendar className="w-4 h-4 text-gold" />
            <span>Book a Table</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
