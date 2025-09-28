// Site configuration
export const SITE_CONFIG = {
  // Base URL for the site (without trailing slash)
  baseUrl: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_APP_BASE_URL)
    ? import.meta.env.VITE_APP_BASE_URL
    : 'https://fainanceloancalc.com',
  
  // Site metadata
  siteName: 'FinCalc',
  siteDescription: 'Your trusted source for financial and utility calculations.',
  
  // Social media links (update these with your actual profiles)
  social: {
    // twitter: 'https://twitter.com/yourprofile',
    // facebook: 'https://facebook.com/yourpage',
    // linkedin: 'https://linkedin.com/company/yourcompany',
  },
  
  // Contact information
  contact: {
    email: 'contact@financeloancalc.com',
    // Add other contact methods as needed
  },
};

export default SITE_CONFIG;
