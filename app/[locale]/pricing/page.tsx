import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getRequestSiteId, loadPageContent } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import { Locale } from '@/lib/types';
import { Accordion, Badge } from '@/components/ui';

interface PricingPageData {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage?: string;
  };
  introduction: {
    text: string;
    note?: string;
  };
  individualTreatments: {
    title: string;
    subtitle?: string;
    items: Array<{
      name: string;
      description: string;
      price: string;
      duration: string;
      notes?: string | null;
    }>;
  };
  packages: {
    title: string;
    subtitle?: string;
    items: Array<{
      name: string;
      description: string;
      sessions: number;
      totalPrice: string;
      perSessionPrice: string;
      regularPrice?: string;
      savings?: string;
      popular?: boolean;
      includes: string[];
      bestFor?: string;
    }>;
  };
  insurance: {
    title: string;
    acceptedInsurance: string[];
    insuranceInfo: {
      title: string;
      description: string;
      whatToAsk: string[];
      weProvide: string[];
    };
    paymentMethods: {
      title: string;
      methods: string[];
    };
    hsa?: {
      title: string;
      description: string;
    };
  };
  policies?: {
    title: string;
    cancellation?: { title: string; policy: string };
    packages?: { title: string; policy: string };
    lateArrival?: { title: string; policy: string };
    newPatients?: { title: string; policy: string };
  };
  faq: {
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
}

interface PricingPageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params }: PricingPageProps): Promise<Metadata> {
  const { locale } = params;
  const siteId = await getRequestSiteId();
  const content = await loadPageContent<PricingPageData>('pricing', locale, siteId);

  return buildPageMetadata({
    siteId,
    locale,
    slug: 'pricing',
    title: content?.hero?.title,
    description: content?.hero?.subtitle || content?.introduction?.text,
  });
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = params;
  const siteId = await getRequestSiteId();
  const content = await loadPageContent<PricingPageData>('pricing', locale, siteId);

  if (!content) {
    notFound();
  }

  const {
    hero,
    introduction,
    individualTreatments,
    packages,
    insurance,
    policies,
    faq,
  } = content;

  return (
    <main className="min-h-screen bg-[color-mix(in_srgb,var(--backdrop-primary)_30%,white)]">
      <section className="relative bg-gradient-to-br from-[var(--backdrop-primary)] via-[var(--backdrop-secondary)] to-[var(--backdrop-primary)] pt-28 md:pt-32 pb-16 md:pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary-100 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-secondary-50 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-display font-bold text-gray-900">
                {hero.title}
              </h1>
              <p className="text-subheading text-gray-600 mt-3">{hero.subtitle}</p>
              <div className="mt-6 text-gray-700">
                <p className="text-lg leading-relaxed">{introduction.text}</p>
                {introduction.note && (
                  <p className="text-sm text-gray-500 mt-3">{introduction.note}</p>
                )}
              </div>
            </div>
            {hero.backgroundImage && (
              <div className="lg:pl-6">
                <div className="rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src={hero.backgroundImage}
                    alt={hero.title}
                    width={1600}
                    height={900}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pt-10 md:pt-14 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-heading font-bold text-center mb-2">
            {individualTreatments.title}
          </h2>
          {individualTreatments.subtitle && (
            <p className="text-center text-gray-600 mb-8">
              {individualTreatments.subtitle}
            </p>
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {individualTreatments.items.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-subheading font-bold mb-2">{item.name}</h3>
                <div className="text-heading font-bold text-[var(--primary)] mb-3">
                  {item.price}
                </div>
                <p className="text-gray-600 mb-4">{item.duration}</p>
                <p className="text-sm text-gray-700 mb-4">{item.description}</p>
                {item.notes && (
                  <p className="text-xs text-gray-500 italic">{item.notes}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-heading font-bold text-center mb-2">
            {packages.title}
          </h2>
          {packages.subtitle && (
            <p className="text-center text-gray-600 mb-8">{packages.subtitle}</p>
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.items.map((pkg, index) => (
              <div
                key={`${pkg.name}-${index}`}
                className={`rounded-2xl border p-6 ${
                  pkg.popular
                    ? 'border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_6%,white)] shadow-md'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {pkg.popular && (
                  <Badge variant="primary" className="mb-3">
                    Most Popular
                  </Badge>
                )}
                <h3 className="text-subheading font-bold mb-1">{pkg.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                <div className="text-heading font-bold text-[var(--primary)]">
                  {pkg.totalPrice}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {pkg.sessions} sessions · {pkg.perSessionPrice} / session
                </div>
                {pkg.savings && (
                  <div className="text-xs text-gray-500 mb-4">
                    Save {pkg.savings} {pkg.regularPrice ? `· Regular ${pkg.regularPrice}` : ''}
                  </div>
                )}
                <ul className="space-y-2 text-sm text-gray-700 mb-4">
                  {pkg.includes.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
                {pkg.bestFor && (
                  <p className="text-xs text-gray-500">Best for: {pkg.bestFor}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-heading font-bold text-center mb-8">
            {insurance.title}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-subheading mb-3">
                {insurance.insuranceInfo.title}
              </h3>
              <p className="text-gray-700 mb-4">{insurance.insuranceInfo.description}</p>
              <div className="text-sm text-gray-700 space-y-2">
                <div className="font-semibold">What to ask</div>
                <ul className="space-y-1">
                  {insurance.insuranceInfo.whatToAsk.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="text-sm text-gray-700 space-y-2 mt-4">
                <div className="font-semibold">We provide</div>
                <ul className="space-y-1">
                  {insurance.insuranceInfo.weProvide.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-subheading mb-3">
                  {insurance.paymentMethods.title}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {insurance.paymentMethods.methods.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
              {insurance.hsa && (
                <div className="bg-[color-mix(in_srgb,var(--primary)_10%,white)] border border-[color-mix(in_srgb,var(--primary)_20%,white)] rounded-2xl p-6">
                  <h3 className="font-bold text-subheading mb-2">{insurance.hsa.title}</h3>
                  <p className="text-sm text-gray-700">{insurance.hsa.description}</p>
                </div>
              )}
              {insurance.acceptedInsurance?.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-subheading mb-3">Accepted Insurance</h3>
                  <div className="flex flex-wrap gap-2">
                    {insurance.acceptedInsurance.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-gray-600 bg-gray-100 rounded-full px-3 py-1"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {policies && (
        <section className="pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-heading font-bold text-center mb-8">
              {policies.title}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {policies.cancellation && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-subheading mb-2">
                    {policies.cancellation.title}
                  </h3>
                  <p className="text-sm text-gray-700">{policies.cancellation.policy}</p>
                </div>
              )}
              {policies.packages && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-subheading mb-2">
                    {policies.packages.title}
                  </h3>
                  <p className="text-sm text-gray-700">{policies.packages.policy}</p>
                </div>
              )}
              {policies.lateArrival && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-subheading mb-2">
                    {policies.lateArrival.title}
                  </h3>
                  <p className="text-sm text-gray-700">{policies.lateArrival.policy}</p>
                </div>
              )}
              {policies.newPatients && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-subheading mb-2">
                    {policies.newPatients.title}
                  </h3>
                  <p className="text-sm text-gray-700">{policies.newPatients.policy}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-heading font-bold text-center mb-8">
            {faq.title}
          </h2>
          <Accordion
            items={faq.items.map((item, index) => ({
              id: `faq-${index}`,
              title: item.question,
              content: item.answer,
            }))}
            allowMultiple
          />
        </div>
      </section>
    </main>
  );
}
