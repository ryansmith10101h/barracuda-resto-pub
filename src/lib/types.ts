export type MenuItem = {
  id: string;
  name: string;
  category: 'Grills & Suya' | 'Small Plates' | 'Main Meals' | 'Signature Cocktails' | 'Spirits & Champagne' | 'Beer & Refreshments';
  subCategory?: string;
  description: string;
  price: number; // in NGN (₦)
  isAvailable: boolean;
  isSpecial?: boolean;
  isSpicy?: boolean;
  imageUrl?: string;
  tags?: string[];
};

export type EventItem = {
  id: string;
  title: string;
  subtitle: string;
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  time: string; // e.g. "6:00 PM – 11:30 PM"
  startTime?: string;
  endTime?: string;
  description: string;
  coverImage: string;
  dressCode?: string;
  entryType: 'Free Entry' | 'Table Reservation' | 'Ticketed RSVP';
  ticketPrice?: number;
  status: 'upcoming' | 'ongoing' | 'past';
  featured?: boolean;
  isRecurring?: boolean; // Weekly residency vs special dated event
};

export type GalleryItem = {
  id: string;
  title: string;
  category: 'Food and Grills' | 'Cocktails' | 'Interior' | 'VIP Booths' | 'Outdoor Terrace' | 'Events and Nightlife';
  imageUrl: string;
  description?: string;
};

export type Reservation = {
  id: string;
  bookingRef: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guestsCount: number;
  seatingArea: 'Main Lounge' | 'VIP Booth' | 'Outdoor Terrace' | 'Bar Counter';
  occasion?: 'Casual Dining & Drinks' | 'Birthday Celebration' | 'Date Night' | 'Corporate Dinner' | 'Private Lounge Celebration';
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
};

export type ContactEnquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'reviewed' | 'resolved';
  createdAt: string;
};

export type BusinessInfo = {
  name: string;
  tagline: string;
  headline: string;
  subheadline: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  displayPhone: string;
  whatsapp: string;
  instagram: string;
  openingHours: {
    day: string;
    hours: string;
    kitchenCloses: string;
  }[];
  googleMapsUrl: string;
  aboutStory: string[];
};
