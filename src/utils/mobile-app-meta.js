import { SITE_CONFIG } from '@/config/site.js';

// Generate mobile app-related meta tags
export const generateMobileAppMeta = () => {
  return {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': SITE_CONFIG.siteName,
    'application-name': SITE_CONFIG.siteName,
    'mobile-web-app-capable': 'yes',
    'theme-color': SITE_CONFIG.themeColor,
    'msapplication-TileColor': SITE_CONFIG.themeColor,
    'msapplication-TileImage': '/mstile-144x144.png',
    'msapplication-config': '/browserconfig.xml'
  };
};

// Generate mobile app-related link tags
export const generateMobileAppLinks = () => {
  return [
    { rel: 'manifest', href: '/manifest.json' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-touch-icon-152x152.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180x180.png' },
    { rel: 'apple-touch-icon', sizes: '167x167', href: '/apple-touch-icon-167x167.png' },
    { rel: 'apple-touch-startup-image', href: '/apple-touch-startup-image.png' },
    { rel: 'apple-touch-startup-image', media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)', href: '/apple-touch-startup-image-640x1136.png' },
    { rel: 'apple-touch-startup-image', media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)', href: '/apple-touch-startup-image-750x1334.png' },
    { rel: 'apple-touch-startup-image', media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)', href: '/apple-touch-startup-image-1242x2208.png' },
    { rel: 'apple-touch-startup-image', media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)', href: '/apple-touch-startup-image-1125x2436.png' },
    { rel: 'apple-touch-startup-image', media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)', href: '/apple-touch-startup-image-1242x2688.png' },
    { rel: 'apple-touch-startup-image', media: '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)', href: '/apple-touch-startup-image-1170x2532.png' },
    { rel: 'apple-touch-startup-image', media: '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)', href: '/apple-touch-startup-image-1284x2778.png' }
  ];
};

// Generate mobile app-related schema
export const generateMobileAppSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': SITE_CONFIG.siteName,
    'url': SITE_CONFIG.baseUrl,
    'description': SITE_CONFIG.description,
    'applicationCategory': 'FinanceApplication',
    'operatingSystem': 'Web Browser',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'browserRequirements': 'Requires JavaScript. Requires HTML5.',
    'permissions': 'geolocation',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.5',
      'ratingCount': '1000'
    }
  };
};

// Generate mobile app-related meta tags for calculator pages
export const generateCalculatorMobileAppMeta = ({
  name,
  description
}) => {
  return {
    'apple-mobile-web-app-title': `${name} Calculator`,
    'application-name': `${name} Calculator`,
    'mobile-web-app-capable': 'yes',
    'theme-color': SITE_CONFIG.themeColor,
    'msapplication-TileColor': SITE_CONFIG.themeColor,
    'msapplication-TileImage': '/mstile-144x144.png',
    'msapplication-config': '/browserconfig.xml'
  };
}; 