import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CALCULATORS, CALCULATOR_CATEGORIES, CALCULATOR_SUBCATEGORIES } from '../src/config/calculators.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validation functions
const validateCalculator = (calculator) => {
  const errors = [];

  // Required fields
  const requiredFields = ['id', 'name', 'path', 'category', 'subcategory', 'description'];
  requiredFields.forEach(field => {
    if (!calculator[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  // Path format
  if (calculator.path && !calculator.path.startsWith('/')) {
    errors.push('Path must start with a forward slash');
  }

  // Category validation
  if (calculator.category && !Object.values(CALCULATOR_CATEGORIES).includes(calculator.category)) {
    errors.push(`Invalid category: ${calculator.category}`);
  }

  // Subcategory validation
  if (calculator.subcategory && !Object.values(CALCULATOR_SUBCATEGORIES).includes(calculator.subcategory)) {
    errors.push(`Invalid subcategory: ${calculator.subcategory}`);
  }

  // Component existence
  const pathName = calculator.path.slice(1).replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
  const componentName = pathName.charAt(0).toUpperCase() + pathName.slice(1) + 'Page.jsx';
  const componentPath = path.join(__dirname, '../src/pages', componentName);
  if (!fs.existsSync(componentPath)) {
    errors.push(`Component file not found: ${componentPath}`);
  }

  return errors;
};

const validateCategories = () => {
  const errors = [];

  // Validate category structure
  Object.entries(CALCULATOR_CATEGORIES).forEach(([key, value]) => {
    if (typeof value !== 'string') {
      errors.push(`Invalid category value for ${key}: must be a string`);
    }
  });

  return errors;
};

const validateSubcategories = () => {
  const errors = [];

  // Validate subcategory structure
  Object.entries(CALCULATOR_SUBCATEGORIES).forEach(([key, value]) => {
    if (typeof value !== 'string') {
      errors.push(`Invalid subcategory value for ${key}: must be a string`);
    }
  });

  return errors;
};

const validateCalculatorPaths = () => {
  const errors = [];
  const paths = new Set();

  Object.values(CALCULATORS).forEach(calculator => {
    if (paths.has(calculator.path)) {
      errors.push(`Duplicate path found: ${calculator.path}`);
    }
    paths.add(calculator.path);
  });

  return errors;
};

// Main validation function
const validateCalculatorConfig = () => {
  console.log('\n=== Calculator Configuration Validation ===\n');

  const errors = {
    calculators: [],
    categories: [],
    subcategories: [],
    paths: []
  };

  // Validate each calculator
  Object.entries(CALCULATORS).forEach(([id, calculator]) => {
    const calculatorErrors = validateCalculator(calculator);
    if (calculatorErrors.length > 0) {
      errors.calculators.push({
        id,
        errors: calculatorErrors
      });
    }
  });

  // Validate categories
  errors.categories = validateCategories();

  // Validate subcategories
  errors.subcategories = validateSubcategories();

  // Validate paths
  errors.paths = validateCalculatorPaths();

  // Print results
  if (errors.calculators.length > 0) {
    console.log('Calculator Errors:');
    errors.calculators.forEach(({ id, errors: calculatorErrors }) => {
      console.log(`\nCalculator: ${id}`);
      calculatorErrors.forEach(error => console.log(`  - ${error}`));
    });
  }

  if (errors.categories.length > 0) {
    console.log('\nCategory Errors:');
    errors.categories.forEach(error => console.log(`  - ${error}`));
  }

  if (errors.subcategories.length > 0) {
    console.log('\nSubcategory Errors:');
    errors.subcategories.forEach(error => console.log(`  - ${error}`));
  }

  if (errors.paths.length > 0) {
    console.log('\nPath Errors:');
    errors.paths.forEach(error => console.log(`  - ${error}`));
  }

  const hasErrors = Object.values(errors).some(errorArray => errorArray.length > 0);
  if (!hasErrors) {
    console.log('All calculator configurations are valid!');
  }

  // Return results for potential CI/CD integration
  return {
    isValid: !hasErrors,
    errors
  };
};

// Run validation
validateCalculatorConfig(); 