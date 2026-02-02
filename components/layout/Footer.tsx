import Link from 'next/link';
import { Locale } from '@/lib/i18n';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FooterProps {
  locale: Locale;
  siteId: string;
}

export default function Footer({ locale, siteId }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  // Quick links in footer
  const quickLinks = [
    { text: locale === 'en' ? 'About Us' : '关于我们', url: `/${locale}/about` },
    { text: locale === 'en' ? 'Services' : '服务项目', url: `/${locale}/services` },
    { text: locale === 'en' ? 'Conditions' : '治疗病症', url: `/${locale}/conditions` },
    { text: locale === 'en' ? 'Case Studies' : '案例研究', url: `/${locale}/case-studies` },
    { text: locale === 'en' ? 'New Visit' : '首次就诊', url: `/${locale}/new-patients` },
    { text: locale === 'en' ? 'New Patients' : '新患者', url: `/${locale}/new-patients` },
    { text: locale === 'en' ? 'Blog' : '博客', url: `/${locale}/blog` },
    { text: locale === 'en' ? 'Contact' : '联系我们', url: `/${locale}/contact` },
  ];
  
  const services = [
    { text: locale === 'en' ? 'Acupuncture' : '针灸', url: `/${locale}/services#acupuncture` },
    { text: locale === 'en' ? 'Herbal Medicine' : '中药', url: `/${locale}/services#herbs` },
    { text: locale === 'en' ? 'Cupping' : '拔罐', url: `/${locale}/services#cupping` },
    { text: locale === 'en' ? 'Tui Na' : '推拿', url: `/${locale}/services#tuina` },
  ];
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                TCM
              </div>
              <div className="font-bold text-xl text-white">
                Dr Huang Clinic
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {locale === 'en'
                ? 'Traditional Chinese Medicine and Acupuncture serving the community with holistic healing.'
                : '以传统中医和针灸为社区提供整体治疗。'}
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {locale === 'en' ? 'Quick Links' : '快速链接'}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {locale === 'en' ? 'Services' : '服务'}
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.url}>
                  <Link
                    href={service.url}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {service.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {locale === 'en' ? 'Contact Us' : '联系我们'}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-primary-light" />
                <span>
                  71 East Main Street<br />
                  Middletown, NY 10940
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary-light" />
                <a href="tel:+18453811106" className="text-gray-300 hover:text-white transition-colors">
                  (845) 381-1106
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0 text-primary-light" />
                <a href="mailto:info@clinic.com" className="text-gray-300 hover:text-white transition-colors">
                  info@clinic.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Clock className="w-4 h-4 mt-1 flex-shrink-0 text-primary-light" />
                <div>
                  <div>Mon-Fri: 9:00 AM - 6:00 PM</div>
                  <div>Sat: 10:00 AM - 2:00 PM</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>
              &copy; {currentYear} Dr Huang Clinic. {locale === 'en' ? 'All rights reserved.' : '版权所有。'}
            </div>
            <div className="flex gap-6">
              <Link href={`/${locale}/privacy`} className="text-gray-300 hover:text-white transition-colors">
                {locale === 'en' ? 'Privacy Policy' : '隐私政策'}
              </Link>
              <Link href={`/${locale}/terms`} className="text-gray-300 hover:text-white transition-colors">
                {locale === 'en' ? 'Terms of Service' : '服务条款'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
