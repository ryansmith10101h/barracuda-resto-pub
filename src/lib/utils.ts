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
 * Single trusted source of truth for Barracuda Resto Pub operating hours:
 * Monday to Saturday: 10:00 AM to 12:00 AM (Midnight)
 * Sunday: 12:00 PM to 12:00 AM (Midnight)
 */
export const OFFICIAL_OPERATING_HOURS = [
  {
    day: 'Monday – Saturday',
    hours: '10:00 AM – 12:00 AM',
    note: 'Rooftop restaurant, seafood grills & pub service',
  },
  {
    day: 'Sunday',
    hours: '12:00 PM – 12:00 AM',
    note: 'Afternoon & evening rooftop dining',
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
 * strictly computed from Africa/Lagos (WAT, UTC+1) timezone.
 * Schedule:
 * - Mon - Sat: 10:00 AM - 12:00 AM (Midnight)
 * - Sun: 12:00 PM - 12:00 AM (Midnight)
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
    const weekday = parts.find((p) => p.type === 'weekday')?.value || 'Mon';
    const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '12', 10);
    const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
    const currentMins = hour * 60 + minute;

    // Sunday logic: 12:00 PM (720 mins) to 12:00 AM (1440 mins)
    if (weekday === 'Sun') {
      if (currentMins >= 720 && currentMins < 1440) {
        return {
          isOpen: true,
          statusText: 'Open Now • Closes at 12:00 AM (Midnight)',
          badgeLabel: 'Open Now',
          currentDayName: 'Sunday',
          closingTime: '12:00 AM',
        };
      } else {
        return {
          isOpen: false,
          statusText: 'Sunday Hours: Opens at 12:00 PM (WAT)',
          badgeLabel: 'Opens at 12:00 PM',
          currentDayName: 'Sunday',
        };
      }
    }

    // Monday through Saturday: 10:00 AM (600 mins) to 12:00 AM (1440 mins)
    if (currentMins >= 600 && currentMins < 1440) {
      return {
        isOpen: true,
        statusText: 'Open Now • Closes at 12:00 AM (Midnight)',
        badgeLabel: 'Open Now',
        currentDayName: weekday,
        closingTime: '12:00 AM',
      };
    } else {
      return {
        isOpen: false,
        statusText: 'Doors Open at 10:00 AM (WAT)',
        badgeLabel: 'Opens at 10:00 AM',
        currentDayName: weekday,
      };
    }
  } catch {
    return {
      isOpen: false,
      statusText: 'Mon–Sat: 10:00 AM–12:00 AM • Sun: 12:00 PM–12:00 AM',
      badgeLabel: 'Wuse 2, Abuja',
      currentDayName: 'Abuja',
    };
  }
}
