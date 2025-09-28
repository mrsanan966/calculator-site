#!/usr/bin/env node

/**
 * Schema Validation Script
 * 
 * This script validates the schema.org markup for all calculator pages.
 * It checks for required properties and ensures the schema is valid JSON-LD.
 * 
 * Usage: node scripts/validate-schemas.js
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const chalk = require('chalk');
const { JSDOM } = require('jsdom');
const { URL } = require('url');

// Configuration
const PAGES_DIR = path.join(__dirname, '../src/pages');
const SCHEMA_TYPES = ['SoftwareApplication', 'HowTo', 'FAQPage', 'BreadcrumbList'];
const REQUIRED_PROPERTIES = {
  SoftwareApplication: ['name', 'description', 'applicationCategory'],
  HowTo: ['name', 'step'],
  FAQPage: ['mainEntity'],
  BreadcrumbList: ['itemListElement']
};

// Colors for console output
const colors = {
  success: chalk.green,
  error: chalk.red,
  warning: chalk.yellow,
  info: chalk.blue,
  highlight: chalk.cyan
};

/**
 * Extract all schema.org JSON-LD scripts from HTML content
 */
function extractSchemas(html) {
  const dom = new JSDOM(html);
  const scripts = dom.window.document.querySelectorAll('script[type="application/ld+json"]');
  
  return Array.from(scripts)
    .map(script => {
      try {
        return JSON.parse(script.textContent);
      } catch (e) {
        console.error(colors.error('Error parsing JSON-LD:'), e.message);
        return null;
      }
    })
    .filter(Boolean);
}

/**
 * Validate a single schema object
 */
function validateSchema(schema, pagePath) {
  const schemaType = Array.isArray(schema['@type']) 
    ? schema['@type'].find(t => SCHEMA_TYPES.includes(t))
    : schema['@type'];

  if (!schemaType) {
    console.log(colors.warning(`⚠️  Unknown schema type in ${pagePath}`));
    return { valid: false, errors: ['Unknown schema type'] };
  }

  const requiredProps = REQUIRED_PROPERTIES[schemaType] || [];
  const errors = [];

  // Check for required properties
  requiredProps.forEach(prop => {
    if (!schema[prop]) {
      errors.push(`Missing required property: ${prop}`);
    }
  });

  // Type-specific validations
  if (schemaType === 'HowTo' && schema.step) {
    if (!Array.isArray(schema.step)) {
      errors.push('HowTo.step must be an array');
    } else if (schema.step.length === 0) {
      errors.push('HowTo must have at least one step');
    }
  }

  if (schemaType === 'FAQPage' && schema.mainEntity) {
    if (!Array.isArray(schema.mainEntity)) {
      errors.push('FAQPage.mainEntity must be an array');
    } else if (schema.mainEntity.length === 0) {
      errors.push('FAQPage must have at least one question/answer pair');
    }
  }

  if (schemaType === 'BreadcrumbList' && schema.itemListElement) {
    if (!Array.isArray(schema.itemListElement)) {
      errors.push('BreadcrumbList.itemListElement must be an array');
    } else if (schema.itemListElement.length < 2) {
      errors.push('BreadcrumbList should have at least 2 items (Home + current page)');
    }
  }

  return {
    type: schemaType,
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate all schemas in a page
 */
function validatePageSchemas(pagePath) {
  console.log(colors.info(`\nValidating schemas in ${path.basename(pagePath)}:`));
  
  try {
    const html = fs.readFileSync(pagePath, 'utf8');
    const schemas = extractSchemas(html);
    
    if (schemas.length === 0) {
      console.log(colors.warning('  ⚠️  No schema.org markup found'));
      return { valid: false, schemas: [] };
    }
    
    const results = schemas.map(schema => ({
      schema,
      validation: validateSchema(schema, pagePath)
    }));
    
    // Print validation results
    results.forEach((result, index) => {
      const { type, valid, errors } = result.validation;
      const status = valid ? colors.success('✓') : colors.error('✗');
      
      console.log(`  ${status} Schema #${index + 1} (${colors.highlight(type)})`);
      
      if (!valid) {
        errors.forEach(error => {
          console.log(`    ${colors.error('•')} ${error}`);
        });
      }
    });
    
    const allValid = results.every(r => r.validation.valid);
    return { valid: allValid, schemas: results };
    
  } catch (error) {
    console.error(colors.error(`  ❌ Error validating ${pagePath}:`), error.message);
    return { valid: false, error: error.message };
  }
}

/**
 * Main function
 */
async function main() {
  console.log(colors.info('🔍 Validating schema.org markup for all calculator pages...'));
  
  // Find all page files
  const pageFiles = await glob(path.join(PAGES_DIR, '*CalculatorPage.jsx'));
  
  if (pageFiles.length === 0) {
    console.log(colors.warning('No calculator pages found!'));
    return;
  }
  
  console.log(`Found ${pageFiles.length} calculator pages.\n`);
  
  // Validate each page
  const results = [];
  
  for (const pageFile of pageFiles) {
    const result = validatePageSchemas(pageFile);
    results.push({
      file: path.basename(pageFile),
      ...result
    });
  }
  
  // Print summary
  const validCount = results.filter(r => r.valid).length;
  const invalidCount = results.length - validCount;
  
  console.log('\n' + '='.repeat(60));
  console.log(colors.info('Validation Summary:'));
  console.log(colors.success(`✓ ${validCount} pages with valid schema markup`));
  
  if (invalidCount > 0) {
    console.log(colors.error(`✗ ${invalidCount} pages with issues:`));
    results
      .filter(r => !r.valid)
      .forEach(r => {
        console.log(`  - ${r.file}`);
      });
    
    process.exit(1);
  } else {
    console.log(colors.success('\n🎉 All calculator pages have valid schema markup!'));
    process.exit(0);
  }
}

// Run the script
main().catch(error => {
  console.error(colors.error('Unhandled error:'), error);
  process.exit(1);
});
