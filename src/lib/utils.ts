import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Nigerian Naira (₦)
 */
export function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generate a friendly booking reference code (e.g. BCD-8392)
 */
export function generateBookingRef(): string {
  const prefix = 'BCD';
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${randomNum}`;
}

/**
 * Construct WhatsApp click-to-chat URL with pre-filled message
 */
export function getWhatsAppUrl(phone: string, text: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Construct Tel URL
 */
export function getTelUrl(phone: string): string {
  return `tel:${phone.replace(/\s+/g, '')}`;
}

/**
 * Single trusted source of truth for Barracuda Resto Pub operating hours
 */
export const OFFICIAL_OPERATING_HOURS = [
  {
    day: 'Tuesday – Thursday',
    hours: '4:00 PM – 2:00 AM',
    kitchen: 'Kitchen closes 1:00 AM',
  },
  {
    day: 'Friday & Saturday',
    hours: '4:00 PM – 4:00 AM',
    kitchen: 'Late shift • Kitchen closes 2:30 AM',
  },
  {
    day: 'Sunday Sessions',
    hours: '3:00 PM – 2:00 AM',
    kitchen: 'Kitchen closes 1:00 AM',
  },
  {
    day: 'Monday',
    hours: 'Private Bookings Only',
    kitchen: 'Advance reservations & buyouts only',
  },
];

export interface VenueStatus {
  isOpen: boolean;
  statusText: string;
  badgeLabel: string;
  currentDayName: string;
  closingTime?: string;
}

/**
 * Dynamically check if Barracuda Resto Pub is currently open
 * strictly computed from the Africa/Lagos (WAT, UTC+1) timezone.
 * Handles overnight shift crossovers (e.g., Saturday 2 AM belongs to Friday night's shift).
 */
export function getIsOpenNow(): VenueStatus {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Africa/Lagos',
      weekday: 'short', // Sun, Mon, Tue, Wed, Thu, Fri, Sat
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    const parts = formatter.formatToParts(now);
    const weekday = parts.find((p) => p.type === 'weekday')?.value || 'Tue';
    const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '18', 10);
    const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
    const currentMins = hour * 60 + minute;

    // Check A: Early morning carry-over from the PREVIOUS night's shift (00:00 to 04:00)
    // Friday night runs into Saturday until 04:00 (240 mins)
    // Saturday night runs into Sunday until 04:00 (240 mins)
    // Tue, Wed, Thu night run into Wed, Thu, Fri until 02:00 (120 mins)
    // Sunday night runs into Monday until 02:00 (120 mins)
    if (weekday === 'Sat' && currentMins < 240) {
      return {
        isOpen: true,
        statusText: 'Open Now • Friday Nightlife until 4:00 AM',
        badgeLabel: 'Open Now',
        currentDayName: 'Friday Night Shift',
        closingTime: '4:00 AM',
      };
    }

    if (weekday === 'Sun' && currentMins < 240) {
      return {
        isOpen: true,
        statusText: 'Open Now • Saturday Nightlife until 4:00 AM',
        badgeLabel: 'Open Now',
        currentDayName: 'Saturday Night Shift',
        closingTime: '4:00 AM',
      };
    }

    if ((weekday === 'Wed' || weekday === 'Thu' || weekday === 'Fri') && currentMins < 120) {
      return {
        isOpen: true,
        statusText: 'Open Now • Kitchen & Bar until 2:00 AM',
        badgeLabel: 'Open Now',
        currentDayName: 'Late Night Shift',
        closingTime: '2:00 AM',
      };
    }

    if (weekday === 'Mon' && currentMins < 120) {
      return {
        isOpen: true,
        statusText: 'Open Now • Sunday Chill Sessions until 2:00 AM',
        badgeLabel: 'Open Now',
        currentDayName: 'Sunday Night Shift',
        closingTime: '2:00 AM',
      };
    }

    // Check B: Today's scheduled shift starting in the afternoon/evening
    if (weekday === 'Mon') {
      return {
        isOpen: false,
        statusText: 'Closed Mondays • Available for Private Buyouts (Reopens Tue 4:00 PM)',
        badgeLabel: 'Private Events Only',
        currentDayName: 'Monday',
      };
    }

    if (weekday === 'Sun') {
      // Sunday: 3:00 PM (900 mins) to 2:00 AM
      if (currentMins >= 900) {
        return {
          isOpen: true,
          statusText: 'Open Now • Sunday Acoustic & Grills until 2:00 AM',
          badgeLabel: 'Open Now',
          currentDayName: 'Sunday',
          closingTime: '2:00 AM',
        };
      } else {
        return {
          isOpen: false,
          statusText: 'Sunday Sessions Open at 3:00 PM (WAT)',
          badgeLabel: 'Opens at 3:00 PM',
          currentDayName: 'Sunday',
        };
      }
    }

    if (weekday === 'Fri' || weekday === 'Sat') {
      // Fri & Sat: 4:00 PM (960 mins) to 4:00 AM
      if (currentMins >= 960) {
        return {
          isOpen: true,
          statusText: 'Open Now • Weekend Dining & Nightlife until 4:00 AM',
          badgeLabel: 'Open Now',
          currentDayName: weekday === 'Fri' ? 'Friday' : 'Saturday',
          closingTime: '4:00 AM',
        };
      } else {
        return {
          isOpen: false,
          statusText: 'Doors Open at 4:00 PM (WAT)',
          badgeLabel: 'Opens at 4:00 PM',
          currentDayName: weekday === 'Fri' ? 'Friday' : 'Saturday',
        };
      }
    }

    // Tue, Wed, Thu: 4:00 PM (960 mins) to 2:00 AM
    if (weekday === 'Tue' || weekday === 'Wed' || weekday === 'Thu') {
      if (currentMins >= 960) {
        return {
          isOpen: true,
          statusText: 'Open Now • Charcoal Grills & Cocktails until 2:00 AM',
          badgeLabel: 'Open Now',
          currentDayName: weekday,
          closingTime: '2:00 AM',
        };
      } else {
        return {
          isOpen: false,
          statusText: 'Doors Open Today at 4:00 PM (WAT)',
          badgeLabel: 'Opens at 4:00 PM',
          currentDayName: weekday,
        };
      }
    }

    return {
      isOpen: false,
      statusText: 'Doors Open Tuesday – Sunday from 4:00 PM (WAT)',
      badgeLabel: 'Opens at 4:00 PM',
      currentDayName: weekday,
    };
  } catch {
    return {
      isOpen: true,
      statusText: 'Open Tuesday – Sunday from 4:00 PM (WAT)',
      badgeLabel: 'Wuse 2, Abuja',
      currentDayName: 'Abuja',
    };
  }
}
