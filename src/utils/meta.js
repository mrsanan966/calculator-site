import { SITE_CONFIG } from '@/config/site.js';

// Generate meta tags for calculator pages
export const generateCalculatorMeta = ({
  name,
  description,
  keywords,
  path,
  type = 'calculator'
}) => {
  const currentYear = new Date().getFullYear();
  const baseUrl = `${SITE_CONFIG.baseUrl}${path}`;

  return {
    title: `${name} Calculator ${currentYear} - Free Online ${name} Calculator`,
    description: `Free online ${name.toLowerCase()} calculator. Calculate ${name.toLowerCase()} payments, rates, and more. Easy to use ${name.toLowerCase()} calculator with detailed results and explanations.`,
    keywords: `${name.toLowerCase()} calculator, ${name.toLowerCase()} payment calculator, ${name.toLowerCase()} rate calculator, ${name.toLowerCase()} calculator online, free ${name.toLowerCase()} calculator, ${keywords || ''}`,
    canonical: baseUrl,
    ogType: 'website',
    ogTitle: `${name} Calculator - Free Online ${name} Calculator`,
    ogDescription: description,
    ogUrl: baseUrl,
    twitterTitle: `${name} Calculator - Free Online ${name} Calculator`,
    twitterDescription: description,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": `${name} Calculator`,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  };
};

// Generate meta tags for category pages
export const generateCategoryMeta = ({
  name,
  description,
  path,
  calculators = []
}) => {
  const baseUrl = `${SITE_CONFIG.baseUrl}${path}`;
  const calculatorNames = calculators.map(calc => calc.name).join(', ');

  return {
    title: `${name} Calculators - Free Online ${name} Calculation Tools`,
    description: `Free online ${name.toLowerCase()} calculators. ${description} Includes ${calculatorNames}. Easy to use ${name.toLowerCase()} calculation tools with detailed results.`,
    keywords: `${name.toLowerCase()} calculators, ${name.toLowerCase()} calculation tools, free ${name.toLowerCase()} calculators, ${calculatorNames}`,
    canonical: baseUrl,
    ogType: 'website',
    ogTitle: `${name} Calculators - Free Online ${name} Calculation Tools`,
    ogDescription: description,
    ogUrl: baseUrl,
    twitterTitle: `${name} Calculators - Free Online ${name} Calculation Tools`,
    twitterDescription: description
  };
};

// Generate meta tags for static pages
export const generateStaticPageMeta = ({
  title,
  description,
  path,
  type = 'website'
}) => {
  const baseUrl = `${SITE_CONFIG.baseUrl}${path}`;

  return {
    title: `${title} | ${SITE_CONFIG.siteName}`,
    description,
    canonical: baseUrl,
    ogType: type,
    ogTitle: title,
    ogDescription: description,
    ogUrl: baseUrl,
    twitterTitle: title,
    twitterDescription: description
  };
};

// Generate meta tags for error pages
export const generateErrorPageMeta = ({
  status,
  message,
  path
}) => {
  const baseUrl = `${SITE_CONFIG.baseUrl}${path}`;

  return {
    title: `${status} Error - ${message} | ${SITE_CONFIG.siteName}`,
    description: `We're sorry, but the page you're looking for (${message}) cannot be found. Please check the URL or return to our homepage.`,
    canonical: baseUrl,
    noindex: true,
    ogType: 'website',
    ogTitle: `${status} Error - ${message}`,
    ogDescription: `We're sorry, but the page you're looking for cannot be found.`,
    ogUrl: baseUrl,
    twitterTitle: `${status} Error - ${message}`,
    twitterDescription: `We're sorry, but the page you're looking for cannot be found.`
  };
};

// Generate meta tags for search results
export const generateSearchMeta = ({
  query,
  resultsCount,
  path
}) => {
  const baseUrl = `${SITE_CONFIG.baseUrl}${path}`;

  return {
    title: `Search Results for "${query}" | ${SITE_CONFIG.siteName}`,
    description: `Found ${resultsCount} results for "${query}". Browse our collection of financial calculators and tools.`,
    canonical: baseUrl,
    ogType: 'website',
    ogTitle: `Search Results for "${query}"`,
    ogDescription: `Found ${resultsCount} results for "${query}". Browse our collection of financial calculators and tools.`,
    ogUrl: baseUrl,
    twitterTitle: `Search Results for "${query}"`,
    twitterDescription: `Found ${resultsCount} results for "${query}". Browse our collection of financial calculators and tools.`
  };
}; 