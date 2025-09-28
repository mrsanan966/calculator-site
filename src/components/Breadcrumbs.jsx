import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import { CALCULATOR_CATEGORIES, CALCULATOR_SUBCATEGORIES, CALCULATORS } from '@/config/calculators';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Get calculator info if we're on a calculator page
  const getCalculatorInfo = (path) => {
    const calculator = Object.values(CALCULATORS).find(calc => calc.path === `/${path}`);
    if (calculator) {
      return {
        name: calculator.name,
        category: calculator.category,
        subcategory: calculator.subcategory
      };
    }
    return null;
  };

  // Format breadcrumb text
  const formatBreadcrumb = (text) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Generate breadcrumb items
  const breadcrumbItems = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    const calculatorInfo = getCalculatorInfo(value);
    
    let label;
    if (calculatorInfo) {
      label = calculatorInfo.name;
    } else if (value in CALCULATOR_CATEGORIES) {
      label = formatBreadcrumb(CALCULATOR_CATEGORIES[value]);
    } else if (value in CALCULATOR_SUBCATEGORIES) {
      label = formatBreadcrumb(CALCULATOR_SUBCATEGORIES[value]);
    } else {
      label = formatBreadcrumb(value);
    }

    return {
      label,
      to,
      isLast: index === pathnames.length - 1
    };
  });

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <Link to="/" className="flex items-center hover:text-blue-600">
        <FaHome className="w-4 h-4" />
      </Link>
      
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.to}>
          <FaChevronRight className="w-3 h-3 text-gray-400" />
          {item.isLast ? (
            <span className="text-gray-900 font-medium">{item.label}</span>
          ) : (
            <Link
              to={item.to}
              className="hover:text-blue-600"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
