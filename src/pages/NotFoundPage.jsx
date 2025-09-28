import React from 'react';
import useSeo from '@/hooks/useSeo';
import Footer from '@/components/Footer';

const NotFoundPage = () => {
  useSeo({
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    keywords: 'not found, 404',
    canonical: '/404',
    path: '/404',
    ogType: 'website'
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-gray-600">The page you are looking for does not exist.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundPage; 