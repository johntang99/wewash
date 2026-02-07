'use client';

import { useEffect, useState } from 'react';
import type { BookingRecord, BookingStatus, SiteConfig } from '@/lib/types';
import { Button } from '@/components/ui';

interface BookingsManagerProps {
  sites: SiteConfig[];
  selectedSiteId: string;
}

const STATUS_OPTIONS: BookingStatus[] = ['confirmed', 'rescheduled', 'cancelled'];

function getDateOffset(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export function BookingsManager({ sites, selectedSiteId }: BookingsManagerProps) {
  const [siteId, setSiteId] = useState(selectedSiteId);
  const [from, setFrom] = useState(getDateOffset(0));
  const [to, setTo] = useState(getDateOffset(30));
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [drafts, setDrafts] = useState<Record<string, BookingRecord>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadBookings = async () => {
    if (!siteId) return;
    setLoading(true);
    setStatus(null);
    try {
      const response = await fetch(
        `/api/admin/bookings?siteId=${siteId}&from=${from}&to=${to}`
      );
      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.message || 'Failed to load bookings');
      }
      const payload = await response.json();
      setBookings(payload.bookings || []);
    } catch (error: any) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [siteId, from, to]);

  useEffect(() => {
    const nextDrafts: Record<string, BookingRecord> = {};
    bookings.forEach((booking) => {
      nextDrafts[booking.id] = { ...booking };
    });
    setDrafts(nextDrafts);
  }, [bookings]);

  const updateDraft = (id: string, updates: Partial<BookingRecord>) => {
    setDrafts((current) => ({
      ...current,
      [id]: { ...current[id], ...updates },
    }));
  };

  const saveBooking = async (id: string) => {
    const draft = drafts[id];
    if (!draft) return;
    const response = await fetch(`/api/admin/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        siteId,
        booking: { ...draft, updatedAt: new Date().toISOString() },
        originalDate: bookings.find((item) => item.id === id)?.date || '',
      }),
    });
    if (!response.ok) {
      const payload = await response.json();
      setStatus(payload.message || 'Save failed');
      return;
    }
    setStatus('Saved');
    await loadBookings();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
          <p className="text-sm text-gray-600">Review and manage client bookings.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 sm:items-end">
          <div>
            <label className="block text-xs font-medium text-gray-500">Site</label>
            <select
              className="mt-1 rounded-md border border-gray-200 px-3 py-2 text-sm"
              value={siteId}
              onChange={(event) => setSiteId(event.target.value)}
            >
              {sites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">From</label>
            <input
              type="date"
              className="mt-1 rounded-md border border-gray-200 px-3 py-2 text-sm"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">To</label>
            <input
              type="date"
              className="mt-1 rounded-md border border-gray-200 px-3 py-2 text-sm"
              value={to}
              onChange={(event) => setTo(event.target.value)}
            />
          </div>
        </div>
      </div>

      {status && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
          {status}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        {loading && <div className="text-sm text-gray-500">Loading...</div>}
        {!loading && bookings.length === 0 && (
          <div className="text-sm text-gray-500">No bookings found.</div>
        )}
        {!loading && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const draft = drafts[booking.id];
              if (!draft) return null;
              return (
                <div key={booking.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {draft.name} · {draft.serviceId}
                      </div>
                      <div className="text-xs text-gray-500">
                        {draft.email} · {draft.phone}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">ID: {draft.id}</div>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-4">
                    <div>
                      <label className="block text-xs text-gray-500">Date</label>
                      <input
                        type="date"
                        className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                        value={draft.date}
                        onChange={(event) => updateDraft(draft.id, { date: event.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">Time</label>
                      <input
                        type="time"
                        className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                        value={draft.time}
                        onChange={(event) => updateDraft(draft.id, { time: event.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">Status</label>
                      <select
                        className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                        value={draft.status}
                        onChange={(event) =>
                          updateDraft(draft.id, { status: event.target.value as BookingStatus })
                        }
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-end">
                      <Button type="button" onClick={() => saveBooking(draft.id)}>
                        Save
                      </Button>
                    </div>
                  </div>
                  {draft.note && (
                    <div className="mt-3 text-sm text-gray-600">
                      <span className="font-semibold text-gray-700">Note:</span> {draft.note}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
