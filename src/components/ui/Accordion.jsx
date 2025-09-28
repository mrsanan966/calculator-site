import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Accordion = ({ children, className }) => (
  <div className={`space-y-2 ${className || ''}`}>
    {children}
  </div>
);

const AccordionItem = ({ children, value }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { isOpen, setIsOpen });
    }
    return child;
  });

  return (
    <div className="border rounded-lg overflow-hidden">
      {childrenWithProps}
    </div>
  );
};

const AccordionTrigger = ({ children, isOpen, setIsOpen, className }) => (
  <button
    className={`w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 ${className || ''}`}
    onClick={() => setIsOpen(!isOpen)}
    aria-expanded={isOpen}
  >
    <span className="font-semibold">{children}</span>
    <FaChevronDown 
      className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
    />
  </button>
);

const AccordionContent = ({ children, isOpen }) => (
  <div 
    className={`transition-all duration-200 ease-in-out ${
      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
    }`}
  >
    <div className="p-4">
      {children}
    </div>
  </div>
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
  