import { BookingSettingsManager } from '@/components/admin/BookingSettingsManager';
import { getSites } from '@/lib/sites';

export default async function AdminBookingSettingsPage() {
  const sites = await getSites();
  const selectedSiteId = sites[0]?.id || '';
  return <BookingSettingsManager sites={sites} selectedSiteId={selectedSiteId} />;
}
