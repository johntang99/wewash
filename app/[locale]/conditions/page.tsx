import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { loadPageContent } from '@/lib/content';
import { Locale } from '@/lib/types';
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, Icon, Tabs } from '@/components/ui';
import { Shield, Heart, Sparkles } from 'lucide-react';

interface ConditionsPageData {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage?: string;
  };
  introduction: {
    text: string;
    note: string;
  };
  categories: Array<{
    id: string;
    name: string;
    icon: string;
    description: string;
  }>;
  conditions: Array<{
    id: string;
    category: string;
    icon: string;
    image?: string;
    title: string;
    description: string;
    symptoms: string[];
    tcmApproach: string;
    treatmentMethods: string[];
    featured?: boolean;
  }>;
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
  };
}

interface ConditionsPageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params }: ConditionsPageProps): Promise<Metadata> {
  const { locale } = params;
  
  return {
    title: locale === 'en' ? 'Conditions We Treat - Dr. Huang Clinic' : '治疗病症 - 黄医生诊所',
    description: locale === 'en' 
      ? 'Learn about the wide range of conditions we treat with Traditional Chinese Medicine, from pain management to digestive health.'
      : '了解我们用传统中医治疗的各种病症，从疼痛管理到消化健康。',
  };
}

export default async function ConditionsPage({ params }: ConditionsPageProps) {
  const { locale } = params;
  
  // Load page content
  const content = await loadPageContent<ConditionsPageData>('conditions', locale);
  
  if (!content) {
    notFound();
  }

  const { hero, introduction, categories, conditions, cta } = content;
  const reassuranceItems = [
    {
      icon: Shield,
      text: locale === 'en' ? 'Safe, natural healing' : '安全、自然疗法',
    },
    {
      icon: Heart,
      text: locale === 'en' ? 'Holistic approach' : '整体疗法',
    },
    {
      icon: Sparkles,
      text: locale === 'en' ? 'Personalized treatment' : '个性化治疗',
    },
  ];

  // Group conditions by category
  const conditionsByCategory = categories.map(category => ({
    ...category,
    conditions: conditions.filter(c => c.category === category.id)
  }));

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--backdrop-primary)] via-[var(--backdrop-secondary)] to-[var(--backdrop-primary)] py-16 md:py-20 px-4 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary-100 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-secondary-50 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-display font-bold text-gray-900 mb-6 leading-tight">
                {hero.title}
              </h1>
              <p className="text-subheading text-gray-600 leading-relaxed mb-8">
                {hero.subtitle}
              </p>

              {/* Reassurance Row */}
              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                {reassuranceItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.text}
                      className="flex flex-col items-center sm:items-start gap-3 bg-white/80 backdrop-blur rounded-xl p-4 border border-gray-200 shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-gray-900 text-center sm:text-left">
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative lg:h-[500px] h-[350px] hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--backdrop-primary)] to-[var(--backdrop-secondary)] rounded-3xl overflow-hidden shadow-2xl">
                {hero.backgroundImage ? (
                  <Image
                    src={hero.backgroundImage}
                    alt={hero.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 relative p-8">
                    <div className="absolute top-10 left-10 w-24 h-24 bg-primary-50/20 rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary-50/20 rounded-full"></div>
                    <div className="absolute top-1/2 right-16 w-20 h-20 bg-primary-100/20 rounded-full"></div>

                    <div className="relative z-10 text-center">
                      <div className="text-8xl mb-6">🩺</div>
                      <p className="text-gray-700 font-semibold text-subheading mb-2">
                        {locale === 'en' ? 'Comprehensive Care' : '全面护理'}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {locale === 'en' ? 'Treating the root cause, naturally' : '从根源自然调理'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary rounded-3xl opacity-10 -z-10"></div>
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-secondary rounded-3xl opacity-10 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {introduction.text}
            </p>
            <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-6">
              <p className="text-gray-700 font-medium flex items-start gap-3">
                <Icon name="Info" className="text-primary mt-0.5 flex-shrink-0" />
                {introduction.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Conditions */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-backdrop-secondary to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="primary" className="mb-4">Most Common</Badge>
              <h2 className="text-heading font-bold text-gray-900 mb-4">
                Frequently Treated Conditions
              </h2>
              <p className="text-gray-600">
                These are some of the conditions we see most often with excellent results
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conditions.filter(c => c.featured).map((condition) => (
                <Card key={condition.id} variant="default" hover padding="none" className="h-full overflow-hidden">
                  {condition.image ? (
                    <div className="relative w-full aspect-[4/3] bg-gray-200">
                      <Image
                        src={condition.image}
                        alt={condition.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[4/3] bg-primary/5 flex items-center justify-center">
                      <Icon name={condition.icon as any} className="text-primary" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="mb-3">
                      <Badge variant="secondary" size="sm">
                        {categories.find(cat => cat.id === condition.category)?.name}
                      </Badge>
                    </div>
                    <h3 className="text-subheading font-bold text-gray-900 mb-2">
                      {condition.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-4">
                      {condition.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {condition.symptoms.slice(0, 4).map((symptom, idx) => (
                        <Badge key={idx} variant="primary" size="sm">
                          {symptom}
                        </Badge>
                      ))}
                      {condition.symptoms.length > 4 && (
                        <Badge variant="primary" size="sm">
                          +{condition.symptoms.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Conditions by Category */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-heading font-bold text-gray-900 mb-4">
                All Conditions by Category
              </h2>
              <p className="text-gray-600">
                Browse conditions organized by health category
              </p>
            </div>

            <Tabs
              defaultValue="all"
              variant="pills"
              items={[
                {
                  value: 'all',
                  label: locale === 'en' ? 'All Conditions' : '全部病症',
                  content: (
                    <div className="pt-8">
                      <div className="grid gap-6">
                        {conditions.map((condition) => (
                          <div
                            key={condition.id}
                            id={condition.id}
                            className="bg-white border border-gray-100 rounded-xl p-6 hover:border-primary/30 hover:shadow-md transition-all"
                          >
                            <div className="grid lg:grid-cols-3 gap-6">
                              {/* Title and Description */}
                              <div className="lg:col-span-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Icon name={condition.icon as any} className="text-primary" size="sm" />
                                  </div>
                                  <h3 className="text-xl font-bold text-gray-900">
                                    {condition.title}
                                  </h3>
                                </div>
                                <p className="text-gray-600 text-sm">
                                  {condition.description}
                                </p>
                              </div>

                              {/* Symptoms */}
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                  {locale === 'en' ? 'Common Symptoms' : '常见症状'}
                                </h4>
                                <div className="space-y-2">
                                  {condition.symptoms.map((symptom, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                      <Icon name="Check" className="text-primary mt-0.5 flex-shrink-0" size="sm" />
                                      <span className="text-sm text-gray-600">{symptom}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* TCM Approach */}
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                  {locale === 'en' ? 'Our TCM Approach' : '中医调理'}
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                  {condition.tcmApproach}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {condition.treatmentMethods.map((method, idx) => (
                                    <Badge key={idx} variant="primary" size="sm">
                                      {method}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                ...categories.map(category => ({
                  value: category.id,
                  label: category.name,
                  icon: category.icon as any,
                  content: (
                    <div className="pt-8">
                      <div className="mb-8 p-6 bg-gradient-to-br from-primary/5 to-transparent rounded-xl">
                        <p className="text-gray-700">{category.description}</p>
                      </div>

                      <div className="grid gap-6">
                        {conditionsByCategory
                          .find(cat => cat.id === category.id)
                          ?.conditions.map((condition) => (
                            <div
                              key={condition.id}
                              id={condition.id}
                              className="bg-white border border-gray-100 rounded-xl p-6 hover:border-primary/30 hover:shadow-md transition-all"
                            >
                              <div className="grid lg:grid-cols-3 gap-6">
                                {/* Title and Description */}
                                <div className="lg:col-span-1">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                      <Icon name={condition.icon as any} className="text-primary" size="sm" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                      {condition.title}
                                    </h3>
                                  </div>
                                  <p className="text-gray-600 text-sm">
                                    {condition.description}
                                  </p>
                                </div>

                                {/* Symptoms */}
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                    {locale === 'en' ? 'Common Symptoms' : '常见症状'}
                                  </h4>
                                  <div className="space-y-2">
                                    {condition.symptoms.map((symptom, idx) => (
                                      <div key={idx} className="flex items-start gap-2">
                                        <Icon name="Check" className="text-primary mt-0.5 flex-shrink-0" size="sm" />
                                        <span className="text-sm text-gray-600">{symptom}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* TCM Approach */}
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                    {locale === 'en' ? 'Our TCM Approach' : '中医调理'}
                                  </h4>
                                  <p className="text-sm text-gray-600 mb-4">
                                    {condition.tcmApproach}
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {condition.treatmentMethods.map((method, idx) => (
                                      <Badge key={idx} variant="primary" size="sm">
                                        {method}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ),
                })),
              ]}
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
            <Link
              href={cta.secondaryCta.link}
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 font-semibold text-subheading transition-all"
            >
              {cta.secondaryCta.text}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
