'use client';

import { useState, useEffect } from 'react';
import {
  Calendar,
  UtensilsCrossed,
  PartyPopper,
  Mail,
  Settings,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  LogOut,
  RefreshCw,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { MenuItem, EventItem, Reservation, ContactEnquiry, BusinessInfo } from '@/lib/types';
import { formatNaira, getTelUrl, getWhatsAppUrl } from '@/lib/utils';

interface AdminDashboardProps {
  passcode: string;
  onLogout: () => void;
}

export default function AdminDashboard({ passcode, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'reservations' | 'menu' | 'events' | 'enquiries' | 'settings'>('reservations');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data states
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);

  // New Menu Item Form State
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    category: 'Grills & Suya' as MenuItem['category'],
    description: '',
    price: 8500,
    isAvailable: true,
    isSpecial: false,
    isSpicy: false,
    imageUrl: '',
  });

  // New Event Form State
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    subtitle: '',
    date: new Date().toISOString().split('T')[0],
    dayOfWeek: 'Friday',
    time: '9:00 PM till Late',
    description: '',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    dressCode: 'Smart Casual / Nightlife Chic',
    entryType: 'Table Reservation' as EventItem['entryType'],
    ticketPrice: 0,
    status: 'upcoming' as EventItem['status'],
  });

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin', {
        headers: {
          'x-admin-passcode': passcode,
        },
      });

      if (!res.ok) {
        throw new Error('Authentication failed or invalid session passcode.');
      }

      const data = await res.json();
      setReservations(data.reservations || []);
      setMenuItems(data.menuItems || []);
      setEvents(data.events || []);
      setEnquiries(data.enquiries || []);
      setBusinessInfo(data.businessInfo || null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error loading admin data';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passcode]);

  const handleUpdateReservation = async (id: string, status: Reservation['status']) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({
          action: 'update_reservation_status',
          payload: { id, status },
        }),
      });
      if (res.ok) {
        setReservations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleMenuAvailability = async (item: MenuItem) => {
    const updatedStatus = !item.isAvailable;
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({
          action: 'update_menu_item',
          payload: {
            id: item.id,
            updates: { isAvailable: updatedStatus },
          },
        }),
      });
      if (res.ok) {
        setMenuItems((prev) =>
          prev.map((m) => (m.id === item.id ? { ...m, isAvailable: updatedStatus } : m))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMenuItem = async (id: string) => {
    if (!confirm('Are you sure you want to remove this item from the menu?')) return;
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({
          action: 'delete_menu_item',
          payload: { id },
        }),
      });
      if (res.ok) {
        setMenuItems((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({
          action: 'add_menu_item',
          payload: newMenuItem,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setMenuItems((prev) => [data.item, ...prev]);
        setShowAddMenuModal(false);
        setNewMenuItem({
          name: '',
          category: 'Grills & Suya',
          description: '',
          price: 8500,
          isAvailable: true,
          isSpecial: false,
          isSpicy: false,
          imageUrl: '',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({
          action: 'add_event',
          payload: newEvent,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setEvents((prev) => [data.event, ...prev]);
        setShowAddEventModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({
          action: 'delete_event',
          payload: { id },
        }),
      });
      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateBusinessSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessInfo) return;
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({
          action: 'update_business_info',
          payload: businessInfo,
        }),
      });
      if (res.ok) {
        alert('Business settings updated successfully!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Admin Bar */}
      <div className="bg-dark-900 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">
            BARRACUDA RESTO PUB ABUJA
          </span>
          <h1 className="font-serif text-2xl font-black text-cream-50">
            Manager Control Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="p-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-cream-200 border border-white/10 text-xs flex items-center gap-2"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={onLogout}
            className="px-4 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-950/80 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
          {error}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
        <button
          onClick={() => setActiveTab('reservations')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'reservations'
              ? 'bg-gold text-dark-950 shadow-gold-sm'
              : 'text-cream-300 hover:text-gold hover:bg-dark-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Reservations ({reservations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('menu')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'menu'
              ? 'bg-gold text-dark-950 shadow-gold-sm'
              : 'text-cream-300 hover:text-gold hover:bg-dark-900'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Menu CMS ({menuItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'events'
              ? 'bg-gold text-dark-950 shadow-gold-sm'
              : 'text-cream-300 hover:text-gold hover:bg-dark-900'
          }`}
        >
          <PartyPopper className="w-4 h-4" />
          <span>Events ({events.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'enquiries'
              ? 'bg-gold text-dark-950 shadow-gold-sm'
              : 'text-cream-300 hover:text-gold hover:bg-dark-900'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Enquiries ({enquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-gold text-dark-950 shadow-gold-sm'
              : 'text-cream-300 hover:text-gold hover:bg-dark-900'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Business Info</span>
        </button>
      </div>

      {/* TAB 1: RESERVATIONS */}
      {activeTab === 'reservations' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-cream-50">
              Table Bookings & VIP Requests
            </h2>
            <span className="text-xs text-cream-400">
              Hold grace period: 20 minutes from booking time
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {reservations.map((res) => (
              <div
                key={res.id}
                className="p-6 rounded-2xl bg-dark-900 border border-white/10 hover:border-gold/30 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-gold px-2.5 py-1 rounded-md bg-dark-850 border border-gold/20">
                      {res.bookingRef}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        res.status === 'confirmed'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : res.status === 'cancelled'
                          ? 'bg-rose-950 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {res.status}
                    </span>
                    <span className="text-xs text-cream-400">
                      Booked {new Date(res.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-cream-100">
                    {res.name} — <span className="text-gold">{res.guestsCount} Persons</span> ({res.seatingArea})
                  </h3>

                  <div className="flex flex-wrap gap-4 text-xs text-cream-300">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      {res.date} at {res.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-gold" />
                      <a href={getTelUrl(res.phone)} className="hover:underline">
                        {res.phone}
                      </a>
                    </span>
                    <span>Email: {res.email}</span>
                    <span>Occasion: {res.occasion}</span>
                  </div>

                  {res.specialRequests && (
                    <p className="text-xs text-cream-400 bg-dark-950 p-3 rounded-xl border border-white/5 mt-2">
                      <strong className="text-gold">Special Request:</strong> {res.specialRequests}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <a
                    href={getWhatsAppUrl(
                      res.phone,
                      `Hello ${res.name}, this is Barracuda Resto Pub regarding your table reservation (${res.bookingRef}) for ${res.date} at ${res.time}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 hover:text-white transition-colors"
                    title="WhatsApp Customer"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  {res.status !== 'confirmed' && (
                    <button
                      onClick={() => handleUpdateReservation(res.id, 'confirmed')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Confirm</span>
                    </button>
                  )}

                  {res.status !== 'cancelled' && (
                    <button
                      onClick={() => handleUpdateReservation(res.id, 'cancelled')}
                      className="px-3 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-rose-400 hover:text-rose-300 border border-rose-500/20 text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MENU CMS */}
      {activeTab === 'menu' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-cream-50">
                Menu Management
              </h2>
              <p className="text-xs text-cream-400">
                Edit prices, toggle out-of-stock items, or introduce new seasonal dishes.
              </p>
            </div>

            <button
              onClick={() => setShowAddMenuModal(true)}
              className="px-5 py-2.5 rounded-xl bg-gold text-dark-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-gold-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Dish / Drink</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-dark-900 border border-white/10 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif font-bold text-cream-100 text-base">
                      {item.name}
                    </h3>
                    <span className="font-serif font-bold text-gold text-sm whitespace-nowrap">
                      {formatNaira(item.price)}
                    </span>
                  </div>
                  <span className="text-[10px] text-cream-400 uppercase tracking-wider block mt-1">
                    {item.category}
                  </span>
                  <p className="text-xs text-cream-300 mt-2 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleMenuAvailability(item)}
                    className={`text-xs font-semibold px-3 py-1 rounded-lg transition-colors ${
                      item.isAvailable
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-950/60 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {item.isAvailable ? 'In Stock (Active)' : 'Sold Out'}
                  </button>

                  <button
                    onClick={() => handleDeleteMenuItem(item.id)}
                    className="p-1.5 rounded-lg text-cream-400 hover:text-rose-400 transition-colors"
                    title="Delete Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: EVENTS */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-cream-50">
                Nightlife Events Schedule
              </h2>
              <p className="text-xs text-cream-400">
                Manage upcoming theme nights, resident DJ line-ups, and live music sessions.
              </p>
            </div>

            <button
              onClick={() => setShowAddEventModal(true)}
              className="px-5 py-2.5 rounded-xl bg-gold text-dark-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-gold-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="p-6 rounded-2xl bg-dark-900 border border-white/10 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gold uppercase tracking-wider">
                      {evt.dayOfWeek} • {evt.time}
                    </span>
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-dark-800 text-cream-300">
                      {evt.entryType}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-cream-50">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-cream-300 line-clamp-3">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-cream-400">
                    Date: {evt.date}
                  </span>

                  <button
                    onClick={() => handleDeleteEvent(evt.id)}
                    className="p-1.5 text-cream-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ENQUIRIES */}
      {activeTab === 'enquiries' && (
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-cream-50">
            Contact Messages & Buyout Inquiries
          </h2>

          <div className="space-y-4">
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                className="p-6 rounded-2xl bg-dark-900 border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-cream-50">{enq.subject}</h3>
                    <p className="text-xs text-cream-400">
                      From: {enq.name} ({enq.phone} • {enq.email})
                    </p>
                  </div>
                  <span className="text-xs text-cream-400">
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-xs text-cream-200 bg-dark-950 p-4 rounded-xl border border-white/5 leading-relaxed">
                  {enq.message}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={getWhatsAppUrl(enq.phone, `Hello ${enq.name}, thank you for contacting Barracuda Resto Pub.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Reply via WhatsApp</span>
                  </a>

                  <a
                    href={getTelUrl(enq.phone)}
                    className="px-4 py-2 rounded-xl bg-dark-850 border border-white/10 text-cream-200 text-xs font-semibold flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold" />
                    <span>Call Customer</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: BUSINESS SETTINGS */}
      {activeTab === 'settings' && businessInfo && (
        <div className="bg-dark-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-cream-50">
              Business Configuration & Contacts
            </h2>
            <p className="text-xs text-cream-400">
              Update client-provided phone numbers, address, and live website messaging.
            </p>
          </div>

          <form onSubmit={handleUpdateBusinessSettings} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-cream-300 uppercase">
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessInfo.name}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-cream-300 uppercase">
                  Primary Phone
                </label>
                <input
                  type="text"
                  value={businessInfo.phone}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-cream-300 uppercase">
                  WhatsApp Contact (Digits only with 234)
                </label>
                <input
                  type="text"
                  value={businessInfo.whatsapp}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, whatsapp: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-cream-300 uppercase">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={businessInfo.instagram}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, instagram: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-cream-300 uppercase">
                Physical Address
              </label>
              <input
                type="text"
                value={businessInfo.address}
                onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-cream-300 uppercase">
                Hero Headline
              </label>
              <input
                type="text"
                value={businessInfo.headline}
                onChange={(e) => setBusinessInfo({ ...businessInfo, headline: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-cream-300 uppercase">
                Subheadline
              </label>
              <textarea
                rows={3}
                value={businessInfo.subheadline}
                onChange={(e) => setBusinessInfo({ ...businessInfo, subheadline: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gold text-dark-950 font-bold uppercase tracking-wider text-xs shadow-gold-sm"
            >
              Save Configuration
            </button>
          </form>
        </div>
      )}

      {/* Modal: Add Menu Item */}
      {showAddMenuModal && (
        <div className="fixed inset-0 z-50 bg-dark-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-dark-900 border border-gold/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4">
            <h3 className="font-serif text-xl font-bold text-cream-50">
              Add New Menu Item
            </h3>
            <form onSubmit={handleAddMenuItem} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Dish or Drink Name *"
                value={newMenuItem.name}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs"
              />
              <select
                value={newMenuItem.category}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, category: e.target.value as MenuItem['category'] })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs"
              >
                <option value="Grills & Suya">Grills & Suya</option>
                <option value="Small Plates">Small Plates</option>
                <option value="Main Meals">Main Meals</option>
                <option value="Signature Cocktails">Signature Cocktails</option>
                <option value="Spirits & Champagne">Spirits & Champagne</option>
                <option value="Beer & Refreshments">Beer & Refreshments</option>
              </select>
              <input
                type="number"
                required
                placeholder="Price in NGN (₦) *"
                value={newMenuItem.price}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, price: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs"
              />
              <textarea
                required
                rows={3}
                placeholder="Description of ingredients and flavor profile *"
                value={newMenuItem.description}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs resize-none"
              />
              <input
                type="url"
                placeholder="Image URL (Unsplash or Supabase Storage)"
                value={newMenuItem.imageUrl}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, imageUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs"
              />
              <div className="flex items-center gap-4 text-xs text-cream-300">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newMenuItem.isSpecial}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, isSpecial: e.target.checked })}
                  />
                  <span>Signature Dish</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newMenuItem.isSpicy}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, isSpicy: e.target.checked })}
                  />
                  <span>Spicy Item</span>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddMenuModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-cream-400 hover:text-cream-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gold text-dark-950 font-bold uppercase text-xs"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Event */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 bg-dark-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-dark-900 border border-gold/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4">
            <h3 className="font-serif text-xl font-bold text-cream-50">
              Add Upcoming Event
            </h3>
            <form onSubmit={handleAddEvent} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Event Title *"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs"
              />
              <input
                type="text"
                required
                placeholder="Subtitle / Tagline *"
                value={newEvent.subtitle}
                onChange={(e) => setNewEvent({ ...newEvent, subtitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  required
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs [color-scheme:dark]"
                />
                <input
                  type="text"
                  required
                  placeholder="Day (e.g. Every Friday)"
                  value={newEvent.dayOfWeek}
                  onChange={(e) => setNewEvent({ ...newEvent, dayOfWeek: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs"
                />
              </div>
              <input
                type="text"
                required
                placeholder="Time (e.g. 9:00 PM till 4:00 AM)"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs"
              />
              <textarea
                required
                rows={3}
                placeholder="Event Description *"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs resize-none"
              />
              <input
                type="url"
                required
                placeholder="Cover Image URL *"
                value={newEvent.coverImage}
                onChange={(e) => setNewEvent({ ...newEvent, coverImage: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/10 text-cream-100 text-xs"
              />

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-cream-400 hover:text-cream-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gold text-dark-950 font-bold uppercase text-xs"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
