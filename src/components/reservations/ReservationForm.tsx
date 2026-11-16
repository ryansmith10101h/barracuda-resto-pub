'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar, Clock, Users, Sparkles, CheckCircle2, MessageCircle, AlertCircle, Loader2, ShieldCheck, Info } from 'lucide-react';
import { Reservation } from '@/lib/types';

export default function ReservationForm() {
  const searchParams = useSearchParams();
  const preselectedDish = searchParams.get('dish') || searchParams.get('item');
  const preselectedEvent = searchParams.get('event');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '20:00',
    guestsCount: 2,
    seatingArea: 'Main Lounge' as Reservation['seatingArea'],
    occasion: 'Casual Dining & Drinks' as NonNullable<Reservation['occasion']>,
    specialRequests: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    reservation: Reservation;
    whatsappConfirmationUrl: string;
    message: string;
  } | null>(null);

  // Set min date to today (Africa/Lagos time)
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
    setFormData((prev) => ({ ...prev, date: today }));

    if (preselectedDish) {
      setFormData((prev) => ({
        ...prev,
        specialRequests: `Interested in pairing with signature dish: ${preselectedDish}`,
      }));
    } else if (preselectedEvent) {
      setFormData((prev) => ({
        ...prev,
        specialRequests: `Table reservation request for event: ${preselectedEvent}`,
      }));
    }
  }, [preselectedDish, preselectedEvent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit reservation request.');
      }

      setSuccessData(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    const { reservation, whatsappConfirmationUrl } = successData;
    return (
      <div className="bg-espresso-950 border border-bronze/40 rounded-3xl p-8 sm:p-12 text-center shadow-elevated max-w-2xl mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-bronze-light">
            RESERVATION REQUEST TRANSMITTED
          </span>
          <h2 className="font-serif text-3xl font-black text-cream-50">
            Thank You, {reservation.name}
          </h2>
          <p className="text-cream-300 text-sm max-w-md mx-auto leading-relaxed">
            Your table reservation request has been logged. Our floor manager will review booth availability
            and confirm your booking shortly.
          </p>
        </div>

        {/* Status Callout Card */}
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs text-left flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-champagne font-semibold mb-0.5">Reservation Status: Pending Confirmation</strong>
            <span>Table allocations are confirmed within 15–30 minutes during operating hours. We observe a 20-minute arrival grace period.</span>
          </div>
        </div>

        {/* Booking Card Details */}
        <div className="p-6 rounded-2xl bg-espresso-900 border border-white/10 text-left space-y-3">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-xs text-cream-400">Request Reference</span>
            <span className="font-mono font-bold text-champagne text-lg">{reservation.bookingRef}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs text-cream-300 pt-1">
            <div>
              <p className="text-cream-400">Date & Time</p>
              <p className="font-semibold text-cream-100">{reservation.date} at {reservation.time}</p>
            </div>
            <div>
              <p className="text-cream-400">Party Size</p>
              <p className="font-semibold text-cream-100">{reservation.guestsCount} Guests</p>
            </div>
            <div>
              <p className="text-cream-400">Seating Area</p>
              <p className="font-semibold text-cream-100">{reservation.seatingArea}</p>
            </div>
            <div>
              <p className="text-cream-400">Occasion</p>
              <p className="font-semibold text-cream-100">{reservation.occasion}</p>
            </div>
          </div>
        </div>

        {/* WhatsApp Fast Track Confirmation Button */}
        <div className="pt-2 space-y-3">
          <a
            href={whatsappConfirmationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-wider text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>FAST-TRACK CONFIRMATION ON WHATSAPP</span>
          </a>

          <button
            onClick={() => setSuccessData(null)}
            className="text-xs text-cream-400 hover:text-champagne transition-colors block mx-auto pt-2"
          >
            Submit Another Reservation Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-espresso-950 border border-white/10 rounded-3xl p-6 sm:p-12 shadow-elevated max-w-3xl mx-auto">
      <div className="mb-8 text-center space-y-2">
        <span className="text-[11px] font-bold tracking-[0.25em] text-bronze uppercase block">
          ONLINE TABLE & VIP BOOKING
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-black text-cream-50">
          Book Your Table at Barracuda
        </h2>
        <p className="text-cream-300 text-xs sm:text-sm max-w-lg mx-auto">
          Adetokunbo Ademola Crescent, Wuse 2, Abuja. We advise booking at least 3 hours prior to arrival for weekend evenings.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Info Group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cream-200 uppercase tracking-wider block">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Tunde Balogun"
              className="w-full px-4 py-3 rounded-xl bg-espresso-900 border border-white/10 text-cream-100 placeholder:text-cream-500 text-sm focus:outline-none focus:border-bronze transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cream-200 uppercase tracking-wider block">
              Phone Number (WhatsApp Preferred) *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+234 803 123 4567"
              className="w-full px-4 py-3 rounded-xl bg-espresso-900 border border-white/10 text-cream-100 placeholder:text-cream-500 text-sm focus:outline-none focus:border-bronze transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-cream-200 uppercase tracking-wider block">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="tunde@example.com"
            className="w-full px-4 py-3 rounded-xl bg-espresso-900 border border-white/10 text-cream-100 placeholder:text-cream-500 text-sm focus:outline-none focus:border-bronze transition-colors"
          />
        </div>

        {/* Date, Time, Guests Group */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cream-200 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-bronze" />
              <span>Date *</span>
            </label>
            <input
              type="date"
              required
              min={minDate}
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-espresso-900 border border-white/10 text-cream-100 text-sm focus:outline-none focus:border-bronze transition-colors [color-scheme:dark]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cream-200 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-bronze" />
              <span>Time *</span>
            </label>
            <select
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-espresso-900 border border-white/10 text-cream-100 text-sm focus:outline-none focus:border-bronze transition-colors"
            >
              <option value="16:00">4:00 PM (Doors Open)</option>
              <option value="17:00">5:00 PM</option>
              <option value="18:00">6:00 PM (Early Dinner)</option>
              <option value="19:00">7:00 PM</option>
              <option value="20:00">8:00 PM (Prime Dinner)</option>
              <option value="21:00">9:00 PM (Nightlife Shift Starts)</option>
              <option value="22:00">10:00 PM (Lounge & Bottle Hospitality)</option>
              <option value="23:00">11:00 PM</option>
              <option value="00:00">12:00 AM Midnight</option>
              <option value="01:00">1:00 AM (Late Shift)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cream-200 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-bronze" />
              <span>Guests *</span>
            </label>
            <input
              type="number"
              min="1"
              max="50"
              required
              value={formData.guestsCount}
              onChange={(e) => setFormData({ ...formData, guestsCount: parseInt(e.target.value, 10) || 1 })}
              className="w-full px-4 py-3 rounded-xl bg-espresso-900 border border-white/10 text-cream-100 text-sm focus:outline-none focus:border-bronze transition-colors"
            />
          </div>
        </div>

        {/* Seating Area & Occasion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cream-200 uppercase tracking-wider block">
              Seating Experience
            </label>
            <select
              value={formData.seatingArea}
              onChange={(e) =>
                setFormData({ ...formData, seatingArea: e.target.value as Reservation['seatingArea'] })
              }
              className="w-full px-4 py-3 rounded-xl bg-espresso-900 border border-white/10 text-cream-100 text-sm focus:outline-none focus:border-bronze transition-colors"
            >
              <option value="Main Lounge">Main Dining Lounge</option>
              <option value="VIP Booth">VIP Velvet Booth (Bottle Hospitality)</option>
              <option value="Outdoor Terrace">Outdoor Breeze Terrace</option>
              <option value="Bar Counter">Illuminated Mixology Bar</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cream-200 uppercase tracking-wider block">
              Occasion
            </label>
            <select
              value={formData.occasion}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  occasion: e.target.value as NonNullable<Reservation['occasion']>,
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-espresso-900 border border-white/10 text-cream-100 text-sm focus:outline-none focus:border-bronze transition-colors"
            >
              <option value="Casual Dining & Drinks">Casual Dining & Drinks</option>
              <option value="Birthday Celebration">Birthday Celebration</option>
              <option value="Date Night">Romantic Date Night</option>
              <option value="Corporate Dinner">Corporate / Executive Dinner</option>
              <option value="Private Lounge Celebration">Private Celebration / Buyout Enquiry</option>
            </select>
          </div>
        </div>

        {/* Special Requests */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-cream-200 uppercase tracking-wider block">
            Special Requests / Dietary Notes (Optional)
          </label>
          <textarea
            rows={3}
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            placeholder="e.g. Specific bottle request (Moët, Hennessy VSOP), champagne ice bucket, birthday cake arrival, seating preference..."
            className="w-full px-4 py-3 rounded-xl bg-espresso-900 border border-white/10 text-cream-100 placeholder:text-cream-500 text-sm focus:outline-none focus:border-bronze transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-full bg-bronze hover:bg-bronze-light text-dark-950 font-black uppercase tracking-widest text-xs sm:text-sm shadow-bronze-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>TRANSMITTING REQUEST...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>SUBMIT TABLE RESERVATION REQUEST</span>
            </>
          )}
        </button>

        <div className="p-3 rounded-xl bg-espresso-900/60 border border-white/5 flex items-center justify-center gap-2 text-[11px] text-cream-400 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-bronze shrink-0" />
          <span>No prepayment required for standard tables. 20-minute table arrival hold policy applies.</span>
        </div>
      </form>
    </div>
  );
}
