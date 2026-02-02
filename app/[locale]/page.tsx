import { notFound } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { loadPageContent } from '@/lib/content';
import HeroSection, { CredentialsSection } from '@/components/sections/HeroSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import ConditionsSection from '@/components/sections/ConditionsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import BlogPreviewSection from '@/components/sections/BlogPreviewSection';
import GalleryPreviewSection from '@/components/sections/GalleryPreviewSection';
import FirstVisitSection from '@/components/sections/FirstVisitSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import CTASection from '@/components/sections/CTASection';

interface PageProps {
  params: {
    locale: Locale;
  };
}

interface HomePageContent {
  topBar?: {
    badge?: {
      text: string;
      visible?: boolean;
    };
  };
  hero: {
    variant: 'centered' | 'split-photo-right' | 'split-photo-left' | 'overlap' | 'photo-background' | 'video-background';
    clinicName: string;
    tagline: string;
    description: string;
    primaryCta?: { text: string; link: string };
    secondaryCta?: { text: string; link: string };
    image?: string;
    video?: string;
    floatingTags?: string[];
    stats?: Array<{
      icon?: string;
      number: string;
      label: string;
    }>;
    credentials?: Array<{
      icon: string;
      text: string;
    }>;
  };
  testimonials?: any;
  howItWorks?: any;
  conditions?: any;
  services?: any;
  blog?: any;
  gallery?: any;
  firstVisit?: any;
  whyChooseUs?: any;
  cta?: any;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = params;
  
  // Load homepage content
  const content = await loadPageContent<HomePageContent>('home', locale);
  
  if (!content) {
    notFound();
  }
  
  const { hero } = content;
  
  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        variant={hero.variant}
        clinicName={hero.clinicName}
        tagline={hero.tagline}
        description={hero.description}
        badgeText={content.topBar?.badge?.visible ? content.topBar.badge.text : undefined}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        image={hero.image}
        video={hero.video}
        floatingTags={hero.floatingTags}
        stats={hero.stats}
      />
      
      {/* Credentials Section */}
      {hero.credentials && hero.credentials.length > 0 && (
        <CredentialsSection credentials={hero.credentials} />
      )}
      
      {/* Testimonials Section */}
      {content.testimonials && (
        <TestimonialsSection {...content.testimonials} />
      )}
      
      {/* How It Works Section */}
      {content.howItWorks && (
        <HowItWorksSection {...content.howItWorks} />
      )}
      
      {/* Conditions We Treat Section */}
      {content.conditions && (
        <ConditionsSection {...content.conditions} />
      )}
      
      {/* Services/Modalities Section */}
      {content.services && (
        <ServicesSection {...content.services} />
      )}
      
      {/* Blog Preview Section */}
      {content.blog && (
        <BlogPreviewSection {...content.blog} />
      )}
      
      {/* Gallery Preview Section */}
      {content.gallery && (
        <GalleryPreviewSection {...content.gallery} />
      )}
      
      {/* First Visit Section */}
      {content.firstVisit && (
        <FirstVisitSection {...content.firstVisit} />
      )}
      
      {/* Why Choose Us Section */}
      {content.whyChooseUs && (
        <WhyChooseUsSection {...content.whyChooseUs} />
      )}
      
      {/* Final CTA Section */}
      {content.cta && (
        <CTASection {...content.cta} />
      )}
    </main>
  );
}
