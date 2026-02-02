import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import { getDefaultSite } from '@/lib/sites';
import { loadTheme, loadSiteInfo } from '@/lib/content';
import type { SiteInfo } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }
  
  // Get default site (in a real multi-site system, this would be dynamic)
  const site = await getDefaultSite();
  
  if (!site) {
    return <div>No site configured</div>;
  }
  
  // Load theme
  const theme = await loadTheme(site.id);
  
  // Load site info for header/footer
  const siteInfo = await loadSiteInfo(site.id, locale as Locale) as SiteInfo | null;
  
  // Generate inline style for theme variables
  const themeStyle = theme ? `
    :root {
      /* Typography */
      --text-display: ${theme.typography.display};
      --text-heading: ${theme.typography.heading};
      --text-subheading: ${theme.typography.subheading};
      --text-body: ${theme.typography.body};
      --text-small: ${theme.typography.small};
      
      /* Primary Colors */
      --primary: ${theme.colors.primary.DEFAULT};
      --primary-dark: ${theme.colors.primary.dark};
      --primary-light: ${theme.colors.primary.light};
      --primary-50: ${theme.colors.primary['50']};
      --primary-100: ${theme.colors.primary['100']};
      
      /* Secondary Colors */
      --secondary: ${theme.colors.secondary.DEFAULT};
      --secondary-dark: ${theme.colors.secondary.dark};
      --secondary-light: ${theme.colors.secondary.light};
      --secondary-50: ${theme.colors.secondary['50']};
      
      /* Backdrop Colors */
      --backdrop-primary: ${theme.colors.backdrop.primary};
      --backdrop-secondary: ${theme.colors.backdrop.secondary};
    }
  ` : '';
  
  return (
    <>
      {/* Inject theme CSS variables */}
      {theme && (
        <style dangerouslySetInnerHTML={{ __html: themeStyle }} />
      )}
      
      <div className="min-h-screen flex flex-col">
        <Header locale={locale as Locale} siteId={site.id} siteInfo={siteInfo ?? undefined} />
        <main className="flex-grow">{children}</main>
        <Footer locale={locale as Locale} siteId={site.id} />
      </div>
    </>
  );
}
