import { SITE_CONFIG } from '@/config/site.js';

// Generate security-related meta tags
export const generateSecurityMeta = () => {
  return {
    'referrer': 'strict-origin-when-cross-origin',
    'x-dns-prefetch-control': 'on',
    'x-frame-options': 'SAMEORIGIN',
    'x-content-type-options': 'nosniff',
    'x-xss-protection': '1; mode=block',
    'permissions-policy': 'camera=(), microphone=(), geolocation=()',
    'content-security-policy': generateCSP(),
    'strict-transport-security': 'max-age=31536000; includeSubDomains; preload'
  };
};

// Generate Content Security Policy
export const generateCSP = () => {
  const csp = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com'
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'",
      'https://fonts.googleapis.com'
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com'
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:',
      'blob:'
    ],
    'connect-src': [
      "'self'",
      'https://www.google-analytics.com'
    ],
    'frame-src': [
      "'self'"
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'self'"],
    'upgrade-insecure-requests': []
  };

  return Object.entries(csp)
    .map(([key, value]) => `${key} ${value.join(' ')}`)
    .join('; ');
};

// Generate security headers for API responses
export const generateSecurityHeaders = () => {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': generateCSP(),
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
  };
};

// Generate security-related link tags
export const generateSecurityLinks = () => {
  return [
    { rel: 'canonical', href: SITE_CONFIG.baseUrl },
    { rel: 'alternate', type: 'application/rss+xml', title: 'RSS Feed', href: `${SITE_CONFIG.baseUrl}/rss.xml` },
    { rel: 'alternate', type: 'application/atom+xml', title: 'Atom Feed', href: `${SITE_CONFIG.baseUrl}/atom.xml` }
  ];
}; 