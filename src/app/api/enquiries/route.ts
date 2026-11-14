import { NextResponse } from 'next/server';
import { createEnquiry, getEnquiries } from '@/lib/store';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const authHeader = request.headers.get('x-admin-passcode');
  const expectedPasscode = process.env.ADMIN_PASSCODE || 'barracuda_abuja_2026';

  if (authHeader !== expectedPasscode) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return NextResponse.json({ enquiries: data });
      }
    }

    return NextResponse.json({ enquiries: getEnquiries() });
  } catch {
    return NextResponse.json({ enquiries: getEnquiries() });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
    }
    if (!phone || phone.trim().length < 8) {
      return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (!message || message.trim().length < 5) {
      return NextResponse.json({ error: 'Please write a brief message or question.' }, { status: 400 });
    }

    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.from('enquiries').insert([
          {
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim().toLowerCase(),
            subject: (subject || 'General Enquiry').trim(),
            message: message.trim(),
            status: 'new',
          },
        ]);
      }
    } catch (sbErr) {
      console.warn('Supabase enquiry fallback notice:', sbErr);
    }

    const enquiry = createEnquiry({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      subject: (subject || 'General Enquiry').trim(),
      message: message.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for reaching out to Barracuda Resto Pub. We will get back to you shortly.',
        enquiry,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Enquiry API error:', err);
    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please reach out to us directly via WhatsApp or phone.' },
      { status: 500 }
    );
  }
}
