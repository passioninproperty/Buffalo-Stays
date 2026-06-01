const DEFAULT_SITE_URL = 'https://buffalostays.com';

function normalizeSiteUrl(value: string | undefined) {
  if (!value) {
    return DEFAULT_SITE_URL;
  }

  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return DEFAULT_SITE_URL;
  }

  return trimmedValue.endsWith('/') ? trimmedValue.slice(0, -1) : trimmedValue;
}

export const SITE_NAME = 'Buffalo Stays';
export const SITE_DESCRIPTION = 'Warm and earthy curated furnished rentals for extended comfort, flexible stays, and long-term living in Buffalo, NY.';
export const SITE_KEYWORDS = [
  'Buffalo Stays',
  'extended stay Buffalo NY',
  'long term rental Buffalo NY',
  'furnished rooms Buffalo NY',
  'furnished apartments Buffalo',
  'serviced accommodation Buffalo',
  'temporary housing Buffalo',
  'corporate housing Buffalo',
  'monthly rentals Buffalo',
];
export const SITE_IMAGE = '/og-image.png';
export const SITE_TWITTER_HANDLE = '@buffalostays';
export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export function getAbsoluteUrl(pathname = '/') {
  const safePathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return new URL(safePathname, SITE_URL).toString();
}
