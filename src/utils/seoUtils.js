/**
 * SEO Utility Functions
 * Provides consistent SEO metadata and structured data for calculator pages
 */

import { SITE_CONFIG } from '@/config/site.js';

/**
 * Generate default SEO metadata for calculator pages
 * @param {Object} options - SEO options
 * @param {string} options.calculatorName - Name of the calculator
 * @param {string} options.description - Page description
 * @param {string} [options.path] - URL path for the calculator
 * @param {string} [options.keywords] - Additional keywords
 * @returns {Object} SEO metadata object
 */
export const generateSeoMeta = ({
  calculatorName,
  description,
  path = '',
  keywords = ''
}) => {
  const title = `${calculatorName} Calculator | ${SITE_CONFIG.siteName}`;
  const fullDescription = `${description} Use our free online calculator to get instant results.`;
  const fullKeywords = `${calculatorName.toLowerCase()}, ${keywords}, calculator, financial calculator, online calculator, free calculator`;
  const canonicalUrl = `${SITE_CONFIG.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;

  return {
    title,
    description: fullDescription,
    keywords: fullKeywords,
    canonical: canonicalUrl,
    openGraph: {
      title,
      description: fullDescription,
      url: canonicalUrl,
      type: 'website',
      site_name: SITE_CONFIG.siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: fullDescription,
    }
  };
};

/**
 * Generate breadcrumb schema markup
 * @param {Array} items - Array of breadcrumb items {name, path}
 * @returns {Object} Breadcrumb schema markup
 */
export const generateBreadcrumbSchema = (items = []) => {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_CONFIG.baseUrl}${item.path}`
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  };
};

/**
 * Generate FAQ schema for calculator pages
 * @param {Array} faqs - Array of FAQ items {question, answer}
 * @returns {Object} FAQ schema markup
 */
export const generateFaqSchema = (faqs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

/**
 * Generate calculator schema markup
 * @param {Object} options - Calculator options
 * @param {string} options.name - Calculator name
 * @param {string} options.description - Calculator description
 * @param {string} options.keywords - Keywords related to the calculator
 * @param {Array} options.inputs - Array of input parameters
 * @param {Array} options.outputs - Array of output parameters
 * @returns {Object} Calculator schema markup
 */
export const generateCalculatorSchema = ({
  name,
  description,
  keywords = '',
  inputs = [],
  outputs = []
}) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: `${name} Calculator`,
  operatingSystem: 'Web, Mobile',
  applicationCategory: 'FinancialApplication',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1245'
  },
  description,
  keywords: `${name.toLowerCase()}, ${keywords}, calculator, financial calculator, online calculator, free calculator`,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  input: inputs.map(input => ({
    '@type': 'PropertyValue',
    name: input.name,
    description: input.description,
    valueName: input.name.toLowerCase().replace(/\s+/g, '_'),
    valueRequired: input.required !== false,
    ...(input.unit && { unitText: input.unit })
  })),
  output: outputs.map(output => ({
    '@type': 'PropertyValue',
    name: output.name,
    description: output.description,
    ...(output.unit && { unitText: output.unit })
  }))
});

/**
 * Generate how-to schema for calculator instructions
 * @param {Object} options - How-to options
 * @param {string} options.name - How-to name
 * @param {string} options.description - How-to description
 * @param {Array} options.steps - Array of steps {name, text, url}
 * @param {Array} options.supplies - Array of required supplies
 * @param {string} options.totalTime - ISO 8601 duration format (e.g., PT5M for 5 minutes)
 * @returns {Object} How-to schema markup
 */
export const generateHowToSchema = ({
  name,
  description,
  steps = [],
  supplies = [],
  totalTime = 'PT5M'
}) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name,
  description,
  step: steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
    ...(step.url && { url: step.url })
  })),
  ...(supplies.length > 0 && {
    supply: supplies.map(supply => ({
      '@type': 'HowToSupply',
      name: supply
    }))
  }),
  totalTime
});
