import { SITE_CONFIG } from '@/config/site.js';

/**
 * Generate a full URL for the given path
 * @param {string} path - The path (with or without leading slash)
 * @returns {string} Full URL
 */
export const getFullUrl = (path = '') => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${SITE_CONFIG.baseUrl}${cleanPath ? `/${cleanPath}` : ''}`;
};

/**
 * Generate schema.org WebPage structured data
 * @param {Object} options - Page options
 * @param {string} options.name - Page name
 * @param {string} options.description - Page description
 * @param {string} options.path - Page path (without domain)
 * @returns {Object} Schema.org data
 */
export const generatePageSchema = ({
  name,
  description,
  path,
}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name,
  description,
  url: getFullUrl(path),
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': getFullUrl(path),
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_CONFIG.siteName,
    url: SITE_CONFIG.baseUrl,
  },
});
