import { SITE_CONFIG } from '@/config/site.js';

// Generate search-related meta tags
export const generateSearchMeta = () => {
  return {
    'robots': 'index, follow',
    'googlebot': 'index, follow',
    'bingbot': 'index, follow',
    'slurp': 'index, follow',
    'msnbot': 'index, follow',
    'teoma': 'index, follow',
    'ask': 'index, follow',
    'crawler': 'index, follow',
    'spider': 'index, follow',
    'robot': 'index, follow'
  };
};

// Generate search-related link tags
export const generateSearchLinks = () => {
  return [
    { rel: 'search', type: 'application/opensearchdescription+xml', title: SITE_CONFIG.siteName, href: '/opensearch.xml' },
    { rel: 'search', type: 'application/x-suggestions+json', title: SITE_CONFIG.siteName, href: '/search-suggestions.json' }
  ];
};

// Generate search-related schema
export const generateSearchSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': SITE_CONFIG.siteName,
    'url': SITE_CONFIG.baseUrl,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${SITE_CONFIG.baseUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
};

// Generate search-related meta tags for calculator pages
export const generateCalculatorSearchMeta = ({
  name,
  description,
  path
}) => {
  const baseUrl = `${SITE_CONFIG.baseUrl}${path}`;

  return {
    'robots': 'index, follow',
    'googlebot': 'index, follow',
    'bingbot': 'index, follow',
    'slurp': 'index, follow',
    'msnbot': 'index, follow',
    'teoma': 'index, follow',
    'ask': 'index, follow',
    'crawler': 'index, follow',
    'spider': 'index, follow',
    'robot': 'index, follow',
    'alternate': [
      { type: 'application/opensearchdescription+xml', title: `${name} Calculator Search`, href: `${baseUrl}/opensearch.xml` },
      { type: 'application/x-suggestions+json', title: `${name} Calculator Search Suggestions`, href: `${baseUrl}/search-suggestions.json` }
    ]
  };
};

// Generate search-related schema for calculator pages
export const generateCalculatorSearchSchema = ({
  name,
  description,
  path
}) => {
  const baseUrl = `${SITE_CONFIG.baseUrl}${path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': `${name} Calculator`,
    'url': baseUrl,
    'description': description,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${baseUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}; 