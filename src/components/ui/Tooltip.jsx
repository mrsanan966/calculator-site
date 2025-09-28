import React from 'react';

export const Tooltip = ({ text, children }) => {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="hidden group-hover:block absolute z-10 p-2 bg-gray-900 text-white text-sm rounded shadow-lg -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        {text}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
}; 