import { SITE_CONFIG } from '@/config/site.js';

// Generate canonical URL
export const generateCanonicalUrl = (path) => {
  return `${SITE_CONFIG.baseUrl}${path}`;
};

// Generate alternate language versions
export const generateAlternateLanguages = (path) => {
  const alternateLanguages = {};

  SITE_CONFIG.languages.forEach((lang) => {
    alternateLanguages[lang.code] = `${SITE_CONFIG.baseUrl}/${lang.code}${path}`;
  });

  return alternateLanguages;
};

// Generate hreflang tags
export const generateHreflangTags = (path) => {
  const hreflangTags = [];

  SITE_CONFIG.languages.forEach((lang) => {
    hreflangTags.push({
      rel: 'alternate',
      hreflang: lang.code,
      href: `${SITE_CONFIG.baseUrl}/${lang.code}${path}`
    });
  });

  // Add x-default hreflang
  hreflangTags.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${SITE_CONFIG.baseUrl}${path}`
  });

  return hreflangTags;
};

// Generate language-specific meta tags
export const generateLanguageMeta = (lang) => {
  return {
    'html:lang': lang.code,
    'og:locale': lang.locale,
    'og:locale:alternate': SITE_CONFIG.languages
      .filter((l) => l.code !== lang.code)
      .map((l) => l.locale)
  };
};

// Generate language-specific schema
export const generateLanguageSchema = (lang) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'inLanguage': lang.code,
    'name': SITE_CONFIG.siteName,
    'url': `${SITE_CONFIG.baseUrl}/${lang.code}`
  };
}; 