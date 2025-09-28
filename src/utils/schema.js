import { SITE_CONFIG } from '@/config/site.js';

// Generate schema for calculator pages
export const generateCalculatorSchema = ({
  name,
  description,
  url,
  faqs = [],
  howToSteps = [],
  relatedCalculators = []
}) => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `${name} Calculator`,
  "description": description,
  "url": url,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "creator": {
    "@type": "Organization",
    "name": SITE_CONFIG.siteName,
    "url": SITE_CONFIG.baseUrl
  },
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  },
  "howTo": {
    "@type": "HowTo",
    "name": `How to Use ${name} Calculator`,
    "step": howToSteps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "url": step.url
    }))
  },
  "relatedLink": relatedCalculators.map(calc => calc.url)
});

// Generate schema for the website
export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": SITE_CONFIG.siteName,
  "url": SITE_CONFIG.baseUrl,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${SITE_CONFIG.baseUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
});

// Generate schema for breadcrumbs
export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// Generate schema for organization
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": SITE_CONFIG.siteName,
  "url": SITE_CONFIG.baseUrl,
  "logo": `${SITE_CONFIG.baseUrl}/logo.png`,
  "sameAs": [
    SITE_CONFIG.social?.twitter,
    SITE_CONFIG.social?.facebook,
    SITE_CONFIG.social?.linkedin
  ].filter(Boolean)
});

// Generate schema for FAQ page
export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Generate schema for calculator results
export const generateCalculatorResultSchema = ({
  calculatorName,
  inputValues,
  results,
  timestamp
}) => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `${calculatorName} Results`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "result": {
    "@type": "DataFeedItem",
    "dateModified": timestamp,
    "input": inputValues,
    "output": results
  }
}); 