import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/utils/urls';
import { SITE_CONFIG } from '@/config/site.js';

export const SEO = ({ 
  title, 
  description, 
  path = '', 
  image,
  type = 'website',
  noindex = false
}) => {
  const canonicalUrl = getCanonicalUrl(path);
  const fullTitle = title ? title.length > 65 ? title.slice(0, 62) + '...' : title : SITE_CONFIG.siteName;
  const metaDescription = description || SITE_CONFIG.siteDescription;
  const metaImage = image || `${SITE_CONFIG.baseUrl}/og-image.jpg`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      {noindex && <meta name="robots" content="noindex" />}
    </Helmet>
  );
};

export default SEO; 