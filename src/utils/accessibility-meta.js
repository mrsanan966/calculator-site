import { SITE_CONFIG } from '@/config/site.js';

// Generate accessibility-related meta tags
export const generateAccessibilityMeta = () => {
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

// Generate accessibility-related link tags
export const generateAccessibilityLinks = () => {
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

// Generate accessibility-related schema
export const generateAccessibilitySchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': SITE_CONFIG.siteName,
    'url': SITE_CONFIG.baseUrl,
    'description': SITE_CONFIG.description,
    'accessibilityFeature': [
      'highContrast',
      'largePrint',
      'screenReader',
      'textToSpeech'
    ],
    'accessibilityHazard': 'none',
    'accessibilityControl': [
      'fullKeyboardControl',
      'fullMouseControl',
      'fullTouchControl'
    ],
    'accessibilityAPI': [
      'ARIA',
      'WCAG2.1'
    ]
  };
};

// Generate accessibility-related ARIA attributes
export const generateAriaAttributes = () => {
  return {
    'role': 'main',
    'aria-label': SITE_CONFIG.siteName,
    'aria-live': 'polite',
    'aria-atomic': 'true',
    'aria-relevant': 'additions removals'
  };
};

// Generate accessibility-related meta tags for calculator pages
export const generateCalculatorAccessibilityMeta = ({
  name,
  description
}) => {
  return {
    'aria-label': `${name} Calculator`,
    'aria-description': description,
    'role': 'application',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    'aria-relevant': 'additions removals'
  };
}; 