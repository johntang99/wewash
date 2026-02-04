import type { Metadata } from 'next';
import { headers } from 'next/headers';
import type { Locale } from '@/lib/i18n';
import { loadSeo, loadSiteInfo } from '@/lib/content';
import type { SeoConfig, SiteInfo } from '@/lib/types';

export function getBaseUrlFromHost(host?: string | null): URL {
  const trimmed = (host || '').trim();
  if (!trimmed) {
    return new URL('http://localhost:3003');
  }

  const isLocal =
    trimmed.includes('localhost') ||
    trimmed.endsWith('.local') ||
    trimmed.startsWith('127.0.0.1') ||
    trimmed.endsWith(':3000') ||
    trimmed.endsWith(':3003');
  const protocol = isLocal ? 'http' : 'https';
  return new URL(`${protocol}://${trimmed}`);
}

export function getBaseUrlFromRequest(): URL {
  const host = headers().get('host');
  return getBaseUrlFromHost(host);
}

function getPageSeo(seo: SeoConfig | null, slug?: string) {
  if (!seo) return null;
  if (!slug || slug === 'home') {
    return seo.home || seo.pages?.home || null;
  }
  return seo.pages?.[slug] || null;
}

export async function buildPageMetadata({
  siteId,
  locale,
  slug,
  title,
  description,
  canonicalPath,
}: {
  siteId: string;
  locale: Locale;
  slug?: string;
  title?: string;
  description?: string;
  canonicalPath?: string;
}): Promise<Metadata> {
  const baseUrl = getBaseUrlFromRequest();
  const [seo, siteInfo] = await Promise.all([
    loadSeo(siteId, locale) as Promise<SeoConfig | null>,
    loadSiteInfo(siteId, locale) as Promise<SiteInfo | null>,
  ]);

  const pageSeo = getPageSeo(seo, slug);
  const fallbackTitle = siteInfo?.clinicName || 'Clinic';
  const resolvedTitle = title || pageSeo?.title || seo?.title || fallbackTitle;
  const resolvedDescription =
    description ||
    pageSeo?.description ||
    seo?.description ||
    siteInfo?.description ||
    '';

  const path =
    canonicalPath ??
    `/${locale}${slug && slug !== 'home' ? `/${slug}` : ''}`;
  const canonical = new URL(path, baseUrl).toString();

  return {
    title: resolvedTitle,
    description: resolvedDescription || undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription || undefined,
      url: canonical,
      images: seo?.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
  };
}
