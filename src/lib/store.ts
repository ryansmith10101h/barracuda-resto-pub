import { MenuItem, EventItem, GalleryItem, Reservation, ContactEnquiry, BusinessInfo } from './types';
import { initialBusinessInfo, initialMenuItems, initialEvents, initialGalleryItems } from './data/initialData';
import { generateBookingRef } from './utils';

// Global in-memory cache for state during dev / server sessions
declare global {
  // eslint-disable-next-line no-var
  var __barracuda_state: {
    businessInfo: BusinessInfo;
    menuItems: MenuItem[];
    events: EventItem[];
    galleryItems: GalleryItem[];
    reservations: Reservation[];
    enquiries: ContactEnquiry[];
  } | undefined;
}

if (!global.__barracuda_state) {
  global.__barracuda_state = {
    businessInfo: initialBusinessInfo,
    menuItems: initialMenuItems,
    events: initialEvents,
    galleryItems: initialGalleryItems,
    reservations: [
      {
        id: 'res-sample-1',
        bookingRef: 'BCD-2041',
        name: 'Chinedu Okonkwo',
        phone: '+234 803 456 7890',
        email: 'chinedu.o@example.com',
        date: '2026-11-20',
        time: '8:30 PM',
        guestsCount: 4,
        seatingArea: 'VIP Booth',
        occasion: 'Birthday Celebration',
        specialRequests: 'Moët & Chandon bottle chilling upon arrival',
        status: 'confirmed',
        createdAt: '2026-11-14T14:30:00Z',
      },
      {
        id: 'res-sample-2',
        bookingRef: 'BCD-7819',
        name: 'Amina Bello',
        phone: '+234 812 345 6789',
        email: 'amina.b@example.com',
        date: '2026-11-21',
        time: '9:00 PM',
        guestsCount: 2,
        seatingArea: 'Outdoor Terrace',
        occasion: 'Date Night',
        specialRequests: 'Quiet terrace corner with view of Wuse strip',
        status: 'pending',
        createdAt: '2026-11-14T17:15:00Z',
      },
    ],
    enquiries: [
      {
        id: 'enq-sample-1',
        name: 'Kelechi Eze',
        phone: '+234 901 234 5678',
        email: 'kelechi@techventures.ng',
        subject: 'Corporate End-of-Year Private Lounge Buyout',
        message: 'Hello Barracuda team, we are looking to host 35 executives for an exclusive evening buyout in early December. Kindly share your private dining and canapé packages.',
        status: 'new',
        createdAt: '2026-11-14T10:00:00Z',
      },
    ],
  };
}

export const store = global.__barracuda_state;

// Data accessor helpers
export function getBusinessInfo(): BusinessInfo {
  return store.businessInfo;
}

export function updateBusinessInfo(info: Partial<BusinessInfo>): BusinessInfo {
  store.businessInfo = { ...store.businessInfo, ...info };
  return store.businessInfo;
}

export function getMenuItems(): MenuItem[] {
  return store.menuItems;
}

export function addMenuItem(item: Omit<MenuItem, 'id'>): MenuItem {
  const newItem: MenuItem = {
    ...item,
    id: `menu-${Date.now()}`,
  };
  store.menuItems.unshift(newItem);
  return newItem;
}

export function updateMenuItem(id: string, updates: Partial<MenuItem>): MenuItem | null {
  const index = store.menuItems.findIndex((m) => m.id === id);
  if (index === -1) return null;
  store.menuItems[index] = { ...store.menuItems[index], ...updates };
  return store.menuItems[index];
}

export function deleteMenuItem(id: string): boolean {
  const initialLength = store.menuItems.length;
  store.menuItems = store.menuItems.filter((m) => m.id !== id);
  return store.menuItems.length < initialLength;
}

export function getEvents(): EventItem[] {
  return store.events;
}

export function addEvent(item: Omit<EventItem, 'id'>): EventItem {
  const newEvent: EventItem = {
    ...item,
    id: `event-${Date.now()}`,
  };
  store.events.unshift(newEvent);
  return newEvent;
}

export function updateEvent(id: string, updates: Partial<EventItem>): EventItem | null {
  const index = store.events.findIndex((e) => e.id === id);
  if (index === -1) return null;
  store.events[index] = { ...store.events[index], ...updates };
  return store.events[index];
}

export function deleteEvent(id: string): boolean {
  const initialLength = store.events.length;
  store.events = store.events.filter((e) => e.id !== id);
  return store.events.length < initialLength;
}

export function getGalleryItems(): GalleryItem[] {
  return store.galleryItems;
}

export function getReservations(): Reservation[] {
  return store.reservations;
}

export function createReservation(data: {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guestsCount: number;
  seatingArea: Reservation['seatingArea'];
  occasion?: Reservation['occasion'];
  specialRequests?: string;
}): Reservation {
  const newReservation: Reservation = {
    id: `res-${Date.now()}`,
    bookingRef: generateBookingRef(),
    name: data.name,
    phone: data.phone,
    email: data.email,
    date: data.date,
    time: data.time,
    guestsCount: Number(data.guestsCount),
    seatingArea: data.seatingArea || 'Main Lounge',
    occasion: data.occasion || 'Casual Night Out',
    specialRequests: data.specialRequests || '',
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  store.reservations.unshift(newReservation);
  return newReservation;
}

export function updateReservationStatus(id: string, status: Reservation['status']): Reservation | null {
  const res = store.reservations.find((r) => r.id === id);
  if (!res) return null;
  res.status = status;
  return res;
}

export function getEnquiries(): ContactEnquiry[] {
  return store.enquiries;
}

export function createEnquiry(data: {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}): ContactEnquiry {
  const newEnquiry: ContactEnquiry = {
    id: `enq-${Date.now()}`,
    name: data.name,
    phone: data.phone,
    email: data.email,
    subject: data.subject,
    message: data.message,
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  store.enquiries.unshift(newEnquiry);
  return newEnquiry;
}

export function updateEnquiryStatus(id: string, status: ContactEnquiry['status']): ContactEnquiry | null {
  const enq = store.enquiries.find((e) => e.id === id);
  if (!enq) return null;
  enq.status = status;
  return enq;
}
