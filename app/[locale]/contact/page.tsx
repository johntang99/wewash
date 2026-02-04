import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRequestSiteId, loadPageContent } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import { Locale } from '@/lib/types';
import { Button, Badge, Icon, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';
import ContactForm from '@/components/ContactForm';

interface ContactPageContent {
  hero: { title: string; subtitle: string; backgroundImage?: string };
  introduction: { text: string };
  contactMethods: Array<{
    icon: string;
    title: string;
    primary: string;
    secondary: string | null;
    description: string;
    action: { text: string; link: string };
  }>;
  hours: {
    title: string;
    schedule: Array<{ day: string; time: string; isOpen: boolean; note?: string }>;
    note: string;
  };
  form: {
    title: string;
    subtitle: string;
    fields: {
      name: { label: string; placeholder: string; required: boolean };
      email: { label: string; placeholder: string; required: boolean };
      phone: { label: string; placeholder: string; required: boolean };
      reason: { label: string; placeholder: string; required: boolean; options: string[] };
      message: { label: string; placeholder: string; required: boolean };
    };
    submitButton: { text: string };
    successMessage: string;
    errorMessage: string;
  };
  map: {
    title: string;
    embedUrl: string;
    showMap: boolean;
    directions: string;
  };
  emergency: {
    title: string;
    message: string;
    phone: string;
    visible: boolean;
  };
  faq: {
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
}

interface ContactPageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = params;
  const siteId = await getRequestSiteId();
  const content = await loadPageContent<ContactPageContent>('contact', locale, siteId);

  return buildPageMetadata({
    siteId,
    locale,
    slug: 'contact',
    title: content?.hero?.title,
    description: content?.hero?.subtitle || content?.introduction?.text,
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = params;
  
  // Load page content
  const siteId = await getRequestSiteId();
  const content = await loadPageContent<ContactPageContent>('contact', locale, siteId);
  
  if (!content) {
    notFound();
  }

  const { hero, introduction, contactMethods, hours, form, map, emergency, faq } = content;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-backdrop-primary to-primary/5 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display font-bold text-gray-900 mb-6">
              {hero.title}
            </h1>
            <p className="text-subheading text-gray-600">
              {hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700">
              {introduction.text}
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      {emergency.visible && (
        <section className="py-6 bg-red-50 border-y border-red-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex items-start gap-4">
              <Icon name="AlertTriangle" className="text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">{emergency.title}</h3>
                <p className="text-red-800 text-sm">
                  {emergency.message}
                </p>
              </div>
            </div>
          </div>
      </section>
      )}

      {/* Contact Methods */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-backdrop-secondary to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon name={method.icon as any} className="text-primary" size="lg" />
                    </div>
                    <CardTitle>{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary mb-1">{method.primary}</p>
                    {method.secondary && (
                      <p className="text-gray-600 mb-4">{method.secondary}</p>
                    )}
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href={method.action.link} target={method.icon === 'MapPin' ? '_blank' : undefined} rel={method.icon === 'MapPin' ? 'noopener noreferrer' : undefined}>
                        {method.action.text}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Hours of Operation */}
            <Card className="mb-16">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon name="Clock" className="text-primary" />
                  </div>
                  <div>
                    <CardTitle>{hours.title}</CardTitle>
                    <CardDescription>{hours.note}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {hours.schedule.map((schedule) => (
                    <div key={schedule.day} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-semibold text-gray-900">{schedule.day}</span>
                        {schedule.note && (
                          <p className="text-xs text-primary mt-1">{schedule.note}</p>
                        )}
                      </div>
                      <span className={schedule.isOpen ? 'text-gray-600' : 'text-gray-400'}>
                        {schedule.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-heading font-bold text-gray-900 mb-4">
                  {form.title}
                </h2>
                <p className="text-gray-600 mb-8">
                  {form.subtitle}
                </p>

                <ContactForm 
                  formConfig={form}
                  locale={locale}
                />
              </div>

              {/* Map & Quick Answers */}
              <div className="space-y-8">
                {/* Map */}
                {map.showMap && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{map.title}</h3>
                    <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
                      {/* Placeholder for Google Maps */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon name="MapPin" size="xl" className="text-gray-300" />
                      </div>
                      {/* In production: <iframe src={map.embedUrl} ... /> */}
                    </div>
                    <p className="text-sm text-gray-600">
                      {map.directions}
                    </p>
                  </div>
                )}

                {/* Quick Answers */}
                <Card>
                  <CardHeader>
                    <CardTitle>{faq.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {faq.items.map((item, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.question}</h4>
                        <p className="text-gray-600 text-sm">{item.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-heading text-white mb-4">
            {locale === 'en' ? 'New to TCM?' : '新手指南'}
          </h2>
          <p className="text-subheading mb-10 leading-relaxed max-w-3xl mx-auto text-white/95">
            {locale === 'en' ? 'Learn what to expect during your first visit' : '了解您的首次就诊'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/new-patients`}
              className="bg-white text-[var(--primary)] px-8 py-4 rounded-lg hover:bg-gray-50 font-semibold text-subheading transition-all shadow-lg"
            >
              {locale === 'en' ? 'New Patient Information' : '新患者信息'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
