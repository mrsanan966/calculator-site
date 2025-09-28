/**
 * Script to fix canonical URLs in calculator pages
 * This script updates the canonical URLs in all HTML files in the public/calculator-pages directory
 * to match the actual routes in the React application.
 */

const fs = require('fs');
const path = require('path');

// Map of old URL suffixes to new URL suffixes
const urlMap = {
  'auto-loan-calculator': 'auto-loan',
  'mortgage-calculator': 'mortgage',
  'mortgage-payment-calculator': 'mortgage',
  'loan-calculator': 'loan',
  'loan-payment-calculator': 'loan',
  'heloc-calculator': 'heloc',
  'investment-calculator': 'finance',
  'investment-growth-calculator': 'finance',
  'savings-calculator': 'finance',
  'savings-goal-calculator': 'finance',
  'credit-card-interest-calculator': 'finance',
  'compound-interest-calculator': 'finance',
  'retirement-calculator': 'finance',
  'debt-calculator': 'finance',
  'tip-calculator': 'finance',
  'salary-calculator': 'finance',
  'tax-calculator': 'tax',
  'bmi-calculator': '',  // Redirects to home
  'grade-calculator': 'grade',
  'gpa-calculator': 'gpa',
  'age-calculator': 'age',
  'land-loan-calculator': 'land-loan',
  'refinance-calculator': 'refinance',
  'reba-calculator': 'reba',
  'adp-apycheck-calculator': 'adp-paycheck',
  'car-payment-calculator': 'auto-loan',
  'cit-bank-platinum-savings-calculator': 'cit-platinum-savings',
  'dunk-calculator': 'dunk',
  'snow-day-calculator': 'snow-day',
  'personal-loan-calculator': 'personal-loan',
  'student-loan-calculator': 'student-loan',
  'margin-calculator': 'margin',
  'profit-margin-calculator': 'profit-margin',
  'california-paycheck-calculator': 'california-paycheck',
  'parlay-calculator': 'parlay',
  'odds-calculator': 'odds',
  'time-calculator': 'time'
};

// Directory containing the HTML files
const calculatorPagesDir = path.join(__dirname, '..', 'public', 'calculator-pages');

// Process each HTML file
fs.readdir(calculatorPagesDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter for HTML files
  const htmlFiles = files.filter(file => file.endsWith('.html'));
  
  htmlFiles.forEach(file => {
    const filePath = path.join(calculatorPagesDir, file);
    
    // Read file content
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${file}:`, err);
        return;
      }
      
      // Get the base filename without extension
      const baseName = file.replace('.html', '');
      
      // Get the new URL suffix
      const newUrlSuffix = urlMap[baseName] || baseName;
      
      // Create the old and new canonical URL patterns
      const oldCanonicalPattern = new RegExp(`<link rel="canonical" href="https://www\\.financeloancalc\\.com/${baseName}"`, 'g');
      const newCanonicalUrl = `<link rel="canonical" href="https://www.financeloancalc.com/${newUrlSuffix}"`;
      
      // Replace the canonical URL
      const updatedData = data.replace(oldCanonicalPattern, newCanonicalUrl);
      
      // Update breadcrumb URLs if they exist
      let breadcrumbUpdated = updatedData;
      const breadcrumbPattern = new RegExp(`"item": "https://www\\.financeloancalc\\.com/${baseName}"`, 'g');
      if (newUrlSuffix) {
        breadcrumbUpdated = updatedData.replace(breadcrumbPattern, `"item": "https://www.financeloancalc.com/${newUrlSuffix}"`);
      }
      
      // Update og:url if it exists
      const ogUrlPattern = new RegExp(`<meta property="og:url" content="https://www\\.financeloancalc\\.com/${baseName}"`, 'g');
      const updatedOgUrl = breadcrumbUpdated.replace(ogUrlPattern, `<meta property="og:url" content="https://www.financeloancalc.com/${newUrlSuffix}"`);
      
      // Write the updated content back to the file
      if (updatedOgUrl !== data) {
        fs.writeFile(filePath, updatedOgUrl, 'utf8', err => {
          if (err) {
            console.error(`Error writing file ${file}:`, err);
            return;
          }
          console.log(`Updated canonical URL in ${file}`);
        });
      } else {
        console.log(`No changes needed for ${file}`);
      }
    });
  });
});

console.log('Starting canonical URL update process...');
