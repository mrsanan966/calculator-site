import { SITE_CONFIG } from '@/config/site.js';

// Generate preconnect hints
export const generatePreconnectHints = () => {
  return [
    { rel: 'preconnect', href: SITE_CONFIG.baseUrl },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
  ];
};

// Generate preload hints for critical resources
export const generatePreloadHints = (criticalResources) => {
  return criticalResources.map((resource) => ({
    rel: 'preload',
    href: resource.href,
    as: resource.as,
    type: resource.type,
    crossOrigin: resource.crossOrigin
  }));
};

// Generate resource hints
export const generateResourceHints = () => {
  return [
    { rel: 'dns-prefetch', href: SITE_CONFIG.baseUrl },
    { rel: 'preconnect', href: SITE_CONFIG.baseUrl },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
  ];
};

// Generate performance-related meta tags
export const generatePerformanceMeta = () => {
  return {
    'viewport': 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5',
    'theme-color': SITE_CONFIG.themeColor,
    'color-scheme': 'light dark',
    'format-detection': 'telephone=no',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': SITE_CONFIG.siteName,
    'application-name': SITE_CONFIG.siteName,
    'msapplication-TileColor': SITE_CONFIG.themeColor,
    'msapplication-config': '/browserconfig.xml'
  };
};

// Generate performance-related link tags
export const generatePerformanceLinks = () => {
  return [
    { rel: 'dns-prefetch', href: SITE_CONFIG.baseUrl },
    { rel: 'preconnect', href: SITE_CONFIG.baseUrl },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
  ];
};

// Generate performance-related schema
export const generatePerformanceSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': SITE_CONFIG.siteName,
    'url': SITE_CONFIG.baseUrl,
    'description': SITE_CONFIG.description,
    'browserRequirements': 'Requires JavaScript. Requires HTML5.',
    'permissions': 'geolocation',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.5',
      'ratingCount': '1000'
    }
  };
};

// Generate performance-related meta tags for calculator pages
export const generateCalculatorPerformanceMeta = ({
  name,
  description
}) => {
  return {
    'viewport': 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5',
    'theme-color': SITE_CONFIG.themeColor,
    'color-scheme': 'light dark',
    'format-detection': 'telephone=no',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': `${name} Calculator`,
    'application-name': `${name} Calculator`,
    'msapplication-TileColor': SITE_CONFIG.themeColor,
    'msapplication-config': '/browserconfig.xml'
  };
};

// Generate critical CSS preload
export const generateCriticalCSSPreload = (criticalCSSPath) => {
  return {
    rel: 'preload',
    href: criticalCSSPath,
    as: 'style',
    type: 'text/css'
  };
};

// Generate font preload
export const generateFontPreload = (fontPath, fontFormat) => {
  return {
    rel: 'preload',
    href: fontPath,
    as: 'font',
    type: `font/${fontFormat}`,
    crossOrigin: 'anonymous'
  };
};

// Generate image preload
export const generateImagePreload = (imagePath, imageType) => {
  return {
    rel: 'preload',
    href: imagePath,
    as: 'image',
    type: `image/${imageType}`
  };
}; 