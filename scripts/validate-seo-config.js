import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CALCULATORS } from '../src/config/calculators.js';
import { generateCalculatorSeo } from '../src/config/calculators.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validation functions
const validateSeoData = (seoData, calculatorId) => {
  const errors = [];

  // Required fields
  const requiredFields = ['title', 'description', 'keywords'];
  requiredFields.forEach(field => {
    if (!seoData[field]) {
      errors.push(`Missing required SEO field: ${field}`);
    }
  });

  // Title length
  if (seoData.title && (seoData.title.length < 30 || seoData.title.length > 60)) {
    errors.push(`Title length should be between 30 and 60 characters (current: ${seoData.title.length})`);
  }

  // Description length
  if (seoData.description && (seoData.description.length < 120 || seoData.description.length > 160)) {
    errors.push(`Description length should be between 120 and 160 characters (current: ${seoData.description.length})`);
  }

  // Keywords
  if (seoData.keywords) {
    const keywords = seoData.keywords.split(',').map(k => k.trim());
    if (keywords.length < 3) {
      errors.push('At least 3 keywords are required');
    }
    if (keywords.length > 10) {
      errors.push('Maximum 10 keywords allowed');
    }
  }

  // Schema validation
  if (seoData.schema) {
    try {
      JSON.stringify(seoData.schema);
    } catch (e) {
      errors.push('Invalid schema.org markup');
    }
  }

  return errors;
};

const validateCalculatorSeo = () => {
  const errors = [];

  Object.entries(CALCULATORS).forEach(([id, calculator]) => {
    const seoData = generateCalculatorSeo(id);
    const seoErrors = validateSeoData(seoData, id);
    
    if (seoErrors.length > 0) {
      errors.push({
        calculatorId: id,
        errors: seoErrors
      });
    }
  });

  return errors;
};

const validateSeoImplementation = () => {
  const errors = [];
  const pagesDir = path.join(__dirname, '../src/pages');

  // Find all JSX files
  const findJsxFiles = (dir) => {
    const files = fs.readdirSync(dir);
    const jsxFiles = [];

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        jsxFiles.push(...findJsxFiles(filePath));
      } else if (file.endsWith('.jsx')) {
        jsxFiles.push(filePath);
      }
    });

    return jsxFiles;
  };

  const jsxFiles = findJsxFiles(pagesDir);

  // Check each file for SEO implementation
  jsxFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for useSeo hook usage
    if (!content.includes('useSeo')) {
      errors.push(`Missing useSeo hook in ${file}`);
    }

    // Check for meta tags
    if (!content.includes('meta') && !content.includes('useSeo')) {
      errors.push(`Missing meta tags in ${file}`);
    }
  });

  return errors;
};

// Main validation function
const validateSeoConfig = () => {
  console.log('\n=== SEO Configuration Validation ===\n');

  const errors = {
    calculatorSeo: validateCalculatorSeo(),
    implementation: validateSeoImplementation()
  };

  // Print results
  if (errors.calculatorSeo.length > 0) {
    console.log('Calculator SEO Errors:');
    errors.calculatorSeo.forEach(({ calculatorId, errors: seoErrors }) => {
      console.log(`\nCalculator: ${calculatorId}`);
      seoErrors.forEach(error => console.log(`  - ${error}`));
    });
  }

  if (errors.implementation.length > 0) {
    console.log('\nSEO Implementation Errors:');
    errors.implementation.forEach(error => console.log(`  - ${error}`));
  }

  const hasErrors = Object.values(errors).some(errorArray => errorArray.length > 0);
  if (!hasErrors) {
    console.log('All SEO configurations are valid!');
  }

  // Return results for potential CI/CD integration
  return {
    isValid: !hasErrors,
    errors
  };
};

// Run validation
validateSeoConfig(); 