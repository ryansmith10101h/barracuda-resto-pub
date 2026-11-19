'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageCircle, Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { getIsOpenNow, getTelUrl, getWhatsAppUrl, VenueStatus } from '@/lib/utils';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState<VenueStatus>({
    isOpen: false,
    statusText: 'Mon–Sat from 10:00 AM • Sun from 12:00 PM',
    badgeLabel: 'Wuse 2, Abuja',
    currentDayName: 'Abuja',
  });
  const pathname = usePathname();

  useEffect(() => {
    setStatus(getIsOpenNow());

    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Our Story', href: '/#story' },
    { label: 'Menu', href: '/menu' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ];

  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+2349122356336';
  const whatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '2349122356336';

  return (
    <>
      {/* Top Utility Bar: Live WAT Status & Verified Abuja Location */}
      <div className="bg-espresso-950 border-b border-white/5 text-[11px] text-cream-300 py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <span className="font-medium text-cream-200">{status.statusText}</span>
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5 text-cream-400">
              <MapPin className="w-3 h-3 text-bronze" />
              111 Adetokunbo Ademola Crescent, Wuse 2, Abuja
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <a
              href={getTelUrl(phone)}
              className="flex items-center gap-1.5 hover:text-champagne transition-colors"
            >
              <Phone className="w-3 h-3 text-bronze" />
              <span>+234 912 235 6336</span>
            </a>
            <span className="text-white/20">•</span>
            <a
              href={getWhatsAppUrl(whatsapp, 'Hello Barracuda Resto Pub, I would like to make an inquiry.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-dark-950/95 backdrop-blur-md border-b border-bronze/20 shadow-elevated py-3'
            : 'bg-dark-950/80 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex flex-col focus:outline-none">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] font-black text-cream-50 group-hover:text-champagne transition-colors duration-300">
              BARRACUDA
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.32em] text-bronze uppercase font-semibold">
              RESTO PUB • WUSE 2, ABUJA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs font-semibold tracking-wider uppercase transition-colors relative py-1 ${
                    isActive ? 'text-champagne font-bold' : 'text-cream-300 hover:text-champagne'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-bronze rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden xl:flex items-center space-x-4">
            <a
              href={getWhatsAppUrl(whatsapp, 'Hello Barracuda, I would like to enquire about table reservations.')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-espresso-900 text-cream-300 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/30 transition-all"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <Link
              href="/reservations"
              className="px-5 py-2.5 rounded-full bg-bronze hover:bg-bronze-light text-dark-950 text-xs uppercase tracking-widest font-extrabold shadow-bronze-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve a Table</span>
            </Link>
          </div>

          {/* Mobile / Tablet Header Controls */}
          <div className="flex items-center gap-3 xl:hidden">
            <Link
              href="/reservations"
              className="px-3.5 py-1.5 rounded-full bg-bronze text-dark-950 text-[11px] uppercase tracking-wider font-extrabold shadow-sm"
            >
              Reserve
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-espresso-900 text-cream-200 hover:text-champagne border border-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden bg-dark-950/98 backdrop-blur-xl flex flex-col animate-in fade-in duration-200">
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col"
            >
              <span className="font-serif text-2xl tracking-[0.18em] font-black text-cream-50">
                BARRACUDA
              </span>
              <span className="text-[10px] tracking-[0.3em] text-bronze uppercase font-semibold">
                RESTO PUB • WUSE 2, ABUJA
              </span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-dark-900 text-cream-200 hover:text-champagne border border-white/10"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            <div className="space-y-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-3.5 px-4 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? 'bg-espresso-900 text-champagne border border-bronze/30 font-bold'
                        : 'text-cream-200 hover:bg-dark-900 hover:text-champagne'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-cream-400" />
                  </Link>
                );
              })}
            </div>

            {/* Operating Hours Card in Mobile Drawer */}
            <div className="mt-6 p-4 rounded-2xl bg-espresso-950 border border-white/10 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-bronze font-bold uppercase tracking-wider text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                <span>Operating Schedule (WAT)</span>
              </div>
              <div className="text-cream-300 text-[11px] space-y-1">
                <p>Mon – Sat: 10:00 AM – 12:00 AM</p>
                <p>Sunday: 12:00 PM – 12:00 AM</p>
              </div>

              <div className="flex items-center gap-2 text-cream-400 text-[11px] pt-1 border-t border-white/5">
                <MapPin className="w-3.5 h-3.5 text-bronze shrink-0" />
                <span>111 Adetokunbo Ademola Crescent (Rooftop, Yelwa Plaza), Wuse 2</span>
              </div>
            </div>

            {/* Direct Action CTAs in Mobile Drawer */}
            <div className="pt-2 space-y-2.5">
              <Link
                href="/reservations"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-xl bg-bronze text-dark-950 font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-bronze-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Table Online</span>
              </Link>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={getTelUrl(phone)}
                  className="py-3 rounded-xl bg-dark-900 border border-white/10 text-cream-200 text-xs font-semibold flex items-center justify-center gap-2 hover:border-bronze"
                >
                  <Phone className="w-3.5 h-3.5 text-bronze" />
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
