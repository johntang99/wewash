import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getSessionFromRequest } from '@/lib/admin/auth';
import { listContentEntries } from '@/lib/contentDb';
import { canWriteContent, requireSiteAccess } from '@/lib/admin/permissions';

export async function POST(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const payload = await request.json();
  const siteId = payload.siteId as string | undefined;
  const locale = payload.locale as string | undefined;

  if (!siteId || !locale) {
    return NextResponse.json(
      { message: 'siteId and locale are required' },
      { status: 400 }
    );
  }

  try {
    requireSiteAccess(session.user, siteId);
  } catch {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }
  if (!canWriteContent(session.user)) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const entries = await listContentEntries(siteId, locale);
  if (entries.length === 0) {
    return NextResponse.json({ message: 'No DB entries to export' }, { status: 400 });
  }

  const contentRoot = path.join(process.cwd(), 'content', siteId, locale);
  const themeEntries = entries.filter((e) => e.path === 'theme.json');
  const localeEntries = entries.filter((e) => e.path !== 'theme.json');

  await Promise.all(
    localeEntries.map(async (entry) => {
      const targetPath = path.join(contentRoot, entry.path);
      await fs.mkdir(path.dirname(targetPath), { recursive: true });
      await fs.writeFile(targetPath, JSON.stringify(entry.data, null, 2));
    })
  );

  // Export theme to site-level (not locale)
  if (themeEntries.length > 0) {
    const themePath = path.join(process.cwd(), 'content', siteId, 'theme.json');
    await fs.writeFile(themePath, JSON.stringify(themeEntries[0].data, null, 2));
  }

  return NextResponse.json({ 
    success: true, 
    exported: localeEntries.length + (themeEntries.length > 0 ? 1 : 0),
    message: `Exported ${localeEntries.length} content files to content/${siteId}/${locale}/`
  });
}
