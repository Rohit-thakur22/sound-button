// Utility functions for locale-aware routing

// Supported locales
export const locales = ['en', 'fr', 'de', 'es', 'bn', 'hi', 'ja', 'ko', 'it', 'pt', 'ru', 'ta', 'ml', 'ar'];
export const defaultLocale = 'en';

// Get locale from URL pathname
export function getLocaleFromPathname(pathname) {
  const segments = pathname.split('/');
  const locale = segments[1];
  return locales.includes(locale) ? locale : defaultLocale;
}

// Create locale-aware URL
export function createLocalizedUrl(pathname, locale, currentLocale) {
  // Remove current locale from pathname if it exists
  let pathWithoutLocale = pathname;
  
  // If the pathname starts with the current locale, remove it
  if (pathname.startsWith(`/${currentLocale}`)) {
    pathWithoutLocale = pathname.substring(`/${currentLocale}`.length) || '/';
  }
  
  // Ensure path starts with /
  if (!pathWithoutLocale.startsWith('/')) {
    pathWithoutLocale = '/' + pathWithoutLocale;
  }
  
  // Add new locale
  return `/${locale}${pathWithoutLocale}`;
}

// Get pathname without locale
export function getPathnameWithoutLocale(pathname) {
  const segments = pathname.split('/');
  if (locales.includes(segments[1])) {
    return '/' + segments.slice(2).join('/') || '/';
  }
  return pathname;
}

// Check if locale is supported
export function isSupportedLocale(locale) {
  return locales.includes(locale);
}

// Get locale display name
export function getLocaleDisplayName(locale) {
  const displayNames = {
    en: 'English',
    fr: 'Français',
    de: 'Deutsch',
    es: 'Español',
    bn: 'বাংলা',
    hi: 'हिन्दी',
    ja: '日本語',
    ko: '한국어',
    it: 'Italiano',
    pt: 'Português',
    ru: 'Русский',
    ta: 'தமிழ்',
    ml: 'മലയാളം',
    ar: 'العربية'
  };
  return displayNames[locale] || locale.toUpperCase();
}

// Get locale flag
export function getLocaleFlag(locale) {
  const flags = {
    en: '🇺🇸',
    fr: '🇫🇷',
    de: '🇩🇪',
    es: '🇪🇸',
    bn: '🇧🇩',
    hi: '🇮🇳',
    ja: '🇯🇵',
    ko: '🇰🇷',
    it: '🇮🇹',
    pt: '🇵🇹',
    ru: '🇷🇺',
    ta: '🇮🇳',
    ml: '🇮🇳',
    ar: '🇸🇦'
  };
  return flags[locale] || '🌐';
}
