import { SITE_CONFIG } from '@/config/site.js';

// Generate cache-related meta tags
export const generateCacheMeta = () => {
  return {
    'cache-control': 'public, max-age=31536000, immutable',
    'expires': new Date(Date.now() + 31536000000).toUTCString(),
    'pragma': 'public',
    'surrogate-control': 'public, max-age=31536000, immutable',
    'surrogate-key': SITE_CONFIG.siteName,
    'vary': 'Accept-Encoding',
    'x-cache': 'HIT',
    'x-cache-hits': '1',
    'x-cache-lookup': 'HIT',
    'x-cache-status': 'HIT',
    'x-cacheable': 'YES',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'SAMEORIGIN',
    'x-xss-protection': '1; mode=block'
  };
};

// Generate cache-related link tags
export const generateCacheLinks = () => {
  return [
    { rel: 'dns-prefetch', href: SITE_CONFIG.baseUrl },
    { rel: 'preconnect', href: SITE_CONFIG.baseUrl },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
  ];
};

// Generate cache-related schema
export const generateCacheSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': SITE_CONFIG.siteName,
    'url': SITE_CONFIG.baseUrl,
    'description': SITE_CONFIG.description,
    'cacheControl': 'public, max-age=31536000, immutable',
    'expires': new Date(Date.now() + 31536000000).toISOString(),
    'lastModified': new Date().toISOString()
  };
};

// Generate cache-related meta tags for calculator pages
export const generateCalculatorCacheMeta = ({
  name,
  description,
  path
}) => {
  const baseUrl = `${SITE_CONFIG.baseUrl}${path}`;

  return {
    'cache-control': 'public, max-age=31536000, immutable',
    'expires': new Date(Date.now() + 31536000000).toUTCString(),
    'pragma': 'public',
    'surrogate-control': 'public, max-age=31536000, immutable',
    'surrogate-key': `${name} Calculator`,
    'vary': 'Accept-Encoding',
    'x-cache': 'HIT',
    'x-cache-hits': '1',
    'x-cache-lookup': 'HIT',
    'x-cache-status': 'HIT',
    'x-cacheable': 'YES',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'SAMEORIGIN',
    'x-xss-protection': '1; mode=block'
  };
}; 