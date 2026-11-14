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
  // Ensure numeric without leading + or symbols
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
 * Check if the venue is currently open according to West Africa Time (WAT)
 */
export function getIsOpenNow(): { isOpen: boolean; statusText: string } {
  try {
    const now = new Date();
    // Nigeria is UTC+1 (WAT)
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Africa/Lagos',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      weekday: 'short',
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(now);
    const hourPart = parts.find((p) => p.type === 'hour')?.value;
    const hour = hourPart ? parseInt(hourPart, 10) : 18;

    // Barracuda operates Tue-Sun from 4:00 PM (16:00) to 3:00 AM (03:00)
    // Monday open from 5:00 PM to 12:00 AM
    const isNightHours = hour >= 16 || hour < 4;

    if (isNightHours) {
      return {
        isOpen: true,
        statusText: 'Open Now — Cocktails, Grills & Nightlife',
      };
    } else {
      return {
        isOpen: false,
        statusText: 'Doors Open at 4:00 PM (WAT)',
      };
    }
  } catch {
    return {
      isOpen: true,
      statusText: 'Open Tuesday – Sunday from 4:00 PM',
    };
  }
}
