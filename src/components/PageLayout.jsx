import React from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import { SITE_CONFIG } from '@/config/site.js';
import { generatePageSchema } from '@/utils/url';

/**
 * PageLayout component for consistent page metadata and structured data
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Page keywords
 * @param {string} props.canonicalUrl - Page canonical URL
 * @param {string} props.ogImage - Page Open Graph image URL
 * @param {string} props.ogType - Page Open Graph type (default: 'website')
 * @param {string} props.twitterCard - Page Twitter Card type (default: 'summary_large_image')
 * @param {React.ReactNode} props.children - Page content
 * @param {boolean} props.noIndex - Whether to prevent search engines from indexing the page
 * @param {boolean} props.noFollow - Whether to prevent search engines from following links on the page
 * @param {string} props.language - Page language
 * @param {Array} props.alternateLanguages - Array of alternate language objects
 * @param {string} props.mainContentId - Main content container ID
 * @returns {JSX.Element}
 */
const PageLayout = ({ 
  children, 
  title, 
  description, 
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  schema,
  noIndex = false,
  noFollow = false,
  language = 'en',
  alternateLanguages = [],
  mainContentId = 'main-content'
}) => {
  const fullTitle = title ? `${title} | ${SITE_CONFIG.siteName}` : SITE_CONFIG.siteName;
  const metaDescription = description || SITE_CONFIG.siteDescription;
  const metaKeywords = keywords || SITE_CONFIG.keywords;
  const metaCanonicalUrl = canonicalUrl || `${SITE_CONFIG.baseUrl}${window.location.pathname}`;
  const metaOgImage = ogImage || SITE_CONFIG.ogImage;

  const schemaData = generatePageSchema({
    name: title || SITE_CONFIG.siteName,
    description: metaDescription,
    path: window.location.pathname,
  });

  // Generate breadcrumb structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_CONFIG.baseUrl
      }
    ]
  };

  // Add additional breadcrumb items if path exists
  if (window.location.pathname) {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    pathSegments.forEach((segment, index) => {
      const itemUrl = `${SITE_CONFIG.baseUrl}/${pathSegments.slice(0, index + 1).join('/')}`;
      breadcrumbSchema.itemListElement.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        "item": itemUrl
      });
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <link rel="canonical" href={metaCanonicalUrl} />
        
        {/* Language and Indexing */}
        <html lang={language} />
        {noIndex && <meta name="robots" content="noindex" />}
        {noFollow && <meta name="robots" content="nofollow" />}
        
        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={metaCanonicalUrl} />
        <meta property="og:image" content={metaOgImage} />
        <meta property="og:site_name" content={SITE_CONFIG.siteName} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaOgImage} />
        
        {/* Alternate Languages */}
        {alternateLanguages.map(({ lang, url }) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        
        {/* Structured Data */}
        {schema && (
          <script type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        )}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <Breadcrumbs />
      
      <main 
        id={mainContentId}
        className="flex-grow container py-8"
        role="main"
        tabIndex="-1"
      >
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default PageLayout;
