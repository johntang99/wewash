'use client';

import { useEffect, useMemo, useState } from 'react';
import type { BookingService } from '@/lib/types';
import { Button } from '@/components/ui';

interface BookingWidgetProps {
  locale: 'en' | 'zh';
}

interface BookingForm {
  name: string;
  phone: string;
  email: string;
  note: string;
}

export function BookingWidget({ locale }: BookingWidgetProps) {
  const [services, setServices] = useState<BookingService[]>([]);
  const [selectedService, setSelectedService] = useState<BookingService | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [form, setForm] = useState<BookingForm>({
    name: '',
    phone: '',
    email: '',
    note: '',
  });
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadServices = async () => {
      const response = await fetch('/api/booking/services');
      if (!response.ok) return;
      const payload = await response.json();
      setServices(payload.services || []);
    };
    loadServices();
  }, []);

  useEffect(() => {
    const loadSlots = async () => {
      if (!selectedService || !selectedDate) return;
      setLoading(true);
      setStatus(null);
      try {
        const response = await fetch(
          `/api/booking/slots?serviceId=${selectedService.id}&date=${selectedDate}`
        );
        if (!response.ok) {
          const payload = await response.json();
          throw new Error(payload.message || 'Failed to load time slots');
        }
        const payload = await response.json();
        setSlots(payload.slots || []);
      } catch (error: any) {
        setStatus(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadSlots();
  }, [selectedService, selectedDate]);

  const canProceedToDetails = selectedService && selectedDate && selectedTime;
  const isFormComplete = form.name && form.phone && form.email;

  const summary = useMemo(() => {
    if (!selectedService) return null;
    return {
      service: selectedService.name,
      duration: `${selectedService.durationMinutes} min`,
      date: selectedDate,
      time: selectedTime,
    };
  }, [selectedService, selectedDate, selectedTime]);

  const handleSubmit = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !isFormComplete) return;
    setLoading(true);
    setStatus(null);
    try {
      const response = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: selectedService.id,
          date: selectedDate,
          time: selectedTime,
          ...form,
        }),
      });
      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.message || 'Booking failed');
      }
      setStep(4);
    } catch (error: any) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[2.2fr,1fr]">
      <div className="space-y-8">
        <div className="bg-white/95 border border-gray-200/80 rounded-3xl p-8 space-y-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <span className="w-6 h-6 rounded-full bg-[color-mix(in_srgb,var(--primary)_12%,white)] text-[var(--primary)] flex items-center justify-center text-xs font-bold">
                  1
                </span>
                {locale === 'en' ? 'Step 1' : '第1步'}
              </div>
              <h2 className="text-heading font-semibold text-gray-900 mt-2">
                {locale === 'en' ? 'Choose a Service' : '选择服务'}
              </h2>
            </div>
            <div className="text-xs text-gray-500">
              {locale === 'en' ? 'Select treatment type' : '选择服务类型'}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => {
                  setSelectedService(service);
                  setStep(2);
                }}
                className={`rounded-2xl border px-4 py-4 text-left transition group ${
                  selectedService?.id === service.id
                    ? 'border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_8%,white)] shadow-[0_6px_20px_rgba(15,23,42,0.08)]'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="text-sm font-semibold text-gray-900 group-hover:text-gray-800">
                  {service.name}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {service.durationMinutes} min
                  {service.price ? ` · $${service.price}` : ''}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/95 border border-gray-200/80 rounded-3xl p-8 space-y-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <span className="w-6 h-6 rounded-full bg-[color-mix(in_srgb,var(--primary)_12%,white)] text-[var(--primary)] flex items-center justify-center text-xs font-bold">
                  2
                </span>
                {locale === 'en' ? 'Step 2' : '第2步'}
              </div>
              <h2 className="text-heading font-semibold text-gray-900 mt-2">
                {locale === 'en' ? 'Select Date & Time' : '选择日期和时间'}
              </h2>
            </div>
            <div className="text-xs text-gray-500">
              {locale === 'en' ? 'Pick an open slot' : '选择可用时段'}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs text-gray-500">
                {locale === 'en' ? 'Date' : '日期'}
              </label>
              <input
                type="date"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_20%,transparent)]"
                value={selectedDate}
                onChange={(event) => {
                  setSelectedDate(event.target.value);
                  setSelectedTime('');
                  setStep(2);
                }}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">
                {locale === 'en' ? 'Time' : '时间'}
              </label>
              <div className="mt-1 grid grid-cols-2 gap-3">
                {slots.length === 0 && selectedDate && (
                  <div className="col-span-2 rounded-xl border border-dashed border-gray-200 px-3 py-4 text-xs text-gray-500 text-center">
                    {locale === 'en' ? 'No slots available.' : '暂无可选时间。'}
                  </div>
                )}
                {slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      setSelectedTime(slot);
                      setStep(3);
                    }}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                      selectedTime === slot
                        ? 'border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_10%,white)] shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {status && (
            <div className="text-sm text-red-500">{status}</div>
          )}
        </div>

        <div className="bg-white/95 border border-gray-200/80 rounded-3xl p-8 space-y-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <span className="w-6 h-6 rounded-full bg-[color-mix(in_srgb,var(--primary)_12%,white)] text-[var(--primary)] flex items-center justify-center text-xs font-bold">
                  3
                </span>
                {locale === 'en' ? 'Step 3' : '第3步'}
              </div>
              <h2 className="text-heading font-semibold text-gray-900 mt-2">
                {locale === 'en' ? 'Your Details' : '填写信息'}
              </h2>
            </div>
            <div className="text-xs text-gray-500">
              {locale === 'en' ? 'Required fields' : '必填信息'}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs text-gray-500">
                {locale === 'en' ? 'Full name' : '姓名'}
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_20%,transparent)]"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">
                {locale === 'en' ? 'Phone number' : '电话'}
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_20%,transparent)]"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-500">
                {locale === 'en' ? 'Email address' : '邮箱'}
              </label>
              <input
                type="email"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_20%,transparent)]"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-500">
                {locale === 'en' ? 'Note (optional)' : '备注（可选）'}
              </label>
              <textarea
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_20%,transparent)]"
                rows={3}
                value={form.note}
                onChange={(event) => setForm({ ...form, note: event.target.value })}
                placeholder={
                  locale === 'en'
                    ? 'Let us know anything important before your visit.'
                    : '如有特别说明，请在此留言。'
                }
              />
            </div>
          </div>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceedToDetails || !isFormComplete || loading}
          >
            {locale === 'en' ? 'Confirm Booking' : '确认预约'}
          </Button>
        </div>

        {step === 4 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6">
            <div className="text-lg font-semibold text-emerald-900">
              {locale === 'en' ? 'Booking confirmed!' : '预约成功！'}
            </div>
            <p className="text-sm text-emerald-700 mt-2">
              {locale === 'en'
                ? 'We have emailed your confirmation. You can manage your booking below.'
                : '我们已发送确认邮件，您可以在下方管理预约。'}
            </p>
          </div>
        )}
      </div>

      <div className="bg-white/95 border border-gray-200/80 rounded-3xl p-6 h-fit shadow-[0_12px_30px_rgba(15,23,42,0.08)] lg:sticky lg:top-28">
        <div className="text-sm font-semibold text-gray-900 mb-4">
          {locale === 'en' ? 'Booking Summary' : '预约摘要'}
        </div>
        {summary ? (
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>{locale === 'en' ? 'Service' : '服务'}</span>
              <span className="font-medium text-gray-900">{summary.service}</span>
            </div>
            <div className="flex justify-between">
              <span>{locale === 'en' ? 'Duration' : '时长'}</span>
              <span className="font-medium text-gray-900">{summary.duration}</span>
            </div>
            <div className="flex justify-between">
              <span>{locale === 'en' ? 'Date' : '日期'}</span>
              <span className="font-medium text-gray-900">{summary.date || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span>{locale === 'en' ? 'Time' : '时间'}</span>
              <span className="font-medium text-gray-900">{summary.time || '-'}</span>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            {locale === 'en'
              ? 'Select a service to get started.'
              : '请选择服务开始预约。'}
          </div>
        )}
      </div>
    </div>
  );
}
