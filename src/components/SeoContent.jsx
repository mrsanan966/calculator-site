import React from 'react';

export const SeoContent = ({ title, children }) => {
  return (
    <div className="mt-8 sm:mt-12 md:mt-16">
      <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
        {children}
      </div>
    </div>
  );
};

export default SeoContent; 