'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Enquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const whatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '2349122356336';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'General Enquiry',
        message: '',
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 rounded-3xl bg-espresso-950 border border-bronze/40 text-center shadow-bronze-sm space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-cream-50">Enquiry Dispatched!</h3>
        <p className="text-cream-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to Barracuda Resto Pub. Our concierge desk will review your inquiry and get in touch with you promptly.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setSuccess(false)}
            className="px-6 py-2.5 rounded-full bg-espresso-900 hover:bg-espresso-850 text-champagne border border-bronze/30 text-xs font-bold uppercase tracking-wider"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-3xl bg-espresso-950 border border-white/10 shadow-elevated">
      <div className="mb-6 space-y-2">
        <span className="text-[11px] font-bold tracking-[0.25em] text-bronze uppercase block">
          MESSAGE THE CONCIERGE
        </span>
        <h3 className="font-serif text-2xl font-black text-cream-50">
          Send Us a Direct Message
        </h3>
        <p className="text-cream-300 text-xs leading-relaxed">
          For corporate event bookings, private lounge buyout inquiries, or special culinary requests.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-cream-200 uppercase tracking-wider">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Maryam Bello"
              className="w-full px-4 py-3 rounded-xl bg-espresso-900 border border-white/10 text-cream-100 placeholder:text-cream-500 text-sm focus:outline-none focus:border-bronze transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-cream-200 uppercase tracking-wider">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+234 812 345 6789"
              className="w-full px-4 py-3 rounded-xl bg-espresso-900 border border-white/10 text-cream-100 placeholder:text-cream-500 text-sm focus:outline-none focus:border-bronze transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-cream-200 uppercase tracking-wider">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="maryam@example.com"
              className="w-full px-4 py-3 rounded-xl bg-espresso-900 border border-white/10 text-cream-100 placeholder:text-cream-500 text-sm focus:outline-none focus:border-bronze transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-cream-200 uppercase tracking-wider">
              Subject
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-espresso-900 border border-white/10 text-cream-100 text-sm focus:outline-none focus:border-bronze transition-colors"
            >
              <option value="General Enquiry">General Enquiry</option>
              <option value="VIP Booth & Bottle Hospitality">VIP Booth & Bottle Hospitality</option>
              <option value="Private Lounge Buyout">Private Lounge Buyout</option>
              <option value="Event Collaboration / Performance">Event Collaboration / Performance</option>
              <option value="Feedback / Experience">Feedback / Experience</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-cream-200 uppercase tracking-wider">
            Your Message *
          </label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us about your requirements, date, or party size..."
            className="w-full px-4 py-3 rounded-xl bg-espresso-900 border border-white/10 text-cream-100 placeholder:text-cream-500 text-sm focus:outline-none focus:border-bronze transition-colors resize-none"
          />
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-bronze hover:bg-bronze-light text-dark-950 font-black uppercase tracking-wider text-xs shadow-bronze-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>SENDING...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>DISPATCH ENQUIRY</span>
              </>
            )}
          </button>

          <a
            href={getWhatsAppUrl(whatsapp, 'Hello Barracuda Resto Pub, I have an enquiry.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-emerald-950/60 hover:bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </form>
    </div>
  );
}
