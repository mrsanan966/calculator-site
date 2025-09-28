import { SITE_CONFIG } from '@/config/site.js';

// Generate feed-related meta tags
export const generateFeedMeta = () => {
  return {
    'alternate': [
      { type: 'application/rss+xml', title: 'RSS Feed', href: `${SITE_CONFIG.baseUrl}/rss.xml` },
      { type: 'application/atom+xml', title: 'Atom Feed', href: `${SITE_CONFIG.baseUrl}/atom.xml` },
      { type: 'application/json', title: 'JSON Feed', href: `${SITE_CONFIG.baseUrl}/feed.json` }
    ]
  };
};

// Generate feed-related link tags
export const generateFeedLinks = () => {
  return [
    { rel: 'alternate', type: 'application/rss+xml', title: 'RSS Feed', href: `${SITE_CONFIG.baseUrl}/rss.xml` },
    { rel: 'alternate', type: 'application/atom+xml', title: 'Atom Feed', href: `${SITE_CONFIG.baseUrl}/atom.xml` },
    { rel: 'alternate', type: 'application/json', title: 'JSON Feed', href: `${SITE_CONFIG.baseUrl}/feed.json` }
  ];
};

// Generate feed-related schema
export const generateFeedSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': SITE_CONFIG.siteName,
    'description': SITE_CONFIG.description,
    'url': SITE_CONFIG.baseUrl,
    'potentialAction': {
      '@type': 'SubscribeAction',
      'target': [
        {
          '@type': 'EntryPoint',
          'urlTemplate': `${SITE_CONFIG.baseUrl}/rss.xml`,
          'actionPlatform': [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform'
          ]
        },
        {
          '@type': 'EntryPoint',
          'urlTemplate': `${SITE_CONFIG.baseUrl}/atom.xml`,
          'actionPlatform': [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform'
          ]
        },
        {
          '@type': 'EntryPoint',
          'urlTemplate': `${SITE_CONFIG.baseUrl}/feed.json`,
          'actionPlatform': [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform'
          ]
        }
      ]
    }
  };
};

// Generate feed-related meta tags for calculator pages
export const generateCalculatorFeedMeta = ({
  name,
  description,
  path
}) => {
  const baseUrl = `${SITE_CONFIG.baseUrl}${path}`;

  return {
    'alternate': [
      { type: 'application/rss+xml', title: `${name} Calculator RSS Feed`, href: `${baseUrl}/rss.xml` },
      { type: 'application/atom+xml', title: `${name} Calculator Atom Feed`, href: `${baseUrl}/atom.xml` },
      { type: 'application/json', title: `${name} Calculator JSON Feed`, href: `${baseUrl}/feed.json` }
    ]
  };
}; 