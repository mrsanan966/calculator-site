import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '@/config/site.js';
import { generateCalculatorSeo } from '@/config/calculators';

/**
 * Custom hook for managing SEO metadata
 * @param {Object} options - SEO options
 * @param {string} options.calculatorId - ID of the calculator (if applicable)
 * @param {string} options.title - Page title
 * @param {string} options.description - Page description
 * @param {string} options.keywords - Page keywords
 * @param {Object} options.schema - Schema.org markup
 * @param {string} options.path - URL path
 * @param {string} options.image - Social media image URL
 */
const useSeo = ({
  calculatorId,
  title,
  description,
  keywords,
  schema,
  path,
  image
}) => {
  const location = useLocation();

  useEffect(() => {
    // Get calculator-specific SEO if calculatorId is provided
    const calculatorSeo = calculatorId ? generateCalculatorSeo(calculatorId) : null;

    // Use calculator SEO or fallback to provided options
    const seoData = calculatorSeo || {
      title,
      description,
      keywords,
      schema,
      path,
      image
    };

    // Generate meta tags
    const metaTags = {
      // Basic meta tags
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      canonical: `${SITE_CONFIG.baseUrl}${seoData.path || location.pathname}`,

      // Open Graph meta tags
      'og:title': seoData.title,
      'og:description': seoData.description,
      'og:url': `${SITE_CONFIG.baseUrl}${seoData.path || location.pathname}`,
      'og:type': 'website',
      'og:site_name': SITE_CONFIG.siteName,
      'og:image': seoData.image || `${SITE_CONFIG.baseUrl}/og-image.jpg`,

      // Twitter meta tags
      'twitter:card': 'summary_large_image',
      'twitter:site': SITE_CONFIG.twitterHandle,
      'twitter:title': seoData.title,
      'twitter:description': seoData.description,
      'twitter:image': seoData.image || `${SITE_CONFIG.baseUrl}/twitter-image.jpg`,

      // Additional meta tags
      'viewport': 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5',
      'theme-color': SITE_CONFIG.themeColor,
      'color-scheme': 'light dark',
      'format-detection': 'telephone=no',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': seoData.title,
      'application-name': seoData.title,
      'msapplication-TileColor': SITE_CONFIG.themeColor,
      'msapplication-TileImage': '/mstile-144x144.png',
      'msapplication-config': '/browserconfig.xml'
    };

    // Update meta tags
    Object.entries(metaTags).forEach(([name, content]) => {
      if (content) {
        const metaTag = document.querySelector(`meta[name="${name}"]`) ||
                       document.querySelector(`meta[property="${name}"]`);
        
        if (metaTag) {
          metaTag.setAttribute('content', content);
        } else {
          const newMetaTag = document.createElement('meta');
          if (name.startsWith('og:') || name.startsWith('twitter:')) {
            newMetaTag.setAttribute('property', name);
          } else {
            newMetaTag.setAttribute('name', name);
          }
          newMetaTag.setAttribute('content', content);
          document.head.appendChild(newMetaTag);
        }
      }
    });

    // Update title
    document.title = seoData.title;

    // Add schema.org markup
    if (seoData.schema) {
      const schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.text = JSON.stringify(seoData.schema);
      document.head.appendChild(schemaScript);
    }

    // Cleanup function
    return () => {
      // Remove schema.org markup
      const schemaScript = document.querySelector('script[type="application/ld+json"]');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [calculatorId, title, description, keywords, schema, path, image, location.pathname]);
};

export default useSeo;
  