import React, { useState } from 'react';

export const Accordion = ({ children, className = '', ...props }) => {
  return (
    <div className={`accordion ${className}`} {...props}>
      {children}
    </div>
  );
};

export const AccordionItem = ({ children, className = '', ...props }) => {
  return (
    <div className={`accordion-item ${className}`} {...props}>
      {children}
    </div>
  );
};

export const AccordionTrigger = ({ children, className = '', ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <button
      className={`accordion-trigger ${className}`}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      {children}
      <span className={`accordion-icon ${isOpen ? 'open' : ''}`}>
        {isOpen ? '−' : '+'}
      </span>
    </button>
  );
};

export const AccordionContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`accordion-content ${className}`} {...props}>
      {children}
    </div>
  );
};

