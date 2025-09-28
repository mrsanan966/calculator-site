import { SITE_CONFIG } from '@/config/site.js';

// Generate Google Analytics meta tags
export const generateGoogleAnalyticsMeta = () => {
  return {
    'google-analytics': SITE_CONFIG.googleAnalyticsId,
    'google-site-verification': SITE_CONFIG.googleSiteVerification
  };
};

// Generate Google Tag Manager meta tags
export const generateGoogleTagManagerMeta = () => {
  return {
    'google-tag-manager': SITE_CONFIG.googleTagManagerId
  };
};

// Generate Facebook Pixel meta tags
export const generateFacebookPixelMeta = () => {
  return {
    'facebook-domain-verification': SITE_CONFIG.facebookDomainVerification,
    'fb:app_id': SITE_CONFIG.facebookAppId
  };
};

// Generate Twitter Card meta tags
export const generateTwitterCardMeta = () => {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:site': SITE_CONFIG.twitterHandle,
    'twitter:creator': SITE_CONFIG.twitterHandle,
    'twitter:domain': SITE_CONFIG.domain
  };
};

// Generate LinkedIn meta tags
export const generateLinkedInMeta = () => {
  return {
    'linkedin-domain-verification': SITE_CONFIG.linkedinDomainVerification
  };
};

// Generate Pinterest meta tags
export const generatePinterestMeta = () => {
  return {
    'p:domain_verify': SITE_CONFIG.pinterestDomainVerification
  };
};

// Generate Bing meta tags
export const generateBingMeta = () => {
  return {
    'msvalidate.01': SITE_CONFIG.bingSiteVerification
  };
};

// Generate Yandex meta tags
export const generateYandexMeta = () => {
  return {
    'yandex-verification': SITE_CONFIG.yandexSiteVerification
  };
};

// Generate Baidu meta tags
export const generateBaiduMeta = () => {
  return {
    'baidu-site-verification': SITE_CONFIG.baiduSiteVerification
  };
};

// Generate Naver meta tags
export const generateNaverMeta = () => {
  return {
    'naver-site-verification': SITE_CONFIG.naverSiteVerification
  };
}; 