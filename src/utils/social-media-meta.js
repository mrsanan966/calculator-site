import { SITE_CONFIG } from '@/config/site.js';

// Generate social media-related meta tags
export const generateSocialMediaMeta = () => {
  return {
    'og:site_name': SITE_CONFIG.siteName,
    'og:type': 'website',
    'og:url': SITE_CONFIG.baseUrl,
    'og:title': SITE_CONFIG.siteName,
    'og:description': SITE_CONFIG.description,
    'og:image': `${SITE_CONFIG.baseUrl}/og-image.jpg`,
    'og:image:alt': SITE_CONFIG.siteName,
    'og:locale': SITE_CONFIG.locale,
    'og:locale:alternate': SITE_CONFIG.alternateLocales,
    'twitter:card': 'summary_large_image',
    'twitter:site': SITE_CONFIG.twitterHandle,
    'twitter:creator': SITE_CONFIG.twitterHandle,
    'twitter:title': SITE_CONFIG.siteName,
    'twitter:description': SITE_CONFIG.description,
    'twitter:image': `${SITE_CONFIG.baseUrl}/twitter-image.jpg`,
    'twitter:image:alt': SITE_CONFIG.siteName,
    'twitter:domain': SITE_CONFIG.domain,
    'fb:app_id': SITE_CONFIG.facebookAppId,
    'fb:pages': SITE_CONFIG.facebookPageId,
    'instagram:username': SITE_CONFIG.instagramUsername,
    'pinterest:username': SITE_CONFIG.pinterestUsername,
    'linkedin:username': SITE_CONFIG.linkedinUsername,
    'youtube:username': SITE_CONFIG.youtubeUsername
  };
};

// Generate social media-related link tags
export const generateSocialMediaLinks = () => {
  return [
    { rel: 'me', href: `https://twitter.com/${SITE_CONFIG.twitterHandle}` },
    { rel: 'me', href: `https://www.facebook.com/${SITE_CONFIG.facebookPageId}` },
    { rel: 'me', href: `https://www.instagram.com/${SITE_CONFIG.instagramUsername}` },
    { rel: 'me', href: `https://www.pinterest.com/${SITE_CONFIG.pinterestUsername}` },
    { rel: 'me', href: `https://www.linkedin.com/in/${SITE_CONFIG.linkedinUsername}` },
    { rel: 'me', href: `https://www.youtube.com/${SITE_CONFIG.youtubeUsername}` }
  ];
};

// Generate social media-related schema
export const generateSocialMediaSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': SITE_CONFIG.siteName,
    'url': SITE_CONFIG.baseUrl,
    'logo': `${SITE_CONFIG.baseUrl}/logo.png`,
    'sameAs': [
      `https://twitter.com/${SITE_CONFIG.twitterHandle}`,
      `https://www.facebook.com/${SITE_CONFIG.facebookPageId}`,
      `https://www.instagram.com/${SITE_CONFIG.instagramUsername}`,
      `https://www.pinterest.com/${SITE_CONFIG.pinterestUsername}`,
      `https://www.linkedin.com/in/${SITE_CONFIG.linkedinUsername}`,
      `https://www.youtube.com/${SITE_CONFIG.youtubeUsername}`
    ]
  };
};

// Generate social media-related meta tags for calculator pages
export const generateCalculatorSocialMediaMeta = ({
  name,
  description,
  path,
  image
}) => {
  const baseUrl = `${SITE_CONFIG.baseUrl}${path}`;
  const title = `${name} Calculator - Free Online ${name} Calculator`;

  return {
    'og:site_name': SITE_CONFIG.siteName,
    'og:type': 'website',
    'og:url': baseUrl,
    'og:title': title,
    'og:description': description,
    'og:image': image || `${SITE_CONFIG.baseUrl}/og-image.jpg`,
    'og:image:alt': title,
    'og:locale': SITE_CONFIG.locale,
    'og:locale:alternate': SITE_CONFIG.alternateLocales,
    'twitter:card': 'summary_large_image',
    'twitter:site': SITE_CONFIG.twitterHandle,
    'twitter:creator': SITE_CONFIG.twitterHandle,
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image || `${SITE_CONFIG.baseUrl}/twitter-image.jpg`,
    'twitter:image:alt': title,
    'twitter:domain': SITE_CONFIG.domain,
    'fb:app_id': SITE_CONFIG.facebookAppId,
    'fb:pages': SITE_CONFIG.facebookPageId,
    'instagram:username': SITE_CONFIG.instagramUsername,
    'pinterest:username': SITE_CONFIG.pinterestUsername,
    'linkedin:username': SITE_CONFIG.linkedinUsername,
    'youtube:username': SITE_CONFIG.youtubeUsername
  };
}; 