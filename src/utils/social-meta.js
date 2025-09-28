import { SITE_CONFIG } from '@/config/site.js';

// Generate Open Graph meta tags
export const generateOpenGraphMeta = ({
  title,
  description,
  url,
  type = 'website',
  image,
  siteName = SITE_CONFIG.siteName
}) => {
  const meta = {
    'og:title': title,
    'og:description': description,
    'og:url': url,
    'og:type': type,
    'og:site_name': siteName
  };

  if (image) {
    meta['og:image'] = image;
    meta['og:image:alt'] = title;
  }

  return meta;
};

// Generate Twitter Card meta tags
export const generateTwitterMeta = ({
  title,
  description,
  url,
  image,
  card = 'summary_large_image',
  site = SITE_CONFIG.twitterHandle
}) => {
  const meta = {
    'twitter:card': card,
    'twitter:site': site,
    'twitter:title': title,
    'twitter:description': description,
    'twitter:url': url
  };

  if (image) {
    meta['twitter:image'] = image;
    meta['twitter:image:alt'] = title;
  }

  return meta;
};

// Generate social media meta tags for calculator pages
export const generateCalculatorSocialMeta = ({
  name,
  description,
  path,
  image
}) => {
  const baseUrl = `${SITE_CONFIG.baseUrl}${path}`;
  const title = `${name} Calculator - Free Online ${name} Calculator`;

  return {
    ...generateOpenGraphMeta({
      title,
      description,
      url: baseUrl,
      image
    }),
    ...generateTwitterMeta({
      title,
      description,
      url: baseUrl,
      image
    })
  };
};

// Generate social media meta tags for category pages
export const generateCategorySocialMeta = ({
  name,
  description,
  path,
  image
}) => {
  const baseUrl = `${SITE_CONFIG.baseUrl}${path}`;
  const title = `${name} Calculators - Free Online ${name} Calculation Tools`;

  return {
    ...generateOpenGraphMeta({
      title,
      description,
      url: baseUrl,
      image
    }),
    ...generateTwitterMeta({
      title,
      description,
      url: baseUrl,
      image
    })
  };
};

// Generate social media meta tags for static pages
export const generateStaticPageSocialMeta = ({
  title,
  description,
  path,
  image
}) => {
  const baseUrl = `${SITE_CONFIG.baseUrl}${path}`;

  return {
    ...generateOpenGraphMeta({
      title,
      description,
      url: baseUrl,
      image
    }),
    ...generateTwitterMeta({
      title,
      description,
      url: baseUrl,
      image
    })
  };
}; 