import { Resend } from 'resend';
import type { BookingRecord, BookingService } from '@/lib/types';

const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function formatBookingDetails(booking: BookingRecord, service?: BookingService) {
  return [
    `Service: ${service?.name || booking.serviceId}`,
    `Date: ${booking.date}`,
    `Time: ${booking.time}`,
    `Name: ${booking.name}`,
    `Phone: ${booking.phone}`,
    `Email: ${booking.email}`,
    booking.note ? `Note: ${booking.note}` : null,
    `Status: ${booking.status}`,
    `Booking ID: ${booking.id}`,
  ]
    .filter(Boolean)
    .join('\n');
}

export async function sendBookingEmails({
  booking,
  service,
  subject,
  message,
  adminRecipients,
}: {
  booking: BookingRecord;
  service?: BookingService;
  subject: string;
  message: string;
  adminRecipients?: string[];
}) {
  if (!resend || !resendFrom) return;

  const detailText = formatBookingDetails(booking, service);
  const body = `${message}\n\n${detailText}`;

  await resend.emails.send({
    from: resendFrom,
    to: booking.email,
    subject,
    text: body,
  });

  if (adminRecipients && adminRecipients.length > 0) {
    await resend.emails.send({
      from: resendFrom,
      to: adminRecipients,
      subject: `[Admin] ${subject}`,
      text: body,
    });
  }
}
