import { BookingsManager } from '@/components/admin/BookingsManager';
import { getSites } from '@/lib/sites';

export default async function AdminBookingsPage() {
  const sites = await getSites();
  const selectedSiteId = sites[0]?.id || '';
  return <BookingsManager sites={sites} selectedSiteId={selectedSiteId} />;
}
