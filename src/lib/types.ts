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
  time: string; // e.g. "8:00 PM till Late"
  description: string;
  coverImage: string;
  dressCode?: string;
  entryType: 'Free Entry' | 'Table Reservation' | 'Ticketed RSVP';
  ticketPrice?: number;
  status: 'upcoming' | 'ongoing' | 'past';
  featured?: boolean;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: 'Ambiance & VIP' | 'Culinary & Grills' | 'Mixology & Bar' | 'Weekend Energy';
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
  occasion?: 'Casual Night Out' | 'Birthday Celebration' | 'Date Night' | 'Corporate Dinner' | 'After-Work Drinks';
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
