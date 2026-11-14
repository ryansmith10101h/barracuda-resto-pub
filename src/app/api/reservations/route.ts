import { NextResponse } from 'next/server';
import { createReservation, getReservations } from '@/lib/store';
import { createClient } from '@/lib/supabase/server';
import { generateBookingRef, getWhatsAppUrl } from '@/lib/utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('x-admin-passcode');
  const queryPasscode = searchParams.get('passcode');
  const expectedPasscode = process.env.ADMIN_PASSCODE || 'barracuda_abuja_2026';

  if (authHeader !== expectedPasscode && queryPasscode !== expectedPasscode) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return NextResponse.json({ reservations: data });
      }
    }

    return NextResponse.json({ reservations: getReservations() });
  } catch {
    return NextResponse.json({ reservations: getReservations() });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, date, time, guestsCount, seatingArea, occasion, specialRequests } = body;

    // Strict validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please provide a valid full name.' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
      return NextResponse.json({ error: 'Please provide a valid Nigerian contact phone number.' }, { status: 400 });
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!date) {
      return NextResponse.json({ error: 'Please select a reservation date.' }, { status: 400 });
    }

    if (!time) {
      return NextResponse.json({ error: 'Please select a preferred seating time.' }, { status: 400 });
    }

    const guests = parseInt(guestsCount, 10);
    if (isNaN(guests) || guests < 1 || guests > 50) {
      return NextResponse.json({ error: 'Number of guests must be between 1 and 50.' }, { status: 400 });
    }

    const bookingRef = generateBookingRef();

    // 1. Attempt Supabase insertion if configured
    try {
      const supabase = createClient();
      if (supabase) {
        const { error: dbError } = await supabase.from('reservations').insert([
          {
            booking_ref: bookingRef,
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim().toLowerCase(),
            date,
            time,
            guests_count: guests,
            seating_area: seatingArea || 'Main Lounge',
            occasion: occasion || 'Casual Night Out',
            special_requests: specialRequests?.trim() || null,
            status: 'pending',
          },
        ]);

        if (dbError) {
          console.warn('Supabase reservation insert notice:', dbError.message);
        }
      }
    } catch (sbErr) {
      console.warn('Supabase fallback activated:', sbErr);
    }

    // 2. Persist in runtime store
    const reservation = createReservation({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      date,
      time,
      guestsCount: guests,
      seatingArea,
      occasion,
      specialRequests: specialRequests?.trim(),
    });

    // Generate WhatsApp direct confirmation link for customer convenience
    const businessWhatsApp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '2349122356336';
    const waText = `Hello Barracuda Resto Pub, I just submitted a table reservation online.\n\nBooking Ref: ${reservation.bookingRef}\nName: ${name}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\nArea: ${seatingArea}\nOccasion: ${occasion || 'Casual'}\n\nPlease confirm my reservation. Thank you!`;
    const whatsappUrl = getWhatsAppUrl(businessWhatsApp, waText);

    return NextResponse.json(
      {
        success: true,
        message: 'Your reservation enquiry has been received. Our team will confirm shortly.',
        reservation,
        whatsappConfirmationUrl: whatsappUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Reservation API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your reservation. Please call us or WhatsApp directly.' },
      { status: 500 }
    );
  }
}
