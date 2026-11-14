import { NextResponse } from 'next/server';
import {
  getReservations,
  updateReservationStatus,
  getEnquiries,
  updateEnquiryStatus,
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  getBusinessInfo,
  updateBusinessInfo,
} from '@/lib/store';

function verifyAuth(request: Request): boolean {
  const authHeader = request.headers.get('x-admin-passcode');
  const expected = process.env.ADMIN_PASSCODE || 'barracuda_abuja_2026';
  return authHeader === expected;
}

export async function GET(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    businessInfo: getBusinessInfo(),
    reservations: getReservations(),
    enquiries: getEnquiries(),
    menuItems: getMenuItems(),
    events: getEvents(),
  });
}

export async function POST(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, payload } = body;

    switch (action) {
      case 'update_reservation_status': {
        const { id, status } = payload;
        const updated = updateReservationStatus(id, status);
        return NextResponse.json({ success: true, updated });
      }

      case 'update_enquiry_status': {
        const { id, status } = payload;
        const updated = updateEnquiryStatus(id, status);
        return NextResponse.json({ success: true, updated });
      }

      case 'add_menu_item': {
        const created = addMenuItem(payload);
        return NextResponse.json({ success: true, item: created });
      }

      case 'update_menu_item': {
        const { id, updates } = payload;
        const updated = updateMenuItem(id, updates);
        return NextResponse.json({ success: true, item: updated });
      }

      case 'delete_menu_item': {
        const { id } = payload;
        const deleted = deleteMenuItem(id);
        return NextResponse.json({ success: true, deleted });
      }

      case 'add_event': {
        const created = addEvent(payload);
        return NextResponse.json({ success: true, event: created });
      }

      case 'update_event': {
        const { id, updates } = payload;
        const updated = updateEvent(id, updates);
        return NextResponse.json({ success: true, event: updated });
      }

      case 'delete_event': {
        const { id } = payload;
        const deleted = deleteEvent(id);
        return NextResponse.json({ success: true, deleted });
      }

      case 'update_business_info': {
        const updated = updateBusinessInfo(payload);
        return NextResponse.json({ success: true, businessInfo: updated });
      }

      default:
        return NextResponse.json({ error: 'Unknown admin action' }, { status: 400 });
    }
  } catch (err) {
    console.error('Admin POST error:', err);
    return NextResponse.json({ error: 'Failed to perform admin operation' }, { status: 500 });
  }
}
