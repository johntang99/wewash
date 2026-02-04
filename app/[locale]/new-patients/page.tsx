import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRequestSiteId, loadPageContent } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import { Locale } from '@/lib/types';
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, Icon, Accordion } from '@/components/ui';

interface NewPatientsPageData {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage?: string;
  };
  introduction: {
    text: string;
    highlight: string;
  };
  whatToExpect: {
    title: string;
    subtitle: string;
    steps: Array<{
      number: number;
      icon: string;
      title: string;
      duration: string;
      description: string;
      details: string[];
    }>;
    totalDuration: string;
    note: string;
  };
  preparation: {
    title: string;
    subtitle: string;
    tips: Array<{
      icon: string;
      title: string;
      description: string;
      importance: string;
    }>;
  };
  whatToBring: {
    title: string;
    items: Array<{
      icon: string;
      item: string;
      description: string;
    }>;
  };
  downloadForms: {
    title: string;
    subtitle: string;
    forms: Array<{
      name: string;
      description: string;
      pages: string;
      fileUrl: string;
      required: boolean;
    }>;
    note: string;
  };
  insurance: {
    title: string;
    text: string;
    pricing: {
      initial: string;
      followUp: string;
      description: string;
    };
    link: {
      text: string;
      url: string;
    };
  };
  faq: {
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    primaryCta: {
      text: string;
      link: string;
    };
    secondaryCta: {
      text: string;
      link: string;
    };
    note: string;
  };
}

interface NewPatientsPageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params }: NewPatientsPageProps): Promise<Metadata> {
  const { locale } = params;
  const siteId = await getRequestSiteId();
  const content = await loadPageContent<NewPatientsPageData>('new-patients', locale, siteId);

  return buildPageMetadata({
    siteId,
    locale,
    slug: 'new-patients',
    title: content?.hero?.title,
    description: content?.hero?.subtitle || content?.introduction?.text,
  });
}

export default async function NewPatientsPage({ params }: NewPatientsPageProps) {
  const { locale } = params;
  
  // Load page content
  const siteId = await getRequestSiteId();
  const content = await loadPageContent<NewPatientsPageData>('new-patients', locale, siteId);
  
  if (!content) {
    notFound();
  }

  const { hero, introduction, whatToExpect, preparation, whatToBring, downloadForms, insurance, faq, cta } = content;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--backdrop-primary)] via-[var(--backdrop-secondary)] to-[var(--backdrop-primary)] py-16 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary-100 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-secondary-50 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge variant="primary" className="mb-6">
                {locale === 'en' ? 'New Visit' : '首次就诊'}
              </Badge>
              <h1 className="text-display font-bold text-gray-900 mb-6 leading-tight">
                {hero.title}
              </h1>
              <p className="text-subheading text-[var(--brand)] font-medium">
                {hero.subtitle}
              </p>
            </div>

            <div className="relative lg:h-[420px] h-[320px] hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--backdrop-primary)] to-[var(--backdrop-secondary)] rounded-3xl overflow-hidden shadow-2xl">
                {hero.backgroundImage ? (
                  <Image
                    src={hero.backgroundImage}
                    alt={hero.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-600/10 to-amber-600/10">
                    <div className="text-8xl mb-6">🏛️</div>
                    <p className="text-gray-700 font-semibold text-subheading mb-2">
                      {locale === 'en' ? 'Your First Visit' : '首次就诊'}
                    </p>
                    <p className="text-gray-600 text-small">
                      {locale === 'en' ? 'Everything you need to know' : '准备就诊所需信息'}
                    </p>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[var(--primary)] rounded-3xl opacity-10 -z-10"></div>
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-amber-600 rounded-3xl opacity-10 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
              {introduction.text}
            </p>
            <div className="bg-gradient-to-br from-primary/10 to-backdrop-primary border-l-4 border-primary rounded-r-lg p-6">
              <p className="text-gray-800 font-medium flex items-start gap-3">
                <Icon name="Info" className="text-primary mt-0.5 flex-shrink-0" />
                {introduction.highlight}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Timeline */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-backdrop-secondary to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-heading font-bold text-gray-900 mb-4">
                {whatToExpect.title}
              </h2>
              <p className="text-gray-600">
                {whatToExpect.subtitle}
              </p>
            </div>

            <div className="space-y-8">
              {whatToExpect.steps.map((step, index) => (
                <Card key={step.number} className="overflow-hidden">
                  <div className="flex items-start gap-6 p-6 lg:p-8">
                    {/* Step Number Circle */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center text-2xl font-bold">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Icon name={step.icon as any} className="text-primary" />
                          <h3 className="text-xl font-bold text-gray-900">
                            {step.title}
                          </h3>
                        </div>
                        <Badge variant="secondary" size="sm">{step.duration}</Badge>
                      </div>

                      <p className="text-gray-700 mb-4">
                        {step.description}
                      </p>

                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <Icon name="Check" className="text-primary mt-0.5 flex-shrink-0" size="sm" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="inline-block bg-primary/10 rounded-full px-6 py-3">
                <p className="font-semibold text-primary">{whatToExpect.totalDuration}</p>
              </div>
              <p className="text-sm text-gray-600 mt-4">{whatToExpect.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Prepare */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-heading font-bold text-gray-900 mb-4">
                {preparation.title}
              </h2>
              <p className="text-gray-600">
                {preparation.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {preparation.tips.map((tip, index) => (
                <Card 
                  key={index}
                  className={
                    tip.importance === 'important' 
                      ? 'ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-transparent' 
                      : ''
                  }
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name={tip.icon as any} className="text-primary" />
                    </div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {tip.title}
                      {tip.importance === 'important' && (
                        <Badge variant="primary" size="sm">Important</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{tip.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What to Bring */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-backdrop-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading font-bold text-gray-900 mb-8 text-center">
              {whatToBring.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {whatToBring.items.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg p-4 flex items-start gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as any} className="text-primary" size="sm" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.item}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Download Forms */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-heading font-bold text-gray-900 mb-4">
                {downloadForms.title}
              </h2>
              <p className="text-gray-600 mb-2">
                {downloadForms.subtitle}
              </p>
              <p className="text-sm text-gray-500">{downloadForms.note}</p>
            </div>

            <div className="space-y-4">
              {downloadForms.forms.map((form, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="FileText" className="text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{form.name}</h4>
                          {form.required && (
                            <Badge variant="primary" size="sm">Required</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{form.description}</p>
                        <p className="text-xs text-gray-500">{form.pages}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex-shrink-0">
                      <Icon name="Download" size="sm" className="mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Insurance & Payment */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-backdrop-secondary to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon name="CreditCard" className="text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{insurance.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {insurance.text}
                </p>

                <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-xl p-6 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">New Patient Pricing</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Initial Visit (90 min)</span>
                    <span className="text-2xl font-bold text-primary">{insurance.pricing.initial}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-700">Follow-up Visits (60 min)</span>
                    <span className="text-xl font-semibold text-gray-900">{insurance.pricing.followUp}</span>
                  </div>
                  <p className="text-sm text-gray-600 border-t border-gray-200 pt-4">
                    {insurance.pricing.description}
                  </p>
                </div>

                <Button asChild variant="outline" className="w-full">
                  <Link href={insurance.link.url}>
                    {insurance.link.text}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-heading font-bold text-gray-900">
                {faq.title}
              </h2>
            </div>

            <Accordion
              items={faq.items.map((item, index) => ({
                id: `faq-${index}`,
                title: item.question,
                content: item.answer,
              }))}
              allowMultiple
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-heading text-white mb-4">
            {cta.title}
          </h2>
          <p className="text-subheading mb-10 leading-relaxed max-w-3xl mx-auto text-white/95">
            {cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={cta.primaryCta.link}
              className="bg-white text-[var(--primary)] px-8 py-4 rounded-lg hover:bg-gray-50 font-semibold text-subheading transition-all shadow-lg"
            >
              {cta.primaryCta.text}
            </Link>
            <a
              href={cta.secondaryCta.link}
              target={cta.secondaryCta.link.startsWith('http') ? '_blank' : undefined}
              rel={cta.secondaryCta.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 font-semibold text-subheading transition-all"
            >
              {cta.secondaryCta.text}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
