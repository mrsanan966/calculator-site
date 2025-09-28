/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Enable static export for better SEO
  output: 'export',
  trailingSlash: true,
  
  // Image optimization
  images: {
    unoptimized: true
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
      {
        source: '/mortgage-calculator',
        destination: '/mortgage',
        permanent: true,
      },
      {
        source: '/auto-loan-calculator',
        destination: '/auto-loan',
        permanent: true,
      },
      {
        source: '/student-loan-calculator',
        destination: '/student-loan',
        permanent: true,
      },
    ];
  },
  
  // Headers for SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // Environment variables
  env: {
    SITE_URL: process.env.SITE_URL || 'https://financeloancalc.com',
  },
};

module.exports = nextConfig;
