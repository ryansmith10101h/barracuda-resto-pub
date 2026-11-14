'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageCircle, Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { getIsOpenNow, getTelUrl, getWhatsAppUrl } from '@/lib/utils';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState({ isOpen: true, statusText: 'Open Now — Wuse 2, Abuja' });
  const pathname = usePathname();

  useEffect(() => {
    setStatus(getIsOpenNow());

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Menu', href: '/menu' },
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Reservations', href: '/reservations' },
    { label: 'Location & Contact', href: '/contact' },
  ];

  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+2349122356336';
  const whatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '2349122356336';

  return (
    <>
      {/* Top Notification Bar: Hours & Direct Contact */}
      <div className="bg-dark-900 border-b border-white/5 text-xs text-cream-300 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className="font-medium text-cream-200">{status.statusText}</span>
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1 text-cream-400">
              <MapPin className="w-3 h-3 text-gold" />
              Adetokunbo Ademola Crescent, Wuse 2, Abuja
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <a
              href={getTelUrl(phone)}
              className="flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <Phone className="w-3 h-3 text-gold" />
              <span>+234 912 235 6336</span>
            </a>
            <span className="text-white/20">•</span>
            <a
              href={getWhatsAppUrl(whatsapp, 'Hello Barracuda Resto Pub, I would like to enquire about table reservations.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-dark-950/95 backdrop-blur-md border-b border-gold/15 shadow-elevated py-3.5'
            : 'bg-dark-950/80 backdrop-blur-sm border-b border-white/5 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-extrabold text-cream-50 group-hover:text-gold transition-colors duration-300">
              BARRACUDA
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.35em] text-gold uppercase font-semibold">
              RESTO PUB • ABUJA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    isActive ? 'text-gold' : 'text-cream-200 hover:text-gold'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={getWhatsAppUrl(whatsapp, 'Hello Barracuda, I would like to make an enquiry.')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-dark-800 text-cream-200 hover:text-emerald-400 hover:bg-dark-750 border border-white/10 transition-all"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <Link
              href="/reservations"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-gold via-gold-hover to-gold text-dark-950 text-xs uppercase tracking-widest font-bold shadow-gold-sm hover:shadow-gold-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="/reservations"
              className="px-3.5 py-1.5 rounded-full bg-gold text-dark-950 text-[11px] uppercase tracking-wider font-bold"
            >
              Reserve
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-dark-850 text-cream-200 hover:text-gold border border-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-dark-950/98 backdrop-blur-xl flex flex-col">
          {/* Drawer Top */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col"
            >
              <span className="font-serif text-2xl tracking-[0.2em] font-extrabold text-cream-50">
                BARRACUDA
              </span>
              <span className="text-[10px] tracking-[0.35em] text-gold uppercase font-semibold">
                RESTO PUB • ABUJA
              </span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-dark-800 text-cream-200 hover:text-gold border border-white/10"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-4">
            <div className="space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-3.5 px-4 rounded-xl text-lg font-medium transition-all ${
                      isActive
                        ? 'bg-dark-800 text-gold border border-gold/20'
                        : 'text-cream-200 hover:bg-dark-900 hover:text-gold'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-cream-400" />
                  </Link>
                );
              })}
            </div>

            {/* Quick Mobile Info Card */}
            <div className="mt-8 p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-4 text-sm">
              <div className="flex items-center gap-2 text-gold font-semibold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Abuja Opening Hours</span>
              </div>
              <p className="text-cream-300 text-xs leading-relaxed">
                Tue – Sun: 4:00 PM – Late (Grills & Bar)
                <br />
                Mon: 5:00 PM – 12:00 AM
              </p>

              <div className="flex items-center gap-2 text-cream-400 text-xs">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Adetokunbo Ademola Crescent, Wuse 2, Abuja</span>
              </div>
            </div>

            {/* Instant Actions inside Drawer */}
            <div className="pt-4 space-y-3">
              <Link
                href="/reservations"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-xl bg-gold text-dark-950 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-gold-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Table Online</span>
              </Link>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={getTelUrl(phone)}
                  className="py-3 rounded-xl bg-dark-850 border border-white/10 text-cream-200 text-xs font-semibold flex items-center justify-center gap-2 hover:border-gold"
                >
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  <span>Call Venue</span>
                </a>
                <a
                  href={getWhatsAppUrl(whatsapp, 'Hello Barracuda Resto Pub, I would like to book a table.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
