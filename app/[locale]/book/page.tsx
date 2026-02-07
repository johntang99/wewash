import type { Metadata } from 'next';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { BookingLookup } from '@/components/booking/BookingLookup';
import { getRequestSiteId } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import { Locale } from '@/lib/types';

interface BookingPageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params }: BookingPageProps): Promise<Metadata> {
  const siteId = await getRequestSiteId();
  return buildPageMetadata({
    siteId,
    locale: params.locale,
    slug: 'book',
    title: params.locale === 'en' ? 'Book an Appointment' : '预约',
    description:
      params.locale === 'en'
        ? 'Schedule your visit with our clinic in a few simple steps.'
        : '轻松几步预约您的到访。',
  });
}

export default function BookingPage({ params }: BookingPageProps) {
  const { locale } = params;

  return (
    <main className="bg-gray-50">
      <section className="pt-20 md:pt-24 pb-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-display font-bold text-gray-900">
              {locale === 'en' ? 'Book an Appointment' : '预约就诊'}
            </h1>
            <p className="text-subheading text-gray-600 mt-3">
              {locale === 'en'
                ? 'Choose a service, select a time, and confirm your visit.'
                : '选择服务、预约时间、确认就诊。'}
            </p>
          </div>
          <BookingWidget locale={locale} />
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <BookingLookup locale={locale} />
        </div>
      </section>
    </main>
  );
}
