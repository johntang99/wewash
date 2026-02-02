import { Badge } from '@/components/ui';
import { Testimonial } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Star, ArrowRight } from 'lucide-react';

export interface TestimonialsSectionProps {
  badge?: string;
  title: string;
  subtitle?: string;
  testimonials: Array<{
    quote: string;
    name: string;
    condition: string;
  }>;
  moreLink?: {
    text: string;
    url: string;
  };
  className?: string;
}

export default function TestimonialsSection({
  badge,
  title,
  subtitle,
  testimonials,
  moreLink,
  className,
}: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;
  
  return (
    <section className={cn('py-20 px-4 bg-gradient-to-b from-white to-gray-50', className)}>
      <div className="container-custom max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          {badge && (
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              {badge}
            </span>
          )}
          <h2 className="text-heading font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-subheading text-gray-600">{subtitle}</p>}
        </div>
        
        {/* Testimonials Grid - Static 3-column layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-primary hover:shadow-xl transition-all"
            >
              {/* 5 Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5" style={{ fill: 'var(--secondary-light)', color: 'var(--secondary-light)' }} />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-gray-700 italic mb-6 leading-relaxed text-subheading">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              
              {/* Name & Condition */}
              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-primary">{testimonial.condition}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* More Link */}
        {moreLink && (
          <div className="text-center mt-10">
            <a
              href={moreLink.url}
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold text-subheading group"
            >
              {moreLink.text}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
