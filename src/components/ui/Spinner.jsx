import React from 'react';
import { FaSpinner } from 'react-icons/fa';

export const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center">
      <FaSpinner 
        className={`animate-spin text-blue-600 ${sizeClasses[size]} ${className}`}
        aria-label="Loading"
      />
    </div>
  );
}; 