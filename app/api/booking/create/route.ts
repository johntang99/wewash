import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import { getRequestSiteId } from '@/lib/content';
import { generateAvailableSlots, isDateWithinRange } from '@/lib/booking/availability';
import {
  addBooking,
  listBookings,
  loadBookingServices,
  loadBookingSettings,
} from '@/lib/booking/storage';
import { sendBookingEmails } from '@/lib/booking/email';
import { sendBookingSms } from '@/lib/booking/sms';
import type { BookingRecord } from '@/lib/types';

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const { serviceId, date, time, name, phone, email, note } = payload || {};

  if (!serviceId || !date || !time || !name || !phone || !email) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const siteId = await getRequestSiteId();
  const [services, settings] = await Promise.all([
    loadBookingServices(siteId),
    loadBookingSettings(siteId),
  ]);

  if (!settings) {
    return NextResponse.json({ message: 'Booking settings not configured' }, { status: 400 });
  }

  const service = services.find((item) => item.id === serviceId);
  if (!service || service.active === false) {
    return NextResponse.json({ message: 'Service not available' }, { status: 400 });
  }

  if (!isDateWithinRange({ date, settings })) {
    return NextResponse.json({ message: 'Date is outside booking window' }, { status: 400 });
  }

  const bookings = await listBookings(siteId, date, date);
  const slots = generateAvailableSlots({
    date,
    service,
    settings,
    bookings,
  });

  if (!slots.includes(time)) {
    return NextResponse.json({ message: 'Time slot is no longer available' }, { status: 409 });
  }

  const now = new Date().toISOString();
  const booking: BookingRecord = {
    id: `bk_${uuid()}`,
    siteId,
    serviceId,
    date,
    time,
    durationMinutes: service.durationMinutes,
    name,
    phone,
    email,
    note: typeof note === 'string' ? note : undefined,
    status: 'confirmed',
    createdAt: now,
    updatedAt: now,
  };

  await addBooking(siteId, booking);
  await sendBookingEmails({
    booking,
    service,
    subject: 'Your booking is confirmed',
    message: 'Thank you for booking with us. Here are your appointment details:',
    adminRecipients: settings.notificationEmails || [],
  });
  await sendBookingSms({
    booking,
    service,
    message: 'Your booking is confirmed.',
    adminRecipients: settings.notificationPhones || [],
  });

  return NextResponse.json({ booking });
}
