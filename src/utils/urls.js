import { SITE_CONFIG } from '@/config/site.js';

/**
 * Generate a full URL for the given path
 * @param {string} path - The path (with or without leading slash)
 * @returns {string} Full URL
 */
export const getFullUrl = (path = '') => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = SITE_CONFIG.baseUrl.endsWith('/') 
    ? SITE_CONFIG.baseUrl.slice(0, -1) 
    : SITE_CONFIG.baseUrl;
  
  return `${baseUrl}${cleanPath ? `/${cleanPath}` : ''}`;
};

/**
 * Generate a canonical URL for the given path
 * @param {string} path - The path (with or without leading slash)
 * @returns {string} Canonical URL
 */
export const getCanonicalUrl = (path = '') => {
  return getFullUrl(path).split('?')[0]; // Remove query parameters
};

/**
 * Check if a URL is external
 * @param {string} url - The URL to check
 * @returns {boolean} True if the URL is external
 */
export const isExternalUrl = (url) => {
  if (!url) return false;
  
  // Handle protocol-relative URLs
  if (url.startsWith('//')) {
    return true;
  }
  
  // Handle absolute URLs
  if (/^https?:\/\//.test(url)) {
    const siteUrl = new URL(SITE_CONFIG.baseUrl);
    const targetUrl = new URL(url, SITE_CONFIG.baseUrl);
    return targetUrl.hostname !== siteUrl.hostname;
  }
  
  return false;
};
