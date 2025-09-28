import { SITE_CONFIG } from '@/config/site.js';

// Generate compression-related meta tags
export const generateCompressionMeta = () => {
  return {
    'content-encoding': 'gzip',
    'content-length': '0',
    'content-type': 'text/html; charset=utf-8',
    'transfer-encoding': 'chunked',
    'vary': 'Accept-Encoding',
    'x-compression': 'gzip',
    'x-compression-level': '9',
    'x-compression-ratio': '0.1',
    'x-compression-time': '0.1',
    'x-compression-type': 'gzip',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'SAMEORIGIN',
    'x-xss-protection': '1; mode=block'
  };
};

// Generate compression-related link tags
export const generateCompressionLinks = () => {
  return [
    { rel: 'dns-prefetch', href: SITE_CONFIG.baseUrl },
    { rel: 'preconnect', href: SITE_CONFIG.baseUrl },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
  ];
};

// Generate compression-related schema
export const generateCompressionSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': SITE_CONFIG.siteName,
    'url': SITE_CONFIG.baseUrl,
    'description': SITE_CONFIG.description,
    'contentEncoding': 'gzip',
    'contentType': 'text/html; charset=utf-8',
    'transferEncoding': 'chunked',
    'vary': 'Accept-Encoding'
  };
};

// Generate compression-related meta tags for calculator pages
export const generateCalculatorCompressionMeta = ({
  name,
  description,
  path
}) => {
  const baseUrl = `${SITE_CONFIG.baseUrl}${path}`;

  return {
    'content-encoding': 'gzip',
    'content-length': '0',
    'content-type': 'text/html; charset=utf-8',
    'transfer-encoding': 'chunked',
    'vary': 'Accept-Encoding',
    'x-compression': 'gzip',
    'x-compression-level': '9',
    'x-compression-ratio': '0.1',
    'x-compression-time': '0.1',
    'x-compression-type': 'gzip',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'SAMEORIGIN',
    'x-xss-protection': '1; mode=block'
  };
}; 